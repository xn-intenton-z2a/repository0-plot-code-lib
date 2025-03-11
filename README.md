# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool designed to plot and analyze mathematical functions. Embracing our mission, "Be a go-to plot library with a CLI, be the jq of formulae visualisations," the tool offers an extensive set of plotting options, multiple output formats, and enhanced analysis functions.

## Overview

- **Mathematical Plotting:** Generate plots for functions including sine, cosine, exponential, logarithmic, quadratic, linear, tangent, and more. Advanced visualizations include scatter plots, bar charts, Lissajous curves, spiral, circular, enhanced spiral, and custom plots.

- **Multiple Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R formats. (PNG output is provided as a stub.)

- **Interactive and Server Modes:** Enjoy interactive CLI input or run a lightweight Express server for live demonstrations of plotting capabilities.

- **Extended Function Library:** Offers implementations for derivative calculation, range generation, and a wide array of plotting functions such as Fibonacci spiral, combined sine-cosine, polar rose, star polygon, log-log, step function, grid plotting, and the newly added enhanced spiral plotting.

## New Features

- **Enhanced Spiral Plot:** New flag `--plot-spiral-enhanced` to generate a spiral plot with rotation support.
- **Fibonacci Spiral & Combined Sin-Cos Plotting**
- **Circular Plotting:** Generate circular plots with the `--plot-circle` flag.
- **Advanced Visualizations:** Polar Rose (`--plot-polarrose`), Star Polygon (`--plot-starpolygon`), Lemniscate (`--lemniscate`), Log-Log (`--plot-loglog`), Step Function (`--plot-step`), and Grid Plot (`--plot-grid`).
- **Data Analysis:** New functions movingSumReal and plotCubicBezierReal enhance data analytics and visualization.
- **Reset Functionality:** Use the `--reset` flag to restore override hooks to default settings.
- **Improved Testability:** Expanded test coverage, including the new enhanced spiral plot feature, and simulation of external modules for a robust development cycle.

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
  Explore features like `--plot-fibonacci`, `--plot-sincos`, `--heatmap`, `--plot-spiral`, `--plot-spiral-enhanced`, `--plot-circle`, `--plot-polarrose`, `--plot-starpolygon`, `--lemniscate`, `--plot-loglog`, `--plot-step`, and `--plot-grid`.

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

- **0.7.86 (Latest):**
  - Extended functionalities with an enhanced spiral plot (`--plot-spiral-enhanced` flag) that supports rotation.
  - Updated enhanced spiral plot log message to match output requirements.
  - Added additional test coverage for new features.
  - Updated inline documentation and changelog to fully align with the CONTRIBUTING guidelines.
  - Refreshed demo output and pruned any drift from the original mission statement.

## Contributing

We welcome contributions! Follow these steps:

1. **Open an Issue:** Describe your idea, bug report, or improvement by opening an issue in our repository.
2. **Review Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our contribution process.
3. **Submit a Pull Request:** Provide clear commit messages and sufficient test coverage. Ensure your changes adhere to our automated workflow standards.

Your contributions help us build the definitive CLI plotting tool.

## License

MIT
