# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

repository0-plot-code-lib is a CLI tool that generates plots from mathematical expressions. The tool supports producing plots in both SVG and PNG formats. It converts simple mathematical expressions into graphical representations, making it easy to visualize formulas.

## Usage

This library is intended to be used from the command line. For detailed usage examples and instructions, please refer to the [Usage Guide](docs/USAGE.md).

### Basic SVG Plot

To generate an SVG plot:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-3:3"

To write the output to a file:

  node src/lib/main.js --expression "y=sin(x)" --file output.svg

### PNG Plot Generation

Ensure that the dependency "sharp" is installed. To generate a PNG plot:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

_Note:_ The `--expression` flag is mandatory. When generating PNG output, the `--file` flag is required.

## Error Handling

- If `--expression` is missing, the CLI returns an error: "Error: --expression flag is required."
- If an unsupported output format is specified, a relevant error message is displayed.

## License

MIT
