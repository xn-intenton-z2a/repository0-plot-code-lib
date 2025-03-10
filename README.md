# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool designed to plot and analyze mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This tool supports multiple output formats and a wide range of plotting functionalities with both legacy stubs (for API compatibility) and real implementations for mathematical visualisations.

## Overview

- **Mathematical Plotting:** Supports plotting of functions such as sine, cosine, exponential, logarithmic, quadratic, linear, tangent, sigmoid, histogram, polar, logistic, cubic, gaussian, and now heatmap visualizations.
- **Multiple Output Formats:** Provides outputs in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R; with PNG support as a stub.
- **Interactive CLI:** Offers an interactive mode, diagnostic mode, server mode, and debug features.
- **Extended Functions:** Includes real implementations for derivative calculations, numeric range generation, and various plotting functions, alongside legacy stubs for backward compatibility.

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
- **Plot/Export Flags:** Pass flags such as `--plot-abs`, `--export-csv`, `--export-md`, etc., to generate specific plot outputs.
- **Heatmap Visualization:**
  ```bash
  node src/lib/main.js --heatmap
  ```
- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```

For custom plot parameters, simply pass them as arguments to the CLI.

## Extended Library Functions

This release provides real implementations for:

- **calculateDerivative:** Compute the derivative of a function using mathjs.
- **generateRange:** Create numeric sequences with custom steps.
- **Real Plot Functions:** Including but not limited to plotSineReal, plotCosineReal, plotExponentialReal, plotLogarithmicReal, plotQuadraticReal, plotLinearReal, plotTangentReal, plotHistogramReal, plotPolarReal, plotLogisticReal, plotCubicReal, plotGaussianReal, movingMedianReal, and now plotHeatMapReal for two-dimensional data visualization.

## Changelog

- **2024-12.11:** Updated source file per mission statement: pruned legacy drift, extended plotting features (including the heatmap visualization), improved error handling, and enhanced test coverage.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement in our issue tracker.
2. **Review Guidelines:** Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our workflow and project mission.
3. **Submit Your Changes:** Commit your improvements with clear, descriptive messages. Automation processes help integrate your contributions smoothly.

Thank you for helping improve repository0-plot-code-lib!

## License

MIT
