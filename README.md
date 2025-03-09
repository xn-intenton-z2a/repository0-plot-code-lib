# repository0-plot-code-lib

A CLI tool for precise mathematical plotting that follows our mission statement:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a command-line utility designed for high-precision plotting and analysis of mathematical functions. Built with versatility in mind, it supports multiple output formats and diverse plotting modes. Its design emphasizes clarity, ease of extension, and adherence to our strict contributing guidelines.

## Features

- **Plotting Functions:** Quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, ellipse, polynomial, spiral, modulated sine, custom function plots, Lissajous curves, Bessel function plots, and more.
- **Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, plain text (TXT), and R-friendly format.
- **Mathematical Helpers:** Includes derivative calculation, area approximation, moving averages, numerical integration, and statistical analysis.
- **CLI Modes:** Demo, diagnostics, interactive, web server, debug modes with comprehensive flag options. New flag: `--lissajous` generates Lissajous curve plots.
- **Extended Features:** Additional functionalities such as plotting Bessel functions are included to extend the range of mathematical visualisations.
- **Testability:** Enhanced test coverage through isolated dependency mocks and comprehensive edge-case testing.

## Installation

Ensure you have Node.js (v20 or higher) installed. Then install via npm:

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
- **Export Modes:** Flags such as `--export-csv`, `--export-md`, `--export-json`, `--export-html`, `--export-ascii`, `--export-svg`, `--export-xml`, `--export-latex`, `--export-txt`, `--export-r`
- **Plot Modes:** Flags like `--plot-abs`, `--scatter`, `--bar-chart`, `--plot-parametric`, `--plot-poly`, and the new `--lissajous` for Lissajous curves
- **Debug Mode:** `node src/lib/main.js --debug` to list all available plotting functions.

For integrating plotting into your scripts, import the library functions directly.

## Changelog

- **2023-10:** Refined CLI messaging and error handling; added multiple export modes and extended plotting functionalities.
- **2023-10:** Extended helper functions including solveQuadraticEquation, plotSinCosCombined, interpolateData, and plotBezier.
- **2023-10:** Added plotLissajous function and `--lissajous` CLI flag for generating Lissajous curve plots.
- **2023-10:** **Added plotBessel function for Bessel function plotting to extend our mathematical visualization capabilities.**
- **2023-10:** Improved test coverage with enhanced mocks and edge-case handling.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Open an Issue:** Describe your bug, idea, or enhancement.
2. **Label as `automated`:** This triggers our automated contribution workflow.
3. **Follow the Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions and our mission statement.

Your contributions help us uphold precision and maintain the spirit of our project.

## License

MIT
