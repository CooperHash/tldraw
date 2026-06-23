# Mermaid canvas

This repository is a reduced tldraw workspace focused on a single infinite-canvas Mermaid diagram app.

The retained runtime pieces are:

- `apps/examples` — a minimal React/Vite app with a Mermaid text editor and tldraw canvas.
- `packages/mermaid` — Mermaid text to editable tldraw shapes.
- `packages/tldraw` and `packages/editor` — the canvas, default shapes, tools, and UI needed by the app.
- `packages/state`, `packages/state-react`, `packages/store`, `packages/tlschema`, `packages/utils`, and `packages/validate` — core SDK dependencies.

Removed surfaces include dotcom, docs, VS Code, templates, sync packages, workers, asset packages, and license enforcement runtime.

## Development

Requires Node `>=22.12.0` and Yarn 4 through Corepack.

```bash
npm i -g corepack
yarn
yarn dev
```

The app runs at `http://localhost:5420`.

## Build

```bash
yarn build
```

The build first generates `packages/tldraw/tldraw.css`, then builds the Mermaid canvas app.
