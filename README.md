# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## CLI Usage

This CLI tool allows you to generate a plot from a mathematical expression and a range of values. It requires three mandatory arguments:

- --expression: The mathematical expression to plot. Example: "y=sin(x)".
- --range: The range of values for the plot. Use the format with axis assignments (e.g., "x=-1:1,y=-1:1").
- --file: The output file path where the plot will be written. The file must have a .svg or .png extension.

Additionally, the following flags can be provided:

- --json: If provided, the CLI will output a JSON representation of the plot generation process to stdout instead of writing the output to a file. The JSON object will include the following keys:
  - message: A success message (e.g., "Plot generated")
  - expression: The provided mathematical expression
  - range: The provided range
  - file: The intended output file name
  - timeSeriesData: The computed time series data as an array of objects

- --csv: If provided, the CLI will output the generated time series data in CSV format to stdout, bypassing any file writing. The CSV output includes a header line "x,y" followed by one line per data point with x and y values separated by a comma.

**Note:** If both --csv and --json flags are provided, the CSV output takes precedence.

### New Behavior for SVG Outputs

For SVG outputs, the tool now computes the time series data by sampling the provided mathematical expression over the x-range (using 100 sample points) and maps these values to the SVG coordinate space (with a default viewBox of 200 x 100). The resulting points are rendered as a polyline element with styling attributes (stroke, stroke-width, and no fill) embedded in the SVG output, in addition to the existing text element.

### Examples

Generate an SVG plot with embedded time series data (file output):

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

The resulting SVG will include both a text element and a polyline element, for example:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
<text x="10" y="20">Plot generated for expression: y=sin(x) with range: x=-1:1,y=-1:1</text>
<polyline  points="..." stroke="blue" stroke-width="2" fill="none" />
</svg>
```

Generate a PNG plot with embedded time series data (file output):

```bash
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=-2:2" --file output.png
```

Obtain a JSON representation of the plot generation process (no file output):

```bash
node src/lib/main.js --expression "y=tan(x)" --range "x=1:10,y=-1:1" --file output.svg --json
```

Obtain a CSV output of the time series data (no file output):

```bash
node src/lib/main.js --expression "y=cos(x)" --range "x=0:4,y=-1:1" --file output.svg --csv
```

The CSV output will look similar to:

```
x,y
0,0
1,0.8414709848078965
2,0.9092974268256817
3,0.1411200080598672
4,-0.7568024953079282
```

If any of the parameters are invalid (for example, an empty expression, an improperly formatted range, or an unsupported file extension),
the tool will output an error message indicating the issue and terminate without creating a file.

---

## License

MIT
