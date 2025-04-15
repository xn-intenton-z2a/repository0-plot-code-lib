# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Usage

### CLI

The CLI now requires three parameters: --expression, --range, and --file.

- --expression: A non-empty string representing the mathematical expression.
- --range: A string specifying ranges in the format 'x=start:end,y=start:end'.
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
# Output: Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
```

#### Invalid Usage Examples

Missing a required parameter:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1"
# Output: Error: Invalid arguments.
# Additionally, error messages for the missing or invalid parameters will be printed.
```

Malformed range or wrong file extension:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "invalid" --file output.txt
# Output: Error: Invalid arguments.
# Additionally, error messages for the malformed range and incorrect file extension will be printed.
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

---

## License

MIT
