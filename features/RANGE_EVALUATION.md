# RANGE_EVALUATION

Overview
This feature defines range parsing and evaluation utilities to sample a function across a numeric range described by the format start:step:end.

Specification
- Provide a named export evaluateRange(fn, rangeString) that returns an array of points [{x:number, y:number}, ...].
- rangeString format is start:step:end where start, step and end are floating point numbers (for example -3.14:0.01:3.14).
- step must not be zero. For positive step generate points while x <= end + epsilon; for negative step generate while x >= end - epsilon. Use a small epsilon to tolerate floating point rounding.
- The function must compute y = fn(x) for each sampled x and include both x and y in the returned array.
- Validate numeric inputs and throw descriptive errors for malformed ranges or non-numeric parts.

Rationale
Reliable sampling over numeric ranges is required to produce plotted series for expressions. The inclusive end and rounding tolerance ensure expected sample counts for typical decimal steps.

Acceptance criteria
- evaluateRange(parsedFn, "-3.14:0.01:3.14") returns approximately 628 data points when parsedFn is the identity or a simple function, matching the mission example.
- A step value of 0 results in an error.
- Non-numeric range parts produce a validation error.

Implementation notes
- Export evaluateRange from src/lib/main.js and add unit tests that check the number of generated points and boundary behavior.