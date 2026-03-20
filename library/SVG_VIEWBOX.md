NORMALISED EXTRACT

Table of Contents
1. viewBox attribute syntax
2. Coordinate system mapping
3. Aspect ratio and preserveAspectRatio (detailed)
4. Practical mapping for plots
5. Examples of numeric mapping (no code fences)

1. viewBox attribute syntax
- viewBox has four numbers: min-x, min-y, width, height. The attribute is written as four numbers separated by whitespace and/or commas: min-x min-y width height.
- It defines the user coordinate system that is mapped into the viewport rectangle.

2. Coordinate system mapping
- The viewBox acts as a rectangle in user coordinates. The viewport (actual SVG element size) is scaled to fit that rectangle according to preserveAspectRatio rules.
- Coordinates inside the SVG are interpreted in user coordinates defined by the viewBox.

3. Aspect ratio and preserveAspectRatio (detailed)
- preserveAspectRatio controls how the viewBox is fitted into the viewport. Syntax: preserveAspectRatio="[align] [meetOrSlice]" where align is one of:
  - none
  - xMinYMin
  - xMidYMin
  - xMaxYMin
  - xMinYMid
  - xMidYMid
  - xMaxYMid
  - xMinYMax
  - xMidYMax
  - xMaxYMax
- meetOrSlice may be either "meet" (default) or "slice". When omitted, "meet" is used.
- Default value: xMidYMid meet
- preserveAspectRatio="none" stretches the viewBox to fill the viewport without preserving aspect ratio.
- For plots where exact axis-to-pixel mapping is required, use preserveAspectRatio="none" and compute coordinates to match the viewBox and viewport dimensions exactly.

4. Practical mapping for plots
- Set viewBox to [xMin, yMin, xRange, yRange] where xRange = xMax - xMin and yRange = yMax - yMin.
- Because SVG Y axis grows downward, mapping data where Y increases upward must invert Y when producing coordinates as described in SVG_POLYLINE: svgY = yMax - y.
- Choose viewBox min-y = 0 and flip coordinates during point generation, or set min-y = yMin and invert during mapping to keep origin consistent.

5. Examples of numeric mapping (described)
- If data X in [-3.14, 3.14] and Y in [-1, 1], set viewBox to -3.14 -1 6.28 2.0 and map x to (x - xMin) and y to (y - yMin) with y inverted as needed, then format points into the polyline points attribute.

SUPPLEMENTARY DETAILS
- Use floating-point precision control to avoid extremely long numeric text in the points attribute.
- When exporting to PNG via rasterizers, set the SVG width/height attributes or use a renderer option to set output pixel density.

REFERENCE DETAILS
- viewBox semantics: viewBox = min-x min-y width height
- preserveAspectRatio options and default: align values listed above; meetOrSlice: meet | slice; default: xMidYMid meet

DETAILED DIGEST
- Source: MDN preserveAspectRatio and viewBox documentation
- Retrieved: 2026-03-20
- Source URLs: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox and https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
- Bytes fetched (approx): 200 KB total

ATTRIBUTION
- Condensed from MDN and the SVG specification (MDN pages retrieved 2026-03-20).