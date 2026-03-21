ROMAN_NUMERALS

Table of contents
1. Normalised extract
   1.1 Symbol-to-value map
   1.2 Subtractive notation rules and constraints
   1.3 Valid range and repetition rules
   1.4 Canonical validator (strict regex)
   1.5 Conversion mapping (descending token list)
2. Supplementary details
   2.1 Integer to Roman algorithm (greedy mapping)
   2.2 Roman to Integer algorithm (strict-validate then parse)
   2.3 Validation steps and failure modes
   2.4 Edge cases and extended notation notes
3. Reference details (API signatures, parameters, errors, examples)
   3.1 Public API: named exports
   3.2 Function signatures and semantics
   3.3 Validation regex (exact)
   3.4 Test vectors and acceptance criteria mapping
   3.5 Implementation patterns and troubleshooting
4. Detailed digest (source extracts and retrieval metadata)
5. Attribution and data sizes


1. Normalised extract

1.1 Symbol-to-value map
I = 1
V = 5
X = 10
L = 50
C = 100
D = 500
M = 1000

1.2 Subtractive notation rules and constraints
- Allowed subtractive pairs and their values: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.
- Only these subtractive combinations are accepted: I may precede V or X; X may precede L or C; C may precede D or M. Other preceding-larger pairs (e.g., IL, IC, XM) are invalid.

1.3 Valid range and repetition rules
- Valid integers: 1 through 3999 inclusive. Values outside this range should raise RangeError for integer-to-Roman conversion. Representation above 3999 requires overline notation and is out of scope.
- Repetition rules: I, X, C, and M may repeat at most three times in succession. V, L, and D must not be repeated consecutively.

1.4 Canonical validator (strict regex)
Use this canonical strict validator to accept only conventional Roman numerals in range 1..3999:
^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$
This regex enforces correct ordering, subtractive pairs, and repetition limits for numerals up to 3999.

1.5 Conversion mapping (descending token list)
Use the following ordered mapping for greedy integer->Roman conversion (value then symbol):
1000 => M
900  => CM
500  => D
400  => CD
100  => C
90   => XC
50   => L
40   => XL
10   => X
9    => IX
5    => V
4    => IV
1    => I


2. Supplementary details

2.1 Integer to Roman algorithm (greedy mapping)
- Validate input type (number) and integral constraint (no fractional values allowed). If invalid type, throw TypeError.
- If n < 1 or n > 3999, throw RangeError.
- Iterate the descending mapping list. For each pair (value, symbol): while n >= value append symbol to output and subtract value from n. Continue until n == 0. The result is the canonical Roman representation using subtractive notation.

2.2 Roman to Integer algorithm (strict-validate then parse)
- Validate input type (string). If not a string, throw TypeError.
- Trim whitespace; if empty after trim, throw TypeError.
- Test the trimmed string against the canonical validator regex above. If it does not match, throw TypeError (strict validation).
- Parse left-to-right by mapping individual symbols to their numeric values and applying addition/subtraction: read each symbol and add its value; if a symbol of smaller value precedes a larger value, subtract the smaller instead of adding. Accumulate to produce the integer result.
- After parsing, the result must be in 1..3999; otherwise throw RangeError.

2.3 Validation steps and failure modes
- Non-string or empty input: TypeError.
- Characters outside [IVXLCDM]: TypeError.
- Invalid ordering or invalid subtractive pairs: TypeError (use canonical regex to detect these).
- Numerals representing values outside 1..3999 should be rejected for this library's scope.

2.4 Edge cases and extended notation notes
- Clock-face IV vs IIII: some cultural uses accept IIII for 4, but this project requires strict subtractive notation; IIII is invalid and must raise TypeError.
- Overline or vinculum notation for values >= 4000 is out of scope.


3. Reference details (API signatures, parameters, errors, examples)

3.1 Public API: named exports (from src/lib/main.js)
- integerToRoman
- romanToInteger
Exported as named exports (no default export).

3.2 Function signatures and semantics
- integerToRoman(n: number): string
  - Parameters: n — integer, required, 1 <= n <= 3999.
  - Returns: string — canonical Roman numeral representation using subtractive notation.
  - Errors: Throws RangeError if n < 1 or n > 3999. Throws TypeError if n is not a finite integer.
  - Example: integerToRoman(1994) => MCMXCIV
  - Example: integerToRoman(4) => IV

- romanToInteger(s: string): number
  - Parameters: s — string, required, must be a non-empty Roman numeral matching the canonical regex.
  - Returns: number — integer value represented by s (1..3999).
  - Errors: Throws TypeError for invalid strings (characters, ordering, repetition, invalid subtractive usage). Throws TypeError if input is not a string. Throws RangeError if value is outside 1..3999 (practically caught by regex but included for completeness).
  - Example: romanToInteger("MCMXCIV") => 1994
  - Example: romanToInteger("IIII") => throws TypeError

3.3 Validation regex (exact)
- Use exactly: ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$
- This should be applied to trimmed input before parsing; do not accept partial matches.

3.4 Test vectors and acceptance criteria mapping
- integerToRoman(1994) => MCMXCIV  (AC 1)
- romanToInteger("MCMXCIV") => 1994 (AC 2)
- integerToRoman(4) => IV (AC 3)
- Round-trip: For all n in 1..3999, romanToInteger(integerToRoman(n)) === n (AC 4)
- integerToRoman(0) => throws RangeError (AC 5)
- integerToRoman(4000) => throws RangeError (AC 6)
- romanToInteger("IIII") => throws TypeError (AC 7)
- Unit tests should include boundaries (1, 3999), subtractive cases (4, 9, 40, 90, 400, 900), repetitions, invalid characters, invalid ordering, and whitespace handling.

3.5 Implementation patterns and troubleshooting
- Recommended implementation pattern for integerToRoman: greedy loop over descending mapping tokens. This is O(k) where k is number of tokens (constant); performance is trivial for 1..3999.
- Recommended implementation pattern for romanToInteger: strict regex validation first, then single-pass parse accumulating totals using a mapping of single-character values.
- Troubleshooting: if tests fail for subtractive cases, verify mapping includes 900, 400, 90, 40, 9, 4 tokens and that the greedy algorithm checks tokens in descending order.
- If romanToInteger accepts invalid strings like "IC" or "IL", ensure the regex is applied before parsing.


4. Detailed digest (source extracts and retrieval metadata)
All sources retrieved on 2026-03-21.

Source: https://en.wikipedia.org/wiki/Roman_numerals
Bytes retrieved: 510215
Extracted technical points (condensed):
- Complete symbol table and historical notes. Lists canonical subtractive pairs: IV, IX, XL, XC, CD, CM. Explains subtractive principle where a smaller-value symbol before a larger-value symbol subtracts. Documents repetition limits and the fact that overline indicates multiplication by 1,000 (out of scope).
- Provides historical variants but includes the canonical modern rules captured by the validator regex.

Source: https://www.mathsisfun.com/roman-numerals.html
Bytes retrieved: 11457
Extracted technical points (condensed):
- Practical conversion guidance: break numbers into thousands/hundreds/tens/ones and convert each segment; explicit tables showing combinations for 1..9 within each place value and demonstration of forming numbers such as 1984 => MCMLXXXIV.
- States repetition advice (no more than three in a row) and presents basic subtractive examples and construction rules.

Source: https://www.romannumerals.org/
Bytes retrieved: 35017
Extracted technical points (condensed):
- Clear mapping and conversion rules, plus examples and notes about invalid subtractive forms; includes examples of canonical subtractive notation and notes about extended forms for large numbers.

Source: https://www.npmjs.com/package/roman-numerals
Bytes retrieved: 7174
Extracted technical points (condensed):
- Example implementations and usage patterns for converting numbers to roman and vice versa; community package references illustrate typical API names and behaviors. Note: package pages may include additional metadata and Cloudflare challenges; validate library behavior against canonical rules above rather than trusting permissive implementations.


5. Attribution and data sizes
- en.wikipedia.org/wiki/Roman_numerals — 510215 bytes (fetched 2026-03-21)
- www.mathsisfun.com/roman-numerals.html — 11457 bytes (fetched 2026-03-21)
- www.romannumerals.org — 35017 bytes (fetched 2026-03-21)
- www.npmjs.com/package/roman-numerals — 7174 bytes (fetched 2026-03-21)


End of document.
