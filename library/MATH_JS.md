# MATH_JS

## Crawl Summary
Math.js offers a comprehensive math library for JavaScript with capabilities including symbolic computation, various data types (numbers, BigNumbers, complex, fractions, matrices, units), a flexible expression parser, and chaining operations. Key specifications: installation via npm, multiple module loading strategies (CommonJS, ES modules, browser), extensive configuration options (relTol, absTol, matrix output type, numeric type options), parser and evaluator functions (evaluate, compile, parse, and parser API with get/set/clear), extension facility via math.import, and support for typed and factory functions with complete API signatures and behavior definitions.

## Normalised Extract
Table of Contents:
1. Installation & Setup
2. Configuration Options
3. Chaining Operations
4. Expression Parsing & Evaluation
5. Extension and Import
6. Typed and Factory Functions
7. Serialization & Deserialization
8. Parser API
9. Operators and Syntax

1. Installation & Setup:
   - npm install mathjs
   - Global installation: npm install -g mathjs
   - Load in Node.js using require or ES modules using import { create, all } from 'mathjs'

2. Configuration Options:
   - math.config({ relTol, absTol, matrix, number, numberFallback, precision, predictable, randomSeed })
   - Defaults: relTol=1e-12, absTol=1e-15, matrix='Matrix', number='number', precision=64, predictable=false, randomSeed=null

3. Chaining Operations:
   - Use math.chain(value) to wrap a value
   - Chain methods: .add(), .subtract(), .multiply(), .done() returns final value
   - Example: math.chain(3).add(4).multiply(2).done() returns 14

4. Expression Parsing & Evaluation:
   - math.evaluate(expression, [scope]) for direct evaluation
   - math.compile(expression) returns an object with evaluate(scope)
   - math.parse(expression) returns an expression tree node

5. Extension and Import:
   - Use math.import(object, { override, silent, wrap })
   - Options: override (default false), silent (default false), wrap (default false)

6. Typed and Factory Functions:
   - Create typed functions using math.typed('funcName', { signature: function (...) { ... } })
   - Add new types: math.typed.addType({ name: 'MyType', test: function(x){...} })
   - Factory functions: factory(name, dependencies, create, meta) for dependency injection

7. Serialization & Deserialization:
   - JSON.stringify(x, math.replacer)
   - JSON.parse(json, math.reviver)
   - Necessary for types such as Complex and Unit

8. Parser API:
   - Create a parser: const parser = math.parser()
   - Methods: parser.evaluate(expr), parser.get(name), parser.set(name, value), parser.remove(name), parser.getAll(), parser.clear()

9. Operators and Syntax:
   - Standard arithmetic: +, -, *, /, %, ^; element-wise: .*, ./, .^
   - Implicit multiplication, 1-based indexing for matrices, operator chaining for relational operators


## Supplementary Details
Configuration Options Detailed:
- relTol: minimum relative tolerance for equality (1e-12) used in all relational comparisons.
- absTol: minimum absolute tolerance for equality (1e-15).
- matrix: defines default output type ('Matrix' or 'Array'); if mixed, output as Matrix.
- number: parameter for numeric parsing and creation; valid values are 'number', 'BigNumber', 'bigint', or 'Fraction'.
- numberFallback: fallback type if conversion is not possible (default 'number').
- precision: significant digits for BigNumbers (default 64).
- predictable: if true, forces consistent output type based solely on input types (default false).
- randomSeed: sets seed for RNG to enable deterministic results (default null).

Extension Import Options:
- override: boolean flag, default false
- silent: boolean flag to suppress errors, default false
- wrap: boolean flag to wrap functions converting math.js types to JS primitives, default false

Parser API Methods:
- evaluate(expr: string): any
- get(name: string): any
- set(name: string, value: any): void
- remove(name: string): void
- getAll(): object
- clear(): void

Chaining API:
- math.chain(value: any): Chain
  Methods on Chain include .add(a), .subtract(a), .multiply(a), .done() returning final result.

Factory Function API:
- factory(name: string, dependencies: string[], create: function, meta?: object): function
  Example signature: factory('negativeSquare', ['multiply', 'unaryMinus'], ({ multiply, unaryMinus }) => { return function (x: number): number; });

Troubleshooting:
- Ensure math.js is correctly imported if using modules.
- When configuring for BigNumber, use proper precision; errors in math.evaluate may indicate type conflicts.
- Use math.replacer and math.reviver for JSON operations to avoid data loss (e.g. Infinity becomes null without replacer).
- If chain operation fails (e.g. rest parameter issue), ensure all parameters are passed in a single function call.


## Reference Details
API Specifications:

1. math.config(options: Object): void
   - options: Object containing keys: relTol (number), absTol (number), matrix (string: 'Matrix' | 'Array'), number (string: 'number' | 'BigNumber' | 'bigint' | 'Fraction'), numberFallback (string), precision (number), predictable (boolean), randomSeed (any)
   - Return: void; affects global configuration of math instance

2. math.evaluate(expr: string, [scope: Object|Map]): any
   - expr: expression string; scope: mapping for variable resolution
   - Returns: result of computation

3. math.compile(expr: string): { evaluate(scope?: Object|Map): any }
   - Returns an object with evaluate method

4. math.parse(expr: string): Node
   - Returns: Expression tree node with methods: compile(), toString(), toTex()

5. math.chain(value: any): Chain
   - Chain methods:
      - add(a: any): Chain
      - subtract(a: any): Chain
      - multiply(a: any): Chain
      - done(): any (returns final computed value)

6. math.import(functions: Object|Array, [options?: { override?: boolean, silent?: boolean, wrap?: boolean }]): void
   - Imports custom functions and values into math namespace

7. Parser API (from math.parser()):
   - evaluate(expr: string): any
   - get(name: string): any
   - set(name: string, value: any): void
   - remove(name: string): void
   - getAll(): Object
   - clear(): void

8. Typed Functions:
   - math.typed(name: string, signatures: Object): function
     Example:
       const max = math.typed('max', {
         'number, number': (a: number, b: number) => Math.max(a, b),
         'BigNumber, BigNumber': (a: BigNumber, b: BigNumber) => a.greaterThan(b) ? a : b
       });

9. Factory Functions:
   - factory(name: string, dependencies: string[], create: function, meta?: Object): function
     Example provided in documentation for negativeSquare.

10. Serialization:
    - Use JSON.stringify(object, math.replacer) and JSON.parse(json, math.reviver)

Code Examples (Complete):

// Node.js Example:
import { create, all } from 'mathjs';
const config = { matrix: 'Array', number: 'BigNumber', precision: 32 };
const math = create(all, config);
console.log(math.evaluate('1/3').toString());

// Chaining Example:
const result = math.chain(3).add(4).multiply(2).done();
console.log(result); // Expected: 14

// Parser Example:
const parser = math.parser();
parser.evaluate('x = 7/2');
parser.evaluate('f(x) = x^2');
console.log(parser.evaluate('f(2)')); // Expected: 4
parser.clear();

// Import Example:
math.import({
  myValue: 42,
  greet: function(name) { return 'hello, ' + name + '!'; }
}, { override: false, silent: false, wrap: false });
console.log(math.myValue * 2); // 84

Troubleshooting Commands:
- Verify configuration: console.log(math.config());
- For JSON issues, test:
  const str = JSON.stringify(math.complex('2+3i'), math.replacer);
  console.log(str); // Expected proper JSON with mathjs type marker
- If chain errors occur, check that parameters are passed in one function call without breaking rest parameters.


## Information Dense Extract
Installation: npm install mathjs; Modules: require('mathjs') or import { create, all } from 'mathjs'. Configuration: math.config({ relTol:1e-12, absTol:1e-15, matrix:'Matrix', number:'number', numberFallback:'number', precision:64, predictable:false, randomSeed:null }). Chaining: math.chain(3).add(4).multiply(2).done() => 14. Expression: math.evaluate(expr, [scope]); Compile: math.compile(expr) returns { evaluate(scope) } ; Parse: math.parse(expr) returns Node with toString()/toTex(). Import: math.import(obj, { override:boolean, silent:boolean, wrap:boolean }); Parser API: parser.evaluate(), parser.get(), parser.set(), parser.remove(), parser.clear(). Typed API: math.typed('func', { 'number, number': fn, 'BigNumber, BigNumber': fn }); Factory: factory(name, [deps], create, meta). Serialization: JSON.stringify(x, math.replacer) and JSON.parse(json, math.reviver).

## Sanitised Extract
Table of Contents:
1. Installation & Setup
2. Configuration Options
3. Chaining Operations
4. Expression Parsing & Evaluation
5. Extension and Import
6. Typed and Factory Functions
7. Serialization & Deserialization
8. Parser API
9. Operators and Syntax

1. Installation & Setup:
   - npm install mathjs
   - Global installation: npm install -g mathjs
   - Load in Node.js using require or ES modules using import { create, all } from 'mathjs'

2. Configuration Options:
   - math.config({ relTol, absTol, matrix, number, numberFallback, precision, predictable, randomSeed })
   - Defaults: relTol=1e-12, absTol=1e-15, matrix='Matrix', number='number', precision=64, predictable=false, randomSeed=null

3. Chaining Operations:
   - Use math.chain(value) to wrap a value
   - Chain methods: .add(), .subtract(), .multiply(), .done() returns final value
   - Example: math.chain(3).add(4).multiply(2).done() returns 14

4. Expression Parsing & Evaluation:
   - math.evaluate(expression, [scope]) for direct evaluation
   - math.compile(expression) returns an object with evaluate(scope)
   - math.parse(expression) returns an expression tree node

5. Extension and Import:
   - Use math.import(object, { override, silent, wrap })
   - Options: override (default false), silent (default false), wrap (default false)

6. Typed and Factory Functions:
   - Create typed functions using math.typed('funcName', { signature: function (...) { ... } })
   - Add new types: math.typed.addType({ name: 'MyType', test: function(x){...} })
   - Factory functions: factory(name, dependencies, create, meta) for dependency injection

7. Serialization & Deserialization:
   - JSON.stringify(x, math.replacer)
   - JSON.parse(json, math.reviver)
   - Necessary for types such as Complex and Unit

8. Parser API:
   - Create a parser: const parser = math.parser()
   - Methods: parser.evaluate(expr), parser.get(name), parser.set(name, value), parser.remove(name), parser.getAll(), parser.clear()

9. Operators and Syntax:
   - Standard arithmetic: +, -, *, /, %, ^; element-wise: .*, ./, .^
   - Implicit multiplication, 1-based indexing for matrices, operator chaining for relational operators

## Original Source
Math.js Documentation
https://mathjs.org/docs/index.html

## Digest of MATH_JS

# Math.js Documentation

## Installation
- Install via npm: npm install mathjs
- Global install: npm install -g mathjs (command line: mathjs)

## Usage
- Node.js (CommonJS):
  const { sqrt } = require('mathjs');
  console.log(sqrt(-4).toString()); // 2i

- ES Modules:
  import { create, all } from 'mathjs';
  const math = create(all, {});
  console.log(math.sqrt(-4).toString()); // 2i

- Browser: Include math.js via script tag and access the global variable 'math'.

## Configuration
Call math.config({...}) with options:
- relTol: (default 1e-12) Minimum relative difference for equality.
- absTol: (default 1e-15) Minimum absolute difference for equality.
- matrix: ('Matrix' or 'Array', default 'Matrix') Default matrix output type.
- number: ('number', 'BigNumber', 'bigint', or 'Fraction'; default 'number') Used to parse numeric values.
- numberFallback: (default 'number') Fallback type when conversion fails.
- precision: (default 64) Max significant digits for BigNumbers.
- predictable: (default false) Forces output type based solely on input types.
- randomSeed: (default null) Seed for pseudorandom number generation.

Example:

    import { create, all } from 'mathjs';
    const config = { relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix', number: 'number', precision: 64, predictable: false, randomSeed: null };
    const math = create(all, config);
    console.log(math.config());
    math.config({ number: 'BigNumber' });

## Chaining
- Create a chain with math.chain(value)
- Example:

    math.chain(3)
      .add(4)
      .multiply(2)
      .done(); // returns 14

## Extension & Import
- Extend math.js using math.import(functions, options) with options:
  - override (boolean, default false): Overwrite existing functions.
  - silent (boolean, default false): Suppress errors on duplicates.
  - wrap (boolean, default false): Wrap functions to convert data types (e.g. Matrix to Array).

Example:

    math.import({
      myvalue: 42,
      hello: function (name) { return 'hello, ' + name + '!'; }
    });

## Expression Parsing & Evaluation
- Evaluate expressions with math.evaluate(expr, [scope])
- Compile expressions with math.compile(expr) that returns an object with evaluate(scope)
- Parse expressions into an expression tree with math.parse(expr)

Example using parser:

    const parser = math.parser();
    parser.evaluate('x = 7/2');
    parser.evaluate('f(x) = x^2');
    console.log(parser.evaluate('f(2)')); // 4
    parser.clear();

## Typed Functions & Factory Functions
- Create typed functions using math.typed('functionName', { signature: function (args) { ... } })
- Add new types using math.typed.addType({ name: 'MyType', test: function(x) { return x && x.isMyType; } });

Example of a typed function:

    const max = math.typed('max', {
      'number, number': function (a, b) { return Math.max(a, b); },
      'BigNumber, BigNumber': function (a, b) { return a.greaterThan(b) ? a : b; }
    });

- Factory functions: Use factory(name, dependencies, create, meta) to inject dependencies.

Example:

    import { factory, create, all } from 'mathjs';
    const createNegativeSquare = factory('negativeSquare', ['multiply', 'unaryMinus'], function ({ multiply, unaryMinus }) {
      return function negativeSquare(x) { return unaryMinus(multiply(x, x)); };
    });
    const math = create(all);
    math.import(createNegativeSquare);
    console.log(math.negativeSquare(4)); // -16

## Serialization
- Serialize math.js types (e.g. Complex, Unit, Matrix) using JSON.stringify(x, math.replacer)
- Deserialize with JSON.parse(json, math.reviver)

Example:

    const x = math.complex('2 + 3i');
    const json = JSON.stringify(x, math.replacer);
    const obj = JSON.parse(json, math.reviver);

## Parser API Details
- Methods provided by parser:
  - evaluate(expr): returns the result of expression evaluation.
  - get(name): retrieves a variable or function.
  - set(name, value): assigns a variable or function.
  - remove(name): removes a variable or function.
  - getAll(): returns all definitions.
  - clear(): clears the parser’s scope.

## Operators & Expression Syntax
- Operator list includes: +, -, *, /, %, ^, and element-wise operations (.* , ./, .^)
- Supports implicit multiplication (e.g. 2pi = 2 * pi) and matrix indexing (1-based indices).
- Relational operators (==, !=, <, >, <=, >=) support chaining.

Retrieved on: 2023-10-05
Attribution: Math.js Documentation from https://mathjs.org/docs/index.html; Data Size: 13059220 bytes

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/index.html
- License: MIT License
- Crawl Date: 2025-04-28T03:54:31.960Z
- Data Size: 13059220 bytes
- Links Found: 26323

## Retrieved
2025-04-28
