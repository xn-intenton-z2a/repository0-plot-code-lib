# UNIT_TESTS

## Summary
Add a focused unit test suite that verifies normal behaviour and edge cases for fizzBuzz and fizzBuzzSingle using Vitest.

## Specification
- Tests to add in tests/unit/main.test.js:
  - fizzBuzz(15) equals the expected 15-element array with the last element FizzBuzz.
  - fizzBuzzSingle(3) returns Fizz.
  - fizzBuzzSingle(5) returns Buzz.
  - fizzBuzzSingle(15) returns FizzBuzz.
  - fizzBuzzSingle(7) returns the string 7.
  - fizzBuzz(0) returns an empty array.
  - Negative inputs to both functions assert that RangeError is thrown.
  - Non-integer inputs to both functions assert that TypeError is thrown.

- Tests must import the named exports from src/lib/main.js and avoid mutating global state.
- Keep tests deterministic and minimal; use explicit assertions rather than broad matches.

## Files to change
- tests/unit/main.test.js (new or updated file)

## Acceptance Criteria
- Running npm test completes with all assertions passing.
- Tests explicitly cover all validation rules and the core outputs listed in the mission acceptance criteria.
