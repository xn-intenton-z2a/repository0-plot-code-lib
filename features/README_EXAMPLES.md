# README_EXAMPLES

Summary
Update README.md with concise usage examples, the conversion table, and a short quickstart so users can use the library and run tests.

Specification
- Add a Usage section showing how to import and call the functions as named imports and how to run the CLI mode. Include example conversions:
  - integerToRoman(1994) -> MCMXCIV
  - romanToInteger("MCMXCIV") -> 1994
  - integerToRoman(4) -> IV
- Include the canonical conversion table (descending token list): 1000=M, 900=CM, 500=D, 400=CD, 100=C, 90=XC, 50=L, 40=XL, 10=X, 9=IX, 5=V, 4=IV, 1=I.
- Document error behaviour: RangeError for numbers outside 1..3999 and TypeError for invalid Roman strings.

Acceptance criteria
- README.md contains usage examples and the conversion table visible near the top
- README.md includes instructions for running unit tests (npm test)

Files changed by this feature
- README.md: add Usage, Examples, and Conversion Table sections.
