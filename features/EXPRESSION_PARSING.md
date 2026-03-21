# EXPRESSION_PARSING

Summary
This feature specifies parsing of JavaScript expression strings that compute y as a function of x using only built-in Math functionality. The library exposes a named export that converts an input expression string into a callable numeric function of one variable.

Specification
- Provide a named export parseExpression(expressionString) that returns a function f(x) which computes y for numeric x.
- Expressions assign to y and may use Math functions and numeric operators. The parser must not allow access to globals or the runtime environment beyond Math.
- On invalid syntax or unsafe identifiers the parser throws a descriptive error.

Acceptance Criteria
- parseExpression is exported as a named export from src/lib/main.js.
- Calling parseExpression with the expression string y=Math.sin(x) returns a callable function.
- The returned function, when called with x approximately equal to pi/2, yields a numeric result within 1e-6 of 1.0.
- The parser rejects expressions that reference globalThis, process, require, or other non-Math identifiers.

Testing notes
- Unit tests should cover correct numeric output, invalid syntax, and attempts to access non-Math globals.