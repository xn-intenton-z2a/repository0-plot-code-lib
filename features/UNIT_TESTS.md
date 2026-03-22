# UNIT_TESTS

Summary
Add comprehensive unit tests covering parsing, range evaluation, CSV loading, SVG rendering, PNG export (optional) and CLI behavior.

Specification
- Create tests under tests/unit for parseExpression, evaluateRange, loadCsv, renderSvg, exportPng and CLI.
- Use Vitest consistent with the repository and avoid heavy external dependencies in tests; the PNG conversion test may be conditional or skipped when optional dependency is absent.
- Tests must be deterministic and assert precise behaviors described in other feature specs.

Files to change
- Add tests in tests/unit/*.test.js that mirror the library exports in src/lib/main.js.
- Update README.md to document how to run unit tests.

Acceptance Criteria
- Tests cover the main public API functions and the CLI.
- Tests assert parsing y=Math.sin(x) returns a callable function, range generation counts, svg content, png magic bytes and CLI help output.
