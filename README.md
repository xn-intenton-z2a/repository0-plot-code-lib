# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

- **Mathematical Plotting:** Generate a wide range of plots, from basic functions (sine, cosine, exponential, logarithmic, quadratic, linear, tangent) to advanced visualizations (enhanced spiral plots, polar heatmaps, circular and power plots, custom enhanced and piecewise plots, advanced statistical plots including box and violin plots, damped oscillation, colored spiral plots, dual axis comparisons, and harmonics plots).
- **Multiple Output Formats:** Supports CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT and R formats. (PNG output is provided as a stub implementation.)
- **Interactive & Server Modes:** Run an interactive CLI or launch an Express server for live demonstrations.
- **Analytical Tools:** Includes utilities like range generation, derivative calculation, moving sums/products, and more for detailed analysis.

## New Features

- **Enhanced Spiral Plot:** Use `--plot-spiral-enhanced` for spiral plots with rotation support.
- **Polar Heatmap:** Visualize intensity variations with `--plot-polar-heatmap`.
- **Circular & Power Plots:** Create customizable circular and power plots.
- **Custom Enhanced & Piecewise Plots:** Combine and enhance plots with new piecewise plotting capabilities.
- **Moving Product:** Efficient calculation of moving products.
- **Advanced Polynomial & Nth Root Plots:** Functions like `plotPolynomialFromCoeffsReal` and `plotNthRootReal` are available.
- **Additional Analytical Functions:** Such as `plotCumulativeSumReal`, `plotIntegralReal` (Simpson's rule), `plotBarChartEnhancedReal`, `plotScaledSineReal`, `plotExponentialDecayReal`, `plotCumulativeProductReal`, `movingStdReal`, and `cumulativeDifferenceReal`.
- **Statistical Visualizations:** New functions `plotBoxPlotReal` and `plotViolinPlotReal` for statistical plotting.
- **New Visualization Functions:** `plotDampedOscillationReal` for damped oscillation plots, `plotSpiralColoredReal` for colored spiral plots, **`plotDualAxisReal` for dual-axis comparisons**, and **`plotHarmonicsReal` for visualizing trigonometric harmonics**.
- **Reset Overrides:** Use the `--reset` flag to clear custom module loader overrides.
- **Improved Error Handling:** Enhanced error messages in module loaders for better clarity when overrides fail.

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
- **Plot & Export Options:** Use flags such as `--plot-abs`, `--export-csv`, `--plot-fibonacci`, `--plot-sincos`, `--power-plot`, `--plot-histogram`, `--plot-harmonics`, etc.
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

Custom plot parameters can also be provided directly via the command line.

## Changelog

- **0.7.103 (Latest):**
  - Refactored code to further align with the mission statement and pruned drift in legacy code.
  - Added new plotting function `plotHarmonicsReal` to visualize sums of trigonometric functions.
  - Extended error handling and documentation updates.

## Contributing

We welcome contributions! Follow these steps:

1. **Open an Issue:** Describe your idea, bug, or improvement in the repository's issues.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Submit a Pull Request:** Ensure clear commit messages and include tests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## License

MIT
