MATH

Table of contents
- Normalised extract: key Math constants and functions
- Function signatures (reference)
- Using Math in expression parsing
- Preprocessing rules (map bare names to Math.)
- Validation and security checks for dynamic expressions
- Floating point behaviour and edge cases
- Detailed digest and attribution

Normalised extract: key Math constants and functions
Math provides IEEE-754 double-precision arithmetic and a stable set of numeric constants and unary/binary functions that are sufficient for expression evaluation in plots.

Constants and their type
- Math.E : number (Euler's constant)
- Math.LN10 : number
- Math.LN2 : number
- Math.LOG10E : number
- Math.LOG2E : number
- Math.PI : number
- Math.SQRT1_2 : number
- Math.SQRT2 : number

Common functions (signature -> returns)
- Math.abs(x) -> number
- Math.acos(x) -> number
- Math.asin(x) -> number
- Math.atan(x) -> number
- Math.atan2(y, x) -> number
- Math.ceil(x) -> number
- Math.cos(x) -> number
- Math.exp(x) -> number
- Math.floor(x) -> number
- Math.log(x) -> number (natural logarithm)
- Math.max(...values) -> number
- Math.min(...values) -> number
- Math.pow(x, y) -> number
- Math.random() -> number in [0,1)
- Math.round(x) -> number
- Math.sin(x) -> number
- Math.sqrt(x) -> number
- Math.tan(x) -> number

Using Math in expression parsing
- Expressions must evaluate to a numeric y for a numeric x.
- Expected expression forms (examples): y=Math.sin(x)  or y = x*x + 2*x - 1
- Implementation pattern: extract the right-hand side (RHS) of an assignment of the form y=RHS, validate RHS, then create an evaluatable function f(x) that returns the numeric value of RHS.
- Prefer explicit Math. references in RHS. To accept bare function names (sin, cos, sqrt) apply a controlled preprocessing map that replaces only bare identifiers with Math.<id>.

Preprocessing rules (mapping bare names to Math.)
- Allowed bare identifiers to map: sin, cos, tan, asin, acos, atan, sqrt, pow, abs, log, exp, max, min, ceil, floor, round, random, PI
- Example replacement rule (pseudocode): find occurrences of the identifier followed immediately by '(' when not preceded by a dot or identifier and replace with Math.<identifier>(
- Do not perform blind textual substitution; use a tokenizer or conservative regex that requires non-identifier boundary characters to avoid corrupting variable names.

Validation and security checks for dynamic expressions
- Whitelist token categories: numbers, decimal point, parentheses, arithmetic operators + - * / % **, commas, whitespace, the identifier x, numeric literals, and allowed Math identifiers (explicitly listed).
- Reject or fail if the RHS contains any of: semicolon ;, backtick `, template literal patterns, import/require/process/window/global, new Function, Function, eval, class, => (arrow), or characters indicating object access beyond Math (e.g., bracket [ or curly { without strong validation).
- After validation, compile using the Function constructor as a controlled step: new Function('x', 'return ' + RHS); immediately call with test numeric x values in try/catch to detect runtime errors.
- Always run evaluation inside try/catch and surface parse/runtime errors to the caller rather than allowing unhandled exceptions.

Floating point behaviour and edge cases
- JavaScript uses IEEE-754 double precision: expect rounding errors for non-representable numbers and functions; avoid equality comparisons for floats without tolerance.
- Functions may produce NaN or Infinity; treat these as missing points or filter them when generating polyline points.

Reference details
- Math constants and functions (exact signatures): listed above. Each function accepts and returns JavaScript number values (64-bit float).
- Implementation pattern to obtain f(x) from expression string E that matches /^\s*y\s*=\s*(.+)$/:
  1. Extract RHS: RHS = captured group 1; trim whitespace.
  2. Preprocess bare identifiers -> Math.<id> using conservative token-based replacement.
  3. Validate RHS against whitelist of tokens/identifiers.
  4. Compile: f = new Function('x', 'return ' + RHS);
  5. Test: numericY = f(0) or f(1) inside try/catch to ensure it runs.

Detailed digest
- Source: MDN Web Docs — Math object
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
- Retrieved: 2026-03-21
- Data obtained during crawl: 166177 bytes

Attribution
- Content extracted from MDN Math documentation and condensed into implementation-oriented reference for parsing and evaluating mathematical expressions using JavaScript Math functions.