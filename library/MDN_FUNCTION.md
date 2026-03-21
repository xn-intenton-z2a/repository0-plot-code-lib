MDN_FUNCTION

Table of contents
1. Overview
2. Constructor signature
3. Behavior and scope
4. Security and validation
5. Implementation pattern (expression -> function)
6. Reference API signature
7. Troubleshooting
8. Detailed digest (retrieved)
9. Attribution and crawl size

1. Overview
The Function constructor creates a new Function object from argument-name strings and a function-body string. The created function is a callable object that executes the provided body as code in the global scope at call-time.

2. Constructor signature
Exact signature: new Function([arg1[, arg2[, ...argN]]], functionBody)
Parameters:
- arg1..argN: string names of parameters (e.g. "x")
- functionBody: string representing the function body (no surrounding function wrapper)
Return: a Function object (callable).

3. Behavior and scope
- The body string is parsed when the Function is created; a SyntaxError is thrown if invalid.
- The created function does not close over the lexical scope where it was created; it executes in the global scope and can only access global identifiers and its own parameters.
- At call time the usual call-site binding rules apply for this and arguments.
- Runtime errors thrown inside the function propagate to the caller.

4. Security and validation
- Creating functions from untrusted strings executes arbitrary code. Do not use on untrusted input without strict validation.
- Recommended input whitelist approach: permit only numbers, the variable x, parentheses, arithmetic operators (+ - * / %), decimal point, comma/space for separators, and explicit Math namespace usages (Math.PI, Math.sin, etc.).
- Deny tokens: require, process, global, constructor, Function, eval, import, window, document, globalThis, module.
- Validation pattern (apply token-level checks and reject on keyword appearances or characters outside the allowed character set). Always fail closed.

5. Implementation pattern (expression -> function)
Goal: convert an expression string such as "y=Math.sin(x)" or "Math.sin(x)" into a callable function f(x) that returns a numeric y.
Steps (exact, implementation-ready):
1. Trim the input string.
2. If input begins with the prefix "y=", extract RHS as the expression portion after the first '='. Otherwise treat the whole input as the expression.
3. Validate the extracted expression against a strict whitelist of tokens (numbers, x, Math\.NAME, operators, parentheses, commas, whitespace). Reject if validation fails.
4. Construct the function body string by prepending "return (" and appending ")" around the validated expression.
5. Create the function via new Function('x', functionBody) which returns a callable f(x).
6. Wrap calls with try/catch to convert SyntaxError and runtime errors into parse/evaluation errors with clear messages.

6. Reference API signature
createExpressionFunction(expression: string): (x: number) => number
- Input: expression string (examples: "y=Math.sin(x)", "Math.sin(x)", "x*x+2*x-1").
- Output: a function that accepts a numeric x and returns a numeric y.
- Failure modes: throws on invalid syntax, returns NaN or throws on invalid runtime evaluation.

7. Troubleshooting
- SyntaxError on creation: occurs when expression has invalid JavaScript syntax; surface the offending substring in the error message.
- Runtime ReferenceError: expression references an identifier not allowed (e.g., process); ensure validation step prevents this.
- Non-numeric results: if returned value is not a number or is NaN, treat as evaluation error.

8. Detailed digest (retrieved)
Source: MDN Web Docs "Function - JavaScript | MDN"
Retrieved: 2026-03-21
Crawl bytes downloaded: 157123
Key extracted facts used above: exact constructor signature, scoping behaviour (global scope, no lexical closure), SyntaxError at parse time, runtime errors propagate, and explicit security warnings recommending avoiding execution of untrusted strings.

9. Attribution
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
Crawl size (bytes): 157123
License / attribution: MDN content (see source site).