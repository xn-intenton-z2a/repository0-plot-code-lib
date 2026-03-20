# repo

This repository is powered by [intentïon agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests on a schedule.

## Getting Started

1. **Write your mission** in [`MISSION.md`](MISSION.md) — describe what you want to build in plain English
2. **Configure GitHub** — see [Setup](#setup) below
3. **Push to main** — the autonomous workflows take over from here

The system will create issues from your mission, generate code to resolve them, run tests, and open PRs. A supervisor agent orchestrates the pipeline, and you can interact through GitHub Discussions.

## CLI Usage

The library includes a small CLI for generating plots from expressions or CSV time series. Examples:

```
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
node src/lib/main.js --csv data.csv --file output.png
node src/lib/main.js --help
```

Range format: `start:step:end` (e.g. `-3.14:0.01:3.14`).

The CLI writes `.svg` files (vector) or `.png` files (raster). For `.png` output this repository provides a minimal PNG fallback (suitable for tests); for production-quality raster output use a tool such as `sharp` or `canvas` to render SVG to PNG.

## How PNG rendering is handled

- A simple test-friendly PNG generator is included that emits the PNG signature so tests can verify output without native dependencies.
- For real-world use, install and use `sharp` or `canvas` and replace `renderPNG` implementation with an SVG rasterization pipeline. The library is designed so `renderPNG` is a single place to change.

## File Layout

- `src/lib/main.js` — library exports and CLI entry
- `src/web/` — demo site that imports `src/lib/main.js` via `src/web/lib.js`
- `tests/unit/` — unit tests (Vitest)
- `tests/behaviour/` — Playwright behaviour tests

## Running tests

Unit tests:

```
npm test
```

Behaviour tests (Playwright):

```
npm run test:behaviour
```

## Notes

This repository is part of the agentic-lib demo. The included CLI is intentionally small and browser-safe: the library can be imported from both Node and the browser (the demo page uses the browser export path `src/web/lib.js`).
