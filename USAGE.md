# Usage

To generate an SVG plot from a mathematical expression:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --output output.svg
```

Options:

- `--expression <expr>`: A mathematical expression in variable `x`. Required unless using `--input`.
- `--range <range>`: Range for `x` in the format `x=min:max[:step]`. Required unless using `--input`. `step` defaults to `1`.
- `--output <file>`: Output file path for the image, SVG, JSON, or CSV. Optional. Defaults to stdout.
- `--input <file>`: Path to a CSV or JSON file containing time series data. When provided, `--expression` and `--range` are ignored.
- `--input-format <csv|json>`: Override input format detection based on file extension. Optional.
- `--format <svg|png|json|csv>`: Specify output format. Defaults to `svg`.
- `--png`: (Deprecated) Alias for `--format png`. Outputs a PNG image instead of SVG.
- `--serve`: Enable HTTP server mode.
- `--port <number>`: Port for HTTP server. Defaults to `3000`.

Examples:

Generate SVG from CSV data:
```bash
npx repository0-plot-code-lib --input data.csv --output plot.svg
```

Generate PNG from CSV data:
```bash
npx repository0-plot-code-lib --input data.csv --format png --output plot.png
```

Generate JSON from CSV data:
```bash
npx repository0-plot-code-lib --input data.csv --format json --output data.json
```

Generate CSV from JSON data, writing to stdout:
```bash
npx repository0-plot-code-lib --input data.json --format csv > data.csv
```

Run HTTP server on port 4000:
```bash
npx repository0-plot-code-lib --serve --port 4000
```
Access the `/plot` endpoint:
```bash
curl "http://localhost:4000/plot?expression=x&range=x=0:5:1&format=csv" > data.csv
```
