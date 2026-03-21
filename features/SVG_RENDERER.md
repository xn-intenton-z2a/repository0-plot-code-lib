# SVG_RENDERER

Overview
This feature defines rendering of a numeric data series to SVG 1.1 using a single polyline element and a viewBox attribute. Output must be standalone SVG markup as a string.

Specification
- Provide a named export renderSvg(series, options?) that accepts an array of points [{x:number, y:number}] and returns a string containing valid SVG 1.1 markup.
- The SVG root element must include xmlns and version attributes and a viewBox attribute with numeric values describing the coordinate system. The polyline element must be used to render the series points via its points attribute.
- Options may include width, height, margin, stroke, strokeWidth, and fill behavior. When creating pixel coordinates flip the y axis appropriately so higher y values render visually upward or document chosen coordinate convention.
- No external dependencies required for SVG output.

Rationale
SVG output is a primary export format required in the mission and must be valid SVG 1.1 with a viewBox to enable scaling.

Acceptance criteria
- renderSvg returns a string that contains the substring <polyline and contains a viewBox attribute on the svg root element.
- The polyline element includes a points attribute with coordinate pairs corresponding to sampled series values.

Implementation notes
- Export renderSvg from src/lib/main.js and add unit tests that check for presence of polyline and viewBox attributes and that the points string contains numeric coordinate pairs.