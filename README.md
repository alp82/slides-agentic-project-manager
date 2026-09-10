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

## GitHub Pages

The [Pages workflow](.github/workflows/pages.yml) builds the deck and completed
prototype on pushes to `main`, or when run manually from Actions.

1. In the repository's **Settings → Pages → Build and deployment**, select
   **GitHub Actions** as the source.
2. For live GIF search, add the KLIPY client key as the repository Actions secret
   `VITE_GIF_API_KEY` (**Settings → Secrets and variables → Actions**). Vite embeds
   this key in browser-visible JavaScript; use the same client key with ads disabled
   described in the [prototype README](demo/reaction-picker-prototype/README.md).
   Without it, emoji still work and GIF search shows its unavailable state.
3. Push the workflow to `main` and wait for **Deploy deck and prototype to GitHub Pages**
   to finish. After changing the key, rerun the workflow to rebuild the app.

Published URLs:

- Deck: https://alp82.github.io/slides-agentic-project-manager/
- Live preview: https://alp82.github.io/slides-agentic-project-manager/demo/reaction-picker/

Both builds use their GitHub Pages subpaths as the asset base, following the
[Vite deployment guide](https://vite.dev/guide/static-deploy.html#github-pages).

## Reaction picker demo

Run `pnpm demo:install` once, then `pnpm demo` for the completed POC at
http://127.0.0.1:5174. The live demo uses the separate
[reaction-picker-wayfinder-demo repository](https://github.com/alp82/reaction-picker-wayfinder-demo);
run `pnpm dev` in that checkout for http://127.0.0.1:5175.

Emoji work immediately. Configure KLIPY using the POC's
`.env.example` for live GIF search. See the [POC README](demo/reaction-picker-prototype/README.md)
and [demo runbook with prompts](docs/demo/runbook.md).

With `pnpm present` running, open [copyable presenter prompts](http://localhost:3047/demo/prompts.html). See the [launch and switching guide](docs/demo/runbook.md#launch-and-switch) and [package validation](docs/demo/validation.md). Regenerate the prompt page after runbook edits with `pnpm demo:prompts`.
