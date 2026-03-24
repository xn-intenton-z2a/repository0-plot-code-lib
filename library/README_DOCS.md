README_DOCS

TABLE OF CONTENTS:
1. Quick CLI examples
2. How expression parsing works
3. SVG and PNG output notes (dependencies)
4. Acceptance criteria mapping
5. References and retrieval metadata

QUICK CLI EXAMPLES:
- Generate an SVG from an expression:
  node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
- Generate a PNG from CSV input:
  node src/lib/main.js --csv data.csv --file output.png
- Show help:
  node src/lib/main.js --help

EXPLANATIONS & NOTES:
- Expressions: parsed using the native JavaScript Function constructor; only Math.* functions and numeric operations are permitted. See library/EXPRESSION_PARSER.md for sanitisation rules.
- Range format: start:step:end where numeric values may be negative and fractional. See library/SERIES_GENERATION.md.
- CSV: RFC4180 compatibility; expect columns time,value and use streaming parsing for large files (see library/CSV_IMPORT.md).
- SVG output: valid SVG 1.1 with viewBox and <polyline> element (see library/SVG_RENDERER.md). The SVG string is returned by renderSVG and written directly when file extension is .svg.
- PNG output: produced by rasterizing the generated SVG. Recommended approach: sharp; optional alternative: node-canvas (requires native system libs). See library/PNG_RENDERER.md.

ACCEPTANCE CRITERIA (mapping):
- parseExpression("y=Math.sin(x)") => callable function: covered by EXPRESSION_PARSER
- Evaluating -3.14:0.01:3.14 produces ~628 points: covered by SERIES_GENERATION
- SVG contains <polyline> and viewBox: covered by SVG_RENDERER
- PNG starts with PNG magic bytes: renderer uses sharp or canvas to output PNG signature \x89PNG\r\n\x1a\n
- CLI examples: shown above; --help prints usage and exits 0.

REFERENCES & RETRIEVAL:
- SOURCES.md holds upstream references used to compile these notes. Retrieval date for referenced docs: 2026-03-24.
