# VALIDATION_ERRORS

Goal
Define validation semantics and error classes to make behaviour deterministic and easy to test.

Behavior
- toRoman throws RangeError for numbers <= 0 or > 3999; throws TypeError for non-number or non-integer input.
- fromRoman throws TypeError for non-string inputs, empty strings, invalid characters, and non-canonical or repeated-subtractive forms such as "IIII", "IL", "IC", "XM".
- Tests should rely on error class (RangeError or TypeError) rather than exact message text.

Acceptance Criteria
- toRoman(0) and toRoman(4000) throw RangeError
- toRoman called with a non-number throws TypeError
- fromRoman "IIII" throws TypeError
- fromRoman non-string input throws TypeError
