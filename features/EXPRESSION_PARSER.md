# EXPRESSION_PARSER

Summary
Provide a robust expression parser that converts a JavaScript expression string into a callable numeric function of x while restricting the evaluation environment to the Math object and the variable x.

Behavior
The parser accepts strings that either assign y in terms of x (for example: y=Math.sin(x)) or a raw expression that evaluates to y when x is provided (for example: x*x+2*x-1). The evaluation environment must expose only the JavaScript Math object and the variable x to avoid exposing other globals or running arbitrary code.

API
Export a named function parseExpression(expressionString) from src/lib/main.js. The function returns a callable function f(x) that returns a Number.

Errors
Syntactically invalid or unsafe expressions should throw a descriptive error (for example SyntaxError or TypeError) and must not execute arbitrary global code.

Acceptance Criteria
- parseExpression exists as a named export from src/lib/main.js.
- parseExpression("y=Math.sin(x)") returns a callable function f where calling f(Math.PI/2) returns a numeric value approximately equal to 1 (use a small numeric tolerance in tests).
- parseExpression throws a descriptive error for syntactically invalid expressions and for attempts to reference globals other than Math and x.
- No external math libraries are used; only the built-in Math object is available in the evaluation environment.
