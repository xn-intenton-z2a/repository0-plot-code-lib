# TESTS_AND_EXAMPLES

Status: Implemented

Summary
Define the unit tests and example artifacts that verify the feature set and provide users with sample commands and sample data for manual testing.

Unit tests (exact files and responsibilities)
- tests/unit/expression.test.js: verify parseExpression returns a function and computes Math-based results (sin and polynomial checks).
- tests/unit/range.test.js: verify parseRange and evaluateRange with "-3.14:0.01:3.14" returns 629 points and that each point is { x: Number, y: Number }.
- tests/unit/svg.test.js: verify renderSVG output contains a polyline element and a viewBox attribute on the svg root.
- tests/unit/png.test.js: verify renderPNG returns a Buffer/Uint8Array whose first eight bytes equal the PNG signature when sharp is installed, otherwise the test skips.
- tests/unit/save.test.js: verify savePlotToFile writes SVG and (when sharp available) PNG files with correct content signatures.
- tests/unit/cli.test.js: verify --help prints usage to stdout and that example CLI invocations create files with expected content signatures (svg contains <polyline).
- tests/unit/csv.test.js: verify loadCSV returns parsed rows and rejects malformed input.
- tests/unit/main.test.js: verify main, getIdentity and identity metadata exports behave correctly.
- tests/unit/web.test.js: optional web demo tests.

Examples and fixtures
- Provide an examples/sample.csv file containing a small time,value dataset for manual testing (documented in README.md).
- README.md must include runnable example CLI commands and describe the PNG conversion dependency and how to install it.

Running tests
- Tests must be runnable with npm test and the repository's test script (vitest). The tests should not require external native dependencies to run basic parsing and SVG tests; PNG conversion tests may be skipped or use a mock if the native dependency is unavailable in CI.

Acceptance Criteria
- The unit test files listed above exist under tests/unit/ and are runnable via npm test or skipped with a clear skip reason if runtime native dependencies are not present.
- tests/unit/range.test.js asserts that evaluateRange produces an array with length 629.
- tests/unit/png.test.js either verifies renderPNG produces valid PNG bytes when native dependencies are available, or verifies that renderPNG rejects with a clear "Missing PNG renderer" error when dependencies are absent; the test must be deterministic about which behaviour is expected in the environment where it runs.
- README.md contains: example CLI commands, a short description of the PNG conversion approach, and installation notes for any required native modules (sharp or canvas).
- An example CSV file is available in examples/sample.csv for manual testing and demonstration (document presence in README.md).
