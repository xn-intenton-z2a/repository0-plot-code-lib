# SVG_RENDERER

Summary
Render a numeric data series to valid SVG 1.1 using a single polyline element and a viewBox attribute.

Specification
- Provide renderSvg(points, options) exported from src/lib/main.js.
- renderSvg accepts: points (array of {x, y}), width, height and padding and returns a string containing a valid SVG 1.1 document.
- The SVG root element must include xmlns="http://www.w3.org/2000/svg" and version="1.1" and include a viewBox attribute that frames the plotted polyline.
- Use a single polyline element with a points attribute containing scaled coordinates that fit the viewBox.
- Keep output free of external dependencies and return a string; allow options to customize stroke and fill minimally.

Files to change
- Implement renderSvg in src/lib/main.js.
- Add unit tests tests/unit/svg.test.js that validate presence of svg root, viewBox, xmlns and polyline.
- Add an example SVG in examples/example.svg for README demonstration.

Acceptance Criteria
- renderSvg returns a string containing an svg root element with a viewBox attribute.
- The returned string contains a polyline element with a non-empty points attribute.
- Unit tests assert presence of svg, viewBox, xmlns and polyline elements.
