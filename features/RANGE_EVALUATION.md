# RANGE_EVALUATION

Summary
Parse a range string start:step:end and generate a numeric sequence of x values, then evaluate an expression function across the sequence to produce an array of points.

Specification
- Range format: start:step:end where start, step and end are interpreted as floating point numbers.
- Generate values starting at start, adding step repeatedly until end is reached or passed; include start and include end when reachable by stepping.
- Step must be non-zero and its sign must move the sequence toward end; invalid ranges throw a clear error.
- For each x value call the expression function and return an array of objects {x: number, y: number}.
- Export evaluateRange as a named export from src/lib/main.js.

Files to change
- Implement evaluateRange in src/lib/main.js.
- Add unit tests in tests/unit/range.test.js that verify step direction, error cases and expected counts.

Acceptance Criteria
- Evaluating range -3.14:0.01:3.14 using a standard sine function returns approximately 628 data points (tests may assert length is between 627 and 629).
- Invalid ranges (zero step or step direction mismatch) throw an informative error.
- Output is an array of objects with numeric x and y properties.
