FUNCTION

Normalised extract

Table of contents
1. Constructor syntax
2. Parameters and return
3. Execution context and scope
4. Security and best practices

Details

1. Constructor syntax
Syntax: new Function ([arg1[, arg2[, ...argN]],] functionBody)
- The arguments before the final string are names for parameters; the final string is the function body source code.
- Also callable as Function(...args) without new; returns a new Function object.

2. Parameters and return
- Returns: a new Function object which can be invoked with standard call/apply semantics.
- Example shape: new Function('x', 'return Math.sin(x)') produces a callable function f(x).

3. Execution context and scope
- Functions created with the Function constructor execute in the global scope and do not close over the local lexical scope where they were created.
- The created function has access to global objects (Math, Date, etc.) and parameters passed at call time.
- This means code string cannot reference local variables from the outer scope; only globals and provided parameter names are visible.

4. Security and best practices
- Function evaluated from untrusted input is effectively remote code execution; sanitize or restrict allowed characters/operations before constructing.
- Prefer parsing and building a safe AST for untrusted expressions; if using Function for convenience, strictly validate the expression (e.g., allow only: digits, whitespace, ., +, -, *, /, ^ or Math.<name>, parentheses, x, y, constants).
- Validate runtime exceptions using try/catch when invoking created functions.

Reference details (signatures)
Function([arg1[, arg2[, ...argN]],] functionBody: string): Function
- Returns a new Function instance. Parameter types: strings describing parameter names and function body.

Digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
Retrieved: 2026-03-23
Downloaded bytes: 157125

Attribution
Content originated from MDN Web Docs (developer.mozilla.org). See source URL above.
