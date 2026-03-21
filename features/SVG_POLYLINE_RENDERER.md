# SVG_POLYLINE_RENDERER

Overview

Render a numeric data series to SVG 1.1 using a single polyline element and a viewBox attribute so output is resolution-independent.

Specification

- Named export: renderSvg(series, options)
- series is an array of {x:number,y:number}; options may include width, height, stroke, strokeWidth, padding
- Output is a string that is valid SVG 1.1 with a viewBox attribute and a single polyline element containing the points attribute
- viewBox must map data coordinates to SVG coordinates so the polyline fits the drawing area

Acceptance Criteria

1. renderSvg is exported as a named export from src/lib/main.js
2. The returned SVG string begins with an svg element and contains a viewBox attribute
3. The SVG contains a polyline element with a points attribute that represents the series
4. The number of points in the polyline is equal to the number of data points in the input series

Implementation Notes

- Compute min/max of x and y and produce a viewBox that includes padding; flip the Y axis as SVG origin is top-left.
- Keep the API simple; leave advanced styling to options.

Tests

- Unit tests should check presence of viewBox, polyline and that points count matches input series length.