# EXPRESSION_PARSING

Summary
A parser that converts a user-supplied mathematical expression string into a safe callable JavaScript function f(x) using only the built-in Math namespace and numeric operators.

Motivation
Parsing expressions is fundamental to plotting mathematical functions supplied by users and must be reliable and safe.

Specification
- Accept input strings that assign y to an expression in terms of x, for example y=Math.sin(x) or y=x*x+2*x-1.
- Extract the right-hand side expression and produce a JavaScript function that accepts a single numeric argument x and returns numeric y.
- Disallow access to globals other than Math and the parameter x; prevent arbitrary global access.
- Reject malformed expressions with a clear error message; runtime errors from evaluation may propagate.
- Prefer a minimal code-generation approach that explicitly scopes Math to the evaluator and documents the chosen approach in FUNCTION_CONSTRUCTOR.md.

API and Files to change
- Export parseExpression from src/lib/main.js as a named export.
- Add unit tests in tests/unit/expression.test.js covering valid and invalid expressions.
- Document behavior and examples in README.md.

Acceptance Criteria
- Parsing y=Math.sin(x) returns a callable function.
- The returned function, when called with a numeric x, produces the same numeric result as Math.sin for that x.
- Attempts to reference globals other than Math or x fail at parse time or when invoked and produce clear errors.
- The parser is exported as a named export from src/lib/main.js and covered by unit tests.
