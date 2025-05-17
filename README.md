# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Installation

Install the library via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

Or run directly without installing using npx:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1"
```

## Usage

Run the CLI with the following syntax:

```bash
npx repository0-plot-code-lib --expression "<expr>" --range "<range>" [--output "<file>"]
```

### Options

- `--expression <expr>` (required):
  - A mathematical expression in variable `x` to plot (e.g., `sin(x)`, `x^2 + 3`).
- `--range <range>` (required):
  - Defines the range for `x` in the format `x=min:max[:step]`.
  - `min` and `max` are required. `step` is optional and defaults to `1` if omitted.
  - Example: `x=0:10:0.5` generates points from 0 to 10 in increments of 0.5.
- `--output <file>` (optional):
  - Path to save the generated SVG file.
  - If not provided, the SVG is printed to standard output (stdout).

## Examples

Generate an SVG plot and save it to `output.svg`:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --output output.svg
```

Generate an SVG plot and redirect the output to a file:

```bash
npx repository0-plot-code-lib --expression "x^2" --range "x=0:10:0.5" > plot.svg
```

## License

MIT
