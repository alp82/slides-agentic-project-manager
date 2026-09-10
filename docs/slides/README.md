# Slide deck handoff

Run `pnpm dev` for the presentation, or `pnpm build` for the static deck. Presenter notes live in `slides.md`; Slidev exposes them at `/presenter/`. The nine slides are independent explanation segments to interleave with live work, not a required opening block.

`components/WayfinderStory.vue` contains the accepted compositions and styling. `public/skills-qr.svg` encodes https://github.com/mattpocock/skills, verified on 2026-09-08. It is a local asset and does not call an external QR service at presentation time.

[Layout overview](deck-overview.png) captures all nine slides. The production build passed and Chromium rendered all nine at 1440 × 810 without page errors or detected content overflow. Visual review covered the compositions, text placement, dependency arrows, and closing link/QR. Physical projector and phone scanning checks belong to final integration.

## Integrated demo

- Slide 3 links to the separate live repository's issue list; select the map after charting creates it.
- Slide 8 shows an actual prebuilt POC screenshot and links to the live app (5175) and reference (5174). Switch the audience display to the live app for feedback, then return to the deck; Claude continues in tmux.
- Run `pnpm present` for the persistent terminal; see [launch, controls, and fallback](../../demo/terminal/README.md). Hide the terminal when an explanation needs full-size text. Ordinary development, static builds, and PDF omit it.
- Open `/demo/prompts.html` on the presenter display for five editable, copyable prompts and surface links. The [runbook](../demo/runbook.md) is their source; regenerate with `pnpm demo:prompts` after edits.
- [Package validation](../demo/validation.md) records final checks and remaining physical/native limitations. The layout overview above predates the final screenshot replacement; [integrated prototype slide](../demo/integrated-prototype.png) shows the delivered slide.

The closing slide cues execution before Q&A. It does not promise completion during the talk. Static/PDF output includes the reference image rather than a live app or terminal.

## Slide 5 map design

Selected prototype C (Territories) for its clear status groups and prominent frontier. The final component is `components/MapTerritories.vue`. The three original variants are archived on the local branch `prototype/slide-5-map`, in `components/MapPrototype.vue`; its commit records the design question and user verdict.
