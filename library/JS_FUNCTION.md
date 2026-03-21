JS_FUNCTION

Table of contents
- Signature
- Creating from expression strings
- Execution context and scope
- Security and sanitization
- Implementation pattern
- Troubleshooting

Normalised extract
Signature: new Function([arg1[, arg2[, ...argN]], functionBody)
Type: constructor returning a Function object.
Behavior: Accepts zero or more argument-name strings and a final string containing the function body. The returned function executes the functionBody in the global scope (no lexical closure over where it was created). Errors thrown inside the body propagate as runtime exceptions when the Function is called.

Creating from expression strings
- Expected input: expression strings of the form y=EXPR (whitespace tolerated).
- Extraction: rhs = expression.replace(/^\s*y\s*=\s*/, '');
- Build callable: f = new Function('x', 'return (' + rhs + ')');
- Call: y = f(xValue) ; ensure Number.isFinite(y) before using.

Execution context and scope
- The functionBody is evaluated as global code; local variables from the caller are not visible. Global objects (Math, Date, etc.) are available.

Security and sanitization
- The Function constructor is equivalent in power to eval; do not accept arbitrary untrusted input.
- Recommended whitelist approach: tokenize the RHS and only allow numeric literals, parentheses, arithmetic operators (+ - * / % .), the variable x, and a set of approved Math identifiers: sin, cos, tan, asin, acos, atan, sqrt, pow, log, abs, PI, E, min, max, floor, ceil, round.
- Example simple check: verify the RHS matches a token pattern after tokenization; do not rely solely on a single regex for full safety.
- For untrusted inputs consider a real expression parser or an isolated sandboxed runtime.

Implementation pattern (exact steps)
1. Normalize: expr = expr.trim(); if (!/^\s*y\s*=/.test(expr)) error.
2. Extract RHS: rhs = expr.replace(/^\s*y\s*=\s*/, '');
3. Validate tokens against a whitelist.
4. Construct: f = new Function('x', 'return (' + rhs + ')');
5. Evaluate with guards: try { const y = Number(f(x)); if (!Number.isFinite(y)) handle; } catch (e) { handle }

Troubleshooting
- SyntaxError when building Function: inspect rhs and test f.toString() to see generated body.
- Runtime exceptions: wrap calls in try/catch and log failing x.
- Unexpected globals: ensure the input does not contain statements (avoid semicolons or newlines) if only expressions are expected.

Reference details
- Constructor signature: new Function([arg1[, arg2[, ...argN]], functionBody]) -> Function
- Parameters: arg1..argN: String names for parameters. functionBody: String containing JavaScript statements/expressions.
- Returns: A callable Function object. The created function has no lexical closure to the creator.
- Best-practice implementation example: extract RHS then new Function('x', 'return (' + rhs + ')'); validate tokens first; always call inside try/catch.

Detailed digest (source and retrieval)
Source: MDN Function constructor
Retrieved: 2026-03-21
Crawled bytes: 157123
Attribution: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
