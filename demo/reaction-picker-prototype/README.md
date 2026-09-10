# re:act — reaction-picker POC

The prebuilt reference/fallback for the meetup demo, implementing the accepted **Gallery** design: warm off-white, ink, orange, centered search, local emoji first (“Keep it simple”), then a responsive GIF grid (“Or say a little more”) with infinite scrolling. Typing searches KLIPY after 300 ms; clicking copies immediately. Empty search shows trending GIFs. The gallery loads 24 GIFs per page and automatically appends the next page near the bottom, until KLIPY reports no more results. A failed next page preserves existing GIFs and offers Retry. New searches reset pagination.

## Run

From the presentation root:

```bash
pnpm demo:install
pnpm demo
```

Open http://127.0.0.1:5174. To connect live GIFs, copy this directory's `.env.example` to `.env.local`, set `VITE_GIF_API_KEY` to a KLIPY client API key with ads disabled, and restart Vite. The key is browser-visible. Provider choice is fixed to KLIPY; the old `VITE_GIF_PROVIDER` setting is unused.

Without a key, or when requests fail or exceed ten seconds, the app shows **GIF search unavailable** and **Retry**. Emoji search and copying work independently. No sample GIFs are shipped as live results. KLIPY attribution and the adapter's share callback are retained; share tracking failures do not invalidate a successful copy.

## Copy behavior

- Emoji copy as text.
- When the browser advertises `image/gif` clipboard support, the app downloads and writes the original GIF bytes, preserving any animation without converting to a still image.
- Otherwise, or if the image write/download fails, it copies the GIF media URL. Feedback distinguishes **GIF image copied**, **GIF URL copied**, and **Emoji text copied**.
- If clipboard access is denied, selectable text is shown for manual copying.

The image write begins during the click gesture using a promised blob, following the [ClipboardItem API](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem/ClipboardItem). Clipboard formats vary by browser; a successful image write also does not establish how a particular destination app handles pasted animation.

## Validation

```bash
pnpm demo:build
```

TypeScript and Vite production build pass. The full local emoji dataset produces a non-blocking chunk-size warning (~612 KB uncompressed, ~139 KB gzip).

`checks/browser.mjs` is a repeatable Playwright check, using intercepted KLIPY responses and a two-frame GIF fixture. Install Playwright in a temporary directory and pass its package path; it is intentionally not a runtime app dependency:

```bash
npm install --prefix /tmp/reaction-gallery-check playwright
/tmp/reaction-gallery-check/node_modules/.bin/playwright install chromium
# Terminal 1: fixture key is only for intercepted test requests
VITE_GIF_API_KEY=fixture-key pnpm --dir demo/reaction-picker-prototype exec vite --host 127.0.0.1 --port 5184 --strictPort
# Terminal 2, from the presentation root
PLAYWRIGHT_PACKAGE=/tmp/reaction-gallery-check/package.json node demo/reaction-picker-prototype/checks/browser.mjs
```

Do not use the fixture-key server for real provider checks. `APP_URL`, `BROWSER_PATH`, `CHECK_BROWSER`, and `SCREENSHOT_PATH` can override the check environment.

Latest checks on 2026-09-08: real KLIPY search for “great” returned 24 GIFs and scrolling appended the next page to reach 48; actual media loaded. Fixture browser checks also passed pagination, failed-page retry retaining existing results, deduplication, the end-of-results state, search resets, and emoji-first ordering.

Earlier build observations on 2026-09-08:

- Chromium 147.0.7727.15: debounced query, strongest content-filter parameter, initial page size, stale-response protection, emoji text clipboard readback, GIF URL clipboard readback, failed search with usable emoji, Retry recovery, no-results states, manual copy on denial, and 390px layout passed without page errors. Desktop and mobile fixture screenshots were inspected.
- Native `ClipboardItem.supports('image/gif')` returned **false**. Native animated-image copying could not be exercised in that browser. A simulated supporting clipboard received the exact original two-frame GIF bytes; this verifies the code path, not native support or pasting into another application.
- A separate server without credentials passed disconnected-state, Retry, and real emoji clipboard checks.
- Firefox automation could not run with the installed Playwright/browser pair (protocol version mismatch). No Firefox behavior is claimed.
- Live KLIPY access was initially unverified; the live search and image-loading checks above supersede that access limitation. Animated-image clipboard download CORS and paste-destination behavior remain unverified.

## Handoff to starter preparation

[Build the complete reaction-picker POC](https://github.com/alp82/slides-agentic-project-manager/issues/10) owns this implementation. [Prepare the starter and short prompts from the working POC](https://github.com/alp82/slides-agentic-project-manager/issues/8) owns changes to the separate starter and final demo prompts.

Actual implementation sequence and potential small changes:

1. Apply the selected Gallery composition; replace the earlier tabs, preview, and recent-history flow with one shared search and direct result buttons.
2. Reuse the installed KLIPY adapter behind the custom grid. Set a 300 ms debounce; protect against obsolete responses and stalled requests. Fetch pages of 24 via the [KLIPY pagination API](https://docs.klipy.com/gifs-api), append on scroll, deduplicate overlapping results, and retain loaded items when a page fails.
3. Search the bundled emoji names, aliases, keywords, and native text locally; show a small default set on empty input. Keep this independent of provider state and show emoji above the GIF gallery.
4. Add text copy, format-aware GIF copy, precise feedback, and manual fallback when access is denied.
5. Exercise API failures, Retry, delayed responses, clipboard behavior, and narrow layouts with controlled browser checks; distinguish those findings from live service verification.

The genuine decision points came from the map: minimal interaction scope, KLIPY, Gallery composition, and preserving animation with URL fallback. Candidate small follow-up changes include adjusting visible result count, debounce delay, or tile size. These are raw material for short prompts, not new approved scope or final prompts. No favorites, accounts, uploads, separate preview, or chat integration are included.
