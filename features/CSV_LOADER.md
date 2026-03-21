# CORE_CONVERSION

Summary
Implement the core conversion functions toRoman and fromRoman as named exports from src/lib/main.js. These functions perform integer→Roman and Roman→integer conversion following canonical subtractive notation and strict validation rules for the 1..3999 range.

Description
- toRoman(n: number): string
  - Accepts a finite integer n in the inclusive range 1..3999 and returns the canonical Roman numeral using subtractive notation.
  - Throws RangeError when n is not an integer or outside 1..3999.
- fromRoman(s: string): number
  - Accepts a string s that matches the canonical validation regex and returns the corresponding integer in 1..3999.
  - Throws TypeError when s is not a string or fails validation.

Behavior and implementation notes
- Use a single descending mapping array of value/numeral pairs for toRoman: 1000 M, 900 CM, 500 D, 400 CD, 100 C, 90 XC, 50 L, 40 XL, 10 X, 9 IX, 5 V, 4 IV, 1 I.
- Implement the greedy algorithm for toRoman: iterate mapping and append symbols while subtracting values until n is 0.
- For fromRoman, pre-validate s using the canonical regex and then scan left-to-right with lookahead: add value when current >= next, else subtract current.

Acceptance Criteria
- toRoman(1994) returns MCMXCIV.
- fromRoman(MCMXCIV) returns 1994.
- toRoman(4) returns IV.
- toRoman(0) throws RangeError.
- toRoman(4000) throws RangeError.
- fromRoman(IIII) throws TypeError.
- Both functions are exported as named exports from src/lib/main.js.

Deliverables
- Implementations of toRoman and fromRoman in src/lib/main.js with appropriate type checks and errors.
- Unit tests covering the examples above and programmatic consumers using named exports.

Notes
- Keep the core conversion logic small and well-documented; tests must prove the round-trip property separately.