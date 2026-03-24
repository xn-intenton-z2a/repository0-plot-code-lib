# SVG_RENDERER

Summary
Render a numeric data series to SVG 1.1 using a single polyline element and a viewBox attribute so the output scales cleanly.

Specification
- API: renderSVG(points, options?) -> String containing SVG 1.1 markup.
- Input points are an array of {x: Number, y: Number} or numeric pairs; the renderer must compute a bounding box and map data coordinates to viewBox coordinates.
- Output requirements: the returned string must include an svg root element with xmlns and a viewBox attribute, and a polyline element whose points attribute contains the mapped coordinate pairs.

Acceptance criteria
- renderSVG returns a string that contains "<polyline" and contains the attribute viewBox=.
- The svg root includes the xmlns attribute for SVG 1.1 (http://www.w3.org/2000/svg).

Test plan
- Add tests/unit/svg.test.js to verify the presence of xmlns, viewBox, and polyline and to validate that the polyline points attribute is well-formed numeric pairs.

Files to change
- src/lib/main.js: export renderSVG implementation.
- tests/unit/svg.test.js: unit tests described above.
