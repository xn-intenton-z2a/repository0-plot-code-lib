# UNIT_TESTS

Summary
Add a comprehensive unit test suite to verify correctness, strict validation, and the round-trip property across the allowed range.

Specification
- Tests file: tests/unit/main.test.js
- Use Vitest (existing test script) and write deterministic unit tests covering:
  - Boundary values: 1 and 3999
  - Representative subtractive cases: 4, 9, 40, 90, 400, 900
  - Sample values: 1994 => MCMXCIV and reverse
  - Invalid inputs: 0, 4000 (expect RangeError), "IIII", "IC", non-string inputs (expect TypeError)
  - Round-trip property test: loop n from 1 to 3999 and assert romanToInteger(integerToRoman(n)) === n
- Keep tests fast and deterministic; the full 1..3999 loop is acceptable for these small computations.

Acceptance criteria
- All tests pass under npm test
- Tests explicitly assert the seven mission acceptance criteria for conversion and error handling

Files changed by this feature
- tests/unit/main.test.js: new comprehensive test suite.
