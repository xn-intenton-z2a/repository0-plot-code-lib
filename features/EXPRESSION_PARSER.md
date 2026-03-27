# EXPRESSION_PARSER

Overview

Provide a small, auditable parser that converts a single-line mathematical expression into a callable JavaScript function that computes y from x. Expressions use the JavaScript Math namespace and numeric literals; no external math libraries are allowed.

Behavior

- Accept a single expression string of the form y=... where the right-hand-side is an expression in x that may reference Math.* functions.
- Return a function f(x) that returns a numeric y when invoked with a numeric x.
- Validate input and throw descriptive errors for invalid or unsafe expressions.

Acceptance Criteria

- Parsing the expression y=Math.sin(x) returns a callable function.
- The returned function is numeric for numeric x (e.g., x=0 produces 0 for the sine example).
- The parser rejects identifiers other than Math and x and rejects attempts to access global objects.
- The parser implementation uses only built-in JavaScript and is exported as a named public API from src/lib/main.js.