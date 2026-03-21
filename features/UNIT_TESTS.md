# UNIT_TESTS

Purpose
Provide unit tests that verify expression parsing, range evaluation, CSV loading, SVG structure, PNG signature, file saving, and CLI help output.

Scope
- Tests live under tests/unit and use vitest as the test runner
- Tests reference named exports from src/lib/main.js so logic is testable without spawning child processes wherever possible
- Include small fixtures for a CSV and a short expression range

Implementation Notes
- For PNG tests use an in-memory render call and assert the first four bytes equal the PNG signature
- For the range evaluation test assert that range -3.14:0.01:3.14 produces approximately 628 points within tolerance
- Avoid network or filesystem dependencies where possible; use temp files for file IO tests

Acceptance Criteria
- Unit tests exist for each mission acceptance criterion and are runnable via npm test
- Tests are deterministic on Node 24 and make no external network calls
- Test files assert exact shapes or signatures where applicable and allow small tolerances for floating point counts
