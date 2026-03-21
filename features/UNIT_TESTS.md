# UNIT_TESTS

Purpose
Provide unit tests that verify expression parsing, range evaluation, CSV loading, SVG structure, PNG signature, file saving, and CLI help and README documentation.

Scope
- Tests live under tests/unit and use vitest as the test runner
- Tests must import named exports from src/lib/main.js so logic is testable without spawning child processes except for explicit integration tests
- Include small fixtures for a CSV and a short expression range

Implementation Notes
- For PNG tests use an in-memory render call and assert the first four bytes equal the PNG signature 0x89 0x50 0x4E 0x47
- For range evaluation test assert that range -3.14:0.01:3.14 produces approximately 628 points within a tolerance of ±1
- Use temporary files for any filesystem assertions and clean up after tests
- Keep tests deterministic on Node 24 and avoid external network dependencies

Acceptance Criteria
- Tests cover all mission acceptance criteria including:
  - parseExpression("y=Math.sin(x)") returns a callable function
  - evaluateRange("-3.14:0.01:3.14", f) yields ~628 data points (±1)
  - renderSvg output contains a <polyline> element and a viewBox attribute
  - renderPng output begins with PNG magic bytes
  - savePlot correctly writes .svg and .png files (SVG contains viewBox and polyline; PNG starts with magic bytes)
  - CLI --help prints usage and examples
  - README.md contains a CLI usage/examples section (test reads README and asserts presence of example commands)
- Tests are runnable via npm test and assert exact signatures where applicable and numeric tolerances where necessary
- Tests import and exercise the named exports parseExpression, evaluateRange, parseCsvToSeries, renderSvg, renderPng, savePlot, and runCli
