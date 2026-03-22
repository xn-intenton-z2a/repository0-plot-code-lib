SVG_POLYLINE

Table of Contents:
1. <polyline> element syntax and required attributes
2. points attribute format and grammar
3. Coordinate mapping from data to viewBox pixels
4. Recommended attributes for line plots

1. <polyline> element syntax (exact form)
Example element (single line, literal):
<polyline points="x1,y1 x2,y2 x3,y3" stroke="black" fill="none" stroke-width="1" />
- The element must appear inside an <svg> root; points attribute is mandatory for coordinates.

2. points attribute format and grammar
- The points attribute is a sequence of coordinate pairs separated by whitespace or commas.
- Each coordinate pair is two numbers: number,number. Pairs may be separated by whitespace or comma+whitespace.
- Valid examples: "0,0 10,10 20,5" or "0,0,10,10,20,5" (both accepted by SVG parser).

3. Coordinate mapping (exact formulas)
Given data arrays X and Y with numeric ranges xMin..xMax and yMin..yMax and an SVG viewBox of width vbW and height vbH (viewBox="0 0 vbW vbH") compute pixel coordinates for each (x,y):
- normX = (x - xMin) / (xMax - xMin)
- px = normX * vbW
- normY = (y - yMin) / (yMax - yMin)
- py = vbH - (normY * vbH)   // invert Y to map numeric increasing-y upward
- Round px and py to a fixed precision (e.g., Math.round(px*1000)/1000) before serialization to avoid long decimals.
Construct points string by joining pairs: points = pairs.map(p => `${p.x},${p.y}`).join(' ')

4. Recommended attributes for line plots
- stroke: color for the line, e.g. "black" or "#1f77b4"
- fill: set to "none" to avoid area fill
- stroke-width: recommended between 1 and 2 for 72 DPI; scale for larger densities
- vector-effect: non-scaling-stroke can be set to "non-scaling-stroke" when desired
- Include xmlns="http://www.w3.org/2000/svg" and version="1.1" on the root svg element for SVG 1.1 validity (see SVG11_SPEC)

Reference details (exact attribute expectations)
polyline[points]: string containing coordinate pairs
polyline[stroke]: color string
polyline[fill]: default "none" for line plots
polyline[stroke-width]: number (user units within viewBox)

Detailed digest
Content retrieved from https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline on 2026-03-22.
The polyline element accepts a whitespace/comma-separated list of coordinate pairs; this document provides explicit coordinate mapping math to transform numeric data ranges into viewBox coordinates and the exact points formatting required in the points attribute.

Attribution
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
Bytes retrieved: 174423
