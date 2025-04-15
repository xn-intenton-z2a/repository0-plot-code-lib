# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Usage

### CLI

You can run the CLI with arguments directly:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
```

If you run the CLI without any arguments, a help message will be shown:

```sh
node src/lib/main.js
# Output: No arguments provided. Use --help to see usage instructions.
```

You can also display usage information explicitly:

```sh
node src/lib/main.js --help
# Output: Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath>
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
