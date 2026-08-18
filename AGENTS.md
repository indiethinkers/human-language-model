# AGENTS.md

## Cursor Cloud specific instructions

Indie Thinkers is a single static [Astro](https://astro.build) site (no backend, no database). It publishes essays from a content collection in `src/content/blog/`. There is one service: the local Astro dev server.

### Toolchain

- The project uses **Bun** as its package manager (see `bun.lock`); `npm`/`node` alone are not enough. The startup update script installs Bun to `~/.bun/bin` and runs `bun install`, so dependencies are ready when a session begins.
- Interactive login shells pick up `bun` on `PATH` (the Bun installer appends it to `~/.bashrc`). In non-interactive contexts, call it explicitly as `~/.bun/bin/bun`.

### Running / building / checking

Standard commands are defined in `package.json` scripts and `README.md`; run them with Bun:

- Dev server: `bun run dev` (serves at `http://localhost:4321/`).
- Production build: `bun run build` (outputs to `dist/`).
- Preview built site: `bun run preview`.

There are no separate lint or unit-test scripts in this repo. The Astro build (`bun run build`) is the effective correctness check: it syncs the content collection, type-checks essay frontmatter against the Zod schema in `src/content.config.ts`, and generates all routes. Treat a clean `bun run build` as the lint/typecheck gate.

### Notes / gotchas

- Adding or editing a Markdown/MDX file under `src/content/blog/` is picked up live by the dev server; the essay must include the required frontmatter (`title`, `description`, `quote`, `copyrightHolder`, `license: 'CC-BY-4.0'`, `pubDate`) or content sync will fail.
- The content collection is named `blog` internally, but public URLs and copy use `essays` (e.g. `/essays/<slug>`).
- Image optimization via `sharp` runs during `bun run build`; the first build is slower while images are converted to WebP.
