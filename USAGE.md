# Usage Documentation for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a powerful CLI tool that transforms mathematical expressions and specified ranges into stunning visual plots. In line with our mission, "Be a go-to plot library with a CLI, be the jq of formulae visualisations," this tool is designed to deliver fast and accurate plotting capabilities to both new and experienced users.

## Command Line Interface (CLI) Overview

This CLI tool processes a mathematical expression and range parameters to generate plots. Depending on the options provided, the tool can either output a text preview of computed points or generate a plot file in SVG or PNG format.

### Basic Usage

Run the CLI with the required options:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]

Note:
- Required parameters: --expression and --range
- Optional parameters: --file (with .svg or .png extensions), --width, and --height

- If the `--file` option is provided with a valid file extension (.svg or .png), the tool generates and saves the corresponding plot.
- If the `--file` option is omitted, a text preview of the computed points is printed to the console.

### Examples

#### 1. Generate an SVG File

Generate a smooth sine wave plot and save it as an SVG file with default dimensions:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg

#### 2. Generate a PNG File

Produce a PNG plot (simulated output) with default dimensions:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-5:5" --file plot.png

#### 3. Display a Text Preview

Output a text preview of computed plot points for a cosine function:

  node src/lib/main.js --expression "y=cos(x)" --range "x=0:10"

#### 4. Custom Dimensions

Customize the plot's resolution using the `--width` and `--height` flags. Both parameters must be positive numbers. For example, to set custom dimensions for an SVG file:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg --width 800 --height 600

For PNG output, the custom dimensions will be reflected in the placeholder text.

#### 5. Help and Error Guidance

Use the `--help` or `-h` flag to display detailed usage instructions along with an overview of required and optional parameters. Additionally, the tool provides descriptive error messages if inputs are missing or invalid. For example:

- **Missing Parameters:**
  
  Error: --expression and --range are required arguments.
  Usage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]

- **Invalid Range Format:**

  Error: invalid range format for part 'invalid-range'. Expected format axis=low:high. Example: x=-10:10

- **Unsupported File Extension:**

  Error: --file must have a .svg or .png extension. Example: output.svg or output.png

- **Invalid Custom Dimensions:**

  Error: --width must be a positive number.

These enhancements aim to provide immediate, actionable feedback to help correct input mistakes.

## CLI Argument Validation & Error Handling

The tool uses robust validation via Zod to ensure:
- Both `--expression` and `--range` are provided.
- The expression strictly starts with `y=` and supports only `y=sin(x)` or `y=cos(x)`.
- The range follows the format `axis=low:high` (for example, `x=-10:10`), with numeric bounds.
- The `--file` option (if provided) ends with either `.svg` or `.png`.
- Custom dimensions passed via `--width` and `--height` are positive numbers.

If any validation fails, an informative error message is displayed along with a usage hint to guide you towards the correct input format.

## Contributing

We welcome contributions that enhance the functionality and usability of repository0-plot-code-lib. Please refer to our CONTRIBUTING.md for guidelines on submitting issues and pull requests.

## Summary

repository0-plot-code-lib empowers users to easily generate and customize plots via a simple CLI interface. Whether you're creating visual representations for mathematical functions or building dynamic data visualizations, this tool is designed to deliver an intuitive and robust plotting experience.
