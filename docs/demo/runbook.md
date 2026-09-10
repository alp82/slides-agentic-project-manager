# Live reaction-picker prompts

Use Claude Code in `/home/alp/dev/reaction-picker-wayfinder-demo`, with the separate [demo repository](https://github.com/alp82/reaction-picker-wayfinder-demo) as its GitHub origin. The standalone checkout is the live starter; the prebuilt POC in this presentation repository is `demo/reaction-picker-prototype` (`pnpm demo`, port 5174).

Start the starter with `pnpm dev` in the standalone checkout (port 5175). `CLAUDE.md` carries the standing demo context: prepared dependencies, KLIPY, four ticket types, scope-change rules, and the execution override to record in the map's Notes. The starter has no picker behavior and no pre-created map.

## Launch and switch

Run these in separate terminals:

| Surface | Command and working directory | URL |
| --- | --- | --- |
| Deck + Claude | `pnpm present` in this presentation repo | Presenter: http://localhost:3047/presenter/1 · audience: http://localhost:3047/1 |
| Completed reference | `pnpm demo` in this presentation repo | http://127.0.0.1:5174 |
| Live starter / prototype | `pnpm dev` in `/home/alp/dev/reaction-picker-wayfinder-demo` | http://127.0.0.1:5175 |
| Copyable prompts | Open after starting the deck | http://localhost:3047/demo/prompts.html |

Keep the prompt page on the presenter display. It has editable text and Copy buttons; replace map numbers and ticket titles with those actually created. Regenerate it with `pnpm demo:prompts` after editing the prompt blocks below.

Open the live tracker from the prompt page or slide 3 and select the newly created map. During the prototype highlight, open the live app using slide 8 or the prompt page, move that window to the audience display, and return to the audience deck afterward. Window switching leaves Claude running in tmux. Hide the terminal for full-size slide explanations; show it again when returning to the agent. The slide 8 screenshot is explicitly the completed reference, captured from the working POC, not a predetermined live result.

If live work stalls, open the completed reference and identify it as prebuilt. If GIF access fails, demonstrate the independent emoji interaction and the unavailable/Retry state. If the embedded terminal fails, use `tmux attach -t wayfinder-live-demo`. Static slides retain the app screenshot, links, and QR; local app links require the corresponding servers. No recorded charting session or extra prepared checkpoints are supplied.

## Copy prompts

The blocks use Claude Code's `/wayfinder` invocation. Each numbered step starts a fresh session. Answer human questions in that step's session; the agent cannot make the audience's decisions for them.

### 1. Chart

```text
/wayfinder I want to build a fun little reaction picker for finding and copying GIFs and emoji into conversations—help me figure it out, explore the design with me, and build it. This is a live demo: create exactly one research, one grilling, one prototype, and one execution task ticket, and keep grilling short.
```

Let charting finish. It may launch the research worker; inspect that ticket's outcome instead of starting a duplicate. The research question is real: whether the installed picker supplies the interaction we need, and what copying GIFs actually supports. Research and grilling are independent; prototype waits for both.

### 2. Grill with the audience

```text
/wayfinder 1 Work “<grilling ticket title>” with me; let's ask the audience what the smallest useful find-and-copy interaction should be.
```

Invite input and give the presenter's own answer. The reference chose shared search and one-click copy without a separate preview; the room can inform the live decision. Wait for both research and grilling to resolve before the scope change.

### 3. Change scope halfway through

```text
Update 1 for this audience-selected change: <change>. Keep the same four tickets, revise affected tickets and dependencies, and explicitly amend affected resolutions while preserving their history; stop before prototyping.
```

Invite suggestions freely and choose one manageable change that affects the prototype and execution. Concrete examples from the POC include putting emoji above GIFs or loading more GIFs as you scroll; use one only if it changes the live map's current decision. If a resolution's question needs reopening, finish that decision in its own session before advancing.

### 4. Prototype the revised idea

```text
/wayfinder 1 Work “<prototype ticket title>”: show us visual options for the revised scope and let me react before recording the choice.
```

Show the result, invite reactions, and make the final design choice. This is the visual highlight. The ticket should preserve its runnable artifact and decision for the next session.

### 5. Execute during Q&A

```text
/wayfinder 1 Work “<execution ticket title>”: build the agreed reaction picker from the reviewed prototype, check the core interactions, and record the result and any limitations.
```

Start after the prototype resolves, immediately before Q&A. It may continue past the end of the talk; completion on stage is not required.

## Interleave the slides

Use about eight minutes of slides and seventeen minutes of live work in aggregate, followed by five minutes Q&A. Explain skills and the harness around charting; ticket types and dependencies around research/grilling; saved context and amended decisions around the scope change; return to the app for prototyping. These are placements, not a consecutive timing script. No additional research/prototype checkpoints are prepared.

## Preparation and verification

The starter is deliberately separate from the completed POC. The reference's actual work supplies the prompts: testing an existing picker, narrowing interaction scope, choosing a visual composition, handling GIF copy limits, and refining ordering/pagination. The full POC design is not a predetermined answer for the live audience.

Starter dependency installation and production build are checked during preparation. No live chart, research worker, audience exchange, or end-to-end prompt run has been rehearsed or timed. The [terminal setup](../../demo/terminal/README.md) records verified Claude Code authentication, workspace trust, live `/wayfinder` discovery, and embedded-terminal launch/fallback. Native paste into an intended chat app, the full skill flow, physical clicker/projector behavior, and network-outage recovery remain unverified; see [package validation](validation.md). These are not claimed by the automated integration checks.

The reference README records successful live KLIPY search/media loading and the remaining native animated-GIF clipboard limits. The starter consumes its own ignored `.env.local`; the landing page cannot validate provider access. If GIF access fails in the eventual app, retain independent local emoji and show an honest unavailable state with Retry.

Terminal setup belongs to [Prepare and validate the chosen live terminal surface](https://github.com/alp82/slides-agentic-project-manager/issues/12). Final assembly belongs to [Finish the interleaved deck and demo package](https://github.com/alp82/slides-agentic-project-manager/issues/13). Rehearsal and timing are out of scope.
