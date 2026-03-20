NORMALISED EXTRACT

Table of Contents
1. Element overview
2. points attribute format and parsing
3. Visual attributes and recommended plot settings
4. Coordinate mapping and scaling
5. Accessibility and stroke/fill guidance

1. Element overview
- The SVG polyline element represents a series of connected straight line segments; useful for plotting a sequence of X,Y points.
- Polyline markup uses a points attribute containing coordinate pairs.

2. points attribute format and parsing
- points contains a whitespace and/or comma separated list of numeric coordinate pairs: pairs are x,y x,y ... or x y x y ....
- Accept both comma separators between x and y and spaces between pairs. Parsers should split on whitespace to get tokens then pair tokens into numeric coordinates.
- Coordinates are numbers (integer or floating point). Negative values allowed. Example token sequence: 0,10 20,30 40,10.

3. Visual attributes and recommended plot settings
- Common attributes used for plots: stroke (color), stroke-width (line thickness), fill should be set to none to avoid filling the polyline region.
- Example recommended attributes for a line plot: stroke=black, stroke-width=1, fill=none.

4. Coordinate mapping and scaling
- SVG coordinates increase to the right (x) and downwards (y). For plotting mathematical functions with y increasing upwards, invert the Y axis when mapping data to SVG coordinates: svgY = viewHeight - scaledY.
- Compute scaleX = viewWidth / (xMax - xMin) and scaleY = viewHeight / (yMax - yMin). Map a data point (x,y) to SVG point: ( (x - xMin)*scaleX, viewHeight - (y - yMin)*scaleY ).
- Round or format coordinates to reasonable precision (e.g., 2-3 decimal places) to reduce SVG size.

5. Accessibility and stroke/fill guidance
- Add role and title/desc elements for accessibility if required. Include aria-hidden or appropriate labels for programmatic consumption.

SUPPLEMENTARY DETAILS
- Use polyline rather than path for simple series because polyline produces compact readable points text and is supported across SVG 1.1 viewers.
- For dense datasets consider simplifying or decimating points before constructing the points attribute.

REFERENCE DETAILS (attributes and effects)
- element: polyline
- key attribute: points = list of numeric coordinate pairs in user coordinate space
- presentation attributes: stroke (color), stroke-width (number), fill (color|none), stroke-linejoin, stroke-linecap
- viewBox usage and scaling described in the companion document SVG_VIEWBOX

DETAILED DIGEST
- Source: MDN polyline documentation
- Retrieved: 2026-03-20
- Source URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
- Bytes fetched: 174423

ATTRIBUTION
- Technical details and parsing rules condensed from MDN SVG polyline documentation.