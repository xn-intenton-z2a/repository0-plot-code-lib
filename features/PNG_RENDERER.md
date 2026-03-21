# ROUND_TRIP

Summary
Define and require a deterministic round-trip test that asserts fromRoman(toRoman(n)) === n for every integer n in the inclusive range 1..3999.

Description
- The round-trip property is central to correctness: for any valid integer in the supported range, converting to Roman and back must yield the original integer.
- Implement a unit test that iterates over 1..3999 and asserts the property holds; the implementation may sample or run the full loop depending on test budget, but the full loop is the canonical acceptance test.

Acceptance Criteria
- A unit test exists that either samples or iterates the full 1..3999 range and asserts fromRoman(toRoman(n)) === n for all tested n.
- The test includes the known examples: 1994 round-trips to 1994 and 4 round-trips to 4 and yields IV for 4.

Deliverables
- Test(s) in tests/unit/ that enforce the round-trip property.
- Guidance in the test comments explaining why the round-trip property is essential and how it is exercised.

Notes
- If the full 1..3999 loop is slow in CI, a fast deterministic sampling plus a separate slow test that runs optionally can be used; however at least one CI-visible assertion must check the examples and a representative sample.