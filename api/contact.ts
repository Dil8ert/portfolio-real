import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactToDiscord, validateContact } from '../src/lib/discord';

function readBody(req: VercelRequest): unknown {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const validated = validateContact(readBody(req));
  if (!validated.ok) {
    res.status(400).json({ error: validated.error });
    return;
  }

  try {
    await sendContactToDiscord(validated.data);
    res.status(200).json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send Discord webhook', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}
