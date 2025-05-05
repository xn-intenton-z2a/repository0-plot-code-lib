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