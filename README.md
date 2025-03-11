# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool designed to plot and analyze mathematical functions. Embracing our mission, "Be a go-to plot library with a CLI, be the jq of formulae visualisations," the tool offers an extensive set of plotting options, multiple output formats, and enhanced analysis functions.

## Overview

- **Mathematical Plotting:** Generate plots for functions including sine, cosine, exponential, logarithmic, quadratic, linear, tangent, and more. Advanced visualizations include scatter plots, bar charts, Lissajous curves, spiral, circular, and custom plots.

- **Multiple Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R formats. (PNG output is provided as a stub.)

- **Interactive and Server Modes:** Enjoy interactive CLI input or run a lightweight Express server for live demonstrations of plotting capabilities.

- **Extended Function Library:** Offers implementations for derivative calculation, range generation, and a wide array of plotting functions such as Fibonacci spiral, combined sine-cosine, polar rose, star polygon, log-log, step function, and grid plotting.

## New Features

- **Fibonacci Spiral & Combined Sin-Cos Plotting**
- **Circular Plotting:** Generate circular plots with the `--plot-circle` flag.
- **Advanced Visualizations:** Polar Rose (`--plot-polarrose`), Star Polygon (`--plot-starpolygon`), Lemniscate (`--lemniscate`), Log-Log (`--plot-loglog`), Step Function (`--plot-step`), and Grid Plot (`--plot-grid`).
- **Data Analysis:** New functions movingSumReal and plotCubicBezierReal enhance data analytics and visualization.
- **Reset Functionality:** Use the `--reset` flag to restore override hooks to default settings.
- **Improved Testability:** Expanded test coverage and simulation of external modules for a more robust development cycle.

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

Other available commands:

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

- **Plot/Export Flags:**
  Use flags such as `--plot-abs`, `--export-csv`, `--export-md`, etc., to generate specific outputs.

- **Advanced Visualizations:**
  Explore features like `--plot-fibonacci`, `--plot-sincos`, `--heatmap`, `--plot-spiral`, `--plot-circle`, `--plot-polarrose`, `--plot-starpolygon`, `--lemniscate`, `--plot-loglog`, `--plot-step`, and `--plot-grid`.

- **Reset Functionality:**
  ```bash
  node src/lib/main.js --reset
  ```

- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```

- **Custom Plot Parameters:** Pass parameters directly as command-line arguments.

## Changelog

- **0.7.85 (Latest):**
  - Extended functionalities with spiral, circular, and custom plotting features.
  - Added Fibonacci spiral and combined sine-cosine plotting (`--plot-sincos`).
  - Introduced circular plotting with `--plot-circle` flag.
  - **New:** Added polar rose (`--plot-polarrose`), star polygon (`--plot-starpolygon`), lemniscate (`--lemniscate`), log-log (`--plot-loglog`), step function (`--plot-step`), and grid plotting (`--plot-grid`).
  - **Extended:** Added movingSumReal and plotCubicBezierReal for enhanced data analysis and visualization.
  - Pruned legacy implementations and any drift, updating inline documentation to align with the mission and CONTRIBUTING guidelines.
  - **TEST:** Improved test coverage including simulation of external module calls.
  - **REFRESH:** Updated documentation and changelog per revised CONTRIBUTING guidelines.

## Contributing

We welcome contributions! Follow these steps:

1. **Open an Issue:** Describe your idea, bug report, or improvement by opening an issue in our repository.
2. **Review Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our contribution process.
3. **Submit a Pull Request:** Provide clear commit messages and sufficient test coverage. Ensure your changes adhere to our automated workflow standards.

Your contributions help us build the definitive CLI plotting tool.

## License

MIT
