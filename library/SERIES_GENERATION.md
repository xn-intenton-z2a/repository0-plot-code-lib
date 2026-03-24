SERIES_GENERATION

TABLE OF CONTENTS:
1. Normalised extract: range format and semantics
2. parseRange and generateSeries function signatures
3. Implementation: integer-step iteration to avoid float drift
4. Edge cases, validation, and safety limits
5. Supplementary details and performance
6. Reference digest and attribution

NORMALISED EXTRACT:
- Range format: start:step:end where start, step, and end are floating-point numbers in decimal form; sign allowed (e.g., -3.14:0.01:3.14).
- Semantics: include start; step is the increment; include end only if it is reachable by increments from start with the given step direction; step must be non-zero and its sign must make progress from start toward end.

API SIGNATURES:
- parseRange(rangeString: string): {start:number, step:number, end:number}
- generateSeries(fn: (x:number)=>number, rangeString: string, options?: {maxPoints?: number}): Array<{x:number,y:number}>
  - Returns: array of point objects with numeric x and computed y values
  - Default maxPoints: 1e6 (safety cap to prevent infinite loops)

IMPLEMENTATION (detailed algorithm):
1. parseRange:
  - Split on ':' into [startS, stepS, endS]. If split length != 3 -> throw Error('invalid range')
  - Convert with Number(startS), Number(stepS), Number(endS); if any is NaN throw Error('invalid number')
  - Return numeric triple.
2. generateSeries:
  - Call parseRange to obtain start, step, end.
  - If step === 0 throw Error('step must be non-zero').
  - Determine direction: forward = step > 0
  - Validate that (forward && start <= end) || (!forward && start >= end) else return []
  - Compute estimatedCountRaw = (end - start) / step. Use absolute values for count calculation: count = Math.floor(Math.abs(estimatedCountRaw) + 0.0000000001) + 1
  - If count > maxPoints throw Error('range produces too many points')
  - Use integer iteration: for i from 0 to count-1: x = start + i * step; y = fn(x); push {x: +Number(x.toFixed(12)), y: +Number(y)}. Using toFixed reduces floating drift in generated x.
  - Inclusion of end: the integer iteration above includes start and will include end when (end - start) is an integer multiple of step within floating tolerance.

EXAMPLE CHECK (acceptance):
- For range -3.14:0.01:3.14 compute count = Math.floor((3.14 - (-3.14))/0.01 + 1e-12) + 1 => (6.28/0.01)=628 so count=629; depending on inclusion semantics you may see ~628-629 points; tests should accept small off-by-one due to float rounding.

EDGE CASES & SAFETY:
- Avoid while loops that check x <= end because floating errors may cause runaway; prefer integer steps computed from calculated count.
- Cap maxPoints to a sensible limit (default 1e6). Use options to override in trusted contexts.

SUPPLEMENTARY DETAILS:
- Use Number parsing and robust error messages. When converting to string for SVG coordinates, round to fixed decimal places (e.g., 6) to reduce file size.
- For high-resolution plots, consider dynamic step derived from desired pixel width: stepAdjusted = (end-start)/pixels to produce one sample per pixel.

DIGEST & ATTRIBUTION:
- No single external source defines the range semantics; this document uses mission format and standard numeric handling from JavaScript. Supporting references: MDN Number parsing and Math functions (see EXPRESSION_PARSER.md). Retrieval date: 2026-03-24
