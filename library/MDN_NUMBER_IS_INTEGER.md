NORMALISED EXTRACT

API signature
- Number.isInteger(value) -> boolean
  - Parameters: value: any
  - Returns: true if value is of type 'number', is finite, and is an integral number (no fractional part).

Table of contents
- Behaviour and return values
- Edge cases
- Usage patterns for validation

Detailed information
Behaviour and return values
- Number.isInteger(value) returns true exactly when:
  - typeof value === 'number'
  - value is finite (not NaN, not Infinity)
  - floor(value) === value (no fractional component)
- Examples of boolean results:
  - Number.isInteger(3) -> true
  - Number.isInteger(3.0) -> true
  - Number.isInteger(3.5) -> false
  - Number.isInteger(NaN) -> false
  - Number.isInteger(Infinity) -> false

Usage patterns for FizzBuzz
- Validate inputs: if (typeof n !== 'number' || !Number.isInteger(n)) throw new TypeError('n must be an integer')
- Do not use Number.isInteger to coerce strings; use explicit numeric check or parse first.

REFERENCE DETAILS (exact behaviour)
- Function: Number.isInteger(value): boolean
  - Accepts any JavaScript value; returns a boolean; does NOT coerce strings to numbers.

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
- Retrieved: 2026-03-21
- Data size obtained during crawl (trimmed capture): 20000 bytes
- Extract (first fragment of retrieved HTML):

      <!doctype html>
      <html
        lang="en-US"
        data-theme="light dark"
        data-renderer="Doc"

ATTRIBUTION
- MDN Web Docs: Number.isInteger() reference. Content trimmed for digest.
