# Agentic Project Manager slides

A [Slidev](https://sli.dev) presentation.

## Development

```bash
pnpm install
pnpm dev
```

Build the static presentation with `pnpm build`, or export it with
`pnpm export`.

## Reaction picker demo

Run `pnpm demo:install` once, then `pnpm demo` for the completed POC at
http://127.0.0.1:5174 or `pnpm demo:starter` for the prepared live starting
point at http://127.0.0.1:5175. Both can run together.

Emoji work immediately. Configure GIPHY or KLIPY using each app's
`.env.example` for live GIF search. See the [POC README](demo/reaction-picker-prototype/README.md)
and [demo runbook with prompts](docs/demo/runbook.md).
