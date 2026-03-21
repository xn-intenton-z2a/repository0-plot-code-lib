SVG_1_1

Table of contents
- viewBox attribute (syntax and semantics)
- Coordinate systems and units
- preserveAspectRatio behavior
- Mapping between user coordinates and viewport
- Supplementary implementation notes for plotting
- Reference details
- Digest and attribution

Normalized extract
viewBox attribute
- Syntax: viewBox="min-x min-y width height" where each is a number (can be integer or float).
- Semantics: viewBox defines the rectangle in user coordinates that maps to the element's viewport. The four numbers specify the top-left of the user coordinate rectangle and its size.

Coordinate systems and units
- SVG user coordinate system is defined by the viewBox; by default, the origin (0,0) is the top-left of the canvas and y increases downward.
- Units in viewBox are unitless numbers that map to CSS pixels or the element's viewport via scaling transforms.

preserveAspectRatio behavior
- preserveAspectRatio controls how the viewBox is scaled to the viewport. Common values: 'xMidYMid meet', 'xMinYMin slice', etc. 'meet' fits whole viewBox inside viewport preserving aspect ratio; 'slice' fills viewport cropping as needed.

Mapping between user coordinates and viewport
- Rendered coordinate (device pixel) = (SVG element viewport transform) * (user coordinate).
- Use viewBox + width/height attributes to control final raster size when converting SVG to PNG. To render high-resolution PNGs, increase the target pixel width/height rather than only scaling the SVG content.

Supplementary implementation notes for plotting
- Choose viewBox width/height to represent logical plotting area; map data coordinates to that area using linear transforms (see SVG_POLYLINE mapping formulas).
- When converting SVG to PNG, supply an explicit pixel width and height to the rasteriser to ensure correct DPI.

Reference details
- Source: W3C SVG 1.1 Recommendation
- URL: https://www.w3.org/TR/SVG11/

Digest
- Retrieved: 2026-03-21
- Crawl bytes: 15481 bytes

Attribution
- Content extracted and condensed from W3C Recommendation: Scalable Vector Graphics (SVG) 1.1 (Second Edition). Data retrieved 2026-03-21, 15481 bytes.
