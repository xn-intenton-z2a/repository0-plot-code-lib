# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

This tool enables you to generate a wide range of plots, from basic functions (sine, cosine, exponential, logarithmic, quadratic, linear) to advanced visualizations such as enhanced spiral plots, polar heatmaps, dual axis comparisons, and specialized statistical plots (box, violin, damped oscillation, inverse function plots). Additional analytical utilities (e.g., derivative, integral, moving averages) support deeper mathematical analysis.

## New Features & Enhancements

- **Enhanced Visualizations:** Use flags like `--plot-spiral-enhanced`, `--plot-polar-heatmap`, `--plot-harmonics`, `--plot-modulated-sine`, `--plot-stat-summary`, `--plot-parametric`, `--plot-inverse` and others for advanced plotting.
- **Analytical and Statistical Functions:** Perform derivative calculations, approximate integrals, compute statistical summaries, and more.
- **Robust CLI Modes:** Enjoy interactive, server, diagnostics, and various export modes.
- **Cleaned Legacy Drift:** Code has been refactored to remove legacy code paths and fully align with our mission statement as specified in CONTRIBUTING.md.

## Changelog

- Refreshed inline documentation and pruned legacy code.
- Enhanced error handling for module loaders.
- Extended plotting functions including new features: box plot, violin plot, damped oscillation, spiral colored plot, dual axis plot, harmonics, modulated sine, statistical summary, parametric plot, cumulative average, and inverse function plot.
- Updated CLI help message and testing routines.

## Installation

**Prerequisites:** Node.js v20 or higher.

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
- **Plot Options:** `--plot-abs`, `--plot-parametric`, `--plot-inverse`, etc.
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:** Report bugs, suggest enhancements, or propose new features.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Submit a Pull Request:** Include detailed commit messages and tests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## License

MIT
