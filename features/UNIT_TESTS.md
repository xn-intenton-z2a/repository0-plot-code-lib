# UNIT_TESTS

Summary
Define the required unit tests that prove the core library features meet the acceptance criteria and provide robust regression coverage.

Goals
- Cover expression parsing, range evaluation, CSV loading, SVG structure, PNG signature, file save, and CLI behaviors with focused unit tests.
- Use Vitest and existing test harness configured in package.json.

Test cases (representative)
- Expression parser: parseExpression("y=Math.sin(x)") is callable and f(0) === 0.
- Range evaluator: evaluateRange over -3.14:0.01:3.14 returns approximately 628 points.
- CSV loader: loadCsv on a small test fixture returns expected numeric values.
- SVG renderer: renderSvg output contains <polyline and viewBox and points count matches series length.
- PNG renderer: renderPng returns a Buffer starting with PNG magic bytes.
- File save: savePlot to .svg and .png writes files with correct signatures.
- CLI: invoking --help prints usage and invoking generation flags creates the expected file.

Acceptance Criteria
- Tests exist for each of the above items and can be run via npm test pointing at tests/unit/*.test.js.
- Tests are deterministic and clean up any temporary files they create.

Deliverables
- Test skeletons and examples in tests/unit/ that exercise the API and validate the acceptance criteria.

Notes
- Where native dependencies are optional (sharp), provide test stubs or fallbacks so CI can run without those native deps.