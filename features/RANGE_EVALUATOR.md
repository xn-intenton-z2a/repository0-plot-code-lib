# RANGE_EVALUATOR

Summary
Evaluate a parsed expression across a numeric range specified as start:step:end and return an ordered array of data points.

Goals
- Accept a function or expression and a range string of the form start:step:end where start, step and end are decimals.
- Produce an array of points in the form [{ x: Number, y: Number }, ...] in ascending x order.

API Contract
- evaluateRange(fnOrExpression, rangeString) -> Array of { x, y }
  - If fnOrExpression is a string it must be parseable by parseExpression; otherwise accept a function f(x).
  - rangeString uses colon separators and numeric values; step must be non-zero and have the same sign as (end - start).

Behavior and constraints
- Inclusive range semantics are acceptable but tests should document exact counting. Implementation must be deterministic and avoid floating point accumulation errors where feasible.
- Invalid range formats must throw a descriptive Error.

Acceptance Criteria
- Evaluating expression "y=Math.sin(x)" over range -3.14:0.01:3.14 returns approximately 628 data points (accept ±1).
- evaluateRange returns an array where each element has numeric x and y properties and the array is ordered by x.
- Invalid ranges (non-numeric, zero step, mismatched sign) cause an Error.

Deliverables
- Named export evaluateRange from src/lib/main.js and unit tests validating point count, ordering, and error cases.

Notes
- Include a small tolerance in tests for floating point edge cases and assert approximate point counts rather than exact string matches.