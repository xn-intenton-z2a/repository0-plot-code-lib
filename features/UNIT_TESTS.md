# UNIT_TESTS

Overview

Define the unit test suite needed to verify correctness, error handling, and the round-trip property. Tests should be small, deterministic, and runnable under the existing test command.

Required tests

- Boundary values: 1 maps to I and 3999 maps to MMMCMXCIX.
- Example: 1994 maps to MCMXCIV and back to 1994.
- Subtractive cases: 4 -> IV, 9 -> IX, 40 -> XL, 90 -> XC, 400 -> CD, 900 -> CM.
- Invalid numbers: 0 and 4000 throw RangeError.
- Invalid roman strings: IIII, VV, IL, IC, XM throw TypeError.
- Type errors: non-string input to romanToInt and non-integer input to intToRoman throw TypeError.
- Round-trip property: iterate 1..3999 and assert round-trip equality.

Acceptance Criteria

- Tests are placed under tests/unit/ and have clear filenames such as main.test.js, validation.test.js, roundtrip.test.js.
- Running npm test runs the suite and these tests are green in CI.
