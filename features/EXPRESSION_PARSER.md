# EXPRESSION_PARSER

Status: Implemented

Overview

Convert a mathematical expression string into a callable JavaScript function of x. Expressions are simple assignment-style strings such as y=Math.sin(x) or expressions that use the identifier x.

Behavior

- Expose parseExpression(expressionString) that returns a function f(x) -> numeric y.
- The parser validates the input and throws descriptive errors on malformed expressions.
- Implementation uses only built-in JavaScript Math capabilities; no external math libraries are permitted.

Acceptance criteria (testable)

- Parsing the string y=Math.sin(x) returns a callable function.
- Calling the returned function with numeric inputs returns results consistent with Math.sin for representative values.
- Malformed input causes a thrown Error with a helpful message.

Testing notes

- Unit tests must assert that parseExpression returns a function, evaluates sin/cos/polynomials, and rejects invalid input.

Implementation notes

- Implementation location: src/lib/main.js. The code is intentionally minimal and auditable; if extending parser features, preserve auditability and whitelist allowed identifiers.
