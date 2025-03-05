# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool for generating plots of various mathematical functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. With a focus on advanced analysis, the tool supports multiple output formats such as SVG, JSON, CSV, Markdown, ASCII, and HTML while providing features like plot rotation, advanced query filtering, summary statistics, and geometric computations.

**Mission:**

_Be a go-to plot library with a CLI, be the jq of formulae visualisations._

## Features

- **Multiple Plot Types:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions.
- **Flexible Output Formats:** Generate plots as SVG, JSON, CSV, Markdown, ASCII, and HTML.
- **Interactive Mode:** Engage in real-time input to generate plots interactively.
- **Advanced Analysis:** Get summary statistics, apply rotation to plots, filter data with advanced query predicates, and compute geometric properties (centroid and bounding box).
- **Robust Testing:** Comprehensive unit tests with filesystem mocks and extensive coverage to ensure reliability.

## Getting Started

### Installation

Ensure you have Node.js (>=20) installed. Clone the repository and install dependencies:

```bash
npm install
```

### Usage

Generate an output file by specifying the output filename and formula strings:

```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

For interactive mode:

```bash
node src/lib/main.js --interactive
```

Additional flags include:

- `--json`: Output in JSON format
- `--csv`: Output in CSV format
- `--md`: Output in Markdown format
- `--html`: Output as an HTML file
- `--ascii`: Output as ASCII art
- `--grid`: Enable grid overlay on plots
- `--stats`: Display summary statistics
- `--rotate [angle]`: Rotate the plot by the specified angle (in degrees)

### Testing

Run unit tests using:

```bash
npm test
```

For test coverage:

```bash
npm run test:unit
```

## Documentation

For detailed contribution guidelines and project standards, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## Change Log

- **Documentation Refresh:** Updated README and code comments to align with CONTRIBUTING.md guidelines, streamlining content and removing outdated references.
- **Enhanced Features:** Added advanced query filtering, refined rotation handling, extended summary statistics support, and improved geometric computations.
- **CLI Improvements:** Enhanced interactive mode and error reporting along with robust test coverage.

## License

MIT
