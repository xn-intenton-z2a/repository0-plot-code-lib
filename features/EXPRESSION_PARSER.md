# EXPRESSION_PARSER

Purpose
Parse a mathematical expression string into a callable JavaScript function that computes y for a given numeric x. Expressions follow the pattern y=... and must use only built-in Math functions and the variable x.

Scope
- Parse strings such as y=Math.sin(x) or y=x*x+2*x-1
- Return a function f(x) that returns numeric y
- Validate output is numeric and throw on malformed input

Implementation Notes
- Accept only expressions that start with y= and extract the right-hand expression
- Compile using the Function constructor, passing x and Math as parameters so Math is the only global provided
- Perform defensive checks: verify the returned value is a finite number and reject empty or obviously invalid RHS
- Reference library documents FUNCTION_CONSTRUCTOR.md and MATH_OBJECT.md for guidance

Acceptance Criteria
- Parsing y=Math.sin(x) returns a callable function
- Calling the returned function with x=0 returns 0
- Malformed expressions produce a thrown error

Tests
- Unit tests assert that parseExpression returns a function, that function(0) equals 0 for the sine expression, and that invalid inputs throw an error
