# CLI Usage Guide

The `repository0-plot-code-lib` CLI tool allows you to generate plots in SVG or PNG format from mathematical expressions and time series data. Below is a list of supported command line options and details on input validation.

## Options

- **--file <output>**
  - Specifies the output file where the plot will be saved.
  - If the filename ends with `.png`, a PNG file is generated; otherwise, an SVG file is created.

- **--expression <expr>**
  - Specifies the mathematical expression to plot.
  - Input Validation: When provided, the value must be a non-empty string. Providing an empty value will result in an error message and termination.

- **--range <range>**
  - Specifies the range for the plot in the format "x=start:end,y=start:end".
  - Input Validation: The flag requires a non-empty value that exactly matches the format. For example, a valid range is "x=-1:1,y=-1:1". If the format is incorrect or the value is empty, an error message is displayed and the tool exits.

- **--help**
  - Displays this help message detailing all available CLI options and examples, then exits.

## Examples

### Correct Usage

Generate an SVG file:

  node src/lib/main.js --file output.svg

Generate a PNG file:

  node src/lib/main.js --file plot.png

Generate an SVG file with a mathematical expression and a specified range:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg

### Incorrect Usage Examples

Providing an empty expression:

  node src/lib/main.js --expression "" --file output.svg

Expected error: "Error: --expression requires a non-empty value."

Providing an improperly formatted range:

  node src/lib/main.js --range "bad_format" --file output.svg

Expected error: "Error: --range flag invalid format. Expected format: \"x=start:end,y=start:end\"."

## Note

The CLI tool now incorporates enhanced input validation for the --expression and --range flags. Ensure that you supply correct and non-empty values as specified above to avoid errors.