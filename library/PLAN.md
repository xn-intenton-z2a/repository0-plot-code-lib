Plan: Extract Roman numerals reference material and build library document

Problem
A JavaScript library is required to convert integers (1–3999) to Roman numerals and back, with strict validation and specified error behaviour. This task creates library documentation sourced from authoritative references to guide implementation and testing.

Approach
1. Populate SOURCES.md with 3–8 high-quality references (Wikipedia, RosettaCode, MathIsFun, npm, Exercism).
2. Fetch each source and record retrieval date and byte-size for attribution.
3. Extract the specific technical rules, symbol mappings, allowed subtractive pairs, and a strict validation pattern.
4. Produce a single consolidated library document library/ROMAN_NUMERALS.md with:
   - Normalised extract (technical rules and mappings)
   - Supplementary details (implementation notes, complexity)
   - Reference details (API signatures, regex validation, mapping arrays)
   - Digest and attribution (source URL, retrieval date, bytes fetched)
5. Save the library document to library/ and finish.

Todos
- update-sources: Write SOURCES.md with curated URLs (done)
- fetch-sources: Download each URL to /tmp and record sizes (next)
- create-doc: Extract and condense technical details into library/ROMAN_NUMERALS.md (after fetching)

Retrieval date used in digests: 2026-03-21
