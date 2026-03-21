# PARSING_VALIDATION

# Summary
Implement strict, canonical Roman numeral validation and parsing implementing subtractive rules and canonical minimal form only.

# Implementation
- Accept only canonical subtractive pairs: IV, IX, XL, XC, CD, CM.
- Disallow invalid repetitions: V, L, D must not repeat; I, X, C, M repeat at most three times consecutively in canonical form.
- Enforce ordering rules so that numerals appear in nonincreasing value except for permitted subtractive pairs.
- Validation logic should be shared between isValidRoman and fromRoman to keep behavior consistent.

# Files to change
- src/lib/main.js: add validation and parsing helpers used by fromRoman and isValidRoman.
- tests/unit/validation.test.js: unit tests for valid and invalid forms.

# Acceptance Criteria
1. fromRoman("IV") returns 4 and fromRoman("IX") returns 9.
2. fromRoman("XL") returns 40 and fromRoman("XC") returns 90.
3. fromRoman("CD") returns 400 and fromRoman("CM") returns 900.
4. fromRoman("IIII") throws TypeError.
5. fromRoman("VX") throws TypeError.
6. fromRoman("IL") throws TypeError.
7. isValidRoman returns false for known invalid strings and true for canonical strings.
