USAGE.md
# USAGE.md
# Usage Documentation for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a powerful CLI tool that transforms mathematical expressions and specified ranges into visual plots. In line with our mission, "Be a go-to plot library with a CLI, be the jq of formulae visualisations," this tool is designed to deliver fast and accurate plotting capabilities to both new and experienced users.

## Command Line Interface (CLI) Overview

This CLI tool processes a mathematical expression and range parameters to generate plots. Depending on the options provided, the tool can:

- Output a text preview of computed points
- Generate a plot file in SVG or PNG format
- Output the validated parameters in JSON format
- Output computed plot points in CSV format (using the --csv flag)
- Display additional debug information (using the --verbose flag)

### Basic Usage

Run the CLI with the required options:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300] [--json] [--csv] [--verbose]

Note:
- Required parameters: --expression and --range
- Optional parameters:
  - --file (with .svg or .png extensions)
  - --width and --height (custom dimensions for output files)
  - --json (outputs validated parameters as a JSON string)
  - --csv (outputs computed plot points in CSV format with header "x,y")
  - --verbose (displays detailed logs including validated arguments, computed ranges, and full generated points)

**Important:** When using the --verbose flag, additional debug logs will be printed only in text preview mode. If the --file flag is provided, verbose logging is suppressed to avoid interfering with file output.

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

#### 4. Output JSON of Parameters

For integration or debugging, you can output the validated parameters as JSON using the --json flag:

  node src/lib/main.js --expression "y=cos(x)" --range "x=0:10" --json

#### 5. Output CSV Formatted Data

Export the computed plot points in CSV format. This will include a header and comma-separated x and y values (only when no file output is specified):

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --csv

#### 6. Enable Verbose Mode

Display additional internal processing details such as the validated arguments, computed range values, and full list of generated points. Note that verbose logs are only shown in text preview mode and are suppressed when outputting to a file:

  node src/lib/main.js --expression "y=cos(x)" --range "x=0:10" --verbose

#### 7. Custom Dimensions

Customize the plot's resolution using the --width and --height flags. Both parameters must be positive numbers. For example, to set custom dimensions for an SVG file:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg --width 800 --height 600

### Help and Error Guidance

Use the --help or -h flag, or run the CLI without any arguments, to display detailed usage instructions along with an overview of required and optional parameters. For example:

  node src/lib/main.js --help
  node src/lib/main.js

If invalid inputs are provided, the CLI will output error messages that include guidance on the correct usage. Examples include:

- **Missing Parameters:**

  Error: --expression and --range are required arguments.
  Usage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300] [--json] [--csv] [--verbose]

- **Invalid Range Format:**

  Error: invalid range format for part 'invalid-range'. Expected format axis=low:high. Example: x=-10:10
  Usage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300] [--json] [--csv] [--verbose]

- **Unsupported File Extension:**

  Error: --file must have a .svg or .png extension. Example: output.svg or output.png
  Usage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300] [--json] [--csv] [--verbose]

- **Invalid Custom Dimensions:**

  Error: --width and --height must be positive numbers.
  Usage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300] [--json] [--csv] [--verbose]

## CLI Argument Validation & Error Handling

The tool uses robust validation via Zod to ensure:
- Both --expression and --range are provided.
- The expression strictly starts with "y=" and supports only "y=sin(x)" or "y=cos(x)".
- The range follows the format "axis=low:high" (for example, "x=-10:10"), with numeric bounds.
- The --file option (if provided) ends with either .svg or .png.
- Custom dimensions passed via --width and --height are positive numbers.
- The optional --json flag outputs the validated parameters as JSON.
- The --csv flag outputs computed plot points in CSV format (only when no file output is provided).
- The --verbose flag, when provided, logs additional processing details (only in text preview mode).

If any validation fails, an informative error message is displayed along with the usage instructions.

## Contributing

We welcome contributions that enhance the functionality and usability of repository0-plot-code-lib. Please refer to our CONTRIBUTING.md for guidelines on submitting issues and pull requests.

## Summary

repository0-plot-code-lib empowers users to easily generate and customize plots via a simple CLI interface. Whether you're creating visual representations for mathematical functions or building dynamic data visualizations, this tool is designed to deliver an intuitive and robust plotting experience.
