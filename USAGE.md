# Usage

This tool generates plots based on mathematical expressions over a numeric range.

## CLI Examples

Generate an SVG plot:
```sh
repository0-plot-code-lib --expression "y=sin(x)+0.5*x" --range "x=0:10" --format svg --output plot.svg
```

Generate a PNG plot:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format png --output plot.png
```

Use `--help` for more information on available flags.
