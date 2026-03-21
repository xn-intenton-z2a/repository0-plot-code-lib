# EXPRESSION_PARSER

Overview

A parser that converts a mathematical expression string into a callable JavaScript function using only the built-in Math namespace.

Specification

- Named export: parseExpression(expressionString)
- Accepts simple assignment-style strings such as y=Math.sin(x) or y=x*x+2*x-1
- Returns a function f(x) that computes and returns numeric y for numeric x
- Must restrict evaluation to the Math object and the variable x; must not allow access to global objects like process, require, global, or Function.prototype properties

Acceptance Criteria

1. parseExpression is exported as a named export from src/lib/main.js
2. parseExpression called with the string y=Math.sin(x) returns a JavaScript function
3. The returned function when invoked with x=0 returns 0 within tolerance 1e-9
4. The returned function when invoked with x=1 returns Math.sin(1) within tolerance 1e-9
5. parseExpression throws an error for expressions that reference forbidden identifiers such as require or process

Implementation Notes

- Implementation should compile the expression into a function with an explicit Math binding and a single parameter x, or use a simple AST whitelist to avoid arbitrary code execution.
- Keep the parser minimal and well-tested; do not introduce external math libraries.

Tests

- Unit tests should import parseExpression and verify the acceptance criteria above, including a small negative test for unsafe identifiers.