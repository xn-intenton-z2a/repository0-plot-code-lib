# CLI_TOOL

## Summary
Provide a minimal CLI contract for src/lib/main.js so the library can be executed as a small command-line utility for manual verification and simple demos.

## Specification
- Behaviour when run as a script (node src/lib/main.js N):
  - Parse the first positional argument as an integer n.
  - If the argument is missing print a short usage message and exit with code 1.
  - If the argument is not an integer exit with a non-zero code and print an explanatory error to stderr.
  - If the argument is negative exit with a non-zero code and print an explanatory error to stderr.
  - On success print the results as newline-separated values by default and exit with code 0.
  - Optionally support a flag --json to print a JSON array instead of newline-separated output.

- Validation rules reuse the same RangeError/TypeError semantics used by the exported functions.

## Files to change
- src/lib/main.js (add script entrypoint behaviour guarded by a main check)
- examples/ (optional: add a small cli usage text file demonstrating sample invocations)

## Acceptance Criteria
- node src/lib/main.js 5 prints five lines and exits with code 0.
- node src/lib/main.js foo exits with a non-zero code and prints an error message to stderr.
- node src/lib/main.js --json 5 prints a JSON array and exits with code 0 when the flag is provided.
