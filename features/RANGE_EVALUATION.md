# RANGE_EVALUATION

Summary
Evaluate a parsed expression across a numeric range specified as start:step:end and produce an ordered array of numeric points suitable for plotting.

Specification
- Provide a named export evaluateRange(expressionFunction, rangeString) that returns an array of objects with numeric x and y fields.
- Range format is start:step:end where start, step and end are numeric values. Step must be non-zero and finite. The sequence includes both endpoints when they align with the step increments.
- The output order is ascending for positive step and descending for negative step.

Acceptance Criteria
- evaluateRange is exported as a named export from src/lib/main.js.
- Evaluating the parsed expression corresponding to y=Math.sin(x) over the range -3.14:0.01:3.14 returns 629 points.
- Invalid or malformed range strings produce a clear error message.
- All returned entries have numeric x and finite numeric y values for ordinary Math functions.

Testing notes
- Unit tests should assert the returned array length, ordering, numeric types, and error handling for bad ranges.