# ROUND_TRIP

Overview

Guarantee the round-trip property: for every integer n in the inclusive range 1 through 3999, converting to Roman and back yields the original integer.

Testing approach

Add a deterministic property test that iterates n from 1 to 3999 and asserts that romanToInt(intToRoman(n)) equals n. Also assert explicit edge cases for 1 and 3999.

Acceptance Criteria

- A unit test file tests/unit/roundtrip.test.js exists and passes for all n in 1..3999.
- Tests explicitly verify that 1 converts to I and back, and 3999 converts to MMMCMXCIX and back.
