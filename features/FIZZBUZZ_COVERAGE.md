# FIZZBUZZ_COVERAGE

Overview
Ensure unit tests exercise the library sufficiently and meet the repository coverage threshold used by CI.

Specification
- Unit tests must exercise fizzBuzz and fizzBuzzSingle behaviour and all edge cases described in FIZZBUZZ_EDGE_CASES.
- Use Vitest coverage (npm run test:unit) to produce a coverage report during local and CI runs.
- Target: line coverage for src/lib/main.js >= 50% and overall line coverage >= 50% to satisfy repository goals.

Files to change
- tests/unit/main.test.js (expand tests to cover edge cases and main paths)
- src/lib/main.js (small, focused changes only if required to make behaviour testable)

Acceptance Criteria
1. Running npm run test:unit exits with status 0 and outputs a coverage summary.
2. The coverage report shows src/lib/main.js line coverage >= 50%.
3. The unit tests assert all mission acceptance criteria for fizzBuzz and fizzBuzzSingle, including edge cases (n=0, negative, non-integers).
4. The coverage check is scriptable for CI (coverage step can fail the build if thresholds are not met).
