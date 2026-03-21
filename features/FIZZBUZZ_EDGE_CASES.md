# FIZZBUZZ_EDGE_CASES

Overview
Define and enforce input validation and error semantics for the library API.

Specification
- For fizzBuzz(n):
  - If n is 0 return an empty array.
  - If n is negative throw a RangeError.
  - If n is not an integer throw a TypeError.
- For fizzBuzzSingle(n):
  - If n is not a positive integer throw a TypeError or RangeError as appropriate.
- Error messages should be stable to make tests deterministic.

Files to change
- src/lib/main.js
- tests/unit/main.test.js

Acceptance Criteria
1. fizzBuzz(0) returns an empty array.
2. fizzBuzz(-1) throws a RangeError.
3. fizzBuzz(3.5) throws a TypeError.
4. fizzBuzzSingle(-3) throws a RangeError.
5. fizzBuzzSingle(2.1) throws a TypeError.
6. Unit tests assert both the type and a stable error message for each thrown error.
