# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## CLI Usage

This CLI tool allows you to generate a plot from a mathematical expression and a range of values. It requires three mandatory arguments:

- --expression: The mathematical expression to plot. Example: "y=sin(x)".
- --range: The range of values for the plot. Use the format with axis assignments (e.g., "x=-1:1,y=-1:1").
- --file: The output file path where the plot will be written. The file must have a .svg or .png extension.

In addition to generating a basic plot, the tool now computes time series data from the provided expression and range. It evaluates the expression (using [mathjs](https://mathjs.org)) at 5 evenly spaced x values within the range and embeds the resulting time series data (in JSON format) in the output plot.

When run without any arguments, the CLI displays a usage message. For example:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

### Examples

Generate an SVG plot with embedded time series data:
```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

Example SVG output:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <text x="10" y="20">Plot generated for expression: y=sin(x) with range: x=-1:1,y=-1:1</text>
  <text x="10" y="50">Time Series Data: [{"x":-1,"y":<value>}, ...]</text>
</svg>
```

Generate a PNG plot with embedded time series data:
```bash
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=-2:2" --file output.png
```

The PNG output will include a placeholder plot description followed by the computed time series data.

If any of the parameters are invalid (for example, an empty expression, an improperly formatted range, or an unsupported file extension),
the tool will output an error message indicating the issue and terminate without creating a file.

---

## License

MIT
