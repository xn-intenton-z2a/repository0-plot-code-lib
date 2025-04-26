# SVG_PATH

## Crawl Summary
Commands: M/m (moveto), Z/z (closepath), L/l (lineto), H/h (horizontal), V/v (vertical), C/c (cubic Bézier), S/s (shorthand cubic), Q/q (quadratic Bézier), T/t (shorthand quadratic), A/a (elliptical arc). d property: none | <string>, must match EBNF. Flags: large-arc-flag, sweep-flag. Relative adds to current point. Negative radii: absolute. Zero radii: treat as lineto. Out-of-range: scale radii uniformly. DOM methods: getTotalLength, getPointAtLength, getPathSegAtLength, createSVGPathSeg*()

## Normalised Extract
Table of Contents:
1. 'd' Property Definition
2. Command Summary and Parameters
3. Relative vs Absolute Coordinates
4. Elliptical Arc Parameters and Flags
5. Implementation Adjustments

1. 'd' Property Definition
- Name: d
- Value: none or string matching svg-path EBNF
- Attributes: initial none, not inherited, animatable

2. Command Summary and Parameters
Moveto: M x y | m dx dy
Closepath: Z | z
Lineto: L x y | l dx dy
Horizontal: H x | h dx
Vertical: V y | v dy
Cubic Bézier: C x1 y1 x2 y2 x y | c dx1 dy1 dx2 dy2 dx dy
Shorthand Cubic: S x2 y2 x y | s dx2 dy2 dx dy
Quadratic Bézier: Q x1 y1 x y | q dx1 dy1 dx dy
Shorthand Quadratic: T x y | t dx dy
Arc: A rx ry xAxisRot largeArcFlag sweepFlag x y | a rx ry xAxisRot largeArcFlag sweepFlag dx dy

3. Relative vs Absolute Coordinates
- Absolute: use given coordinates
- Relative: resulting point = current point + delta

4. Elliptical Arc Parameters and Flags
- rx, ry: ellipse radii
- xAxisRot: rotation of x-axis in degrees
- largeArcFlag: 0 select arc ≤180°, 1 select ≥180°
- sweepFlag: 0 negative-angle, 1 positive-angle

5. Implementation Adjustments
- If endpoint==current: skip segment
- If rx or ry ==0: convert to lineto
- Negative rx or ry: abs(r)
- If no valid ellipse: scale r until ellipse just reaches endpoint

## Supplementary Details
1. EBNF fragment for numeric: coordinate: sign? number ('.' number)?
2. Flag values: '0' or '1'
3. PathLength attribute: defines nominal length; actual length = computed length scaled to pathLength if specified
4. DOM Interface instantiation: var path= document.querySelector('path'); var len= path.getTotalLength();
5. Error recovery: on invalid numeric, break number and continue at next separator

## Reference Details
API: SVGPathElement
Methods:
- getTotalLength(): float
- getPointAtLength(distance: float): { x: float; y: float }
- getPathSegAtLength(distance: float): unsigned long
- createSVGPathSegMovetoAbs(x: float, y: float): SVGPathSegMovetoAbs
- createSVGPathSegMovetoRel(dx: float, dy: float): SVGPathSegMovetoRel
- createSVGPathSegClosePath(): SVGPathSegClosePath
- createSVGPathSegLinetoAbs(x: float, y: float): SVGPathSegLinetoAbs
- createSVGPathSegLinetoRel(dx: float, dy: float): SVGPathSegLinetoRel
- createSVGPathSegCurvetoCubicAbs(x1: float, y1: float, x2: float, y2: float, x: float, y: float): SVGPathSegCurvetoCubicAbs
- createSVGPathSegCurvetoCubicRel(dx1: float, dy1: float, dx2: float, dy2: float, dx: float, dy: float): SVGPathSegCurvetoCubicRel
- createSVGPathSegCurvetoQuadraticAbs(x1: float, y1: float, x: float, y: float): SVGPathSegCurvetoQuadraticAbs
- createSVGPathSegCurvetoQuadraticRel(dx1: float, dy1: float, dx: float, dy: float): SVGPathSegCurvetoQuadraticRel
- createSVGPathSegArcAbs(rx: float, ry: float, xAxisRotation: float, largeArcFlag: boolean, sweepFlag: boolean, x: float, y: float): SVGPathSegArcAbs
- createSVGPathSegArcRel(rx: float, ry: float, xAxisRotation: float, largeArcFlag: boolean, sweepFlag: boolean, dx: float, dy: float): SVGPathSegArcRel

Examples:
var path= doc.createElementNS('http://www.w3.org/2000/svg','path');
path.setAttribute('d','M10 10 L100 100 z');
var len= path.getTotalLength();
var pt= path.getPointAtLength(len/2);

Best practices:
- Minimize path data size by eliding repeated commands and separators
- Use relative commands for compactness in repetitive patterns
- Pre-calculate radii adjustments for arcs to avoid runtime corrections

Troubleshooting:
Command: inspect path segments in console
developer> path.getPathSegAtLength(distance)
Expected: segment index under pointer



## Information Dense Extract
d: string|none; commands: M/m(x,y),Z/z(),L/l(x,y),H/h(x),V/v(y),C/c(x1,y1,x2,y2,x,y),S/s(x2,y2,x,y),Q/q(x1,y1,x,y),T/t(x,y),A/a(rx,ry,rot,largeArc(0|1),sweep(0|1),x,y); relative adds current point; flags 0|1; xAxisRot°; out-of-range radii: abs(), zero->lineto, scale up if insufficient; getTotalLength():float;getPointAtLength(d):{x,y}; createSVGPathSeg*() factory methods; elide repeated commands and separators for compactness.

## Sanitised Extract
Table of Contents:
1. 'd' Property Definition
2. Command Summary and Parameters
3. Relative vs Absolute Coordinates
4. Elliptical Arc Parameters and Flags
5. Implementation Adjustments

1. 'd' Property Definition
- Name: d
- Value: none or string matching svg-path EBNF
- Attributes: initial none, not inherited, animatable

2. Command Summary and Parameters
Moveto: M x y | m dx dy
Closepath: Z | z
Lineto: L x y | l dx dy
Horizontal: H x | h dx
Vertical: V y | v dy
Cubic Bzier: C x1 y1 x2 y2 x y | c dx1 dy1 dx2 dy2 dx dy
Shorthand Cubic: S x2 y2 x y | s dx2 dy2 dx dy
Quadratic Bzier: Q x1 y1 x y | q dx1 dy1 dx dy
Shorthand Quadratic: T x y | t dx dy
Arc: A rx ry xAxisRot largeArcFlag sweepFlag x y | a rx ry xAxisRot largeArcFlag sweepFlag dx dy

3. Relative vs Absolute Coordinates
- Absolute: use given coordinates
- Relative: resulting point = current point + delta

4. Elliptical Arc Parameters and Flags
- rx, ry: ellipse radii
- xAxisRot: rotation of x-axis in degrees
- largeArcFlag: 0 select arc 180, 1 select 180
- sweepFlag: 0 negative-angle, 1 positive-angle

5. Implementation Adjustments
- If endpoint==current: skip segment
- If rx or ry ==0: convert to lineto
- Negative rx or ry: abs(r)
- If no valid ellipse: scale r until ellipse just reaches endpoint

## Original Source
SVG Path Data Specification
https://www.w3.org/TR/SVG2/paths.html

## Digest of SVG_PATH

# SVG Path Data Specification

Retrieved: 2024-06-14

## 1. ‘path’ Element
- Categories: Graphics element, renderable element, shape element
- Content Model: Any number of: animation elements (animate, animateMotion, animateTransform, discard, set), descriptive elements (desc, title, metadata), paint server elements (linearGradient, radialGradient, pattern), clipPath, marker, mask, script, style
- Attributes:
  - Presentation: pathLength
  - Geometry properties: d
  - Core: id, tabindex, lang, xml:space, class, style
  - Conditional processing: requiredExtensions, systemLanguage
  - ARIA: aria-* list
  - Global events: on* list
  - Document events: oncopy, oncut, onpaste
  - Graphical events: onfocusin, onfocusout

## 2. Path Data (‘d’ Property)
- Name: d
- Value: none | <string> (must match svg-path EBNF)
- Initial: none
- Applies to: ‘path’
- Computed value: as specified
- Animatable: yes (discrete or numeric interpolation)
- Percentages: N/A

### 2.1 Syntax
- Commands: M/m, Z/z, L/l, H/h, V/v, C/c, S/s, Q/q, T/t, A/a
- Parameters: separated by optional spaces or commas; sign chars +/-; decimal point only U+002E
- EBNF: see Path data grammar section

### 2.2 Command Summary
M x y       moveto        start new subpath
m dx dy     relative moveto (if first, treated as absolute)
Z z         closepath     line to initial point, sets current to initial
L x y       lineto        draw line to absolute
l dx dy     relative lineto
H x         horizontal lineto absolute
h dx        relative horizontal
V y         vertical lineto absolute
v dy        relative vertical
C x1 y1 x2 y2 x y    cubic Bézier absolute
c dx1 dy1 dx2 dy2 dx dy    cubic Bézier relative
S x2 y2 x y  shorthand cubic Bézier absolute
s dx2 dy2 dx dy shorthand cubic Bézier relative
Q x1 y1 x y   quadratic Bézier absolute
q dx1 dy1 dx dy quadratic Bézier relative
T x y        shorthand quadratic Bézier absolute
t dx dy      shorthand quadratic Bézier relative
A rx ry xAxisRot largeArcFlag sweepFlag x y   arc absolute
a rx ry xAxisRot largeArcFlag sweepFlag dx dy  arc relative

### 2.3 Parameter Semantics
- Absolute: coordinates in user units
- Relative: added to current point (cpx, cpy)
- largeArcFlag/sweepFlag: boolean flags (0 or 1)
- xAxisRot: rotation angle in degrees

## 3. Implementation Notes
### 3.1 Out-of-range elliptical arc parameters
- Endpoint equals current: skip segment
- rx==0 or ry==0: treat as lineto
- negative rx or ry: take absolute
- if no solution, scale rx, ry uniformly until just sufficient

### 3.2 Reflected control points
- S/s and T/t use reflection of previous control

### 3.3 Zero-length segments
- skip in distance computations

### 3.4 Error handling
- On grammar mismatch: stop consuming, drop invalid commands, continue parsing
- Empty d or none disables rendering

## 4. Distance along path
- pathLength attribute defines a nominal length
- distanceAlongPath(d) returns point at distance d normalized by pathLength

## 5. DOM Interface: SVGPathElement
- Methods:
  - getTotalLength(): float
  - getPointAtLength(distance): SVGPoint { x: float, y: float }
  - getPathSegAtLength(distance): unsigned long
  - createSVGPathSegMovetoAbs(x, y)
  - createSVGPathSegMovetoRel(dx, dy)
  - ... (all segment types)

## 6. Path Data Grammar
- EBNF grammar definitions for path, command, coordinate, flag, etc.


## Attribution
- Source: SVG Path Data Specification
- URL: https://www.w3.org/TR/SVG2/paths.html
- License: License
- Crawl Date: 2025-04-26T11:46:00.896Z
- Data Size: 4808422 bytes
- Links Found: 185294

## Retrieved
2025-04-26
