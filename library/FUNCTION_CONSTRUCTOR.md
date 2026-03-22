FUNCTION_CONSTRUCTOR

Table of Contents:
1. Constructor signature and return type
2. Recommended evaluation pattern for expressions
3. Sanitization and token allowlist
4. Security and hardening

1. Constructor signature
Function([arg1[, arg2[, ...argN]],] functionBody) -> Function object
Calling as a constructor: new Function(arg1, arg2, ..., functionBody)
Calling as function: Function(arg1, arg2, ..., functionBody)
Returned Function when called executes functionBody in the global scope with provided argument names.

2. Recommended evaluation pattern for expressions (exact pattern)
- Goal: parse an expression string (example input: "y=Math.sin(x)" or "x*x+2*x-1") and produce a callable f(x: number): number.
- Normalization steps (apply in order):
  a. trim input string
  b. if string contains '=' split on first '=' and take right-hand side (RHS) as expression; else use entire string as expression
  c. replace caret operator '^' with JS exponent operator '**' globally
  d. validate tokens against allowlist (see next section)
- Function construction pattern (concrete):
  let f = new Function('x', 'Math', 'return (' + RHS + ');');
  call as: const y = f(xValue, Math);
This pattern binds the global Math object explicitly as a parameter to avoid relying on global scope and to make allowed functions available inside the evaluator.

3. Sanitization and token allowlist (exact checks)
- Allowed characters and tokens: digits 0-9, decimal point '.', scientific notation 'e' or 'E' inside numbers, whitespace, variable name 'x' (case-sensitive), parentheses '()', arithmetic operators + - * / % **, comma ',', and identifier tokens that match exactly the following allowed Math functions/constants: abs, acos, asin, atan, atan2, ceil, cos, exp, floor, log, max, min, pow, round, sin, sqrt, tan, PI, E, LN2, LN10, LOG2E, LOG10E, SQRT2, SQRT1_2.
- Token validation algorithm (precise):
  1. Replace numeric literals with placeholder using regex to avoid false positive identifiers: match numbers with /(?:\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)/g and replace with '_N_'.
  2. Find all remaining identifier sequences with /[A-Za-z_][A-Za-z0-9_]*/g. For each identifier token t:
     - If t === 'x' or t === 'Math' accept.
     - Else if t is one of the allowlist entries above accept.
     - Otherwise reject the expression as unsafe.
- After token validation, construct the Function as shown above.

4. Security and hardening
- The Function constructor executes arbitrary JS; strict sanitization is required to prevent access to globals, prototypes or constructors.
- Do not allow tokens like 'process', 'global', 'require', 'constructor', 'prototype', 'this', 'eval', 'Function'.
- Prefer the explicit Function('x','Math', 'return (...)') idiom; pass Math rather than relying on with() (with is disallowed in strict mode).
- For extra safety, run the evaluator inside a worker or subprocess with resource limits if untrusted input must be supported.

Reference details (API signatures)
Function(arg1: string, ..., functionBody: string): Function
Returned function example: (x: number, Math: object) => number when built with two parameters as above.

Detailed digest
Content retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function on 2026-03-22.
This source documents the Function constructor syntax and semantics that enable building dynamic evaluators from expression strings; the implementation pattern above adapts the documented constructor to a safe, parameterised use for mathematical expression evaluation.

Attribution
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
Bytes retrieved: 157123
