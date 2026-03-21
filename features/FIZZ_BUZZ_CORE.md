# FIZZ_BUZZ_CORE

## Summary
Implement the core library exports: two named functions fizzBuzz and fizzBuzzSingle in src/lib/main.js with strict input validation and predictable behavior.

## Specification
- Exports
  - fizzBuzz(n): returns an array of strings representing the sequence 1..n where multiples of 3 are replaced with Fizz, multiples of 5 with Buzz, and multiples of both with FizzBuzz.
  - fizzBuzzSingle(n): returns the single-string result for the integer n with the same replacement rules.

- Validation rules
  - For fizzBuzz:
    - If n === 0 return an empty array.
    - If n is negative throw RangeError.
    - If n is not an integer throw TypeError.
  - For fizzBuzzSingle:
    - If n is less than or equal to 0 throw RangeError.
    - If n is not an integer throw TypeError.

- Behavioural notes
  - Both functions operate in O(n) time and use minimal heap allocations for reasonable n.
  - All returned numeric values are strings (for example, the element for 7 is the string 7).

## Files to change
- src/lib/main.js (export implementations and CLI entrypoint guard if desired)

## Acceptance Criteria
- fizzBuzz(15) returns the correct 15-element array ending with FizzBuzz.
- fizzBuzzSingle(3) returns Fizz.
- fizzBuzzSingle(5) returns Buzz.
- fizzBuzzSingle(15) returns FizzBuzz.
- fizzBuzzSingle(7) returns the string 7.
- fizzBuzz(0) returns an empty array.
- Negative inputs to either function throw RangeError.
- Non-integer inputs to either function throw TypeError.
- Both functions are exported as named exports from src/lib/main.js.
