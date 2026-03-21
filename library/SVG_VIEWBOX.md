SVG_VIEWBOX

Table of contents
- Syntax and meaning
- Coordinate system mapping
- preserveAspectRatio behavior
- Recommended viewBox for plotting
- Implementation details and examples

Normalised extract
- viewBox attribute is four numbers: min-x min-y width height.
- It defines the user coordinate system that is mapped to the viewport; coordinates inside the SVG use this system.
- preserveAspectRatio controls how the user coordinate system is scaled and aligned within the viewport. Common value: "xMidYMid meet". "none" stretches to fill.

Coordinate mapping for plotting
- Select viewBox width to represent the x-range span and viewBox height to represent the y-range span (or pick a fixed pixel ratio and scale data into it).
- Example: viewBox="0 0 W H" and map data points into [0,W] x [0,H] using linear interpolation; invert Y as needed for graph orientation.

Implementation notes
- If responsive scaling is desired, use viewBox with an explicit width/height on the SVG element and let the browser scale the vector content.
- To avoid aspect-ratio distortion for numerical plots, consider preserveAspectRatio="none" and compute mapping to the target pixel rectangle explicitly.

Detailed digest (source and retrieval)
Source: MDN viewBox attribute
Retrieved: 2026-03-21
Crawled bytes: 175323
Attribution: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
