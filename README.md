# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is clear: "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This tool provides a broad range of plotting options, multiple output formats, and enhanced analytical functions.

## Overview

- **Mathematical Plotting:** Generate plots for sine, cosine, exponential, logarithmic, quadratic, linear, tangent, and advanced visualizations including scatter, bar charts, Fibonacci spiral, combined sin-cos, polar rose, star polygon, enhanced spiral (with rotation), circular plots, and the new polar heatmap.

- **Multiple Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R formats. (PNG output is provided as a stub.)

- **Interactive and Server Modes:** Run in interactive CLI mode or launch an Express server for live demonstrations.

- **Extended Function Library:** Tools for derivative calculation, range generation, and various custom and advanced plotting functions. Use the `--reset` flag to restore default override hooks.

## New Features

- **Enhanced Spiral Plot:** Use `--plot-spiral-enhanced` for rotation-supported spiral plots.
- **Polar Heatmap:** New `--plot-polar-heatmap` flag visualizes heat intensity in polar coordinates.
- **Circular Plotting:** Generate circular plots with the `--plot-circle` flag.
- **Additional Analytics:** Functions like moving sum and cubic Bezier curve support enriched data analysis.

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

- **Plot/Export Flags:** Use flags like `--plot-abs`, `--export-csv`, `--export-md`, etc., for specific outputs.

- **Advanced Visualizations:** Try flags such as `--plot-fibonacci`, `--plot-sincos`, `--heatmap`, `--plot-spiral`, `--plot-spiral-enhanced`, `--plot-circle`, `--plot-polarrose`, `--plot-starpolygon`, `--lemniscate`, `--plot-loglog`, `--plot-step`, `--plot-grid`, and `--plot-polar-heatmap`.

- **Reset Functionality:**
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
  - Refreshed README and inline documentation to align with CONTRIBUTING guidelines.
  - Extended functionalities with enhanced spiral plot (with rotation support) and new polar heatmap feature.
  - Updated tests and documentation for improved clarity and contribution process.

## Contributing

We welcome your contributions! Please follow these steps:

1. **Open an Issue:** Describe your idea or bug by opening an issue.
2. **Review Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for our process.
3. **Submit a Pull Request:** Ensure clear commit messages and comprehensive test coverage. Follow our automated workflows for a smooth review process.

Your contributions are essential for building the definitive CLI plotting tool.

## License

MIT
