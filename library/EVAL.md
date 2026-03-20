EVAL

Table of Contents
- Syntax
- Parameters
- Return value
- Exceptions / Errors
- Direct vs indirect eval (scope)
- Strict mode behavior
- Security considerations
- Performance and implementation notes
- Supplementary details
- Reference details (API signatures)
- Detailed digest (source excerpt and retrieval)
- Attribution and crawl size

Syntax
eval(string)

Parameters
- string: A JavaScript value. If the argument is a String, eval parses the string as JavaScript code and executes it. If the argument is not a String, eval returns the argument unchanged.

Return value
- If the evaluated code is an expression, eval returns the value of that expression. If the evaluated code contains statements that do not produce a value, the return value is the result of the last evaluated expression or undefined when no expression yields a value.

Exceptions / Errors
- SyntaxError: thrown when the string contains invalid syntax.
- ReferenceError / TypeError / RangeError: can be thrown by the evaluated code itself depending on runtime semantics.

Direct vs indirect eval (scope)
- Direct call: A direct call is a syntactic call of the identifier eval in the current lexical scope (i.e. eval(...)). Direct eval executes code in the current lexical environment and can create or modify local variables in non-strict mode.
- Indirect call: When eval is invoked indirectly (for example via an alias), execution occurs in the global scope and does not affect the local lexical environment.

Strict mode behavior
- In strict mode, eval executes in its own lexical environment; variables and function declarations created by eval do not create or modify bindings in the surrounding scope. Some behaviors differ between strict and non-strict code (for example, creation of variables on the caller's scope is restricted in strict mode).

Security considerations
- Evaluating untrusted input with eval is dangerous: it allows arbitrary code execution, including I/O, process manipulation, and data exfiltration in server-side environments.
- Prefer safer alternatives for user-provided expressions: parse and validate tokens against an allowlist (numbers, arithmetic operators, Math.<identifier>, parentheses) or run evaluation inside a restricted sandbox (Node's vm.runInNewContext with a tightly controlled context object and no access to prototype chains), or compile expressions to a safe function using a controlled Function constructor that only exposes explicit globals.
- For mathematical expressions that must use Math functions, construct an evaluator that binds only Math and numeric identifiers, e.g., create a function with the Math object injected and no other access.

Performance and implementation notes
- eval compiles and executes code at runtime; repeated calls with the same code may be slower than precompiled functions or using the Function constructor or a dedicated parser/evaluator.
- For expression-heavy numeric evaluation across many points, pre-compile the expression once (via new Function or vm.Script) and reuse it for all evaluations rather than calling eval per point.

Supplementary details
- Non-string arguments: eval simply returns non-string arguments unchanged; code paths should coerce or validate input before invoking eval.
- Execution context: be explicit whether a call should be direct or indirect; avoid accidental indirect calls when lexical scope access is required.
- When using Function constructor for numeric expressions that reference Math, inject Math explicitly or reference Math with fully qualified names (Math.sin, Math.PI) to avoid scope leaks.

Reference details (API signatures)
- eval(code) -> any
  - code: any value. If type(code) !== 'string', returns code unchanged.
  - Throws: SyntaxError for invalid code; any runtime exception thrown by executed code may propagate.
- Direct eval semantics: eval(string) executed as a direct call performs evaluation in the current lexical environment in non-strict mode; in strict mode, eval has a separate lexical environment and cannot create bindings in the caller's scope.
- Indirect eval semantics: calling eval through an alias or via Function.prototype.call/apply results in global-scope evaluation.

Detailed digest (extracted content and retrieval)
- Source: MDN Web Docs — eval() (developer.mozilla.org)
- Retrieval date: 2026-03-20T14:24:32.199Z
- Crawl size: 227354 bytes (HTML retrieved)
- Condensed extracted technical points from the MDN page:
  - eval takes a single argument. If the argument is a string, that string is parsed and executed as JavaScript code; otherwise the argument is returned unchanged.
  - Direct eval executes in the calling lexical scope (non-strict); indirect eval executes in the global scope.
  - Strict mode changes eval semantics so that declarations inside eval do not leak into the calling scope.
  - The API throws standard JS runtime errors if the code contains syntax or runtime faults.
  - MDN explicitly warns about security risks for executing arbitrary code and recommends safer alternatives.

Attribution and crawl details
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
- Retrieved: 2026-03-20T14:24:32.199Z
- Bytes downloaded during crawl: 227354 bytes

Notes for this project
- For the mission's expression parsing requirement, prefer using the Function constructor to compile mathematical expressions into reusable callables, or use vm.runInNewContext with a minimal context containing only Math and numeric values when evaluating untrusted input server-side.
- Do not call eval on raw user input. If using Function, sanitize or validate the expression tokens to the permitted grammar (numbers, x, Math.<identifier>, arithmetic operators, parentheses).
