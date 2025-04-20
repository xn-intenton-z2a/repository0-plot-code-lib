# Usage

This CLI tool can now generate a dummy SVG plot based on a mathematical expression and a range provided via command-line options.

## CLI Options

- --expression: A mathematical expression (e.g., "y=sin(x)").
- --range: A range descriptor (e.g., "x=-1:1,y=-1:1").
- --file: The output file path (e.g., "output.svg").

When all three options are provided, the tool generates an SVG file containing dummy content with the specified expression and range.

### Example

Run the following command to generate a plot:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg

This will create an `output.svg` file with the content:

  <svg><text x='10' y='20'>Expression: y=sin(x)</text><text x='10' y='40'>Range: x=-1:1,y=-1:1</text></svg>
