# RANGE_SAMPLER

Overview

Sample a parsed expression or numeric function over a numeric range and return an array of points.

Specification

- Named export: sampleRange(fnOrExpression, rangeString)
- rangeString format: start:step:end (for example -3.14:0.01:3.14)
- Returns an array of {x:number,y:number} values in ascending x order
- Handle floating point rounding robustly; include start and end to within an epsilon

Acceptance Criteria

1. sampleRange is exported as a named export from src/lib/main.js
2. Sampling the parsed result of y=Math.sin(x) with range -3.14:0.01:3.14 returns approximately 628 data points (allow tolerance 620..640)
3. The first x value is equal to start within 1e-9 and the last x value equals end within 1e-9
4. Consecutive x differences are approximately equal to the step within reasonable floating point tolerance

Implementation Notes

- Parse the range string into numeric start, step and end. Validate step is non-zero and has matching sign to range direction.
- When provided an expression string, call parseExpression first; when provided a function, use it directly.

Tests

- Unit tests should verify point-count, first/last x values, and step consistency for the example range in the acceptance criteria.