# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool designed for generating accurate plots of various mathematical functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. It features robust analysis capabilities such as 3D rotating plots, advanced query filtering, average point computations, and now area calculation under curves to facilitate comprehensive data visualization.

## Features

- **Multiple Plot Types:** Supports a wide range of functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic.
- **3D Rotating Plots:** Generate interactive 3D plots (e.g., a helix) with rotation support and projection to 2D.
- **Expression-Based Formulas:** Now supports text-based expression formulas using the prefix `expr:`. For example: `expr:2*x+3:-10,10,1` to plot y = 2*x+3 over the range -10 to 10.
- **Diverse Output Formats:** Export plots in SVG, JSON, CSV, Markdown, ASCII, and HTML formats.
- **Interactive & Web Interfaces:** Real-time plotting with an interactive CLI mode and an Express-based web interface.
- **Advanced Analysis:** Access summary statistics, average point computations, and now area under the curve approximations using a trapezoidal rule, along with flexible query filtering options.

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
- `--stats`: Display summary statistics, average values, and area under curves
- `--rotate [angle]`: Rotate plots by the specified angle (in degrees)
- `--help` or `-h`: Show the help message
- `--version`: Display version information

## 3D Rotating Plots

Use the prefix `3d:helix` to generate a 3D helix plot with rotation capabilities (see the `plotToSvg3D` function).

## Change Log

- **Documentation Update:** Refreshed the README to align with CONTRIBUTING guidelines and pruned outdated references.
- **Enhanced Features:**
  - Introduced advanced query filtering and refined rotation handling.
  - Added comprehensive summary statistics and averaged plot value computations.
  - Integrated a new `computeArea` function to calculate the area under curves using the trapezoidal rule.
  - Extended 3D rotating plots with enhanced helix generation.
  - Added support for expression-based formulas with the `expr:` prefix.
  - Improved CLI and web interface error handling and interactive mode functionality.

## Contributing

For detailed guidelines on how to contribute, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
