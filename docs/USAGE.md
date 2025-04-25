# CLI Usage Guide

The `repository0-plot-code-lib` CLI tool allows you to generate plots in SVG or PNG format from mathematical expressions and time series data. Below is the list of supported command line options:

## Options

- **--file <output>**
  - Specifies the output file where the plot will be saved.
  - If the filename ends with `.png`, a PNG file is generated; otherwise, an SVG file is created.

- **--expression <expr>**
  - Specifies the mathematical expression to plot. *(Note: This feature is not implemented yet.)*

- **--range <range>**
  - Specifies the range for the plot in the format "x=start:end,y=start:end". *(Note: This feature is not implemented yet.)*

- **--help**
  - Displays this help message detailing all available CLI options and examples, then exits.

## Examples

Generate an SVG file:

  node src/lib/main.js --file output.svg

Generate a PNG file:

  node src/lib/main.js --file plot.png

Display the help message:

  node src/lib/main.js --help

## Note

While the `--expression` and `--range` options are documented, their functionality is planned for future updates. For now, the primary functionality is generating and saving plots in SVG or PNG format.
