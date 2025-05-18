# Overview

Enhance the existing plot generation feature to support:

- Plot annotations including chart title, x-axis label, and y-axis label
- Custom line styling with configurable color and stroke width per series
- Axis tick customization with configurable tick counts
- Optional grid lines behind the data series
- Multiple data series overlays with distinct default colors and a legend
- Retain multi-format exports (svg, png, json, csv) and integrate all new options into both CLI and HTTP modes

# CLI Integration

- Support repeated --expression and --range flags to define each series. If only one pair is provided, behave as before
- Add flags:
  - --line-color color or comma separated list of colors matching series order (default distinct palette)
  - --line-width number or comma separated list matching series (default 2)
  - --legend boolean flag to enable or disable legend display (default true when multiple series)
- Retain existing flags: --format, --input, --input-format, --output, --serve, --port, and deprecated --png
- After parsing args, collect arrays of expression, range, lineColor, lineWidth, legend flag and pass them into the rendering helper along with width, height, margin, tick and grid settings
- Examples:
  npx repository0-plot-code-lib --expression sin(x) --range x=0:6.28:0.1 --expression cos(x) --range x=0:6.28:0.1 --format svg --line-color blue,red --legend --output multi.svg

# HTTP API

- Accept repeated query parameters expression and range for each series
- Support query params:
  - lineColor as comma separated CSS color strings
  - lineWidth as comma separated numeric strings
  - legend as boolean string true or false
  - existing params: format, input, inputFormat, tickCount, grid, title, xLabel, yLabel
- On GET /plot, parse arrays of expression and range, styling arrays, legend flag, then generate multi-series output in requested format

# Implementation

- Extend parseArgs in src/lib/main.js to allow expression and range as string or string array, and preprocess lineColor and lineWidth into arrays, parse legend as boolean
- In main, build an array of data objects by calling parseInputFile or generateData for each series
- Update generateSVG(dataArray, options) signature to accept dataArray: Array of { xValues, yValues }, arrays for lineColor and lineWidth, legend flag, plus existing width, height, margin, tickCount, grid, annotations
- Compute global scales across all series
- Render grid and axes once, then draw each series polyline with its color and width, then render legend items with color swatch and series label or index
- Ensure layer order: grid, axes, polylines, legend, annotations
- Preserve backward compatibility when single series is provided

# Tests

- Extend parseArgs tests to verify repeated --expression and --range parsing into arrays, parsing of comma separated lineColor and lineWidth, legend flag
- Add unit tests for generateSVG in tests/unit/plot-generation.test.js:
  - When two series provided, SVG contains two polyline elements with correct stroke attributes and a legend group with two entries
  - Confirm behavior when legend is disabled

# Documentation

- Update README.md and USAGE.md to document repeated flags, comma separated styling, and --legend flag with CLI examples
- Document corresponding query parameters for HTTP mode and provide curl examples