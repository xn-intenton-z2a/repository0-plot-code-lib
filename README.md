# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## CLI Usage

This CLI tool allows you to generate a plot from a mathematical expression and a range of values. It requires three mandatory arguments:

- --expression: The mathematical expression to plot. Example: "y=sin(x)".
- --range: The range of values for the plot. Use the format with axis assignments (e.g., "x=-1:1,y=-1:1").
- --file: The output file path where the plot will be written.

The behavior changes based on the file extension provided in the --file option:

- If the file extension is .svg, the tool generates a valid SVG plot with proper SVG markup. The SVG contains a <text> element displaying the expression and range.
- If the file extension is .png, or any other extension, the tool generates a placeholder plot text.

### Examples

Generate an SVG plot:
```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

Example SVG output:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <text x="10" y="50">Plot generated for expression: y=sin(x) with range: x=-1:1,y=-1:1</text>
</svg>
```

Generate a PNG plot:
```bash
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=-2:2" --file output.png
```

### Input Validation

- The CLI does not perform extensive validation on the provided inputs. Ensure that:
  - The --expression argument is a valid mathematical expression.
  - The --range argument strictly follows the format with axis ranges (e.g., "x=min:max,y=min:max").
  - The --file argument is a valid file path. The output file format is determined by the file extension provided (.svg or .png).

If any required argument is missing or not properly formatted, the tool will output a usage message indicating the expected format.

---

## License

MIT
