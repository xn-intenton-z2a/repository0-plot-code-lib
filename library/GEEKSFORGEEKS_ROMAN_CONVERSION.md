GEEKSFORGEEKS_ROMAN_CONVERSION

Table of Contents
- Canonical numeric-symbol mapping
- Integer -> Roman algorithm (greedy pattern)
- Roman -> Integer algorithm (greedy parsing / left-to-right scan)
- Complexity and performance notes
- Examples and boundary cases
- Reference API signatures
- Detailed digest and attribution

Normalised extract (algorithmic steps)
Canonical numeric-symbol mapping (descending order):
1000 -> M
900  -> CM
500  -> D
400  -> CD
100  -> C
90   -> XC
50   -> L
40   -> XL
10   -> X
9    -> IX
5    -> V
4    -> IV
1    -> I

Integer to Roman (greedy algorithm)
- Initialise result = empty string.
- For each (value, symbol) in mapping (descending):
  - While n >= value: append symbol to result; n -= value.
- Return result.
- Guarantees canonical subtractive notation when mapping includes subtractive pairs.

Roman to Integer (strict-validate then parse)
- Validate s against canonical regex; if invalid, throw TypeError.
- Option A (left-to-right scan): convert each char to numeric value; when current value < next value, subtract current else add.
- Option B (greedy matching): iterate mapping list and greedily match longest symbol at start of remaining string, add its value and consume matched characters.

Complexity and performance
- toRoman complexity is proportional to the number of symbols written (worst-case small constant per digit), effectively O(1) for bounded input range.
- fromRoman complexity is O(length of string) — negligible for 1..3999.

Examples and boundary cases
- 1994 -> MCMXCIV (1000 + 900 + 90 + 4)
- 4 -> IV
- 3999 -> MMMCMXCIX
- 0 or 4000 should trigger RangeError when converting from integers to Roman.
- Non-canonical inputs such as "IIII" should be rejected by fromRoman (TypeError).

Reference API signatures
- See WIKIPEDIA_ROMAN_NUMERALS for exact signatures and error signalling. Implementations should follow the same behaviour.

Detailed digest (source snapshot)
- Source URL: https://www.geeksforgeeks.org/convert-integer-to-roman-numeral/
- Retrieval date: 2026-03-21
- Bytes downloaded (HTML): 96324
- Extracted technical content used: explicit greedy algorithm and mapping list used for toRoman; examples used as verification cases (1994 -> MCMXCIV, 4 -> IV, 3999 -> MMMCMXCIX).

Attribution
Condensed from GeeksforGeeks: Convert integer to Roman numeral. Retrieved 2026-03-21. Download size: 96324 bytes.
