# Expression Parser

This document describes the expression parsing behaviour and security model used by the library.

Allowed syntax
- Expressions may be provided as `y=...` assignments (for example: `y=Math.sin(x)`) or as a bare expression that evaluates to `y` given `x` (for example: `x*2+1`).
- Only the identifier `x` and the global `Math` object are permitted identifiers in expressions. All Math functions (e.g., `Math.sin`, `Math.cos`, `Math.log`) are allowed.
- Numeric literals, arithmetic operators (+ - * / % **), parentheses, and unary operators are allowed.

Security model
- Expressions are validated before compilation. Any appearance of known-dangerous tokens is rejected, including `process`, `globalThis`, `window`, `this`, `constructor`, `__proto__`, `prototype`, `Function`, `eval`, `require`, or bracket access (`[` / `]`).
- Property access is restricted: only `Math.<identifier>` is permitted; any other dotted access (e.g., `foo.bar`) will be rejected.
- After validation the expression body is compiled inside a Function wrapper that exposes only two parameters: `Math` and `x`.
- Unsafe or syntactically invalid expressions throw a `SyntaxError` (or `TypeError` for incorrect argument types).

Examples

- `parseExpression('y=Math.sin(x)')` → returns a function `f(x)`.
  - `f(0) === 0`
  - `f(Math.PI/2) ≈ 1` (within numeric tolerance)

- `parseExpression('x*2+1')` → returns `f` where `f(1) === 3`.

Errors
- Attempts to reference disallowed globals will throw `SyntaxError`:
  - e.g. `parseExpression('y=process.exit()')` throws `SyntaxError`.
  - e.g. `parseExpression('y=this.constructor')` throws `SyntaxError`.

Notes
- Expressions are still JavaScript and should be treated as untrusted input in hostile environments; validation reduces risk but cannot replace sandboxing in truly untrusted scenarios.
