# TESTS_AND_EXAMPLES

Summary
Define the unit tests and example artifacts that verify the feature set and provide users with sample commands and sample data for manual testing.

Unit tests (exact files and responsibilities)
- tests/unit/parseExpression.test.js: verify parseExpression returns a function and computes Math-based results (sin and polynomial checks).
- tests/unit/evaluateRange.test.js: verify evaluateExpressionRange with "-3.14:0.01:3.14" returns approximately 628 points and that each point is { x: Number, y: Number }.
- tests/unit/svg.test.js: verify renderSvg output contains a polyline element and a viewBox attribute on the svg root.
- tests/unit/png.test.js: verify renderPng returns a Buffer/Uint8Array whose first eight bytes equal the PNG signature.
- tests/unit/cli.test.js: verify --help prints usage to stdout and that example CLI invocations create files with expected content signatures (svg contains <svg and viewBox, png starts with PNG magic bytes).

Examples and fixtures
- Provide an examples/sample.csv file containing a small time,value dataset for manual testing (documented in README.md).
- README.md must include runnable example CLI commands and describe the PNG conversion dependency and how to install it.

Running tests
- Tests must be runnable with npm test and the repository's test script (vitest). The tests should not require external native dependencies to run basic parsing and SVG tests; PNG conversion tests may be skipped or use a mock if the native dependency is unavailable in CI.

Acceptance Criteria
- The unit test files listed above exist under tests/unit/ and are runnable via npm test or skipped with a clear skip reason if runtime native dependencies are not present.
- tests/unit/evaluateRange.test.js asserts that evaluateExpressionRange("y=Math.sin(x)","-3.14:0.01:3.14") returns an array with length within +/-2 of 628.
- tests/unit/png.test.js either verifies renderPng produces valid PNG bytes when native dependencies are available, or verifies that renderPng rejects with a clear "Missing PNG renderer" error when dependencies are absent; the test must be deterministic about which behaviour is expected in the environment where it runs.
- README.md contains: example CLI commands, a short description of the PNG conversion approach, and installation notes for any required native modules (sharp or canvas).
- An example CSV file is available in examples/sample.csv for manual testing and demonstration (document presence in README.md).
