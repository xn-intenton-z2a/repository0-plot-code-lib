EXPRESSION_PARSER

Overview

Provide a small, auditable expression parser that converts a math expression string into a callable JavaScript function. Expressions are simple assignment-style strings such as y=Math.sin(x) or y=x*x+2*x-1 and must rely only on built-in Math functions and language features.

Behavior

- Expose a named export parseExpression(expressionString) that returns a function f(x) which evaluates the expression and returns the numeric y value.
- The parser accepts expression strings that compute y as a function of x (assignment or standalone expression that uses x). If the input is malformed, parseExpression throws a descriptive Error.
- The implementation must not pull in external math libraries; use the Function constructor carefully or a minimal safe evaluator that whitelists Math and numeric operations.

API

- parseExpression(expressionString) -> Function
  - input: expressionString (string), e.g. y=Math.sin(x)
  - output: callable function f(x) -> number

Acceptance criteria

- Parsing the string y=Math.sin(x) returns a callable function.  
- Calling the returned function with numeric input returns the same result as Math.sin(x) for representative values.  
- Malformed input causes a thrown Error with a helpful message.  
- No external math libraries are used.

Testing

- Unit tests should live under tests/unit/ and assert parseExpression returns a function, correctly evaluates sin/cos/polynomials, and rejects bad input.

Implementation notes

- Keep the parser minimal and auditable. Prefer explicit whitelisting of Math properties when using dynamic evaluation. Include guidance in the implementation comments about safety trade-offs.