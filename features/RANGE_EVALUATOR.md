# RANGE_EVALUATOR

Status: Implemented

Overview

Evaluate numeric ranges in format start:step:end and produce an array of points by applying a callable function to each x value.

Behavior

- Expose evaluateRange(fn, start, step, end) -> Array<{x, y}>.
- Parse and validate numeric parts, enforce non-zero step, and support ascending and descending ranges depending on step sign.
- Include a small epsilon to accommodate floating point rounding so inclusive end points are handled deterministically.

Acceptance criteria (testable)

- Evaluating range -3.14:0.01:3.14 with a correct function returns approximately 628 data points (allow a tolerance band to account for rounding).
- Each consecutive x value differs by step within a small numeric tolerance.
- Negative steps and descending ranges are supported when step sign is correct.
- Malformed ranges (incorrect format, non-numeric parts, zero step) throw descriptive errors.

Testing notes

- Unit tests should verify returned array lengths for canonical ranges and error handling for malformed input.

Implementation notes

- Implementation location: src/lib/main.js. Use a deterministic iteration limit to avoid runaway loops for pathological input.
