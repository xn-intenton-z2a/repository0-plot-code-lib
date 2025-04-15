# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Usage

### CLI

The CLI now requires three parameters: --expression, --range, and --file. Additional optional flags include --evaluate, --diagnostics, --color, and --stroke.

- --expression: A non-empty string representing the mathematical expression. If the string starts with "y=", the prefix is removed and basic math functions (like sin, cos, tan) are translated for JavaScript evaluation.
- --range: A string specifying the range for the x-axis and optionally the y-axis. It can be provided in the format 'x=min:max' or 'x=min:max,y=min:max'. When a y-range is provided, its boundaries will be used for plotting rather than auto scaling based on computed values.
- --file: The output file name which must end with either .svg or .png. When a .png file is specified, the generated SVG plot is converted to PNG using the sharp library.
- --evaluate: (Optional) When provided, the CLI evaluates the given expression over the x-range, generates time series data (an array of { x, y } objects) and outputs it in JSON format in the console.
- --diagnostics: (Optional) When provided, the CLI outputs diagnostic details including the raw parsed CLI arguments before proceeding with validation. This aids in debugging.
- --color: (Optional) A valid CSS color string (e.g., 'red', '#FF0000') used to set the stroke color of the plot. Defaults to 'black' if not provided.
- --stroke: (Optional) A positive number representing the stroke width of the plot. Defaults to 2 if not provided.

#### Valid Usage Examples

Display help information:

```sh
node src/lib/main.js --help
# Output: Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics] [--color <color>] [--stroke <number>
```

Run the CLI with valid parameters (SVG plot generation) using full range:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
# Plot saved to output.svg
```

Run the CLI with valid parameters (SVG plot generation) using only x-range:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:1","file":"output.svg"}
# Plot saved to output.svg
```

Run the CLI with evaluation to generate time series data:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6,y=-1:1" --file eval.svg --evaluate
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=0:6,y=-1:1","file":"eval.svg","evaluate":true}
# Time series data: [ { x: 0, y: 0 }, { x: 0.06, y: 0.06 }, ... 100 data points ... ]
# Plot saved to eval.svg
```

Run the CLI with PNG output (PNG plot generation):

```sh
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=0:5" --file output.png
# Output:
# Validated arguments: {"expression":"y=cos(x)","range":"x=0:10,y=0:5","file":"output.png"}
# Plot saved to output.png
```

Run the CLI with custom plot styling:

```sh
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=0:5" --file custom.svg --color blue --stroke 5
# Output:
# Validated arguments: {"expression":"y=cos(x)","range":"x=0:10,y=0:5","file":"custom.svg","color":"blue","stroke":5}
# Plot saved to custom.svg (with blue stroke and stroke width 5)
```

Run the CLI in diagnostics mode (for debugging):

```sh
node src/lib/main.js --diagnostics --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
# Diagnostics - Raw CLI arguments: { ...raw parsed arguments... }
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
# Plot saved to output.svg
```

Run the CLI with an explicit y-range (overriding auto y-axis scaling):

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=-2:2" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=0:10,y=-2:2","file":"output.svg"}
# Plot saved to output.svg (with y-axis boundaries set to -2 and 2)
```

#### Invalid Usage Examples

Missing a required parameter:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1"
# Output: Error: Invalid arguments.
```

Malformed range or wrong file extension:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "invalid" --file output.txt
# Output: Error: Invalid arguments.
```

### Programmatic

You can also use the library programmatically:

```js
import { main } from "@src/lib/main.js";

main([
  "--expression", "y=sin(x)",
  "--range", "x=0:6,y=-1:1",
  "--file", "output.svg", // or use output.png for PNG output
  "--evaluate",        // optional flag to output time series data
  "--diagnostics",     // optional flag to output diagnostic information
  "--color", "green", // optional flag to set the stroke color
  "--stroke", "3"      // optional flag to set the stroke width
]);
```

After successfully running the CLI with valid parameters, a plot in SVG or PNG format is generated and saved to the specified file. If the --evaluate flag is provided, the computed time series data is output to the console in JSON format. When --diagnostics is enabled, raw parsed CLI argument information is displayed to assist with debugging. When a y-range is explicitly provided, its boundaries are used to set the y-axis limits for the plot.

---

## License

MIT
