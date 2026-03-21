STACKOVERFLOW_ROMAN_REGEX

Table of Contents
- Canonical validation regex
- Group-level explanation of regex components
- Use in practice (JS usage pattern)
- Edge cases and strictness
- Reference API use for validation
- Detailed digest and attribution

Normalised extract (regex and explanation)
Canonical validation regular expression (most-cited form):
^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$

Explanation of components (left-to-right)
- ^ and $ anchor full-string match.
- M{0,3}: thousands place — allows 0..3 leading M characters (0..3000).
- (CM|CD|D?C{0,3}): hundreds — matches 900 (CM), 400 (CD), or optional D followed by 0..3 C's for 0..300 or 500..800.
- (XC|XL|L?X{0,3}): tens — matches 90 (XC), 40 (XL), or optional L plus up to three X's for 0..30 or 50..80.
- (IX|IV|V?I{0,3}): ones — matches 9 (IX), 4 (IV), or optional V plus up to three I's for 0..3 or 5..8.

Use in practice (JavaScript pattern)
- Normalise input: s = String(s).toUpperCase();
- Validate: re = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/; re.test(s) returns true for canonical Roman numerals in the range 1..3999 and false for invalid or non-canonical forms like "IIII".
- Strict implementations must reject lower-case variants unless explicitly normalised.

Edge cases and strictness
- The regex enforces canonical subtractive pairs and prevents repeat counts that would create non-canonical forms.
- It also enforces the 0..3999 numeric expressible range by limiting thousands to M{0,3}.

Reference API usage for fromRoman
- Pre-validate using the regex. If validation fails, throw TypeError.
- If validation passes, parse or greedily match mapping pairs to compute integer result.

Detailed digest (source snapshot)
- Source URL: https://stackoverflow.com/questions/267399/regular-expression-to-match-roman-numerals
- Retrieval date: 2026-03-21
- Bytes downloaded (HTML): 671990
- Extracted technical content used: canonical validation regex and component explanations used to implement strict validation for fromRoman.

Attribution
Condensed from StackOverflow Q&A: "How do you match only valid roman numerals with a regular expression?" Retrieved 2026-03-21. Download size: 671990 bytes.
