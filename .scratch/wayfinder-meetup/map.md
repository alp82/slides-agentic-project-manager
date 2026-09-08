# Make the wayfinder meetup presentation

Label: wayfinder:map
Status: open

## Destination

A clear, build-ready route to a finished 30-minute meetup presentation: the slide story, reaction-picker demo, prebuilt POC, prepared starter, and reusable prompts are specified well enough to produce afterward. The map ends when those decisions are settled; it does not execute the production work.

## Notes

- Mixed technical audience: data scientists, engineers, product people, founders, and others.
- Agreed timing: 8 minutes slides, 17 minutes live demo, 5 minutes Q&A.
- Audience action: explore Matt Pocock's skills repository and try it in a skills-capable harness.
- Agreed demo: a fun, visual GIF and emoji reaction picker. Plan for a prepared starting scaffold and a prebuilt whole-app POC from which to derive demo prompts.
- Planning only. The user explicitly clarified that this session is for charting the map, not doing the work. The eventual finished deck and POC are intended outcomes, not an execution override. Charting creates questions and dependencies; later sessions resolve one non-research ticket at a time.
- The agent prematurely created app code, a starter, screenshots, and a runbook. Retain these as unvalidated reference material, not accepted scope, evidence of user approval, or a reason to constrain the choices below. The three layouts, recent-emoji feature, exact prompts, and GIPHY default were agent proposals.
- Explain skill instructions, decision tickets, dependencies, context across sessions, and what a harness is.
- Either Claude Code or Codex is acceptable; final on-stage choice is open.
- Use wayfinder for map maintenance, grilling/domain-modeling for decisions, prototype for visual questions, and research for external facts. Human-in-the-loop tickets require the presenter's answer.
- Tracker: local Markdown as documented in `/home/alp/.agents/skills/setup-matt-pocock-skills/issue-tracker-local.md`. Map is this file; child issues are separate files under `issues/`. `Status: open` is unclaimed; claim with `Status: claimed` and an assignee before working. `Blocked by` IDs refer to sibling tickets; all blockers must be resolved. Record answers under `## Answer`, mark `resolved`, and add a named link below. Frontier is open, unclaimed, unblocked tickets ordered by filename.
- Context: [presentation brief](../../docs/presentation-brief.md). Research: [visual demo and provider findings](../../docs/research/visual-demo-ideas.md).

## Decisions so far

<!-- Initial user agreements are in Notes. Add resolved ticket links here after human review. -->

## Not yet specified

- Follow-up decisions exposed by the selected demo journey or visual prototype that cannot yet be named precisely. Exact wording, screenshots, and presentation assets should follow the decisions in the tickets rather than becoming speculative build tasks now.

## Out of scope

- Rehearsing or timing the actual presentation: explicitly excluded by the user.
- Building the final deck, app, or starter during this charting session. Production work follows the planning handoff.
- Productionizing or publishing the reaction picker beyond its role in this presentation. Detailed POC feature boundaries remain a decision in the scope ticket.
