WIKIPEDIA_ROMAN_NUMERALS

Table of Contents
- Symbols and values
- Subtractive notation rules
- Repetition and placement rules
- Canonical numeral mapping (descending)
- Implementation notes (conversion strategies)
- Valid range and constraints
- Reference API signatures
- Detailed digest and attribution

Normalised extract (direct technical rules)
Symbols and values
M = 1000
D = 500
C = 100
L = 50
X = 10
V = 5
I = 1

Subtractive notation rules
- Allowed subtractive pairs: I before V or X; X before L or C; C before D or M.
- Subtractive results explicitly: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.
- Only a single lower-value symbol may precede a larger one to indicate subtraction; no other subtractive combinations are permitted.

Repetition and placement rules
- Symbols I, X, C, M may repeat consecutively at most three times (e.g., III = 3, XXX = 30, CCC = 300).
- Symbols V, L, D are never repeated consecutively.
- Subtractive pairs count as a single numeral for repetition and ordering rules; they cannot be chained (e.g., IIV is invalid).
- Numerals are written largest to smallest left-to-right except for allowed subtractive pairs.

Canonical numeral mapping (descending order for greedy algorithms)
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

Implementation notes (conversion strategies)
- Integer to Roman (toRoman): use a descending mapping list that includes subtractive pairs (above). For each mapping entry (value, symbol) repeatedly append symbol while n >= value and decrement n by value. This greedy approach produces canonical subtractive-form Roman numerals.
- Roman to Integer (fromRoman): perform strict validation using the canonical regex (see STACKOVERFLOW_ROMAN_REGEX) then either: (A) scan left-to-right adding values but subtracting when a smaller-value symbol precedes a larger-value symbol, or (B) greedily match substrings using the same descending mapping list and sum their values.
- Uppercasing: implementations may normalise input to uppercase before validation; the canonical regex assumes uppercase letters.

Valid range and constraints
- Standard canonical Roman numerals without overbars represent integers in the closed range 1..3999.
- Implementations must throw RangeError for inputs outside 1..3999 when converting integers to Roman strings.

Reference API signatures (exact behaviour required by mission)
- toRoman(n: number) -> string
  - Parameters: n (integer)
  - Returns: uppercase Roman numeral string using canonical subtractive notation
  - Throws: RangeError when n < 1 or n > 3999; TypeError if n is not a finite integer
- fromRoman(s: string) -> number
  - Parameters: s (string)
  - Returns: integer in range 1..3999
  - Throws: TypeError if s is not a string or does not match the canonical Roman numeral syntax

Best practices and implementation examples (patterns, no code blocks)
- Predefine mapping array ordered by descending numeric value including subtractive pairs (1000->"M", 900->"CM", ... ,1->"I").
- Use greedy loop for toRoman; complexity is O(k) where k is number of symbols appended.
- For fromRoman, enforce strict validation with the canonical regex before parsing to guarantee rejection of non-canonical forms like "IIII".
- Perform round-trip tests: for every n in 1..3999 verify fromRoman(toRoman(n)) === n.

Troubleshooting
- If invalid strings are accepted: ensure validation uses the canonical regex and that parsing does not accept repeated subtractive sequences.
- If conversion of integers produces incorrect subtractive forms (e.g., IIII instead of IV): ensure subtractive pairs are present in the mapping and that greedy matching starts from the largest mapping.

Detailed digest (source snapshot)
- Source URL: https://en.wikipedia.org/wiki/Roman_numerals
- Retrieval date: 2026-03-21
- Bytes downloaded (HTML): 537208
- Extracted technical content used: symbol values, allowed subtractive pairs (I->V/X, X->L/C, C->D/M), repetition rules, canonical descending mapping used for greedy algorithms, note about typical range 1..3999.

Attribution
Content condensed and normalised from Wikipedia: Roman numerals (https://en.wikipedia.org/wiki/Roman_numerals). Retrieved 2026-03-21. Download size: 537208 bytes.
