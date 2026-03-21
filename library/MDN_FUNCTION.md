NORMALISED EXTRACT

Table of contents
- Constructor signature
- Scope and environment for created functions
- Parameters and return type
- Security and portability notes
- Implementation patterns for controlled evaluation

1. Constructor signature
new Function([arg1[, arg2[, ...argN]]], functionBody) -> Function
Equivalent runtime form: Function([arg1[, arg2[, ...argN]]], functionBody)
functionBody and arg names are strings; the returned value is a callable Function object.

2. Scope and environment
Functions created with the Function constructor do not close over the local lexical scope where they are created; their scope chain is the global object. They execute in the global scope and can access global objects, including Math, but not local variables from the outer function.

3. Parameters and return
- Parameters: zero or more argument name strings followed by a final functionBody string
- Return: a callable Function instance; invoking it executes the functionBody with the provided arguments

4. Security and portability
- Dynamic code execution: constructing functions from untrusted input is a security risk. Validate or restrict input before use.
- Differences from eval: eval executes in the current lexical scope; Function executes in global scope.

5. Implementation pattern for safe expression evaluation
- Preferred approach: do not pass user-supplied full function bodies unvalidated.
- If using Function to evaluate mathematical expressions, supply only a sanitized expression body and bind required globals explicitly: e.g., create Function('x','Math','return ' + expression) and call with x and Math.

SUPPLEMENTARY DETAILS
- Performance: constructing a Function compiles the source at runtime; reuse compiled functions where possible for repeated evaluations.
- Strict mode: if functionBody contains 'use strict', the created function runs in strict mode.

REFERENCE DETAILS
- Function(...args: string[], functionBody: string) -> Function
- Behavior: arguments are interpreted as parameter identifiers; last string is function body; throws SyntaxError for invalid source.

DETAILED DIGEST
Source: MDN Function constructor
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced page (no bytes downloaded by this run)

ATTRIBUTION
MDN Web Docs - Function (developer.mozilla.org)
