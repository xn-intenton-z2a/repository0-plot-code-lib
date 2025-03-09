# repository0-plot-code-lib

**A versatile plotting tool for mathematical visualizations**

> "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a command-line interface (CLI) tool designed for high precision plotting of a wide range of mathematical functions. The library offers diverse plotting functions, analytical tools such as derivative and area computation, and supports multiple output formats—all built in alignment with our mission statement and CONTRIBUTING guidelines.

## Features

- **Plotting Functions:**
  - Quadratic, Linear, Sine, Cosine, Tangent, Exponential, Logarithmic, Square Root, Polar
  - Absolute plotting
  - Derivative plotting
  - Logistic and Cubic plotting
  - Custom range generation
  - Statistical analysis (e.g., standard deviation)
  - Data smoothing with moving average
  - Point transformations: rotation, reflection, scaling, and offset

- **CLI Modes:**
  - Default demo mode
  - Diagnostics mode (`--diagnostics`)
  - Interactive mode (`--interactive`) with a timeout fallback
  - Web server mode (`--serve`) with enhanced security headers
  - Absolute Plot demo (`--plot-abs`)

- **Advanced Analysis:**
  - Numerical integration (trapezoidal rule)
  - Finite differences derivative calculation

## Installation

Ensure you have Node.js (v20 or higher) installed. Then install the package via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

### CLI Quickstart

Run the CLI demo:

```bash
npm run start
```

Other modes:

- **Diagnostics Mode:**
  ```bash
  npm run diagnostics
  ```

- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
  The CLI will prompt for a plot command and use a fallback timeout if no input is received.

- **Web Server Mode:**
  ```bash
  node src/lib/main.js --serve
  ```
  Starts an Express-based interactive plotting interface.

- **Absolute Plot Demo:**
  ```bash
  node src/lib/main.js --plot-abs
  ```

### Default Demo

Running the CLI with no arguments displays a demo message.

## Changelog Highlights

- Refined CLI messages and functionalities.
- Extended library with new features: plotSqrt, plotPolar, plotAbsolute, generateRange, plotDerivative, offsetPoints, plotLogistic, plotCubic, and calculateStandardDeviation.
- Improved error handling in interactive mode.
- README refreshed and documentation updated to adhere to CONTRIBUTING guidelines.

## Contributing

Contributions are automated. To contribute:

1. Open an issue describing your idea, bug, or improvement.
2. Label it as `automated` to trigger the contribution workflow.
3. Follow the guidelines outlined in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
