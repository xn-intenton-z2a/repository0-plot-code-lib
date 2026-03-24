# EXPRESSION_PARSER

Summary
Provide a parser that converts a mathematical expression string into a callable JavaScript function that computes y for a given numeric x. The parser must rely only on built-in JavaScript Math functions and numeric operators; no external math libraries.

Specification
- Input: a string expression in the form y=EXPR where EXPR may reference the variable x and Math functions, for example y=Math.sin(x) or y=x*x+2*x-1.
- API: parseExpression(expressionString) -> function f(x) that returns numeric y.
- Implementation notes: extract the right-hand side after the equals sign and construct a restricted evaluator that only exposes x and Math (for example by building a Function that accepts x and Math). Perform simple validation to reject obviously unsafe tokens (for instance disallow new, require only identifiers, numbers, Math and x, and arithmetic operators).

Acceptance criteria
- Parsing y=Math.sin(x) returns a callable function (typeof result === 'function').
- The returned function produces correct numeric results (for example f(0) approximately 0 and f(Math.PI/2) approximately 1).
- Invalid or malformed expressions throw a descriptive Error.

Test plan
- Add tests/unit/expression.test.js asserting parseExpression behavior, numeric results for known inputs, and error handling for malformed inputs.

Files to change
- src/lib/main.js: export parseExpression as a named export and implement the parser.
- tests/unit/expression.test.js: unit tests described above.
