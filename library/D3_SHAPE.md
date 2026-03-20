D3_SHAPE

TABLE OF CONTENTS:
1. Purpose and overview
2. line() generator: behavior and signature
3. Accessor methods (.x, .y, .defined, .curve, .context)
4. Producing polyline points vs path 'd' attribute
5. Reference details (method signatures)
6. Supplementary notes
7. Detailed digest and retrieval metadata

NORMALISED EXTRACT:
- d3-shape exposes functions to generate SVG path data programmatically from a sequence of points. The primary helper is line(), which returns a function that, when invoked with an array of data, returns an SVG path string (the 'd' attribute) or null.
- The line generator is configurable via accessor setters for x and y coordinates and a defined function for filtering undefined points.

KEY API BEHAVIOR AND SIGNATURES:
- line() -> LineGenerator
  - Type: LineGenerator<T>
  - Invoking: const d = line()(data) where data is Array<T>; returns string | null
- LineGenerator methods (most relevant):
  - .x(accessor: (d: T, i?: number, data?: T[]) => number) -> this
  - .y(accessor: (d: T, i?: number, data?: T[]) => number) -> this
  - .defined(accessor: (d: T, i?: number, data?: T[]) => boolean) -> this
  - .curve(curveFactory: CurveFactory) -> this
  - .context(context: CanvasPath | null) -> this
- Typical usage:
  - const lineGen = line().x(d => d.x).y(d => d.y).curve(curveLinear);
  - const pathD = lineGen(dataArray); // returns path string suitable for an SVG <path d="..."> attribute

PRODUCING POLYLINE POINTS:
- If <polyline points="..."> is required instead of a path, produce the points string by mapping data to coordinate pairs and joining: data.map(d => `${xScale(d.x)},${yScale(d.y)}`).join(' ')
- line() does not directly output polyline-compatible points but produces an equivalent path; conversion to polyline points is straightforward by mapping accessors to numeric x,y pairs.

REFERENCE DETAILS (exact method shapes):
- line(): LineGenerator
- LineGenerator<T>.x(accessor: (d: T, i?: number, data?: T[]) => number): LineGenerator<T>
- LineGenerator<T>.y(accessor: (d: T, i?: number, data?: T[]) => number): LineGenerator<T>
- LineGenerator<T>.defined(accessor: (d: T, i?: number, data?: T[]) => boolean): LineGenerator<T>
- LineGenerator<T>.curve(curveFactory: CurveFactory): LineGenerator<T>
- LineGenerator<T>.context(context: CanvasPath | null): LineGenerator<T>

SUPPLEMENTARY NOTES:
- Use curve factories (curveLinear, curveBasis, etc.) to control interpolation between points; for simple plots use curveLinear for straight segments.
- When generating pixel-perfect polyline coordinates, pair line generator outputs (which may include floating point numbers) with explicit scaling functions that map data domain to pixel coordinates.

DETAILED DIGEST (extracted):
- Source: https://github.com/d3/d3-shape — retrieved 2026-03-20. Data size fetched during crawl: ~264700 bytes.

ATTRIBUTION:
- d3-shape project and API documentation (GitHub). Retrieved 2026-03-20.
