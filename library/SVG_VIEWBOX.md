SVG_VIEWBOX

Table of contents
- Normalised extract: viewBox syntax and semantics
- Mapping data coordinate range to viewBox coordinates
- preserveAspectRatio and scaling behaviour
- Implementation patterns and examples (formulas)
- Reference details and attribute specifications
- Detailed digest and attribution

Normalised extract: viewBox syntax and semantics
- viewBox is a four-number attribute on the svg root that takes the form: min-x min-y width height
- It defines the internal coordinate system that the SVG content uses; the browser maps this coordinate box to the rendered viewport.

Mapping data range to viewBox coordinates
- To map a data domain x in [xMin,xMax], y in [yMin,yMax] into a viewBox of width VBW and height VBH:
  1. scaleX = VBW / (xMax - xMin)
  2. scaleY = VBH / (yMax - yMin)
  3. px = (x - xMin) * scaleX + minX_of_viewBox
  4. py = (yMax - y) * scaleY + minY_of_viewBox  (flip Y since SVG Y increases downward)
- Use uniform scaling (scale = min(scaleX, scaleY)) if aspect ratio preservation is required; offset to centre the content along the shorter axis.

preserveAspectRatio and scaling behaviour
- preserveAspectRatio controls alignment and whether to meet/meetOrSlice behaviour. Common value for plots: preserveAspectRatio="none" to stretch the coordinate system to exactly match the viewport, or use "xMidYMid meet" to preserve aspect ratio with centering.

Implementation patterns
- Choose an integer viewBox size for precision (e.g., VBW=800, VBH=400) and compute pixel coordinates using the formulas above.
- Add a margin/padding in data units or after scaling by expanding the data range by a small fraction (for ticks/labels) before computing scale.

Reference details
- Attribute: viewBox="min-x min-y width height"
- All four values are numbers; width and height must be positive.
- Invalid or missing viewBox produces different scaling semantics; explicit viewBox is recommended for reproducible plotting coordinates.

Detailed digest
- Source: MDN Web Docs — viewBox attribute
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
- Retrieved: 2026-03-21
- Data obtained during crawl: 180589 bytes

Attribution
- Condensed from MDN viewBox documentation, containing the exact attribute form and practical formulas to convert data ranges to SVG coordinates.