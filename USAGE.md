# Usage

To generate an SVG plot from a mathematical expression:

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --output output.svg
```

Options:

- `--expression <expr>`: A mathematical expression in variable `x`. Required.
- `--range <range>`: Range for `x` in the format `x=min:max[:step]`. Required. `step` defaults to `1`.
- `--output <file>`: Output file path for the SVG. Optional. Defaults to stdout.

Example:

```bash
npx repository0-plot-code-lib --expression "x^2" --range "x=0:10:0.5"
```

This prints an SVG to stdout. Redirect to a file to save:

```bash
npx repository0-plot-code-lib --expression "x^2" --range "x=0:10:0.5" > plot.svg
```
