# Integrated package validation — 2026-09-08

The nine-slide deck, completed POC, separate live starter, persistent terminal, and five short prompts are assembled. Launch and switching instructions are in the [runbook](runbook.md). This was an integration check, not a rehearsal or timed demo.

## Checks

- `pnpm build`, `pnpm demo:build`, and `pnpm build` in `/home/alp/dev/reaction-picker-wayfinder-demo` passed. The POC retains its non-blocking large emoji bundle warning.
- Captured [the actual POC](../../public/demo/reaction-picker.png) with live KLIPY results/media loaded and integrated it into [slide 8](integrated-prototype.png). It is labelled prebuilt reference; the live prototype remains audience-driven.
- Chromium checked all five editable presenter prompts, copied an edited prompt, and read back the same clipboard text. The runbook is their source; `pnpm demo:prompts` regenerates the page.
- Opened the live-app link into the running standalone starter, then returned to the deck. Slide navigation and terminal hide/show preserved the iframe load count. The terminal process continues independently while the app window is shown.
- Visually reviewed the integrated slide at full size and [beside the terminal](integrated-terminal.png). Improved navigation-button contrast on the black letterbox. Hide the terminal for full-size explanations; use the full app window for prototype feedback.
- Served the production output locally: it omitted terminal iframes and included the five-prompt page and POC screenshot.
- The live print route omitted terminal iframes and produced a browser PDF at `/tmp/meetup-package.pdf` (temporary validation output). Static/PDF slides include the reference screenshot, not live terminal output or a recorded demo.
- Browser automation reported Slidev wake-lock permission denials in headless mode; no other page errors occurred. These do not establish physical display sleep behavior.

## Export and remaining limits

`pnpm export --executable-path /home/alp/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome --output /tmp/meetup-final-slides.pdf` failed because this repo does not install `playwright-chromium`. Use browser print from `/1?print` for the checked PDF path. The CLI's reported remedy is installing `playwright-chromium` as a development dependency before using CLI export; no successful CLI export is claimed.

Native paste into a destination chat application, animated GIF clipboard support, projector/clicker behavior, tool-approval interactions, and actual network-outage recovery remain unverified. Earlier [terminal checks](../../demo/terminal/README.md) and [POC checks](../../demo/reaction-picker-prototype/README.md) retain their stated boundaries. No new live map was created, no audience decisions were simulated, and no full skill sequence was rehearsed. The live starter landing page does not validate provider access by itself.

The browser checks used an already installed Chromium executable because the temporary Playwright package's default browser download was absent. No testing dependency was added to the apps.
