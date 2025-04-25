# CLI Usage Guide

The `repository0-plot-code-lib` CLI tool allows you to generate plots in SVG or PNG format from mathematical expressions and time series data. Below is a list of supported command line options and details on input validation.

## Options

- **--file <output>**
  - Specifies the output file where the plot will be saved.
  - If the filename ends with `.png`, a PNG file is generated; otherwise, an SVG file is created.

- **--expression <expr>**
  - Specifies the mathematical expression to plot.
  - The value must be a non-empty string. An empty string will result in an error.

- **--range <range>**
  - Specifies the range for the plot in the format `x=start:end,y=start:end`.
  - The value must conform exactly to the expected format. An incorrect format will display an error message and exit.

- **--help**
  - Displays a detailed usage message outlining all supported options and examples, and then exits gracefully.

## Examples

### Display Help Message

  node src/lib/main.js --help

This will output a comprehensive usage guide including all flags and their descriptions.

### Generate an SVG file

  node src/lib/main.js --file output.svg

### Generate a PNG file

  node src/lib/main.js --file plot.png

### Generate an SVG file with a mathematical expression and range

  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg

## Note

Ensure that you provide valid inputs to avoid errors. When using the `--help` flag, no further processing is performed after displaying the usage information.