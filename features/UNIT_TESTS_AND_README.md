# UNIT_TESTS_AND_README

Overview

Define required unit tests that prove core behaviour for parsing, range evaluation, CSV import, SVG rendering, PNG output (magic bytes), file output, and CLI invocation. Update README with example commands and describe the PNG approach and any optional dependencies.

Behavior

- Each feature must include unit tests in tests/unit demonstrating the acceptance criteria in this feature set.
- README must contain example commands for expression-based SVG generation and CSV-based PNG generation and explain how PNG is produced.

Acceptance Criteria

- Tests assert parsing of y=Math.sin(x) produces a callable function and numeric output.
- Tests assert range evaluation returns approximately 628 points for -3.14:0.01:3.14.
- Tests assert SVG output contains a viewBox and a polyline element.
- Tests assert PNG output begins with the PNG magic bytes.
- README includes at least two example CLI commands demonstrating expression and CSV use.