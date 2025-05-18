# repository0-plot-code-lib

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Installation

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

Or use npx without installing:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1"
```

## Usage

Run the CLI with the following syntax:

```bash
npx repository0-plot-code-lib --expression "<expr>" --range "<range>" [--output "<file>"]
```

Options:

- `--expression <expr>` (required): A mathematical expression in variable `x`.
- `--range <range>` (required): Range for `x` in the format `x=min:max[:step]`. Step defaults to `1`.
- `--output <file>` (optional): Path to save the output. Defaults to stdout.
- `--input <file>` (optional): Path to a CSV or JSON file containing data (ignores expression and range).
- `--input-format <csv|json>` (optional): Override input format detection.
- `--png` (optional): Output a PNG image instead of SVG.

## Examples

Generate an SVG plot and save to a file:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --output output.svg
```

Redirect output to STDOUT and pipe to a file:

```bash
npx repository0-plot-code-lib --expression "x^2" --range "x=0:10:0.5" > plot.svg
```

## License

MIT
