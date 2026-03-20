NORMALISED EXTRACT

Purpose: definitive implementation notes for SVG polyline "points" attribute.

TABLE OF CONTENTS
- Syntax and value format
- Tokenisation rules
- Parsing algorithm
- Examples
- Edge cases and validation

1) Syntax and value format
The points attribute contains a whitespace and/or comma separated list of numeric coordinate values representing X and Y pairs in the user coordinate system. Valid value example:  "0,0 100,0 100,100". Each coordinate is a number (integer or floating point, optional sign). If an odd number of numeric coordinates is present, the final unpaired value MUST be ignored.

2) Tokenisation rules
- Delimiters: commas and whitespace (spaces, tabs, newlines) are equivalent separators.
- Consecutive separators are treated as a single separator.
- Accept numeric formats compatible with JavaScript parseFloat (leading sign, integer or decimal fraction).

3) Parsing algorithm (direct, implementable)
1. Trim attribute string.
2. Split on any sequence of comma or whitespace: tokens = value.split(/[\s,]+/).
3. Map tokens to numbers using parseFloat and filter out NaN.
4. If numbers.length is odd, discard the last numeric value.
5. Build pairs: for (i = 0; i < numbers.length; i += 2) push { x: numbers[i], y: numbers[i+1] }.
6. Use resulting array of points to render polyline/polygon.

4) Examples
- points="0,0 50,0 50,50" => points: [{x:0,y:0},{x:50,y:0},{x:50,y:50}]
- points="0 0 10 10,20 20" => same behaviour; commas and spaces interchangeable

5) Edge cases and validation
- Ignore trailing comma or whitespace that produces an odd token count.
- Use Number.isFinite after parseFloat to validate values.
- Large coordinate counts: avoid building huge arrays in tight memory-constrained environments; stream parse if needed.

SUPPLEMENTARY DETAILS
- Coordinate units are the current user coordinate system; attribute values do not accept CSS units (px, em).
- To map to canvas where origin differs, apply a linear transform: canvasY = canvasHeight - svgY if flipping vertically.

REFERENCE DETAILS (API and implementation notes)
- Parsing pattern: tokens = str.split(/\s*,\s*|\s+/) is acceptable but simpler: /[\s,]+/.
- Example parse function signature: parsePoints(string) => Array<{x:number,y:number}>.
- Runtime conversions: use Number.parseFloat(token) and Number.isFinite(value).

DETAILED DIGEST
- Source: MDN "points - SVG" (developer.mozilla.org), retrieved 2026-03-20.
- Retrieved bytes: 170913 bytes.
- Key extracted lines: "The points attribute defines a list of points. Each point is defined by a pair of number representing a X and a Y coordinate... If the attribute contains an odd number of coordinates, the last one will be ignored."

ATTRIBUTION
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points
- Retrieved: 2026-03-20
- Bytes crawled: 170913
