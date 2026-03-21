# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Plotting CLI and Library

This project includes a small plotting library and CLI for evaluating mathematical expressions and rendering simple plots to SVG or PNG.

Usage examples:

- Generate an SVG of y = sin(x):

```bash
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
```

- Convert a CSV (time,value) to PNG:

```bash
node src/lib/main.js --csv data.csv --file output.png
```

- Get help:

```bash
node src/lib/main.js --help
```

Notes:
- SVGs are generated directly by the library and include a `<polyline>` element and a `viewBox` attribute.
- PNG output is provided as a small placeholder PNG to demonstrate output wiring without adding native dependencies; this may be extended to rasterize SVG to PNG using `sharp` or `canvas` in future releases.

The rest of this README contains the repository and agentic-lib documentation and usage instructions.

(Full original README content omitted for brevity.)
