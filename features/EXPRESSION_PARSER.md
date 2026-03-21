# EXPRESSION_PARSER

Summary
Provide a safe, auditable parser that converts a mathematical expression string into a callable JavaScript function using only the built-in Math object.

Goals
- Accept expressions of the form y=EXPR or EXPR where EXPR uses Math and the variable x.
- Return a function f(x) that evaluates the expression and returns numeric y.

API Contract
- parseExpression(expressionString) -> function f(x)
  - expressionString is a non-empty string. Accepts either a leading y= assignment or a bare expression.
  - The returned function accepts a single numeric x and returns a finite numeric y.

Behavior and constraints
- Only the Math object and the numeric variable x are available to the expression; no other globals or module access are permitted.
- Invalid, empty or non-evaluable expressions must throw a descriptive Error.
- Implementation should be auditable and avoid exposing the broader process environment.

Acceptance Criteria
- parseExpression("y=Math.sin(x)") returns a callable function and calling it with x=0 returns 0.
- parseExpression("y=x*x+2*x-1") when called with x=2 returns 5.
- parseExpression throws an Error for an empty string or clearly invalid inputs.

Deliverables
- Named export parseExpression implemented in src/lib/main.js (or an internal helper exported and re-exported).
- Unit tests verifying the acceptance criteria and edge cases.

Notes
- Document security considerations for using the Function constructor and the chosen sandboxing approach in the README.