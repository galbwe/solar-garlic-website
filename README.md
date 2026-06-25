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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
