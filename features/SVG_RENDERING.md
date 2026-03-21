# SVG_RENDERING

Summary
Render a numeric series to an SVG 1.1 string using a polyline element and include a viewBox attribute to enable scalable rendering.

Specification
- Provide a named export renderSvg(points, options) where points is an array of {x:number,y:number} and options may include width, height, padding and stroke parameters.
- The produced SVG string must declare an SVG 1.1 root element, include a viewBox attribute, and contain a polyline element representing the mapped points.
- Mapping from data coordinates to viewBox space should produce a polyline points list with the same number of coordinate pairs as input points.

Acceptance Criteria
- renderSvg is exported as a named export from src/lib/main.js.
- Calling renderSvg with a non-empty series returns a string containing the substring <polyline and the substring viewBox=.
- The polyline points attribute contains the same number of coordinate pairs as the input points length.

Testing notes
- Unit tests should inspect the SVG string for viewBox and polyline and verify the points count matches the input series.