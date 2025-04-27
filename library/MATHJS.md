# MATHJS

## Crawl Summary
Math.js offers extensive API for mathematical computations supporting numbers, BigNumbers, complex numbers, units, matrices, and more. Key functions include math.evaluate(expr, scope), math.compile(expr) with evaluate(scope), and math.parse(expr) to generate expression trees. The library supports chain operations via math.chain(value) with done(), and configurable options via math.config({ relTol, absTol, matrix, number, numberFallback, precision, predictable, randomSeed }). Additional APIs include math.import for extension, factory functions for dependency injection, and typed functions via math.typed. Operators cover arithmetic, element-wise functions, relational, logical and assignment operators with specific precedence rules.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs
   - Global CLI and CDN options
2. Configuration
   - Available options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number', 'BigNumber', 'bigint', 'Fraction'), numberFallback ('number' or 'BigNumber'), precision (64), predictable (false), randomSeed (null)
3. Chaining
   - Use math.chain(value) to start a chain, methods: add, multiply, subtract, done()
   - Example: math.chain(3).add(4).multiply(2).done() returns 14
4. Expression Evaluation
   - Direct evaluation: math.evaluate('expression', scope)
   - Compiling: const code = math.compile('expression'); code.evaluate(scope)
   - Parsing: const node = math.parse('expression'); then node.compile().evaluate(scope)
5. Parser API
   - Methods: evaluate(expr), get(name), set(name, value), clear(), remove(name), getAll()
6. Extension and Import
   - Use math.import({ myFunc: function() {} }, { override: false, silent: false, wrap: false })
   - External libraries can be imported with {wrap: true, silent: true}
7. Factory Functions and Typed Functions
   - Factory signature: factory(name, dependencies, create, meta?) returns function
   - Typed functions: typed('funcName', { 'number, number': (a, b) => Math.max(a, b), ... })
8. Serialization
   - JSON.stringify(value, math.replacer) and JSON.parse(json, math.reviver) for math.js data types
9. Operator Specifications
   - Detailed operator precedence and supported operators (e.g., +, -, *, /, ^, mod, element-wise ., matrix transpose ('))

Each topic includes exact configuration options, method signatures, and examples ready to be integrated into applications.

## Supplementary Details
Configuration Options:
- relTol: number, default 1e-12, used for relative difference in equality comparisons
- absTol: number, default 1e-15, used for absolute difference comparisons
- matrix: string, default 'Matrix'; options: 'Matrix' or 'Array'
- number: string, default 'number'; options: 'number', 'BigNumber', 'bigint', 'Fraction'
- numberFallback: string, default 'number'; options: 'number' or 'BigNumber'
- precision: number, default 64, applies only to BigNumbers
- predictable: boolean, default false; if true, output type strictly follows input type
- randomSeed: any, default null; setting seeds the pseudo-random generator

Implementation Steps:
1. Create instance: import { create, all } from 'mathjs'; const math = create(all, configOptions)
2. Use chain: math.chain(value).add(4).multiply(2).done()
3. Evaluate expressions directly or via compile/parse
4. Extend library using math.import with options

Best Practice Code:
// Node.js usage and configuration
import { create, all } from 'mathjs';
const math = create(all, { matrix: 'Matrix', number: 'BigNumber', precision: 32 });
console.log(math.evaluate('1 / 3').toString());

Troubleshooting Procedures:
- If numbers do not behave as expected, check configuration 'number' and 'numberFallback'
- For serialization issues, always use math.replacer in JSON.stringify and math.reviver in JSON.parse
- Test chain operations by isolating each chained method and verifying output with .done()
- For import conflicts, set override to false or true as required; use silent option to bypass errors
- Use math.parser() to maintain variable state and clear scope with parser.clear() if stale definitions exist

## Reference Details
API Specifications:
1. math.evaluate(expr: string | string[], scope?: Object | Map): any
   - Evaluates mathematical expressions. Throws error for invalid expressions.
   - Example: math.evaluate('sqrt(3^2 + 4^2)') returns 5
2. math.compile(expr: string | string[]): { evaluate(scope?: Object | Map): any }
   - Compiles expression into executable code. Must be evaluated with an optional scope.
   - Example:
       const code = math.compile('x^2');
       code.evaluate({ x:4 }) returns 16
3. math.parse(expr: string | string[]): Node
   - Parses expression and returns a node tree. Node supports compile() and toString(), toTex()
   - Example:
       const node = math.parse('sqrt(16)');
       node.compile().evaluate() returns 4
4. math.chain(value: any): Chain
   - Returns a chain object that supports all math.js methods.
   - Chain Methods:
       - add(...args: any[]): Chain
       - subtract(...args: any[]): Chain
       - multiply(...args: any[]): Chain
       - done(): any (returns final computed value)
   - Example: math.chain(3).add(4).multiply(2).done() returns 14
5. math.config(config: Object): Object
   - Sets configuration options; returns new configuration object.
   - Accepts keys: relTol (number), absTol (number), matrix (string), number (string), numberFallback (string), precision (number), predictable (boolean), randomSeed (any)
   - Example:
       math.config({ number: 'BigNumber' });
6. math.import(functions: Object | Array, options?: { override?: boolean, silent?: boolean, wrap?: boolean }): void
   - Imports and extends math.js with new functions or constants.
   - Example:
       math.import({ myFunc: function(x) { return x * 2; } }, { override: false, silent: false, wrap: false });
7. Parser API (from math.parser()):
   - evaluate(expr: string): any
   - get(name: string): any
   - set(name: string, value: any): void
   - clear(): void
   - remove(name: string): void
   - getAll(): Object

SDK Method Signatures:
- typed(name: string, signatures: Object): Function
   - Example:
       const max = typed('max', {
            'number, number': function(a, b) { return Math.max(a, b); },
            'BigNumber, BigNumber': function(a, b) { return a.greaterThan(b) ? a : b; }
       });

Factory Function Signature:
- factory(name: string, dependencies: string[], create: (deps: Object) => Function, meta?: Object): Function
   - Example provided in documentation uses dependencies ['multiply', 'unaryMinus'].

Troubleshooting Commands:
- To test configuration:
    console.log(math.config());
- To reset parser state:
    const parser = math.parser(); parser.clear();
- To check serialization:
    const str = JSON.stringify(math.complex('2+3i'), math.replacer);
    const comp = JSON.parse(str, math.reviver);
  Expected: comp object with fields { mathjs: 'Complex', re: 2, im: 3 }

Return Types:
- All evaluate methods return appropriate numeric, Complex, Unit, Matrix types depending on inputs.
- Compile returns a code object with evaluate(scope?) => any

Best Practice Example:
// Create instance with custom configuration for BigNumber support
import { create, all } from 'mathjs';
const math = create(all, { number: 'BigNumber', precision: 32 });
const code = math.compile('1/3');
console.log(code.evaluate().toString()); // outputs BigNumber value with 32 precision


## Information Dense Extract
Installation: npm install mathjs; Use require/import or script tag. Configuration: { relTol:1e-12, absTol:1e-15, matrix:'Matrix', number:'number'|'BigNumber'|'bigint'|'Fraction', numberFallback:'number'|'BigNumber', precision:64, predictable:false, randomSeed:null }. API: math.evaluate(expr,[scope]), math.compile(expr):{evaluate(scope?)}, math.parse(expr), math.chain(value) with chain methods add, subtract, multiply, done. Parser API: math.parser() with evaluate, get, set, clear, remove, getAll. Extension: math.import(functions, {override, silent, wrap}). Factory: factory(name, dependencies, create, meta?). Typed: typed('funcName', {signatures}). Serialization: JSON.stringify(value, math.replacer) & JSON.parse(json, math.reviver). Operators: arithmetic (+,-,*,/), exponent (^), element-wise (.*,./,.^), matrix transpose ('). Precedence: grouping, function call, transpose, factorial, exponentiation, unary, multiplication/division, addition/subtraction, range, unit conversion, bitwise, relational, logical, assignment.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs
   - Global CLI and CDN options
2. Configuration
   - Available options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number', 'BigNumber', 'bigint', 'Fraction'), numberFallback ('number' or 'BigNumber'), precision (64), predictable (false), randomSeed (null)
3. Chaining
   - Use math.chain(value) to start a chain, methods: add, multiply, subtract, done()
   - Example: math.chain(3).add(4).multiply(2).done() returns 14
4. Expression Evaluation
   - Direct evaluation: math.evaluate('expression', scope)
   - Compiling: const code = math.compile('expression'); code.evaluate(scope)
   - Parsing: const node = math.parse('expression'); then node.compile().evaluate(scope)
5. Parser API
   - Methods: evaluate(expr), get(name), set(name, value), clear(), remove(name), getAll()
6. Extension and Import
   - Use math.import({ myFunc: function() {} }, { override: false, silent: false, wrap: false })
   - External libraries can be imported with {wrap: true, silent: true}
7. Factory Functions and Typed Functions
   - Factory signature: factory(name, dependencies, create, meta?) returns function
   - Typed functions: typed('funcName', { 'number, number': (a, b) => Math.max(a, b), ... })
8. Serialization
   - JSON.stringify(value, math.replacer) and JSON.parse(json, math.reviver) for math.js data types
9. Operator Specifications
   - Detailed operator precedence and supported operators (e.g., +, -, *, /, ^, mod, element-wise ., matrix transpose ('))

Each topic includes exact configuration options, method signatures, and examples ready to be integrated into applications.

## Original Source
Math.js Documentation
https://mathjs.org/docs/index.html

## Digest of MATHJS

# Math.js Documentation Digest

Date Retrieved: 2023-10-06

## Installation

- Install via npm: npm install mathjs
- Global installation: npm install -g mathjs (available as CLI: mathjs)
- CDN links: unpkg (https://unpkg.com/mathjs@14.4.0/), cdnjs, jsDelivr, PageCDN
- TypeScript type definitions included

## Getting Started & Usage

- Usage in Node.js (CommonJS):
  const { sqrt } = require('mathjs');
  console.log(sqrt(-4).toString()); // 2i

- ES Modules:
  import { sqrt } from 'mathjs';
  console.log(sqrt(-4).toString()); // 2i

- Browser usage: load math.js script and access global variable 'math'

## Configuration

Configuration options for a math.js instance:

- relTol: Default 1e-12, minimum relative difference for equality tests
- absTol: Default 1e-15, minimum absolute difference for equality tests
- matrix: 'Matrix' (default) or 'Array', determines output type
- number: 'number' (default), 'BigNumber', 'bigint', or 'Fraction'
- numberFallback: when using types like 'bigint', fallback options ('number' or 'BigNumber')
- precision: Maximum significant digits for BigNumbers (default 64)
- predictable: false (default); when true output type is solely determined by input types
- randomSeed: null by default; set to a value (e.g., 'a') for deterministic pseudo random generation

Example configuration:

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

## Chaining

- Create a chain: math.chain(value)
- Chaining example:

   math.chain(3)
       .add(4)         // Adds 4 to chain value
       .multiply(2)    // Multiplies result by 2
       .done()         // Final result is 14

Special methods on chain:
- done() or valueOf(): returns chained value
- toString(): returns formatted string of value

## Expressions & Evaluation

Three main methods:

1. math.evaluate(expr, [scope]) : Direct evaluation of expression string;
   Example: math.evaluate('sqrt(3^2 + 4^2)') returns 5

2. math.compile(expr) returns a code object with method evaluate(scope) for repeated use

3. math.parse(expr) returns an expression tree node and can be compiled

Also, math.parser() creates a persistent parser object with methods:
- evaluate(expr)
- get(name)
- set(name, value)
- clear()
- remove(name)

## Extension & Importing

- Extend math.js by importing new functions and constants.

   math.import({
       myvalue: 42,
       hello: function(name) { return 'hello, ' + name + '!' }
   }, { override: false, silent: false, wrap: false })

- To import external libraries, use options {wrap: true, silent: true}

## Factory functions & Typed Functions

Factory Function Syntax:

   factory(name: string, dependencies: string[], create: function, meta?: Object): function

Example:

   import { factory, create, all } from 'mathjs'
   const name = 'negativeSquare'
   const dependencies = ['multiply', 'unaryMinus']
   const createNegativeSquare = factory(name, dependencies, function({ multiply, unaryMinus }) {
       return function negativeSquare(x) {
           return unaryMinus(multiply(x, x))
       }
   })

Typed functions using math.typed:

   const max = typed('max', {
     'number, number': function(a, b) { return Math.max(a, b) },
     'BigNumber, BigNumber': function(a, b) { return a.greaterThan(b) ? a : b }
   })

## Serialization

- Use JSON.stringify(value, math.replacer) to serialize math.js types (e.g., Complex, Unit)
- Deserialize with JSON.parse(json, math.reviver)
- Ensures special cases like Infinity are handled correctly

## Expression Syntax & Operators

Features:
- Implicit multiplication (e.g., 2 pi)
- Matrix indices are one-based
- Custom operator precedence, grouping with parentheses
- Operators include +, -, *, /, ^, mod, element-wise operations (.* , ./, .^)
- Conditional operator: ? :

Operator Precedence (high to low):
1. Grouping: (...) [...]
2. Function call and property access
3. Transpose (') and Factorial (!)
4. Exponentiation (^, .^)
5. Unary plus, minus
6. Multiplication, division, modulus
7. Addition, subtraction
8. Range (:)
9. Unit conversion (to, in)
10. Bitwise operators
11. Relational operators (==, !=, <, >, <=, >=)
12. Logical operators (and, or, xor)
13. Assignment (=)

## Parser API Details

Parser methods available on math.parser():

- evaluate(expr): returns result; accepts optional scope
- get(name): returns variable or function from scope
- set(name, value): sets a variable or function
- getAll(): returns all defined variables
- clear(): clears scope completely
- remove(name): removes a specific variable

## Troubleshooting & Best Practices

- Always pass math.replacer when serializing to avoid losing special numeric values
- Compile expressions once for repeated evaluations (improves performance)
- Use explicit configuration to ensure predictable numeric types
- For extensions, use override option carefully to avoid replacing existing functions

Attribution: Content extracted from mathjs.org/docs/index.html, Data Size: 4616680 bytes, 9289 Links Found


## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/index.html
- License: MIT License
- Crawl Date: 2025-04-27T17:48:10.600Z
- Data Size: 4616680 bytes
- Links Found: 9289

## Retrieved
2025-04-27
