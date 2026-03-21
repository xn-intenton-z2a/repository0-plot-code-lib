SVG_POLYLINE

Table of contents
- Element purpose
- points attribute format
- Common attributes (fill, stroke, stroke-width, stroke-linecap)
- Coordinate mapping for plotting
- Implementation pattern (scaling data -> points string)
- Troubleshooting

Normalised extract
- The polyline element draws straight line segments connecting a set of points.
- points attribute format: a sequence of coordinate pairs separated by spaces or commas: x1,y1 x2,y2 x3,y3 ...
- Common attributes: fill (default none for stroke-only lines), stroke (color), stroke-width, stroke-linecap, stroke-linejoin.

Coordinate mapping (plot implementation specifics)
- Choose an internal user coordinate system via viewBox (minX minY width height).
- Map data x to px: px = ((x - minX) / (maxX - minX)) * viewWidth
- Map data y to py with inverted Y for typical graph orientation: py = viewHeight - ((y - minY) / (maxY - minY)) * viewHeight
- Build points string by concatenating pairs with a single space between points and comma between x and y: "px1,py1 px2,py2 ..."
- Ensure numeric formatting uses a small fixed precision to reduce SVG size (e.g., toFixed(2) or truncation).

Implementation pattern
1. Compute data bounds (minX, maxX, minY, maxY).
2. Compute viewWidth and viewHeight from viewBox or chosen pixel size.
3. Map each sample (x,y) to (px,py) using formulas above.
4. Join coordinate pairs into a single points string and emit <polyline points="..." fill="none" stroke="#..." />.

Troubleshooting
- Missing points produce no visible line; ensure non-empty points string.
- If the line appears inverted or clipped, check sign and order of viewBox and the y-mapping inversion.
- Very large numbers may overflow viewBox mapping; normalize to a reasonable scale.

Detailed digest (source and retrieval)
Source: MDN SVG polyline element
Retrieved: 2026-03-21
Crawled bytes: 174423
Attribution: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
