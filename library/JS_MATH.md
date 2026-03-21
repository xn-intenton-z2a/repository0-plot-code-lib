JS_MATH

Table of contents
- Overview and purpose
- Important constants
- Trigonometric functions (radian units)
- Common numeric helpers
- Implementation notes and edge cases

Normalised extract
- Math is a global object exposing constants and numeric functions used in plotting and expression evaluation.
- Trigonometric functions use radians: Math.sin(x), Math.cos(x), Math.tan(x).
- Constants: Math.PI (~3.14159), Math.E.
- Numeric helpers: Math.abs, Math.pow, Math.sqrt, Math.log, Math.exp, Math.min, Math.max, Math.round, Math.floor, Math.ceil.

Reference details (API signatures)
- Math.sin(x) -> Number
- Math.cos(x) -> Number
- Math.tan(x) -> Number
- Math.abs(x) -> Number
- Math.pow(x, y) -> Number (use instead of ^)
- Math.sqrt(x) -> Number
- Math.log(x) -> Number (natural log)
- Math.PI -> Number (constant)
- Behavior: Functions accept numeric values; non-number inputs are coerced to Number; NaN propagates.

Implementation notes
- Use radians for angle inputs; convert degrees to radians with deg * Math.PI / 180 when needed.
- For plotting sample points, expect floating-point results; guard against NaN and Infinity.

Detailed digest (source and retrieval)
Source: MDN Math object
Retrieved: 2026-03-21
Crawled bytes: 161138
Attribution: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
