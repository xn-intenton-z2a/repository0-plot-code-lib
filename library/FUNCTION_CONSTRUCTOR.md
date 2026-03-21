FUNCTION_CONSTRUCTOR

Table of contents
- Syntax
- Parameters
- Return value
- Scope and execution behavior
- Security considerations
- Implementation pattern for parsing expressions (mission-specific)
- Supplementary details
- Reference details (API signature)
- Digest and attribution

Normalized extract
Syntax
Function([arg1[, arg2[, ...argN]], functionBody])
Alternative invocation: new Function([arg1[, arg2[, ...argN]], functionBody])

Parameters
- arg1, arg2, ... argN: string — zero or more formal parameter names passed as separate string arguments.
- functionBody: string — the source code that becomes the body of the created function.

Return value
- A new Function object; a callable JavaScript function constructed at runtime.

Scope and execution behavior
- Functions created with the Function constructor are parsed at runtime. The created function executes in the global lexical environment; it does not close over the local lexical scope that created it. Use of Function is equivalent to executing code with eval in terms of privileges and scoping.
- Calling Function without new has the same effect as calling it with new.
- Use of strict mode: include 'use strict' as the first statement in functionBody to enable strict mode inside the created function.

Security considerations
- Function executes arbitrary code and is unsafe on untrusted input; it allows code injection.
- Avoid exposing Function to end-user input unless explicitly sandboxed or validated.

Implementation pattern for mission expression parsing
- Input examples accepted by the CLI: 'y=Math.sin(x)' or an expression body such as 'Math.sin(x)'.
- Normalised parsing approach:
  1. If the expression begins with 'y=', strip the leading 'y=' to obtain the right-hand side expression (rhs).
  2. Build a function body that returns the expression: 'return ' + rhs.
  3. Create a callable function of one variable x via new Function('x', functionBody).
  4. Example (literal): new Function('x', 'return Math.sin(x)') produces a callable that maps Number -> Number.
- Rationale: using a single-argument function keeps evaluation simple and lets Math.* references resolve to the global Math object.

Supplementary details
- The Function-created function's 'this' value follows normal call-site rules. When invoked as a plain function in non-strict mode, 'this' is the global object; in strict mode, 'this' is undefined unless bound.
- Performance: runtime parsing and JITing may be slower than precompiled code but for typical plotting ranges (hundreds to thousands of points) the per-evaluation overhead is acceptable.

Reference details (API signature)
- Name: Function (constructor)
- Signature: Function([arg1[, arg2[, ...argN]], functionBody]) -> Function
- Parameters: arg1..argN (string), functionBody (string)
- Returns: Function object (callable)
- Behavior notes: arguments are converted to strings and concatenated to produce the new function source.

Digest
- Source: MDN: Function - JavaScript | MDN Web Docs
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
- Retrieved: 2026-03-21
- Crawl bytes: 157123 bytes

Attribution
- Content extracted and condensed from MDN Web Docs (Function). Data retrieved 2026-03-21, 157123 bytes.
