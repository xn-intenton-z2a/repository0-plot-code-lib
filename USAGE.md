# Usage

To generate an SVG plot from a mathematical expression:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --output output.svg
```

Options:

- `--expression <expr>`: A mathematical expression in variable `x`. Required unless using `--input`.
- `--range <range>`: Range for `x` in the format `x=min:max[:step]`. Required unless using `--input`. `step` defaults to `1`.
- `--output <file>`: Output file path for the image or SVG. Optional. Defaults to stdout.
- `--input <file>`: Path to a CSV or JSON file containing time series data. When provided, `--expression` and `--range` are ignored.
- `--input-format <csv|json>`: Override input format detection based on file extension. Optional.
- `--png`: Output a PNG image instead of SVG. When used without `--output`, the PNG binary is written to stdout.

Examples:

Generate SVG from CSV data:
```bash
npx repository0-plot-code-lib --input data.csv --output plot.svg
```

Generate PNG from CSV data:
```bash
npx repository0-plot-code-lib --input data.csv --png --output plot.png
```

Generate PNG from JSON data, writing to stdout:
```bash
npx repository0-plot-code-lib --input data.json --input-format json --png > out.png
```

You can still use the expression/range syntax for SVG:
```bash
npx repository0-plot-code-lib --expression "x^2" --range "x=0:10:0.5" > plot.svg
```