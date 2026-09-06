import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { BlogPost, BlogPostSummary } from './blog';
import { logServerEnv } from './env';

type NotionProperty = {
  type?: string;
  title?: Array<{ plain_text?: string }>;
  rich_text?: Array<{ plain_text?: string }>;
  url?: string | null;
  date?: { start?: string | null } | null;
  select?: { name?: string } | null;
  multi_select?: Array<{ name?: string }>;
};

type NotionPage = {
  id: string;
  object?: string;
  created_time?: string;
  cover?: {
    type?: string;
    external?: { url?: string };
    file?: { url?: string };
  } | null;
  properties?: Record<string, NotionProperty>;
};

type NotionBlock = {
  id: string;
  type?: string;
  child_page?: { title?: string };
};

function getPageId() {
  return process.env.NOTION_PAGE_ID || process.env.NOTION_DATABASE_ID || '';
}

let notionClient: Client | null = null;

export function isNotionConfigured() {
  return Boolean(process.env.NOTION_TOKEN && getPageId());
}

function getNotion() {
  logServerEnv('getNotion');
  if (!process.env.NOTION_TOKEN) {
    return null;
  }
  if (!notionClient) {
    notionClient = new Client({ auth: process.env.NOTION_TOKEN });
  }
  return notionClient;
}

function plainText(parts?: Array<{ plain_text?: string }>) {
  return (parts ?? []).map((part) => part.plain_text ?? '').join('').trim();
}

function toPageId(value: string) {
  const compact = value.replace(/-/g, '');
  if (!/^[0-9a-f]{32}$/i.test(compact)) {
    return null;
  }
  return `${compact.slice(0, 8)}-${compact.slice(8, 12)}-${compact.slice(12, 16)}-${compact.slice(16, 20)}-${compact.slice(20)}`;
}

function pageIdToSlug(id: string) {
  return id.replace(/-/g, '');
}

function findProperty(page: NotionPage, names: string[]) {
  const properties = page.properties ?? {};
  const keys = Object.keys(properties);
  return names
    .map((name) => keys.find((key) => key.toLowerCase() === name.toLowerCase()))
    .map((key) => (key ? properties[key] : undefined))
    .find(Boolean);
}

function readTitle(page: NotionPage, fallback = 'Untitled') {
  const named = findProperty(page, ['Name', 'Title']);
  if (named?.type === 'title') {
    return plainText(named.title) || fallback;
  }
  const titleProp = Object.values(page.properties ?? {}).find((property) => property.type === 'title');
  return plainText(titleProp?.title) || fallback;
}

function readCover(page: NotionPage) {
  if (page.cover?.type === 'external') {
    return page.cover.external?.url ?? null;
  }
  if (page.cover?.type === 'file') {
    return page.cover.file?.url ?? null;
  }
  return null;
}

function mapSummary(page: NotionPage, titleFallback?: string): BlogPostSummary {
  const tagsProp = findProperty(page, ['Tags', 'Labels']);
  return {
    id: page.id,
    slug: pageIdToSlug(page.id),
    title: readTitle(page, titleFallback),
    date: findProperty(page, ['Date'])?.date?.start ?? page.created_time ?? null,
    summary: plainText(findProperty(page, ['Summary', 'Description'])?.rich_text),
    cover: readCover(page),
    tags: (tagsProp?.multi_select ?? []).map((tag) => tag.name ?? '').filter(Boolean),
  };
}

async function pageToPost(
  notion: Client,
  page: NotionPage,
  titleFallback?: string
): Promise<BlogPost> {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(mdBlocks);
  return {
    ...mapSummary(page, titleFallback),
    content: markdown.parent ?? '',
  };
}

async function listBlocks(notion: Client, pageId: string) {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: cursor,
    });
    blocks.push(...(response.results as NotionBlock[]));
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);
  return blocks;
}

async function listChildPages(notion: Client, pageId: string): Promise<BlogPostSummary[]> {
  const blocks = await listBlocks(notion, pageId);
  const childPages = blocks.filter((block) => block.type === 'child_page');
  const posts: BlogPostSummary[] = [];

  for (const block of childPages) {
    try {
      const page = (await notion.pages.retrieve({ page_id: block.id })) as NotionPage;
      posts.push(mapSummary(page, block.child_page?.title));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to load child page ${block.id}`, error);
    }
  }

  return posts;
}

export async function getRootPage(): Promise<{
  page: BlogPost | null;
  children: BlogPostSummary[];
}> {
  const notion = getNotion();
  const pageId = toPageId(getPageId());
  if (!notion || !pageId) {
    return { page: null, children: [] };
  }

  try {
    const page = (await notion.pages.retrieve({ page_id: pageId })) as NotionPage;
    const [post, children] = await Promise.all([
      pageToPost(notion, page),
      listChildPages(notion, pageId),
    ]);
    return { page: post, children };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load Notion page', error);
    return { page: null, children: [] };
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const notion = getNotion();
  const rootId = toPageId(getPageId());
  const pageId = toPageId(slug);
  if (!notion || !pageId) {
    return null;
  }

  try {
    const page = (await notion.pages.retrieve({ page_id: pageId })) as NotionPage;
    if (rootId && pageId !== rootId) {
      const children = await listChildPages(notion, rootId);
      const allowed = children.some(
        (child) => child.id === page.id || pageIdToSlug(child.id) === slug
      );
      if (!allowed) {
        return null;
      }
    }
    return await pageToPost(notion, page);
  } catch {
    return null;
  }
}
