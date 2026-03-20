# EXPRESSION_PARSER

Summary

Provide a focused, safe expression parser that converts a user-supplied mathematical expression string into a callable JavaScript function f(x) that returns y. The parser must rely only on the built-in JavaScript Math library and must prevent access to global variables or arbitrary runtime objects.

Scope

- Accept expressions in the common form starting with y= or the expression body alone, for example y=Math.sin(x) or Math.sin(x).
- Provide a named export parseExpression in src/lib/main.js that returns a function taking a single numeric argument x and returning numeric y.
- Validate input and reject expressions that reference identifiers outside the allowed whitelist (Math and x) to avoid arbitrary code execution.

Acceptance criteria

- parseExpression("y=Math.sin(x)") returns a callable function.
- The returned function produces numeric outputs consistent with Math: for x = 0 the function returns 0 for the example sin expression.
- Attempts to parse expressions that reference global objects (for example process, require, globalThis) are rejected with a clear error.
- parseExpression is exported as a named export from src/lib/main.js.

Implementation notes

- Use a minimal, auditable approach to evaluation such as constructing a new Function with a strict whitelist of allowed names or safely substituting the expression body into a tiny evaluator wrapper. Document the safety rationale in comments.
- Keep the parser deterministic and free of external dependencies.

Tests

- Unit tests verify that parseExpression returns a function for valid expressions.
- Unit tests verify numeric accuracy at a couple of sample points for Math functions (sin, cos, polynomial).
- Unit tests assert that dangerous expressions are rejected.


# END
