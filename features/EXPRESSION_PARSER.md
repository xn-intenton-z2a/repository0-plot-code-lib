# EXPRESSION_PARSER

Overview
This feature specifies a safe, minimal expression parser that converts a simple mathematical assignment string into a callable JavaScript function. Target strings follow the pattern y=EXPR where EXPR is a JavaScript expression using the variable x and Math.* helpers only.

Specification
- Provide a named export parseExpression(expression: string) that returns a function f(x: number) -> number or throws a descriptive Error on invalid input.
- The parser validates that the input is an assignment to y and contains only allowed tokens: the variable x, numeric literals, parentheses, the operators + - * / % **, and identifiers accessed as properties of the global Math object (for example Math.sin, Math.PI).
- The implementation must prevent access to global objects other than Math and must reject identifiers not explicitly allowed.
- Errors must be thrown for malformed expressions, use of disallowed identifiers, or expressions that do not evaluate to a numeric result.

Rationale
Parsing expressions is a foundational capability for plotting functions. Restricting to Math and x keeps evaluation simple and secure while matching mission requirements.

Acceptance criteria
- parseExpression("y=Math.sin(x)") returns a callable function.
- Calling the returned function with x = 0 yields a numeric result equal to 0 within a small epsilon.
- parseExpression("y=x*x+2*x-1") produces expected numeric outputs for sample x values.
- Expressions that reference identifiers other than x or Math raise a validation error (for example y=process.exit() must be rejected).

Implementation notes
- Modify src/lib/main.js to export parseExpression.
- Add unit tests in tests/unit/ verifying correct function behavior, numeric results, and rejection of unsafe identifiers.
- Tests should avoid executing untrusted code paths; validate that the parser raises errors when unsafe identifiers are present.