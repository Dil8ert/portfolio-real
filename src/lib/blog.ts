export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  date: string | null;
  summary: string;
  cover: string | null;
  tags: string[];
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

export type BlogListResponse = {
  page: BlogPost | null;
  children: BlogPostSummary[];
  configured: boolean;
  loadError?: boolean;
};

export type BlogPostResponse = {
  post: BlogPost;
};

async function readJson<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    return null;
  }
  return response.json() as Promise<T>;
}

export async function fetchBlogPosts(): Promise<BlogListResponse> {
  try {
    const response = await fetch('/api/blog');
    if (!response.ok) {
      return { page: null, children: [], configured: true, loadError: true };
    }
    const data = (await response.json()) as BlogListResponse;
    return {
      page: data.page ?? null,
      children: data.children ?? [],
      configured: Boolean(data.configured),
    };
  } catch {
    return { page: null, children: [], configured: true, loadError: true };
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const data = await readJson<BlogPostResponse>(
      await fetch(`/api/blog/${encodeURIComponent(slug)}`)
    );
    return data?.post ?? null;
  } catch {
    return null;
  }
}
