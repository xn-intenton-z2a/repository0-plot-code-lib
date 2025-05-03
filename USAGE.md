# Usage Documentation for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a powerful CLI tool that transforms mathematical expressions and specified ranges into stunning visual plots. In line with our mission, "Be a go-to plot library with a CLI, be the jq of formulae visualisations," this tool is designed to deliver fast and accurate plotting capabilities to both new and experienced users.

## Command Line Interface (CLI) Overview

This CLI tool processes a mathematical expression and range parameters to generate plots. Depending on the options provided, the tool can either output a text preview of computed points or generate a plot file in SVG or PNG format.

### Basic Usage

Run the CLI with the required options:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]

- If the `--file` option is provided with a valid file extension (.svg or .png), the tool generates and saves the corresponding plot.
- If the `--file` option is omitted, a text preview of the computed points is printed to the console.

## Examples

### 1. Generate an SVG File

Generate a smooth sine wave plot and save it as an SVG file with default dimensions:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg

### 2. Generate a PNG File

Produce a PNG plot (simulated output) with default dimensions:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-5:5" --file plot.png

### 3. Display a Text Preview

Output a text preview of computed plot points for a cosine function:

  node src/lib/main.js --expression "y=cos(x)" --range "x=0:10"

## Custom Dimensions

Customize the plot's resolution using the `--width` and `--height` flags. Both parameters must be positive numbers. For example, to set a custom SVG size:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg --width 800 --height 600

For PNG output, the custom dimensions will be reflected in the placeholder text.

## CLI Argument Validation & Error Handling

The tool uses robust validation via Zod to ensure:
- Both `--expression` and `--range` are provided. 
- The expression strictly starts with `y=` and supports only `y=sin(x)` or `y=cos(x)`.
- The range follows the format `axis=low:high` (for example, `x=-10:10`), with numeric bounds.
- The `--file` option (if provided) ends with either `.svg` or `.png`.
- Custom dimensions passed via `--width` and `--height` are positive numbers.

If any validation fails, an informative error message is displayed.

## Contributing

We welcome contributions that enhance the functionality and usability of repository0-plot-code-lib. Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

## Summary

repository0-plot-code-lib empowers users to easily generate and customize plots via a simple CLI interface. Whether you're creating visual representations for mathematical functions or building dynamic data visualizations, this tool is designed to deliver an intuitive and robust plotting experience.
