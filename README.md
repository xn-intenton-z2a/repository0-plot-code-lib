# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission remains:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

- **Mathematical Plotting:** Generate a variety of plots for functions such as sine, cosine, exponential, logarithmic, quadratic, linear, and tangent. Advanced visualizations include enhanced spiral plots (with rotation support), polar heatmaps, circular plots, power plots, custom enhanced plots, and new functions for piecewise plotting, moving product calculations, and derivative plotting.
- **Multiple Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R formats. (PNG output is provided as a stub.)
- **Interactive and Server Modes:** Utilize the CLI in interactive mode or launch an Express server for live demonstrations.
- **Analytical Tools:** Features include derivative calculations, range generation, moving sum, cubic Bezier curves, and more.

## New Features

- **Enhanced Spiral Plot:** Use the `--plot-spiral-enhanced` flag for spiral plots with rotation support.
- **Polar Heatmap:** Visualize polar heat intensity with the `--plot-polar-heatmap` flag.
- **Circular Plotting:** Generate circular plots using the `--plot-circle` flag.
- **Power Plot:** Create power plots with customizable parameters using the `--power-plot` flag.
- **Custom Enhanced Plot:** Combine basic custom plots with additional enhancements using the `--plot-custom-enhanced` flag.
- **Piecewise Plot:** Plot piecewise functions using the new `plotPiecewiseReal` function and `--plot-piecewise` flag.
- **Moving Product:** Calculate the moving product of a data set with the `movingProductReal` function.
- **Derivative Plot:** Calculate and display the derivative of a given function using the `--plot-derivative` flag.
- **Additional Analytics:** Extended function library including moving sum calculations, cubic Bezier curves, and more.

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

- **Diagnostics:**
  ```bash
  npm run diagnostics
  ```
- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
- **Web Server Mode:**
  ```bash
  node src/lib/main.js --serve
  ```
- **Plot/Export Flags:** Use flags such as `--plot-abs`, `--export-csv`, `--export-md`, etc., for specific outputs.
- **Advanced Visualizations:** Try flags such as `--plot-fibonacci`, `--plot-sincos`, `--heatmap`, `--plot-spiral`, `--plot-spiral-enhanced`, `--plot-circle`, `--plot-polarrose`, `--plot-starpolygon`, `--lemniscate`, `--plot-loglog`, `--plot-step`, `--plot-grid`, `--plot-polar-heatmap`, `--power-plot`, `--plot-custom-enhanced`, `--plot-piecewise`, and `--plot-derivative`.
- **Reset Overrides:**
  ```bash
  node src/lib/main.js --reset
  ```
- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```
- **Custom Parameters:** Provide custom plot parameters directly as command-line arguments.

## Changelog

- **0.7.91 (Latest):**
  - Extended functionalities with the addition of derivative plotting and piecewise plotting features.
  - Added new CLI flags: `--plot-piecewise` and `--plot-derivative`.
  - Introduced enhanced error handling and comprehensive inline documentation updates.
  - Updated test coverage and refreshed contribution guidelines in line with CONTRIBUTING.md.

## Contributing

We welcome your contributions! Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.
2. **Review Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for our contribution process.
3. **Submit a Pull Request:** Include clear commit messages and comprehensive tests.

Your involvement is key to building the definitive CLI plotting tool.

## License

MIT
