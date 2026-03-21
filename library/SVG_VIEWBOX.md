NORMALISED EXTRACT

Table of contents
- viewBox attribute format
- Mapping user coordinates to viewport
- Interaction with width/height and preserveAspectRatio
- Numeric effects on scaling and translation

1. viewBox format
- viewBox value: four numbers "min-x min-y width height"
- Semantics: defines a rectangle in user coordinates that maps to the viewport rectangle of the SVG element.

2. Coordinate mapping
- To map a user-space point (ux, uy) to viewport coordinates (vx, vy):
  vx = (ux - min-x) * (viewportWidth / width)
  vy = (uy - min-y) * (viewportHeight / height)
- If viewBox aspect ratio differs from viewport, preserveAspectRatio controls alignment and scaling (see next section).

3. Interaction with explicit width/height and preserveAspectRatio
- If width/height are provided on the SVG element, the viewBox contents are scaled to fit those pixels according to preserveAspectRatio.
- preserveAspectRatio default is xMidYMid meet which scales uniformly and centers content.
- 'meet' preserves aspect ratio; 'slice' scales to cover viewport possibly cropping.

4. Numeric effects and precision
- Width and height in viewBox are user units; using a small width/height yields zoomed-in rendering.
- Use consistent min-x/min-y and width/height when generating viewBox from data ranges to ensure predictable mapping.

SUPPLEMENTARY DETAILS
- When programmatically generating SVG for plots, compute viewBox using data bounds with a small padding to avoid clipping points on edges.
- Example mapping: for y-values, invert vertical axis if plotting typical Cartesian y-up coordinate into SVG's y-down pixel coordinates by flipping the vy formula.

REFERENCE DETAILS
- Attribute: viewBox = "min-x min-y width height" (four numbers separated by whitespace and/or commas).
- Effects: defines initial user coordinate system; exact mapping formula given above.

DETAILED DIGEST
Source: MDN SVG viewBox attribute
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced page (no bytes downloaded by this run)

ATTRIBUTION
MDN Web Docs - SVG viewBox (developer.mozilla.org)
