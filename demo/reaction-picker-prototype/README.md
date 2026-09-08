# Reaction room — throwaway POC

> Premature, unvalidated artifact: this code was created by the agent during a planning-only wayfinder session. It does not establish approved scope, design, or a requirement to reuse this implementation. The [presentation map](../../.scratch/wayfinder-meetup/map.md) records the open decisions.

Prebuilt reference for the wayfinder meetup demo. The app is conventional React; AI helps organize and implement its development. This POC answers which layout makes finding, previewing, and copying a reaction easiest to understand on stage. It is not a production service or a validated design choice.

From the presentation root:

```bash
pnpm demo:install
pnpm demo
```

Open http://127.0.0.1:5174. Emoji browsing/search, categories, skin tones, preview, copy, and eight recent emoji work without credentials. State is in memory and resets on reload. Copy uses the browser clipboard on localhost; if denied, the app exposes selectable text.

Development layouts:

- `/?variant=A` — Studio: picker and large preview side by side (default).
- `/?variant=B` — Spotlight: large preview first, picker underneath.
- `/?variant=C` — Compact: reaction alongside a sample chat message.

Use the bottom switcher or left/right keys outside form controls. The switcher is hidden in production builds. Development console output shows selection/layout state without keys or raw GIF data. No layout has been selected by the presenter yet.

## Connect GIF search

Copy `.env.example` to `.env.local` in this directory. Set `VITE_GIF_PROVIDER` to `giphy` or `klipy` and set `VITE_GIF_API_KEY` to your key. Restart the server. Repeat separately in `../reaction-picker-starter` before the event if it will use GIFs.

Both are browser client APIs, so the key is visible to browsers; use a provider key intended for this purpose. For KLIPY, disable ads on the key. The app uses the provider's strongest available content filter, preserves picker branding, and displays provider/source attribution beneath a selected GIF. It copies the GIF media URL, not image bytes. GIF results and selections are not saved in recents or persistent storage.

Without a key, the GIF tab offers a route back to emoji. It does not present fixtures as real search results. A configured key, real GIF search, and provider availability still need verification before the event; no key is bundled.

## Build

```bash
pnpm demo:build
```

The build includes a TypeScript check. The app is isolated from the Slidev deck and uses its own lockfile. The separate [live starter](../reaction-picker-starter) contains the same dependencies but no completed picker implementation. See [the runbook](../../docs/demo/runbook.md) for prompts and checkpoints.

## Verification during preparation

Both app builds and the existing Slidev build passed. Browser checks covered emoji search/selection, empty results, categories, clipboard copy and its manual fallback, recent-emoji capacity/deduplication/clear, all three layouts, the disconnected GIF state, and a 390px-wide viewport. The default layout's copy button fits within a 1280×800 viewport. [Studio screenshot](../../docs/demo/assets/reaction-picker-studio.png)

Both GIPHY and KLIPY adapters were exercised in a browser with intercepted sample API responses: search, selection, preview attribution, and copying the media URL worked without page errors. This verifies app wiring, not real credentials, provider availability, or content quality. No fixtures are shipped as GIF search results. The POC build reports a non-blocking bundle-size warning because the complete emoji dataset is bundled locally.

This directory is deliberately named `prototype`. The workspace was not a Git repository when created, so no throwaway branch or commit was made. Preserve the POC as a reference until the presenter has chosen a design.
