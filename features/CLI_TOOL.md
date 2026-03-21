# CLI_TOOL

Summary
Add a small CLI interface to the library so users can run conversions from the command line using node src/lib/main.js.

Specification
- Behavior: when invoked as node src/lib/main.js ARG
  - If ARG is an integer string in 1..3999 print canonical Roman numeral and exit 0
  - If ARG is a Roman numeral string (valid per the validator) print its integer value and exit 0
  - On invalid input print a short error to stderr and exit nonzero
- The CLI should reuse the same named exports (integerToRoman and romanToInteger) so logic is not duplicated.

Acceptance criteria
- Running node src/lib/main.js 1994 prints MCMXCIV
- Running node src/lib/main.js MCMXCIV prints 1994
- Running node src/lib/main.js IIII prints an error and exits with nonzero status

Files changed by this feature
- src/lib/main.js: add a small CLI entry that runs when module is invoked directly.
