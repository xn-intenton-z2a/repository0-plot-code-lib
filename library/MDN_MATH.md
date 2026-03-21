NORMALISED EXTRACT

Table of contents
- Constants and properties
- Unary functions
- Binary and variadic functions
- Numeric behaviour and coercion
- Usage notes for expression evaluation in JS

1. Constants and properties
Math.PI: Number constant 3.141592653589793
Math.E: Number constant 2.718281828459045
Other numeric constants: LN2, LN10, LOG2E, LOG10E, SQRT1_2, SQRT2

2. Unary functions (argument -> return)
Math.sin(x) -> Number; input x coerced to Number; x in radians; returns NaN for non-numeric coercion results
Math.cos(x) -> Number
Math.tan(x) -> Number
Math.sqrt(x) -> Number; returns NaN for x < 0
Math.abs(x) -> Number
Math.exp(x) -> Number; e raised to x
Math.log(x) -> Number; natural logarithm
Math.floor(x), Math.ceil(x), Math.round(x)

3. Binary and variadic functions
Math.pow(x, y) -> Number; both args coerced to Number; negative base with non-integer exponent yields NaN
Math.max(...values) -> Number; Math.min(...values) -> Number
Math.atan2(y, x) -> Number

4. Numeric behaviour and coercion
All Math methods perform ToNumber coercion on arguments. NaN and Infinity propagate per IEEE-754 rules. Results are IEEE-754 double precision.

5. Usage notes for expression evaluation
When evaluating expressions that reference Math, ensure the evaluation environment exposes Math explicitly (for example, by evaluating expressions with a Function created in a scope where Math is bound). Do not rely on implicit globals when sandboxing.

SUPPLEMENTARY DETAILS
- Input ranges: JS Number range for arguments unless explicitly documented to reject values (example: Math.sqrt negative input -> NaN).
- Edge cases: Math.pow(Infinity, 0) returns 1; Math.max() with no args returns -Infinity; Math.min() returns +Infinity.
- Performance: Math functions are native and performant; avoid wrapping calls in extra allocations where high throughput is required.

REFERENCE DETAILS (API SIGNATURES AND EFFECTS)
- Math.PI : Number constant
- Math.E : Number constant
- Math.sin(x: any) -> number  — coerces x to Number; returns NaN for non-finite results
- Math.cos(x: any) -> number
- Math.tan(x: any) -> number
- Math.sqrt(x: any) -> number
- Math.abs(x: any) -> number
- Math.pow(x: any, y: any) -> number
- Math.max(...values: any[]) -> number
- Math.min(...values: any[]) -> number

Concrete implementation pattern for expression evaluation
- Use Function("x", "Math", "return " + expressionBody) to create a callable with explicit Math binding; call with (xValue, Math). This keeps Math available while avoiding implicit global lookups.
- Validate expressionBody contains only allowed tokens before constructing a Function to mitigate injection risks.

DETAILED DIGEST
Source: MDN Math object reference
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced page (no bytes downloaded by this run)

ATTRIBUTION
MDN Web Docs - JavaScript Math (developer.mozilla.org)
