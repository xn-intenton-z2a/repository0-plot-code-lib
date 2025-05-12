# Overview
Unify all core plotting capabilities into a single engine that powers the CLI, programmatic API, and HTTP endpoints. This feature handles mathematical expressions, data imports, parametric functions, multi-series, derivative and trendline overlays, integral shading, reference lines, log scaling, explicit multi-axis ranges, styling options, and raw data export and analytics.

# CLI Flags
- expression/expression or expressions: Define one or multiple functions in x (e.g., --expression "y=sin(x)", --expressions "y=sin(x),y=cos(x)").
- x-expression and y-expression: Parametric mode (mutually exclusive with expressions and data). Supply both to plot parametric curves over t range.
- range, x-range, y-range: Specify axis ranges (axis=min:max), or combined with comma separated ranges.
- data or data-file: Import external JSON, YAML, or CSV containing x,y records.
- format: svg or png output format.
- output: File path to write the plot file.
- serve: Start HTTP server on given port.
- integral: true|false to shade area under curves.
- derivative: true|false to overlay first derivative curve.
- trendline-stats and overlay-trendline: Compute and/or overlay regression line with slope, intercept, and R².
- hline and vline: Comma-separated reference line values on x or y axes.
- x-log and y-log: Apply base-10 log scaling to axes (requires positive values).
- export-data and export-format: Write raw data or series to CSV, JSON, or YAML.
- Styling: width, height, title, x-label, y-label, grid, background, palette, colors, markers, marker-size.

# API Interface
Export an async function generatePlot(options):
- options: object supporting all CLI flags in typed form (strings, numbers, booleans).
- Returns: { type: 'svg'|'png', data: string|Buffer, stats?: { slope, intercept, r2 } } for overlay or stats-only modes.

# HTTP API Endpoints
- GET /plot: Accepts query params matching generatePlot options plus encoding=base64. Returns raw image bytes or JSON { data: base64, type }.
- GET /stats: Accepts expression+range or dataFile, optional samples and json flag. Returns summary statistics (min, max, mean, median, stddev) in JSON or plain text.

# Implementation
Integrate all parsing, data generation, transformations, plotting, analytics, and export helpers in src/lib/main.js. Extend Zod schemas for CLI and programmatic API. Consolidate generateData, generateDerivativeData, computeTrendlineStats, convertDataToString, generateSVG, generatePlot, and main() HTTP routes into one cohesive feature.

# Testing
Cover CLI, programmatic, and HTTP modes with unit tests for each behavior: parsing, data import, styling, multi-series, parametric, derivatives, trendline, integrals, reference lines, log scaling, multi-axis ranges, export-data, /plot, and /stats endpoints.

# Documentation
Update USAGE.md and README.md to describe each capability with usage examples for CLI, programmatic API, and HTTP endpoints. Provide sample SVG/PNG snippets and JSON/text outputs for analytics.