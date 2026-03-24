# SVG_RENDERER

Summary
Specify renderSVG which renders a numeric data series to valid SVG 1.1 using a single polyline and a viewBox attribute.

Specification
- Function: renderSVG(points, options?) -> string containing SVG 1.1 markup.
- Output requirements: svg root element must include xmlns="http://www.w3.org/2000/svg" and a viewBox attribute; the output must contain a polyline element whose points attribute contains mapped numeric coordinate pairs.
- Renderer computes a bounding box and maps data coordinates to pixel coordinates based on width, height and margin options.

Acceptance criteria
- renderSVG returns a string that contains the substring <polyline and contains a viewBox attribute and the SVG xmlns.
- The polyline points attribute is non-empty and contains numeric pairs separated by spaces and commas.

Test plan
- tests/unit/svg.test.js should assert presence of xmlns, viewBox and polyline and validate that points are numeric pairs.
