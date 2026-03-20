SVG_BASIC_SHAPES

Table of contents
- Normalised extract: element signatures and attribute semantics
- Coordinate system and units
- Element-specific attributes (rect, circle, ellipse, line, polyline, polygon, path)
- Points attribute format (polyline / polygon)
- Path commands and parameter lists
- Fill, stroke and paint-order interactions
- ViewBox and preserveAspectRatio effects
- Supplementary details: rasterization notes and best practices
- Reference details: attribute types, defaults, and exact parameter lists
- Detailed digest (source and retrieval date)
- Attribution and data size

Normalised extract: element signatures and attribute semantics
- rect: attributes x, y, width, height. x and y default to 0 if omitted. width and height are required numeric length values. Corner rounding via rx and ry: if one omitted, it equals the other; values are absolute lengths.
- circle: attributes cx, cy, r. cx and cy default to 0 if omitted; r is required and must be non-negative number. A circle rendered with r=0 produces no visible area.
- ellipse: attributes cx, cy, rx, ry. rx and ry are radii; must be non-negative numbers.
- line: attributes x1, y1, x2, y2. Each is a numeric coordinate in user space.
- polyline: attribute points containing a sequence of coordinate pairs. The element draws open connected segments through the points in order; no implicit closing is performed.
- polygon: same points format as polyline but the final point is connected to the first, producing a closed shape.
- path: attribute d containing path data commands. Commands may be absolute (uppercase) or relative (lowercase). Commands include M, m (moveto), L, l (lineto), H, h (horizontal lineto), V, v (vertical lineto), C, c (cubic Bézier), S, s (smooth cubic Bézier), Q, q (quadratic Bézier), T, t (smooth quadratic), A, a (elliptical arc), Z, z (closepath).

Coordinate system and units
- The user coordinate system is established by the svg element's viewBox and width/height attributes. Coordinates in shape attributes are interpreted in the current user coordinate system.
- Lengths accept units (px, em, rem, %, etc). Numeric values without units are interpreted as user units (usually px unless viewBox scales them).
- Percentage values are resolved relative to the current viewport or the attribute-specific reference (for example, percentage for cx/cy uses the viewport width/height depending on context).

Points attribute format (polyline / polygon)
- The points attribute is a whitespace and/or comma separated list of numbers representing coordinate pairs: x,y x,y ... or x y x y ... A comma may separate numbers but is optional between coordinate pairs when whitespace is present. Negative numbers are allowed and may be adjacent to other numbers when properly separated by commas or whitespace.
- Parsers accept optional leading/trailing whitespace; empty points produces no path.

Path commands and parameter lists (exact parameter counts)
- M/m moveto: x y (establishes current point)
- L/l lineto: x y
- H/h horizontal lineto: x
- V/v vertical lineto: y
- C/c cubic Bézier: x1 y1 x2 y2 x y
- S/s smooth cubic Bézier: x2 y2 x y (reflects previous control point)
- Q/q quadratic Bézier: x1 y1 x y
- T/t smooth quadratic Bézier: x y
- A/a elliptical arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y (large-arc-flag and sweep-flag are 0 or 1)
- Z/z closepath: (no parameters)
- Parameters are comma- and/or whitespace-separated; multiple command parameter sets may follow a single command letter (implicit repeat).

Fill, stroke and paint-order interactions
- fill accepts paint server values: color keywords, hex, rgba(), currentColor, url(...) for gradients/patterns. Default is black for shapes with no fill=none.
- stroke applies outlines with stroke-width (default 1 user unit). stroke-linecap and stroke-linejoin control cap/join rendering. stroke and fill participate in painting order; the paint-order property can reorder fill, stroke, and markers.
- stroke-width is in current user units and scales with viewBox transformations.

ViewBox and preserveAspectRatio effects
- viewBox: min-x, min-y, width, height defines mapping from user coordinate system to viewport. If width/height attributes are present on svg, the viewBox scales content to fit those dimensions.
- preserveAspectRatio controls alignment and scaling: e.g. xMidYMid meet (letterbox) vs none (stretch). preserveAspectRatio accepts 'meet' or 'slice' sizing plus alignment keywords.

Supplementary details: rasterization notes and best practices
- For raster output (PNG), ensure shapes have explicit viewBox or explicit width/height so rasterizers compute pixel dimensions predictably. If rasterizing without explicit sizes, specify a density or target pixel size to avoid tiny or oversized bitmaps.
- For crisp 1px strokes, align stroke to half-pixel positions when mapping user units to pixel grid or use vector-based output.
- Prefer closed path or polygon for filled shapes to guarantee correct fill-rule behaviour; use fill-rule evenodd when crossing shapes must create holes.

Reference details: attribute types, defaults, and exact parameter lists
- rect: x: number (default 0), y: number (default 0), width: number (required), height: number (required), rx: number (optional), ry: number (optional)
- circle: cx: number (default 0), cy: number (default 0), r: number (required)
- ellipse: cx: number (default 0), cy: number (default 0), rx: number (required), ry: number (required)
- line: x1: number, y1: number, x2: number, y2: number
- polyline/polygon: points: list of numeric coordinate pairs; parser accepts separators of spaces and commas
- path: d: string composed of command letters and numeric parameters as defined in the Path commands section above
- points attribute specifics: numbers may be integer or floating point; separation may be one or more spaces or commas; both comma and space separators may co-exist for clarity

Detailed digest (extracted sections and retrieval details)
- Source page sections used: element references for rect, circle, ellipse, line, polyline, polygon, path; attributes summary; path data command reference; coordinate system explanation; viewBox and preserveAspectRatio notes; painting and fill/stroke semantics.
- Source URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes
- Retrieval date: 2026-03-20
- Crawled HTML size (approx): 179.1 KB

Attribution
- Source: MDN Web Docs — Basic shapes (SVG) — https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes
- Data retrieved: 2026-03-20
