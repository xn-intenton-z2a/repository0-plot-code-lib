# MATHJS

## Crawl Summary
Installation via npm (npm install mathjs); configuration via math.config with options (relTol, absTol, matrix, number, precision, predictable, randomSeed); chaining API using math.chain(value) with methods add, subtract, multiply, done; expression evaluation via math.evaluate, math.compile, math.parse; extension and importing via math.import with options override, silent, wrap; support for typed and factory functions; serialization via JSON.stringify with math.replacer and JSON.parse with math.reviver.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs; global CLI availability; ESM import via create(all, config)
2. Configuration Options
   - math.config(options) with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number', 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null)
3. Chaining Operations
   - Create chain: math.chain(3), chain methods: add, subtract, multiply, done()
   - Example: math.chain(3).add(4).multiply(2).done() returns 14
4. Expression Parsing and Evaluation
   - Evaluate: math.evaluate('sqrt(3^2 + 4^2)') -> 5
   - Compile: const code = math.compile('expression') then code.evaluate(scope)
   - Parse: const node = math.parse('expression'), then node.compile().evaluate(scope)
5. Import and Extension
   - Extend with: math.import({ myvalue: 42, hello: function(name){ return 'hello, ' + name + '!' }}, { override: false, silent: false, wrap: false })
6. Typed and Factory Functions
   - Typed: typed('max', { 'number, number': (a, b) => Math.max(a, b) })
   - Factory: factory('negativeSquare', ['multiply', 'unaryMinus'], function({ multiply, unaryMinus }) { return function(x){ return unaryMinus(multiply(x, x)) } })
7. Serialization
   - Serialize: JSON.stringify(value, math.replacer)
   - Deserialize: JSON.parse(jsonString, math.reviver)

## Supplementary Details
Configuration Specifications:
- math.config(options): options include
  relTol: number (default 1e-12),
  absTol: number (default 1e-15),
  matrix: string ('Matrix' or 'Array', default 'Matrix'),
  number: string ('number', 'BigNumber', 'bigint', 'Fraction', default 'number'),
  precision: number (default 64),
  predictable: boolean (default false),
  randomSeed: any (default null).

Chaining Implementation:
- Initiate chain: math.chain(value)
- Supported operations: add(x), subtract(x), multiply(x), divide(x), and many others.
- Finalize with done() returning the computed value.

Expression Evaluation:
- Evaluate expressions directly using math.evaluate with an optional scope for variables.
- Compile expressions once using math.compile for repeated use.
- Parse expressions into an abstract syntax tree with math.parse.

Import and Extension Details:
- Use math.import to add external functions and extensions with support for overriding or silent error handling.

Serialization Procedures:
- To maintain data types (Complex, Unit, Matrix), use math.replacer with JSON.stringify and math.reviver with JSON.parse to prevent loss of type information.

## Reference Details
API Specifications:
1. math.evaluate(expr: string | string[], scope?: Object | Map): any
   - Evaluates mathematical expression(s) and supports variable scope assignment.
2. math.compile(expr: string | string[]): { evaluate(scope?: Object | Map): any }
   - Compiles an expression into an executable function. Example:
     const code = math.compile('sqrt(16)');
     const result = code.evaluate(); // returns 4
3. math.parse(expr: string | string[]): Node
   - Parses expression into a node tree. To compile use node.compile().evaluate(scope).
4. math.chain(value: any): Chain
   - Returns a Chain instance that supports all math namespace functions. Chain methods:
     - add(value: any): Chain
     - subtract(value: any): Chain
     - multiply(value: any): Chain
     - done(): any (finalizes chain and returns computed value)
     Example: math.chain(3).add(4).multiply(2).done() returns 14.
5. math.config(options: Object): Object
   - Sets and gets configuration. Options include:
     { relTol: number, absTol: number, matrix: string, number: string, precision: number, predictable: boolean, randomSeed: any }
6. math.import(functions: Object | Array, options?: { override?: boolean, silent?: boolean, wrap?: boolean }): void
   - Imports new functions or values into math.js.
   - Example:
     math.import({ myFunc: function(a, b) { return a + b; } }, { override: true });
7. JSON Serialization:
   - Serialization: JSON.stringify(object, math.replacer)
   - Deserialization: JSON.parse(jsonString, math.reviver)

Full SDK Method Signatures:
- evaluate(expr: string, scope?: { [key: string]: any }): any
- compile(expr: string): { evaluate(scope?: { [key: string]: any }): any }
- parse(expr: string): Node
- chain(value: any): {
      add: (x: any) => Chain,
      subtract: (x: any) => Chain,
      multiply: (x: any) => Chain,
      done: () => any,
      toString: () => string
   }

Code Example (Node.js):
-----------------------------------
import { create, all } from 'mathjs';

const config = {
  relTol: 1e-12,
  absTol: 1e-15,
  matrix: 'Matrix',
  number: 'number',
  precision: 64,
  predictable: false,
  randomSeed: null
};
const math = create(all, config);

// Chaining example
const resultChain = math.chain(3).add(4).multiply(2).done(); // returns 14
console.log(resultChain);

// Expression evaluation
const resultEval = math.evaluate('sqrt(3^2 + 4^2)'); // returns 5
console.log(resultEval);

// Import example
math.import({
  myValue: 42,
  hello: function(name) { return 'hello, ' + name + '!'; }
}, { override: false, silent: false, wrap: false });
console.log(math.myValue); // 42

// Serialization example
const complexNumber = math.complex('2 + 3i');
const jsonStr = JSON.stringify(complexNumber, math.replacer);
const obj = JSON.parse(jsonStr, math.reviver);
console.log(obj);
-----------------------------------

Troubleshooting Procedures:
- If results vary unexpectedly, verify configuration using math.config() and adjust predictable option.
- For serialization errors, ensure math.replacer and math.reviver are used; run:
  const str = JSON.stringify(object, math.replacer);
  const newObj = JSON.parse(str, math.reviver);
- For type issues in function imports, set wrap:true in math.import options.
- Use console logging to trace chain values and parsed expression trees using node.toString() and node.toTex() respectively.

## Information Dense Extract
npm install mathjs; import {create, all} from 'mathjs'; config: {relTol:1e-12, absTol:1e-15, matrix:'Matrix'|'Array', number:'number'|'BigNumber'|'bigint'|'Fraction', precision:64, predictable:false, randomSeed:null}; API: math.evaluate(expr[,scope]), math.compile(expr) -> {evaluate(scope?)}, math.parse(expr) -> Node, math.chain(value) -> Chain {add(x), subtract(x), multiply(x), done()}; math.import(functions, {override:boolean, silent:boolean, wrap:boolean}); JSON serialization via JSON.stringify(object, math.replacer) and JSON.parse(json, math.reviver); Typed functions and factory functions support multiple signatures; Chain operations allow method chaining and finalization via done(); Detailed examples provided for Node.js usage and troubleshooting configuration and serialization issues.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs; global CLI availability; ESM import via create(all, config)
2. Configuration Options
   - math.config(options) with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number', 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null)
3. Chaining Operations
   - Create chain: math.chain(3), chain methods: add, subtract, multiply, done()
   - Example: math.chain(3).add(4).multiply(2).done() returns 14
4. Expression Parsing and Evaluation
   - Evaluate: math.evaluate('sqrt(3^2 + 4^2)') -> 5
   - Compile: const code = math.compile('expression') then code.evaluate(scope)
   - Parse: const node = math.parse('expression'), then node.compile().evaluate(scope)
5. Import and Extension
   - Extend with: math.import({ myvalue: 42, hello: function(name){ return 'hello, ' + name + '!' }}, { override: false, silent: false, wrap: false })
6. Typed and Factory Functions
   - Typed: typed('max', { 'number, number': (a, b) => Math.max(a, b) })
   - Factory: factory('negativeSquare', ['multiply', 'unaryMinus'], function({ multiply, unaryMinus }) { return function(x){ return unaryMinus(multiply(x, x)) } })
7. Serialization
   - Serialize: JSON.stringify(value, math.replacer)
   - Deserialize: JSON.parse(jsonString, math.reviver)

## Original Source
Math.js Documentation
https://mathjs.org/docs/index.html

## Digest of MATHJS

# Math.js Documentation (Retrieved: 2023-10-28)

## Getting Started
- Installation via npm: npm install mathjs
- Global installation enables CLI usage via mathjs
- Import using ESM:
  import { create, all } from 'mathjs'
  const math = create(all, config)

## Configuration
- Method: math.config(options)
- Options with defaults:
  - relTol: 1e-12 (minimum relative difference for equality tests)
  - absTol: 1e-15 (minimum absolute difference for equality tests)
  - matrix: 'Matrix' (or 'Array'; determines default output type)
  - number: 'number' (or 'BigNumber', 'bigint', 'Fraction' for numeric precision)
  - precision: 64 (significant digits for BigNumbers)
  - predictable: false (controls consistent output type)
  - randomSeed: null (seed for deterministic pseudo random numbers)

## Chaining API
- Create chain instance: math.chain(value)
- Chain operations available for all math functions
- Special methods on Chain:
  - done() or valueOf(): finalize and return the value
  - toString(): returns math.format(value)
- Example:
  math.chain(3).add(4).multiply(2).done() // returns 14

## Expression Parsing and Evaluation
- Evaluate an expression with: math.evaluate(expr, [scope])
  - Example: math.evaluate('sqrt(3^2 + 4^2)') returns 5
- Compile expressions with: math.compile(expr)
  - Returns an object with evaluate(scope) method
- Parse expressions into a tree with: math.parse(expr)
  - Nodes can be compiled and then evaluated
- Parser instance: math.parser(), includes methods: evaluate(), get(), set(), clear(), remove()

## Import and Extension
- Extend math.js with: math.import(functions, [options])
- Options supported:
  - override (default false): overwrite existing functions
  - silent (default false): no errors on duplicates/invalid types
  - wrap (default false): wrap functions to convert types automatically
- Example import:
  math.import({
    myvalue: 42,
    hello: function (name) { return 'hello, ' + name + '!' }
  })

## Typed and Factory Functions
- Create typed functions with math.typed(name, signatures)
  - Signatures are specified as strings mapping argument types to function implementations
- Factory functions: factory(name, dependencies, create, [meta])
  - Enables injection of dependencies for different numeric types

## Serialization
- Serialize math.js data types via JSON.stringify with math.replacer:
  const str = JSON.stringify(value, math.replacer)
- Deserialize with JSON.parse and math.reviver:
  const obj = JSON.parse(str, math.reviver)

## API Summary
- math.evaluate(expr: string | string[], scope?: Object | Map): any
- math.compile(expr: string | string[]): { evaluate(scope?: Object | Map): any }
- math.parse(expr: string | string[]): Node
- math.chain(value: any): Chain, where Chain supports methods: add, subtract, multiply, etc., and done(): any
- math.import(functions: Object | Array, options?: { override?: boolean, silent?: boolean, wrap?: boolean }): void
- math.config(options: Object): Object (returns current configuration)

## Additional Details
- The library supports numbers, big numbers, complex numbers, fractions, units, matrices, and more.
- Usage is similar both in Node.js and the browser.
- Detailed configuration and chaining patterns directly affect computation and result formatting.

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/index.html
- License: MIT License
- Crawl Date: 2025-04-28T04:50:56.086Z
- Data Size: 3074938 bytes
- Links Found: 3637

## Retrieved
2025-04-28
