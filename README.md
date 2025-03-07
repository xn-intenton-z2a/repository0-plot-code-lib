# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool for generating plots of mathematical functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. The tool features enhanced analysis such as 3D rotating plots, advanced query filtering, and average point computations to provide in-depth visualizations.

## Features

- **Multiple Plot Types:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions.
- **3D Rotating Plots:** Generate 3D plots (e.g., a helix) that can be rotated around the x, y, or z axes and projected onto a 2D plane.
- **Flexible Output Formats:** Export plots in SVG, JSON, CSV, Markdown, ASCII, and HTML formats.
- **Interactive Mode:** Real-time plotting via the command-line.
- **Advanced Analysis:** Summary statistics, average point calculations, rotation support, and advanced query filtering.
- **Web Interface:** An Express-based web interface for real-time plotting and visualization.

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
- `--stats`: Display summary statistics and average values
- `--rotate [angle]`: Rotate plots by the specified angle (in degrees)

## 3D Rotating Plots

Use the prefix `3d:helix` to generate a 3D helix plot with rotation support. The `plotToSvg3D` function demonstrates rotating the 3D model before projecting it to 2D.

## Change Log

- **Documentation Refresh:** Updated README and source documentation to align with CONTRIBUTING.md guidelines and pruned outdated references.
- **Enhanced Features:** Added advanced query filtering, improved rotation handling, enriched summary statistics, integrated 3D rotating plots, and introduced the `getPlotAverage` helper.
- **CLI & Web Interface Improvements:** Enhanced interactive mode and refined error reporting, with an Express-based web interface for visualization.
- **Test Coverage and Reliability:** Expanded unit tests and robust error handling for improved reliability.

## Documentation & Contributing

For detailed contribution guidelines, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
