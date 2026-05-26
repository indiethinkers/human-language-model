# Indie Thinkers

Indie Thinkers is an Astro site with a minimal quote-style homepage and essay reading experience inspired by the Shiny Dimes interface. The homepage renders essay quotes with a typewriter effect, fixed corner navigation, and local favicon/font assets.

The public writing routes live under `/essays`. The essays index renders a simple lowercase list of essay links in the same visual shell as the homepage, and individual essay pages use the same fixed-corner layout without a featured hero image.

## Requirements

- Node.js `>=22.12.0`
- Bun is used for the checked-in lockfile

## Development

Install dependencies:

```sh
bun install
```

Start the local dev server:

```sh
bun run dev
```

Build the site:

```sh
bun run build
```

Preview the production build:

```sh
bun run preview
```

## Project Notes

- Homepage route: `src/pages/index.astro`
- Essays index route: `src/pages/essays/index.astro`
- Essay detail route: `src/pages/essays/[...slug].astro`
- Essay detail layout: `src/layouts/EssayPost.astro`
- Essay content collection: `src/content/blog/`
- Author detail route: `src/pages/authors/[slug].astro`
- Author metadata: `src/data/authors.ts`
- Shared metadata and favicon tags: `src/components/BaseHead.astro`
- Site title constants: `src/consts.ts`
- Public favicon assets: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`, `public/site.webmanifest`
- Copied Geist font assets: `public/fonts/`

The homepage does not fetch quote data from Google Sheets. Homepage quotes come from each essay's required `quote` frontmatter field, sorted chronologically by `pubDate`, and each quote links to its essay route.

The old Astro starter blog routes and boilerplate posts have been removed. The current essay content is `src/content/blog/on-indie-thinkers.md`; Astro still uses the collection name `blog` internally, but the public URLs are `/essays` and `/essays/:slug`. Author pages live at `/authors/:slug`; the first author profile is `/authors/daniel-hunter`.

## Links

- Essays: `/essays`
- Submit: `https://indiethinkers.dfos.com/`
- Subscribe: `http://indiethinkers.substack.com/subscribe`
