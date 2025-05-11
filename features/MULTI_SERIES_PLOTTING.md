# Overview
Add the ability to plot multiple mathematical expressions in a single CLI invocation. Users can supply multiple expressions via a comma-separated list or by repeating the --expression flag. Each series will be drawn with a distinct color and labeled in a legend.

# CLI Flags
- `--expressions <list>`: Comma-separated list of expressions to plot (e.g., "y=sin(x),y=cos(x),y=x^2").
- Allow multiple `--expression <expr>` flags to collect series.
- Mutually exclusive with `--data-file`.
- Supports existing `--range`, `--format`, and `--output` flags.

# Implementation
1. Update `cliSchema` in `src/lib/main.js`:
   - Make `expression` field accept either a single string or an array of strings.
   - Add optional `expressions` field as z.string() and apply mutual exclusivity rule with `expression` and `dataFile`.
2. Enhance `parseArgs`:
   - Recognize repeated `--expression` flags and collect them into an array.
   - Recognize `--expressions` and split its value on commas into an array.
   - Validate that at least one expression is supplied and normalize to `parsed.expressions` array.
3. In `main()`:
   - Determine series list from `parsed.expressions` (array) or single `parsed.expression` fallback.
   - For each expression in the series list, call `generateData` to obtain a point array.
   - Pass an array of `{ expression, points }` objects into `generateSVG`.
4. Extend `generateSVG` in `src/lib/main.js`:
   - Accept an array of series objects instead of a single point array.
   - Define a default color palette for strokes.
   - Render one `<polyline>` per series with its assigned stroke color and consistent styles.
   - Add a `<g class="legend">` element listing each expression with a colored swatch and label.
   - Preserve single-series behavior when array length is one by delegating to existing logic.
5. Maintain PNG conversion via `sharp` unchanged.

# Testing
- Create `tests/unit/multi-series.test.js`:
  - Verify `parseArgs` handles `--expressions` and repeated `--expression` flags correctly.
  - Test that `generateSVG` outputs multiple `<polyline>` elements with distinct stroke attributes and includes a legend group.
  - Test `main()` writes an SVG containing all series when using `--expressions` and that single-expression calls remain unchanged.
  - Test PNG output for multi-series plots produces a valid PNG buffer.

# Documentation
- Update `USAGE.md` and `README.md`:
  - Document the `--expressions` and repeated `--expression` usage.
  - Provide example commands:
     repository0-plot-code-lib --expressions "y=sin(x),y=cos(x)" --range "x=0:6.28" --format svg --output dual.svg
  - Include a sample SVG snippet showing two colored curves and the legend.