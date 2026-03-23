SVG_POLYLINE

Normalised extract

Table of contents
1. Element overview
2. points attribute format
3. Visual attributes affecting rendering
4. Integration with viewBox and coordinate mapping

Details

1. Element overview
- The SVG polyline element draws a set of connected straight line segments between a list of points.
- It is part of SVG 1.1 and can appear inside an <svg> root element with a viewBox attribute for coordinate mapping.

2. points attribute format
- Attribute: points
- Value: whitespace- or comma-separated list of coordinate pairs: "x1,y1 x2,y2 x3,y3 ..."
- Coordinates are numbers (can be integers or floats). Example sequence: 0,0 10,10 20,0
- An element using polyline must set attributes for stroke to be visible; default fill is none for polyline (unlike polygon which may fill).

3. Visual attributes affecting rendering
- stroke: color string (e.g., #000000 or rgb(0,0,0)) — required to render lines visibly
- stroke-width: number (units are user coordinate units unless CSS units are used with explicit width)
- fill: commonly none for polyline
- stroke-linecap, stroke-linejoin control end and join styles

4. Integration with viewBox and coordinate mapping
- The raw points correspond to the SVG user coordinate system defined by the svg element's viewBox and width/height. To render a data series, map data X,Y to user coordinates and emit those numeric pairs in points.
- For large numbers of points, prefer a single polyline element with a long points attribute rather than many separate line elements for performance.

Reference details (signatures / attribute grammar)
<polyline points="x1,y1 x2,y2 ..." fill="none" stroke="color" stroke-width="n" />
- points: string — coordinate pairs separated by spaces (or commas)
- fill: paint | none
- stroke: paint
- stroke-width: number | length

Digest
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
Retrieved: 2026-03-23
Downloaded bytes: 174421

Attribution
Content originated from MDN Web Docs (developer.mozilla.org). See source URL above.
