FUNCTION_CONSTRUCTOR

Table of contents
1. Signature
2. Creating evaluatable functions from expressions
3. Implementation pattern for mission
4. Security considerations
5. Supplementary details
6. Reference details (exact API)
7. Detailed digest
8. Attribution

Normalised extract
Signature
- Function([arg1[, arg2[, ...argN]],] functionBody) -> returns a new Function object.
- Parameters: arg1..argN are strings naming formal parameters; functionBody is a string containing the function source.

Creating evaluatable functions from expressions
- Expected input: expression strings in the form "y=EXPR" where EXPR is a JavaScript expression using Math.* and variable x (e.g. "y=Math.sin(x)").
- Extraction: find the first '=' and take the right-hand side (RHS) as EXPR. Trim whitespace and validate presence of x if appropriate.
- Construction: create a callable f by instantiating a Function that takes parameter 'x' and returns the RHS value. The resulting callable signature for the mission is: f(Number x) -> Number y.

Implementation pattern for mission (step-by-step)
1. Parse input string S. Locate first '='. If none, treat S as expression and use entire string as RHS.
2. RHS := substring after '=' trimmed.
3. Validate RHS contains only permitted characters (digits, operators, Math, x, parentheses) if input may be untrusted; otherwise proceed.
4. Create evaluator: new Function('x', 'return (' + RHS + ');') which yields a callable function accepting numeric x and returning numeric y.
5. When evaluating many x values, call f(x) repeatedly; ensure numeric conversion of x (Number(x)).

Security considerations
- The Function constructor evaluates source code in the global scope and can execute arbitrary code. Do not use it with untrusted input.
- For untrusted expressions, either sandbox or use a safe expression parser library (not allowed per mission for core parse, but recommended for real-world safety).
- Sanitize the RHS by rejecting characters/patterns not explicitly allowed (e.g., access to global objects other than Math) before constructing the Function.

Supplementary details
- If the incoming expression omits Math. prefix (e.g., "sin(x)"), preprocess by mapping known math identifiers to Math.* equivalents.
- Missing return values or runtime exceptions propagate as undefined or thrown errors from the generated function; wrap calls in try/catch when evaluating ranges.
- Use Number.isFinite on results to filter NaN/Infinity.

Reference details (exact API and behaviour)
- Constructor: Function([arg1[, arg2[, ...argN]],] functionBody)
  - arg1..argN: strings naming parameters
  - functionBody: string containing JavaScript source for function body
  - Return: Function object
  - Throws: SyntaxError if functionBody is not valid JS source
- Mission-level helper signature (recommended): parseExpressionToFunction(expressionString) -> Function where returned function behaves as f(x: Number) -> Number.

Detailed digest
- Source: MDN "Function" reference
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
- Retrieved: 2026-03-27
- Data size obtained during crawl: approximately 158 KB

Attribution
- Source: MDN Web Docs (Mozilla). Use the Function constructor as documented; follow MDN guidance on syntax and security.