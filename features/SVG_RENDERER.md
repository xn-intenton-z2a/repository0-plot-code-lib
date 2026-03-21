# SVG_RENDERER

Summary
Render a numeric data series to SVG 1.1 using polyline elements and a viewBox attribute so output scales correctly.

Goals
- Provide a renderer that accepts an ordered series of numeric points and returns a valid SVG string containing a polyline.
- Ensure the SVG includes a viewBox attribute and appropriate width/height metadata.

API Contract
- renderSvg(series, options) -> String
  - series is Array<{ x: Number, y: Number }>
  - options may include width, height, margin, stroke, fill, and coordinate transforms.

Behavior and constraints
- Output must be valid SVG 1.1 and include a single or named polyline element with a points attribute containing the coordinate list.
- viewBox must be present and reflect the coordinate bounding box used for the polyline.

Acceptance Criteria
- renderSvg returns a string containing the substring <polyline and a viewBox attribute viewBox="...").
- The polyline points count corresponds to the series length and the SVG string is well-formed XML text suitable for saving to .svg files.

Deliverables
- Named export renderSvg from src/lib/main.js and unit tests that assert presence of <polyline and viewBox and correct point counts.

Notes
- Keep transforms explicit and document how input data maps to SVG coordinates in the README.