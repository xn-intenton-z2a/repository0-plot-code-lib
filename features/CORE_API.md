# CORE_API

Overview

Provide the primary public API for the library as named exports from src/lib/main.js. The two exports are intToRoman and romanToInt. intToRoman converts integers in the inclusive range 1 to 3999 into canonical Roman numeral strings using subtractive notation. romanToInt converts a canonical Roman numeral string into the corresponding integer.

Implementation guidance

Use the ordered mapping of value to symbol in the library reference: 1000 M, 900 CM, 500 D, 400 CD, 100 C, 90 XC, 50 L, 40 XL, 10 X, 9 IX, 5 V, 4 IV, 1 I. intToRoman must validate input type and range: throw RangeError for values less than 1 or greater than 3999, and TypeError for non-finite integers. romanToInt must perform strict validation before parsing and throw TypeError for invalid inputs.

Acceptance Criteria

- Converting 1994 to Roman produces MCMXCIV.
- Converting MCMXCIV from Roman produces 1994.
- Converting 4 to Roman produces IV.
- Converting 0 to Roman throws RangeError.
- Converting 4000 to Roman throws RangeError.
- The repository exports named functions intToRoman and romanToInt from src/lib/main.js.
- Unit tests cover these behaviors in tests/unit/main.test.js and pass.
