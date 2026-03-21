# ROUND_TRIP_TESTS

# Summary
Add a comprehensive unit test that verifies the round-trip property for all integers from 1 to 3999.

# Implementation
- Create tests/unit/roundtrip.test.js that iterates n from 1 to 3999 inclusive, computes r = toRoman(n), then asserts fromRoman(r) equals n for each n.
- Keep the test deterministic and efficient; use a single test case with a loop rather than thousands of individual tests.

# Files to change
- tests/unit/roundtrip.test.js

# Acceptance Criteria
1. A test exists that loops n from 1 to 3999 and asserts fromRoman(toRoman(n)) equals n for each n.
2. The test passes when the library implements the required conversions correctly.
3. The test completes in a reasonable time under the existing test runner configuration.
