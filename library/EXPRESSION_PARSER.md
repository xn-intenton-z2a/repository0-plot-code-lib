EXPRESSION_PARSER

Table of contents:
1. Normalised extract
2. Topics covered
3. Implementation details (exact algorithm)
4. Reference API (signatures)
5. Supplementary details and best practices
6. Digest (source excerpts and retrieval metadata)
7. Attribution and data size

1. Normalised extract
- Input: expression string that assigns y, e.g. y=Math.sin(x) or y=x*x+2*x-1.
- Behaviour: extract the right-hand side (RHS) of the assignment and compile it to a JavaScript function of one numeric parameter x using the built-in Function constructor.
- Validation: require the expression to match the pattern /^\s*y\s*=\s*(.+)$/ and reject expressions containing unsafe identifiers (require, process, global, window, eval, Function, constructor).
- Output: a callable function f(x:number):number that returns the numeric evaluation of the RHS for the numeric input x.

2. Topics covered
- Parsing assignment form y=... with a single-regex extractor
- Securing the expression string (forbidden tokens and characters)
- Compiling to an evaluatable function using the Function constructor
- Return type and numeric coercion

3. Implementation details (exact algorithm)
- Step 1: Normalise input string: let s = String(expression);
- Step 2: Extract RHS: const m = s.match(/^\s*y\s*=\s*(.+)$/); if (!m) throw new Error('Expression must be assignment to y=...'); const rhs = m[1].trim();
- Step 3: Quick safety checks (example):
  const forbidden = /\b(require|process|global|window|eval|Function|constructor)\b/;
  if (forbidden.test(rhs)) throw new Error('Expression contains forbidden tokens');
- Step 4: Compile: const compiled = new Function('x', 'return (' + rhs + ');');
- Step 5: Wrap to ensure numeric return: return function(x){ return Number(compiled(Number(x))); };
- Edge cases: compiled may throw for invalid math operations (division by zero yields Infinity), NaN propagates; callers should handle or filter such values.

4. Reference API (signatures)
- parseExpression(expression: string): (x: number) => number
  - Parameters: expression - string of form 'y=EXPR' where EXPR is a JavaScript expression using Math.* functions and numeric operations.
  - Returns: function(x:number) => number
  - Throws: Error when input is malformed or contains forbidden tokens.

5. Supplementary details and best practices
- Require callers to use Math. prefix for standard functions (Math.sin, Math.cos, Math.exp). The approach above does not inject Math into the expression scope.
- If you want implicit Math names (sin instead of Math.sin) you can preprocess RHS and replace known identifiers or use a safe sandbox; avoid using "with" in strict mode.
- Security: new Function executes arbitrary code; always run forbidden-token checks and prefer a whitelist/strict character set for public-facing CLI.
- Numeric coercion: wrap compiled result with Number(...) to ensure return type is numeric.

6. Digest (extracted sources and retrieval)
- Source: MDN Function (https://developer.mozilla.org/.../Function) — 157123 bytes retrieved 2026-03-20
- Source: MDN Math (https://developer.mozilla.org/.../Math) — 161140 bytes retrieved 2026-03-20

7. Attribution
- MDN Web Docs — Function and Math pages (see sources above). Data sizes reflect raw HTML bytes retrieved on 2026-03-20.
