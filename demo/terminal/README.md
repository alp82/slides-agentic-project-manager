# Live terminal in the deck

From the presentation repository, run `pnpm present`. This launches the final deck and two loopback-only ttyd servers, attaching genuine Claude Code to the prepared standalone demo checkout.

- Presenter: http://localhost:3047/presenter/1 — writable terminal.
- Audience: http://localhost:3047/1 — read-only attachment on the same computer; put this window on the projector.
- Ordinary terminal fallback: `tmux attach -t wayfinder-live-demo` after opening either browser view once.

Use exactly the same deck hostname in both windows so visibility and divider changes synchronize. Open only one writable presenter. This is a local presentation surface, with no remote audience transport or authentication boundary between people using this computer. ttyd listens only on `127.0.0.1`; Slidev uses its default localhost binding. Do not add `--remote` or proxy the terminal ports publicly.

## Setup

Requires Node, pnpm, Python 3, tmux, ttyd, and installed/authenticated Claude Code. Install this repository's dependencies with `pnpm install --frozen-lockfile`. Ports 3047, 7681, and 7682 must be free; a conflicting launcher fails before starting servers.

The default workspace is `/home/alp/dev/reaction-picker-wayfinder-demo`, the prepared separate demo repository. Override it with `WAYFINDER_DEMO_DIR=/absolute/path/to/demo pnpm present`. The directory must already have `.git` and `CLAUDE.md`; the launcher does not create an empty demo directory. An existing named tmux session is reused, so changing the workspace override does not move an already-running Claude process.

Claude inherits the presenter's existing model, effort, permission mode, and tmux configuration. The validation session reported Claude Code v2.1.263, Fable 5.1, medium effort, and auto mode. Select the intended fast model/low effort in Claude before presenting; the launcher does not invent a model identifier or change account defaults. Workspace trust was accepted for this prepared checkout, and `/wayfinder` was visible in the live command menu. The supporting skill directories are installed; the full demo skill flow has not been run.

The launcher starts only the deck/terminal. Start the app separately using the [demo runbook](../../docs/demo/runbook.md). That document supplies the short prompts and fresh-session sequence.

## Controls and recovery

The terminal starts expanded. Hide/show preserves the iframe and running process. Click the outside slide arrows to return keyboard focus to navigation; left/right then navigate. While focused in the terminal, keys go to Claude.

Slide 2 includes an editable example prompt. Its button streams literal characters through a localhost-only bridge into the shared tmux pane and deliberately does not press Enter, leaving submission under presenter control.

Drag the divider to allocate 25–75% of the slide container to the terminal; double-click resets to 50%. A focused divider accepts left/right and Home/End. Hide/show retains width. Changes synchronize between open presenter/audience views; newly opened views initially use the default split until the next change. The audience client is read-only and uses tmux `ignore-size`, so its window size does not shrink the presenter's terminal.

Ctrl+C in the launching terminal stops the presentation servers. The tmux conversation survives, including its working directory and transcript. Running `pnpm present` again reconnects. To end it deliberately, stop the servers first, then run `tmux kill-session -t wayfinder-live-demo`. The attachment supervisor recreates an exited final pane with a fresh Claude process while a browser is connected; it does not resume an exited conversation. A fresh conversation for each demo step is still the presenter's responsibility.

If the browser becomes unusable, attach an ordinary terminal to the same session and hide the embedded panel. Local CLI configuration and tmux bindings still apply. Actual network-outage recovery has not been tested.

## Served deck, static build, and PDF

`pnpm present` is the live path: Vite development mode plus `VITE_LIVE_TERMINAL=1` enables the persistent global layer. `pnpm dev` shows ordinary slides without it. Print/export routes omit the terminal even in live mode.

`pnpm build` produces a static deck without terminal connections or controls. It can display the slides and their existing illustrative content, not an interactive CLI or recorded session. PDF likewise contains slides only. Browser printing from `/1?print` was checked; the separate `pnpm export` command was subsequently checked during integration and needs the missing `playwright-chromium` dependency; see [package validation](../../docs/demo/validation.md). Use ordinary terminal/window switching alongside those fallbacks when live output is needed. The screenshot below is evidence, not a replacement live feed.

## Verification — 2026-09-08

[Final-deck terminal screenshot](../../docs/demo/live-terminal.png).

Automated Chromium against the final deck and installed Claude verified:

- Real keyboard input, workspace trust, `/wayfinder` discovery, and a tool-free response `LIVE_TERMINAL_OK` while navigating to an explanatory slide.
- Outside click/arrow navigation, terminal arrow focus isolation, divider keyboard controls/reset, and audience synchronization.
- Hide/show and slide navigation with iframe load count remaining 1; refresh retaining the same pane PID and transcript.
- Simultaneous writer and read-only/ignore-size audience; audience viewport resize preserved pane dimensions.
- Full-color output and an ordinary PTY attachment showing the same transcript.
- Static deck without an iframe, live print route without an iframe, and browser-generated PDF. Production build and shell syntax checks passed.

The accepted prototype additionally verified pointer dragging and final-pane exit recovery; that supervisor and pointer handling are retained. Restarting the final launcher preserved the Claude session. No live demo map was created and no talk rehearsal was performed.

Desktop Orca was unavailable, so native clipboard/multiline paste, a hardware clicker, projector/fullscreen legibility, Claude tool-approval interactions, and network-outage recovery remain unverified. Narrowing the slide beside a terminal reduces text size; the final package provides a full-size reference slide and app switching; hide the terminal for full-size explanations. Physical audience legibility remains unverified. A browser response and refresh check do not establish those broader behaviors.
