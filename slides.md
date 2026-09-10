---
theme: default
title: Agentic Project Manager
info: Organize work with wayfinder, keep humans on the decisions.
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
transition: none
drawings:
  persist: false
---

<WayfinderStory :step="0" />

<!--
Agentic Project Manager — From generating code to driving decisions

Introduce the reaction picker. The live demo will explore, revise, prototype, then start building it. Keep explanation segments interleaved: roughly eight minutes across the whole talk. Human attention goes to priorities, scope, and implementation; make no measured time-saving claim.
-->

---

<DeckInsert kind="author" />

<!--
Introduce Alper Ortac briefly: a builder experimenting with practical agent workflows, based in Kassel.
-->

---

<DeckInsert kind="goal" />

<!--
The goal of this talk: plan and build a GIF search app with Wayfinder. Follow the idea through decisions and into a working app.
-->

---

<DeckInsert kind="skills" />

<!--
Introduce Matt Pocock's Skills for Real Engineers repository. Emphasize that these are small, composable workflow instructions rather than a framework that owns the entire process. Repository figures verified 2026-09-10.
-->

---

<WayfinderStory :step="1" />

<!--
The Wayfinder skill

Show charting in the terminal. Explain the terms from the visible actions, without a product tour. A skill is a file of instructions; the harness supplies tools and manages the session. Run pnpm present for the persistent side-by-side terminal. Keep http://localhost:3047/demo/prompts.html open on the presenter screen for the copyable prompts. Use Chart, then answer the human questions; charting may start the research worker.
-->

---

<WayfinderStory :step="2" />

<!--
The Map

Point at the real map. A decision ticket asks a question; it is not automatically a chunk of implementation. The map is an index: closed decision links, not duplicated answers. Sharp questions become tickets, even if blocked; vague in-scope questions stay in fog. Out-of-scope work stays outside the map. Open https://github.com/alp82/reaction-picker-wayfinder-demo/issues using the slide link and select the map created by Chart. No map is prepared in advance. If its number differs from 1, substitute it in the presenter prompts.
-->

---
clicks: 3
---

<WayfinderStory :step="3" />

<!--
Four ways forward

Research finds a component. Keep the scope conversation short. Execution is explicitly allowed in this demo’s map; planning is the default. Research runs independently; grilling and prototype feedback need the human. Tasks normally unblock decisions. This demo overrides planning-only scope to include building. Charting and ticket work are separate sessions; resolve at most one non-research ticket per work session.
-->

---

<WayfinderStory :step="4" />

<!--
Find the frontier

Point at native GitHub dependencies. Open + unblocked + unassigned is available to claim. The presenter still owns the decisions. Claim by assigning the ticket before work. Resolve by recording an answer on the ticket, closing it, and adding a named link to the map. Newly sharp questions become tickets; dependencies expose the frontier.
-->

---

<WayfinderStory :step="5" />

<!--
Scope changes are normal

After research and grilling: invite suggestions, select one change, then show the agent revising the same four tickets before prototyping. Preserve original decisions and append explicit amendments; reopen only if a question needs more work. Keep this demonstration to the same four tickets.
-->

---

<WayfinderStory :step="7" />

<!--
My experience: wayfinder is great for building too

The default is planning: a decision map does not build the result itself. Explicitly include execution in scope to coordinate the work as well. Use the examples to discuss research, events, woodworking, talks, workshops, and customer studies. Agents can do digital work and coordinate steps that humans carry out in the physical world.
-->

---

<WayfinderStory :step="8" />

<!--
Too many questions

The agent can get stuck on small details. Tell it to keep things simple and focus on decisions that matter. Use the linked post as an example of a short instruction.
-->

---

<WayfinderStory :step="10" />

<!--
Working at the same time

Agents can edit the same files, repeat work, or make conflicting decisions. Check for overlap and give each agent separate work. When one needs the other's result, run them one at a time.
-->

---

<DeckInsert kind="meta" />

<!--
This deck was made with Wayfinder too.

The same workflow helped create the presentation explaining it. Pause for the “A little meta” GIF, then move into questions.
GIF source: https://giphy.com/gifs/YellowstoneTV-paramountnetwork-yellowstone-yellowstonetv-W0cp0XrvIe6PxFEYAM
-->

---

<DeckInsert kind="qa" />

<!--
Q&A

Invite questions and ask where the audience currently loses project context.
-->

---

<DeckInsert kind="resources" />

<!--
Resources

Share the slide deck and demo repositories, Matt Pocock's skills repository, and the AI Hero Wayfinder documentation.
-->

---

<WayfinderStory :step="9" />

<!--
Appendix — prototype reference

The image is the completed prototype. Live Preview opens the hosted version on GitHub Pages; GitHub opens its source folder in this repository. For the on-stage live build, use http://127.0.0.1:5175; the local fallback remains on port 5174.
-->
