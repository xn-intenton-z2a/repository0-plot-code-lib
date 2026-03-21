# RANGE_EVALUATOR

Purpose
Evaluate a compiled expression function over a numeric range specified as start:step:end and produce a sequence of data points.

Scope
- Parse range strings like -3.14:0.01:3.14
- Generate values from start to end inclusive using the given step
- Return an ordered array of points represented as objects with keys x and y

Implementation Notes
- Robustly parse negative and decimal numbers when splitting the range by colon
- Use an inclusive end condition with a small epsilon tolerance to account for floating point rounding
- Validate that step is nonzero and that its sign makes sense for start and end

Acceptance Criteria
- Evaluating range -3.14:0.01:3.14 yields approximately 628 points within tolerance of plus or minus one point
- Invalid ranges, such as zero step, throw a clear error

Tests
- Unit tests confirm the approximate point count, that the first and last x values match expected start and end within tolerance, and that bad ranges throw
