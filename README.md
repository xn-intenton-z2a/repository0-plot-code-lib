# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Plotting CLI and Library

This repository includes a small plotting library and CLI for quickly rendering mathematical expressions and time-series CSV files to SVG or PNG.

Examples:

```bash
# Render a sine wave to SVG
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg

# Convert a CSV time series (time,value) to PNG
node src/lib/main.js --csv data.csv --file output.png

# Show help
node src/lib/main.js --help
```

Notes on PNG rendering

- For portability in the repository tests and CI this implementation returns a tiny 1x1 PNG stub (a valid PNG file starting with the PNG magic bytes) rather than depending on native image libraries.
- A production implementation can rasterise the generated SVG using libraries such as `sharp` or `canvas` to produce full-resolution PNG files. See features/PNG_RENDERER.md for guidance.

## Getting Started

### Step 1: Create Your Repository

Click **"Use this template"** on the [repository0](https://github.com/xn-intenton-z2a/repository0) page, or use the GitHub CLI:

```bash
gh repo create my-project --template xn-intenton-z2a/repository0 --public --clone
cd my-project
```

### Step 2: Initialise with a Mission

Run the init workflow from the GitHub Actions tab (**agentic-lib-init** with mode=purge), or use the CLI:

```bash
npx @xn-intenton-z2a/agentic-lib init --purge --mission 7-kyu-understand-fizz-buzz
```

This resets the repository to a clean state with your chosen mission in `MISSION.md`. The default mission is **fizz-buzz** (7-kyu).

... (rest of README unchanged)
