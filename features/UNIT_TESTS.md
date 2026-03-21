# UNIT_TESTS

Goal
Add comprehensive unit tests that cover normal cases, subtractive notation, boundaries, invalid inputs, and the round-trip property.

Behavior
- Tests live in tests/unit/ and use vitest.
- Include tests for boundary values 1 and 3999, subtractive cases (4, 9, 40, 90, 400, 900), invalid Roman strings such as "IIII", and numeric out-of-range values 0 and 4000.
- Include a test that verifies the round-trip property across the full domain 1..3999.
- Tests should assert thrown error classes (RangeError or TypeError) rather than relying on message text.

Acceptance Criteria
- Tests include 1994 -> "MCMXCIV" and "MCMXCIV" -> 1994
- Tests assert toRoman(4) returns "IV" and fromRoman "IIII" throws TypeError
- Tests include a loop verifying fromRoman(toRoman(n)) === n for all n in 1..3999
