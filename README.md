# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Usage

### CLI

The CLI now requires three parameters: --expression, --range, and --file. Additional optional flags include --evaluate and the new --diagnostics flag.

- --expression: A non-empty string representing the mathematical expression. If the string starts with "y=", the prefix is removed and basic math functions (like sin, cos, tan) are translated for JavaScript evaluation.
- --range: A string specifying ranges in the format 'x=min:max,y=min:max'. If the min and max values are equal, they are adjusted to provide a workable interval.
- --file: The output file name which must end with either .svg or .png.
- --evaluate: (Optional) When provided, the CLI evaluates the given expression over the x-range, generating time series data (an array of { x, y } objects) and outputs it in JSON format in the console.
- --diagnostics: (Optional) When provided, the CLI outputs diagnostic details including the raw parsed CLI arguments before proceeding with validation. This aids in debugging.

#### Valid Usage Examples

Display help information:

```sh
node src/lib/main.js --help
# Output: Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics]
```

Run the CLI with valid parameters (plot generation):

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
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

Run the CLI in diagnostics mode (for debugging):

```sh
node src/lib/main.js --diagnostics --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
# Diagnostics - Raw CLI arguments: { ...raw parsed arguments... }
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
# Plot saved to output.svg
```

#### Invalid Usage Examples

Missing a required parameter:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1"
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
  "--file", "output.svg",
  "--evaluate", // optional flag to output time series data
  "--diagnostics" // optional flag to output diagnostic information
]);
```

After successfully running the CLI with valid parameters, a plot in SVG format is generated and saved to the specified file. If the --evaluate flag is provided, the computed time series data is output to the console in JSON format. When --diagnostics is enabled, raw parsed CLI argument information is displayed to assist with debugging.

---

## License

MIT
