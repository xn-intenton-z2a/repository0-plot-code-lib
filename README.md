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
npx repository0-plot-code-lib --expression "<expr>" --range "<range>" [--input "<file>"] [--input-format <csv|json>] [--format <svg|png|json|csv>] [--output "<file>"] [--serve] [--port <number>]
```

Options:

- `--expression <expr>`: A mathematical expression in variable `x`. Required unless using `--input`.
- `--range <range>`: Range for `x` in the format `x=min:max[:step]`. Required unless using `--input`. `step` defaults to `1`.
- `--input <file>`: Path to a CSV or JSON file containing time series data. When provided, expression and range are ignored.
- `--input-format <csv|json>`: Override input format detection based on file extension. Optional.
- `--format <svg|png|json|csv>`: Specify output format. Defaults to `svg`.
- `--output <file>`: Path to save the output. Optional. Defaults to stdout.
- `--png` (deprecated): Alias for `--format png`.
- `--serve`: Enable HTTP server mode.
- `--port <number>`: Port for HTTP server. Defaults to `3000`.

## Examples

Generate an SVG plot from an expression and save to a file:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --output plot.svg
```

Generate a PNG plot:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --format png --output plot.png
```

Generate JSON data from an expression:

```bash
npx repository0-plot-code-lib --expression "x" --range "x=0:5" --format json --output data.json
```

Load data from a CSV file and generate an SVG plot:

```bash
npx repository0-plot-code-lib --input data.csv --output plot.svg
```

Generate CSV output from JSON input:

```bash
npx repository0-plot-code-lib --input data.json --format csv > data.csv
```

Run the HTTP server on port 4000:

```bash
npx repository0-plot-code-lib --serve --port 4000
```

Access the `/plot` endpoint:

```bash
curl "http://localhost:4000/plot?expression=x&range=x=0:5:1&format=csv" > data.csv
```

## License

MIT
