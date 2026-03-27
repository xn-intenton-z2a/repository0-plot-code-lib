# RANGE_EVALUATION

Overview

Parse a numeric range string in the form start:step:end and evaluate a provided function across that range to produce an ordered array of (x,y) data points.

Behavior

- Accept range strings like -3.14:0.01:3.14 with start, step, and end as numeric values.
- Support positive and negative ranges; step sign must align with start/end progression.
- Produce an array of objects with numeric x and numeric y values in sequence.

Acceptance Criteria

- Evaluating a sine function over -3.14:0.01:3.14 returns approximately 628 points (allow tolerance ±2 points).
- A zero step results in a clear validation error.
- Step sign mismatch (e.g., start < end with negative step) results in a clear validation error.
- Results are deterministic and exported as a named API from src/lib/main.js.