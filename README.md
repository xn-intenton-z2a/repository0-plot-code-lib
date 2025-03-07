# Equation Plotter CLI

## Overview

Equation Plotter CLI is a versatile command-line tool for generating accurate plots of various mathematical functions. It supports quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic plots along with advanced features such as 3D rotating plots, query filtering, average point computation, area under the curve approximation using the trapezoidal rule, derivative calculation, and point reflection.

## Features

- **Variety of Plots:** Quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic.
- **3D Rotating Plots:** Generate interactive 3D plots (e.g., a helix) with rotation support.
- **Expression-Based Formulas:** Use text-based formula expressions with prefix `expr:` (e.g., `expr:2*x+3:-10,10,1`).
- **Advanced Analysis:** Provides summary statistics, average plot values, area under curve calculations, derivative computation using finite differences, and plot reflection.
- **Multiple Output Formats:** Export plots in SVG, JSON, CSV, Markdown, ASCII, and HTML.
- **Interactive & Web Interfaces:** Offers an interactive CLI mode and an Express-based web interface.

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
- `--stats`: Display summary statistics, average calculations, area, and derivative computations
- `--rotate [angle]`: Rotate plots by specified angle (in degrees)
- `--help` or `-h`: Show the help message
- `--version`: Display version information

## New Features

- **computeDerivative:** Calculates the derivative of plot points using a finite difference method.
- **plotReflection:** Reflects plot points horizontally to facilitate mirror-image analysis.

## 3D Rotating Plots

Generate a 3D helix plot using the prefix `3d:helix` (rotation supported via `--rotate` flag). See the `plotToSvg3D` function for details.

## Testing

The project includes a comprehensive suite of tests using Vitest. Run the tests with:

```bash
npm test
```

## Change Log

- **Documentation Updated:** README and inline documentation refreshed to align with CONTRIBUTING.md and project mission.
- **Feature Enhancements:** Added new helper functions `computeDerivative` and `plotReflection` to extend analytical capabilities.
- **CLI/Web Interface Improvements:** Enhanced error handling and interactive mode functionality.
- **Testing:** Extensive unit tests now cover new features and ensure robust functionality.

## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute. Your contributions help in improving the tool and aligning it with the project mission.

## License

MIT
