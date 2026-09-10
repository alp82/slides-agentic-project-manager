# Wayfinder meetup presentation

## Agreed destination

A finished slide deck for a local AI meetup, a complete reaction-picker POC app, a prepared live-demo starter in the separate `reaction-picker-wayfinder-demo` repository, and simple prompts derived from building the POC. Rehearsal is out of scope.

The map includes building and integrating these deliverables. Its execution scope is explicit: it is complete when the deck, POC, starter, and short prompts exist and meet their agreed criteria, not when a plan is written. Charting itself updates that work map; it does not start every build ticket immediately.

The POC and slides should progress in parallel, with dependencies only where one actually needs the other's result. Prompt derivation waits for the working POC; final integration brings the branches together.

## Audience and timing

- Mixed technical audience: data scientists, engineers, product people, founders, and others.
- 30 minutes total: 8 minutes of slides, 17 minutes of demo, 5 minutes of Q&A.
- These are approximate totals across an interleaved talk, not three consecutive blocks. Switch between presentation and live demo to fill agent wait times with relevant explanations.

## Message and audience action

Show how AI can help organize work and free attention for prioritization, scoping, and implementation. Demonstrate flexible use of wayfinder for planning, research, prototyping, execution, or a combination.

Invite attendees to explore Matt Pocock's skills repository and try the workflow in their preferred skills-capable harness.

## Technical depth

Explain skill instructions, decision tickets, dependencies, and how context carries across sessions. Briefly explain what a harness is.

## Demo preferences

The delivered reference is a reaction picker with shared search, independent local emoji, a KLIPY GIF gallery, and direct copying with honest GIF URL fallback. The current POC places emoji first and appends GIFs on scroll. There is no separate preview.

The complete POC lives in this repository; the prepared starter lives in the separate demo repository. The [runbook](demo/runbook.md) and generated presenter page contain five short prompts derived from the POC, with standing context in the starter. Audience decisions can change the live result.

The selected on-stage setup is Claude Code in a persistent side-by-side terminal, with an ordinary tmux attachment as fallback. The [terminal guide](../demo/terminal/README.md) supplies launch and switching instructions.

## Slide direction

The presenter accepted the revised big-idea direction. [Shape the slide story and visual direction](https://github.com/alp82/slides-agentic-project-manager/issues/4) holds the palette, varied slide sequence, prototype source, and asset handoff for the deck build.

## Delivery

The deck, reference app, separate starter, short prompts, and switching paths are integrated. The [package validation](demo/validation.md) records evidence and limits. Rehearsal and timing remain out of scope; physical projector and native paste behavior are not claimed as verified.

The [presentation map](https://github.com/alp82/slides-agentic-project-manager/issues/1) and its decision tickets remain canonical for the accepted choices.
