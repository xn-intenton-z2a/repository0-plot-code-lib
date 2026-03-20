SVG_RENDERER

Table of contents:
1. Normalised extract
2. Topics covered
3. Coordinate transform and scaling formulas
4. SVG 1.1 polyline and viewBox exact requirements
5. Reference API (signatures)
6. Supplementary details and examples
7. Digest and attribution

1. Normalised extract
- Produce a valid SVG 1.1 string containing a <polyline> element and a viewBox attribute.
- Points are passed as numeric pairs and mapped into pixel coordinates using a linear transform with optional padding.
- Y axis in data (mathematical) increases upward; SVG y increases downward. Invert y when mapping.

2. Topics covered
- viewBox syntax and semantics
- polyline points attribute format
- scaling math and inversion of Y axis
- outputting minimal valid SVG (XML namespace and version)

3. Coordinate transform and scaling formulas
- Given input arrays X[], Y[] and output canvas width W and height H and padding P:
  - xmin = min(X), xmax = max(X), ymin = min(Y), ymax = max(Y)
  - if (xmax === xmin) set sx = 1; else sx = (W - 2*P) / (xmax - xmin)
  - if (ymax === ymin) set sy = 1; else sy = (H - 2*P) / (ymax - ymin)
  - For each point (x,y):
      px = P + (x - xmin) * sx
      py = H - P - (y - ymin) * sy   // invert Y to place low values at bottom
- Compose points string: points = points.map(p => `${p.x},${p.y}`).join(' ')

4. SVG 1.1 polyline and viewBox exact requirements
- Root element must include xmlns="http://www.w3.org/2000/svg" and a viewBox attribute: viewBox="minX minY width height". For typical output use viewBox="0 0 W H" and explicit width/height attributes.
- polyline syntax: <polyline points="x1,y1 x2,y2 ..." fill="none" stroke="#000" stroke-width="1" />
- Ensure to escape any attribute values if produced from untrusted input (points produced from numeric conversion are safe).

5. Reference API (signatures)
- renderSvgPolyline(points: Array<{x:number,y:number}>, options?: {width?:number,height?:number,padding?:number,stroke?:string,strokeWidth?:number}): string
  - Default options: width=800, height=400, padding=8, stroke='#000', strokeWidth=1
  - Returns: SVG string valid for SVG 1.1 with a viewBox and a single polyline representing the series.

6. Supplementary details and examples
- For multi-series, produce multiple <polyline> elements or use <g> grouping; ensure stroke and fill attributes are appropriate.
- Use preserveAspectRatio="xMidYMid meet" when embedding scaled output.

7. Digest and attribution
- MDN <polyline> (https://developer.mozilla.org/.../polyline) — 174423 bytes retrieved 2026-03-20
- MDN viewBox (https://developer.mozilla.org/.../viewBox) — 175325 bytes retrieved 2026-03-20

