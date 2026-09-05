# Mantine Vite template

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [ESLint](https://eslint.org/) setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)
- Blog content loaded from a Notion page

## Blog (Notion)

The `/blog` page renders a **Notion page** (not a database). Nested pages under it appear as cards.

1. Create a [Notion internal integration](https://www.notion.so/my-integrations) and copy the token.
2. Open the Notion page → **Connections** → add the integration (`portfolio`).
3. Copy the page ID from the URL (`https://www.notion.so/.../PAGE_ID?v=...` — the 32-character value).
4. Copy `.env.example` to `.env` and set `NOTION_TOKEN` and `NOTION_PAGE_ID`.
5. Restart the dev server after changing `.env`. Set the same variables in Vercel for production.

`npm run dev` serves `/api/blog` through Vite. On Vercel, `api/blog` is a serverless function.

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier


## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
