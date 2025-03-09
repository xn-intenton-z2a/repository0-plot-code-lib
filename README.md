# repository0-plot-code-lib

A CLI tool for precise mathematical plotting that adheres to our mission statement:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a command-line utility designed for high-precision plotting and analysis of mathematical functions. It provides robust support for multiple output formats and a variety of plotting modes that align with our mission and contributing guidelines.

## Features

- **Plotting Functions:** Supports quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, ellipse, polynomial, spiral, modulated sine, and custom function plots, along with extended mathematical helpers such as solving quadratic equations and Bezier curve plotting.
- **Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, plain text (TXT), and R format.
- **Data Analytics:** Includes derivative calculation, area approximation, moving averages, numerical integration, and statistical analysis.
- **CLI Modes:** Demo mode, diagnostics, interactive, web server, and debug modes with a wide variety of flags for versatile usage.
- **Enhanced Testability:** External dependencies such as Express and readline are dynamically loaded for deep mocking, ensuring near 100% test coverage.

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

Additional modes include:

- **Diagnostics:** `npm run diagnostics`
- **Interactive:** `node src/lib/main.js --interactive`
- **Web Server:** `node src/lib/main.js --serve`
- **Export Modes:** Use flags such as `--export-csv`, `--export-md`, `--export-json`, `--export-html`, `--export-ascii`, `--export-svg`, `--export-xml`, `--export-latex`, `--export-txt`, `--export-r`
- **Plot Modes:** Use flags like `--plot-abs`, `--scatter`, `--bar-chart`, `--plot-parametric`, `--plot-poly`
- **Debug Mode:** `node src/lib/main.js --debug` to list available functions.

For custom usage, import the library functions into your scripts and leverage the provided helpers.

## Changelog

- **2023-10:** Refined CLI messaging, pruned legacy drift, and updated error handling to align with our mission.
- **2023-10:** Added multiple export modes and extended plotting functionalities including Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, R, Scatter, Bar Chart, Parametric, Polynomial, Spiral, and numerical integration support.
- **2023-10:** Extended features with helper functions: solveQuadraticEquation, plotSinCosCombined, interpolateData, and plotBezier.
- **2023-10:** **Enhanced test coverage and improved isolation of external resources for deeper mocking.**

## Contributing

Contributions are welcome! To contribute:

1. **Open an Issue:** Describe your bug, idea, or improvement by opening an issue in our repository.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Follow the Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

Your contributions help us maintain precision and keep our code aligned with our mission.

## License

MIT
