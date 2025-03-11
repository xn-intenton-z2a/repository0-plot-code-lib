# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

- **Mathematical Plotting:** Generate a wide range of plots including basic functions (sine, cosine, exponential, logarithmic, quadratic, linear, tangent) and advanced visualizations (enhanced spiral plots with rotation, polar heatmaps, circular and power plots, custom enhanced and piecewise plots, moving product, derivative, advanced polynomial and nth root plotting, scaled sine plots, exponential decay plots, cumulative product plots, moving standard deviation and cumulative difference plots, box and violin plots).
- **Multiple Formats:** Supports CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R formats. Note: PNG output is a stub implementation.
- **Interactive & Server Modes:** Launch an interactive CLI or a live Express server for demonstrations.
- **Analytical Tools:** Built-in functions for range generation, derivative calculation, moving sum/product, moving standard deviation, cumulative difference and more.

## New Features

- **Enhanced Spiral Plot:** Use `--plot-spiral-enhanced` for spiral plots with rotation support.
- **Polar Heatmap:** Visualize intensity variations with `--plot-polar-heatmap`.
- **Circular & Power Plots:** Generate customizable circular and power plots.
- **Custom Enhanced & Piecewise Plots:** Combine and enhance base plots, with new piecewise plotting support.
- **Moving Product:** Efficiently calculate moving products over data sets.
- **Advanced Polynomial & Nth Root Plots:** New functions `plotPolynomialFromCoeffsReal` and `plotNthRootReal` extend the library's capabilities.
- **Additional Analytical Functions:** Newly added functions include `plotCumulativeSumReal`, `plotIntegralReal` (using Simpson's rule), `plotBarChartEnhancedReal`, **plotScaledSineReal**, **plotExponentialDecayReal**, **plotCumulativeProductReal**, **movingStdReal**, and **cumulativeDifferenceReal** for extended visualization and analysis.
- **Advanced Statistical Plots:** New functions `plotBoxPlotReal` and `plotViolinPlotReal` provide basic statistical visualizations.
- **Reset Overrides:** New `resetOverrides` function is provided to reset module overrides.
- **Improved Error Handling:** Module loader functions now wrap errors from overrides to provide clear feedback (e.g. 'Failed to load express: module not found').
- **Improved Test Coverage:** Additional tests now cover module loader error handling and ensure near 100% test coverage, in line with CONTRIBUTING guidelines.

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

Other common commands:
- **Diagnostics:** `npm run diagnostics`
- **Interactive Mode:** `node src/lib/main.js --interactive`
- **Web Server Mode:** `node src/lib/main.js --serve`
- **Plot & Export Options:** Use flags like `--plot-abs`, `--export-csv`, `--plot-fibonacci`, `--plot-sincos`, `--power-plot`, etc.
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

Custom plot parameters can also be provided directly through the command line.

## Changelog

- **0.7.97 (Latest):**
  - Refined source file to strictly align with the mission statement by pruning drift and enhancing inline documentation.
  - Grouped functions into CLI, analytical, plotting, and advanced plotting sections.
  - Added new functions: `plotCumulativeSumReal`, `plotIntegralReal`, `plotBarChartEnhancedReal`, `plotScaledSineReal`, `plotExponentialDecayReal`, `plotCumulativeProductReal`, `movingStdReal`, `cumulativeDifferenceReal`, `plotBoxPlotReal`, and `plotViolinPlotReal`, along with `resetOverrides`.
  - Improved error handling in module loaders and updated test coverage for comprehensive functionality.

## Contributing

We welcome contributions! Please follow these steps:
1. **Open an Issue:** Describe your idea, bug, or improvement by opening an issue in our repository.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Submit a Pull Request:** Include clear commit messages and tests. Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

MIT
