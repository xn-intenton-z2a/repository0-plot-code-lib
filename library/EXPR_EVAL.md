# EXPR_EVAL

## Crawl Summary
Parser constructor accepts an optional options object controlling operators (add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment). Static methods parse(expression: string) and evaluate(expression: string, variables?: object) return Expression or computed value. Expression methods: evaluate, substitute, simplify, variables, symbols, toString, toJSFunction. Expression syntax: precedence from grouping down to separators. Built-in unary operators and functions with precise method names. Custom functions via parser.functions and constants via parser.consts.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Parser API
 3 Expression API
 4 Syntax and Precedence
 5 Operators and Functions
 6 Constants

1 Installation
 npm install expr-eval

2 Parser API
 new Parser(options?)
 options.operators: { add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment }
 Parser.parse(expression: string) => Expression
 Parser.evaluate(expression: string, variables?: object) => any
 parser.parse(...) and parser.evaluate(...)

3 Expression API
 expr.evaluate(variables?) => any
 expr.substitute(variable: string, expression: Expression|string|number) => Expression
 expr.simplify(variables: object) => Expression
 expr.variables(options?: { withMembers: boolean }) => string[]
 expr.symbols(options?: { withMembers: boolean }) => string[]
 expr.toString() => string
 expr.toJSFunction(parameters: string[]|string, variables?: object) => Function

4 Syntax and Precedence
 Level 1: (...)
 Level 2: f(), x.y, a[i]
 Level 3: x!
 Level 4: ^
 Level 5: unary +, -, not, sqrt, etc.
 Level 6: *, /, %
 Level 7: +, -, ||
 Level 8: ==, !=, >=, <=, >, <, in
 Level 9: and
 Level 10: or
 Level 11: x ? y : z
 Level 12: =
 Level 13: ;

5 Operators and Functions
 Unary: -x, +x, x!, abs, acos, asin, atan, ceil, cos, exp, floor, ln, log10, not, round, sign, sin, sqrt, tan, trunc
 Pre-defined Functions: random(n), min(a,b,...), max(a,b,...), hypot(a,b,...), pow(x,y), atan2(y,x), roundTo(x,n), map(f,a), fold(f,y,a), filter(f,a), indexOf(x,a), join(sep,a), if(c,a,b)

6 Constants
 parser.consts: { E: number, PI: number, true: boolean, false: boolean }

## Supplementary Details
Default operator flags (all true): add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment.
Disable comparison and logical operators:
 const parser = new Parser({ operators: { logical: false, comparison: false } });
Add custom JS function:
 const parser = new Parser();
 parser.functions.customAddFunction = (a, b) => a + b;
 parser.evaluate('customAddFunction(2,4)'); // 6
Modify constants:
 parser.consts.R = 1.234;
 parser.parse('A+B/R').toString(); // '((A + B) / 1.234)'

## Reference Details
API Signatures:
 1. Parser(options?: ParserOptions)
    interface ParserOptions { operators?: { add?: boolean; subtract?: boolean; multiply?: boolean; divide?: boolean; power?: boolean; remainder?: boolean; factorial?: boolean; concatenate?: boolean; conditional?: boolean; logical?: boolean; comparison?: boolean; in?: boolean; assignment?: boolean } }
 2. Parser.parse(expression: string): Expression
 3. Parser.evaluate(expression: string, variables?: object): any
 4. Expression.evaluate(variables?: object): any
 5. Expression.substitute(variable: string, expression: Expression|string|number): Expression
 6. Expression.simplify(variables: object): Expression
 7. Expression.variables(options?: { withMembers: boolean }): string[]
 8. Expression.symbols(options?: { withMembers: boolean }): string[]
 9. Expression.toString(): string
 10. Expression.toJSFunction(parameters: string[]|string, variables?: object): Function

Code Examples:
 // Basic parse and evaluate
 const Parser = require('expr-eval').Parser;
 const parser = new Parser();
 const expr = parser.parse('2 * x + 1');
 const result = expr.evaluate({ x: 3 }); // 7

 // Static evaluate
 const result2 = Parser.evaluate('6 * x', { x: 7 }); // 42

 // Compile to JS function
 const f = expr.toJSFunction('x');
 f(4); // 9

Configuration Patterns:
 // Disable logical and comparison
 new Parser({ operators: { logical: false, comparison: false } });

Best Practices:
 - Pre-simplify static portions: expr.simplify({ y: 4 }) before evaluate
 - Use toJSFunction for repeated evaluations to improve performance
 - Manage scope: reuse parser instance with custom functions and constants

Troubleshooting:
 $ npm test
 Expected: all tests pass under 'test' directory
 $ Parser.parse('2 ^').evaluate({});
 Throws: SyntaxError at position 3: unexpected '^'
 $ expr.evaluate({});
 Throws: Error: Variable x not provided


## Information Dense Extract
Parser(options?){operators:{add,subtract,multiply,divide,power,remainder,factorial,concatenate,conditional,logical,comparison,in,assignment}all boolean defaults true}.Static: parse(string)->Expression; evaluate(string,object?)->any. Expr methods: evaluate(object?)->any; substitute(string,Expression|string|number)->Expression; simplify(object)->Expression; variables({withMembers?})->string[]; symbols({withMembers?})->string[]; toString()->string; toJSFunction(string[]|string,object?)->Function. Syntax precedence: grouping>call/access>factorial>^>unary>*/%>+/-/||>==/!=/>=/<=/>/</in>and>or>?::=>;. Unary ops: -,+,!,abs,acos,asin,atan,ceil,cos,exp,floor,ln,log10,not,round,sign,sin,sqrt,tan,trunc. Predefs: random(n),min(...),max(...),hypot(...),pow(x,y),atan2(y,x),roundTo(x,n),map(f,a),fold(f,y,a),filter(f,a),indexOf(x,a),join(sep,a),if(c,a,b). Constants: E,PI,true,false in parser.consts. npm install expr-eval; npm test.

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Parser API
 3 Expression API
 4 Syntax and Precedence
 5 Operators and Functions
 6 Constants

1 Installation
 npm install expr-eval

2 Parser API
 new Parser(options?)
 options.operators: { add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment }
 Parser.parse(expression: string) => Expression
 Parser.evaluate(expression: string, variables?: object) => any
 parser.parse(...) and parser.evaluate(...)

3 Expression API
 expr.evaluate(variables?) => any
 expr.substitute(variable: string, expression: Expression|string|number) => Expression
 expr.simplify(variables: object) => Expression
 expr.variables(options?: { withMembers: boolean }) => string[]
 expr.symbols(options?: { withMembers: boolean }) => string[]
 expr.toString() => string
 expr.toJSFunction(parameters: string[]|string, variables?: object) => Function

4 Syntax and Precedence
 Level 1: (...)
 Level 2: f(), x.y, a[i]
 Level 3: x!
 Level 4: ^
 Level 5: unary +, -, not, sqrt, etc.
 Level 6: *, /, %
 Level 7: +, -, ||
 Level 8: ==, !=, >=, <=, >, <, in
 Level 9: and
 Level 10: or
 Level 11: x ? y : z
 Level 12: =
 Level 13: ;

5 Operators and Functions
 Unary: -x, +x, x!, abs, acos, asin, atan, ceil, cos, exp, floor, ln, log10, not, round, sign, sin, sqrt, tan, trunc
 Pre-defined Functions: random(n), min(a,b,...), max(a,b,...), hypot(a,b,...), pow(x,y), atan2(y,x), roundTo(x,n), map(f,a), fold(f,y,a), filter(f,a), indexOf(x,a), join(sep,a), if(c,a,b)

6 Constants
 parser.consts: { E: number, PI: number, true: boolean, false: boolean }

## Original Source
expr-eval Parser Library
https://github.com/silentmatt/expr-eval#readme

## Digest of EXPR_EVAL

# Installation

```bash
npm install expr-eval
```

# Parser

## Constructor
`new Parser(options?: ParserOptions)`

Options:
- operators.add: boolean = true
- operators.concatenate: boolean = true
- operators.conditional: boolean = true
- operators.divide: boolean = true
- operators.factorial: boolean = true
- operators.multiply: boolean = true
- operators.power: boolean = true
- operators.remainder: boolean = true
- operators.subtract: boolean = true
- operators.logical: boolean = true
- operators.comparison: boolean = true
- operators.in: boolean = true
- operators.assignment: boolean = true

## Static Methods
- `Parser.parse(expression: string): Expression`
- `Parser.evaluate(expression: string, variables?: object): number | string | boolean | Array<any>`

## Instance Methods
- `parser.parse(expression: string): Expression`
- `parser.evaluate(expression: string, variables?: object): number | string | boolean | Array<any>`

# Expression

## Methods and Signatures
- `expr.evaluate(variables?: object): any`
- `expr.substitute(variable: string, expression: Expression | string | number): Expression`
- `expr.simplify(variables: object): Expression`
- `expr.variables(options?: { withMembers: boolean }): string[]`
- `expr.symbols(options?: { withMembers: boolean }): string[]`
- `expr.toString(): string`
- `expr.toJSFunction(parameters: string[] | string, variables?: object): Function`

# Expression Syntax

## Operator Precedence (high to low)
1. Grouping: `(...)`
2. Function call, property access, array indexing: `f()`, `x.y`, `a[i]`
3. Factorial: `x!`
4. Exponentiation: `^` (right associative)
5. Unary prefix: `+x`, `-x`, `not x`, `sqrt x`, etc.
6. Multiplication, division, remainder: `*`, `/`, `%`
7. Addition, subtraction, concatenation: `+`, `-`, `||`
8. Comparison and membership: `==`, `!=`, `>=`, `<=`, `>`, `<`, `in`
9. Logical AND: `and`
10. Logical OR: `or`
11. Conditional: `x ? y : z`
12. Assignment: `=`
13. Expression separator: `;`

# Functions and Operators

## Unary Operators
- `-x`, `+x`, `x!`, `abs x`, `acos x`, `asin x`, `atan x`, `ceil x`, `cos x`, `exp x`, `floor x`, `ln x`, `log10 x`, `not x`, `round x`, `sign x`, `sin x`, `sqrt x`, `tan x`, `trunc x`, others.

## Pre-defined Functions
- `random(n?: number): number`
- `min(...args: number[]): number`
- `max(...args: number[]): number`
- `hypot(...args: number[]): number`
- `pow(x: number, y: number): number`
- `atan2(y: number, x: number): number`
- `roundTo(x: number, n: number): number`
- `map(f: Function, a: any[]): any[]`
- `fold(f: Function, y: any, a: any[]): any`
- `filter(f: Function, a: any[]): any[]`
- `indexOf(x: any, a: any[]): number`
- `join(sep: string, a: any[]): string`
- `if(c: any, a: any, b: any): any`

## Constants
- `parser.consts.E: number`
- `parser.consts.PI: number`
- `parser.consts.true: boolean`
- `parser.consts.false: boolean`

# Troubleshooting

```bash
npm test
```

# Data
- Source: https://github.com/silentmatt/expr-eval#readme
- Retrieved: 2024-06-15
- Data Size: 605003 bytes
- Attribution: silentmatt


## Attribution
- Source: expr-eval Parser Library
- URL: https://github.com/silentmatt/expr-eval#readme
- License: License: MIT
- Crawl Date: 2025-05-07T00:40:09.772Z
- Data Size: 605003 bytes
- Links Found: 4700

## Retrieved
2025-05-07
