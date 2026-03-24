# SERIES_GENERATION

Summary
Evaluate a parsed expression function across a numeric range and return an ordered series of data points.

Specification
- Range format: start:step:end (e.g. -3.14:0.01:3.14). Accept numeric values including negatives and decimal steps.
- API: parseRange(rangeString) -> {start, step, end}; generateSeries(fnOrExpression, rangeString) -> Array of points where each point is an object {x: Number, y: Number}.
- Inclusion semantics: include the start value; include the end value if it is reachable within a small floating-point tolerance when stepping from start by repeated additions of step.

Acceptance criteria
- parseRange("-3.14:0.01:3.14") returns numeric start, step and end values.
- generateSeries(parsedFn, "-3.14:0.01:3.14") returns approximately 628 data points (allow ±1 to account for inclusive/exclusive semantics and float rounding).
- The first point.x equals the start value and the last point.x is approximately the end value.

Test plan
- Add tests/unit/series.test.js that verify parseRange parsing, correct numeric types, correct series length for the canonical range and edge cases (zero step, negative step, non-divisible end).

Files to change
- src/lib/main.js: export parseRange and generateSeries functions.
- tests/unit/series.test.js: unit tests as described.
