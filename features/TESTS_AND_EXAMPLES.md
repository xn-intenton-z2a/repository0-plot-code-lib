# TESTS_AND_EXAMPLES

Summary
Define the unit tests and example artifacts that verify the feature set and provide users with sample commands and sample data.

Tests to include
- parseExpression.test.js: verify parseExpression returns a function and computes Math-based results.
- evaluateRange.test.js: verify evaluateExpressionRange with "-3.14:0.01:3.14" returns approximately 628 points.
- svg.test.js: verify renderSvg output contains a polyline element and a viewBox attribute.
- png.test.js: verify renderPng returns bytes whose leading bytes equal the PNG signature.
- cli.test.js: verify --help prints usage and that the example CLI invocations create files with expected content signatures (svg contains <svg, png starts with PNG magic bytes).

Examples
Include one small sample CSV in examples/ for manual testing and document the example CLI invocations in README.md. Document the PNG conversion approach and required dependency choices.

Acceptance Criteria
- Unit tests exist covering the behaviors listed above and are runnable via npm test.
- README contains example CLI commands and describes the PNG implementation approach.
- Example CSV is provided in examples/ for manual verification and demonstration.
