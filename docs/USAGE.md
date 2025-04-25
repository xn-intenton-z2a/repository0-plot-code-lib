# CLI Usage Guide

The `repository0-plot-code-lib` CLI tool enables you to generate plots in SVG or PNG format. It now supports additional parameters for specifying a mathematical expression, plot range, and custom styling options.

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

- **--color <color>**
  - Specifies the background color for the plot's rectangle element.
  - If omitted, it defaults to `lightblue`.

- **--dimensions <width:height>**
  - Specifies the dimensions of the generated plot.
  - The format must be `width:height`, where both width and height are positive numbers.
  - On invalid format (e.g., missing colon or non-numeric values), an error message is displayed and the process exits.

- **--help**
  - When provided, outputs a comprehensive usage message detailing all supported options and exits immediately with code 0.

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

This command embeds the specified mathematical expression and plot range into the generated SVG.

### Generate an SVG with Custom Color and Dimensions

  node src/lib/main.js --file output.svg --color "coral" --dimensions "400:300"

This command sets the background color of the plot’s rectangle to "coral" and the dimensions of the plot to 400 (width) and 300 (height).