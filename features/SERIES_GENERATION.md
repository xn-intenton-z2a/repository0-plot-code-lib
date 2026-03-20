# SERIES_GENERATION

Status: Implemented

Summary
Helpers to parse numeric ranges and generate a series of data points by evaluating an expression over that range.

Behavior
Provide parseRange(rangeString) to turn start:step:end strings into numeric start, step, and end. Provide evaluateRange(fn, start, step, end) which uses parseExpression internally to produce an ordered array of points { x: number, y: number } where x and y are Numbers.

Range rules
The range format is start:step:end using floating point numbers, supporting negative values and positive or negative step directions. The sequence should include endpoints when the stepping arithmetic reaches them within a reasonable floating point tolerance.

API
Export named functions parseRange and evaluateRange from src/lib/main.js.

Acceptance Criteria
- parseRange("-3.14:0.01:3.14") returns { start: -3.14, step: 0.01, end: 3.14 } with numeric values.
- evaluateRange(fn, rStart, rStep, rEnd) when used with parseExpression('y=Math.sin(x)') and the range -3.14, 0.01, 3.14 returns an array of points with length 629.
- Each returned point is an object with numeric x and numeric y values.
- parseRange and evaluateRange are exported as named functions from src/lib/main.js.
