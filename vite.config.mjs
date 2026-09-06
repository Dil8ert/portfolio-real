import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function blogApiPlugin() {
  return {
    name: 'blog-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url !== '/api/blog' && !url.startsWith('/api/blog/')) {
          next();
          return;
        }

        try {
          const mod = await server.ssrLoadModule('/src/lib/notion.ts');
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');

          if (url === '/api/blog') {
            const { page, children } = await mod.getRootPage();
            res.end(JSON.stringify({ page, children, configured: mod.isNotionConfigured() }));
            return;
          }

          const slug = decodeURIComponent(url.slice('/api/blog/'.length));
          const post = await mod.getPostBySlug(slug);
          if (!post) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
            return;
          }
          res.end(JSON.stringify({ post }));
        } catch (error) {
          console.error('Blog API plugin failed', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Failed to load posts' }));
        }
      });
    },
  };
}

function contactApiPlugin() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url !== '/api/contact') {
          next();
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const body = await readJsonBody(req);
          const mod = await server.ssrLoadModule('/src/lib/discord.ts');
          const validated = mod.validateContact(body);
          if (!validated.ok) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: validated.error }));
            return;
          }

          await mod.sendContactToDiscord(validated.data);
          res.end(JSON.stringify({ ok: true }));
        } catch (error) {
          console.error('Contact API plugin failed', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to send message' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.NOTION_TOKEN = env.NOTION_TOKEN || env.VITE_NOTION_TOKEN || process.env.NOTION_TOKEN;
  process.env.NOTION_PAGE_ID =
    env.NOTION_PAGE_ID || env.VITE_NOTION_PAGE_ID || process.env.NOTION_PAGE_ID;
  process.env.NOTION_DATABASE_ID =
    env.NOTION_DATABASE_ID || env.VITE_NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID;
  process.env.DISCORD_WEBHOOK_URL =
    env.DISCORD_WEBHOOK_URL || env.VITE_DISCORD_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;

  return {
    plugins: [react(), tsconfigPaths(), blogApiPlugin(), contactApiPlugin()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.mjs',
    },
  };
});
