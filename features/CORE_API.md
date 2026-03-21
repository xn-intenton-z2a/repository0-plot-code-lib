# CORE_API

# Summary
Provide the public library API as named exports from src/lib/main.js. The API must include functions named toRoman, fromRoman, and isValidRoman with precise error behavior.

# Implementation
- toRoman(number): Accept integer in range 1-3999 inclusive and return Roman numeral string in canonical subtractive notation. Throw RangeError for values outside range and TypeError for non-number input.
- fromRoman(roman): Accept a strict Roman numeral string using subtractive notation and return integer value; throw TypeError for invalid strings.
- isValidRoman(roman): Return boolean; true only for canonical Roman strings accepted by fromRoman.

# Files to change
- src/lib/main.js: export named functions toRoman, fromRoman, isValidRoman and add minimal CLI entrypoint.
- tests/unit/main.test.js: unit tests for API, boundaries, and error cases.
- README.md: usage examples and brief conversion table.
- examples/usage.md: short examples demonstrating API and CLI usage.

# Acceptance Criteria
1. The package exports named functions toRoman, fromRoman, isValidRoman from src/lib/main.js.
2. toRoman on 1994 returns "MCMXCIV".
3. fromRoman on "MCMXCIV" returns 1994.
4. toRoman on 4 returns "IV".
5. toRoman on 0 throws RangeError.
6. toRoman on 4000 throws RangeError.
7. fromRoman on "IIII" throws TypeError.
8. isValidRoman("MCMXCIV") is true and isValidRoman("IIII") is false.
