import { useEffect, useState } from 'react';
import { Grid, Skeleton, Stack, Text, Title, TypographyStylesProvider } from '@mantine/core';
import Markdown from 'react-markdown';
import { SequentialItem, useSequentialMedia } from '../Loading';
import { fetchBlogPosts, type BlogPost, type BlogPostSummary } from '../../lib/blog';
import { BlogCard } from './BlogCard';
import pageClasses from './BlogPost.module.css';

function BlogSkeletons() {
  return (
    <Stack maw={760} mx="auto" gap="md" className={pageClasses.page}>
      <Skeleton height={36} width="60%" />
      <Skeleton height={14} width="100%" />
      <Skeleton height={14} width="95%" />
      <Skeleton height={14} width="80%" />
      <Skeleton height={220} radius={0} />
    </Stack>
  );
}

export default function Blog() {
  const [page, setPage] = useState<BlogPost | null | undefined>(undefined);
  const [children, setChildren] = useState<BlogPostSummary[]>([]);
  const [configured, setConfigured] = useState(true);
  const { canLoad, markLoaded } = useSequentialMedia(children.length, 1, 160);

  useEffect(() => {
    let cancelled = false;
    fetchBlogPosts().then((result) => {
      if (cancelled) {
        return;
      }
      setConfigured(result.configured);
      setPage(result.page);
      setChildren(result.children);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (page === undefined) {
    return <BlogSkeletons />;
  }

  if (!page) {
    return (
      <Stack gap="sm" maw={640} className={pageClasses.page} data-mantine-color-scheme="light">
        <Title order={2} c="#111">
          Blog
        </Title>
        <Text c="#333">
          {configured
            ? 'Could not load that Notion page. Share it with the portfolio integration (Connections → add “portfolio”), then restart the app.'
            : 'Add NOTION_TOKEN and NOTION_PAGE_ID to .env, then restart the app. The page ID is the 32-character value in the Notion URL.'}
        </Text>
      </Stack>
    );
  }

  return (
    <Stack
      maw={760}
      mx="auto"
      gap="lg"
      className={pageClasses.page}
      data-mantine-color-scheme="light"
    >
      <Title order={1} c="#111">
        {page.title}
      </Title>
      {page.content && (
        <TypographyStylesProvider>
          <div className={pageClasses.body}>
            <Markdown>{page.content}</Markdown>
          </div>
        </TypographyStylesProvider>
      )}
      {children.length > 0 && (
        <Stack gap="md">
          <Title order={3} c="#111">
            Pages
          </Title>
          <Grid align="stretch">
            {children.map((post, index) => (
              <Grid.Col key={post.id} span={{ base: 12, md: 6 }} display="flex">
                <SequentialItem index={index} style={{ height: '100%', width: '100%' }}>
                  <BlogCard
                    post={post}
                    active={canLoad(index)}
                    onReady={() => markLoaded(index)}
                  />
                </SequentialItem>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
