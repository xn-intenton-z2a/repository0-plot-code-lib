# ROMAN_TO_INTEGER

Goal
Convert canonical Roman numeral strings using subtractive notation back to integers in the range 1 to 3999.

Behavior
- Export a named function fromRoman(roman) from src/lib/main.js.
- Accept only strings composed of uppercase Roman numeral characters; non-strings throw TypeError.
- Accept only strictly canonical subtractive notation; malformed strings such as "IIII", "IL", "IC", or other non-canonical forms throw TypeError.
- Return integer values in 1..3999 for valid inputs.

Acceptance Criteria
- fromRoman "MCMXCIV" returns 1994
- fromRoman "IV" returns 4
- fromRoman "MMMCMXCIX" returns 3999
- fromRoman "IIII" throws TypeError
- fromRoman empty string throws TypeError
