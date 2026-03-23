MATH

Normalised extract

Table of contents
1. Constants
2. Unary functions
3. Binary / multi-argument functions
4. Usage notes for expression evaluation

Details

1. Constants
Math.PI  -> Number = 3.141592653589793
Math.E   -> Number = 2.718281828459045
Math.LN2  -> Number = natural logarithm of 2
Math.LOG10E -> Number = base-10 logarithm of E

2. Unary functions
Math.sin(x) -> Number
  Parameters: x (Number) — angle in radians
  Return: Number in range [-1, 1]
Math.cos(x) -> Number (x in radians)
Math.tan(x) -> Number
Math.abs(x) -> Number (absolute value)
Math.sqrt(x) -> Number (square root, returns NaN for negative x)
Math.log(x) -> Number (natural logarithm), domain x>0
Math.exp(x) -> Number (e^x)
Math.round(x), Math.floor(x), Math.ceil(x) -> Number

3. Binary / multi-argument functions
Math.pow(x, y) -> Number
  Parameters: x (Number), y (Number)
  Return: x raised to the power y
Math.min(...values) -> Number
Math.max(...values) -> Number
Math.hypot(...values) -> Number (square root of sum of squares)

4. Usage notes for expression evaluation
- All Math functions are static properties of the global Math object and must be referenced as Math.name within expressions.
- Numeric inputs are JavaScript Numbers (IEEE-754 double). Care for NaN and Infinity results in edge cases.
- Use Math.pow(x,y) or the exponent operator x**y (if targeting Node >= 7.6) for power operations.

Supplementary details
- Precision: JavaScript Number provides ~53 bits of integer precision; avoid assuming exact integer arithmetic for large inputs.
- Coercion: Non-number inputs are coerced to Number via standard ToNumber rules; guard against undefined/null when evaluating user input.

Reference details (signatures)
Math.sin(x: number): number
Math.cos(x: number): number
Math.tan(x: number): number
Math.abs(x: number): number
Math.sqrt(x: number): number
Math.log(x: number): number
Math.exp(x: number): number
Math.pow(x: number, y: number): number
Math.min(...values: number[]): number
Math.max(...values: number[]): number
Math.hypot(...values: number[]): number

Digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
Retrieved: 2026-03-23
Downloaded bytes: 161142

Attribution
Content originated from MDN Web Docs (developer.mozilla.org). See source URL above.
