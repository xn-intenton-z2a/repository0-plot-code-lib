# CLI Usage Guide

The `repository0-plot-code-lib` CLI tool enables you to generate plots in SVG or PNG format. It now supports additional parameters for specifying a mathematical expression and a plot range.

## Options

- **--file <output>**
  - Specifies the output file where the plot will be saved. 
  - If the filename ends with `.png`, a PNG file is generated; otherwise, an SVG file is created.

- **--expression <expr>**
  - Specifies the mathematical expression to plot.
  - The provided value must be a non-empty string. An empty string will trigger an error.

- **--range <range>**
  - Specifies the range for the plot in the format `x=start:end,y=start:end`.
  - The value must exactly follow the required format; otherwise, an error is displayed and the process exits.

- **--help**
  - Displays a comprehensive usage message outlining all supported options and examples, then exits gracefully.

## Examples

### Display Help Message

  node src/lib/main.js --help

This command outputs a detailed usage guide including all available flags and their descriptions.

### Generate an SVG File

  node src/lib/main.js --file output.svg

Generates an SVG file with a static plot.

### Generate a PNG File

  node src/lib/main.js --file plot.png

Generates a PNG file by converting the SVG output.

### Generate an SVG with Expression and Range

  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg

This command embeds the specified mathematical expression and plot range into the generated SVG, providing contextual information directly in the graphic.

## Notes

- When using the `--expression` and `--range` flags, the resulting SVG will include text elements displaying the provided values.
- If these flags are omitted, the tool defaults to generating a static SVG/PNG plot without additional textual annotations.

Ensure that you provide valid inputs to avoid errors. Running the CLI tool with the `--help` flag will prevent further processing beyond the usage display.