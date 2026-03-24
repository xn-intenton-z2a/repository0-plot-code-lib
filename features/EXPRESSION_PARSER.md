# EXPRESSION_PARSER

Summary
Specify parseExpression which converts an expression string into a callable JavaScript function f(x) using built-in evaluation.

Specification
- Function: parseExpression(expressionString) -> function f(x).
- Accepted format: optional leading y= then a right-hand-side expression referencing x and Math, for example y=Math.sin(x) or x*x+2*x-1.
- Implementation notes: the parser trims an optional leading left-hand assignment and constructs a Function that accepts x and returns the evaluated expression. The expression must reference Math explicitly for math functions (for example Math.sin).
- Validation: non-string input throws TypeError; empty expression throws Error; other syntax errors propagate as invalid expression errors.

Acceptance criteria
- parseExpression returns a callable function for the input y=Math.sin(x).
- The returned function computes expected numeric results (for example f(0) approximately 0 and f(Math.PI/2) approximately 1).
- Non-string inputs and empty expressions cause thrown errors.

Test plan
- tests/unit/expression.test.js covering correct parsing, numeric outputs for known inputs, and error cases for invalid inputs.
