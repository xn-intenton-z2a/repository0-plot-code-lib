# TESTS_AND_EXAMPLES

Status: Mostly completed — examples and unit tests added; CI stability work remains

Summary
Define the unit tests, behaviour test expectations and example artifacts that verify the feature set and provide users with runnable sample commands and data for manual testing. This feature covers making tests deterministic in CI, stabilising flaky behaviour tests (Playwright), and completing README examples and installation notes for optional native PNG renderers.

Unit tests (files and responsibilities)
- tests/unit/expression.test.js: verify parseExpression returns a function and computes Math-based results (sin and polynomial checks).
- tests/unit/range.test.js: verify parseRange and evaluateRange with "-3.14:0.01:3.14" returns 629 points and that each point is { x: Number, y: Number }.
- tests/unit/svg.test.js: verify renderSVG output contains a polyline element and a viewBox attribute on the svg root.
- tests/unit/png.test.js: verify renderPNG returns a Buffer/Uint8Array whose first eight bytes equal the PNG signature when a renderer is installed, otherwise the test deterministically skips or asserts the documented error message.
- tests/unit/save.test.js: verify savePlotToFile writes SVG and (when renderer available) PNG files with correct content signatures.
- tests/unit/cli.test.js: verify --help prints usage to stdout and that example CLI invocations create files with expected content signatures (svg contains <polyline> and svg root has viewBox).
- tests/unit/csv.test.js: verify loadCSV returns parsed rows and rejects malformed input with descriptive errors.
- tests/unit/main.test.js: verify the public named exports from src/lib/main.js exist and behave as documented.

Examples and fixtures
- Provide an examples/sample.csv file containing a small time,value dataset for manual testing and include its path in README.md examples.
- README.md must document runnable CLI commands and the PNG conversion dependency and installation notes (sharp or canvas fallback).

Deterministic behaviour and CI stability
- Behaviour tests (Playwright) must be stable in CI. The failing case observed (homepage.test.js timeout) should be fixed by increasing appropriate test timeouts and ensuring the demo page builds before tests run, or by making the test more tolerant of startup latency.
- PNG tests must not make CI flaky: tests should either detect the presence of native renderers and run accordingly, or use explicit skips/mocks so that environments without native dependencies produce deterministic test outcomes.

Outstanding work
- Stabilise Playwright behaviour tests so that the repository's test:behaviour step reliably completes within CI limits.
- Finalise README.md with the required CLI examples, sample outputs, and clear installation steps for sharp/canvas on common platforms.
- Ensure examples/sample.csv is present in the repository and referenced in README.md.
- Make png.test deterministic: update tests to skip when native renderers are absent or mock the renderer in unit tests where appropriate.

Acceptance Criteria
- All unit tests pass locally via npm test (vitest) in an environment with standard devDependencies installed; PNG-specific tests should pass when a native renderer is available and skip with a clear message when it is not.
- tests/unit/range.test.js asserts that evaluateRange(parseExpression('y=Math.sin(x)'), -3.14, 0.01, 3.14) returns an array of length 629 and that each point is an object with numeric x and y.
- tests/unit/svg.test.js asserts that renderSVG(points) returns a string containing <polyline and that the svg root includes a viewBox attribute.
- tests/unit/png.test.js behaves deterministically: when sharp or canvas is installed the test verifies the PNG magic bytes (89 50 4E 47 0D 0A 1A 0A) in the returned Buffer/Uint8Array; when neither renderer is available the test explicitly expects renderPNG to reject with an Error containing "Missing PNG renderer" or it skips with a named skip reason.
- README.md contains clear, copy-pastable CLI examples, documents the PNG conversion approach and lists installation notes for sharp and canvas on Linux and macOS (commands or links). The README must include at least the example from the mission: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
- examples/sample.csv is present in the repository and contains at least 3 rows of ISO-8601 time and numeric value pairs; README references this file in an example.
- Playwright behaviour tests (tests/behaviour/*.js) pass in the CI environment used by the project (no unexpected timeouts); specifically the homepage test that previously timed out now returns HTTP 200 and renders reliably under CI.
- The feature file is up-to-date in features/ and is used as the single source of truth for test and example work in the current development cycle.

Notes
- This feature intentionally centralises test and example remediation so that individual feature files (expression parser, svg renderer, png renderer, csv loader, CLI, file I/O, series generation) can remain concise and focused on implementation, while this feature tracks cross-cutting deliverables: documentation, CI stability and deterministic tests.
- Implementation tasks will require edits in tests/, README.md and possibly CI configuration; those changes are out of scope for this feature file but are captured by the acceptance criteria above.
