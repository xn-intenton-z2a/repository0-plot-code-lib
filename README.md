# repository0-plot-code-lib

A CLI tool for precise mathematical plotting that embodies our mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a versatile command-line utility for plotting and analyzing mathematical functions. Designed with clarity, extensibility, and strict adherence to our CONTRIBUTING guidelines, it supports multiple plotting modes and output formats.

## Features

- **Mathematical Plots:** Supports quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, elliptical, polynomial, spiral, modulated sine, custom plots, Lissajous curves, Bessel functions, and Lemniscate (figure-eight) plots.
- **Output Formats:** CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, plain text (TXT), and R-friendly formats.
- **Mathematical Tools:** Derivative calculation, area approximation, moving averages, numerical integration, and statistical analysis.
- **CLI Modes:** Demo, diagnostics, interactive, debug, and web server modes with various flags (e.g., --serve, --interactive, --diagnostics, --export-csv, --lemniscate, etc.).

## Installation

Ensure Node.js (v20 or higher) is installed. Then install via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

Run the default demo:

```bash
npm run start
```

Other available modes include:

- **Diagnostics:** `npm run diagnostics`
- **Interactive Mode:** `node src/lib/main.js --interactive`
- **Web Server:** `node src/lib/main.js --serve`
- **Export/Plot Modes:** Use flags such as `--export-csv`, `--export-md`, `--export-json`, `--export-html`, `--export-ascii`, `--export-svg`, `--export-xml`, `--export-latex`, `--export-txt`, `--export-r`, `--plot-abs`, `--scatter`, `--bar-chart`, `--plot-parametric`, `--plot-poly`, `--lissajous`, and the new `--lemniscate` flag.
- **Debug Mode:** `node src/lib/main.js --debug` to list the available plotting functions.

For integrating plotting into your own scripts, import the library functions directly.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Open an Issue:** Provide a detailed description of your bug, idea, or enhancement.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Follow the Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for full instructions and our mission statement.

Your contributions help maintain the precision and vision of our project.

## Changelog

- **2023-10:** Refined CLI messaging and extended plotting functionalities.
- **2023-10:** Added features: solveQuadraticEquation, plotSinCosCombined, interpolateData, plotBezier, plotLissajous, and plotLemniscate.
- **2023-10:** Improved error handling and adherence to our mission statement.
- **2023-10 (Update):** Refreshed README to align with updated CONTRIBUTING guidelines.

## License

MIT
