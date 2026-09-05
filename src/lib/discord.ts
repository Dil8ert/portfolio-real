export const CONTACT_SERVICES = ['Web Development', 'Graphic Design', 'Bot Development'] as const;

export type ContactPayload = {
  username: string;
  service: string;
  message: string;
};

type ValidationResult = { ok: true; data: ContactPayload } | { ok: false; error: string };

function truncate(value: string, max: number) {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max - 1)}…`;
}

function isAllowedWebhookUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const isDiscordHost = host === 'discord.com' || host === 'discordapp.com';
    return (
      parsed.protocol === 'https:' && isDiscordHost && parsed.pathname.startsWith('/api/webhooks/')
    );
  } catch {
    return false;
  }
}

export function isDiscordConfigured() {
  const url = process.env.DISCORD_WEBHOOK_URL;
  return Boolean(url && isAllowedWebhookUrl(url));
}

export function validateContact(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request' };
  }

  const record = body as Record<string, unknown>;
  const username = typeof record.username === 'string' ? record.username.trim() : '';
  const service = typeof record.service === 'string' ? record.service.trim() : '';
  const message = typeof record.message === 'string' ? record.message.trim() : '';

  if (!username) {
    return { ok: false, error: 'Discord username is required' };
  }
  if (username.length > 100) {
    return { ok: false, error: 'Discord username is too long' };
  }
  if (!(CONTACT_SERVICES as readonly string[]).includes(service)) {
    return { ok: false, error: 'Select a valid service' };
  }
  if (!message) {
    return { ok: false, error: 'Message is required' };
  }
  if (message.length > 4000) {
    return { ok: false, error: 'Message is too long' };
  }

  return { ok: true, data: { username, service, message } };
}

export async function sendContactToDiscord(payload: ContactPayload) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl || !isAllowedWebhookUrl(webhookUrl)) {
    throw new Error('DISCORD_WEBHOOK_URL is not configured');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(10000),
    body: JSON.stringify({
      username: 'Portfolio Contact',
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: 'New contact message',
          color: 0x228be6,
          description: truncate(payload.message, 4000),
          fields: [
            { name: 'Discord', value: truncate(payload.username, 256), inline: true },
            { name: 'Service', value: payload.service, inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Discord webhook failed: ${response.status}`);
  }
}
