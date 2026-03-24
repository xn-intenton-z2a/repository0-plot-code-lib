# SERIES_GENERATION

Summary
Specify evaluateRange which parses a start:step:end range and evaluates an expression or function across that numeric range producing an ordered series of points.

Specification
- Function: evaluateRange(rangeString, exprOrFn) -> Array of { x: Number, y: Number }.
- Range format: start:step:end. Step may be positive or negative and cannot be zero. The evaluator includes start and includes end if it is reachable within floating point tolerance.
- exprOrFn may be a function f(x) or an expression string parsed by parseExpression.

Acceptance criteria
- evaluateRange("-3.14:0.01:3.14", f) returns approximately 628 points (allow ±1 to account for rounding).
- The first point.x equals the start value and the last point.x is approximately the end value.
- Passing a zero step throws an Error.

Test plan
- tests/unit/series.test.js should verify parse and series length for the canonical range and test edge cases.
