# SVG_RENDERER

Summary
Render a numeric series to an SVG 1.1 document using a polyline element and a properly calculated viewBox.

Behavior
Implement renderSvg(points, options) that accepts an array of {x, y} points and returns an SVG string. The SVG must include an <svg> root with a viewBox attribute and a single <polyline> element whose points attribute contains the mapped coordinates. Options may expose width, height, margin, stroke, strokeWidth and fill behaviour.

API
Export a named function renderSvg from src/lib/main.js that returns a UTF-8 string containing valid SVG 1.1 markup with viewBox.

Acceptance Criteria
- renderSvg returns a string that contains the substring <polyline and contains a viewBox=" attribute on the svg root.
- The output is suitable for saving directly as an .svg file and rendering in browsers.
- The named export renderSvg exists in src/lib/main.js.
