# Checkit product page

A production-quality **Content Explorer** built for a Frontend Engineer assessment using **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **DummyJSON** as the public API source.

## Why this API

I chose **DummyJSON Products** because it is stable, free, image-rich, and supports the key assessment needs for a browsable product explorer: pagination, individual item detail, category filtering, and search.

## Live scope covered

- Server-rendered listing page with **20 items per page**
- Dynamic detail page with server-side data fetching
- URL-driven **search**, **category filter**, and **sorting**
- Debounced search input (**400ms**)
- Shareable filtered URLs
- Skeleton loading states
- Friendly route-level error boundary
- Dedicated empty-state UI
- Responsive layout for mobile, tablet, and desktop
- Metadata support for detail pages
- Two meaningful Vitest + Testing Library tests
- Cloudflare Workers deployment configuration via **OpenNext**

## Quick start

```bash
git clone <your-repo-url>
cd frontend-assessment-wg
npm install
npm run dev
```

Open `http://localhost:3000`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
npm run preview
npm run deploy
```

## Stack

- Next.js 16 App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- Vitest + React Testing Library
- OpenNext Cloudflare adapter

## Architecture decisions

### 1. Feature-driven App Router structure
The project is organized around route segments and reusable UI layers:

- `app/` for route entry points, metadata, loading, and error boundaries
- `components/` for composable UI blocks
- `lib/` for API access, formatting helpers, and query normalization
- `hooks/` for debounced URL updates
- `types/` for all shared domain types
- `tests/` for focused component and utility coverage

This keeps data logic out of JSX and prevents route files from becoming monoliths.

### 2. API abstraction in `lib/api.ts`
No component calls `fetch()` directly. All remote requests are abstracted behind a small API layer so caching strategy, query composition, and error behavior are centralized.

### 3. URL-driven state
Search, category, and sort are all reflected in the URL to make the UI shareable and restoreable. The search box uses a debounced client hook to avoid a navigation per keystroke.

### 4. Pagination over infinite scroll
I intentionally chose **pagination** instead of infinite scroll because it provides:

- predictable performance
- clearer state restoration
- easier sharable URLs
- better accessibility and keyboard navigation
- simpler review for recruiters and QA

For an assessment where engineering judgment matters, pagination is the more maintainable default.

## Performance optimizations applied

### 1. `next/image`
All product imagery uses `next/image` with explicit sizing behavior and priority loading for the first visible row on page one. This helps reduce layout shift and improves LCP.

### 2. `next/font`
The app uses `next/font/google` for Inter to avoid render-blocking font loading patterns and improve CLS.

### 3. Cache-aware data fetching
The API layer uses route-appropriate caching:

- categories: `revalidate: 3600`
- listing/search/category results: `revalidate: 300`
- product detail: `revalidate: 900`

This balances freshness with repeated-request performance.

### 4. Static asset caching for Cloudflare
The app includes a `public/_headers` rule for immutable Next static assets:

```txt
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
```

### 5. Small client surface area
The listing itself stays server-rendered. Only the filter controls use client-side interactivity.

## Assessment feature mapping

### F-1 Listing page
- Server-rendered listing route
- 20 items per page
- Product cards include title, image, price, discount, rating, and brand
- Responsive grid: 1 / 2 / 4 columns depending on viewport
- Pagination implemented with preserved query state

### F-2 Detail page
- Dynamic route: `app/items/[id]/page.tsx`
- Server-side data fetching
- Metadata generated per item
- Breadcrumb back to filtered listing/category entry point

### F-3 Search & filtering
- Debounced search input (400ms)
- Category filter
- Sort filter
- URL reflects active state

### F-4 Loading, error, and empty states
- `app/loading.tsx`
- `app/items/[id]/loading.tsx`
- `app/error.tsx`
- dedicated empty-state component

### F-5 Deployment
- Cloudflare Workers configuration included with OpenNext
- Vercel remains a fallback option if Cloudflare account setup is unavailable during review

## Cloudflare deployment notes

### Cloudflare Workers Builds setup

If you connect this repo to **Cloudflare Workers Builds**, set the **Deploy command** to:

```bash
npm run deploy
```

Do **not** use `npx wrangler deploy` as the dashboard deploy command for this repo. The OpenNext docs recommend using the `opennextjs-cloudflare` CLI for Next.js apps on Workers, and Workers Builds does not honor custom build steps inside `wrangler.jsonc`. That means `wrangler deploy` can run before `.open-next/assets` exists, which causes the static assets detection error.

Recommended Workers Builds settings:

```text
Build command: npm install
Deploy command: npm run deploy
```

For local manual deployment, you can also run:

```bash
npm run deploy:wrangler
```

This explicitly builds the OpenNext output first and then runs Wrangler.


This repo is pre-configured for **Cloudflare Workers** with:

- `@opennextjs/cloudflare`
- `wrangler.jsonc`
- `open-next.config.ts`
- `public/_headers`
- `npm run preview`
- `npm run deploy`

### Deploy steps

```bash
npm install
npm run build
npm run preview
npm run deploy
```

If needed, update the Worker name inside `wrangler.jsonc` before deployment.

## Testing

Included tests:

- `tests/utils.test.ts`
  - validates search param normalization
  - validates URL construction
  - validates sort behavior
- `tests/product-card.test.tsx`
  - validates key UI content for a product card

## Trade-offs and known limitations

- DummyJSON search is not fully combined server-side with category pagination, so category + search uses a fetch-then-filter strategy for the result set.
- I prioritized strong core assessment coverage over adding animations or dashboard-level interactions.
- I did not implement advanced analytics, persistent favorites, or edge cache inspection headers because those are beyond the core rubric and I chose depth over bonus sprawl.

## What I would do with 2 more hours

1. Add an accessibility audit report with axe and tighten any remaining contrast or landmark improvements.
2. Add edge cache verification headers for the listing route on Cloudflare.
3. Expand test coverage to pagination and search-controls behavior.

## Bonus task status

### Attempted
- Cloudflare Workers deployment setup via OpenNext

### Not fully implemented
- visible `x-cache-status` header
- dedicated Suspense streaming bonus section
- formal accessibility audit report artifact



## Submission note suggestion

> I focused on building a polished, production-minded implementation of the required scope with strong URL-driven state, maintainable server/client boundaries, and practical performance decisions. With another 2 hours, I would add Cloudflare cache inspection headers, a documented accessibility audit, and broader interaction tests.


## Final deployment checklist

Use these exact Cloudflare settings:

- Install command: `npm install`
- Deploy command: `npm run deploy`
- Environment variable: `NODE_VERSION=20`

Root version files included in this repo:

- `.nvmrc` → `20`
- `.node-version` → `20`

If you are testing locally on Windows, use `npm run dev` for development. For Cloudflare preview and deploy, WSL is more reliable than native Windows because OpenNext warns about partial Windows compatibility.



## OLAYENIKAN MICHAEL
