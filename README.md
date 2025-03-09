# repository0-plot-code-lib

**A versatile plotting tool for mathematical visualizations aligned with our mission.**

> "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a CLI tool engineered for high precision plotting and analysis of mathematical functions. Built to strictly adhere to our mission statement and CONTRIBUTING guidelines, it provides a comprehensive suite of plotting functions, statistical analysis tools, and versatile output formats. The library is optimized for both demo usage and interactive real-world application.

## Features

- **Plotting Functions:**
  - Quadratic, Linear, Sine, Cosine, Tangent, Exponential, Logarithmic, Square Root, and Polar plots
  - Absolute value plotting, derivative plotting, logistic and cubic plots
  - Custom range generation

- **Statistical and Transformation Tools:**
  - Standard deviation and Pearson correlation calculation
  - Data smoothing (moving average and exponential moving average)
  - Point transformations including rotation, reflection, scaling, and offset adjustments

- **CLI Modes:**
  - Default demo mode presenting a brief introduction
  - Diagnostics mode (`--diagnostics`)
  - Interactive mode (`--interactive`) with input prompt and fallback timeout
  - Web server mode (`--serve`) with enhanced security configurations
  - CSV Export mode (`--export-csv`) for sample data export
  - Debug mode (`--debug`) to list available plotting functions for troubleshooting

## Installation

Ensure you have Node.js (v20 or higher) installed. Then install the package via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

### CLI Quickstart

Run the default demo:

```bash
npm run start
```

Other modes include:

- **Diagnostics Mode:**
  ```bash
  npm run diagnostics
  ```

- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
  You will be prompted for a plot command; a fallback timeout is triggered if no input is given.

- **Web Server Mode:**
  ```bash
  node src/lib/main.js --serve
  ```
  This starts an Express-based interactive plotting interface.

- **Absolute Plot Demo Mode:**
  ```bash
  node src/lib/main.js --plot-abs
  ```

- **CSV Export Mode:**
  ```bash
  node src/lib/main.js --export-csv
  ```
  Outputs sample plot data in CSV format.

- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```
  Displays a list of available plotting functions for troubleshooting purposes.

## Default Demo

Running the CLI with no arguments displays a demo message that introduces the tool and its capabilities.

## Changelog Highlights

- Refined CLI messages and functionalities to maintain strict alignment with our mission statement.
- Pruned legacy and extraneous code drift to focus on core plotting functionalities per CONTRIBUTING guidelines.
- Extended the library with new features: plotSqrt, plotPolar, plotAbsolute, generateRange, plotDerivative, offsetPoints, plotLogistic, plotCubic, and calculateStandardDeviation.
- Added new helper functions: calculateCorrelation, plotHyperbolic, calculateExponentialMovingAverage, plotGaussian, and exportPlotAsCSV.
- Introduced the CSV export mode (--export-csv) and Debug mode (--debug) for enhanced user feedback and troubleshooting.
- **Enhanced Test Coverage:** Updated tests and mocks to ensure robust and reliable functionality in both interactive and external module scenarios.

## Contributing

Contributions are automated. To contribute:

1. Open an issue describing your idea, bug, or improvement.
2. Label the issue as `automated` to trigger our workflow.
3. Follow the guidelines detailed in [CONTRIBUTING.md](./CONTRIBUTING.md).

We welcome enhancements that align with our mission: to be the leading CLI plotting tool that seamlessly integrates mathematical precision and flexible output formats.

## License

MIT
