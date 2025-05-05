# Purpose

Provide first-class support for parametric curve generation and plotting. Users can define separate expressions for x(t) and y(t) over a shared parameter range and generate data series or plots for parametric functions.

# Behavior

## Programmatic API
Extend the library with a new function getParametricSeries(xExpression, yExpression, range, options).
  • xExpression: string expression in t
  • yExpression: string expression in t
  • range: string in "start:end" or "start:end:step"
  • options.points: positive integer default 100
The function evaluates both expressions across the parameter values and returns an array of points {t, x, y}.

## Command Line Interface
Add a new top-level subcommand parametric with timeseries and plot modes:
  • repository0-plot-code-lib parametric --x-expression <expr> --y-expression <expr> --range <range> [--points N] [--format csv|json|ndjson] [--output-file path]
  • repository0-plot-code-lib parametric plot --x-expression <expr> --y-expression <expr> --range <range> [--points N] [--plot-format svg|png] [--width W] [--height H] [--title "..."] [--output-file path]
Timeseries mode serializes t,x,y arrays in CSV/JSON/NDJSON; plot mode generates a polyline or image of the parametric curve.

## HTTP Server API
Introduce new endpoints under /parametric:
  • GET /parametric/ndjson, /parametric/json, /parametric/csv, /parametric/stream
  • POST /parametric/plot
All endpoints accept query or body parameters xExpression, yExpression, range, points, and plotFormat/width/height/title for plots. They return the parametric data series or inline SVG/PNG curve.

# Implementation

In src/lib/main.js:
  • Add evaluateParametricExpressions(xExpr, yExpr, tValues) using mathjs.evaluate with {t}
  • Implement getParametricSeries delegating to parseRange and evaluateParametricExpressions
  • In the CLI parser add a parametric command, parse flags x-expression, y-expression, range, points, format or plot-format, width, height, title, output-file, and route to getParametricSeries and generateSVG or generatePNG
  • For HTTP server extend express app to register routes /parametric/... with schemas using zod to validate xExpression and yExpression and reuse getParametricSeries, serialize functions, generateSVG/generatePNG

# Testing

• Unit tests for evaluateParametricExpressions and getParametricSeries covering simple parametric examples (circle, line) and error cases.
• CLI tests invoking parametric timeseries for csv/json/ndjson and parametric plot for svg/png, verifying output structure and file writing.
• HTTP integration tests for GET /parametric/json, /parametric/csv, /parametric/ndjson, /parametric/stream with valid and missing params, and POST /parametric/plot for svg and png.
