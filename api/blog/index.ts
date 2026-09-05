import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRootPage, isNotionConfigured } from '../../src/lib/notion';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { page, children } = await getRootPage();
    res.status(200).json({ page, children, configured: isNotionConfigured() });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load Notion page', error);
    res.status(200).json({ page: null, children: [], configured: isNotionConfigured() });
  }
}
