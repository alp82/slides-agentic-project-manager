# Visual wayfinder demo ideas

Research date: 2026-09-07. Brief: mixed technical meetup audience; 8 minutes of slides, 17 minutes of demo, 5 minutes of Q&A. The user selected the **reaction picker (GIF + emoji)**. Provider choice and exact implementation scope remain open; this is not a promise to build everything from scratch in 17 minutes.

## Verified building blocks

- **gif-picker-react:** verified npm latest is **2.0.0**, with React/React DOM >=17 peer requirements. It supports GIPHY and KLIPY via provider imports. [Published npm metadata](https://registry.npmjs.org/gif-picker-react/latest)
- The component supplies GIF browsing/search and a provider-independent `onGifClick` result containing `imageUrl`, description, dimensions, and provider. It supports sizing/themes and is styled to complement `emoji-picker-react`. Both built-in providers need keys. GIPHY pingback analytics are not implemented; KLIPY ads are filtered out, so disable ads for that key. Older Tenor-only examples are not the API to copy. [Maintainer documentation](https://github.com/MrBartusek/gif-picker-react)
- **KLIPY:** create a platform/key in the Partner Panel. Testing keys allow **100 API requests/hour**; production access requires a request. Ads are optional and can be turned off per key. Thus KLIPY is a viable alternative, not an unlimited testing-key workaround. [Official developer FAQ](https://klipy.com/developers) Its docs require a `Search KLIPY` placeholder and describe additional watermark/footer branding as optional. [Official API documentation](https://docs.klipy.com/) Its terms require source attribution where supplied and restrict caching and combined results; use a single GIF provider and independent assets for any fallback. [Official API terms](https://klipy.com/support/api-terms)

- **GIPHY:** an account and API key are required. Beta keys start at 100 searches/API calls per hour; higher-volume production access requires an application, review, and a pricing discussion. Search and Trending endpoints and JavaScript/React components are available. Its docs require visible “Powered By GIPHY” attribution, direct client requests, and prohibit mixing providers in one grid or caching media/URLs without approval. For a prototype, separate GIF and emoji tabs are a design suggestion, not a verified requirement concerning native emoji. Submit searches deliberately instead of requesting on every keystroke. Use independent local assets for a fallback, not a downloaded GIPHY cache. The latter UI choices are recommendations inferred from those constraints. No production price or actual key provisioning was verified. [Official GIPHY documentation](https://developers.giphy.com/docs/)
- **Tenor:** the official quickstart says new API clients have not been accepted since January 2026. It is therefore unsuitable for a fresh demo integration. [Official Tenor quickstart](https://developers.google.com/tenor/guides/quickstart)
- **Emoji Mart:** its `@emoji-mart/data` package can be bundled directly for offline data availability. The picker supports search, selection callbacks, native emoji rendering, and custom emojis including GIFs. This makes the emoji half possible without an API key. Bundling increases the initial bundle size; native glyph appearance depends on the presenting machine. [Official repository documentation](https://github.com/missive/emoji-mart)
- **emoji-picker-element:** an alternative web component supports emoji search and selection. It fetches emoji data from a CDN by default, but supports a local `dataSource` URL and a published data package. IndexedDB gives offline data access after the initial load; do not confuse that with a fully offline first launch. [Official repository documentation](https://github.com/nolanlawson/emoji-picker-element)
- **canvas-confetti:** an npm browser library can render custom shapes from text, including emoji, and exposes particle count, colors, spread, and reduced-motion handling. This is a building block for a visual demo with bundled code and no external content service. [Official repository documentation](https://github.com/catdad/canvas-confetti)

## Creative shortlist

The following scopes and assessments are proposals. Supporting component capabilities are sourced above; audience appeal and demo suitability are judgments.

| Idea | Smallest useful version and visual payoff | Decision worth showing | Setup and boundary |
| --- | --- | --- | --- |
| **GIF + emoji picker** | Two tabs, search, a colorful results grid, one large selected reaction, and copy emoji or GIF link. “Find my reaction to this meeting.” | Is success finding something quickly or expressing a specific mood? Live catalog or small authored collection? | Most faithful to the seed. Bundle emoji data; configure the chosen GIPHY or KLIPY key beforehand for live GIF search. No uploads, GIF editing, accounts, or chat integration. |
| **Reaction/status-card composer** | Choose emoji, background color, and one line of text; a giant card updates live. “🫠 Everything is urgent” becomes “🧭 One decision at a time.” Copy the text. | Useful project status or personal expression? Presets or freeform? | No API needed. Three presets are enough to start; GIF backgrounds and image export are separate possible extensions. Large typography reads well on a projector. |
| **Emoji movie quiz** | Five authored emoji riddles; guess aloud, reveal the title, go to the next card. Example: 🦁👑. | Cooperative room game or individual score? How much help makes a clue fun? | Local data, no API or model needed. Audience interaction is immediate. Exclude multiplayer, movie databases, and automatic clue generation from the first slice. |
| **Tiny celebration maker** | Enter a small win, choose an emoji and color, press Celebrate: giant message plus matching confetti. “We shipped!” with 🚀. | A quick celebratory moment or a reusable message? Subtle or ridiculous animation? | Bundle canvas-confetti. No service setup. A useful team ritual with a theatrical result; sharing and animation export remain extensions. |

## Selected direction and implementation recommendation

The user selected the **reaction picker**. Recommend using an existing picker component so the demo can focus on decisions and a visible, useful addition: select a GIF or emoji, show a large reaction preview, and copy its link or text. Provider choice remains unresolved; start with whichever provider has a working key, then verify actual search quality and remaining quota before the event. Keep one provider in the initial scope. No provider account or live API integration was tested in this research.

The component API makes either provider a small configuration choice:

```tsx
import { GifPicker } from 'gif-picker-react';
import { Giphy } from 'gif-picker-react/providers/giphy';
import { Klipy } from 'gif-picker-react/providers/klipy';

// Choose one provider for the demo.
<GifPicker provider={Giphy('YOUR_API_KEY')} onGifClick={handleSelection} />
// Or:
<GifPicker provider={Klipy('YOUR_APP_KEY')} onGifClick={handleSelection} />
```

These are documented API examples, not a tested app. The picker handles its built-in search/footer branding; preserve the chosen provider's attribution when adding the separate preview. [Maintainer usage and provider documentation](https://github.com/MrBartusek/gif-picker-react#gif-providers)

Suggested setup: pin the verified package version, configure one key, keep KLIPY ads disabled if chosen, check a few intended searches, and prepare an independent emoji-only fallback. Those are recommendations for demo reliability, not completed setup. Both providers' initial 100-call hourly limits include preparatory calls, so budget live searches and development traffic together.

The other shortlist ideas remain historical alternatives, not additional projects to build.

A playful variant of the picker is “reaction translator”: type “works on my machine” and find a reaction. Keep this as ordinary search or clearly labeled local tags initially. Semantic interpretation would be a separate product decision; no AI model inside the demo app is needed to demonstrate AI organizing its development.

## Suggested 17-minute demo spine

This is a pacing proposal, not an estimate for completing the whole project. Keep a clearly identified prepared checkpoint available if a live step takes longer.

| Demo time | What the audience sees |
| --- | --- |
| 0–2 min | State the playful loose idea and the destination. Name one deliberate boundary, such as a local prototype with no accounts. |
| 2–5 min | Show a decision map: a few sharp questions, dependencies, and what remains unknown. The human chooses what matters. |
| 5–8 min | Open a research result and its primary source. Show how provider availability or bundled emoji data changes a decision. Distinguish prepared findings from live research. |
| 8–12 min | Work one visual prototype decision with the human/audience: presets versus freeform, or compact picker versus large reaction preview. React to an actual rough artifact. |
| 12–15 min | Execute one bounded change or show a labeled prepared implementation checkpoint. Point to the decision that gave it scope. |
| 15–17 min | Return to the map: where the answer lives, what is unblocked, and how another session can continue. End on the visual result. |

The supplied wayfinder instructions separate charting from ticket resolution and limit a normal work session to one non-research ticket. Demonstrate separate sessions or prepared states rather than implying one invocation performs every stage. Execution needs an explicit Notes override or a handoff once planning is complete. [Supplied local wayfinder instructions](/home/alp/.agents/skills/wayfinder/SKILL.md)

Use one harness on stage to keep the narrative legible. Claude Code or Codex and the issue tracker remain presenter choices; this research does not establish feature parity. The app itself can be entirely conventional: AI assists the work around it.
