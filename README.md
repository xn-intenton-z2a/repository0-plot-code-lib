# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## CLI Usage

This CLI tool allows you to generate a plot from a mathematical expression and a range of values. It requires three mandatory arguments:

- --expression: The mathematical expression to plot. Example: "y=sin(x)".
- --range: The range of values for the plot. Use the format with axis assignments (e.g., "x=-1:1,y=-1:1").
- --file: The output file path where the plot will be written. The file must have a .svg or .png extension.

Additionally, a new flag has been added:

- --json: If provided, the CLI will output a JSON representation of the plot generation process to stdout instead of writing the output to a file. The JSON object will include the following keys:
  - message: A success message (e.g., "Plot generated")
  - expression: The provided mathematical expression
  - range: The provided range
  - file: The intended output file name
  - timeSeriesData: The computed time series data as an array of objects

When run without any arguments, the CLI displays a usage message. For example:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

### Examples

Generate an SVG plot with embedded time series data (file output):

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

Generate a PNG plot with embedded time series data (file output):

```bash
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=-2:2" --file output.png
```

Obtain a JSON representation of the plot generation process (no file output):

```bash
node src/lib/main.js --expression "y=tan(x)" --range "x=1:10,y=-1:1" --file output.svg --json
```

The JSON output will look similar to:

```json
{
  "message": "Plot generated",
  "expression": "y=tan(x)",
  "range": "x=1:10,y=-1:1",
  "file": "output.svg",
  "timeSeriesData": [
    { "x": 1, "y": <value> },
    ...
  ]
}
```

If any of the parameters are invalid (for example, an empty expression, an improperly formatted range, or an unsupported file extension),
the tool will output an error message indicating the issue and terminate without creating a file.

---

## License

MIT
