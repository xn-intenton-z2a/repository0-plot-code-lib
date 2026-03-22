JAVASCRIPT_MATH

Table of Contents:
1. Constants
2. Primary numeric functions
3. Domain/range and edge behavior
4. Numeric hygiene and recommended checks

1. Constants
Math.PI = 3.141592653589793
Math.E = 2.718281828459045
Math.LN2 = 0.6931471805599453
Math.LN10 = 2.302585092994046
Math.LOG2E = 1.4426950408889634
Math.LOG10E = 0.4342944819032518
Math.SQRT2 = 1.4142135623730951
Math.SQRT1_2 = 0.7071067811865476

2. Primary numeric functions
Math.sin(x) -> number; input x in radians; output in [-1,1]
Math.cos(x) -> number; input x in radians
Math.tan(x) -> number; may return large magnitude or +/-Infinity near odd multiples of PI/2
Math.asin(x), Math.acos(x) -> domain [-1,1], return radians
Math.atan2(y,x) -> number in radians, full-circle handling
Math.exp(x) -> e^x, domain all reals
Math.log(x) -> natural logarithm; domain x>0, returns NaN for x<=0
Math.pow(x,y) -> x^y; for negative x and non-integer y result is NaN
Math.sqrt(x) -> domain x>=0 else NaN
Math.abs(x), Math.max(...), Math.min(...)
Math.round(x), Math.floor(x), Math.ceil(x), Math.trunc(x)

3. Domain/range and edge behavior
- NaN propagates: any arithmetic producing NaN will remain NaN. Use Number.isNaN and Number.isFinite to check.
- Infinity appears for overflow and certain limits; check Number.isFinite before using values as coordinates.
- Floating-point rounding: expect small epsilon errors; use rounding (toFixed or Number(Math.round(x * n) / n)) when generating discrete SVG coordinates.

4. Numeric hygiene and recommended checks
- After evaluation, coerce to Number: val = Number(result); if (!Number.isFinite(val)) treat as missing point.
- For ranges and steps, compute count defensively to avoid infinite loops: ensure step !== 0 and sign(step) matches (end - start).
- Use EPS = Math.abs(step) * 1e-12 for comparisons when iterating floats.

Reference details (API signatures)
Math.sin(x: number): number
Math.cos(x: number): number
Math.tan(x: number): number
Math.log(x: number): number
Math.exp(x: number): number
Math.pow(x: number, y: number): number
Math.sqrt(x: number): number
Math.max(...v: number[]): number
Math.min(...v: number[]): number

Supplementary implementation notes
- Use Math functions directly inside generated evaluators; do not reimplement trig/log functions.
- For constant PI use Math.PI. When mapping to pixels, apply coordinate transform formulae (see SVG_POLYLINE document).

Detailed digest
Content retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math on 2026-03-22.
This source enumerates the JavaScript Math built-ins: constants and functions used to evaluate expressions provided to the CLI. Key items included above are the exact constant values and the behavior contracts (domains, return ranges, NaN/Infinity propagation) required for producing robust numeric evaluations in plotting pipelines.

Attribution
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
Bytes retrieved: 161134
