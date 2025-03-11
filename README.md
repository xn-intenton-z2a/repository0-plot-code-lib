# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

- **Mathematical Plotting:** Generate a variety of plots including sine, cosine, exponential, logarithmic, quadratic, linear, tangent, and advanced visualizations such as enhanced spiral plots (with rotation support), polar heatmaps, circular plots, power plots, custom enhanced plots, piecewise plotting, moving product calculations, derivative plotting, advanced polynomial plotting, and nth root plotting.
- **Multiple Output Formats:** Supports CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R. (PNG output remains a stub implementation.)
- **Interactive & Server Modes:** Use interactive mode or launch an Express server for live demos.
- **Analytical Tools:** Built-in functions for derivative calculation, range generation, moving sum, cubic Bezier curves, among others.

## New Features

- **Enhanced Spiral Plot:** Use the `--plot-spiral-enhanced` flag to generate spiral plots with optional rotation.
- **Polar Heatmap:** Visualize heat intensities on polar coordinates using `--plot-polar-heatmap`.
- **Circular Plotting & Power Plot:** Generate circular plots and power plots with customizable parameters.
- **Custom Enhanced & Piecewise Plots:** Combine base plots with enhancements and plot piecewise functions.
- **Moving Product:** Calculate moving product over datasets.
- **Derivative, Advanced Polynomial & Nth Root Plots:** New functions `plotPolynomialFromCoeffsReal` and `plotNthRootReal` extend the library's versatility.

## Installation

**Prerequisites:** Node.js v20 or higher

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

Run the default demo:

```bash
npm run start
```

Other commands include:

- **Diagnostics:** `npm run diagnostics`
- **Interactive Mode:** `node src/lib/main.js --interactive`
- **Web Server Mode:** `node src/lib/main.js --serve`
- **Various Plot/Export Options:** Use flags such as `--plot-abs`, `--export-csv`, `--plot-fibonacci`, `--plot-sincos`, `--power-plot`, etc., for specific outputs.
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

Provide custom plot parameters directly as command-line arguments if needed.

## Changelog

- **0.7.93 (Latest):**
  - Applied mission statement alignment and pruned drift from the source code.
  - Updated inline documentation, error handling, and test coverage.
  - Extended library with new functions: nth root plotting and polynomial plotting from coefficients.

## Contributing

We welcome contributions! Follow these steps:

1. **Open an Issue:** Describe your idea, bug, or improvement.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Submit a Pull Request:** Include clear commit messages and tests.

For detailed guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
