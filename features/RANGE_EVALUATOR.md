# RANGE_EVALUATOR

## Summary

Parse a range string in the form start:step:end and evaluate a numeric function over that range to produce an ordered series of points.

## Motivation

Provide precise control over sampling density for plotting mathematical expressions and time series generation from expressions.

## Scope

- Range format: start:step:end where start, step and end are parseable as floating point numbers.
- Produce an array of points in ascending x order. Each point is an object with numeric x and y properties.
- Expose parseRange and evaluateOverRange helpers and export them from src/lib/main.js.

## Requirements

- parseRange(rangeString) returns {start, step, end} with numeric values and validation for step>0 and start<=end (or allow start>end only if step negative).
- evaluateOverRange(fn, rangeString) returns an array of {x,y} where fn is the function returned by parseExpression.

## Acceptance Criteria

- parseRange parses "-3.14:0.01:3.14" into numeric start, step and end.
- evaluateOverRange(parseExpression("y=Math.sin(x)"), "-3.14:0.01:3.14") returns an array with approximately 628 data points (acceptable range: 627 to 629 points).
- Each point object contains numeric x and y values; x values progress by the step and include both endpoints unless the arithmetic excludes the final point due to floating point alignment.

## Notes

- Implement careful floating-point stepping to avoid accumulating large rounding errors (for example compute x from start + i*step rather than incrementing a mutable x repeatedly).
