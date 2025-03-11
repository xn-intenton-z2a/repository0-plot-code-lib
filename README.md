# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

- **Mathematical Plotting:** Generate a wide range of plots, from basic functions (sine, cosine, exponential, logarithmic, quadratic, linear, tangent) to advanced visualizations (enhanced spiral plots, polar heatmaps, circular and power plots, custom enhanced and piecewise plots, advanced statistical plots, and now damped oscillation and colored spiral plots).
- **Multiple Output Formats:** Supports CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R formats (PNG output is a stub implementation).
- **Interactive & Server Modes:** Run an interactive CLI or launch an Express server for live demonstrations.
- **Analytical Tools:** Built-in functions for tasks like range generation, derivative calculation, moving sums/products, and more.

## New Features

- **Enhanced Spiral Plot:** Use `--plot-spiral-enhanced` for spiral plots with rotation support.
- **Polar Heatmap:** Visualize intensity variations with `--plot-polar-heatmap`.
- **Circular & Power Plots:** Create customizable circular and power plots.
- **Custom Enhanced & Piecewise Plots:** Combine and enhance base plots with new piecewise plotting.
- **Moving Product:** Calculate moving products efficiently.
- **Advanced Polynomial & Nth Root Plots:** New functions `plotPolynomialFromCoeffsReal` and `plotNthRootReal` extend the library's capabilities.
- **Additional Analytical Features:** New functions such as `plotCumulativeSumReal`, `plotIntegralReal` (using Simpson's rule), `plotBarChartEnhancedReal`, `plotScaledSineReal`, `plotExponentialDecayReal`, `plotCumulativeProductReal`, `movingStdReal`, and `cumulativeDifferenceReal`.
- **Statistical Visualizations:** Advanced plots like box and violin plots (`plotBoxPlotReal` and `plotViolinPlotReal`).
- **Reset Overrides:** Use the `--reset` flag to clear custom module loader overrides.
- **Improved Error Handling:** Enhanced error messages in module loaders ensure clarity when overrides fail.
- **New Visualization Functions:** Added `plotDampedOscillationReal` for damped oscillation plots and `plotSpiralColoredReal` for colored spiral visualizations.
- **Comprehensive Testing:** Nearly 100% test coverage with unit tests covering all functionalities.

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
- **Server Mode:** `node src/lib/main.js --serve`
- **Plot & Export Options:** Use flags such as `--plot-abs`, `--export-csv`, `--plot-fibonacci`, `--plot-sincos`, `--power-plot`, etc.
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

You can also provide custom plot parameters directly via the command line.

## Changelog

- **0.7.98 (Latest):**
  - Extended feature set to further align with our mission statement.
  - Added new functions: `plotDampedOscillationReal` and `plotSpiralColoredReal` for enhanced visualizations.
  - Pruned and streamlined code sections to reduce drift from the mission.
  - Updated testing for near 100% coverage and improved documentation.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:** Describe your idea, bug, or improvement by opening an issue in our repository.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Submit a Pull Request:** Include clear commit messages and tests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for complete guidelines.

## License

MIT
