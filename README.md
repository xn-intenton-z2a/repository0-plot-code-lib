# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

This tool enables you to generate an extensive range of plots, from basic functions (sine, cosine, exponential, logarithmic, quadratic, and linear) to advanced visualizations such as enhanced spiral plots, polar heatmaps, dual axis comparisons, and specialized statistical plots including box and violin plots. Additional analytical utilities (e.g., derivative, integral, moving averages) support deeper mathematical analysis.

## New Features & Enhancements

- **Enhanced Visualizations:** Use flags like `--plot-spiral-enhanced`, `--plot-polar-heatmap`, `--plot-harmonics`, and `--plot-modulated-sine` for advanced plots.
- **Analytical and Statistical Functions:** Calculate derivatives, integrals, statistical summaries (`--plot-stat-summary`), cumulative averages, and more.
- **Extended Plot Functions:** New functions for parametric plotting (`plotParametricReal`), dual-axis comparisons (`plotDualAxisReal`), and cumulative average calculations.
- **Improved Error Handling & Reset Capabilities:** Use `--reset` to clear module loader overrides.

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

Common commands:

- **Diagnostics:** `npm run diagnostics`
- **Interactive Mode:** `node src/lib/main.js --interactive`
- **Server Mode:** `node src/lib/main.js --serve`
- **Export Options:** `--export-csv`, `--export-md`, `--export-json`, etc.
- **Plot Options:** `--plot-abs`, `--plot-harmonics`, `--plot-modulated-sine`, `--plot-stat-summary`, `--plot-parametric`, etc.
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:** Report your bug, idea, or improvement.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Submit a Pull Request:** Include detailed commit messages and tests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## License

MIT
