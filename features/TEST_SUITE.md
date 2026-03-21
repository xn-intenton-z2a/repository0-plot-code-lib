# TEST_SUITE

Overview
This feature defines the unit and integration tests required to validate the library and CLI against the mission acceptance criteria.

Specification
- Tests should live under tests/unit/ and exercise the public named exports from src/lib/main.js.
- Required test areas:
  - Expression parsing: parseExpression correctly returns a function for y=Math.sin(x) and rejects unsafe expressions.
  - Range evaluation: evaluateRange produces expected point counts for a known range and respects step sign and zero-step validation.
  - CSV loading: loadCsv parses header and headerless CSVs, handles quoted fields, and converts values to numbers.
  - SVG rendering: renderSvg output contains a polyline element and a viewBox attribute.
  - PNG rendering: renderPngFromSvg returns a Buffer whose leading bytes match the PNG signature.
  - Save and CLI integration: savePlot writes files of the correct format and the CLI --help and example commands behave as specified.

Acceptance criteria
- All unit tests pass when running npm test (tests/unit/*.test.js) and tests cover the items above.
- Specific mission acceptance criteria are mapped to tests: function parsing, range point count, svg polyline and viewBox assertions, PNG magic bytes, CLI help printing, and file creation.

Implementation notes
- Create focused tests in tests/unit/main.test.js that import named exports and assert expected behaviour with deterministic inputs.
- Keep tests fast and deterministic; where external native modules are required for PNG tests ensure they are optional or skipped in environments where the native dependency is not installed.