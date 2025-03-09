# repository0-plot-code-lib

**A versatile plotting tool for mathematical formula visualizations**

> _Be a go-to plot library with a CLI, be the jq of formulae visualisations._

---

## Overview

This library provides a command-line interface (CLI) tool for plotting a range of mathematical functions along with analytical features. It supports core plotting functions as well as advanced analysis methods including derivative calculations and numerical area computation. The implementation is realigned with our mission statement and pruned of redundant drift following our contributing guidelines.

## Features

- **Plot Types:**
  - Quadratic, Linear, Sine, Cosine, Tangent, Exponential, Logarithmic, Square Root, Polar
  - Absolute plotting (new)
  - Derivative plotting (new)
  - Moving Average for data smoothing
  - Point transformations: Rotation, Reflection, Scaling, Offset (new)
  - Custom Range Generation (new helper)

- **CLI Modes:**
  - Default demo mode
  - Diagnostics mode (`--diagnostics`): Outputs Node.js diagnostic information.
  - Interactive mode (`--interactive`): Prompts for user input with a timeout fallback.
  - Web server mode (`--serve`): Starts an Express-based interactive plotting web interface.
  - Absolute Plot demo mode (`--plot-abs`): Demos absolute value plotting.

- **Advanced Analysis:**
  - Numerical area under the curve (Trapezoidal Rule)
  - Finite differences derivative calculation

## Installation

Ensure you have Node.js (v20 or higher) installed.

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

### CLI Quickstart

Run the CLI demo:

```bash
npm run start
```

For specific functions, use the following flags:

- **Diagnostics Mode:**
  ```bash
  npm run diagnostics
  ```

- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
  The CLI will prompt for a plot command. In non-interactive environments, a fallback timeout is triggered.

- **Web Interface Mode:**
  ```bash
  node src/lib/main.js --serve
  ```
  Starts an Express-based interactive plotting interface with security headers disabled.

- **Absolute Plot Demo Mode:**
  ```bash
  node src/lib/main.js --plot-abs
  ```

### Default Demo

Running with no arguments displays a demo message:

```bash
node src/lib/main.js
```

## Changelog Highlights

- Realigned CLI messages and functionalities with our mission statement.
- Pruned redundant code to eliminate drift as per CONTRIBUTING.md guidelines.
- Extended library with new features: plotSqrt, plotPolar, plotAbsolute, generateRange, plotDerivative, and offsetPoints.
- Enhanced error handling in interactive mode with additional try/catch blocks.
- Updated test coverage and documentation to reflect refined implementation.

## Contributing

Contributions are automated. Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.
2. **Label It as `automated`:** This triggers our automated workflows.
3. **Review CONTRIBUTING.md:** Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

MIT
