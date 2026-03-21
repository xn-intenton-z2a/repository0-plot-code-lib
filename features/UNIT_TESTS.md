# UNIT_TESTS

Summary
Specify the unit test suite required to verify the Roman numerals library meets the mission acceptance criteria and is regression-safe.

Tests to implement
- Core conversion tests
  - Assert toRoman(1994) === MCMXCIV
  - Assert fromRoman(MCMXCIV) === 1994
  - Assert toRoman(4) === IV
- Boundary and invalid input tests
  - Assert toRoman(1) === I and toRoman(3999) === MMMCMXCIX
  - Assert toRoman(0) and toRoman(4000) throw RangeError
  - Assert fromRoman(IIII) and fromRoman(IL) throw TypeError
- Round-trip tests
  - Assert fromRoman(toRoman(n)) === n for representative sampled values including 1, 4, 9, 40, 90, 400, 900, 1994, 3999
  - A slow optional test may assert the property for the full range 1..3999; provide it as an opt-in or tagged test in CI.

Execution
- Tests must be runnable with npm test and live under tests/unit/ using Vitest.
- Tests should avoid heavy native dependencies; where native modules (if any) are optional provide stubs or skip markers so CI remains deterministic.

Acceptance Criteria
- All unit tests pass when running npm test locally or in CI.
- Tests assert both correct outputs and correct thrown error types for invalid inputs.

Deliverables
- Concrete test files under tests/unit/ implementing the cases above.
- Tests must import only the named exports from src/lib/main.js and avoid reading or modifying other repository files.

Notes
- Keep tests deterministic and fast; if a full 1..3999 loop is expensive, provide a separate slow test that is optional in CI but included for full verification locally.