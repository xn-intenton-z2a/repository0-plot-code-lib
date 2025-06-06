features/FUNCTION_TRANSFORMS.md
# features/FUNCTION_TRANSFORMS.md
# Purpose

Provide a unified feature for advanced function transformations, combining derivative support and parametric curve generation. This feature lets users compute symbolic derivatives of expressions and generate both standard and parametric time series or plots in a consistent API, CLI and HTTP interface.

# Behavior

## Programmatic API

- Extend `getTimeSeries(expression, range, options)`:
  • Accept `options.derivative` (boolean, default false). When true, compute derivative(expression, 'x') via mathjs, then evaluate the derived expression over the specified range.
- Introduce `getParametricSeries(xExpression, yExpression, range, options)`:
  • `xExpression`: string expression in parameter `t`
  • `yExpression`: string expression in parameter `t`
  • `range`: string in "start:end" or "start:end:step"
  • `options.points`: positive integer default 100
  • Optionally support `options.derivative` to compute derivative of each expression with respect to `t` and return series of `{t, x, y, dx, dy}` when derivative flag is set.
- Both functions return an array of points:
  • `getTimeSeries`: `{ x, y }[]`
  • `getParametricSeries`: `{ t, x, y }[]` or with derivatives `{ t, x, y, dx, dy }[]` when requested.

## Command Line Interface

- Add a global `--derivative` flag (default false). When set, timeseries and plot commands compute and render the derivative curve instead of the original function.
- Introduce a new top-level subcommand `parametric` with two modes:
  • `repository0-plot-code-lib parametric --x-expression <expr> --y-expression <expr> --range <range> [--points N] [--format csv|json|ndjson] [--derivative] [--output-file path]`
  • `repository0-plot-code-lib parametric plot --x-expression <expr> --y-expression <expr> --range <range> [--points N] [--plot-format svg|png] [--width W] [--height H] [--title "..."] [--derivative] [--output-file path]`
- In default (timeseries) and `plot` modes, honor `--derivative` for 1D curves and include derivative output in parametric derivative mode.

## HTTP Server API

- Extend existing endpoints for 1D functions (`/ndjson`, `/json`, `/csv`, `/stream`) to accept a `derivative` query parameter. When true, compute and return the derivative time series or plot.
- Introduce parametric endpoints:
  • GET `/parametric/ndjson`, `/parametric/json`, `/parametric/csv`, `/parametric/stream` accepting `xExpression`, `yExpression`, `range`, `points`, `derivative`
  • POST `/parametric/plot` accepting body `xExpression`, `yExpression`, `range`, `points`, `derivative`, `plotFormat`, `width`, `height`, `title`
- Validate inputs with Zod and reuse shared logic for series generation and plotting to ensure consistency.
features/PARAMETRIC_SERIES.md
# features/PARAMETRIC_SERIES.md
# Purpose

Add support for generating and plotting parametric curves defined by separate x and y expressions over a parameter range, with optional derivative computation.

# Behavior

## Programmatic API

- Introduce getParametricSeries(xExpression, yExpression, range, options)
  • xExpression: string in parameter t
  • yExpression: string in parameter t
  • range: string "start:end" or "start:end:step"
  • options.points: integer >0, default 100
  • options.derivative: boolean, default false
  • Compute t values via parseRange(range, points)
  • Evaluate xExpression and yExpression at each t
  • If derivative true, compute derivative of each expression wrt t and include dx, dy
  • Return array of { t, x, y } or { t, x, y, dx, dy }

## Command Line Interface

- Add new top-level command parametric
  • repository0-plot-code-lib parametric --x-expression <expr> --y-expression <expr> --range <range> [--points N] [--format csv|json|ndjson] [--derivative] [--output-file path]
  • repository0-plot-code-lib parametric plot --x-expression <expr> --y-expression <expr> --range <range> [--points N] [--plot-format svg|png] [--width W] [--height H] [--title text] [--derivative] [--output-file path]
- Default mode outputs series in CSV, JSON or NDJSON formats
- plot mode generates SVG or PNG using existing generateSVG and generatePNG on paired x and y data

## HTTP Server API

- Add GET /parametric/ndjson, /parametric/json, /parametric/csv, /parametric/stream endpoints
  • Query parameters: xExpression, yExpression, range, points, derivative
  • Validate with Zod and parse inputs
  • Return series serialized with serializeCSV, serializeJSON, serializeNDJSON, or SSE
- Add POST /parametric/plot
  • Body fields: xExpression, yExpression, range, points, derivative, plotFormat, width, height, title
  • Validate body with Zod
  • Generate SVG or PNG from parametric data and return inline HTML page

Reuse shared parsing and plotting logic to ensure consistency and minimize duplication.