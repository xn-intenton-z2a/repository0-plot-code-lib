MDN_VIEWBOX

Table of contents
1. viewBox attribute exact syntax
2. Coordinate system semantics
3. Using viewBox for data -> SVG mapping (implementation pattern)
4. preserveAspectRatio effects
5. Reference details
6. Detailed digest (retrieved)
7. Attribution and crawl size

1. viewBox attribute exact syntax
- Attribute name: viewBox
- Exact value format: four numbers separated by whitespace and/or commas, in order: min-x min-y width height
- Example textual form: "minX minY width height"
- All four numbers are required. width and height must be positive numbers.

2. Coordinate system semantics
- viewBox sets the user coordinate system for the SVG contents; it maps the specified rectangle in user space to the viewport established by the svg element's width/height.
- Coordinates inside child elements (e.g., polyline points) are interpreted using the viewBox transform.

3. Using viewBox for data -> SVG mapping (implementation pattern)
1. For a plotted dataset compute: minX = start, maxX = end, width = maxX - minX; minY = dataMin, height = dataMax - dataMin.
2. Set the svg element's viewBox to the four numbers: minX minY width height.
3. Use explicit svg width and height attributes to control output pixel dimensions; the viewBox will scale user coordinates into those pixels.
4. For typical plotting invert the Y axis when converting numeric data to svg coordinates (or map data so that greater data values correspond to smaller Y user coordinates depending on chosen coordinate orientation).

4. preserveAspectRatio effects
- The preserveAspectRatio attribute controls how the viewBox is scaled to the viewport: meet vs slice and alignment options (e.g., xMidYMid meet). Choose meet to preserve the whole data range without cropping.

5. Reference details
- viewBox must contain exactly 4 numeric values: min-x min-y width height.
- Non-integer and floating values are allowed.

6. Detailed digest (retrieved)
Source: MDN Web Docs "viewBox - SVG | MDN"
Retrieved: 2026-03-21
Crawl bytes downloaded: 81
Key extracted facts used above: exact numeric order and semantics of viewBox, and preserveAspectRatio behaviour.

7. Attribution
Source URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
Crawl size (bytes): 81
License / attribution: MDN content (see source site).