# API_EXPORTS

Overview

Define and document the public API surface exported from src/lib/main.js so library consumers and unit tests can import individual functions.

Specification

- Named exports required from src/lib/main.js:
  - parseExpression
  - sampleRange
  - loadCsv
  - renderSvg
  - renderPng
  - saveToFile (helper to infer format and write SVG or PNG)
  - runCli or run (CLI entry point callable from code)

Acceptance Criteria

1. All named exports listed above exist and are functions when imported from src/lib/main.js
2. Unit tests can import these exports and call them independently without invoking the CLI behavior

Implementation Notes

- Keep each function focused and small so unit testing is straightforward.
- Export functions as named exports (not default) to satisfy the mission requirement.