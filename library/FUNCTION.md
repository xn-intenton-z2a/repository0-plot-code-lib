FUNCTION

Table of contents
- Normalised extract: Function constructor overview
- Signature and semantics
- Creating evaluatable functions from strings
- Scope, closures and security considerations
- Validation and test strategy
- Detailed digest and attribution

Normalised extract: Function constructor overview
- The Function constructor creates new function objects from argument name strings and a function body string. It compiles a new function on the global scope and does not close over the local lexical environment where it is created.

Signature and semantics
- Constructor signature: Function([arg1[, arg2[, ...argN]],] functionBody)
- Returns: a callable function object with parameter list [arg1..argN] and body functionBody executed in function scope (not the outer lexical scope).
- Example behaviour: new Function('x', 'return x*x') yields a function equivalent to function anonymous(x) { return x*x; }
- The created function executes in global scope; it can still reference global objects such as Math, Date, etc.

Creating evaluatable functions from strings (pattern)
1. Accept input expression string e.g. "y=Math.sin(x)" or "y = x*x + 2*x - 1".
2. Extract RHS: match "y\s*=\s*(.+)" and capture RHS.
3. Optionally apply preprocessing (map bare names to Math., normalize whitespace, remove trailing semicolon).
4. Validate RHS against token whitelist (see validation section).
5. Compile function using: f = new Function('x', 'return ' + RHS);
6. Wrap f with a thin adapter that ensures numeric input and numeric output and catches exceptions.

Scope, closures and security considerations
- Functions created with new Function do not capture local scope variables; they operate with global scope and the provided parameter list only.
- Because the body is a string, injection of arbitrary code is possible; therefore strict whitelist validation and runtime testing are required before use in production.
- Consider sandboxing measures if exposing expression editing in hostile environments: run expression compilation in a child process or worker and restrict available globals.

Validation and test strategy
- Validate permitted tokens and identifiers (x, numeric literals, parentheses, math operators, comma, allowed Math identifiers).
- Disallow characters and keywords that enable side effects: semicolons, new, import, require, process, global, window, Function, eval, class, =>
- After compilation, perform test runs with representative numeric inputs (edge values like 0, 1, small and large values) wrapped in try/catch; if exceptions occur, reject the expression.

Detailed digest
- Source: MDN Web Docs — Function
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
- Retrieved: 2026-03-21
- Data obtained during crawl: 161984 bytes

Attribution
- Condensed from MDN Function constructor documentation; includes exact constructor signature, semantics and practical usage notes for safely compiling numeric expressions.