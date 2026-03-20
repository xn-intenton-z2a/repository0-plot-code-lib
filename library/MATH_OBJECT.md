NORMALISED EXTRACT

Table of Contents
1. Overview and constants
2. Primary numeric methods (signatures)
3. Domain, ranges and edge cases
4. Performance and accuracy notes
5. Using Math functions in evaluators

1. Overview and constants
- Math is a built-in object providing numeric constants and functions. It is not a constructor; use Math directly.
- Important constants: Math.PI (3.14159...), Math.E.

2. Primary numeric methods (signatures)
- Math.sin(x) -> Number; x in radians.
- Math.cos(x) -> Number; x in radians.
- Math.tan(x) -> Number; may return large values near pi/2 + k*pi.
- Math.pow(x, y) -> Number; equivalent to x**y in modern JS but available as Math.pow.
- Math.sqrt(x) -> Number; returns NaN for x < 0.
- Math.abs(x) -> Number.
- Math.log(x) -> Number; natural logarithm; NaN for x <= 0.
- Math.exp(x) -> Number; e^x.
- Math.min(a, b, ...) -> Number; Math.max(a,b,...)
- Math.round, Math.floor, Math.ceil, Math.trunc
- Math.random() -> Number in [0,1)

3. Domain, ranges and edge cases
- Many functions return NaN for invalid domain inputs (e.g., sqrt of negative). Implement evaluator to propagate NaN safely.
- Floating point precision applies; expect typical IEEE-754 rounding behavior.

4. Performance and accuracy notes
- Calling Math functions is native and fast; use them directly inside generated functions for best performance.
- Avoid creating wrappers around Math for hot loops; call Math.* inside the generated Function body.

5. Using Math functions in evaluators
- Since Function-created functions execute in global scope, Math is available as Math.<name> inside the body without extra qualification.
- When validating expressions, allow Math identifier followed by dot and a method name from the trusted list above.

SUPPLEMENTARY DETAILS
- Allowed function list to include at least: sin, cos, tan, asin, acos, atan, pow, sqrt, abs, log, exp, min, max, floor, ceil, round, trunc.
- For constant PI usage, accept uppercase or lowercase PI only if translated to Math.PI during parsing if user supplies PI without Math prefix.

REFERENCE DETAILS
- Example signatures: Math.sin(Number) -> Number; Math.pow(Number, Number) -> Number.
- Implementation pattern: created evaluator body should phrase library calls as Math.sin(x) etc. No external math libraries are required or used.

DETAILED DIGEST
- Source: MDN Math object page
- Retrieved: 2026-03-20
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
- Bytes fetched: 161140

ATTRIBUTION
- Content condensed from MDN documentation for the JavaScript Math object; includes method signatures, behavior, and implementation recommendations for expression evaluation.