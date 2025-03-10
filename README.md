# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool designed to plot and analyze mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This tool offers a wide range of features from classic function plotting to advanced visualizations including heatmaps, scatter plots, bar charts, Lissajous curves, spiral, circular and custom plots, Fibonacci spiral plots, combined sine-cosine plots, as well as new visualizations like Polar Rose and Star Polygon plots, and now Lemniscate plots.

## Overview

- **Mathematical Plotting:**
  Generate plots for sine, cosine, exponential, logarithmic, quadratic, linear, tangent, and more.

- **Multiple Output Formats:**
  Export plots in formats such as CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R. (PNG output remains a stub implementation.)

- **Interactive CLI & Server Mode:**
  Run in interactive mode or start a lightweight Express server for live demonstrations.

- **Extended Function Library:**
  Includes real implementations for derivative calculations, range generation, and a wide array of plotting functions while maintaining legacy stubs for backward compatibility.

- **New Features:**
  - Added new circular plotting function (--plot-circle) that generates points on a circle given a center and radius.
  - Added Fibonacci spiral plotting (--plot-fibonacci) and combined sine-cosine plotting (--plot-sincos).
  - **New:** Added Polar Rose (--plot-polarrose), Star Polygon (--plot-starpolygon), and Lemniscate (--lemniscate) plotting functions for advanced visualizations.

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
  Use flags such as `--plot-abs`, `--export-csv`, `--export-md`, etc., to generate specific plot outputs.

- **Advanced Visualizations:**
  For example, use `--plot-fibonacci`, `--plot-sincos`, `--heatmap`, `--plot-spiral`, `--plot-circle`, `--plot-polarrose`, `--plot-starpolygon`, and `--lemniscate` to explore complex plots.

- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```

- **Custom Plot Parameters:**
  Pass plot parameters directly as command-line arguments.

## Changelog

- **0.7.78 (Latest):**
  - Extended functionalities with new spiral, circular, and custom plotting features.
  - Added Fibonacci spiral plotting and combined sine-cosine plotting (--plot-sincos).
  - Introduced new circular plotting with flag --plot-circle.
  - **New:** Added Polar Rose (--plot-polarrose), Star Polygon (--plot-starpolygon), and Lemniscate (--lemniscate) plotting functions.
  - Pruned legacy drift in the source file to align with our mission statement and updated contributing guidelines.
  - Refined module loader error handling and updated test coverage per CONTRIBUTING guidelines.
  - README and documentation refreshed to match the latest guidelines.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:**
   Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.

2. **Review Guidelines:**
   Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed information on our contribution process.

3. **Submit a Pull Request:**
   Ensure your changes include clear commit messages and adequate test coverage.

Your contributions help us make repository0-plot-code-lib even better!

## License

MIT
