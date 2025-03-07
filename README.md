# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool designed for generating accurate plots of various mathematical functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. It offers advanced analysis capabilities such as 3D rotating plots, query filtering, average point computations, and area under curve approximations using the trapezoidal rule, with flexible output formats including SVG, JSON, CSV, Markdown, ASCII, and HTML.

## Features

- **Multiple Plot Types:** Supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic plots.
- **3D Rotating Plots:** Generate interactive 3D plots (e.g., a helix) with rotation support and 2D projection.
- **Expression-Based Formulas:** Supports text-based expression formulas using the prefix `expr:`. Example: `expr:2*x+3:-10,10,1`.
- **Diverse Output Formats:** Export plots in SVG, JSON, CSV, Markdown, ASCII, and HTML formats.
- **Interactive & Web Interfaces:** Real-time plotting with an interactive CLI mode and an Express-based web interface.
- **Advanced Analysis:** Summary statistics, average plot values, and area under the curve approximations.
- **Extensive Testing:** Comprehensive unit tests with external resource mocking ensure robust functionality.

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

## Testing

The project includes a comprehensive suite of tests using Vitest. Run the tests with:

```bash
npm test
```

## Change Log

- **Documentation & README:** Refreshed to align with CONTRIBUTING.md guidelines; pruned irrelevant content.
- **Enhanced Features:** Improved query filtering, rotation handling, summary statistics, and 3D helix plot generation.
- **Improved CLI/Web Interface:** Enhanced error handling and interactive mode functionality.
- **Testing:** Extensive unit tests now cover nearly 100% of the codebase.

## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute.

## License

MIT
