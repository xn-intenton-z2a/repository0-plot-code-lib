NORMALISED EXTRACT

Table of Contents
1. Syntax and signature
2. Parameters and types
3. Execution and scope
4. Security considerations
5. Implementation notes for expression parsing

1. Syntax and signature
- Constructor signature: new Function([p1[, p2[, ...]],] functionBody) -> Function object.
- The constructor accepts zero or more parameter-name strings followed by a function-body string. The returned value is a callable Function object.

2. Parameters and types
- p1, p2, ... : identifier names provided as plain strings representing formal parameters.
- functionBody : a plain string containing statements and an optional return expression. When invoked, the function-body is executed as code.
- Return: a callable function value which may be invoked with numeric arguments and returns the evaluated result.

3. Execution and scope
- Functions created with the Function constructor are parsed in the global scope; they do not close over the creating lexical environment. They have access to global objects (for Node: global, for browsers: window) and builtin globals such as Math.
- Example usage pattern for this project: construct a single-argument function f(x) that evaluates a mathematical expression using Math functions.

4. Security considerations
- Function constructor executes strings as code (equivalent to eval semantics) and poses the same injection risks. Only use with trusted input or sanitize/validate the expression before constructing a Function.
- Recommended: accept expressions restricted to assignments or expressions using x and Math.* only, validate characters and tokens against an allowlist (digits, operators, parentheses, letters in Math identifiers, whitespace).

5. Implementation notes for expression parsing
- Accept input forms such as: y=Math.sin(x) or y = x*x + 2*x - 1. Implementation steps:
  a. Trim leading/trailing whitespace. If the expression contains an assignment of the form identifier = expr, extract the right-hand expression expr.
  b. Validate that expr contains only allowed characters and tokens: digits, decimal point, arithmetic operators + - * / ^ (use Math.pow for ^), parentheses, the identifier x, and identifier names starting with Math and a dot (Math.*).
  c. Build the function via: new Function('x', 'return ' + expr) which yields a callable f where f(Number) -> Number.
  d. Handle parse/runtime errors by wrapping invocation in try/catch and returning NaN or propagating a controlled error.

SUPPLEMENTARY DETAILS
- Token allowlist: 0-9, ., +, -, *, /, %, (, ), x, whitespace, letters A-Za-z for Math identifiers, dot, and comma for function argument separators. Disallow alphabetic sequences other than Math and approved function names.
- For exponentiation written as ^ in user expression, translate ^ to Math.pow prior to Function construction (e.g. transform a^b -> Math.pow(a,b)).
- Numeric conversion: ensure input values for x are coerced to Number before calling the generated function.

REFERENCE DETAILS (exact signatures and behaviors)
- Constructor: new Function([param1, param2, ... ,] body) -> Function
  - paramN: string (name of parameter)
  - body: string (function body statements or expression)
  - Returns: function whose call signature corresponds to the provided parameter names; invocation uses JavaScript runtime evaluation semantics.
- Example method of use for this project: to produce a single-argument evaluator, construct with parameter name x and body 'return ' + expr.
- Errors: constructing a Function with invalid syntax throws a SyntaxError at construction time; runtime errors throw appropriate Error types when function is invoked.

DETAILED DIGEST
- Source: MDN Function constructor page
- Retrieved: 2026-03-20
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
- Bytes fetched: 157123

ATTRIBUTION
- Content extracted and condensed from the MDN documentation for Function (see URL above). The above presents formal signature, parameter types, scope behavior, security guidance, and a step-by-step pattern to parse simple mathematical expressions into an evaluator function.