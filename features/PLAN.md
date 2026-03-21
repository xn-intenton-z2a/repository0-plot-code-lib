Plan for feature specs added to features/

Goal
Create clear, testable feature specifications that directly enable implementing a Roman numeral conversion library matching the mission.

Scope
- CORE_API: public API specification and acceptance criteria
- VALIDATION: strict validation rules and tests
- ROUND_TRIP: deterministic property test for 1..3999
- UNIT_TESTS: required test suite coverage
- README_EXAMPLES: examples and conversion table for README

Next steps for implementers
1. Implement intToRoman and romanToInt in src/lib/main.js following the library reference and strict regex.
2. Add tests under tests/unit/ as specified by UNIT_TESTS.md and run npm test.
3. Update README.md per README_EXAMPLES.md.

Notes
- The canonical validation regex and mapping live in library/ROMAN_NUMERALS.md. Use that as the source of truth.
