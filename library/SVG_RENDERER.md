SVG_RENDERER

TABLE OF CONTENTS:
1. Normalised extract: polyline and viewBox essentials
2. Coordinate mapping and viewBox calculation
3. Polyline points formatting rules
4. SVG 1.1 requirements and attributes
5. Reference details and digest

NORMALISED EXTRACT:
- Use <svg> root with a viewBox attribute: "minX minY width height" to create resolution-independent graphics (SVG 1.1 requirement for scalable output).
- Use <polyline points="x1,y1 x2,y2 ..." /> to render a data series as a connected line. Set stroke to desired colour and fill="none" for line-only plots.
- Points attribute expects pairs separated by whitespace or commas: pairs are a sequence of numbers representing x and y coordinates.

COORDINATE MAPPING (detailed):
- Input: array of numeric points [{x,y}, ...]. Compute data bounds: minX, maxX, minY, maxY. If min==max for a dimension, expand range by ±1 to avoid zero width/height.
- Choose output viewport size in pixels (widthPx, heightPx) from options.
- Compute scales: scaleX = widthPx / (maxX - minX), scaleY = heightPx / (maxY - minY).
- Map data point to svg coordinates:
  - svgX = (x - minX) * scaleX
  - svgY = heightPx - (y - minY) * scaleY    (invert Y axis: SVG Y increases downwards)
- Optionally add margin/padding in pixels: reduce available width/height by 2*margin and offset svgX/svgY accordingly.
- Produce points string by joining pairs with a single space and each pair as "svgX,svgY". Round coordinates to fixed decimals to reduce file size (e.g., 3 or 6 decimals).

POLYLINE USAGE:
- Example element: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 W H"><polyline points="..." stroke="#000" stroke-width="1" fill="none" /></svg>
- Ensure xmlns attribute is present for standalone SVG 1.1 compliance.

SVG 1.1 REQUIREMENTS & BEST PRACTICES:
- Include viewBox on root element to make SVG scale correctly across devices. Provide explicit width and height attributes if embedding to control output pixel size for conversion to PNG.
- Avoid excessive precision in point coordinates to keep SVG concise. Use decimal rounding and trim trailing zeros.

REFERENCE DETAILS (exact specs):
- <polyline> points attribute: sequence of coordinate pairs either separated by whitespace or comma; pairs are x,y values. MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline retrieved 2026-03-24, bytes: 174423
- viewBox attribute: viewBox="minX minY width height" defines user coordinate system of the SVG content. MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox retrieved 2026-03-24, bytes: 175323
- SVG 1.1 spec (W3C): https://www.w3.org/TR/SVG11/ retrieved 2026-03-24, bytes: 15481

DIGEST & ATTRIBUTION:
- MDN polyline: 174423 bytes; MDN viewBox: 175323 bytes; W3C SVG 1.1: 15481 bytes. Retrieval date: 2026-03-24.

IMPLEMENTATION NOTES:
- Exported signature: renderSVG(points:Array<{x:number,y:number}>, options?:{width:number,height:number,margin?:number,stroke?:string,strokeWidth?:number}): string
- Return: string containing full SVG document (xmlns and viewBox present) suitable for writing directly to an .svg file or passing to a PNG converter.
