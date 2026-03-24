# README_DOCS

Summary
Require README.md to document CLI usage with examples and explain the PNG conversion strategy used by the library.

Specification
- README must include example commands in plain text, for example:
  node src/lib/main.js --expression y=Math.sin(x) --range -3.14:0.01:3.14 --file output.svg
  node src/lib/main.js --csv data.csv --file output.png
- README should explain that PNG conversion currently uses a placeholder svgToPng implementation and include guidance for replacing it with sharp or canvas for production.

Acceptance criteria
- README.md contains the example command strings above and a short paragraph mentioning PNG conversion and svgToPng or sharp/canvas alternatives.

Test plan
- tests/unit/readme.test.js should assert README.md contains the example commands and a mention of PNG conversion.
