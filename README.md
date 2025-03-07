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
- **High Test Coverage:** Nearly 100% test coverage using mocked file-system and network calls to ensure reliability.

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

To improve the parsing of quadratic formulas, the helper functions `extractQuadraticCoefficients` and `invertExpression` have been upgraded. These functions now provide robust parsing and correct inversion of expressions, neatly aligning the implementation with the project mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## 3D Rotating Plots

Generate a 3D helix plot using the prefix `3d:helix` (rotation can be applied via the `--rotate` flag). See the `plotToSvg3D` function for details.

## Testing

A comprehensive suite of tests has been built using Vitest. Tests utilize mocks for file-system and network interactions to achieve near 100% coverage. To run tests:

```bash
npm test
```

## Change Log

- **Documentation Updated:** README refreshed to detail new helper functions, improved quadratic parsing, and extended output options.
- **Feature Enhancements:** Added area computation, derivative analysis, horizontal reflection, scaling, and vertical inversion in plots.
- **Source Drift Pruned:** Removed deprecated code and redundant segments; ensured the code aligns with our mission statement and contributing guidelines.
- **Test Coverage Improved:** Added extensive tests to cover edge cases and external resource errors, achieving over 99% coverage.
- **Interface Improvements:** Enhanced CLI and web interface with improved error handling and interactive capabilities.

## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute. Your contributions help improve the tool and ensure its alignment with our mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## License

MIT
