# CLI_TOOL

# Summary
Provide a small command line interface to convert numbers to Roman numerals and back, with clear exit codes and error messages.

# Implementation
- Add minimal CLI parsing in src/lib/main.js supporting flags --to-roman <number> and --from-roman <roman> and a --help flag.
- On success print the conversion result to stdout and exit with code 0. On invalid input print an error to stderr and exit with non-zero code.
- Keep CLI surface small and well documented in README and examples.

# Files to change
- src/lib/main.js
- tests/unit/cli.test.js
- README.md (usage section)

# Acceptance Criteria
1. Running node src/lib/main.js --to-roman 1994 prints MCMXCIV and exits 0.
2. Running node src/lib/main.js --from-roman MCMXCIV prints 1994 and exits 0.
3. Invalid input prints an error to stderr and exits with a non-zero status code.
