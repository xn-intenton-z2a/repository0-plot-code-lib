EXPRESSION_PARSER

TABLE OF CONTENTS:
1. Normalised extract: Function constructor and expression handling
2. Implementation pattern: parseExpression signature and steps
3. Validation and sanitisation rules
4. Supplementary details: Math constants and methods availability
5. Reference details: Function constructor signature and behavior
6. Digest and attribution

NORMALISED EXTRACT:
- Use the JavaScript Function constructor to compile a runtime expression into a callable function: Function([arg1,...argN], functionBody) returns a new Function object that executes in global scope.
- Expressions accepted: forms like y=Math.sin(x) or y=x*x+2*x-1. Implementation should accept an optional leading "y=" and evaluate the right-hand side as a JavaScript expression with access to Math.* methods and globalThis.
- Implementation must create a function f(x:number):number that, when called, returns the numeric y value for the numeric input x. Example pattern: build function body that binds Math from globalThis then returns the expression value.

IMPLEMENTATION PATTERN (actionable):
- Exported signature: parseExpression(expressionString: string): (x: number) => number
- Steps:
  1. Trim input; if it starts with 'y=' (case-sensitive) remove the prefix and use remainder as exprBody.
  2. Validate exprBody contains only allowed characters or tokens: digits, whitespace, x, parentheses, + - * / % . , Math identifier, letters for Math functions, and exponentiation (use ** or Math.pow). Reject input containing characters like backticks, semicolons, or other punctuation that could create statements (i.e., only allow expression tokens).
  3. Construct function with new Function('x', 'const Math = globalThis.Math; return (' + exprBody + ');') and return it.
  4. Wrap construction in try/catch; if construction fails throw a descriptive parse error.
- Notes: Using new Function executes with global scope; it does not capture surrounding local closures. Ensure Math methods are available (binding Math as shown), and avoid using `eval`.

VALIDATION AND SANITISATION:
- Allowed token set: digits 0-9, letters A-Z a-z (for Math function names), underscore, decimal point, parentheses ( ), arithmetic operators + - * / % **, comma, spaces, and x variable identifier. Disallow characters: `;`, `{`, `}`, `->`, `<`, `>`, '|', '&', '$', '@', backticks, and string delimiters to avoid statement injection.
- If stricter security is needed, implement a tokenizer or use a RegExp that verifies the expression matches the mathematical-expression grammar and rejects unexpected tokens.

SUPPLEMENTARY DETAILS:
- Math.* available functions commonly used: sin, cos, tan, asin, acos, atan, exp, log, sqrt, pow, abs, min, max, floor, ceil, PI, E. Use full names (Math.sin) in expressions unless function body binds Math as shown.
- Performance: compiling using Function is fast; reuse the compiled function for repeated evaluations across a range rather than recompiling inside a loop.
- Edge cases: NaN and Infinity results should be handled by downstream consumers; consider filtering out non-finite y values when generating plots.

REFERENCE DETAILS (exact specs):
- Function constructor (MDN): new Function([arg1[, arg2[, ...argN]],] functionBody)
  - Parameters: arg1..argN are strings naming function parameters; functionBody is a string with the function body source code.
  - Returns: a new Function object whose length equals number of declared parameters.
- parseExpression signature: parseExpression(expression: string) -> (x: number) => number
  - Throws: SyntaxError when expression cannot compile, TypeError on invalid input.

DIGEST AND ATTRIBUTION:
- Sources used: MDN Function (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) retrieved 2026-03-24, bytes downloaded: 157125
- MDN Math (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) retrieved 2026-03-24, bytes downloaded: 161142
- Retrieval date: 2026-03-24

USAGE REMARKS:
- Export parseExpression and reuse returned function in series generation to avoid repeated compilation overhead.
- Keep sanitisation rules conservative; prefer to reject uncertain tokens rather than attempt to allow them.
