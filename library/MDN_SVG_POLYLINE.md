NORMALISED_EXTRACT

Table of contents:
- Element purpose and semantics
- points attribute syntax and parsing rules
- Rendering-related attributes and defaults
- Coordinate scaling and mapping from data to SVG coordinates
- Implementation recipe for generating <polyline> from numeric series

Element purpose and semantics
- <polyline> draws a sequence of straight line segments connecting a list of points in order. It does not automatically close the shape; to create a closed polygon use <polygon> or repeat the first point as the last.

points attribute syntax and parsing rules
- The points attribute value is a series of coordinate pairs: x1,y1 x2,y2 x3,y3 ...
- Separators: pairs can be separated by whitespace and/or commas; numbers may be integers or decimal fractions and may include leading +/-. Examples of valid tokens: 0,0 10,20; 0 0 10 20; 0.5,3.25
- The attribute is parsed following SVG 1.1 tokenisation rules: consecutive numeric tokens are grouped into coordinate pairs; extraneous whitespace is ignored.

Rendering-related attributes (commonly used)
- stroke: paint used for the polyline stroke (default none if absent and fill none produces invisible polyline). For visible lines set stroke color and stroke-width.
- stroke-width: numeric, in user units (defaults to 1 if present), controls line thickness.
- fill: default none for polyline; setting fill fills the area enclosed by the polyline path (often undesirable for line plots).
- stroke-linecap, stroke-linejoin, vector-effect (e.g., non-scaling-stroke) are supported for appearance control.

Coordinate scaling and mapping
- The <svg> element's viewBox defines the user coordinate system. To map data domain [minX..maxX] and [minY..maxY] onto a viewBox (vbWidth,vbHeight) use:
  - scaleX := vbWidth / (maxX - minX)
  - scaleY := vbHeight / (maxY - minY)
  - svgX := (x - minX) * scaleX
  - svgY := vbHeight - (y - minY) * scaleY   (SVG Y grows downward so invert Y for conventional plots)
- Round or format coordinates to a reasonable decimal precision to reduce SVG size (e.g., 3-4 decimal places).

Implementation recipe for generating a polyline from numeric time series or expression samples
1. Determine numeric domain: minX, maxX, minY, maxY.
2. Choose svg viewBox width and height (e.g., 0 0 W H) where W and H are target user units.
3. For each data point (x,y) compute svgX and svgY using mapping above.
4. Emit a points string by concatenating pairs: "svgX,svgY svgX2,svgY2 ..." using space between pairs and comma between coordinates.
5. Create element markup: <svg viewBox="minX minY vbWidth vbHeight"> <polyline points="..." stroke="#000" fill="none" stroke-width="1" /> </svg>

SUPPLEMENTARY_DETAILS

- Performance: generating a single points attribute for thousands of points is efficient; for extremely large datasets consider downsampling or chunked rendering to limit DOM size.
- Accessibility: add role="img" and include a <title> and <desc> within svg for assistive technologies.

REFERENCE_DETAILS

- <polyline> attributes relevant to plotting: points (required), stroke, stroke-width, fill, transform, vector-effect.
- points attribute exact behaviour: sequence of numeric coordinate pairs parsed per SVG spec; no implicit units — numbers are in the current user coordinate system established by viewBox.

DETAILED_DIGEST

Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
Date retrieved: 2026-03-25
Data captured: ~175.4 KB

Extracted technical points used above: precise points syntax, rendering attributes, and guidance for coordinate mapping from data space into SVG user units.

ATTRIBUTION
MDN Web Docs — <polyline> (Mozilla). Condensed for direct implementation of plotting output.