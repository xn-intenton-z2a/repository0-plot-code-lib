# Usage

This CLI tool can generate plots in SVG format and also process time series data from a mathematical expression.

## CSV Time Series Data Generation

When using the CSV option, the CLI transforms the provided mathematical expression and range into time series data and serializes it in CSV format.

### CLI Options

- --expression: A mathematical expression (currently supported: "y=sin(x)").
- --range: A range descriptor in the format "x=start:end" (for example, "x=0:6.28").
- --file: The output file path. If the file path ends with ".csv", the tool outputs CSV content to stdout instead of writing to a file.

### Examples

#### SVG Output

Run the following command to generate a dummy SVG file:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg

This will create an SVG file with the content:

  <svg><text x='10' y='20'>Expression: y=sin(x)</text><text x='10' y='40'>Range: x=-1:1</text></svg>

#### CSV Output

Run the following command to generate CSV output to stdout:

  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv

The CSV output will have a header and data rows similar to:

  x,y
  0,0
  0.698,0.6428
  ... (at least 10 data points)
