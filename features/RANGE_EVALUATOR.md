# RANGE_EVALUATOR

Summary

Implement parsing and evaluation helpers for the range string format start:step:end and for producing numeric sequences used to sample expressions. Provide functions that generate the x axis values and evaluate an expression over that range to produce a series of points.

Scope

- Support the textual range format start:step:end where start, step and end are floating point numbers, for example -3.14:0.01:3.14.
- Expose named exports in src/lib/main.js such as parseRange and evaluateOverRange (or equivalent) that return arrays of numeric x values and arrays of points {x,y} respectively.
- Ensure inclusive end behavior consistent and documented; handle positive and negative step values with validation.

Acceptance criteria

- Parsing -3.14:0.01:3.14 yields approximately 628 x values (test allows a small rounding tolerance).
- evaluateOverRange can accept either a precompiled function (from the expression parser) or an expression string and returns an array of {x, y} or two parallel arrays.
- Invalid ranges (zero step, non-numeric parts) produce a clear error.

Implementation notes

- Use simple numeric iteration and avoid accumulating floating-point error where possible; tests may validate length and first/last values.
- Document expected rounding and inclusion semantics.

Tests

- Unit test that parseRange("-3.14:0.01:3.14") returns an array length between 627 and 629.
- Unit test that evaluateOverRange returns numeric y values for each x and that extreme inputs are handled gracefully.

# END
