# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool for generating plots of various mathematical functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. It supports multiple output formats such as SVG, JSON, CSV, Markdown, ASCII, and HTML.

**Mission:**

Be a go-to plot library with a CLI, be the jq of formulae visualisations.

## Features

- **Multiple Plot Types:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions.
- **Flexible Output Formats:** Generate plots as SVG, JSON, CSV, Markdown, ASCII, and HTML.
- **Interactive Mode:** Real-time input for generating plots in an interactive session.
- **Advanced Analysis:** Includes summary statistics, plot rotation, advanced query filtering, and geometric computations (centroid and bounding box calculations).
- **Enhanced Test Coverage:** Robust unit tests with filesystem mocks and comprehensive coverage to ensure reliability.

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

Use additional flags such as `--json`, `--csv`, `--md`, `--html`, `--ascii`, `--grid`, `--stats`, and `--rotate [angle]` to customize output.

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

Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines and project standards.

## Change Log

- **Mission Alignment:** Updated mission statement and pruned outdated references.
- **Enhanced Features:** Added advanced query filtering, extended rotation handling, and robust summary statistics support.
- **Geometric Computations:** Improved functions for computing centroids and bounding boxes.
- **CLI Improvements:** Refined interactive mode and error reporting for file writing.
- **Testing Enhancements:** Improved test coverage with additional unit tests and filesystem error mocks.
- **Documentation Refresh:** Updated README to accurately reflect all new features and contribution guidelines.

## License

MIT
