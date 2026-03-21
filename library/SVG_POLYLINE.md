NORMALISED EXTRACT

Table of contents
- Element summary
- Points attribute grammar and coordinate list
- Visual attributes impacting rendering
- Polyline vs polygon
- Practical notes for generating SVG polyline from numeric series

1. Element summary
Element: polyline
Purpose: render a set of connected straight line segments between an ordered list of coordinate pairs.

2. Points attribute grammar
- points: a list of coordinate pairs separated by whitespace or commas
- Formal form: x1,y1 x2,y2 x3,y3 ...
- Coordinates are user-space numbers (floats allowed). Units are unitless numbers interpreted in current user coordinate system.

3. Visual attributes
- stroke: color used to draw the line
- stroke-width: line thickness
- fill: for polyline typical default is none; polyline does not close automatically; fill only fills if the shape is closed explicitly
- stroke-linejoin, stroke-linecap, stroke-dasharray control line rendering

4. Polyline vs polygon
- polyline: series of connected segments; does not automatically close. Default fill behavior is based on geometry; to close, duplicate first point or use polygon element.
- polygon: same points semantics but automatically treats path as closed and can be filled.

5. Practical notes for generating SVG from series
- Normalize numeric range to viewBox coordinates before generating 'points' list.
- Output format: points attribute should contain minimal whitespace and comma separators to reduce size: e.g., "0,0 10,10 20,5".
- Ensure viewBox and preserveAspectRatio are set so rendered coordinates map predictably to pixels.

SUPPLEMENTARY DETAILS
- Precision: render coordinate floats with a controlled decimal precision (e.g., 3 decimals) to limit file size.
- Large datasets: consider reducing point density or using polyline simplification algorithms to keep SVG sizes reasonable.

REFERENCE DETAILS
- Element: polyline (no nested child geometry), attributes of interest: points (string), fill (color), stroke (color), stroke-width (number), stroke-linejoin (miter|round|bevel), stroke-linecap (butt|round|square).
- Points parsing: conform to SVG number grammar; negative numbers and exponents allowed by spec.

DETAILED DIGEST
Source: MDN SVG polyline element
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced page (no bytes downloaded by this run)

ATTRIBUTION
MDN Web Docs - SVG polyline (developer.mozilla.org)
