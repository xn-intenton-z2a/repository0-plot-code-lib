SVG_POLYLINE

Table of contents
1. Element summary
2. 'points' attribute format
3. Coordinate formats and units
4. Styling and attributes that matter
5. Implementation pattern for plotting series
6. Supplementary details
7. Reference details
8. Detailed digest
9. Attribution

Normalised extract
Element summary
- The SVG element polyline represents a set of connected straight line segments defined by coordinates in the 'points' attribute.

'points' attribute format
- The attribute is a list of numbers representing coordinate pairs: one of the accepted lexical forms is "x1,y1 x2,y2 x3,y3" (space-separated points with comma-separated x,y pairs). A compact form "x1,y1,x2,y2,..." is also accepted.
- Coordinates are in the current user coordinate system defined by the outer SVG 'viewBox' and transform attributes.

Coordinate formats and units
- Coordinates are unitless numbers in user coordinate units (not CSS px unless viewBox is set to match pixel width/height).
- Decimal numbers are allowed; use consistent numeric formatting (e.g., 3 decimal places) to reduce SVG size.

Styling and attributes that matter
- Common attributes to set for line plots: stroke (color), stroke-width, stroke-linejoin, stroke-linecap, fill="none" (to prevent polygon filling), vector-effect="non-scaling-stroke" if stroke width should remain constant when scaling.
- For closed shapes use polygon; polyline does not automatically close.

Implementation pattern for plotting a numeric series
1. Map the data series (x_i, y_i) into SVG user coordinates given a chosen viewBox and dimensions.
2. Compute a points string by concatenating mapped coordinate pairs with spaces between points and commas between coordinates: "x0,y0 x1,y1 x2,y2...".
3. Create the element: <polyline points="..." stroke="#000" fill="none" stroke-width="1" /> and include a containing <svg viewBox="minX minY width height" ...>.
4. To reduce output size, optionally round coordinates to a fixed number of decimals before concatenation.

Supplementary details
- When generating many points, consider downsampling (e.g., by step or decimation) to keep SVG file sizes reasonable.
- Use viewport transforms (e.g., viewBox combined with width/height attributes) rather than embedding transforms in each point.

Reference details
- Element: polyline
- Key attribute: points (string) with coordinate pairs
- Behaviour: draws straight-line segments between successive points in the list; not closed by default

Detailed digest
- Source: MDN polyline reference
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
- Retrieved: 2026-03-27
- Data size obtained during crawl: approximately 175 KB

Attribution
- Source: MDN Web Docs (Mozilla). Use the 'points' attribute format as specified; set fill="none" for line plots.