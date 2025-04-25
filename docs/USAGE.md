# CLI Usage Guide

The `repository0-plot-code-lib` CLI tool enables you to generate plots in SVG or PNG format. It now supports additional parameters for specifying a mathematical expression and a plot range. One of the key flags, `--help`, displays a detailed usage message and then terminates the program.

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
  - When provided, outputs a comprehensive usage message detailing all supported options (`--file`, `--expression`, `--range`, and `--help`) and exits immediately with code 0. This flag is useful for users to quickly understand the CLI capabilities without triggering any further processing.

## Examples

### Display Help Message

  node src/lib/main.js --help

This command outputs a detailed usage guide including all available flags and their descriptions, and then terminates the program.

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
- The `--help` flag supersedes other flags, displaying only the usage information and exiting immediately.