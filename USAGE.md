# Usage Documentation for repository0-plot-code-lib

## Mission

Inspired by our mission to be the go-to plot library for formula visualisations, repository0-plot-code-lib transforms mathematical expressions and range parameters into stunning visual plots. Our goal is to empower users to quickly generate and customize plots using a simple CLI interface.

## Command Line Interface (CLI) Overview

This CLI tool processes a mathematical expression along with a specified range, generating either an SVG or PNG plot. If no file is provided, a text preview of computed points is displayed on the console.

## How to Use

### Basic Usage

Run the CLI with the required parameters:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]

### Dual Output Modes

- **File Output:** When the `--file` option is provided with a valid file name ending in `.svg` or `.png`, the CLI will generate and save the plot.
- **Text Preview:** If the `--file` parameter is omitted, the CLI outputs a text preview (list of computed points) to the console.

#### Examples

- **Generate an SVG file:**

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg

- **Generate a PNG file (simulated output):**

  node src/lib/main.js --expression "y=sin(x)" --range "x=-5:5" --file plot.png

- **Display a text preview:**

  node src/lib/main.js --expression "y=cos(x)" --range "x=0:10"

### Custom Resolution Options

Customize the dimensions of your output by providing the `--width` and `--height` options:

- `--width`: Specifies the width of the plot output. Must be a positive number (default: 500).
- `--height`: Specifies the height of the plot output. Must be a positive number (default: 300).

#### Example with Custom Dimensions

- **SVG with custom dimensions:**

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg --width 800 --height 600

- **PNG with custom dimensions (simulated):**

  node src/lib/main.js --expression "y=sin(x)" --range "x=-5:5" --file plot.png --width 1024 --height 768

## CLI Argument Validation

The tool leverages robust validation via Zod, ensuring:

- Both `--expression` and `--range` are provided.
- The `--expression` starts with `y=` and supports only `y=sin(x)` or `y=cos(x)`.
- The `--range` follows the format `axis=low:high` (e.g., `x=-10:10`), with numeric bounds.
- The `--file` (if provided) ends with `.svg` or `.png`.
- The `--width` and `--height` parameters (if provided) are positive numbers.

If any validations fail, a descriptive error message is displayed.

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit pull requests, report issues, and contribute to the project.

## Summary

This CLI tool is designed to be simple yet powerful, offering both file-based plot generation and console-based previews. Its flexible design and strong argument validation help ensure a smooth user experience.
