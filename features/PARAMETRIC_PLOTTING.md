# Overview
Support plotting parametric functions defined by independent x and y expressions over a parameter range. Users supply both x and y expressions in terms of a parameter (commonly t) and obtain an SVG or PNG plot of the resulting curve.

# CLI Flags
- --x-expression <expr>  Expression for horizontal coordinate as a function of t, for example x=cos(t).
- --y-expression <expr>  Expression for vertical coordinate as a function of t, for example y=sin(t).
- --range <axis>=min:max  Parameter range using axis name t, for example t=0:6.28. Mutually exclusive with --expression, --expressions, --data, and --data-file modes.
- Supports existing flags: --samples, --format, --output, --width, --height, styling flags, --x-log, --y-log, and other plot options.

# Implementation
1. Schema Updates
   • In cliSchema (src/lib/main.js) add optional string fields xExpression and yExpression. Enforce that both are provided together and exclusive with expression, expressions, data, data-file.
2. Argument Parsing
   • In parseArgs detect --x-expression and --y-expression flags, map to parsed.xExpression and parsed.yExpression. Validate that when either appears, both must be present.
   • Use parseRange to parse the t range when parametric mode is active.
3. Parametric Data Generation
   • Implement generateParametricData(xExpr, yExpr, rangeObj, samples) in src/lib/main.js. Compile both expressions with mathjs, iterate from rangeObj.min to rangeObj.max in equal steps, and build an array of { x, y } points.
4. Integration in CLI main()
   • In main(), detect parametric mode when parsed.xExpression and parsed.yExpression exist. Call generateParametricData with xExpression, yExpression, rangeObj, and samples.
   • Apply x-log and y-log transforms if requested. Pass points to generateSVG or to the PNG pipeline via sharp.

# Programmatic API
Extend generatePlot() schema to accept optional xExpression and yExpression fields alongside range, format, and style options. In generatePlot(), detect parametric mode when both options.xExpression and options.yExpression are provided, parse rangeObj, call generateParametricData, apply any log transforms, and return an object with type and data (SVG string or PNG buffer).

# HTTP API
Enhance the /plot endpoint in HTTP server mode to accept query parameters xExpression and yExpression. In the route handler, if both are provided use the parametric generation path by passing opts to generatePlot; otherwise fall back to standard expression or data-file mode.

# Testing
- Create tests/unit/parametric-plotting.test.js:
  • CLI mode: invoke main() with --x-expression, --y-expression, --range t=..., --format, --output and verify the written SVG or PNG contains <polyline> representing parametric points.
  • Programmatic API: call generatePlot({ xExpression, yExpression, range, format }) and assert result.data includes the expected parametric curve.
  • HTTP mode: test GET /plot with query parameters xExpression, yExpression, range, format and verify response status, headers, and payload.
  • Error cases: missing xExpression or yExpression, invalid range syntax, nonnumeric range values, and mixing parametric flags with other modes should trigger validation errors and exit with code 1.

# Documentation
Update USAGE.md and README.md under a **Parametric Plotting** section to describe --x-expression and --y-expression flags, show CLI examples, programmatic usage snippet, and HTTP /plot query examples.