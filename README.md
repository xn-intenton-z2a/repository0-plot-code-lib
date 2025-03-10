# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool designed to plot and analyze mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This tool supports multiple output formats and a broad range of plotting functionalities with both stub and real implementations.

## Overview

This CLI utility provides:

- Plotting of various mathematical functions using both stub and real implementations.
- Multiple output formats including CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, R, and a PNG stub.
- Modes for diagnostics, interactive input, web server, and debug output.
- Extended functionalities such as derivative calculations, numeric range generation, and real implementations for many mathematical plots including sine, cosine, exponential, logarithmic, quadratic, linear, tangent, sigmoid, histogram, polar, logistic, cubic, gaussian, and moving median.

**New Features:**

- Histogram plotting using the `--plot-histogram` flag.
- Real implementations for hyperbola and ellipse plotting (`plotHyperbolaReal` and `plotEllipseReal`).
- New real implementations for cubic plotting (`plotCubicReal`), gaussian plotting (`plotGaussianReal`), and data smoothing using moving median (`movingMedianReal`).

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
  - `--plot-abs`: Outputs an absolute plot of sin(x).
  - `--export-csv`: Outputs CSV formatted plot data.
  - `--export-md`: Outputs a Markdown table.
  - `--export-json`: Outputs JSON data.
  - `--export-html`: Outputs an HTML table.
  - `--export-ascii`: Outputs an ASCII formatted table.
  - `--export-svg`: Outputs SVG content.
  - `--export-xml`: Outputs XML data.
  - `--export-latex`: Outputs a LaTeX formatted table.
  - `--export-txt`: Outputs plain text data.
  - `--export-r`: Outputs data in R-friendly format.
  - `--export-png`: PNG output (stub).
  - `--scatter`: Outputs a scatter plot.
  - `--bar-chart`: Outputs a bar chart.
  - `--plot-parametric`: Outputs a parametric plot.
  - `--plot-poly`: Outputs a polynomial plot.
  - `--lissajous`: Outputs a Lissajous curve.
  - `--lemniscate`: Outputs a lemniscate plot.
  - `--hyperbola`: (Stub) Hyperbola plot.
  - `--power-plot`: Outputs a power plot (y = 2x^3).
  - `--plot-histogram`: Outputs a histogram based on sample data.

- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```

- **Help:**
  ```bash
  node src/lib/main.js --help
  ```

For custom plot parameters, simply pass them as arguments to the CLI.

## Extended Library Functions

This release includes real implementations for core functions:

- **calculateDerivative:** Uses mathjs to compute the derivative at a specified value.
- **generateRange:** Generates a numeric sequence between two values with an optional step.
- **Real Plot Functions:**
  - **plotSineReal, plotCosineReal, plotExponentialReal, plotLogarithmicReal** for standard function plots.
  - **plotQuadraticReal, plotLinearReal, plotTangentReal** for polynomial and trigonometric plots.
  - **rotatePointsReal, plotSigmoidReal, plotReLUReal** for point transformations and activation functions.
  - **plotHistogramReal, plotPolarReal, plotLogisticReal, movingAverageReal** for histogram, polar, logistic plots and data smoothing.
  - **plotSincReal, calculateDefiniteIntegralReal, plotBezierReal** for additional advanced plotting capabilities.
  - **plotHyperbolaReal, plotEllipseReal:** Real implementations for hyperbola and ellipse plotting.
  - **plotCubicReal, plotGaussianReal, movingMedianReal:** New implementations for cubic and gaussian plots along with a moving median function for data smoothing.

## Changelog

- **2024-01:** Refreshed README to align with updated contribution guidelines and remove outdated content.
- **2024-04:** Pruned legacy drift and reinforced the mission statement in the source code.
- **2024-05:** Extended library functions for standard plots (sine, cosine, exponential, and logarithmic).
- **2024-07:** Added real quadratic, linear, tangent plots, and point rotation implementations.
- **2024-08:** Introduced real implementations for sigmoid and ReLU plots.
- **2024-09:** Added histogram plotting feature and improved error handling.
- **2024-12:** Extended functions with polar, logistic plots and moving average; refreshed documentation as per CONTRIBUTING.md.
- **2024-12.10:** Added new real implementations for plotCubicReal, plotGaussianReal and movingMedianReal, further extending the library's capabilities.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.

2. **Review Guidelines:** Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for our workflow and project mission.

3. **Submit Your Changes:** Commit your updates with clear, descriptive messages.

Our automated workflows will help integrate your changes quickly.

## License

MIT
