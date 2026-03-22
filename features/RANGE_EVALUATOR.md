# RANGE_EVALUATOR

# Description

Implement parsing and evaluation of numeric ranges in the form start:step:end (for example "-3.14:0.01:3.14"). Provide utilities to parse a range string into numeric start, step and end values, and to evaluate a parsed expression function across that range producing an ordered array of data points.

# Acceptance Criteria

- Export parseRange and evaluateRange from src/lib/main.js.
- parseRange accepts a string like "-3.14:0.01:3.14" and returns an object with numeric start, step and end.
- evaluateRange accepts a function f and a range (string or parsed object) and returns an array of data points where each element contains numeric x and numeric y.
- Evaluating the function produced from "y=Math.sin(x)" across the range "-3.14:0.01:3.14" returns approximately 628 data points (allow a tolerance of +/-1 point to account for floating point rounding).
- The first and last x values in the resulting array match start and end to within 1e-12 and each returned y is a finite number.