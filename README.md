# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool that generates accurate plots of mathematical functions in various formats, including SVG, JSON, CSV, Markdown, ASCII, and HTML. It also provides analytical features such as computing the area under curves, derivatives, and point reflections, alongside advanced 3D rotating plots.

## Features

- **Variety of Plots:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions.
- **Multiple Output Formats:** Export plots as SVG, JSON, CSV, Markdown, ASCII, and HTML.
- **Advanced Analysis:** Compute summary statistics, average plot values, area under the curve (trapezoidal rule), derivative (finite differences), and horizontal reflection.
- **Extended Transformations:** New helper functions `scalePlot` and `invertPlot` allow for additional plot manipulations.
- **Enhanced Quadratic Parsing:** Improved helper functions `extractQuadraticCoefficients` and `invertExpression` provide robust parsing and inversion of quadratic expressions.
- **3D Rotating Plots:** Generate and rotate 3D plots (e.g., helix) to visualize in a two-dimensional format.
- **Interactive CLI and Web Interface:** Use an interactive mode or start an Express-based web interface for quick plotting.

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

- `--json`: Output in JSON format
- `--csv`: Output in CSV format
- `--md`: Output in Markdown format
- `--html`: Output as an HTML file
- `--ascii`: Output as ASCII art
- `--grid`: Overlay grid lines on SVG plots
- `--stats`: Display summary statistics and analysis results
- `--rotate [angle]`: Rotate plot output by specified angle (in degrees)
- `--help` or `-h`: Show the help message
- `--version`: Display version information

## Extended Transformations

New helper functions have been added:

- **scalePlot:** Scales the coordinates of plot points by specified factors.
- **invertPlot:** Vertically inverts the plot points, useful for creating mirror effects.

## Enhanced Quadratic Parsing

To improve the parsing of quadratic formulas, the helper functions `extractQuadraticCoefficients` and `invertExpression` have been upgraded. These functions now provide robust parsing and correct inversion of expressions in line with the mission statement.

## 3D Rotating Plots

Generate a 3D helix plot using the prefix `3d:helix` (rotation can be applied via the `--rotate` flag). See the `plotToSvg3D` function for details.

## Testing

Run the comprehensive suite of tests using Vitest:

```bash
npm test
```

## Change Log

- **Documentation Updated:** README refreshed to detail new helper functions and parsing improvements.
- **Feature Enhancements:** Extended features for area computation, derivative analysis, horizontal reflection, additional scaling, and vertical inversion.
- **Quadratic Parsing Improvement:** Upgraded `extractQuadraticCoefficients` and implemented a robust `invertExpression` to correctly invert expressions.
- **Test Coverage:** Expanded test suite to cover new and existing functions with near 100% coverage.
- **Interface Improvements:** Improved CLI and web interface with enhanced error handling and interactive capabilities.

## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute. Your contributions help improve the tool and ensure its alignment with our mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## License

MIT
