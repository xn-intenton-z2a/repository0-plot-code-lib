# README_EXAMPLES

Overview

Update README.md to document the public API, show usage examples, and include a short conversion table for common numerals. The README should make it clear which errors are thrown for invalid inputs.

Usage examples

- Calling intToRoman with 1994 returns MCMXCIV.
- Calling romanToInt with MCMXCIV returns 1994.

Conversion table (representative rows)

- 1 maps to I
- 4 maps to IV
- 9 maps to IX
- 40 maps to XL
- 90 maps to XC
- 400 maps to CD
- 900 maps to CM
- 3999 maps to MMMCMXCIX

Acceptance Criteria

- README contains API signatures for intToRoman and romanToInt and the examples above.
- README documents that intToRoman throws RangeError for out-of-range numbers and TypeError for non-integers, and that romanToInt throws TypeError for invalid strings.
