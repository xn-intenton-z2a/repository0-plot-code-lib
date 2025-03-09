# repository0-plot-code-lib

A CLI tool for precise mathematical plotting that embodies our mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a versatile command-line utility for plotting and analyzing mathematical functions. Designed with clarity, extensibility, and strict adherence to our contributing guidelines, it supports a wide range of plotting modes and output formats.

## Features

- **Mathematical Plots:** Supports quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, elliptical, polynomial, spiral, modulated sine, custom plots, Lissajous curves, Bessel functions, Lemniscate (figure-eight) plots, and Hyperbola plots.
- **Additional Mathematical Tools:** Offers derivative calculation, area approximation, moving averages, numerical integration, definite integration, and statistical analysis.
- **Output Formats:** CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, plain text (TXT), and R-friendly formats.
- **CLI Modes:** Demo, diagnostics, interactive, debug, and web server modes using various flags.

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
- **Export/Plot Modes:** Use flags such as `--export-csv`, `--export-md`, `--export-json`, `--export-html`, `--export-ascii`, `--export-svg`, `--export-xml`, `--export-latex`, `--export-txt`, `--export-r`, `--plot-abs`, `--scatter`, `--plot-parametric`, `--plot-poly`, `--lissajous`, `--lemniscate`, `--hyperbola`.
- **Debug Mode:** `node src/lib/main.js --debug` to list available plotting functions.

For integrating plotting into your own scripts, simply import the library functions directly.

## Changelog

- **2023-10:** Refined CLI messaging and extended plotting functionalities.
- **2023-10:** Added features: solveQuadraticEquation, plotSinCosCombined, interpolateData, plotBezier, plotLissajous, plotLemniscate, plotHyperbola.
- **2023-10 (Update):** Added new plotting functions: plotPolynomial, plotModulatedSine, plotSpiral, calculateDefiniteIntegral, plotCustom, and plotEllipse. Updated README to align with the latest CONTRIBUTING guidelines and refreshed content.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Open an Issue:** Provide a detailed description of your bug, idea, or enhancement in our GitHub issues.
2. **Label as `automated`:** This triggers our automated workflow to guide your contribution.
3. **Follow the Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for full instructions and our mission statement.

Your contributions help maintain the precision and vision of this project.

## License

MIT
