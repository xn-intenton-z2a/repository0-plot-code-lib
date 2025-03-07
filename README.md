# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool designed to generate accurate plots of mathematical functions. It supports multiple plot types—including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic—and offers various output formats such as SVG, JSON, CSV, Markdown, ASCII, and HTML. Advanced analysis features like area computation, derivative analysis, scaling, inversion, smoothing, and statistical analysis further empower users to interpret and transform plot data.

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Features

- **Diverse Plots:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions.
- **Multiple Output Formats:** Export plots in SVG, JSON, CSV, Markdown, ASCII, or HTML formats.
- **Advanced Analysis:** Compute summary statistics, averages, area (via trapezoidal rule), derivatives (finite differences), reflection, scaling, inversion, smoothing (moving average), and standard deviation.
- **Enhanced Quadratic Parsing:** Robust quadratic formula parsing with improved helper functions.
- **3D Rotating Plots:** Generate and rotate 3D helix plots with 2D projection capabilities.
- **Interactive CLI and Web Interface:** Use the interactive command-line mode or launch an Express-based web interface.
- **Clean Code and Testing:** Refined code structure with comprehensive test coverage.

## Getting Started

### Installation

Ensure you have Node.js (>=20) installed. Clone the repository and install dependencies:

```bash
npm install
```

### Usage

Generate a plot by specifying the output filename and formula string:

```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

For expression-based plotting:

```bash
node src/lib/main.js output.svg "expr:2*x+3:-10,10,1"
```

For interactive mode:

```bash
node src/lib/main.js --interactive
```

To start the web interface:

```bash
node src/lib/main.js --serve
```

Additional flags include:

- `--json` for JSON output
- `--csv` for CSV output
- `--md` for Markdown output
- `--html` for HTML output
- `--ascii` for ASCII art
- `--grid` to overlay grid lines on SVG plots
- `--stats` to display summary statistics
- `--rotate [angle]` to rotate the plot by a given angle (in degrees)
- `--help` or `-h` for help
- `--version` for version information

## Extended Transformations and Analysis

New helper functions:

- **smoothPlot:** Applies moving average smoothing to plot data.
- **computeStandardDeviation:** Calculates the standard deviation of y-values in the plot points.

These functions extend the analysis capabilities and provide additional insights into the plotted data.

## Enhanced Quadratic Parsing

The functions `extractQuadraticCoefficients` and `invertExpression` have been updated for robust parsing and inversion of quadratic expressions.

## 3D Rotating Plots

Use the prefix `3d:helix` (optionally with the `--rotate` flag) to generate a 3D helix plot that is rotated and projected onto a 2D plane.

## Testing

A comprehensive suite of tests is available using Vitest. Run the tests with:

```bash
npm test
```

## Change Log

- **Documentation Updated:** README refreshed in accordance with CONTRIBUTING.md guidelines.
- **Enhanced Parsing:** Improved quadratic parsing and inversion functions.
- **New Features:** Added `scalePlot`, `invertPlot`, `smoothPlot`, and `computeStandardDeviation` for advanced plot analysis.
- **Interface Improvements:** Enhanced CLI and web interface with updated interactive functionality.

## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute. Your input is valuable to keeping this project aligned with its mission.

## License

MIT
