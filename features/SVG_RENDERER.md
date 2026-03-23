# SVG_RENDERER

Status: Implemented

Overview

Render a data series into an SVG 1.1 string using a single polyline element and a viewBox attribute. Renderer maps data linearly into the viewBox and produces deterministic output for given inputs and options.

Behavior

- Expose renderSeriesToSvg(points, opts?) -> string.
- Default options include width, height, padding, stroke color and stroke width. Y coordinates are inverted to match SVG coordinate space.
- Output is a valid SVG 1.1 string with a viewBox attribute and a polyline element with scaled coordinates.

Acceptance criteria (testable)

- Returned SVG string contains a viewBox attribute.
- Returned SVG string contains a polyline element with a points attribute representing scaled coordinates.
- Renderer produces deterministic output for a given input and options so tests can assert exact substrings.

Testing notes

- Unit tests call renderSeriesToSvg with a small series and assert the presence of viewBox and polyline and expected coordinate formatting.

Implementation notes

- Implementation location: src/lib/main.js. Keep the math simple and avoid external SVG libraries to keep output readable and testable.
