# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool for generating plots of mathematical functions such as quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. The tool now includes enhanced analysis features like 3D rotating plots and advanced query filtering, aligning with our mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Features

- **Multiple Plot Types:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions.
- **3D Rotating Plots:** Generate 3D plots (e.g., a helix) that can be rotated around the x, y, or z axes and projected onto a 2D plane for visualization.
- **Flexible Output Formats:** Export plots in SVG, JSON, CSV, Markdown, ASCII, and HTML formats.
- **Interactive Mode:** Real-time plotting through the command-line interface.
- **Advanced Analysis:** Summary statistics, rotation support, and advanced query filtering to analyze plot data.
- **Web Interface:** An Express-based web interface for entering formulas and viewing plots in real-time.

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
- `--rotate [angle]`: Rotate the plot by the specified angle (in degrees)

## 3D Rotating Plots

Use the formula prefix `3d:helix` to generate a 3D helix plot. The function `plotToSvg3D` demonstrates rotating the 3D model around a specified axis before projection onto 2D.

## Documentation & Contributing

For detailed contribution guidelines, please refer to [CONTRIBUTING.md](CONTRIBUTING.md). Contributions that enhance documentation, clean up legacy code, or increase feature robustness are highly appreciated.

## Change Log

- **Documentation Refresh:** Updated README to align with CONTRIBUTING.md guidelines and pruned outdated references.
- **Enhanced Features:** Added advanced query filtering, improved rotation handling, enriched summary statistics, and integrated 3D rotating plots.
- **CLI Improvements:** Enhanced interactive mode and refined error reporting.
- **Test Coverage:** Expanded unit tests for robust reliability.

## License

MIT
