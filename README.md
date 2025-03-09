# repository0-plot-code-lib

**A versatile plotting tool for mathematical formula visualizations**

> _Be a go-to plot library with a CLI, be the jq of formula visualizations._

---

## Overview

This library provides a command-line interface (CLI) tool for plotting a range of mathematical functions along with analytical features. It supports both core plotting functions and advanced analysis methods such as derivative calculations and numerical area computation. The implementation is aligned with our mission statement and adheres to our contributing guidelines.

## Features

- **Plot Types:**
  - Quadratic
  - Linear
  - Sine
  - Cosine
  - Tangent
  - Exponential
  - Logarithmic
  - Square Root
  - Polar
  - Absolute (new)
  - Moving Average for data smoothing
  - Point transformations: Rotation, Reflection, Scaling
  - Custom Range Generation (new helper)

- **CLI Modes:**
  - Default demo mode
  - Diagnostics mode (`--diagnostics`): Outputs Node.js diagnostic information.
  - Interactive mode (`--interactive`): Prompts for user input with a timeout fallback.
  - Web server mode (`--serve`): Starts an Express-based interactive plotting web interface.
  - Absolute Plot demo mode (`--plot-abs`): Demonstrates absolute function plotting (using Math.sin).

- **Advanced Analysis:**
  - Numerical area under curve (Trapezoidal Rule)
  - Derivative calculation (Finite Differences)

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

- **Interactive Mode:**

  ```bash
  node src/lib/main.js --interactive
  ```
  The CLI will prompt for a plot command. In non-interactive environments, a timeout fallback is triggered.

- **Web Interface Mode:**

  ```bash
  node src/lib/main.js --serve
  ```
  Starts an Express-based web interface. The server disables the x-powered-by header for security.

- **Absolute Plot Demo Mode:**

  ```bash
  node src/lib/main.js --plot-abs
  ```
  Demonstrates plotting the absolute value of a function.

### Default Demo

If no arguments are provided, the CLI displays a demo message:

```bash
node src/lib/main.js
```

## Changelog Highlights

- Refreshed README and changelog to align with the latest contributing guidelines.
- Pruned drift from previous implementations in favor of a focused, mission-aligned approach.
- Extended library functions with new features: plotSqrt, plotPolar, plotAbsolute, and generateRange.
- Enhanced CLI functionality with additional flags and improved error handling.

## Contributing

Contributions are automated. To contribute:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement.

2. **Label It as `automated`:** This label will trigger our automated workflows.

3. **Review CONTRIBUTING.md:** Our [CONTRIBUTING.md](./CONTRIBUTING.md) contains detailed guidelines.

## License

MIT
