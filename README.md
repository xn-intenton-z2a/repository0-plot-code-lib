# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool to generate accurate plots of mathematical functions. It supports a variety of plot types—including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic—and provides multiple output formats (SVG, JSON, CSV, Markdown, ASCII, and HTML) along with analytical utilities like area computation, derivative analysis, scaling, and inversion of plots.

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Features

- **Diverse Plots:** Quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic plots.
- **Multiple Output Formats:** Export plots in SVG, JSON, CSV, Markdown, ASCII, or HTML.
- **Advanced Analysis:** Compute summary statistics, average values, area (via trapezoidal rule), derivatives (finite differences), horizontal reflection, scaling, and vertical inversion.
- **Enhanced Quadratic Parsing:** Robust parsing of quadratic formulas using updated helper functions.
- **3D Rotating Plots:** Generate and rotate 3D helix plots, projected onto 2D.
- **Interactive CLI and Web Interface:** Run in interactive mode or launch an Express-based web interface.
- **High Test Coverage:** Extensive tests ensure reliability and robustness.

## Getting Started

### Installation

Ensure you have Node.js (>=20) installed. Clone the repository and install dependencies:

```bash
npm install
```

### Usage

Generate an output file by specifying the filename and formula strings:

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

## Extended Transformations

New helper functions `scalePlot` and `invertPlot` allow you to transform plot data by scaling or vertically inverting point coordinates.

## Enhanced Quadratic Parsing

The functions `extractQuadraticCoefficients` and `invertExpression` have been improved for robust parsing and inversion of quadratic expressions, aligning with our mission statement.

## 3D Rotating Plots

Use the prefix `3d:helix` (with optional `--rotate` flag) to generate a 3D helix plot that can be rotated and projected onto a 2D plane.

## Testing

A comprehensive suite of tests is provided using Vitest. To run:

```bash
npm test
```

## Change Log

- **Documentation Updated:** README refreshed per CONTRIBUTING guidelines.
- **Enhanced Parsing:** Improved quadratic parsing and inversion functions.
- **New Features:** Added scaling and inversion helpers, area computation, derivative analysis, and 3D helix plots.
- **Interface Improvements:** Enhanced CLI and web interface with improved interactive functionality.

## Contributing

For contribution guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md). Your input helps keep the project aligned with the mission: "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## License

MIT
