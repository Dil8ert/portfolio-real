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
    const data = await readJson<BlogListResponse>(await fetch('/api/blog'));
    return data ?? { page: null, children: [], configured: false };
  } catch {
    return { page: null, children: [], configured: false };
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
