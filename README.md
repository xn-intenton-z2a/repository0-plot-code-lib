# repository0-plot-code-lib

A CLI tool for precise mathematical plotting, aligned with our mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a command-line utility designed for high-precision plotting and analysis of mathematical functions. Every aspect of the tool adheres to our mission and contribution guidelines, ensuring both functionality and clarity.

## Features

- **Plotting Functions:** Supports quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, ellipse, polynomial, spiral, and custom function plots.
- **Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, plain text (TXT), and R format.
- **Data Analytics:** Includes derivative calculation, area approximation, moving averages, numerical integration, and statistical analysis.
- **CLI Modes:** Demo, diagnostics, interactive, web server, and debug modes for versatile usage.

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
- **Custom Plot:** Use the provided plotCustom function in your scripts for flexible function plotting.
- **Debug Mode:** `node src/lib/main.js --debug` to list available functions.

## Contributing

Contributions are encouraged! To contribute:

1. **Open an Issue:** Describe your idea, bug, or improvement.
2. **Label it as `automated`:** This triggers our workflow.
3. **Follow the Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

Your contributions help us maintain precision and mission alignment.

## Changelog

- **2023-10:** Refined CLI messaging and error handling.
- **2023-10:** Added new export modes and plotting functions including Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, R, Scatter, Bar Chart, Parametric, Polynomial, Spiral, and numerical integration.
- **2023-10:** Added new functions exportPlotAsR and plotCustom inline with our mission to enhance flexibility.
- **2023-10:** Refreshed README to align with CONTRIBUTING guidelines and pruned irrelevant drift.
- **2023-10:** Increased test coverage and enhanced module mocks for external resources.
- **2023-10:** Increased overall test coverage to near 100% and improved isolation of external resource dependencies.

## License

MIT
