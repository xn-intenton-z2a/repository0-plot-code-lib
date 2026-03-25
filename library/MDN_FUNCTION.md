NORMALISED_EXTRACT

Table of contents:
- Signature and parameters
- Semantics and execution scope
- Creation and runtime errors
- Implementation pattern for parsing mathematical expressions
- Security and validation notes

Signature and parameters
new Function([arg1[, arg2[, ...argN]],] functionBody) -> Function object
- arg1..argN: string identifiers that become the function's formal parameters.
- functionBody: string containing JavaScript statements forming the function body.

Semantics and execution scope
- The Function constructor parses the supplied functionBody string at creation time. If functionBody contains syntax errors a SyntaxError is thrown on construction.
- Functions created with the Function constructor execute in the global scope (they do not close over local lexical variables from the creating scope). The resulting object is a callable Function with usual prototype methods.
- The created Function shares the global object (globalThis / window) and has access to built-in globals such as Math, Date, Object, etc.

Creation and runtime errors
- Creation errors: SyntaxError if functionBody cannot be parsed.
- Runtime errors: calling the returned function may throw any runtime Error; callers should wrap evaluation in try/catch to avoid process termination.

Implementation pattern for parsing mathematical expressions (direct, actionable)
- Expected input format examples: "y=Math.sin(x)" or "y = x*x + 2*x - 1".
- Normalisation: strip a leading assignment of the form /^\s*y\s*=\s*/ to produce an expression body B.
- Construct a numeric evaluator function f that takes a single numeric argument x and returns the expression value:
  - f := new Function('x', 'return (' + B + ');')
  - Calling f(0) evaluates the expression at x=0; f is callable and returns a Number (or NaN/Infinity on invalid inputs).
- Validation and safety: before constructing, validate B contains only allowed characters/tokens (digits, digits separators, ., +, -, *, /, ^? [careful with ^], parentheses, identifiers restricted to 'x' and Math names) or a whitelist of allowed identifiers to reduce execution risk.
- Error handling: wrap evaluation in try/catch and propagate or log syntax/runtime errors with row/index information when evaluating over ranges.

Security and validation notes
- Using Function is equivalent in power to eval: never construct a Function from untrusted user input without strong sanitisation.
- Prefer a small parser/whitelist when input might be untrusted (tokenise and verify allowed identifiers and operators). For trusted CLI inputs the Function constructor provides a compact implementation path.

SUPPLEMENTARY_DETAILS

- Performance: Function creation incurs parsing cost at creation time but evaluation of the returned function is fast; create the function once and reuse it when sampling across a numeric range.
- Scope: Because the created function lacks enclosing lexical scope, any required helper aliases (e.g., short names sin, cos) must be injected by including local declarations in the function body (use with caution).
- Numeric types: JavaScript Number (IEEE-754 double) is returned; expect NaN/Infinity for invalid arithmetic.

REFERENCE_DETAILS

- Constructor signature: new Function([arg1[, arg2[, ...argN]],] functionBody)
  - Parameters: argN are strings; functionBody is a string.
  - Returns: Function object (callable). Calling the function executes functionBody with the declared parameters bound to provided arguments.
- Errors: Throws SyntaxError at construction for invalid source; runtime exceptions are raised when calling the returned function and must be handled by caller.
- Implementation pattern for parser module:
  1. Accept expression string S.
  2. If S matches /^\s*y\s*=\s*/ strip the assignment to obtain B.
  3. Validate B against a safe whitelist of characters and identifiers (digits, ., +, -, *, /, %, parentheses, Math identifiers such as Math.sin, Math.PI).
  4. Create evaluator f := new Function('x', 'return (' + B + ');')
  5. Export f as the parsed expression evaluator.

DETAILED_DIGEST

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
Date retrieved: 2026-03-25
Data captured: ~158.2 KB

Extracted technical points used above:
- Function constructor creates a new Function object whose body is the last parameter string.
- The Function's created code is parsed independently and executes in the global scope (no closure over the calling scope).
- Creation-time syntax errors are thrown as SyntaxError and runtime errors must be handled on evaluation.

ATTRIBUTION
MDN Web Docs — Function (Mozilla). Content retrieved and condensed for repository reference.