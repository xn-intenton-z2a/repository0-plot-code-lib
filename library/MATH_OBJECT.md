MATH_OBJECT

Table of contents
- Overview
- Numeric constants
- Common methods (signatures)
- Behavior notes
- Implementation guidance for expression evaluation
- Reference details
- Digest and attribution

Normalized extract
Overview
- Math is a built-in object that provides properties and methods for mathematical constants and functions.
- Math is not a constructor; use Math.<name> to call functions.

Numeric constants
- Math.PI: number — ratio of circumference to diameter (~3.14159)
- Math.E: number — base of natural logarithms (~2.71828)
- Math.LN10, Math.LN2, Math.LOG10E, Math.LOG2E, Math.SQRT1_2, Math.SQRT2

Common methods (signatures)
- Trigonometry
  - Math.sin(x: number) -> number
  - Math.cos(x: number) -> number
  - Math.tan(x: number) -> number
  - Math.asin(x: number) -> number
  - Math.acos(x: number) -> number
  - Math.atan(x: number) -> number
  - Math.atan2(y: number, x: number) -> number
- Exponentials, logs
  - Math.exp(x: number) -> number
  - Math.log(x: number) -> number (natural logarithm)
  - Math.pow(x: number, y: number) -> number
  - Math.sqrt(x: number) -> number
- Rounding / abs
  - Math.abs(x: number) -> number
  - Math.floor(x: number) -> number
  - Math.ceil(x: number) -> number
  - Math.round(x: number) -> number
- Min/Max
  - Math.min(...values: number[]) -> number
  - Math.max(...values: number[]) -> number

Behavior notes
- All functions accept and return JavaScript Numbers (IEEE-754 double precision).
- Math methods are deterministic and have well-defined numeric edge cases (NaN, Infinity); rely on standard JavaScript semantics.

Implementation guidance for expression evaluation
- Expressions referencing Math functions must reference Math explicitly (e.g., Math.sin(x)).
- To allow short forms like sin(x), either pre-process to replace sin with Math.sin (risky) or require users to include Math. in expressions (recommended for simplicity and safety).

Reference details
- Source API: Math (global)
- Use: Math.NAME(parameters) where NAME is a constant or function name; parameters typed as Number; returns Number.

Digest
- Source: MDN: Math - JavaScript | MDN Web Docs
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
- Retrieved: 2026-03-21
- Crawl bytes: 161138 bytes

Attribution
- Content extracted and condensed from MDN Web Docs (Math). Data retrieved 2026-03-21, 161138 bytes.
