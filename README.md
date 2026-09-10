# Agentic Project Manager slides

A [Slidev](https://sli.dev) presentation.

## Development

```bash
pnpm install
pnpm dev
```

For the live Claude Code terminal beside the deck, run `pnpm present`. See the
[terminal setup and fallback instructions](demo/terminal/README.md).

Build the static presentation with `pnpm build`, or export it with
`pnpm export`.

## Reaction picker demo

Run `pnpm demo:install` once, then `pnpm demo` for the completed POC at
http://127.0.0.1:5174. The live demo uses the separate
[reaction-picker-wayfinder-demo repository](https://github.com/alp82/reaction-picker-wayfinder-demo);
run `pnpm dev` in that checkout for http://127.0.0.1:5175.

Emoji work immediately. Configure KLIPY using the POC's
`.env.example` for live GIF search. See the [POC README](demo/reaction-picker-prototype/README.md)
and [demo runbook with prompts](docs/demo/runbook.md).

With `pnpm present` running, open [copyable presenter prompts](http://localhost:3047/demo/prompts.html). See the [launch and switching guide](docs/demo/runbook.md#launch-and-switch) and [package validation](docs/demo/validation.md). Regenerate the prompt page after runbook edits with `pnpm demo:prompts`.
