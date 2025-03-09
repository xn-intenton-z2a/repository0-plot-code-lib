# repository0-plot-code-lib

**A versatile plotting tool for mathematical visualizations aligned with our mission.**

> "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a CLI tool designed for high precision plotting of a wide range of mathematical functions. Built in alignment with our mission and CONTRIBUTING guidelines, the library offers diverse plotting functions and analytical tools, supporting multiple output formats with consistent error handling and interactive features.

## Features

- **Plotting Functions:**
  - Quadratic, Linear, Sine, Cosine, Tangent, Exponential, Logarithmic, Square Root, Polar
  - Absolute plotting
  - Derivative plotting
  - Logistic and Cubic plotting
  - Custom range generation
  - Statistical analysis (e.g., standard deviation)
  - Data smoothing with moving average
  - Point transformations: rotation, reflection, scaling, and offset adjustments

- **CLI Modes:**
  - Default demo mode that introduces the tool
  - Diagnostics mode (`--diagnostics`)
  - Interactive mode (`--interactive`) with input prompt and timeout fallback
  - Web server mode (`--serve`) with enhanced security configurations
  - Absolute plot demo mode (`--plot-abs`)

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

Running the CLI with no arguments displays a demo message that introduces users to the tool.

## Changelog Highlights

- Refined CLI messages and functionalities in line with the mission statement.
- Extended library with new features: plotSqrt, plotPolar, plotAbsolute, generateRange, plotDerivative, offsetPoints, plotLogistic, plotCubic, and calculateStandardDeviation.
- Improved error handling in interactive mode.
- README refreshed and documentation updated per CONTRIBUTING guidelines.

## Contributing

Contributions are automated. To contribute:

1. Open an issue describing your idea, bug, or improvement.
2. Label the issue as `automated` to trigger the workflow.
3. Follow the guidelines outlined in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
