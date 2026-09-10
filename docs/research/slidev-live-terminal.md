# A real live terminal inside Slidev

Research date: 2026-09-08. Supports [Research a real Claude Code or Codex terminal inside Slidev](https://github.com/alp82/slides-agentic-project-manager/issues/9).

## Recommendation

Try **ttyd + tmux, embedded as one persistent iframe in Slidev**. This would display and control the genuine installed Claude Code or Codex TUI. Treat it as a candidate requiring a small integration spike, not a proven presentation setup. Keep a normal terminal attached to the same tmux session as the fallback.

This separates presentation changes from the running agent: give a short prompt, show a relevant explanatory slide while the agent works, then return to its real output. The deck and reaction-picker POC can develop independently; neither needs this integration chosen before its own work starts. These are recommendations for this talk, not vendor promises.

## Established facts

- Codex supports interactive terminal work, including planning, editing, and inspecting commands and diffs; its CLI is the desired UI, rather than a custom chat interface. [Official OpenAI documentation](https://learn.chatgpt.com/docs/codex/cli)
- `claude` starts an interactive session, while `claude -p` produces noninteractive output. Use the former for a genuine live TUI. [Claude Code CLI reference](https://code.claude.com/docs/en/cli-reference)
- ttyd serves a terminal in a browser and can run arbitrary commands. [ttyd README](https://github.com/tsl0922/ttyd)
- ttyd documents sharing a single process through `tmux new -A -s …`, including attaching from an ordinary terminal. tmux keeps programs running while detached. This supplies the session lifetime independently of an iframe. [ttyd examples](https://github.com/tsl0922/ttyd/wiki/Example-Usage), [tmux documentation](https://github.com/tmux/tmux/wiki)
- Slidev supports a single global component instance that persists across slides, including `global-top.vue`; per-slide layers can have multiple instances. A global layer is therefore the documented foundation for retaining one iframe. [Slidev global layers](https://sli.dev/features/global-layers)
- Slidev allows replacing or extending its navigation shortcut definitions. [Slidev shortcut setup](https://sli.dev/custom/config-shortcuts)

## Options

| Approach | Genuine TUI? | Implication for this talk |
| --- | --- | --- |
| ttyd iframe + tmux | Yes: browser terminal attached to the CLI process | Recommended first experiment; existing terminal transport and separate process lifetime |
| xterm.js + WebSocket + node-pty | Yes, if the backend actually launches the CLI in a PTY | More control of focus, appearance, and layout; requires writing session transport, lifecycle, reconnect, resize, and output buffering |
| Normal terminal/window switching | Yes | Smallest setup; retain as fallback and use if embedding distracts from the talk |
| Rendered transcript or recording | No live interaction | Could be an explicitly identified reference, but does not answer this research question |

The custom approach has real building blocks: node-pty exposes PTY spawning, input, output, and resize; xterm.js provides rendering, focus, resize events, and custom key handling. The additional implementation work in the table is an engineering inference from those primitives. [node-pty](https://github.com/microsoft/node-pty), [xterm.js Terminal API](https://xtermjs.org/docs/api/terminal/classes/terminal/)

## Local evidence

Read-only help/version checks in the current environment found:

| Tool | Installed version |
| --- | --- |
| Codex | `codex-cli 0.153.4` |
| Claude Code | `2.1.263` |
| ttyd | `1.7.7-40e79c7` |
| tmux | `3.7c` |

`codex --help` confirms interactive mode by default and `--no-alt-screen` as an optional scrollback-preserving mode. `claude --help` likewise confirms interactive mode by default. `ttyd --help` confirms `-W` enables input (default read-only), `-i` selects its binding, and `-t` configures the client. These are local observations, not claims about all installations. The repo declares Slidev `^52.19.1` in `package.json`.

No integration was installed or built. No agent session was started, no paid model turn was run, and no authentication material was read.

## Proposed bounded experiment

The following is a plan, not commands already executed. From the dedicated demo workspace, start a named tmux session and run the chosen harness inside it. Then serve attachments to that session:

```bash
# In the demo workspace, use either claude or codex:
tmux new-session -s meetup-demo claude
# Detach with the normal tmux detach sequence, then:
ttyd -i 127.0.0.1 -p 7681 -W -t fontSize=24 tmux attach-session -t meetup-demo
```

Use one iframe pointing to `http://127.0.0.1:7681` in a Slidev global layer. Keep it mounted when showing explanatory slides; toggle visibility without destroying the component. The tmux process remains the continuity mechanism even if the browser reconnects. ttyd documents font sizing and reconnect-related client settings. [ttyd client options](https://github.com/tsl0922/ttyd/wiki/Client-Options)

Acceptance questions for the spike:

1. Does an actual harness prompt accept typing, arrows, paste, multiline input, and approval keys at projector-readable size?
2. After navigating away and back while work runs, do we see the same continuing session, with readable output and correct dimensions?
3. Can the presenter click a visible control outside the iframe to return focus to slide navigation reliably? Test the actual presentation clicker too: do not assume keys reach the parent while the iframe has focus.
4. Does resize/fullscreen/visibility toggling leave the TUI usable? Start with a fixed-size terminal region; resizing a hidden terminal and redraw behavior still need observation.
5. Do presenter view, audience view, browser refresh, and reconnect avoid unwanted duplicate interactive clients or competing terminal sizes?
6. Can an ordinary terminal attach to `meetup-demo` immediately if embedding fails?

Browser event isolation, focus transfer, terminal redraw, and this exact Slidev/harness combination have **not been tested**. The official component and terminal primitives establish feasibility, not those outcomes.

## Serving and sharing

Slidev's development server and a locally served built SPA both provide a browser presentation; the terminal service must run separately in either case. A static build cannot itself launch the native CLI. Slidev documents `slidev build` and static preview. [Building and hosting](https://sli.dev/guide/hosting)

PDF/PPTX/PNG exports cannot carry the running interactive terminal. Supply an explicit still or explanation for exported/shared slides, with the live service enabled only in the local presentation setup. A localhost iframe in a public deck would refer to each viewer's own machine, not the presenter's. The export limitation follows Slidev's documented distinction between browser interactivity and exported files. [Exporting](https://sli.dev/guide/exporting)

## Decision unlocked

Either harness is a viable candidate; research does not justify choosing one over the other. First decide whether the small iframe spike passes the interaction checks. If it does, embed the persistent terminal; if it does not, use the same genuine session through window switching. This choice should affect presentation integration only, leaving POC work and slide content work parallel.
