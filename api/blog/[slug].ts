import type { VercelRequest, VercelResponse } from '@vercel/node';
import { logServerEnv } from '../../src/lib/env';
import { getPostBySlug } from '../../src/lib/notion';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  logServerEnv('api/blog/[slug]');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const slugParam = req.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) {
    res.status(400).json({ error: 'Missing slug' });
    return;
  }

  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.status(200).json({ post });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load blog post', error);
    res.status(500).json({ error: 'Failed to load post' });
  }
}
