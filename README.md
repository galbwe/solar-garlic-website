This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and self-host Google Fonts with zero layout shift.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Fonts

This project uses three Google Fonts loaded via `next/font/google` (see `src/fonts.ts`):

| Font | Role | Weights loaded |
|------|------|---------------|
| **Noto Sans** | Body / general text | 300 (light), 400 (normal), 600 (semibold), 700 (bold) |
| **Noto Sans Display** | Event dates & venue info | 400 (normal) |
| **Teko** | Headings & navigation | 400 (regular) |

Only the weights that are actually used in the codebase are loaded. If you add a new `font-{weight}` Tailwind utility on an element that inherits one of these fonts, update the `weight` array in `src/fonts.ts` accordingly to avoid invisible/fallback text.

## Deployment Requirements

This project uses [`output: 'standalone'`](https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files) in `next.config.ts`, which produces a self-contained Node.js server.

### Node.js Version

- **Minimum:** Node.js 18.17.0 (required by Next.js standalone mode)
- **Recommended / CI & Docker:** Node.js 24 (see `.nvmrc`)

If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project root to automatically switch to the correct version.

### Docker

The production image is built from `node:24-alpine`. Build and run locally with:

```bash
npm run docker:build
npm run docker:run
```

The container exposes port 3000. The Docker image is pushed to AWS ECR and deployed to an EC2 instance via the `deploy.yaml` GitHub Actions workflow on every merge to `main`.

### CI

The GitHub Actions workflows (`pull_request.yaml`, `deploy.yaml`) both pin to `node-version: '24.x'`, which satisfies the `>=18.17.0` engine requirement declared in `package.json`.

## Testing

- Run `npm test` to run unit tests with vitest. 
- Run `npx playwright test` to run end to end tests with playwright.
- Run `npx playwright test --ui` to get error reports in a brower.

