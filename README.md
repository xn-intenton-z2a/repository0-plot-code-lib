# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Usage

### CLI

The CLI now requires three parameters: --expression, --range, and --file. Additional optional flags include --evaluate, --diagnostics, --color, --stroke, --width, --height, --padding, and --samples.

- --expression: A non-empty string representing the mathematical expression. If the string starts with "y=", the prefix is removed and basic math functions (like sin, cos, tan, sqrt, log, exp) are translated for JavaScript evaluation.
- --range: A string specifying the range for the x-axis and optionally the y-axis. It can be provided in the format 'x=min:max' or 'x=min:max,y=min:max'. When a y-range is provided, its boundaries will be used for plotting rather than auto scaling based on computed values.
- --file: The output file name which must end with .svg, .png, or .csv. When a .png file is specified, the generated SVG plot is converted to PNG using the sharp library. When a .csv file is specified, the computed time series data is exported in CSV format with a header of "x,y" followed by rows of data corresponding to the sample points.
- --evaluate: (Optional) When provided, the CLI evaluates the given expression over the x-range, generates time series data (an array of { x, y } objects) and outputs it in JSON format in the console, except when exporting to CSV.
- --diagnostics: (Optional) When provided, the CLI outputs diagnostic details including the raw parsed CLI arguments before proceeding with validation. This aids in debugging.
- --color: (Optional) A valid CSS color string (e.g., 'red', '#FF0000') used to set the stroke color of the plot. Defaults to 'black' if not provided.
- --stroke: (Optional) A positive number representing the stroke width of the plot. Defaults to 2 if not provided.
- --width: (Optional) A positive integer to specify the canvas width of the generated plot. Defaults to 500 if not provided.
- --height: (Optional) A positive integer to specify the canvas height of the generated plot. Defaults to 500 if not provided.
- --padding: (Optional) A positive integer to set the padding within the canvas, affecting the plot margins. Defaults to 20 if not provided.
- --samples: (Optional) A positive integer specifying the number of sample points to generate the plot. Defaults to 100 if not provided.

When all required parameters are provided, the CLI will simulate plot generation by logging a message in the format:

  "Generating plot for expression: <expression> with range: <range>"

followed by the actual plot output message:

  "Plot saved to <file>"

#### Valid Usage Examples

Display help information:

```sh
node src/lib/main.js --help
# Output: Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics] [--color <color>] [--stroke <number>] [--width <number>] [--height <number>] [--padding <number>] [--samples <number>]
```

Run the CLI with valid parameters (SVG plot generation) using full range:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
# Generating plot for expression: y=sin(x) with range: x=-1:-1,y=-1:-1
# Plot saved to output.svg
```

Run the CLI with valid parameters (SVG plot generation) using only x-range:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:1","file":"output.svg"}
# Generating plot for expression: y=sin(x) with range: x=-1:1
# Plot saved to output.svg
```

Run the CLI with evaluation to generate time series data:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6,y=-1:1" --file eval.svg --evaluate
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=0:6,y=-1:1","file":"eval.svg","evaluate":true}
# Generating plot for expression: y=sin(x) with range: x=0:6,y=-1:1
# Time series data: [ { x: 0, y: 0 }, { x: 0.06, y: 0.06 }, ... 100 data points ... ]
# Plot saved to eval.svg
```

Run the CLI with PNG output (PNG plot generation):

```sh
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=0:5" --file output.png
# Output:
# Validated arguments: {"expression":"y=cos(x)","range":"x=0:10,y=0:5","file":"output.png"}
# Generating plot for expression: y=cos(x) with range: x=0:10,y=0:5
# Plot saved to output.png
```

Run the CLI with custom plot styling:

```sh
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=0:5" --file custom.svg --color blue --stroke 5
# Output:
# Validated arguments: {"expression":"y=cos(x)","range":"x=0:10,y=0:5","file":"custom.svg","color":"blue","stroke":5}
# Generating plot for expression: y=cos(x) with range: x=0:10,y=0:5
# Plot saved to custom.svg
```

Run the CLI with custom canvas dimensions, padding, and sample count:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file customDimensions.svg --width 800 --height 600 --padding 50 --samples 150
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:1","file":"customDimensions.svg","width":800,"height":600,"padding":50,"samples":150}
# Generating plot for expression: y=sin(x) with range: x=-1:1
# Plot saved to customDimensions.svg
```

Run the CLI in diagnostics mode (for debugging):

```sh
node src/lib/main.js --diagnostics --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
# Diagnostics - Raw CLI arguments: { ...raw parsed arguments... }
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
# Generating plot for expression: y=sin(x) with range: x=-1:-1,y=-1:-1
# Plot saved to output.svg
```

Run the CLI with an explicit y-range (overriding auto y-axis scaling):

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=-2:2" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=0:10,y=-2:2","file":"output.svg"}
# Generating plot for expression: y=sin(x) with range: x=0:10,y=-2:2
# Plot saved to output.svg
```

#### CSV Export Usage

The CLI now supports exporting time series data in CSV format when the output file extension is .csv. The CSV file will include a header row with "x,y" and rows of data corresponding to the number of sample points (default 100 or as specified by --samples).

Example:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6,y=-1:1" --file output.csv
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=0:6,y=-1:1","file":"output.csv"}
# Time series CSV exported to output.csv
```

#### New Simulation Message

Upon executing the command with the required parameters, the CLI now simulates plot generation by first logging a message in the format:

  "Generating plot for expression: <expression> with range: <range>"

This provides immediate feedback that the plot is being processed, followed by the final message indicating the file output.

#### New Examples with Additional Math Functions

Using sqrt:

```sh
node src/lib/main.js --expression "y=sqrt(x)" --range "x=0:9,y=0:3" --file sqrt.svg
# Generates a plot where each y-value is the square root of x.
```

Using log:

```sh
node src/lib/main.js --expression "y=log(x)" --range "x=1:10,y=0:3" --file log.svg
# Generates a plot where each y-value is the natural logarithm of x.
```

Using exp:

```sh
node src/lib/main.js --expression "y=exp(x)" --range "x=0:2,y=1:8" --file exp.svg
# Generates a plot where each y-value is the exponential of x.
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
  "--file", "output.svg", // or use output.png for PNG output or output.csv for CSV export
  "--evaluate",        // optional flag to output time series data (when not exporting CSV)
  "--diagnostics",     // optional flag to output diagnostic information
  "--color", "green", // optional flag to set the stroke color
  "--stroke", "3",    // optional flag to set the stroke width
  "--width", "800",   // optional custom canvas width
  "--height", "600",  // optional custom canvas height
  "--padding", "30",  // optional custom padding
  "--samples", "120"   // optional custom sample count
]);
```

After successfully running the CLI with valid parameters, a plot in SVG or PNG format is generated and saved to the specified file, or CSV data is exported if .csv is used. The simulation message confirms that the plot generation process has started.

---

## License

MIT
