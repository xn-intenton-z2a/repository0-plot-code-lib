RANGE_EVALUATOR

Overview

Evaluate a numeric range in the format start:step:end (for example -3.14:0.01:3.14) and produce an array of points by applying a callable function to each x value.

Behavior

- Expose a named export evaluateRange(rangeString, fn) where rangeString is start:step:end and fn is a function that accepts a numeric x and returns numeric y.
- The evaluator parses the three-part range, validates step sign relative to start/end, and generates points inclusive of start and end when the end aligns with steps within floating tolerance.
- Output is an array of objects with shape {x: number, y: number}.

API

- evaluateRange(rangeString, fn) -> Array of {x, y}
  - rangeString example: -3.14:0.01:3.14
  - fn example: function(x) { return Math.sin(x) }

Acceptance criteria

- Evaluating range -3.14:0.01:3.14 with a correct function returns approximately 628 data points (allowing for floating point rounding).  
- Each consecutive x value increases by step within a small numeric tolerance.  
- Negative steps and descending ranges are supported when step has the appropriate sign.  
- Invalid range formats or zero step cause descriptive errors.

Testing

- Unit tests must verify the returned array length for the example range, correct spacing of x values, and error handling for malformed ranges.

Implementation notes

- Use Number parsing and a small epsilon to compare floating differences. Keep returned arrays compact and deterministic for tests.