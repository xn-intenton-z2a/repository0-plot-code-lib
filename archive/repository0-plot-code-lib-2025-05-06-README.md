# repository0-plot-code-lib

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

repository0-plot-code-lib is a JavaScript CLI tool and library that parses mathematical expressions, generates time-series data, and renders plots in SVG or PNG formats. It brings the power of data visualization directly to your terminal or JavaScript projects.

## Features

- Parse mathematical expressions in terms of x
- Define numeric ranges for sampling (x-only)
- Generate SVG or PNG plots
- Sample time-series data for further processing
- Fully typed argument validation with Zod

## Installation

Requires Node.js >=20.0.0

Install locally:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

Or use via npx (no install required):

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28" -o output.svg
```

## CLI Usage

```
repository0-plot-code-lib --expression <expr> --range <range> [options]
```

Options:

- `-e, --expression <expr>`       A mathematical expression in x (e.g., "sin(x)")
- `-r, --range <range>`           Numeric range for x (e.g., "x=0:6.28")
- `-f, --format <svg|png>`        Output image format (default: svg)
- `-o, --output, --file <file>`   Output file path (default: plot.svg)
- `-h, --help`                    Show help and exit

Example:

```bash
npx repository0-plot-code-lib -e "x^2" -r "x=0:10" -f png -o square.png
```

## API Usage

You can import and invoke the CLI programmatically in your JavaScript code:

```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

main([
  "--expression", "sin(x)",
  "--range", "x=0:6.28",
  "--format", "svg",
  "--output", "plot.svg"
]);
```

## Documentation

For a more detailed guide, examples, and advanced options, see [USAGE.md](USAGE.md).

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting issues, submitting pull requests, and testing your changes.

## License

MIT
