SVG_POLYLINE

Table of contents
- Normalised extract: polyline usage for line plots
- Points attribute format and coordinate mapping
- Required SVG container attributes (viewBox and sizing)
- Styling attributes relevant to plots
- Mapping data series to polyline points (formulas)
- Reference details: attributes, types and effects
- Detailed digest and attribution

Normalised extract: polyline usage for line plots
- Use an SVG <polyline> element to represent a series of connected points as a single path element. Supply a string of coordinate pairs in the points attribute.

Points attribute format
- Syntax: points is a whitespace and/or comma separated list of numbers interpreted as pairs: "x1,y1 x2,y2 x3,y3" or "x1,y1,x2,y2". Numbers may be integers or floats.
- Coordinate order: The sequence defines vertices; the polyline draws straight segments between successive vertices in order.

Required SVG container attributes
- The parent <svg> should include a viewBox attribute to establish an internal coordinate system. Example form: viewBox="minX minY width height".
- For pixel-sized output set the svg element width and height attributes (CSS or attributes). The viewBox maps internal coordinates to the rendered size.

Styling attributes relevant to plots
- fill: fill color for the shape created if closed. For open line plots use fill="none".
- stroke: color used to draw the line segments (required to be visible if fill="none").
- stroke-width: numeric width in user units.
- stroke-linecap and stroke-linejoin: control end-cap and corner rendering (butt, round, square; miter, round, bevel).

Mapping data series to polyline points (formulas)
- Given numeric data pairs (xData[i], yData[i]) and desired viewport size viewWidth, viewHeight and data domain xMin,xMax,yMin,yMax:
  1. scaleX = viewWidth / (xMax - xMin)
  2. scaleY = viewHeight / (yMax - yMin)
  3. px = (x - xMin) * scaleX
  4. py = viewHeight - ( (y - yMin) * scaleY )    (invert Y because SVG origin is top-left)
- Compose points string by joining pairs: "px1,py1 px2,py2 px3,py3" using decimal precision appropriate for output (e.g., 2-3 fractional digits).
- Omit points with non-finite coordinates (NaN, Infinity) or split into separate polylines when encountering gaps in series.

Reference details
- <polyline> attributes (relevant subset):
  - points: string (list of coordinate pairs)
  - fill: paint (use none for line plots)
  - stroke: paint (color string)
  - stroke-width: number
  - stroke-linejoin: miter|round|bevel
  - stroke-linecap: butt|round|square
  - transform: transform list (matrix, translate, scale, etc.)
- Rendering note: A polyline does not close automatically; a closed polygon is <polygon>.

Detailed digest
- Source: MDN Web Docs — <polyline> element
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
- Retrieved: 2026-03-21
- Data obtained during crawl: 179655 bytes

Attribution
- Extracted from MDN polyline documentation and condensed into step-by-step implementation patterns for mapping numeric series to SVG polyline points.