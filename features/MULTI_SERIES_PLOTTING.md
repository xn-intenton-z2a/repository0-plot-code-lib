# Overview
Add the ability to plot multiple mathematical expressions on the same chart in one CLI invocation. Users can supply a comma-separated list of expressions or repeat the --expression flag. The output will render each series with a distinct stroke color and include a legend identifying each expression.

# CLI Flags
- `--expressions <list>`: comma-separated list of expressions to plot (e.g., "y=sin(x),y=cos(x)").  Alternatively, allow multiple `--expression` flags to collect series.
- Mutually exclusive with `--data` flag.
- Supports existing `--range`, `--format`, `--output`, and export flags as before.

# Implementation
- Extend `cliSchema` in `src/lib/main.js` to accept either:
  - a string under `expressions` matching one or more comma-separated expressions, or
  - an array of values for repeated `expression` flags.
- In `parseArgs`, collect multiple `--expression` occurrences into an array, and support splitting a single `--expressions` value by comma.
- For each expression, call the existing `generateData` function to produce a series of points.
- Update `generateSVG` to accept an array of series:
  - Predefine a simple color palette for strokes.
  - Render one `<polyline>` per series with its assigned stroke color.
  - Generate a legend element listing each expression with a matching color swatch.
- Preserve backward compatibility: if only one expression is provided, fallback to existing SVG rendering logic.
- Ensure PNG output via `sharp` still works by converting the enhanced SVG to PNG.

# Testing
- Add unit tests in `tests/unit/multi-series.test.js` to verify:
  - `parseArgs` correctly handles single and multiple expressions.
  - `generateSVG` outputs multiple `<polyline>` elements with distinct stroke attributes and a legend listing all expressions.
  - `main` invocation writes an SVG file containing multiple series when using `--expressions`.
  - Backward compatibility: single-expression behavior remains unchanged.

# Documentation
- Update `USAGE.md` and `README.md` with examples:
  repository0-plot-code-lib --expressions "y=sin(x),y=cos(x)" --range "x=0:6.28" --format svg --output dual.svg
- Describe the new `--expressions` flag, demonstrate syntax, and include a sample SVG snippet showing two colored curves and a legend.