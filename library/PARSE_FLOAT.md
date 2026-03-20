NORMALISED EXTRACT

Table of Contents
1. Purpose and behavior
2. Signature and types
3. Parsing rules and edge cases
4. Examples of parse behavior
5. Best practices for numeric parsing in CLI and expression evaluation

1. Purpose and behavior
- Number.parseFloat is a standard JavaScript global function (aliased as the global parseFloat) that parses a string argument and returns a floating point number parsed from the leading portion of the string.
- It is suitable for parsing decimal numeric literals from user input where trailing text may appear and should be ignored.

2. Signature and types
- Number.parseFloat(string) -> Number
  - string: input value to parse; if not a string it is coerced to string via ToString.
  - Returns: a Number representing the parsed value; returns NaN if the first non-whitespace character cannot be converted to a number.

3. Parsing rules and edge cases
- Leading whitespace in the input string is ignored.
- Parsing reads an optional sign (+ or -), then as many characters as form a valid floating point literal: digits with optional decimal point and optional exponent part (e or E followed by optional sign and digits).
- Parsing stops at the first character that is not part of a valid floating point literal; the parsed leading portion is returned as a number.
- If the string begins with 0x or 0X then parseFloat stops at the 0 and returns 0 (hexadecimal is not parsed as a float by parseFloat). For hexadecimal, prefer parseInt with radix or Number('0x...') where appropriate.
- parseFloat('Infinity') and parseFloat('infinity') return Infinity (case-insensitive match for Infinity family supported by the engine).
- parseFloat('') -> NaN and Number.isNaN can be used to detect invalid parse results.

4. Examples (described inline)
- Input: '3.14abc' -> returns 3.14 (parses the leading numeric portion)
- Input: '  -2.5e3' -> returns -2500 (handles exponent notation)
- Input: '0x10' -> returns 0 (hex prefix is not parsed as a decimal float by parseFloat)
- Input: 'abc' -> returns NaN

5. Best practices for CLI and expression evaluation
- Always coerce inputs explicitly and validate format when deterministic numeric parsing is required (e.g., use Number(str) if full-string numeric validation is desired and not partial parsing).
- When building an array of sample x values from a range string, use parseFloat for flexible parsing of numeric literals but verify the result is finite (Number.isFinite) before using the value.
- For strict integer or index parsing, use parseInt with an explicit radix.

SUPPLEMENTARY DETAILS
- parseFloat is exposed on Number as Number.parseFloat but remains identical to the global parseFloat; prefer Number.parseFloat in modular code to avoid accidental global shadowing.

REFERENCE DETAILS (exact signatures and behaviors)
- Number.parseFloat(string) -> Number
- Parsing specifics: accepts optional leading whitespace, optional sign, digits, optional decimal point and fractional digits, optional exponent part (e or E followed by optional sign and digits). Returns NaN if no valid leading numeric portion is found.

DETAILED DIGEST
- Source: MDN Number.parseFloat documentation
- Retrieved: 2026-03-20
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat
- Bytes fetched: 157330

ATTRIBUTION
- Content extracted and condensed from MDN documentation for Number.parseFloat (see source URL). The above includes signature, exact parsing rules, edge cases and recommended usage notes for robust CLI parsing.