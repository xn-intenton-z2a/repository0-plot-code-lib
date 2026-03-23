SVG_RENDERER

Overview

Render a data series into an SVG 1.1 string using a single polyline element and a viewBox attribute. The renderer provides deterministic layout parameters to make unit tests straightforward.

Behavior

- Expose a named export renderSvg(points, opts) where points is an array of {x, y}. Options allow width, height, padding and stroke settings; defaults are provided.
- The renderer scales and translates input data to fit the viewBox and outputs a valid SVG 1.1 string containing a viewBox attribute and a polyline element with scaled points.
- Y coordinates must be inverted to match SVG coordinate space where y increases downward.

API

- renderSvg(points, options?) -> string (SVG)
  - Default viewBox maps to 0 0 width height.  
  - points are mapped into viewBox coordinate space using simple linear scaling.

Acceptance criteria

- The returned SVG string contains a viewBox attribute.  
- The string contains a polyline element with a points attribute representing scaled coordinates.  
- Renderer produces deterministic output for a given input and options so tests can assert exact substrings.

Testing

- Unit tests should call renderSvg with a simple two- or three-point series and assert presence of viewBox and polyline and that coordinate formatting is as expected.

Implementation notes

- Keep the math simple and document how data maps to pixel coordinates. Avoid external SVG libraries; produce a minimal, readable SVG string.