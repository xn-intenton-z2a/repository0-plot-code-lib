SVG_VIEWBOX

Table of Contents:
1. viewBox attribute syntax
2. Interaction with width/height and scaling behavior
3. Coordinate system rules used for plotting
4. preserveAspectRatio considerations

1. viewBox syntax (exact form)
- viewBox is four numbers separated by whitespace or commas: "minX minY width height"
- Example: viewBox="0 0 800 600"
- Interpretation: user coordinate system origin (minX,minY) and user coordinate extents (width,height)

2. Interaction with width/height and scaling
- The SVG viewport maps the viewBox user coordinates to the element's rendered width/height CSS/attribute sizes.
- If width/height attributes are omitted, the intrinsic dimensions are defined by viewBox; rendering engines scale to available CSS size.
- Default preserveAspectRatio is "xMidYMid meet" which preserves aspect ratio and centers the viewBox inside the viewport.

3. Coordinate system rules used for plotting
- The viewBox defines the coordinate range used by mapping formulas (see SVG_POLYLINE): x in [minX, minX+width] maps to [0..vbW], y mapping may need inversion so that larger numeric y maps visually upward.
- Use an integer pixel viewBox (e.g., width 800, height 600) for predictable rendering and then scale with CSS or rasterization density.

4. preserveAspectRatio considerations for plots
- For pixel-accurate plots prefer preserveAspectRatio="none" when you want 1:1 mapping from user coordinates to pixels stretched to the exact output size.
- When preserving aspect ratio, ensure axes and tick marks are scaled consistently; otherwise compute explicit viewBox size that matches desired output ratio.

Detailed digest
Content retrieved from https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox on 2026-03-22.
This document records the exact viewBox number ordering semantics and how it determines the user coordinate system for mapping data points into SVG space; key formulas and preserveAspectRatio choices are included for deterministic plotting.

Attribution
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
Bytes retrieved: 175325
