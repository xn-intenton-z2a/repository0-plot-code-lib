# Usage

This tool generates plots based on mathematical expressions over a numeric range.

## Flags

--help: Show this help message and usage examples.

--version: Show the installed CLI version.

--mission: Show the project mission statement.

## CLI Examples

Generate an SVG plot:
```sh
repository0-plot-code-lib --expression "y=sin(x)+0.5*x" --range "x=0:10" --format svg --output plot.svg
```

Generate a PNG plot:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format png --output plot.png
```

Show version:
```sh
repository0-plot-code-lib --version
```

Show mission:
```sh
repository0-plot-code-lib --mission
```

Use `--help` to display this message and examples.
