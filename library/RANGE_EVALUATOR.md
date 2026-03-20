RANGE_EVALUATOR

Table of contents:
1. Normalised extract
2. Topics covered
3. Precise algorithms and formulas
4. Reference API (signatures)
5. Edge cases, precision and count expectations
6. Digest and attribution

1. Normalised extract
- Range string format: start:step:end where start, step, end are decimal numbers (example: -3.14:0.01:3.14).
- Generate an array of numeric x values starting from start, adding step until the boundary condition is passed. For plotting use inclusive end when it falls within a floating tolerance.
- For each x compute y = f(x) for a supplied function f.

2. Topics covered
- Parsing the "start:step:end" format robustly
- Handling positive and negative step directions
- Floating point tolerance and count calculation
- Producing array of {x:number,y:number}

3. Precise algorithms and formulas
- parseRange(rangeStr:string):
  - const parts = rangeStr.split(':'); if (parts.length !== 3) throw new Error('Range must be start:step:end');
  - const start = Number(parts[0]); const step = Number(parts[1]); const end = Number(parts[2]);
  - if (!isFinite(start) || !isFinite(step) || !isFinite(end)) throw new Error('Range parts must be finite numbers');
  - if (step === 0) throw new Error('Step must be non-zero');
  - return {start, step, end};
- evaluateRange(fn, rangeStr):
  - const {start,step,end} = parseRange(rangeStr);
  - const result = [];
  - let x = start;
  - const tol = Math.max(Math.abs(step) * 1e-12, 1e-15);
  - if (step > 0) while (x <= end + tol) { result.push({x, y: Number(fn(x))}); x = x + step; }
  - else while (x >= end - tol) { result.push({x, y: Number(fn(x))}); x = x + step; }
  - Return result (array length ~ Math.floor((end - start)/step)+1 when step and endpoints align).

4. Reference API (signatures)
- parseRange(range: string): {start:number, step:number, end:number}
- evaluateRange(fn: (x:number)=>number, range: string): Array<{x:number,y:number}>
  - Returns numerical y coerced via Number(...).

5. Edge cases, precision and count expectations
- Example: '-3.14:0.01:3.14' yields approximately 628-629 points depending on inclusion rules and floating rounding; inclusive algorithm above returns 629 points when endpoints align exactly.
- If step direction does not move from start toward end (e.g. start<end and step<0) throw an error.
- Avoid cumulative floating-point drift by computing indices where appropriate: for i from 0 .. maxSteps compute x = start + i*step and check boundary.

6. Digest and attribution
- MDN Array.prototype.map (https://developer.mozilla.org/.../Array/map) — 170172 bytes retrieved 2026-03-20 (useful for array handling patterns)

