# BASIC_SHAPES

## Crawl Summary
SVG uses a user coordinate system with origin at top-left. The <svg> root accepts width, height, viewBox and preserveAspectRatio for scaling. Basic shape elements include <rect>, <circle>, <ellipse>, <line>, <polyline>, and <polygon>, each with specific required attributes (e.g. rect: x,y,width,height; circle: cx,cy,r). Fill, stroke, stroke-width and opacity attributes control rendering. Common pitfalls include missing fill/stroke and undefined viewport. Best practices include defining viewBox for responsiveness, grouping with <g>, and using half-pixel offsets for sharp strokes.

## Normalised Extract
Table of Contents:
1 Coordinate System
2 Rectangle (<rect>)
3 Circle (<circle>)
4 Ellipse (<ellipse>)
5 Line (<line>)
6 Polyline (<polyline>)
7 Polygon (<polygon>)
8 Best Practices & Troubleshooting

1 Coordinate System
 User units default to px. <svg> attributes: width, height, viewBox="minX minY width height", preserveAspectRatio="align meetOrSlice".

2 Rectangle (<rect>)
 Required: x (default 0), y (default 0), width (>0), height (>0). Optional corner radii: rx, ry. Styling: fill, fill-opacity, stroke, stroke-width, stroke-opacity.

3 Circle (<circle>)
 Required: cx (default 0), cy (default 0), r (>0). Styling same as <rect>.

4 Ellipse (<ellipse>)
 Required: cx, cy, rx (>0), ry (>0). Styling same.

5 Line (<line>)
 Required: x1, y1, x2, y2. Must set stroke and stroke-width to render.

6 Polyline (<polyline>)
 Required: points="x1,y1 x2,y2…". Default fill="none". Set stroke & stroke-width.

7 Polygon (<polygon>)
 Same as polyline but auto-closed and default fill="black".

8 Best Practices & Troubleshooting
 Always define viewport via width/height or viewBox. Use viewBox+preserveAspectRatio for responsiveness. Missing fill/stroke causes invisibility. Group shapes with <g>. To render crisp lines, offset coordinates by 0.5.

## Supplementary Details
• Units: default user unit = px; append unit identifiers for other units.
• viewBox: defines user coordinate system origin and scale. Syntax: viewBox="minX minY width height".
• preserveAspectRatio values: xMinYMin, xMidYMid, xMaxYMax + meet or slice.
• Grouping: <g transform="translate(tx,ty) scale(s)"> … </g>.
• Sharp 1px strokes: coordinate align on half-pixel (e.g. x="0.5").
• Nested shapes inherit current fill, stroke properties unless overridden.
• When animating shape attributes, use SMIL or CSS animations on attributes (e.g. <animate attributeName="r" from="10" to="50" dur="2s"/>).

## Reference Details
Element: <rect>
 Attributes:
  x: number; defaults 0
  y: number; defaults 0
  width: number; required ≥0
  height: number; required ≥0
  rx: number; defaults 0
  ry: number; defaults 0
  fill: color; defaults black
  fill-opacity: 0.0–1.0; default 1.0
  stroke: color; defaults none
  stroke-width: number; default 1
  stroke-opacity: 0.0–1.0; default 1.0
Example:
<rect x="10" y="20" width="100" height="50" rx="5" ry="5" fill="#0F0" stroke="#060" stroke-width="2"/>

Element: <circle>
 Attributes:
  cx: number; default 0
  cy: number; default 0
  r: number; required >0
  same style attributes as <rect>
Example:
<circle cx="50" cy="50" r="40" fill="red" stroke="black" stroke-width="5"/>

Element: <ellipse>
 Attributes:
  cx, cy as above
  rx: number; required >0
  ry: number; required >0
Example:
<ellipse cx="75" cy="50" rx="70" ry="30" fill="purple"/>

Element: <line>
 Attributes:
  x1, y1, x2, y2: number; required
  stroke: color; required
  stroke-width: number; default 1
Example:
<line x1="10" y1="10" x2="200" y2="10" stroke="#333" stroke-width="2"/>

Element: <polyline>
 Attributes:
  points: coord list; required
  fill: none by default
  stroke: color; required
  stroke-width: number; default 1
Example:
<polyline points="0,0 50,25 50,75 100,100" stroke="blue" fill="none" stroke-width="3"/>

Element: <polygon>
 Same as <polyline> but auto-closed and default fill="black".

Troubleshooting:
 If nothing renders, check that either fill or stroke is set and viewport size is defined. Use browser devtools to inspect computed coordinates. For unexpected scaling, verify viewBox and preserveAspectRatio syntax.


## Information Dense Extract
SVG viewport: width,height,viewBox(minX,minY,w,h),preserveAspectRatio(align meet|slice). Units: default px. Shapes:
rect(x,y, width,height, rx?,ry?)
circle(cx,cy, r)
ellipse(cx,cy, rx,ry)
line(x1,y1, x2,y2)
polyline(points)
polygon(points). Style attrs: fill(color),fill-opacity, stroke(color),stroke-width,stroke-opacity. Defaults: rect fill black, polygon fill black, others fill none. Must set stroke for lines. Use viewBox for responsive. Offset coordinates by 0.5 for crisp strokes.

## Sanitised Extract
Table of Contents:
1 Coordinate System
2 Rectangle (<rect>)
3 Circle (<circle>)
4 Ellipse (<ellipse>)
5 Line (<line>)
6 Polyline (<polyline>)
7 Polygon (<polygon>)
8 Best Practices & Troubleshooting

1 Coordinate System
 User units default to px. <svg> attributes: width, height, viewBox='minX minY width height', preserveAspectRatio='align meetOrSlice'.

2 Rectangle (<rect>)
 Required: x (default 0), y (default 0), width (>0), height (>0). Optional corner radii: rx, ry. Styling: fill, fill-opacity, stroke, stroke-width, stroke-opacity.

3 Circle (<circle>)
 Required: cx (default 0), cy (default 0), r (>0). Styling same as <rect>.

4 Ellipse (<ellipse>)
 Required: cx, cy, rx (>0), ry (>0). Styling same.

5 Line (<line>)
 Required: x1, y1, x2, y2. Must set stroke and stroke-width to render.

6 Polyline (<polyline>)
 Required: points='x1,y1 x2,y2'. Default fill='none'. Set stroke & stroke-width.

7 Polygon (<polygon>)
 Same as polyline but auto-closed and default fill='black'.

8 Best Practices & Troubleshooting
 Always define viewport via width/height or viewBox. Use viewBox+preserveAspectRatio for responsiveness. Missing fill/stroke causes invisibility. Group shapes with <g>. To render crisp lines, offset coordinates by 0.5.

## Original Source
MDN Scalable Vector Graphics Reference
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial

## Digest of BASIC_SHAPES

# Coordinate System

SVG defines a user coordinate system whose origin (0,0) is the top-left corner of the viewport. Coordinates and lengths default to "px" units unless a unit identifier (e.g. "cm", "em") is appended. The root <svg> element can include:

• width, height: viewport size (required unless inherited)
• viewBox: "minX minY width height" to define user units and scaling
• preserveAspectRatio: "[align] [meetOrSlice]" (default "xMidYMid meet") to control scaling alignment

# Rectangle: <rect>

Syntax:
<rect x="{number}" y="{number}" width="{number}" height="{number}" rx="{number}" ry="{number}" fill="{color}" stroke="{color}" stroke-width="{number}"/>

Attributes:
• x, y (number; default 0): top-left corner of the rectangle in user units
• width, height (number; required ≥0): size of the rectangle
• rx, ry (number; default 0): horizontal and vertical corner radii
• fill, fill-opacity: paint and opacity of interior
• stroke, stroke-width, stroke-opacity: outline paint, width, and opacity

Example:
<svg width="200" height="100" viewBox="0 0 200 100">
  <rect x="10" y="10" width="180" height="80" rx="10" ry="10" fill="#4A90E2" stroke="#004A80" stroke-width="4"/>
</svg>

# Circle: <circle>

Syntax:
<circle cx="{number}" cy="{number}" r="{number}" fill="{color}" stroke="{color}" stroke-width="{number}"/>

Attributes:
• cx, cy (number; default 0): center coordinates
• r (number; required >0): radius
• style attributes for fill, stroke as above

Example:
<svg width="120" height="120">
  <circle cx="60" cy="60" r="50" fill="red" stroke="black" stroke-width="5"/>
</svg>

# Ellipse: <ellipse>

Syntax:
<ellipse cx="{number}" cy="{number}" rx="{number}" ry="{number}"/>

Attributes:
• cx, cy (number; default 0): center
• rx, ry (number; required >0): radii on x and y axes

# Line: <line>

Syntax:
<line x1="{number}" y1="{number}" x2="{number}" y2="{number}"/>

Attributes:
• x1, y1: start point
• x2, y2: end point
• stroke, stroke-width required to make line visible

# Polyline: <polyline>

Syntax:
<polyline points="x1,y1 x2,y2 x3,y3…"/>

Attributes:
• points (list of coordinate pairs; required)
• fill default none; stroke must be set

# Polygon: <polygon>

Same as polyline but interior automatically closed and fill defaults to black.

# Best Practices & Troubleshooting

• Always set width and height or viewBox on the root <svg> to define coordinate system.
• If shape not visible, ensure fill or stroke (with stroke-width>0) is defined.
• Use viewBox + preserveAspectRatio for responsive graphics.
• When combining shapes, group them in <g> and apply transformations collectively.
• For crisp 1px lines, use half-pixel offsets (e.g. x1="0.5", x2="100.5").

Retrieved: 2025-06-01
Data size: 1.1 MB


## Attribution
- Source: MDN Scalable Vector Graphics Reference
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
- License: CC-BY-SA
- Crawl Date: 2025-05-11T03:21:08.742Z
- Data Size: 1118611 bytes
- Links Found: 29937

## Retrieved
2025-05-11
