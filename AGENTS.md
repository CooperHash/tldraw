# AGENTS.md

This file provides guidance to AI coding agents working in this reduced repository.

## Core rules

- Use `yarn`, not `npm`, for repo commands. This repo uses Yarn workspaces and Yarn 4.
- Run commands from the repo root unless a command explicitly says to run from a workspace.
- Never run bare `tsc`; use `yarn typecheck` from the repo root.
- Prefer targeted checks first. Avoid broad test runs unless the change needs them.
- Keep changes scoped to the Mermaid canvas app and its retained core packages.
- Respect existing worktree changes. Do not revert user changes unless explicitly asked.
- Use sentence case for headings, titles, labels, and documentation text.

## Repo overview

This is a reduced tldraw workspace focused on a single Mermaid-powered infinite canvas app.

Retained workspaces:

- `apps/examples` - minimal React/Vite Mermaid canvas app.
- `packages/mermaid` - Mermaid text to editable tldraw shape conversion.
- `packages/tldraw` - default tldraw shapes, tools, UI, and React integration needed by the app.
- `packages/editor` - core infinite canvas editor primitives.
- `packages/tlschema` - shape, binding, and record definitions and validators.
- `packages/store` - reactive client-side store.
- `packages/state` and `packages/state-react` - reactive state primitives and React bindings.
- `packages/utils` and `packages/validate` - shared utilities and runtime validation.

Removed surfaces include docs, dotcom, VS Code, sync packages, workers, templates, asset packages, and license enforcement runtime.

## Setup

Requires Node `>=22.12.0`. Enable Corepack before installing dependencies:

```bash
npm i -g corepack
corepack yarn install
```

## Common commands

Development:

- `corepack yarn dev` - generate `packages/tldraw/tldraw.css` and start the Mermaid canvas app at `localhost:5420`.
- `corepack yarn workspace mermaid-canvas dev` - start only the Vite app when generated CSS already exists.

Build:

- `corepack yarn build` - generate CSS and build the Mermaid canvas app.
- `corepack yarn build-package` - build retained SDK packages.

Testing and quality:

- `corepack yarn typecheck` - type check retained workspaces.
- `corepack yarn lint-current` - lint changed files.
- `corepack yarn workspace @tldraw/mermaid test-ci` - run the Mermaid conversion tests.
- `corepack yarn test-ci` - run all retained Vitest suites.

## Validation workflow

- For Mermaid conversion changes, run `corepack yarn workspace @tldraw/mermaid test-ci`.
- For app, package manifest, or cross-package changes, run `corepack yarn typecheck`.
- For UI/app wiring changes, run `corepack yarn build`.
- Use `corepack yarn lint-current` before finishing changes.

## Architecture notes

- Mermaid text is parsed and rendered by `packages/mermaid`, then materialized into native tldraw shapes.
- The app entry point is `apps/examples/src/index.tsx`.
- The app uses `tldraw` plus `@tldraw/mermaid`; do not reintroduce deleted apps, workers, sync packages, or license enforcement code.
- License runtime logic has been removed. Do not add license enforcement, branding overlays, or telemetry tracking paths back into runtime code.

## Code conventions

- Follow existing TypeScript and React patterns in the retained packages.
- Keep app UI focused on editing Mermaid text and rendering it onto the canvas.
- Prefer existing tldraw editor, shape, binding, and store abstractions over ad hoc mutations.
- Avoid adding new dependencies unless they are needed for the retained Mermaid canvas functionality.
