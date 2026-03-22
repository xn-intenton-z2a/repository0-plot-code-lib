# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Plot CLI and Library

This project includes a small plotting library and CLI that can parse mathematical expressions, sample them over a numeric range, load simple CSV time-series data (headers: time,value), and render plots as SVG or PNG files.

Examples:

Generate an SVG from an expression:

```bash
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg
```

Load a CSV and write a PNG (PNG rendering uses an optional native dependency — sharp — when available; otherwise a tiny fallback PNG is produced):

```bash
node src/lib/main.js --csv data.csv --file out.png
```

See `src/lib/main.js` for the full programmatic API (named exports): parseExpression, evaluateRange, loadCsv, renderSVG, svgToPng, savePlot, and main.

## Getting Started

... (rest of README trimmed for brevity, original content preserved above)
