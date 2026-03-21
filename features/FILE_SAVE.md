# DOCS_AND_EXAMPLES

Summary
Provide README documentation with concise examples, a conversion table, and explicit notes on error conditions to make the Roman numerals library easy to use and test.

Description
- The README must document usage of the named exports toRoman and fromRoman, show example calls for common values (including 1994 and 4), and state the errors thrown for invalid inputs.
- Include a conversion table (value -> Roman) for the canonical mapping entries and a short section describing the validation regex and the round-trip property.

Acceptance Criteria
- README contains an examples section demonstrating converting 1994 to MCMXCIV and converting MCMXCIV back to 1994.
- README lists the canonical mapping table and documents that toRoman throws RangeError for 0 and 4000 and fromRoman throws TypeError for IIII.
- README describes how to run the unit tests with npm test.

Deliverables
- Updated README.md with usage examples, conversion table, and test instructions.
- Small examples directory (examples/) may contain a short JavaScript snippet demonstrating the named exports; examples must be non-executable documentation only.

Notes
- Avoid including large code examples; keep examples minimal and human-readable to meet documentation acceptance criteria.