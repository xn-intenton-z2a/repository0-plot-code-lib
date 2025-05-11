# Overview
Support plotting parametric functions defined by independent x and y expressions over a parameter range. Users supply both x and y expressions in terms of a parameter (commonly t) and obtain an SVG or PNG plot of the resulting curve.

# CLI Flags
- `--x-expression <expr>`  Expression for horizontal coordinate as a function of t (e.g., x=cos(t)).
- `--y-expression <expr>`  Expression for vertical coordinate as a function of t (e.g., y=sin(t)).
- `--range <axis>=min:max`  Parameter range; use axis name `t` (e.g., t=0:6.28).  Mutually exclusive with `--expression` and `--data` modes.
- Accepts existing `--samples`, `--format`, `--output`, and styling flags for resolution, output format, and appearance.

# Implementation
1. Extend `cliSchema` in `src/lib/main.js` to include optional `xExpression` and `yExpression` as strings and enforce that both are provided together and exclusive with `expression` and `data` flags.
2. Update `parseArgs` to recognize `--x-expression` and `--y-expression` flags, mapping to `parsed.xExpression` and `parsed.yExpression`.
3. In `main()`, detect parametric mode when both `xExpression` and `yExpression` are set. Use `parseRange` to parse the t range into `{ axis, min, max }`.
4. Implement a new helper `generateParametricData(xExpr, yExpr, range, samples)` in `src/lib/main.js`. Compile both expressions with mathjs, iterate from range.min to range.max in equal steps based on samples, and produce an array of `{ x, y }` objects.
5. Pass generated points into `generateSVG` and PNG conversion unchanged, leveraging existing rendering logic.

# Testing
- Create `tests/unit/parametric-plotting.test.js`:
  • Assert `parseArgs` correctly collects both `--x-expression` and `--y-expression`, and errors when one is missing.
  • Test `generateParametricData` for simple parametric curves, e.g., circle equations, to verify point arrays.
  • Invoke `main()` with parametric flags and validate that `fs.writeFileSync` is called with SVG containing `<polyline>` of parametric points, and PNG pipeline outputs valid buffer.

# Documentation
- Update `USAGE.md` and `README.md` with examples:
  repository0-plot-code-lib --x-expression "x=cos(t)" --y-expression "y=sin(t)" --range "t=0:6.28" --format svg --output circle.svg
- Describe the `--x-expression` and `--y-expression` flags, parameter range usage, and sample output snippet of a circle plot.