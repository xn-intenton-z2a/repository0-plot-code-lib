# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Usage

### CLI

The CLI now requires three parameters: --expression, --range, and --file. When executed with valid parameters, the CLI generates a plot in SVG format and saves it to the specified file (PNG support is planned for future releases).

- --expression: A non-empty string representing the mathematical expression. If the string starts with "y=", the prefix is removed and basic math functions (like sin, cos, tan) are translated for JavaScript evaluation.
- --range: A string specifying ranges in the format 'x=min:max,y=min:max'. If the min and max values are equal, they are adjusted to provide a workable interval.
- --file: The output file name which must end with either .svg or .png.

#### Valid Usage Examples

Display help information:

```sh
node src/lib/main.js --help
# Output: Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath>
```

Run the CLI with valid parameters:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
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
  "--range", "x=-1:-1,y=-1:-1",
  "--file", "output.svg"
]);
```

After successfully running the CLI with valid parameters, a plot in SVG format is generated and saved to the specified file, with a confirmation message logging the file name.

---

## License

MIT
