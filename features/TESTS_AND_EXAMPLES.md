# TESTS_AND_EXAMPLES

Status: Implemented

Summary
Provide the unit test suite, example fixtures, and documentation examples that verify the plotting library and CLI meet the mission requirements and behave deterministically in CI.

Unit tests (files and responsibilities)
- tests/unit/expression.test.js: verify parseExpression returns a callable function and computes Math-based results (sin and polynomial checks).
- tests/unit/range.test.js: verify parseRange and evaluateRange with "-3.14:0.01:3.14" returns exactly 629 points and that each point is { x: Number, y: Number }.
- tests/unit/csv.test.js: verify loadCSV parses RFC4180-compliant CSV strings and rejects/throws for non-numeric values with descriptive errors.
- tests/unit/svg.test.js: verify renderSVG output contains a polyline element and a viewBox attribute on the svg root.
- tests/unit/png.test.js: verify renderPNG returns a Buffer/Uint8Array whose first eight bytes equal the PNG signature when a renderer is available; otherwise the test must explicitly expect a rejection with message containing "Missing PNG renderer" or be skipped with a named reason.
- tests/unit/save.test.js: verify savePlotToFile writes valid .svg and (when renderer available) .png files with expected signatures.
- tests/unit/cli.test.js: verify --help prints usage and that example CLI invocations create files with expected content.
- tests/unit/main.test.js: verify the public named exports (parseExpression, parseRange, evaluateRange, loadCSV, renderSVG, renderPNG, savePlotToFile, main) exist and behave as documented.

Examples and fixtures
- Provide examples/sample.csv in the repository with at least three rows of ISO-8601 time and numeric value pairs; README examples must reference this file.
- README.md must include the canonical CLI example: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg and a short note describing the PNG conversion approach (sharp preferred, canvas fallback).

Deterministic behaviour and CI stability
- PNG tests must detect runtime availability of sharp or canvas and either run the renderer checks or deterministically skip with a clear skip reason to avoid CI flakiness.
- Playwright behaviour tests must use readiness probes or increased timeouts so homepage tests assert HTTP 200 and render checks without intermittent timeouts.

Completed work
- Unit tests and README CLI examples were merged and closed via issues #13, #15 and #17; behaviour test instability was investigated in issue #10.
- Tests now detect renderer presence and skip or assert the documented error when missing, preventing CI failures due to environment differences.

Outstanding work
- None blocking the mission; remaining CI flakiness should be monitored but does not prevent mission acceptance.

Acceptance Criteria
- All unit tests pass: npm test exits with status 0 in CI.
- All unit test files listed above exist under tests/unit/ and run with npm test (vitest) in an environment with devDependencies installed.
- tests/unit/expression.test.js asserts parseExpression('y=Math.sin(x)') returns f where Math.abs(f(Math.PI/2) - 1) < 1e-6.
- tests/unit/range.test.js asserts evaluateRange(parseExpression('y=Math.sin(x)'), -3.14, 0.01, 3.14) returns an Array of length 629 and that every element has numeric x and y properties.
- tests/unit/svg.test.js asserts the returned SVG string contains the substring <polyline and that the svg root has a viewBox attribute (viewBox=").
- tests/unit/png.test.js behaviour: if sharp or canvas is installed the test asserts returned bytes start with PNG magic bytes 89 50 4E 47 0D 0A 1A 0A; if neither is installed the test either expects renderPNG to reject with an Error containing "Missing PNG renderer" or the test is skipped with a documented skip reason.
- tests/unit/save.test.js writes out.svg containing <svg and viewBox and (when renderer available) out.png whose first bytes match the PNG signature.
- tests/unit/cli.test.js asserts --help writes usage to stdout and that running the canonical CLI example produces an output file containing the expected svg content.
- tests/unit/main.test.js asserts the public named exports exist and behave as documented.
- README.md contains the canonical CLI example and a short description of the PNG rendering approach and installation notes for common platforms.
- examples/sample.csv exists and contains at least 3 valid rows of time,value pairs referenced by tests/examples.
- Playwright behaviour tests (tests/behaviour/) are resilient to CI timing; homepage.test.js uses readiness checks or increased timeouts to avoid intermittent failures.
