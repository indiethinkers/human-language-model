# Indie Thinkers

Indie Thinkers is an Astro site with a minimal quote-style homepage inspired by the Shiny Dimes interface. The homepage renders a single hardcoded quote with a typewriter effect, fixed corner navigation, and local favicon/font assets.

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
- Shared metadata and favicon tags: `src/components/BaseHead.astro`
- Site title constants: `src/consts.ts`
- Public favicon assets: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`, `public/site.webmanifest`
- Copied Geist font assets: `public/fonts/`

The homepage does not fetch quote data from Google Sheets. The current quote and essay URL are defined directly in `src/pages/index.astro`.

## Links

- Submit: `https://indiethinkers.dfos.com/`
- Subscribe: `http://indiethinkers.substack.com/subscribe`
- Essay placeholder: `https://indiethinkers.com`
