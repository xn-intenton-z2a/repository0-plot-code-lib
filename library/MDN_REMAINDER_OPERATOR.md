NORMALISED EXTRACT

Operator semantics
- Remainder (modulo) operator: a % b -> number.
- ECMAScript semantics: result is a - trunc(a / b) * b where trunc is toward zero.
- If b is 0 -> result is NaN.
- Remainder sign follows the dividend: (-4) % 3 -> -1.

Table of contents
- Definition and semantics
- Edge cases
- Use in divisibility tests

Detailed information
Definition and semantics
- Mathematical description: remainder r = a - trunc(a / b)*b.
- For integers, a % b === 0 indicates a is divisible by b.

Edge cases
- b === 0 => a % 0 is NaN.
- Non-integer operands are allowed; remainder is computed on numeric values after coercion rules.
- Negative dividend yields negative remainder (sign of dividend).

Implementation patterns (for FizzBuzz)
- Use (i % 3 === 0) and (i % 5 === 0) for positive integers.
- Use (i % 15 === 0) as the combined check for both 3 and 5.
- Always use strict equality (===) when comparing to 0 to avoid type-coercion pitfalls.

REFERENCE DETAILS (exact behaviour)
- Operator: a % b -> number
  - Inputs: a: number, b: number
  - Returns: numeric remainder r where r === a - trunc(a / b) * b
  - Special: if b === 0 => NaN; if either operand is NaN => NaN

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder_operator
- Retrieved: 2026-03-21
- Data size obtained during crawl (trimmed capture): 20000 bytes
- Extract (first fragment captured; MDN returned a not-found / spa wrapper in trimmed content):

      <!doctype html>
      <html
        lang="en-US"
        data-theme="light dark"
        data-renderer="SpaNotFound"

ATTRIBUTION
- MDN Web Docs (Remainder operator). Note: crawler received a site shell / not-found fragment from MDN; remainder semantics above follow ECMAScript standard used by MDN pages.
