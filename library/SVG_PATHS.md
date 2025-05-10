# SVG_PATHS

## Crawl Summary
path element: <path> tag with required d attribute (path-data string) and optional numeric pathLength (default 0) for explicit length normalization. Path data syntax: commands [M,m,L,l,H,h,V,v,C,c,S,s,Q,q,T,t,A,a,Z,z] with precise parameter counts. Number grammar: optional sign, integer, optional fraction, optional exponent. EBNF grammar defines sequence structure. Elliptical arcs: rx, ry clamped to positive, skip zero-length. Smooth commands infer control points. Zero-length segments ignored. Invalid commands skip segment. pathLength normalization factor = pathLength/computedLength if >0, else 1. SVGPathElement interface: getTotalLength(), getPointAtLength(), isPointInFill(), isPointInStroke(); attribute pathLength.

## Normalised Extract
Table of Contents:
1 Path Element
2 Path Data Syntax and Commands
3 Number Grammar
4 Path Data Grammar
5 Implementation Notes
6 Distance Along Path
7 DOM Interfaces

1 Path Element
 Tag: path
 Attributes:
  d: string (path-data, mandatory)
  pathLength: number (optional, default 0)

2 Path Data Syntax and Commands
 Commands and parameter counts:
  M x y        moveto absolute
  m dx dy      moveto relative
  L x y        lineto absolute
  l dx dy      lineto relative
  H x          horizontal lineto absolute
  h dx         horizontal lineto relative
  V y          vertical lineto absolute
  v dy         vertical lineto relative
  C x1 y1 x2 y2 x y  cubic Bézier absolute
  c dx1 dy1 dx2 dy2 dx dy  cubic Bézier relative
  S x2 y2 x y  smooth cubic Bézier absolute
  s dx2 dy2 dx dy  smooth cubic Bézier relative
  Q x1 y1 x y  quadratic Bézier absolute
  q dx1 dy1 dx dy  quadratic Bézier relative
  T x y        smooth quadratic Bézier absolute
  t dx dy      smooth quadratic Bézier relative
  A rx ry x-axis-rotation large-arc-flag sweep-flag x y  arc absolute
  a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy  arc relative
  Z or z       closepath

3 Number Grammar
 sign?: '+' or '-'
 integer: digit-sequence
 fraction?: '.' digit-sequence
 exponent?: ('e'|'E') sign? digit-sequence

4 Path Data Grammar
 EBNF:
  path ::= wsp* moveto-drawto-groups wsp*
  moveto-drawto-groups ::= moveto drawto-commands?
  drawto-commands ::= drawto-command drawto-commands?
  drawto-command ::= one of the path commands in section 2

5 Implementation Notes
 - Elliptical arcs: if rx or ry ≤0, clamp or skip
 - Smooth commands: control point inferred by reflection
 - Zero-length segments ignored
 - Parse errors skip invalid segments

6 Distance Along Path
 pathLength attribute (SVGAnimatedNumber)
 ComputedLength = sum of segment lengths
 scale factor = pathLength>0 ? pathLength/ComputedLength : 1
 API distances use scale factor

7 DOM Interfaces
 Interface SVGPathElement:
  Attributes:
   readonly pathLength: float
  Methods:
   getTotalLength(): float
   getPointAtLength(distance: float): DOMPoint
   isPointInFill(point: DOMPoint): boolean
   isPointInStroke(point: DOMPoint): boolean

## Supplementary Details
• Default attribute values: pathLength default is 0 ⇒ no normalization
• Number parsing: accept leading decimal (".5"), exponent ("1e-3"), sign
• Serialization: d attribute string must adhere to grammar exactly; use commas or whitespace
• Step-by-step: 1. parse d into command sequence 2. compute each segment length (line, cubic, quadratic, arc) 3. sum lengths 4. if pathLength>0, compute scale factor 5. apply scale factor to distances passed to APIs or CSS properties (stroke-dasharray)
• Path length computation formulas: line = √((x2-x1)^2+(y2-y1)^2); cubic and quadratic use recursive subdivision or analytical length approx; arc uses elliptical integrals per SVG2 §8.13
• Animations along path: use getPointAtLength(distance) inside requestAnimationFrame loop or <animateMotion> element with path attribute


## Reference Details
<path> attributes:
 d: DOMString — path data string
 pathLength: SVGAnimatedNumber — normalization factor (default 0)

Interface SVGPathElement : SVGGraphicsElement {
  readonly attribute float pathLength;
  float getTotalLength();
  DOMPoint getPointAtLength(float distance);
  boolean isPointInFill(DOMPoint point);
  boolean isPointInStroke(DOMPoint point);
}

Usage example:
 const svgNS = 'http://www.w3.org/2000/svg';
 const path = document.createElementNS(svgNS,'path');
 path.setAttribute('d','M0 0 L100 0 L100 100 Z');
 path.setAttribute('stroke','black');
 document.querySelector('svg').appendChild(path);
 const len = path.getTotalLength(); // float
 const p = path.getPointAtLength(len*0.5); // DOMPoint { x:50, y:0 }

Configuration options and effects:
 pathLength=200 ⇒ all distances from getPointAtLength(distance) scaled by factor=200/ComputedLength
 stroke-dasharray: numbers interpreted in user units; combine with pathLength for normalized dash animations

Best practices:
 • Specify pathLength when animating dashes or motion to standardize across paths of different shapes
 • Use absolute commands (uppercase) for clarity and fewer relative errors
 • Combine <defs> and <use> to reuse complex path definitions

Troubleshooting procedures:
 • Error: getPointAtLength returns (NaN,NaN) ⇒ check distance parameter range [0,getTotalLength()]
 • Arc not rendered ⇒ verify rx, ry >0 and large-arc-flag/sweep-flag values (0 or 1)
 • Unexpected parse breakpoints ⇒ validate d string against EBNF; run console.assert(/^M[ ,\d]/.test(d))
 • CSS dasharray not applying ⇒ ensure stroke-dasharray attribute present and pathLength set if needed


## Information Dense Extract
path: tag=path, attrs=d(string, mandatory), pathLength(number, default 0); commands: M/m(2), L/l(2), H/h(1), V/v(1), C/c(6), S/s(4), Q/q(4), T/t(2), A/a(7), Z/z(0); numbers: [+-]?\d+(\.\d+)?([eE][+-]?\d+)?; grammar per EBNF; arcs: rx,ry>0; clamp or skip zero/neg; smooth cmds reflect previous control pt; zero-length segments ignored; parse errors skip; computedLength=sum(segment lengths); scale=pathLength>0?pathLength/computedLength:1; DOM: SVGPathElement pathLength:float; getTotalLength():float; getPointAtLength(float):DOMPoint; isPointInFill(DOMPoint):boolean; isPointInStroke(DOMPoint):boolean; example: len=path.getTotalLength(); pt=path.getPointAtLength(len*0.5); use pathLength for normalization; dasharray animations normalized by scale; troubleshoot NaN from getPointAtLength(distance) out-of-range; validate d syntax.

## Sanitised Extract
Table of Contents:
1 Path Element
2 Path Data Syntax and Commands
3 Number Grammar
4 Path Data Grammar
5 Implementation Notes
6 Distance Along Path
7 DOM Interfaces

1 Path Element
 Tag: path
 Attributes:
  d: string (path-data, mandatory)
  pathLength: number (optional, default 0)

2 Path Data Syntax and Commands
 Commands and parameter counts:
  M x y        moveto absolute
  m dx dy      moveto relative
  L x y        lineto absolute
  l dx dy      lineto relative
  H x          horizontal lineto absolute
  h dx         horizontal lineto relative
  V y          vertical lineto absolute
  v dy         vertical lineto relative
  C x1 y1 x2 y2 x y  cubic Bzier absolute
  c dx1 dy1 dx2 dy2 dx dy  cubic Bzier relative
  S x2 y2 x y  smooth cubic Bzier absolute
  s dx2 dy2 dx dy  smooth cubic Bzier relative
  Q x1 y1 x y  quadratic Bzier absolute
  q dx1 dy1 dx dy  quadratic Bzier relative
  T x y        smooth quadratic Bzier absolute
  t dx dy      smooth quadratic Bzier relative
  A rx ry x-axis-rotation large-arc-flag sweep-flag x y  arc absolute
  a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy  arc relative
  Z or z       closepath

3 Number Grammar
 sign?: '+' or '-'
 integer: digit-sequence
 fraction?: '.' digit-sequence
 exponent?: ('e'|'E') sign? digit-sequence

4 Path Data Grammar
 EBNF:
  path ::= wsp* moveto-drawto-groups wsp*
  moveto-drawto-groups ::= moveto drawto-commands?
  drawto-commands ::= drawto-command drawto-commands?
  drawto-command ::= one of the path commands in section 2

5 Implementation Notes
 - Elliptical arcs: if rx or ry 0, clamp or skip
 - Smooth commands: control point inferred by reflection
 - Zero-length segments ignored
 - Parse errors skip invalid segments

6 Distance Along Path
 pathLength attribute (SVGAnimatedNumber)
 ComputedLength = sum of segment lengths
 scale factor = pathLength>0 ? pathLength/ComputedLength : 1
 API distances use scale factor

7 DOM Interfaces
 Interface SVGPathElement:
  Attributes:
   readonly pathLength: float
  Methods:
   getTotalLength(): float
   getPointAtLength(distance: float): DOMPoint
   isPointInFill(point: DOMPoint): boolean
   isPointInStroke(point: DOMPoint): boolean

## Original Source
SVG Technical Documentation (MDN & W3C)
https://www.w3.org/TR/SVG2/

## Digest of SVG_PATHS

# Paths (Section 9, Retrieved 2024-06-17)
Data Size: 7040132 bytes

# Path Element
Element: <path>
Attributes:
  • d: path-data (string, mandatory)
  • pathLength: number (normalization factor, default 0)

# Path Data
Syntax: sequence of commands and parameters separated by whitespace or comma

## Commands and Parameter Lists
M    x y              moveto (absolute)
m    dx dy            moveto (relative)
L    x y              lineto (absolute)
l    dx dy            lineto (relative)
H    x                horizontal lineto (absolute)
h    dx               horizontal lineto (relative)
V    y                vertical lineto (absolute)
v    dy               vertical lineto (relative)
C    x1 y1 x2 y2 x y  cubic Bézier curveto (absolute)
c    dx1 dy1 dx2 dy2 dx dy  cubic Bézier curveto (relative)
S    x2 y2 x y        smooth cubic Bézier curveto (absolute)
s    dx2 dy2 dx dy    smooth cubic Bézier curveto (relative)
Q    x1 y1 x y        quadratic Bézier curveto (absolute)
q    dx1 dy1 dx dy    quadratic Bézier curveto (relative)
T    x y              smooth quadratic Bézier curveto (absolute)
t    dx dy            smooth quadratic Bézier curveto (relative)
A    rx ry x-axis-rotation large-arc-flag sweep-flag x y  arc (absolute)
a    rx ry x-axis-rotation large-arc-flag sweep-flag dx dy arc (relative)
Z or z                closepath (no parameters)

## Number Grammar
number ::= sign? integer fraction? exponent?
sign   ::= '+' | '-'
integer ::= digit-sequence
fraction ::= '.' digit-sequence
exponent ::= ('e'|'E') sign? digit-sequence

# Path Data Grammar (EBNF)
path                            ::= wsp* moveto-drawto-command-groups wsp*
drawto-command                  ::= moveto | lineto | horizontal-lineto | vertical-lineto | curveto | smooth-curveto | quadratic-curveto | smooth-quadratic-curveto | arc | closepath
moveto-drawto-command-groups   ::= moveto drawto-commands?
drawto-commands                 ::= drawto-command drawto-commands?

# Implementation Notes
• Elliptical arc parameters rx, ry ≤ 0 ⇒ clamp to abs(rx), abs(ry); if zero, skip arc segment
• Smooth commands (S, s, T, t): first control point inferred by reflecting previous control point
• Zero-length segments: silently ignored
• Parse errors: invalid commands or wrong parameter count ⇒ skip that segment and continue

# Distance Along a Path
Attribute: pathLength (SVGAnimatedNumber)
ComputedLength = sum(segment lengths)
Normalization factor = pathLength>0 ? (pathLength / ComputedLength) : 1
Distance for APIs = rawDistance × normalization factor

# DOM Interfaces
Interface SVGPathElement extends SVGGraphicsElement
Attributes:
  readonly pathLength: float  (animatable)
Methods:
  getTotalLength(): float
  getPointAtLength(distance: float): DOMPoint
  isPointInFill(point: DOMPoint): boolean
  isPointInStroke(point: DOMPoint): boolean

## Attribution
- Source: SVG Technical Documentation (MDN & W3C)
- URL: https://www.w3.org/TR/SVG2/
- License: License: CC-BY-SA / W3C Software and Document License
- Crawl Date: 2025-05-10T03:24:39.226Z
- Data Size: 7040132 bytes
- Links Found: 48616

## Retrieved
2025-05-10
