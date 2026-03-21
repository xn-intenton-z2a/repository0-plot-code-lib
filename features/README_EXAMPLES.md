# README_EXAMPLES

## Summary
Update README.md to document library usage and provide minimal examples demonstrating named imports, expected outputs, and CLI invocation so users can validate behaviour quickly.

## Specification
- Include a brief language-appropriate example showing how to import named exports and call them (example: import { fizzBuzz, fizzBuzzSingle } from the library entry and call fizzBuzz(5)).
- Show expected output in a short inline form, for example: 1, 2, Fizz, 4, Buzz for fizzBuzz(5).
- Add a small section documenting CLI usage: how to run npm run start:cli or node src/lib/main.js with a numeric argument and what the expected output looks like.

## Files to change
- README.md (insert example sections under a Usage heading)

## Acceptance Criteria
- README contains an example for fizzBuzz and fizzBuzzSingle that matches the library behaviour.
- README documents how to run the CLI entry and what to expect for a sample input.
