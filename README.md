# repository0-plot-code-lib

**A versatile plotting tool for mathematical formula visualizations**

> _Be a go-to plot library with a CLI, be the jq of formulae visualisations._

---

## Overview

This library provides a command-line interface (CLI) and an integrated web interface for plotting a wide variety of mathematical functions. Its design adheres closely to our mission statement and contributing guidelines. The features include generating various output formats and performing advanced analyses such as area calculations, derivative estimations, and transformations.

## Features

- **Plot Types:** Quadratic, Linear, Sine, Exponential, Logarithmic, Cosine, Tangent, Polar, Exponential, Logarithmic
- **Output Formats:** SVG, JSON, CSV, Markdown, ASCII, HTML
- **Advanced Analysis:**
  - Area under curve (Trapezoidal Rule)
  - Derivative calculation (Finite differences)
  - Statistical functions: average, standard deviation, median, mode
  - Transformations: Rotation, Reflection, Scaling, Inversion, Smoothing (Moving average)
  - Gradient visualization
- **Additional Library Functions:**
  - plotQuadratic: Generates an array of points for a quadratic function.
  - calculateDerivative: Approximates the derivative of a function at a given point.
  - calculateArea: Approximates the area under a function curve using the trapezoidal rule.
  - plotLinear: Generates points for a linear function.
  - plotSine: Generates points for a sine wave based on amplitude, frequency, and phase.
  - rotatePoints: Rotates a set of points by a specified angle (in radians).
  - plotExponential: Generates points for an exponential function.
  - plotLogarithmic: Generates points for a logarithmic function (requires xMin > 0).
  - movingAverage: Computes the moving average over a dataset for smoothing.

## Installation

Requires Node.js (v20 or higher):

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

### CLI Quickstart

Generate a simple quadratic plot as SVG:

```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

### Enhanced CLI Features

- **Diagnostics Mode:**

  ```bash
  node src/lib/main.js --diagnostics
  ```
  Outputs Node.js diagnostic information.

- **Interactive Mode:**

  ```bash
  node src/lib/main.js --interactive
  ```
  Prompts the user for a plot command. In non-interactive environments, a fallback timeout prevents hanging. (For tests, ensure the environment variable VITEST is set to "true".)

- **Web Interface Mode:**

  ```bash
  node src/lib/main.js --serve
  ```
  Starts an Express-based interactive plotting web interface. The server initialization now uses dynamic self-import to allow proper error handling and mocking, logs errors correctly, and safely handles server closure to ensure reliable logging and test execution.

### Default Demo

If no arguments are provided, the CLI displays a demo message:

```bash
node src/lib/main.js
```

## Changelog Highlights

- Refactored main.js to use dynamic self-import for loadExpress and loadReadline, ensuring proper error handling and that test mocks work as expected.
- Fixed Express server initialization error by ensuring the returned server instance is checked before calling close.
- Extended library functions by adding plotLinear, plotSine, rotatePoints, and new functions: plotExponential, plotLogarithmic, and movingAverage to enhance plotting capabilities in line with our mission statement.

## Contributing

Contributions are automated. Please open an issue and label it as `automated` to trigger our workflows. For additional details, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
