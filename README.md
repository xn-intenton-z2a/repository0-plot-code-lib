# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool designed to plot and analyze mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

This CLI utility provides:

- Plotting of various mathematical functions with both stub and real implementations.
- Multiple output formats including CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, R, and a PNG stub.
- Modes for diagnostics, interactive input, web server, and debug output.
- Extended functionalities such as calculating derivatives, generating numeric ranges, and a comprehensive suite of real implementations for common plots including sine, cosine, exponential, logarithmic, quadratic, linear, and more.
- **New Features:** Additional library functions including plotSincReal, calculateDefiniteIntegralReal, and plotBezierReal to extend versatility, along with the existing --plot-histogram flag.

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
  - `--export-png`: Stub for PNG output.
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

- **calculateDerivative:** Uses mathjs to compute the derivative at a specific value.
- **generateRange:** Generates a numeric sequence between two values with an optional step.
- **New Real Plot Functions:**
  - **plotSineReal, plotCosineReal, plotExponentialReal, plotLogarithmicReal** for standard function plots.
  - **plotQuadraticReal, plotLinearReal, plotTangentReal** for polynomial and trigonometric plots.
  - **rotatePointsReal, plotSigmoidReal, plotReLUReal** for point transformations and activation functions.
  - **plotHistogramReal, plotPolarReal, plotLogisticReal, movingAverageReal** for histogram, polar, logistic curve and data smoothing respectively.
  - **plotSincReal, calculateDefiniteIntegralReal, plotBezierReal** as additional functions to further extend the library's versatility.

## Contributing

We welcome contributions! To contribute, please:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.
2. **Review the Guidelines:** Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our workflow and project mission.
3. **Submit Your Changes:** Commit your updates with clear, descriptive messages.

Our automated workflows will help integrate your changes quickly.

## Changelog

- **2024-01:** Refreshed README to align with updated CONTRIBUTING guidelines and remove outdated content.
- **2024-04:** Updated source file to prune legacy drift and reinforce the mission statement.
- **2024-05:** Extended library functions for common plots including sine, cosine, exponential, and logarithmic functions.
- **2024-07:** Added real implementations for quadratic, linear, tangent plots, and point rotations.
- **2024-08:** Introduced real implementations for sigmoid and ReLU plots.
- **2024-09:** Continued pruning legacy drift and streamlined implementations.
- **2024-10:** Added histogram plotting feature and improved error handling.
- **2024-11:** Enhanced test coverage and refined error handling per CONTRIBUTING guidelines.
- **2024-12:** Extended library functions with implementations for polar, logistic plots and moving average; refreshed project documentation as per CONTRIBUTING.md.
- **2024-12.5:** Added the `--plot-histogram` flag in the CLI to support histogram plotting.
- **2024-12.8:** Added additional functions: plotSincReal, calculateDefiniteIntegralReal, and plotBezierReal to further extend functionality.

## License

MIT
