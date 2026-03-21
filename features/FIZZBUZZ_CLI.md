# FIZZBUZZ_CLI

Overview
Provide a minimal CLI entrypoint that runs the library from the command line.

Specification
- Implement CLI handling in src/lib/main.js (or a small wrapper) that:
  - Accepts a single integer argument and prints the fizzBuzz array for that number, one value per line.
  - Supports a flag --single to print the fizzBuzzSingle result for a given integer.
  - Supports -h and --help to print usage text.
  - Exits with non-zero status on invalid input.
- Keep CLI logic small and testable; prefer the library functions for core behaviour.

Files to change
- src/lib/main.js
- README.md
- tests/unit/main.test.js (integration tests for CLI behaviour)

Acceptance Criteria
1. Running node src/lib/main.js 15 prints 15 lines and the last line is FizzBuzz and exits 0.
2. Running node src/lib/main.js --single 5 prints Buzz and exits 0.
3. Invalid input prints an error message to stderr and exits with non-zero status.
4. CLI behaviour is covered by unit or integration tests.
