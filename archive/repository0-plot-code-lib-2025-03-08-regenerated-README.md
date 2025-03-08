# repository0-plot-code-lib

**A versatile plotting tool for mathematical formula visualizations**

> _Be a go-to plot library with a CLI, be the jq of formulae visualisations._

---

## Overview

This library provides a command-line interface (CLI) and an integrated web interface for plotting a wide variety of mathematical functions including quadratic, linear, trigonometric (sine, cosine, tangent), polar, exponential, and logarithmic equations. The library generates multiple output formats, facilitating immediate use in workflows or web integration.

---

## Features

- **Plot Types:** Quadratic, Linear, Sine, Cosine, Tangent, Polar, Exponential, Logarithmic
- **Output Formats:** SVG, JSON, CSV, Markdown, ASCII, HTML
- **Advanced Analysis:**
  - Area under curve (Trapezoidal Rule)
  - Derivative calculation (Finite differences)
  - Statistical functions: average, standard deviation, median, mode
  - Transformations: Rotation, Reflection, Scaling, Inversion, Smoothing (Moving average)
  - Gradient visualization

---

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

### Interactive CLI

Interactive mode prompts the user to input formulas directly:

```bash
node src/lib/main.js --interactive
```

### Web Interface

Start the Express-based interactive plotting web interface:

```bash
node src/lib/main.js --serve
```

---

## Examples

**Linear Plot (SVG):**

```bash
node src/lib/main.js linear.svg "linear:2,3,-10,10,1"
```

**Custom Mathematical Expression:**

```bash
node src/lib/main.js expression.svg "expr:Math.sin(x)*x:-10,10,0.5"
```

**ASCII Plot Output:**

```bash
node src/lib/main.js --ascii "sine:1,1,0,0,360,30"
```

---

## Key Features and Implementation Details

### Functionalities Implemented:
- Full plot generation with range and step customization.
- Advanced transformations: rotation, reflection, scaling, inversion.
- Statistical analysis: mean, median, mode, standard deviation.
- Derivative and area computations.
- Moving average smoothing.
- Interactive CLI and Express-based Web server.
- Comprehensive JSON-based data export.
- Enhanced robust formula parsing and expression evaluation.

### Functionalities Demonstrated or Stubbed:
- 3D plotting features (e.g., Helix rotation) are limited demonstrations.
- Gradient-based coloring for plots (`plotGradient`) is experimental and might require refinement for large datasets.

### Testing
- Comprehensive tests available for all key functionalities (`vitest`).
- Unit tests cover mathematical accuracy and output validation across all plot types and formats.

---

## Developer Guide

### Contributing
Contributions are fully automated. Open an issue with the label `automated` to trigger workflows. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

### Running Tests

Execute tests with coverage reporting:

```bash
npm run test:unit
```

### Linting and Formatting

Check and fix code formatting and linting:

```bash
npm run formatting
npm run formatting-fix
npm run linting
```

---

## Detailed Source Code Overview

The core logic resides in `src/lib/main.js`, structured into:

- **Plot generation functions**: Modular functions per plot type (`plotQuadratic`, `plotSine`, `plotCosine`, etc.).
- **Formula parsing functions**: Robust parsing functions for quadratic, linear, exponential, and other expressions.
- **Utility and helper functions**: Number formatting (`formatNumber`), range generation, coordinate mapping (`mapToSvgCoordinates`), statistical helpers (area, derivative, average, median, mode).
- **CLI handling**: Interactive input via `readline`, output selection based on file extension or flags.

### Project Structure

- `/src/lib/main.js`: Core logic, parsing, plotting, and transformations.
- `/tests`: Contains unit and integration tests for ensuring correctness and reliability.

---

## Contribution Process

Please contribute by:

1. Opening an issue detailing your enhancement or bug.
2. Labeling the issue as `automated` to trigger our fully automated workflow.

Refer to [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

---

## Technical Limitations and Areas for Improvement

- Currently, expression evaluation (`expr:`) leverages JavaScript's native `Function` constructor, which should be replaced by a safer parser.
- 3D plotting and advanced gradient visualization are areas targeted for future improvements and currently are primarily illustrative.

---

## Changelog Highlights

- **0.3.1-0:**
  - Improved quadratic parsing, statistical analysis, and new smoothing functionality.
  - Consolidated code to reduce duplication and simplify testing.

---

## License

MIT

---

