# EXPRESSION_PARSER

Summary
Provide a robust expression parser that converts a JavaScript expression string into a callable numeric function of x.

Behavior
The parser accepts strings that either assign y in terms of x (for example: y=Math.sin(x)) or a raw expression that evaluates to y when x is provided (for example: x*x+2*x-1). The evaluation environment exposes only the JavaScript Math object and the variable x to avoid exposing other globals.

API
Export a named function parseExpression(expressionString) from src/lib/main.js. The function returns a callable function f(x) that returns a Number.

Errors
Invalid or unsafe expressions should throw a descriptive error (for example SyntaxError or TypeError) and not execute arbitrary global code.

Acceptance Criteria
- parseExpression("y=Math.sin(x)") returns a callable function.
- Calling the returned function with numeric x yields a numeric result consistent with Math.sin semantics.
- parseExpression throws a descriptive error for syntactically invalid expressions.
- No external math libraries are used; only the built-in Math object is required.
- The named export parseExpression exists in src/lib/main.js.
