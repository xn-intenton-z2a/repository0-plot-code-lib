ROMAN_NUMERALS

Normalised extract

Table of contents
- Symbols and values
- Repetition and subtractive rules
- Validation pattern (regex)
- Integer → Roman conversion (greedy mapping)
- Roman → Integer conversion (validated subtraction-aware scan)
- Error handling and exceptions
- Examples and acceptance checks

Symbols and values
- I = 1
- V = 5
- X = 10
- L = 50
- C = 100
- D = 500
- M = 1000

Repetition and subtractive rules
- A symbol placed after an equal or larger symbol is added. Example: VI = V + I = 6.
- A symbol placed before a larger symbol is subtracted. Example: IV = V − I = 4.
- Only the following subtractive pairs are allowed: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).
- No symbol may repeat more than three times in succession under canonical (subtractive) rules (e.g., III is valid, IIII is not accepted by strict rules).
- Overline notation for values ×1000 exists but is out of scope for the 1–3999 requirement.

Validation pattern (exact)
- Use the canonical regex to validate strict subtractive Roman numerals in the 1–3999 range:
  ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$
- Behavior: match the full string; if it fails, the Roman numeral is invalid for the library and should trigger TypeError.

Integer → Roman conversion (exact implementation pattern)
- Mapping (descending):
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
- Algorithm (greedy):
  1. Validate input is a finite integer. If not an integer or outside range 1..3999, throw RangeError.
  2. Initialize an empty output string.
  3. For each (value, numeral) pair in the descending mapping list, while n >= value append numeral to output and subtract value from n.
  4. Return the output string. The greedy mapping produces canonical subtractive notation (e.g., 4 => IV, 9 => IX, 1994 => MCMXCIV).

Roman → Integer conversion (exact implementation pattern)
- Precondition: validate the input is a string and that it matches the canonical regex above; otherwise throw TypeError.
- Safe scan algorithm (after validation):
  1. Map individual symbols to their integer values: I:1, V:5, X:10, L:50, C:100, D:500, M:1000.
  2. Initialize total = 0 and iterate left-to-right over characters with lookahead: for each symbol value v at index i, let next value n be value at i+1 (0 if none). If v < n then subtract v from total else add v to total.
  3. After the scan, total is the integer value. Return total.
- Note: Because validation uses the strict regex, the subtraction-only-when-allowed constraint is already enforced and the simple lookahead algorithm yields the correct number.

Error handling and exported API
- Behavior constraints (must be enforced by library code):
  - toRoman(n: number): string
    - Signature: toRoman(n: number): string
    - Throws RangeError when n is not an integer or not in the inclusive range 1..3999.
    - Returns canonical Roman numeral string using subtractive notation.
  - fromRoman(s: string): number
    - Signature: fromRoman(s: string): number
    - Throws TypeError when s is not a string or fails the canonical validation regex.
    - Returns integer in 1..3999 when s is valid.
- Round-trip property: for all integers n in 1..3999, fromRoman(toRoman(n)) === n holds when toRoman produces canonical output and fromRoman enforces strict validation.

Concrete validation examples (acceptance checks)
- toRoman(1994) => "MCMXCIV"
- fromRoman("MCMXCIV") => 1994
- toRoman(4) => "IV"
- fromRoman("IIII") => throws TypeError (strict validation fails)
- toRoman(0) => throws RangeError
- toRoman(4000) => throws RangeError

Supplementary details
- Use a single authoritative mapping array in source code (value, symbol) in descending order to implement integer → Roman.
- Use the canonical regex for pre-validation of input Roman strings before parsing; this prevents ambiguous or non-canonical inputs from being accepted.
- Ensure type checks: typeof n === 'number' and Number.isInteger(n) for toRoman; typeof s === 'string' for fromRoman.
- For unit tests include boundary values: 1, 3, 4, 9, 40, 90, 400, 900, 3999 and invalid inputs: 0, 4000, "IIII", "IL", null, 3.14.

Reference details (exact patterns and signatures)
- Mapping table (descending):
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
- Validation regex (exact): ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$
- Public API (named exports from src/lib/main.js):
  - toRoman(n: number): string  -> Throws RangeError for invalid input
  - fromRoman(s: string): number -> Throws TypeError for invalid input

Detailed digest and extracted source content (retrieved 2026-03-21)
- Source: Wikipedia — Roman numerals
  - Key extracted points: canonical symbol set I, V, X, L, C, D, M; subtractive notation examples and canonical formation rules; examples for constructing numbers by thousands/hundreds/tens/ones; canonical limit noted in practice as 1–3999 for common algorithms.
  - Retrieved: 2026-03-21
  - Bytes fetched: 510215
- Source: MathIsFun — Roman Numerals
  - Key extracted points: concise table of symbols and canonical combinations (I, II, III, IV, V, VI, VII, VIII, IX, X, etc.); algorithmic explanation: decompose number into thousands/hundreds/tens/ones and convert each digit using the mapping lists.
  - Retrieved: 2026-03-21
  - Bytes fetched: 11457
- Source: GeeksforGeeks — Converting Roman Numerals & vice-versa
  - Key extracted points: algorithmic patterns for converting integer→roman (greedy mapping) and roman→integer (scan with value lookahead), discussion of edge cases and validation; recommended tests and examples.
  - Retrieved: 2026-03-21
  - Bytes fetched: 92731
- Source: NPM package "roman-numerals"
  - Key extracted points: common package API patterns and behavior around edge cases and examples of usage; note that public packages commonly use the same greedy mapping and the canonical regex for validation.
  - Retrieved: 2026-03-21
  - Bytes fetched: 7152

Attribution and data-size summary
- Wikipedia (https://en.wikipedia.org/wiki/Roman_numerals) — 510215 bytes
- MathIsFun (https://www.mathsisfun.com/roman-numerals.html) — 11457 bytes
- GeeksforGeeks (https://www.geeksforgeeks.org/converting-roman-numerals-decimal-vice-versa/) — 92731 bytes
- NPM (https://www.npmjs.com/package/roman-numerals) — 7152 bytes

Notes for implementers
- Use the exact regex provided for strict input validation in fromRoman; do not accept inputs that fail that regex.
- Use the exact mapping order for toRoman to ensure canonical subtractive output.
- Unit tests should assert thrown errors for invalid inputs and the round-trip property for every integer in 1..3999.
- Export both functions as named exports from src/lib/main.js to match the mission requirement.

End of ROMAN_NUMERALS
