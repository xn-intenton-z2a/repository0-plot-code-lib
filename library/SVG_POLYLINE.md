SVG_POLYLINE

Table of contents
- Element overview
- points attribute format
- viewBox and coordinate mapping
- Mapping data series to polyline points (formulas)
- Common attributes used for plotting
- Supplementary details
- Reference details
- Digest and attribution

Normalized extract
Element overview
- <polyline> is an SVG shape defined by a list of points. It draws a sequence of straight line segments connecting the given points in order.
- Use a <polyline> to render a polyline-based plot where each data sample becomes a vertex.

points attribute format
- The points attribute is a list of coordinate pairs. Each coordinate pair is x,y. Pairs are separated by whitespace or a comma+whitespace delimiter.
- Example points string form: "x1,y1 x2,y2 x3,y3" (no trailing comma required).

viewBox and coordinate mapping
- viewBox attribute format: viewBox="min-x min-y width height" where each token is a number.
- viewBox defines a user coordinate system mapped to the element's viewport; coordinates in the points attribute are interpreted in user coordinates defined by the viewBox.
- SVG coordinate system has the origin at the top-left; increasing x goes right, increasing y goes down. To present a typical Cartesian plot (y up), invert or transform y coordinates when mapping data.

Mapping data series to polyline points (formulas)
- Given data arrays of (x, y) with domain [xMin, xMax] and range [yMin, yMax], and a viewBox with width W and height H and origin at (minX, minY):
  - px = minX + ((x - xMin) / (xMax - xMin)) * W
  - py = minY + H - ((y - yMin) / (yMax - yMin)) * H
- The subtraction from minY + H flips the y-axis so larger data values map upward in the rendered image.
- Round or format px,py to a limited number of decimal places to reduce SVG size.

Common attributes used for plotting
- stroke: color used for line stroke
- stroke-width: numeric width of the stroke
- fill: typically 'none' for line charts
- vector-effect: non-scaling-stroke (optional) to keep stroke width constant when scaled

Supplementary details
- For series with many points, consider decimation/sampling to limit polyline length and SVG size.
- Use viewBox and preserveAspectRatio carefully to preserve visual proportions when scaling output between SVG and PNG.

Reference details
- Element: polyline (SVG)
- Attribute: points — list of coordinate pairs; must parse as sequence of numbers where commas and spaces separate numbers/pairs.
- Coordinate system: as defined by the SVG viewBox and user coordinate system; positive y downwards by default.

Digest
- Source: MDN: <polyline> - SVG | MDN Web Docs
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
- Retrieved: 2026-03-21
- Crawl bytes: 174423 bytes

Attribution
- Content extracted and condensed from MDN Web Docs (<polyline>). Data retrieved 2026-03-21, 174423 bytes.
