ROMAN_NUMERALS

NORMALISED EXTRACT

Table of contents
- Symbols and values
- Subtractive notation (allowed pairs and rules)
- Construction rules and constraints (range, repetitions)
- Validation pattern (strict regex)
- Integer -> Roman algorithm (mapping and steps)
- Roman -> Integer algorithm (validation and parsing)
- Examples

1. Symbols and values
I = 1
V = 5
X = 10
L = 50
C = 100
D = 500
M = 1000

2. Subtractive notation (allowed pairs and rules)
- Allowed subtractive pairs and their values: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.
- Subtraction is only valid when a smaller-value symbol immediately precedes a larger-value symbol from the next one or two ranks above: I may precede V or X; X may precede L or C; C may precede D or M.
- V, L and D are never used as subtractive prefixes.

3. Construction rules and constraints
- Valid numeric range: 1 through 3999 inclusive.
- Symbols are written from largest to smallest, left-to-right, combining additive and allowed subtractive forms.
- No symbol may repeat more than three times consecutively (I, X, C, M). V, L and D must never be repeated consecutively.
- Only the subtractive pairs listed above are permitted; expressions like IL, IC, XM, or VX are invalid and must be rejected.

4. Validation pattern (strict regex)
- Use the exact restrictive regular expression to validate canonical Roman numerals in the range 1..3999:
  ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$
- Apply this regex as a first-pass strict validator; if a candidate string does not match, it is invalid and should cause the implementation to throw TypeError.

5. Integer -> Roman algorithm (mapping and steps)
- Ordered mapping (value then symbol) to use exactly in this sequence:
  1000  M
  900   CM
  500   D
  400   CD
  100   C
  90    XC
  50    L
  40    XL
  10    X
  9     IX
  5     V
  4     IV
  1     I

- Implementation steps (imperative pattern):
  1. Validate input type and range: accept integers only. If n < 1 or n > 3999, throw RangeError. If input is not a finite integer, throw TypeError.
  2. Initialize output = empty string.
  3. For each pair (value, symbol) in the ordered mapping, while n >= value, append symbol to output and subtract value from n.
  4. When all pairs processed, return output.

6. Roman -> Integer algorithm (validation and parsing)
- Strict validation: first apply the regex from section 4; if it does not match, throw TypeError.
- Parsing pattern (single-pass, left-to-right):
  1. Map each Roman character to its numeric value using the symbol map from section 1.
  2. Initialize total = 0 and index = 0.
  3. While index < length: look at value(current). If there is a next symbol and value(current) < value(next), then total += value(next) - value(current); index += 2. Otherwise total += value(current); index += 1.
  4. Return total.
- This parsing assumes the input passed strict validation; combined with validation it enforces canonical subtractive notation (no non-standard subtractive forms).

7. Examples (canonical)
- Integer 1994 -> MCMXCIV
- Roman 'MCMXCIV' -> Integer 1994
- Integer 4 -> IV
- Any integer n in 1..3999 when converted to Roman and back should produce the original integer (round-trip property).

SUPPLEMENTARY DETAILS

Implementation notes
- Mapping is small and fixed; use an ordered array of (value, symbol) pairs as shown above.
- For int->roman the algorithm is effectively O(1) time because the maximum number of loop iterations is bounded by the limited range (practically O(1) for n <= 3999). For roman->int time is O(L) where L is the length of the input string (bounded by ~15 for standard forms).
- Use uppercase-only validation; either require callers to uppercase inputs or reject lowercase by TypeError. Prefer rejecting and documenting strict input requirements for clarity.

Error handling conventions
- intToRoman(n): if n < 1 or n > 3999, throw RangeError with a clear message. If n is not a finite integer, throw TypeError.
- romanToInt(s): if s is not a string, or does not match the strict regex from section 4, throw TypeError.

Recommended unit tests (minimum)
- Boundary values: 1 -> I, 3999 -> MMMCMXCIX
- Known example: 1994 -> MCMXCIV and back
- Subtractive cases: 4 -> IV, 9 -> IX, 40 -> XL, 90 -> XC, 400 -> CD, 900 -> CM
- Invalid numbers: 0 and 4000 should throw RangeError
- Invalid Roman strings: 'IIII', 'VV', 'IL', 'IC', 'XM' should throw TypeError
- Non-string inputs for romanToInt and non-integer/NaN for intToRoman should throw TypeError

REFERENCE DETAILS (API SPECIFICATIONS & IMPLEMENTATION PATTERNS)

Public API (named exports expected from src/lib/main.js)
- intToRoman(n: number) -> string
  - Parameters: n — integer, 1 <= n <= 3999
  - Returns: canonical Roman numeral string using subtractive notation
  - Throws: RangeError when n < 1 or n > 3999; TypeError when n is not a finite integer

- romanToInt(s: string) -> number
  - Parameters: s — string containing canonical Roman numerals (uppercase)
  - Returns: integer equivalent in 1..3999
  - Throws: TypeError when s is not a string or fails strict validation (see section 4)

Exact mapping array (use this literal order)
- [(1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'), (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'), (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')]

Canonical strict validation regex (exact, for 1..3999)
- ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$

Implementation pattern examples (text only, no code blocks)
- intToRoman: iterate mapping array from largest to smallest; repeatedly append symbol while subtracting value.
- romanToInt: validate with regex; then iterate left-to-right using pairwise subtraction logic: if current < next subtract else add.

Detailed troubleshooting steps
- If romanToInt returns incorrect values, confirm input passed the strict regex; non-canonical inputs cause ambiguous parsing and must be rejected.
- If intToRoman produces 'IIII' or similar, ensure mapping uses subtractive entries (9, 4, 90, 40, 900, 400) before smaller symbols.
- For unexpected RangeError/TypeError, verify input types and exact thrown messages in unit tests to ensure specificity.

DETAILED DIGEST (sources crawled and retrieval details)
- https://en.wikipedia.org/wiki/Roman_numerals
  - Retrieval date: 2026-03-21
  - HTTP status: 200
  - Bytes downloaded: 510215
  - Notes: Authoritative reference for symbol definitions, allowed subtractive usage, history and examples; used to confirm mapping, subtractive rules, and canonical regex pattern.

- https://rosettacode.org/wiki/Roman_numerals
  - Retrieval date: 2026-03-21
  - HTTP status: 200
  - Bytes downloaded: 42095
  - Notes: Multiple algorithm examples and implementation idioms for both directions; used to corroborate algorithm patterns and ordered mapping.

- https://www.mathsisfun.com/roman-numerals.html
  - Retrieval date: 2026-03-21
  - HTTP status: 200
  - Bytes downloaded: 11457
  - Notes: Concise rules and examples for subtractive notation and symbol repetitions; used for tests and human-readable rule phrasing.

- https://www.npmjs.com/package/roman-numerals
  - Retrieval date: 2026-03-21
  - HTTP status: 403
  - Bytes downloaded: 7174
  - Notes: npm package metadata was partially retrieved (403 indicates limited access); used to check common API naming conventions and test vectors when visible.

- https://exercism.org/tracks/javascript/exercises/roman-numerals
  - Retrieval date: 2026-03-21
  - HTTP status: 200
  - Bytes downloaded: 38854
  - Notes: Exercise description and test expectations; useful for building unit tests and example cases.

ATTRIBUTION
- Content extracted and condensed from the listed sources (Wikipedia, Rosetta Code, MathIsFun, npm package page, Exercism) on 2026-03-21. Bytes downloaded are recorded above for each source and included as retrieval metadata.

USAGE CHECKLIST FOR IMPLEMENTERS
- Export named functions intToRoman and romanToInt from src/lib/main.js.
- Ensure thrown error types: RangeError for out-of-range numbers; TypeError for invalid Roman strings or wrong input types.
- Implement strict validation with the provided regex and parsing algorithm to guarantee canonical forms and round-trip property.

END OF DOCUMENT
