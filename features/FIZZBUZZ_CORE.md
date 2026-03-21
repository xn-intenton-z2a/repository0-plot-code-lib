# FIZZBUZZ_CORE

Overview
Implement the core library API: two named exports, fizzBuzz and fizzBuzzSingle, implemented in src/lib/main.js.

Motivation
Provide the minimal, well-documented library that satisfies the mission acceptance criteria for correct FizzBuzz output.

Specification
- fizzBuzzSingle(n) returns a string for a single positive integer n where:
  - if n is divisible by 3 and not 5 then return Fizz
  - if n is divisible by 5 and not 3 then return Buzz
  - if n is divisible by both 3 and 5 then return FizzBuzz
  - otherwise return the decimal representation of n
- fizzBuzz(n) returns an array of strings for integers from 1 to n using fizzBuzzSingle for each index
- Both functions must be exported as named exports from src/lib/main.js

Files to change
- src/lib/main.js
- tests/unit/main.test.js
- README.md

Acceptance Criteria
1. src/lib/main.js exports fizzBuzz and fizzBuzzSingle as named exports.
2. fizzBuzzSingle(3) returns Fizz.
3. fizzBuzzSingle(5) returns Buzz.
4. fizzBuzzSingle(15) returns FizzBuzz.
5. fizzBuzzSingle(7) returns 7.
6. fizzBuzz(15) returns an array of 15 strings matching the known 1..15 sequence and ending with FizzBuzz.
7. Changes are confined to allowed paths: source, tests, README, examples, package.json.
