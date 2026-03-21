# INTEGER_TO_ROMAN

Goal
Convert integers in the inclusive range 1 to 3999 into canonical Roman numeral strings using subtractive notation (IV, IX, XL, XC, CD, CM).

Behavior
- Export a named function toRoman(number) from src/lib/main.js.
- Accept only finite integer numbers; throw TypeError for other types.
- Accept numbers in 1..3999; throw RangeError for numbers outside this range.
- Produce canonical subtractive notation (for example 4 -> "IV", 9 -> "IX").

Acceptance Criteria
- toRoman(1994) returns "MCMXCIV"
- toRoman(4) returns "IV"
- toRoman(1) returns "I"
- toRoman(3999) returns "MMMCMXCIX"
- toRoman(0) throws RangeError
- toRoman(4000) throws RangeError
