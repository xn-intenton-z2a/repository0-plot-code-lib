# README_DOCS

Summary
Update README.md to document CLI usage with concrete examples and to explain the PNG rendering approach used by the project.

Specification
- README must include at least the following example commands: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg and node src/lib/main.js --csv data.csv --file output.png.
- Document the PNG rendering approach (e.g., using sharp or canvas) and note any optional dependencies and installation instructions.

Acceptance criteria
- README.md contains the CLI usage examples and a brief paragraph describing how SVG is converted to PNG and which dependency is used.

Test plan
- Add tests/unit/readme.test.js (or include in existing docs tests) that assert README contains the example command strings and a mention of PNG conversion.

Files to change
- README.md: include the examples and explanation described above.
- tests/unit/readme.test.js: test that README contains required documentation.
