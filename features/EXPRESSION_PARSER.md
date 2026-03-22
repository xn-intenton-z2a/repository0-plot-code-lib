# EXPRESSION_PARSER

# Description

Provide a small, safe JavaScript expression parser that converts a single assignment expression into a callable function. The parser accepts strings such as "y=Math.sin(x)" and "y=x*x+2*x-1" and returns a function f(x) that evaluates the right-hand side using only the built-in Math object and numeric operators. The parser must refuse access to global objects or identifiers other than Math, x and numeric literals.

# Acceptance Criteria

- Export a named function parseExpression from src/lib/main.js that accepts a single string and returns a callable function.
- Parsing "y=Math.sin(x)" returns a callable function f; f(0) equals 0 and f(1) equals Math.sin(1) within a tolerance of 1e-12.
- Parsing "y=x*x+2*x-1" returns a callable function that produces correct numeric results for sample inputs (for example f(2) equals 6).
- The parser throws a descriptive error if the input does not define y in terms of x or if it contains disallowed identifiers such as process, require, globalThis or other non-Math globals.
- The implementation uses only JavaScript core features and the Math object; no external math libraries are required.