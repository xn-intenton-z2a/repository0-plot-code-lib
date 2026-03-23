VIEWBOX

Normalised extract

Table of contents
1. Attribute syntax
2. Coordinate transform semantics
3. Interaction with preserveAspectRatio
4. Implementation pattern for plotting data

Details

1. Attribute syntax
- viewBox attribute: four numbers: "min-x min-y width height"
- Example: viewBox="0 0 800 600"
- min-x and min-y set the origin of the user coordinate system; width and height set the size of the user coordinate system.

2. Coordinate transform semantics
- viewBox maps user coordinates to the viewport rectangle defined by the svg element's width and height attributes or CSS size.
- To map data values onto the viewBox, compute scaleX = viewBoxWidth / (dataXMax - dataXMin) and scaleY = viewBoxHeight / (dataYMax - dataYMin), and transform data points: ux = (x - dataXMin) * scaleX + min-x; uy = (dataYMax - y) * scaleY + min-y if flipping Y axis so that larger Y is upward in typical Cartesian plots.

3. Interaction with preserveAspectRatio
- preserveAspectRatio controls how aspect ratio is preserved when viewport and viewBox differ; commonly use "xMidYMid meet" or set explicit dimensions to avoid automatic scaling.

4. Implementation pattern for plotting data
- Choose a viewBox with width and height in convenient user units (e.g., 0..width, 0..height), compute scale and offsets as above, convert data points to SVG coordinates, and emit <polyline points="..."> with those numeric pairs.

Reference details
viewBox syntax: viewBox="min-x min-y width height" where each is a real number.

Digest
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
Retrieved: 2026-03-23
Downloaded bytes: 175325

Attribution
Content originated from MDN Web Docs (developer.mozilla.org). See source URL above.
