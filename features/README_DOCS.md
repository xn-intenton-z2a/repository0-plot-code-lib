# README_DOCS

# Summary
Expand README.md to include API usage examples, a conversion table, and a short explanation of error conditions and CLI usage.

# Implementation
- Add examples showing toRoman(1994) -> "MCMXCIV", fromRoman("MCMXCIV") -> 1994, and toRoman(4) -> "IV".
- Add a compact conversion table for 1..10 and the common values 50, 100, 500, 1000.
- Document thrown exceptions: toRoman throws RangeError outside 1..3999; fromRoman throws TypeError for invalid roman strings.
- Add a short section linking to examples/usage.md and the CLI usage.

# Files to change
- README.md

# Acceptance Criteria
1. README contains examples demonstrating conversions for 1994 and 4 and the inverse conversion.
2. README includes a conversion table with entries for 1..10 and 50, 100, 500, 1000.
3. README documents RangeError and TypeError behaviors and includes a short CLI usage example.
