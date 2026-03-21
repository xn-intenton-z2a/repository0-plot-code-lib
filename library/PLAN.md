Plan: Update SOURCES.md and create library documents for Roman numeral conversion

Problem
A JavaScript library is required to convert integers (1–3999) to Roman numerals and back. SOURCES.md is empty and library/ has no documents; authoritative references and an extracted technical document are needed.

Approach
1. Curate 3-6 authoritative sources (Wikipedia, MathIsFun, npm package pages, romannumerals.org).
2. Update SOURCES.md with the chosen URLs.
3. Fetch each URL and extract actionable technical details: symbol-value map, subtractive rules, canonical validator regex, greedy conversion algorithm, strict validation rules, edge cases, and unit-test vectors.
4. Create a single library document: ROMAN_NUMERALS.md containing: Normalised extract, Table of contents, Supplementary details, Reference details (API signatures and regex), Detailed digest with retrieval date, and Attribution with data sizes.
5. Verify document completeness against mission acceptance criteria and mark todos done.

Todos
- update-sources-md: Add curated URLs into SOURCES.md and commit.
- create-library-docs: Fetch sources and author library/ROMAN_NUMERALS.md.
- verify-docs: Check acceptance criteria coverage, data sizes, and attribution.

Notes
Produce plain-text technical content without code fences in the Normalised extract; include exact regex and function signatures in Reference details.
