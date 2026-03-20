# TESTS_AND_EXAMPLES

Summary
Define the unit tests and example artifacts that verify the feature set and provide users with sample commands and sample data.

Tests to include
- tests/unit/parseExpression.test.js: verify parseExpression returns a function and computes Math-based results (for example sin and polynomial checks).
- tests/unit/evaluateRange.test.js: verify evaluateExpressionRange with "-3.14:0.01:3.14" returns approximately 628 points.
- tests/unit/svg.test.js: verify renderSvg output contains a polyline element and a viewBox attribute.
- tests/unit/png.test.js: verify renderPng returns bytes whose leading bytes equal the PNG signature.
- tests/unit/cli.test.js: verify --help prints usage and that example CLI invocations create files with expected content signatures (svg contains <svg and viewBox, png starts with PNG magic bytes).

Examples
Include one small sample CSV in the examples/ directory for manual testing and document the example CLI invocations in README.md. Document the PNG conversion approach and required dependency choices in README.md.

Acceptance Criteria
- Unit tests implementing the above checks exist under tests/unit/ and are runnable via npm test.
- README.md contains example CLI commands and a short description of the PNG conversion approach and any runtime dependencies required to produce PNG output.
- An example CSV file is available under examples/ for manual testing and demonstration.
