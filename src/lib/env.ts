const SERVER_ENV_KEYS = [
  'NOTION_TOKEN',
  'NOTION_PAGE_ID',
  'NOTION_DATABASE_ID',
  'DISCORD_WEBHOOK_URL',
  'VITE_NOTION_TOKEN',
  'VITE_NOTION_PAGE_ID',
  'VITE_NOTION_DATABASE_ID',
  'VITE_DISCORD_WEBHOOK_URL',
] as const;

function describeEnvValue(value: string | undefined) {
  if (!value) {
    return { set: false, length: 0 };
  }

  return {
    set: true,
    length: value.length,
    prefix: value.slice(0, 4),
  };
}

/** Logs whether server env vars are present. Never prints full secret values. */
export function logServerEnv(context: string) {
  const snapshot = Object.fromEntries(
    SERVER_ENV_KEYS.map((key) => [key, describeEnvValue(process.env[key])])
  );

  // eslint-disable-next-line no-console
  console.log(`[env] ${context}`, snapshot);
}
