MDN_MATH

Table of contents
1. Overview
2. Numeric model
3. Core functions and constants (exact signatures)
4. Usage notes for plotting (angles, ranges)
5. Reference details
6. Detailed digest (retrieved)
7. Attribution and crawl size

1. Overview
The global Math object provides standard mathematical functions and constants for JavaScript. All Math methods operate on numbers (IEEE-754 double precision). Use these functions inside parsed expressions for plots (e.g., Math.sin, Math.cos).

2. Numeric model
- Inputs and return values are JavaScript Number (IEEE-754 64-bit double precision).
- Non-finite results (Infinity, -Infinity) and NaN propagate. Use Number.isFinite or Number.isNaN to check results.

3. Core functions and constants (exact signatures)
- Math.sin(x: number): number  -- x in radians
- Math.cos(x: number): number
- Math.tan(x: number): number
- Math.asin(x: number): number
- Math.acos(x: number): number
- Math.atan(x: number): number
- Math.atan2(y: number, x: number): number
- Math.exp(x: number): number
- Math.log(x: number): number  -- natural logarithm
- Math.sqrt(x: number): number
- Math.pow(x: number, y: number): number
- Math.abs(x: number): number
- Math.min(...values: number[]): number
- Math.max(...values: number[]): number
- Math.round(x: number): number
- Math.floor(x: number): number
- Math.ceil(x: number): number
Constants:
- Math.PI: number
- Math.E: number
- Math.LN2, Math.LN10, Math.LOG2E, Math.LOG10E

4. Usage notes for plotting
- Trigonometric inputs are radians (not degrees). Convert degrees to radians before calling trig functions.
- For high-frequency or high-precision plotting be mindful of floating point rounding; sample density (step) must be chosen to capture features.
- When computing bounds, use Number.POSITIVE_INFINITY/NEGATIVE_INFINITY defensively and update min/max while iterating samples.

5. Reference details
- All functions accept Number and return Number.
- Common pitfalls: Math.pow with large exponents may overflow to Infinity; taking Math.log of non-positive numbers returns NaN.

6. Detailed digest (retrieved)
Source: MDN Web Docs "Math - JavaScript | MDN"
Retrieved: 2026-03-21
Crawl bytes downloaded: 161138
Extracted facts used above: function names, their parameter lists, IEEE-754 numeric model and behaviour notes.

7. Attribution
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
Crawl size (bytes): 161138
License / attribution: MDN content (see source site).