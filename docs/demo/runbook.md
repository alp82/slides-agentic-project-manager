# Reaction picker: demo runbook and prompts

> Unvalidated reference: the agent created this runbook prematurely during a planning-only wayfinder session. The user has not approved its sequence, implementation scope, or prompts. The [presentation map](../../.scratch/wayfinder-meetup/map.md) is canonical; this document must not be treated as an execution instruction for the current charting effort.

Status: prepared POC and starter, with draft prompts derived from the implementation. Builds and browser interactions were checked; real provider credentials were not. These prompts have not been rehearsed or timed in a harness. Audience: mixed technical meetup. Slot: 8 minutes slides, 17 minutes demo, 5 minutes Q&A. Rehearsal is outside this effort.

## The point of the demo

“I want a fun reaction picker” is a destination with open questions. The agent helps expose those questions, gather facts, maintain the map, and carry context forward. The human chooses the scope and reacts to the result. The picker itself does not need AI.

Show one harness throughout: either Claude Code or Codex. Start the harness in `demo/reaction-picker-starter` so the live project is separate from the POC. Use local Markdown for a low-setup tracker unless the presenter chooses a configured issue tracker. Install Matt's skills and run project setup before the event; do not spend the 17 minutes installing tools or obtaining credentials. [Matt's installation instructions](https://github.com/mattpocock/skills#installation-30-second-setup)

## Prepared artifacts

| Artifact | Run / open | Purpose |
| --- | --- | --- |
| Completed POC | `pnpm demo` → http://127.0.0.1:5174 | Reference and fallback; openly identify it as prebuilt. |
| Starting scaffold | `pnpm demo:starter` → http://127.0.0.1:5175 | Live work; dependencies and landing page only. |
| Research | [Provider and component findings](../research/visual-demo-ideas.md) | Evidence to inspect or use if live research is slow. |
| Layouts | POC `/?variant=A`, `B`, or `C` | Studio, Spotlight, and Compact options; no winner selected yet. |

Run `pnpm demo:install` from the presentation root once. Configure the chosen key in each app's `.env.local` using `.env.example`; restart servers after changes. The default provider is GIPHY, and KLIPY is a configuration option, not a settled presenter choice. The key stays out of prompts. The POC's missing-key screen is intentional; emoji work immediately.

## Seventeen-minute route

This is a target allocation, not a measured promise about agent speed. Move to prepared evidence or the finished POC whenever a stage overruns. Do not rush through unanswered human decisions to force the clock.

| Demo time | Action | What to explain |
| --- | --- | --- |
| 0–2 | Show the scaffold and state the loose idea. | “I prepared the tools and built a reference beforehand. We'll make a small part of the journey live.” |
| 2–5 | Chart with prompt 1; answer the agent's first round. | Destination, decision tickets, dependencies, and what remains unknown. Charting ends before working a ticket. |
| 5–7 | Inspect the research ticket or the prepared research note. | Existing picker; GIPHY/KLIPY support; provider access is a fact, provider choice is ours. Do not wait indefinitely for a remote research call. |
| 7–12 | In a fresh session, work one visual prototype ticket with prompt 2. | Ask for a rough artifact, react to it, decide what matters. If it takes longer, compare the openly prebuilt layouts. |
| 12–15 | If the prototype decision is resolved, use prompt 3 in a fresh session for a bounded implementation step. | Explicit execution scope; a visible result grounded in a decision. If prerequisite decisions remain open, show the completed POC instead. |
| 15–17 | Show the completed POC and use prompt 4 if time allows. | The map remembers the answer and makes the next session's starting point clear. Close on the useful outcome. |

Do not paste all prompts into one session. Wayfinder charts first and resolves at most one non-research ticket per work session. Research tickets can run in parallel. If a research ticket was automatically started during charting, inspect its result instead of launching a duplicate. The skill defaults to planning; the execution override below is explicit. [Wayfinder instructions](https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md)

## Prompt 1 — chart the reaction picker

Paste in the prepared starter. Invoke the installed wayfinder skill using the harness's normal skill syntax; `$wayfinder` below names the intended skill.

```text
$wayfinder

I want a fun, simple reaction picker: find a GIF or emoji, see it big,
and copy it into a conversation. This is for a live demo to a mixed
technical audience, so the result should be easy to see on a projector.

We're in a prepared Vite + React + TypeScript starter. Dependencies
include gif-picker-react 2.0.0 and @emoji-mart/data. A GIF provider key
will be in .env.local; don't print or inspect its value. Inspect
.env.example to understand the configuration shape.

The destination is a working local POC. In the map's Notes, explicitly
allow execution after the decisions that scope it are settled.
No accounts for app users, backend, uploads, GIF editing, or chat integrations.
Use the project's configured tracker, with local Markdown as fallback.

Start by clarifying the destination and surfacing the decisions. Include
research on the existing picker and a visual prototype question where
useful. Keep the map small and leave genuinely unclear later work in fog.
Chart this session; don't start implementation or answer my decisions for me.
```

Facts and preferences the presenter can use when responding, not a script for the agent to impersonate:

- Selected project: reaction picker, useful for quick chat reactions.
- Minimum result: GIF/emoji choice, search, large preview, copy text or media link.
- Emoji should work with bundled data; GIFs use the one provider configured before the event.
- Research already found both GIPHY and KLIPY support in `gif-picker-react` 2.0.0.
- Prioritize a legible preview over extras. Layout is a real choice: invite the room to react.
- No need for an AI model inside the app.

## Prompt 2 — work one visual decision

Start a fresh session. Replace `[map path]` and `[visual ticket title]` with the actual map and ticket created in the prior session. First check the ticket is unblocked; resolve its prerequisites in separate sessions or switch to prepared evidence if time is short.

```text
$wayfinder [map path]

Work the ticket titled “[visual ticket title]”. Claim it before working.
Read only the related decisions needed for this ticket.

Use the prototype skill to make a cheap visual comparison I can react to.
We need to understand whether finding, previewing, and copying a reaction
is clearest side by side, with the preview first, or in a compact chat context.
Use the installed dependencies and keep this local. Emoji are enough to
compare layouts if a live GIF connection would delay this decision.

Show the artifact and ask for my reaction. Don't choose the winner or
resolve the ticket until I have actually answered. End after this decision;
record my answer on its ticket and link it from the map.
```

If you use the existing POC to get feedback, say so explicitly and point the agent at the chosen layout as evidence after the audience answers. Do not imply it was generated during this session.

## Prompt 3 — one visible execution step

Use only after the layout/prototype decision is resolved and a working emoji selection/preview exists. The map's Notes must carry the execution override. Start a new session. If the prototype lacks those basics, hand off the agreed core scope for implementation instead, and use the finished POC to show the outcome.

```text
Continue from [map path] and its resolved visual decision.
Execution is allowed by this effort's Notes. Add this one bounded change
to the existing working reaction picker: recent emoji.

After I select an emoji, put it at the front of a row of at most eight
unique recent emoji. Selecting it again moves it to the front. Clicking
a recent emoji selects it for the same preview and copy action. Include
an empty state and a Clear button. Keep it in memory: reload clears it.
Don't save GIF media or URLs in recents. Leave the GIF provider unchanged.

Track this implementation step under the map using the configured tracker.
Run the build and check select, reselect, clear, and reload in the browser.
Record what was completed and any remaining limitations. Don't take
another decision ticket in this session.
```

This behavior is implemented in the completed POC. It is a reference for the scope, not evidence that another agent can finish in three minutes.

## Prompt 4 — show the value of saved context

```text
Read [map path]. Summarize the destination, decisions already made,
and the next unblocked, unclaimed ticket by name. Explain why it is
takeable now. Do not claim or resolve anything; this is a read-only handoff.
```

## If a stage takes too long

- Research: show the prepared primary-source note and explain what changed because of it.
- Generation: switch to the completed POC, explicitly naming it as prebuilt. Make a human choice using its layouts.
- Provider/network: show the actual disconnected state and continue with emoji; no fake GIF results are included in the app.
- Context/session: open the map and a ticket directly. Their purpose is visible without a second live generation.

The POC and starter are separate directories and ports. Keep the POC running as the fallback. No destructive reset command is needed.

## Remaining presenter choices

- Studio, Spotlight, or Compact as the reference layout.
- Claude Code or Codex on stage.
- GIPHY or KLIPY with a verified key and satisfactory sample searches.
- Whether to show fresh charting or an openly prepared map if live decision rounds exceed the allocation.

The deck should describe benefits as expected mechanisms—less reconstructing context, visible decisions, scoped next steps—until the presenter supplies personal examples. Do not invent time-saved figures.
