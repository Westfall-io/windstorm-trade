# DigitalForge — README_GIT

This file documents what the code in `trade/src` does and where to look for the main responsibilities. It is intended to help contributors quickly understand how the Vue dashboard boots, where UI components live, which composables provide shared state, and where the app calls backend APIs.

## Quick start

- Install dependencies (recommended: `pnpm` is available in this repo):

```bash
pnpm install
pnpm dev
```

Alternate commands (npm):

```bash
npm install
npm run dev
```

The local dev server uses `vite` and the `dev` script in `package.json`.

## High-level overview

- Entrypoint: `src/main.ts`
  - Creates the Vue app, registers global layout components and third-party web components (Astro UXDS), sets up the router and mounts the app.

- Route & navigation: `src/router.ts` and `src/App.vue`
  - `router.ts` maps URL paths to view components (dashboard, requirements, threads, verifications, artifacts, etc.).
  - `App.vue` picks which layout component to render around the current route by reading `route.meta.layout` and falling back to a default.

- Layouts & top-level components: `src/components`
  - `Sidebar.vue` and `Header.vue` build the navigation and header. They use shared reactive state from `composables/useSidebar.ts`.
  - Layout registration happens in `main.ts` (registered as `DefaultLayout`/`EmptyLayout`).

- Views: `src/views/*`
  - Each page (for example `Dashboard.vue`, `Threads.vue`, `Reqts.vue`) is a Vue view component exported as pages in the router.
  - `Dashboard.vue` demonstrates API usage: it fetches small summary counts from a backend endpoint and shows them inside Astro cards.

- Composables / shared state: `src/composables/*`
  - `useSidebar.ts`: exposes `isOpen` reactive ref that controls opening/closing the responsive sidebar.
  - `useTableData.ts`: provides example/mock table datasets used by UI templates (simple, paginated, wide table samples).

- Constants: `src/constants.tsx`
  - Stores environment defaults such as `api_addr` used by views to build backend URLs. (See how `Dashboard.vue` uses `defaults.api_addr`.)

- Third-party UI primitives
  - The project imports Astro UXDS web components (`@astrouxds/astro-web-components`) in `main.ts` and defines them with `customElements.define(...)`. These can be used directly in templates as `<rux-card>`, `<rux-container>`, `<rux-global-status-bar>`, etc.

## How the frontend talks to the backend

- Example: `Dashboard.vue` calls endpoints under `${defaults.api_addr}/views/`:
  - `/views/count_models/`
  - `/views/count_requirements/`
  - `/views/count_threads/`

  The components use `fetch(...)` to GET these endpoints and store results into reactive refs for display.

- If you change the backend address, update `src/constants.tsx` accordingly.

## Where to add documentation & docstrings

- Top-of-file comments were added to several core files to explain responsibilities. If you add new modules or views, include a short module-level docstring explaining:
  - purpose of the file
  - exported symbols and their intent
  - network or side-effecting behavior (API endpoints, global registration)

## Linting / type-checking

- Scripts in `package.json`:
  - `dev` — start vite dev server
  - `build` — runs `vue-tsc` then `vite build`
  - `lint` / `lint:fix` — runs ESLint over source files

Run the linter and type-checker after editing comments to ensure no formatting/type issues:

```bash
pnpm lint
pnpm build
```

## Notes & next steps

- Docstrings were added to several core files (layouts, main, router, composables, dashboard view). I can:
  - (A) Continue adding short top-level docstrings to remaining views and templates under `src/views/` and `src/components/`, or
  - (B) Run the linter & `vue-tsc` type-check to verify edits.

Choose one and I will proceed.
