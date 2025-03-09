# repository0-plot-code-lib

**A versatile plotting tool for mathematical formula visualizations**

> _Be a go-to plot library with a CLI, be the jq of formulae visualisations._

---

## Overview

This library provides a command-line interface (CLI) tool for plotting a range of mathematical functions along with analytical features. In addition to core plotting functions, the library supports advanced analysis methods like derivative calculation and area computation using numerical methods. The design and implementation strictly adhere to our mission statement and the contributing guidelines.

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
  - Polar (new)
  - Moving Average for smoothing data
  - Point Transformations: Rotation, Reflection, Scaling

- **CLI Modes:**
  - Default demo mode
  - Diagnostics mode (using --diagnostics)
  - Interactive mode (using --interactive)
  - Web server mode (using --serve)

- **Advanced Analysis:**
  - Area under the curve (Trapezoidal Rule)
  - Derivative calculation (Finite differences)

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
  Starts an Express-based interactive plotting web interface with proper error handling and graceful shutdown in test environments.

### Default Demo

If no arguments are provided, the CLI displays a demo message:

```bash
node src/lib/main.js
```

## Changelog Highlights

- Refreshed README to align with the contributing guidelines.
- Extended library functions with new features including plotSqrt and plotPolar.
- Enhanced test coverage with added interactive fallback tests and robust error handling for external dependencies.

## Contributing

Contributions are automated. Please open an issue and label it as `automated` to trigger our workflows. For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
