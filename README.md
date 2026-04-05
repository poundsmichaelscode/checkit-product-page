
# Checkit Product page 

A production-quality **Content Explorer** built for a Frontend Engineer assessment using **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Cloudflare Workers** deployment support.

**Live concept:** a fast, responsive product discovery experience with server-rendered listings, shareable URL-based filtering, dynamic product detail pages, and strong performance-focused engineering decisions.

## Repository

GitHub: [poundsmichaelscode/checkit-product-page](https://github.com/poundsmichaelscode/checkit-product-page)

---

## Overview

Checkit is a modern content explorer application built around the **DummyJSON Products API**. It allows users to:

- browse products in a responsive grid
- search products with debounced input
- filter by category
- paginate through results
- open dynamic product detail pages
- share the current filtered state through the URL

The goal of this project was not to build a massive product, but to demonstrate **frontend engineering judgment**, including:

- clean architecture
- scalable component composition
- server-side data fetching
- strong UX states
- performance optimization
- deployment awareness for Cloudflare Workers

---

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **React 19**
- **Tailwind CSS**
- **Vitest + React Testing Library**
- **OpenNext Cloudflare**
- **Wrangler**

---

## API Choice

This project uses the **DummyJSON Products API**.

### Why DummyJSON?
It was chosen because it provides:

- stable public endpoints
- product images
- categories
- search support
- item detail endpoints
- pagination-friendly data
- no API key requirement

This made it a practical choice for building a polished content explorer within the assessment timeframe.

---

## Features

### 1. Listing Page
- server-rendered product listing
- displays at least 20 items
- responsive card grid
- each card includes:
  - product title
  - product image with graceful fallback
  - category
  - rating
  - price
- pagination support
- responsive layout:
  - mobile: 1 column
  - tablet: 2 columns
  - desktop: 3–4 columns

### 2. Detail Page
- dynamic route: `/products/[id]`
- server-fetched product detail page
- SEO metadata generated per product
- Open Graph image metadata
- breadcrumb navigation back to listing

### 3. Search and Filtering
- debounced search input
- category filter
- sort support
- URL-driven state using search params
- filters are shareable through the URL

### 4. UX States
- skeleton loading states
- dedicated empty state UI
- friendly error boundary
- image fallbacks
- clean no-results experience

### 5. Testing
- meaningful component-level tests using:
  - Vitest
  - React Testing Library

### 6. Deployment Support
- Cloudflare Workers compatible setup using OpenNext
- configured for modern SSR deployment flow

---

## Project Structure

```txt
app/
  error.tsx
  globals.css
  layout.tsx
  loading.tsx
  page.tsx
  products/
    [id]/
      page.tsx

components/
  filters/
  layout/
  products/
  ui/

lib/
  api.ts
  constants.ts
  utils.ts

types/
  product.ts

public/
tests/
wrangler.jsonc
next.config.ts
````

### Architecture Notes

This project follows a structure designed for clarity and scalability:

* **app/** contains route-level UI and route composition
* **components/** contains reusable presentational and interactive UI pieces
* **lib/** contains API access, constants, and utilities
* **types/** centralizes shared TypeScript contracts
* route components do **not** call `fetch()` directly
* shared logic is extracted out of JSX where possible

---

## Engineering Decisions

### Why App Router?

The App Router provides a strong fit for this assessment because it supports:

* server components
* route-level loading and error states
* metadata generation
* improved data-fetching organization

### Why pagination instead of infinite scroll?

Pagination was chosen because it is:

* simpler to reason about
* easier to test
* more accessible
* better for shareable state and deterministic navigation
* easier to evaluate during code review

It also maps cleanly to URL-driven search params, which is valuable for this assessment.

### Why URL-driven filters?

Search and filters are stored in the URL so that:

* views are shareable
* browser navigation works naturally
* state survives refreshes
* the app behaves like a real production search experience

---

## Performance Optimizations

This project includes multiple performance-focused decisions:

### 1. Optimized Images

* uses `next/image`
* remote image sources are explicitly configured
* prevents layout shift with defined sizing behavior
* improves loading efficiency for media-heavy cards

### 2. Server-side Data Fetching + Cache Control

Fetch requests use explicit Next.js caching strategies where appropriate:

* category lists use longer revalidation
* listing data uses shorter revalidation
* detail pages use controlled revalidation windows

This balances freshness and performance.

### 3. Font Optimization

* uses `next/font`
* avoids layout instability from late-loading web fonts
* improves rendering performance

### 4. Lean Component Design

* avoids unnecessary heavy client-side state
* keeps data logic mostly server-side
* reduces hydration cost where possible

### 5. Static Asset Caching

* Cloudflare-friendly static headers included for immutable Next assets

---

## Accessibility Notes

The UI was built with accessibility in mind:

* semantic HTML structure
* accessible buttons and links
* readable color contrast
* responsive spacing and layout
* keyboard-friendly interactive controls
* clear visual hierarchy

---

## Setup Instructions

### Requirements

* Node.js 20+
* npm

### Run locally

```bash
git clone https://github.com/poundsmichaelscode/checkit-product-page.git
cd checkit-product-page
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
DUMMYJSON_BASE_URL=https://dummyjson.com
```

You can also use `.env.local` during development.

### Example

A `.env.example` file should contain:

```env
DUMMYJSON_BASE_URL=
```

---

## Testing

Run tests with:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

---

## Cloudflare Deployment

This project is configured for **Cloudflare Workers** using **OpenNext**.

### Recommended deployment approach

For Windows development, local OpenNext preview/deploy may be unstable because the Cloudflare local runtime is not fully reliable on native Windows. The recommended production path is:

* develop locally with `npm run dev`
* deploy through **Cloudflare Workers Builds** or from **WSL/Linux**

### Cloudflare build settings

* **Install command**

  ```bash
  npm install
  ```

* **Build command**

  ```bash
  npx @opennextjs/cloudflare build
  ```

* **Deploy command**

  ```bash
  npx @opennextjs/cloudflare deploy
  ```

### Recommended environment variables in Cloudflare

```env
NODE_VERSION=20
DUMMYJSON_BASE_URL=https://dummyjson.com
```

---

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "vitest run",
  "test:watch": "vitest",
  "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
  "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
  "upload": "opennextjs-cloudflare build && opennextjs-cloudflare upload",
  "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
}
```

---

## Known Trade-offs and Limitations

Given more time, I would improve the following areas:

* add more robust test coverage across filtering and pagination flows
* enhance empty/error state illustrations and animation polish
* add more advanced accessibility auditing and documented results
* introduce analytics for search/filter interaction
* improve detail page richness with related items or comparison tools
* validate final production deployment on Linux-only CI for a stricter Cloudflare verification path

---

## What I Would Tackle Next With Another 2 Hours

If given two more hours, I would:

1. add a richer accessibility audit and document the fixes clearly
2. improve perceived performance with more granular Suspense boundaries
3. refine UI polish further on pagination, transitions, and card interactions

---

## Assessment Alignment

This submission is designed to demonstrate my strength in:

* UI implementation
* responsive design
* URL-driven state management
* server-side rendering patterns
* clean TypeScript architecture
* production-aware deployment setup
* performance-conscious frontend engineering

---

## Author

**Olayanikan Michael**
GitHub: [@poundsmichaelscode](https://github.com/poundsmichaelscode)

---

## License

This project was created for assessment purposes.





## OLAYENIKAN MICHAEL
