NORMALISED_EXTRACT

Table of contents:
- viewBox syntax and semantics
- Mapping user coordinates to viewport pixels
- preserveAspectRatio: options and effects
- Practical formulas for plotting (scale, translate)

viewBox syntax and semantics
- viewBox is specified as four numbers: "min-x min-y width height" and defines the user coordinate system for an SVG element.
- width and height must be positive numbers. The viewBox maps user-space coordinates to the viewport rectangle defined by the element's rendered size.

Mapping user coordinates to viewport pixels
- Given viewBox: [minX, minY, vbWidth, vbHeight] and viewport pixel size: [pxW, pxH], compute non-uniform scales:
  - scaleX := pxW / vbWidth
  - scaleY := pxH / vbHeight
- preserveAspectRatio controls whether to use a uniform scale (meet/slice) or allow non-uniform scaling (none). If uniform scaling is used:
  - if align meet: scale := min(scaleX, scaleY)
  - if align slice: scale := max(scaleX, scaleY)
- The final translation offsets (dx, dy) depend on align options (xMin/xMid/xMax and yMin/yMid/yMax) and are computed as (pxW - vbWidth*scale) * alignmentFactor where alignmentFactor is 0 for Min, 0.5 for Mid, 1 for Max.
- Pixel coordinate for a user point (ux, uy):
  - px := (ux - minX) * scale + dx
  - py := (uy - minY) * scale + dy

preserveAspectRatio: options and effects
- Syntax examples: preserveAspectRatio="xMidYMid meet" or "none".
- align values: xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax.
- meetOrSlice values: meet (default) preserves entire viewBox inside viewport; slice fills viewport and may crop.
- 'none' disables uniform scaling and allows independent scaleX and scaleY.

Practical plotting recommendations
- For deterministic mapping from data domain to pixel coordinates use an explicit viewBox with width and height equal to target plotting units and compute coordinates with the formulas above.
- When mapping numeric series into a polyline, invert the Y coordinate: svgY := vbHeight - scaledY (or use appropriate translate/scale transforms) so higher data values appear visually higher.

DETAILED_DIGEST

Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
Date retrieved: 2026-03-25
Data captured: ~176.4 KB

Extracted technical points used above: exact viewBox numeric ordering and the preserveAspectRatio options with their scaling semantics; included explicit formulas to convert data coordinates into final pixel positions.

ATTRIBUTION
MDN Web Docs — viewBox (Mozilla). Condensed for plotting math/time-series into SVG.