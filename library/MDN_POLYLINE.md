MDN_POLYLINE

Table of contents
1. Purpose and overview
2. Points attribute format (exact)
3. Rendering attributes that affect plots
4. Mapping data series -> points string (implementation steps)
5. Reference details
6. Detailed digest (retrieved)
7. Attribution and crawl size

1. Purpose and overview
The SVG polyline element defines a sequence of straight-line segments by a list of points. It is well suited to render a sampled data series as a single stroked path.

2. Points attribute format (exact)
- Attribute name: points
- Format: a list of coordinate pairs. Each coordinate pair is two numbers (x and y) separated by a comma; pairs are separated by whitespace and/or commas. Canonical textual examples: "x1,y1 x2,y2 x3,y3" or "x1,y1,x2,y2".
- The numbers are user-space coordinates (float allowed). There is no trailing comma; coordinates are parsed as number tokens.

3. Rendering attributes that affect plots
- stroke: CSS color for the line stroke.
- stroke-width: numeric stroke thickness in current user units.
- fill: commonly set to none for lines (fill="none").
- stroke-linejoin, stroke-linecap: control corner and cap rendering.
- vector-effect: non-scaling-stroke can be used when scaling via viewBox.

4. Mapping data series -> points string (implementation steps)
1. Compute numerical x and y screen coordinates by applying linear scales: xPix = xScale(sampleX), yPix = yScale(sampleY) where yScale typically flips vertical axis to render increasing values upward.
2. Format each coordinate pair as the floating-point decimal text for xPix and yPix, with sufficient precision (e.g., 2–6 decimal digits as required).
3. Concatenate pairs into a single string with a single space separating pairs and a comma between x and y inside pairs.
4. Set polyline points attribute to the resulting string. Ensure string is non-empty; an empty points attribute yields no geometry.

5. Reference details
- points: required text attribute containing coordinate list as above.
- polyline does not implicitly close the path; use polygon to close.

6. Detailed digest (retrieved)
Source: MDN Web Docs "<polyline> - SVG | MDN"
Retrieved: 2026-03-21
Crawl bytes downloaded: 80
Key extracted facts used above: exact points grammar, important attributes and mapping steps for plotting.

7. Attribution
Source URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
Crawl size (bytes): 80
License / attribution: MDN content (see source site).