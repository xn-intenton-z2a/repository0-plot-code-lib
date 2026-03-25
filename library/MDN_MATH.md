NORMALISED_EXTRACT

Table of contents:
- Constants
- Trigonometric functions
- Exponentials, logs and roots
- Rounding and integer operations
- Utility and aggregated functions
- Behavioural and domain notes

Constants (value types and meaning)
- Math.E: number; Euler's number approximately 2.718281828459045
- Math.LN10: number; natural logarithm of 10
- Math.LN2: number; natural logarithm of 2
- Math.LOG2E: number; base-2 logarithm of E
- Math.LOG10E: number; base-10 logarithm of E
- Math.PI: number; π ≈ 3.141592653589793
- Math.SQRT1_2: number; 1/√2 ≈ 0.7071067811865476
- Math.SQRT2: number; √2 ≈ 1.4142135623730951

Trigonometric functions (signatures)
- Math.sin(x) -> number
- Math.cos(x) -> number
- Math.tan(x) -> number
- Math.asin(x) -> number
- Math.acos(x) -> number
- Math.atan(x) -> number
- Math.atan2(y, x) -> number

Exponentials, logs, roots
- Math.exp(x) -> number (e^x)
- Math.log(x) -> number (natural logarithm), domain x>0
- Math.pow(base, exponent) -> number
- Math.sqrt(x) -> number or NaN for x<0

Rounding and integer operations
- Math.floor(x) -> number (largest integer ≤ x)
- Math.ceil(x) -> number (smallest integer ≥ x)
- Math.round(x) -> number (nearest integer; ties to +Infinity)
- Math.trunc(x) -> number (integer part by truncation)

Utility and aggregated
- Math.abs(x) -> number
- Math.max(...values) -> number
- Math.min(...values) -> number
- Math.hypot(...values) -> number
- Math.random() -> number in [0, 1)

Behavioural and domain notes
- All Math.* functions operate on JavaScript Number (IEEE-754 double). Expect NaN where mathematical result is undefined (e.g., sqrt(-1)).
- Math.pow with negative base and non-integer exponent returns NaN due to real-number domain rules.
- Math.random returns a pseudo-random double in [0,1); do not use for cryptographic randomness.

Implementation notes for expression parsing and evaluation
- The global Math object is available inside functions created with the Function constructor; expressions referencing Math.sin, Math.PI, etc. will resolve without injection.
- For convenience and shorter expressions, a parser can add local aliases by composing a function body that declares local consts (e.g., const sin = Math.sin;) before the return expression; this increases surface area for injection and must be guarded.
- When sampling over a numeric range, evaluate the parsed function once per x value; use Number.isFinite to filter non-finite results.

REFERENCE_DETAILS

- Function signatures are nominally: Math.<name>(...args) returning number (unless documented otherwise).
- No parameters are optional unless documented; e.g., Math.random() takes no parameters, Math.max with zero arguments returns -Infinity, Math.min with zero arguments returns +Infinity.

DETAILED_DIGEST

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
Date retrieved: 2026-03-25
Data captured: ~162.3 KB

Extracted technical points used above: canonical function names and return behaviours, numeric domain notes, and practical guidance for using Math in dynamically-evaluated expressions.

ATTRIBUTION
MDN Web Docs — Math (Mozilla). Content condensed for direct implementation reference.