# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is clear:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

- **Mathematical Plotting:** Generate plots for a wide range of functions including sine, cosine, exponential, logarithmic, quadratic, linear, and tangent. Advanced visualizations include enhanced spiral plots with rotation support, polar heatmaps, circular plots, power plots, and other custom plots.
- **Multiple Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R formats. (PNG output is provided as a stub.)
- **Interactive and Server Modes:** Use the CLI for interactive sessions or launch an Express server for live demonstrations.
- **Analytical Tools:** Benefit from extended functionalities including derivative calculations, range generation, moving sum computations, and cubic Bezier curve plotting.

## New Features

- **Enhanced Spiral Plot:** Use the `--plot-spiral-enhanced` flag for spiral plots with rotation support.
- **Polar Heatmap:** Visualize heat intensity in polar coordinates with the `--plot-polar-heatmap` flag.
- **Circular Plotting:** Generate circular plots using the `--plot-circle` flag.
- **Power Plot:** Create power plots (e.g., y = 2x^3) with customizable parameters via the `--power-plot` flag.
- **Additional Analytics:** Extended function library supporting moving sum, cubic Bezier curves, and more.

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
- **Advanced Visualizations:** Try flags such as `--plot-fibonacci`, `--plot-sincos`, `--heatmap`, `--plot-spiral`, `--plot-spiral-enhanced`, `--plot-circle`, `--plot-polarrose`, `--plot-starpolygon`, `--lemniscate`, `--plot-loglog`, `--plot-step`, `--plot-grid`, `--plot-polar-heatmap`, and `--power-plot`.
- **Reset Overrides:**
  ```bash
  node src/lib/main.js --reset
  ```
- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```
- **Custom Parameters:** Pass custom plot parameters directly as command-line arguments.

## Changelog

- **0.7.88 (Latest):**
  - Refreshed README and inline documentation per CONTRIBUTING guidelines.
  - Extended functionalities with enhanced spiral plots (with rotation support), new polar heatmap feature, and new power plot functionality.
  - Improved error handling and comprehensive test coverage.

## Contributing

We welcome your contributions! Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement.
2. **Review Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for our contribution process.
3. **Submit a Pull Request:** Ensure clear commit messages and include comprehensive tests.

Your involvement is key to building the definitive CLI plotting tool.

## License

MIT
