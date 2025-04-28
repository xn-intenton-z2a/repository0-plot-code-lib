# MATHJS

## Crawl Summary
Math.js offers installation via npm and CDN, precise configuration via math.config with options relTol, absTol, matrix, number, precision, predictable, and randomSeed. It supports chaining with math.chain, function extension with math.import, JSON serialization via math.replacer and math.reviver, and flexible expression evaluation methods (math.evaluate, math.compile, math.parse, and math.parser) with persistent scopes. Detailed operator precedence, expression syntax, and advanced features for symbolic computation are provided.

## Normalised Extract
Table of Contents:
1. Configuration
  - Use math.config with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number', 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null).
  - Example: create instance with create(all, config) and update configuration with math.config({matrix: 'Matrix'}).
2. Chaining
  - Initiate chain: math.chain(value).
  - Chain methods: add, subtract, multiply, subset, done. Example: math.chain(3).add(4).multiply(2).done() returns 14.
3. Extension & Import
  - Use math.import(object, options) with options override (false), silent (false), wrap (false).
  - Example: math.import({myValue:42, hello: function(name){return 'hello, ' + name + '!';}}).
4. Serialization
  - Data types have toJSON methods.
  - Use JSON.stringify(x, math.replacer) and JSON.parse(json, math.reviver) for serialization and deserialization.
5. Expression Parsing & Evaluation
  - Functions: math.evaluate(expr, [scope]), math.compile(expr) returning object with evaluate([scope]), math.parse(expr) returning node tree.
  - Parser instance: const parser = math.parser(); provides evaluate, get, set, clear, remove.
6. API Examples
  - math.evaluate('sqrt(3^2 + 4^2)') yields 5.
  - Chaining example code and import external libraries using {wrap: true, silent: true}.
7. Operator Syntax
  - Operators include +, -, *, /, ^, factorial (!), matrix operators, index operations, and conditional (?:).
  - Precedence is defined with grouping, function calls, transpose, factorial, exponentiation, unary operators, implicit multiplication, multiplication/division, addition/subtraction, range (:), unit conversion (to, in), shifts, relational operators, bitwise and, logical operators, and assignment.
Detailed Technical Information for Each Topic is directly embedded in the configuration examples, chaining operations, extension import examples, and expression API calls as provided above.

## Supplementary Details
Configuration Options Detailed:
  relTol: 1e-12; used for minimum relative difference in comparisons.
  absTol: 1e-15; used for minimum absolute difference.
  matrix: 'Matrix' (default) or 'Array' determines the type of returned matrix.
  number: 'number' (default) but can be set to 'BigNumber', 'bigint', or 'Fraction'.
  precision: 64; applies for BigNumbers only.
  predictable: false; when true, output type is strictly based on input, affecting functions like sqrt(-4) which return NaN instead of complex numbers.
  randomSeed: null; seeding for deterministic pseudo-random number generation.

Implementation Patterns:
  - Creating instances: const math = create(all, config)
  - Changing configuration: math.config({ number: 'BigNumber' })
  - Chaining: math.chain(3).add(4).multiply(2).done()
  - Importing Extensions: math.import(library, {wrap: true, silent: true})
  - Expression evaluation: math.evaluate('1.2 * (2 + 4.5)')

Troubleshooting:
  - Serialization errors: Always include math.replacer in JSON.stringify to avoid edge cases like Infinity.
  - Evaluation errors: Check scope definitions; prefer Map implementations for custom scopes.

Exact Code Examples are provided in the normalised extract.

## Reference Details
Complete API Specifications:

1. math.config(config: Object): void
   - Sets configuration options. Example config: { relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix', number: 'number', precision: 64, predictable: false, randomSeed: null }.

2. math.create(all: Object, config?: Object): MathJsStatic
   - Returns a new math.js instance with given configuration.

3. Chain API:
   - math.chain(value: any): Chain
   - Chain Methods:
     done(): any - Finalize chain and return value.
     valueOf(): any - Same as done().
     toString(): string - Returns formatted string via math.format.
   Example:
     math.chain(3).add(4).multiply(2).done() // returns 14.

4. Import API:
   - math.import(functions: Object | Array, options?: { override?: boolean, silent?: boolean, wrap?: boolean }): void
   Example:
     math.import({ myvalue: 42, hello: function (name: string): string { return 'hello, ' + name + '!'; } })

5. Serialization API:
   - math.replacer(key: string, value: any): any; used with JSON.stringify.
   - math.reviver(key: string, value: any): any; used with JSON.parse.
   Example:
     const str = JSON.stringify(x, math.replacer);
     const xReconstructed = JSON.parse(str, math.reviver);

6. Expression Parsing & Evaluation:
   - math.evaluate(expr: string, scope?: Map|Object): any
   - math.compile(expr: string): { evaluate(scope?: Map|Object): any }
   - math.parse(expr: string): Node
   - Parser instance: math.parser() returns an object with methods:
       evaluate(expr: string): any
       get(name: string): any
       set(name: string, value: any): void
       getAll(): Object
       remove(name: string): void
       clear(): void
   Example:
     const parser = math.parser();
     parser.evaluate('x = 7/2');
     parser.evaluate('f(x, y) = x^y');

7. Operators & Syntax:
   - Operators: +, -, *, /, ^, !, ., ', %, and custom operators for matrices and ranges.
   - Precedence: Grouping ( ), function calls, transpose, factorial, exponentiation, unary operations, multiplication, addition, range, conversion, shifts, relational, logical, assignment.

8. Full SDK Method Examples:
   // Node.js usage with require:
   const { sqrt } = require('mathjs');
   console.log(sqrt(-4).toString()); // outputs 2i

   // ES Modules:
   import { create, all } from 'mathjs';
   const math = create(all, { number: 'BigNumber', precision: 32 });
   console.log(math.evaluate('1/3').toString());

9. Best Practices:
   - Always configure math.js instance for the required numeric type to avoid unexpected results.
   - Use parser instance for maintaining state when evaluating multiple expressions.
   - For custom extensions, provide proper options (override, silent, wrap) to avoid collisions with built-in functions.

10. Troubleshooting Procedures:
   - Command: npm install mathjs to ensure latest version installation.
   - If encountering serialization issues, test with JSON.stringify(x, math.replacer) and check output contains 'mathjs' field.
   - For expression evaluation errors, test with isolated expressions using math.evaluate and check scope variables.
   - Expected output for math.evaluate('sqrt(3^2 + 4^2)') is 5; mismatches indicate configuration issues.


## Information Dense Extract
npm install mathjs; config: { relTol:1e-12, absTol:1e-15, matrix:'Matrix'|'Array', number:'number'|'BigNumber'|'bigint'|'Fraction', precision:64, predictable:false, randomSeed:null }; chain: math.chain(value).add(x).multiply(y).done(); import: math.import({key: value}, {override:false, silent:false, wrap:false}); serialization: JSON.stringify(object, math.replacer), JSON.parse(json, math.reviver); evaluate: math.evaluate(expr, [scope]); compile: math.compile(expr) returns { evaluate(scope) }; parse: math.parse(expr); parser: math.parser() with methods evaluate, get, set, clear; operators: +, -, *, /, ^, !, implicit multiplication with precedence as grouped; sample usage in Node.js (require) and ES Modules (import { create, all } from 'mathjs'); detailed API includes all method signatures, configuration options, and troubleshooting commands (npm install, JSON.stringify with replacer, evaluate output verification).

## Sanitised Extract
Table of Contents:
1. Configuration
  - Use math.config with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number', 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null).
  - Example: create instance with create(all, config) and update configuration with math.config({matrix: 'Matrix'}).
2. Chaining
  - Initiate chain: math.chain(value).
  - Chain methods: add, subtract, multiply, subset, done. Example: math.chain(3).add(4).multiply(2).done() returns 14.
3. Extension & Import
  - Use math.import(object, options) with options override (false), silent (false), wrap (false).
  - Example: math.import({myValue:42, hello: function(name){return 'hello, ' + name + '!';}}).
4. Serialization
  - Data types have toJSON methods.
  - Use JSON.stringify(x, math.replacer) and JSON.parse(json, math.reviver) for serialization and deserialization.
5. Expression Parsing & Evaluation
  - Functions: math.evaluate(expr, [scope]), math.compile(expr) returning object with evaluate([scope]), math.parse(expr) returning node tree.
  - Parser instance: const parser = math.parser(); provides evaluate, get, set, clear, remove.
6. API Examples
  - math.evaluate('sqrt(3^2 + 4^2)') yields 5.
  - Chaining example code and import external libraries using {wrap: true, silent: true}.
7. Operator Syntax
  - Operators include +, -, *, /, ^, factorial (!), matrix operators, index operations, and conditional (?:).
  - Precedence is defined with grouping, function calls, transpose, factorial, exponentiation, unary operators, implicit multiplication, multiplication/division, addition/subtraction, range (:), unit conversion (to, in), shifts, relational operators, bitwise and, logical operators, and assignment.
Detailed Technical Information for Each Topic is directly embedded in the configuration examples, chaining operations, extension import examples, and expression API calls as provided above.

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATHJS

# Math.js Documentation Digest
Date Retrieved: 2023-10-05

# Overview
Math.js is an extensive math library for JavaScript/Node.js featuring a flexible expression parser, built-in functions and constants, and support for multiple data types including numbers, BigNumbers, complex numbers, fractions, units, and matrices.

# Installation
npm install mathjs

When installed with the -g flag, math.js provides a command line utility (mathjs). The library includes TypeScript definitions.

# Core Features
- Flexible expression parser supporting symbolic computation
- Built-in functions: round, atan2, log, sqrt, derivative, pow, evaluate
- Data types: Numbers, BigNumbers, bigints, Fractions, Complex Numbers, Matrices, Units
- Usable in browser, Node.js, or any ECMAScript 5 engine

# Configuration
math.config can be used to set options on a math.js instance. For example:

Configuration Options:
  relTol: 1e-12 (Default, minimum relative difference for equality tests)
  absTol: 1e-15 (Default, minimum absolute difference for equality tests)
  matrix: 'Matrix' (Default, output type for matrix operations; can be set to 'Array')
  number: 'number' (Default, types: 'number', 'BigNumber', 'bigint', 'Fraction')
  precision: 64 (Default for BigNumber significant digits)
  predictable: false (When true, output type depends only on input types)
  randomSeed: null (Seed for pseudo random number generation)

Example Configuration:
  import { create, all } from 'mathjs'
  const config = {
    relTol: 1e-12,
    absTol: 1e-15,
    matrix: 'Matrix',
    number: 'number',
    precision: 64,
    predictable: false,
    randomSeed: null
  }
  const math = create(all, config)

# Chaining
Use math.chain(value) to create a chain that passes the chain's value as the first argument to functions.

Example:
  math.chain(3)
    .add(4)        // adds 4 to 3
    .multiply(2)   // multiplies result by 2
    .done()        // returns 14

Chaining supports complex operations on numbers and matrices, for instance:
  math.chain([[1,2],[3,4]])
    .subset(math.index(0,0), 8)
    .multiply(3)
    .done()        // returns updated matrix

# Extension & Import
Extend math.js with new functions or constants via math.import.

Syntax:
  math.import(functions: Object, options?: { override?: boolean, silent?: boolean, wrap?: boolean })

Example:
  math.import({
    myValue: 42,
    hello: function(name) { return 'hello, ' + name + '!'; }
  })

Allows use both in JavaScript and inside expressions evaluated by math.evaluate.

# Serialization
Math.js data types (Matrix, Unit, Complex) provide toJSON methods. Use math.replacer and math.reviver to ensure correct serialization/deserialization.

Example:
  const x = math.complex('2 + 3i')
  const str = JSON.stringify(x, math.replacer)
  const xReconstructed = JSON.parse(str, math.reviver)

# Expression Parsing & Evaluation
Math.js supports three main methods:
  1. math.evaluate(expr, [scope]) - Evaluates an expression string or array of expressions using an optional scope.
  2. math.compile(expr) - Compiles an expression to a code object with an evaluate method.
  3. math.parse(expr) - Parses into an expression tree node which can be compiled.

Examples:
  let result = math.evaluate('sqrt(3^2 + 4^2)')  // returns 5
  const code = math.compile('x^2 + 2*x + 1')
  let value = code.evaluate({ x: 3 })

# API for Parser
math.parser() creates a persistent parser with its own scope. Methods include evaluate, get, set, getAll, remove, clear.

Example:
  const parser = math.parser()
  parser.evaluate('x = 7/2')
  parser.evaluate('f(x,y) = x^y')
  let f = parser.get('f')
  let output = f(2, 3)  // returns 8

# Operator and Expression Syntax
Math.js expressions support operations like addition, multiplication, exponentiation, matrix indexing (one-based), and implicit multiplication. Operators include +, -, *, /, ^, !, and many custom operators; see full specifications above.

# Troubleshooting
Ensure proper use of math.replacer and math.reviver during JSON serialization. When using custom scopes, prefer Map interfaces for handling assignments. For evaluation errors, check for blacklisted symbols as math.js prevents execution of arbitrary JavaScript code.

Attribution:
Data Size: 3296146 bytes, 5312 links found.

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: Apache License (v2)
- Crawl Date: 2025-04-28T11:07:35.171Z
- Data Size: 3296146 bytes
- Links Found: 5312

## Retrieved
2025-04-28
