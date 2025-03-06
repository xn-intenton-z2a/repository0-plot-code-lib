# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool for generating plots of various mathematical functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. With advanced analysis features, the tool supports multiple output formats such as SVG, JSON, CSV, Markdown, ASCII, and HTML. New enhancements now include 3D rotating plots, allowing users to visualize 3D data like a helix and rotate it around chosen axes before projection to a planar view.

**Mission:**

_Be a go-to plot library with a CLI, be the jq of formulae visualisations._

## Features

- **Multiple Plot Types:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions.
- **3D Rotating Plots:** Generate 3D plots (e.g., a helix) and apply rotations around the x, y, or z axes with projection onto a 2D plane for visualization.
- **Flexible Output Formats:** Generate plots as SVG, JSON, CSV, Markdown, ASCII, and HTML.
- **Interactive Mode:** Engage in real-time input to generate plots interactively.
- **Advanced Analysis:** Get summary statistics, apply rotation to plots, filter data with advanced query predicates, and compute geometric properties (centroid and bounding box).
- **Web Interface:** Spin up an Express server to serve a web interface for entering and viewing formulas. Access the interface via the `--serve` flag. The web interface provides an easy-to-use form to input formula strings and view the generated plots in real-time.
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

To start the web interface:

```bash
node src/lib/main.js --serve
```

The web interface will be available at [http://localhost:3000](http://localhost:3000).

Additional flags include:

- `--json`: Output in JSON format
- `--csv`: Output in CSV format
- `--md`: Output in Markdown format
- `--html`: Output as an HTML file
- `--ascii`: Output as ASCII art
- `--grid`: Enable grid overlay on plots
- `--stats`: Display summary statistics
- `--rotate [angle]`: Rotate the plot by the specified angle (in degrees). For 3D plots, this rotates the 3D data around the specified axis (default is x-axis; use additional options in code).

## 3D Rotating Plots

A new feature allows you to generate 3D plots such as a helix and rotate them around a chosen axis before projecting them onto a 2D plane. Use the formula prefix `3d:helix` to generate a 3D helix plot. The exported function `plotToSvg3D` demonstrates this functionality.

## Documentation

For detailed contribution guidelines and project standards, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## Change Log

- **Documentation Refresh:** Updated README and code comments to align with CONTRIBUTING.md guidelines, streamlining content and removing outdated references.
- **Enhanced Features:** Added advanced query filtering, refined rotation handling, extended summary statistics support, improved geometric computations, integrated a web interface, and introduced new 3D rotating plots with helix generation and 3D transformation functions.
- **CLI Improvements:** Enhanced interactive mode and error reporting along with robust test coverage.
- **Source File Update:** Updated the header and changelog in the source file to prune drift and remove outdated references per CONTRIBUTING.md guidelines.

## License

MIT
