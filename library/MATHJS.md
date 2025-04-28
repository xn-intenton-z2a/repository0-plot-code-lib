# MATHJS

## Crawl Summary
Math.js documentation provides a comprehensive API for mathematical computations in JavaScript. Installation via npm, usage of configuration options (relTol, absTol, matrix type, numeric type, precision, predictable mode, randomSeed), and three methods of evaluation (direct function calls, expressions, chaining) are detailed. Key APIs include math.evaluate, math.compile, math.parse, math.chain, math.import, math.typed, factory functions, and serialization using math.replacer and math.reviver. Complete method signatures, configuration options, and troubleshooting steps are provided.

## Normalised Extract
Table of Contents:
1. Installation and Setup
2. Core API and Usage
3. Configuration Options
4. Expression Parsing, Compilation and Evaluation
5. Chaining Operations
6. Import and Extension Mechanisms
7. Typed and Factory Functions
8. Serialization Procedures

1. Installation and Setup:
- Execute: npm install mathjs
- CDN links available for unpkg, cdnjs, jsDelivr

2. Core API and Usage:
- Direct calls: math.add, math.sqrt, math.evaluate
- Expression examples: 'sqrt(3^2 + 4^2)' returns 5

3. Configuration Options:
- relTol: number = 1e-12 (minimum relative difference)
- absTol: number = 1e-15 (minimum absolute difference)
- matrix: string = 'Matrix' (or 'Array' for output type)
- number: string = 'number' (alternatives: 'BigNumber', 'bigint', 'Fraction')
- precision: number = 64 (for BigNumbers)
- predictable: boolean = false (controls output consistency)
- randomSeed: any = null (for deterministic pseudo-random generation)

4. Expression Parsing, Compilation and Evaluation:
- math.evaluate(expr, [scope]) where scope is Object or Map
- math.compile(expr) returns an object with evaluate([scope])
- math.parse(expr) returns a Node with methods toString and toTex

5. Chaining Operations:
- Creation: math.chain(value)
- Methods available on chain: add, subtract, multiply, done, valueOf, toString

6. Import and Extension:
- Use math.import(object, {override, silent, wrap})
- Example: Import custom function hello(name) => 'hello, ' + name

7. Typed and Factory Functions:
- Example using math.typed:
  typed('max', { 'number, number': (a, b) => Math.max(a,b), 'BigNumber, BigNumber': (a,b)=> a.greaterThan(b) ? a : b })
- Factory function signature: factory(name, dependencies, create, meta?)

8. Serialization Procedures:
- To serialize: JSON.stringify(object, math.replacer)
- To deserialize: JSON.parse(string, math.reviver)
- Ensures complex types like Complex, Unit, Matrix are handled correctly

## Supplementary Details
Configuration Options:
- relTol: number, default 1e-12, used in relational comparisons
- absTol: number, default 1e-15, used in relational functions
- matrix: string, default 'Matrix'; values 'Matrix' or 'Array'; determines output type for matrix operations
- number: string, default 'number'; options include 'BigNumber', 'bigint', 'Fraction'; influences parsing in evaluate, parse, range, and unit functions
- precision: number, default 64; applicable only when number is 'BigNumber'
- predictable: boolean, default false; when true forces consistent output types (e.g., math.sqrt(-4) returns NaN), when false returns type based on input (e.g., complex)
- randomSeed: any, default null; setting a fixed seed yields deterministic math.random() results

SDK Method Signatures:
- math.evaluate(expr: string | Array, scope?: Object | Map): any
- math.compile(expr: string | Array): { evaluate(scope?: Object | Map): any }
- math.parse(expr: string | Array): Node
- math.config(options: Object): Object
- math.chain(value: any): Chain (with methods done(): any, valueOf(): any, toString(): string)

Implementation Pattern Examples:
- Creating a mathjs instance with custom config:
  const math = create(all, { matrix: 'Array', number: 'BigNumber', precision: 32 })
- Extending math with custom function:
  math.import({ myFunction: (a, b) => a + b })
- Using typed functions:
  const max = math.typed('max', { 'number, number': (a, b) => Math.max(a, b) })
- Serialization:
  const str = JSON.stringify(math.complex('2+3i'), math.replacer)
  const comp = JSON.parse(str, math.reviver)

Troubleshooting Procedures:
1. Verify configuration with math.config() if operations return unexpected types.
2. Use math.replacer and math.reviver to handle JSON serialization edge cases (Infinity, Complex numbers).
3. For import errors, check override, silent, and wrap options; try {wrap: true, silent: true} when importing external libraries.
4. If compiled expressions do not evaluate, ensure scope is correctly provided (plain Object or Map).
5. Use command line test: node -e "const {create, all} = require('mathjs'); const math = create(all); console.log(math.evaluate('sqrt(-4)').toString());"

## Reference Details
API Specifications:

math.evaluate(expr: string | Array<string>, scope?: Object | Map) -> any
  - expr: Expression string or array of expressions
  - scope: Object or Map with variables and functions

math.compile(expr: string | Array<string>) -> { evaluate(scope?: Object | Map): any }
  - Compile returns a code object with an evaluate method

math.parse(expr: string | Array<string>) -> Node
  - Node methods: toString(): string, toTex(): string, compile(): { evaluate(scope?: Object | Map): any }

math.config(options: {
  relTol?: number,            // Default: 1e-12
  absTol?: number,            // Default: 1e-15
  matrix?: 'Matrix' | 'Array', // Default: 'Matrix'
  number?: 'number' | 'BigNumber' | 'bigint' | 'Fraction', // Default: 'number'
  precision?: number,         // Default: 64
  predictable?: boolean,      // Default: false
  randomSeed?: any            // Default: null
}) -> Object

math.chain(value: any) -> Chain
  - Chain Methods:
      done(): any
      valueOf(): any
      toString(): string

math.import(functions: Object | Array, options?: {
  override?: boolean,  // Default: false
  silent?: boolean,    // Default: false
  wrap?: boolean       // Default: false
}): void

Factory Function:
factory(name: string, dependencies: string[], create: Function, meta?: Object) -> Function
  - Example meta: { isClass: boolean, lazy: boolean, isTransformFunction: boolean, recreateOnConfigChange: boolean, formerly?: string }

Code Examples:

// Example 1: Configuring math.js
import { create, all } from 'mathjs'
const config = {
  matrix: 'Array',
  number: 'BigNumber',
  precision: 32
}
const math = create(all, config)
console.log(math.config())

// Example 2: Expression Evaluation
let result = math.evaluate('sqrt(3^2 + 4^2)')
console.log(result)    // Expected output: 5

// Example 3: Chaining
result = math.chain(3).add(4).multiply(2).done()
console.log(result)    // Expected output: 14

// Example 4: Importing a custom function
math.import({
  hello: function (name: string): string { return 'hello, ' + name + '!' }
}, { override: true })
console.log(math.hello('user'))  // Expected output: hello, user!

// Troubleshooting: Serialization
const comp = math.complex('2+3i')
const jsonStr = JSON.stringify(comp, math.replacer)
console.log(jsonStr)  // Expected: JSON string with keys: mathjs, re, im
const restored = JSON.parse(jsonStr, math.reviver)
console.log(restored.toString())   // Expected output: 2+3i

Detailed Commands:
- To test math.evaluate in Node:
  node -e "const {create, all} = require('mathjs'); const math = create(all); console.log(math.evaluate('sqrt(-4)').toString());"
- To verify configuration changes, use math.config({ ... }) and log the result.

## Information Dense Extract
npm install mathjs; math.evaluate(expr, scope?); math.compile(expr) -> { evaluate(scope?) }; math.parse(expr) -> Node; config options: relTol=1e-12, absTol=1e-15, matrix='Matrix'|'Array', number='number'|'BigNumber'|'bigint'|'Fraction', precision=64, predictable=false, randomSeed=null; chain(value) returns chain with done(), valueOf(), toString(); import(obj, {override, silent, wrap}); factory(name, deps, create, meta?); JSON.stringify(obj, math.replacer) and JSON.parse(str, math.reviver); example: math.chain(3).add(4).multiply(2).done() returns 14; typed function: math.typed('max', {'number, number': (a,b)=>Math.max(a,b)}); full API with method signatures, parameters and defaults provided.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
2. Core API and Usage
3. Configuration Options
4. Expression Parsing, Compilation and Evaluation
5. Chaining Operations
6. Import and Extension Mechanisms
7. Typed and Factory Functions
8. Serialization Procedures

1. Installation and Setup:
- Execute: npm install mathjs
- CDN links available for unpkg, cdnjs, jsDelivr

2. Core API and Usage:
- Direct calls: math.add, math.sqrt, math.evaluate
- Expression examples: 'sqrt(3^2 + 4^2)' returns 5

3. Configuration Options:
- relTol: number = 1e-12 (minimum relative difference)
- absTol: number = 1e-15 (minimum absolute difference)
- matrix: string = 'Matrix' (or 'Array' for output type)
- number: string = 'number' (alternatives: 'BigNumber', 'bigint', 'Fraction')
- precision: number = 64 (for BigNumbers)
- predictable: boolean = false (controls output consistency)
- randomSeed: any = null (for deterministic pseudo-random generation)

4. Expression Parsing, Compilation and Evaluation:
- math.evaluate(expr, [scope]) where scope is Object or Map
- math.compile(expr) returns an object with evaluate([scope])
- math.parse(expr) returns a Node with methods toString and toTex

5. Chaining Operations:
- Creation: math.chain(value)
- Methods available on chain: add, subtract, multiply, done, valueOf, toString

6. Import and Extension:
- Use math.import(object, {override, silent, wrap})
- Example: Import custom function hello(name) => 'hello, ' + name

7. Typed and Factory Functions:
- Example using math.typed:
  typed('max', { 'number, number': (a, b) => Math.max(a,b), 'BigNumber, BigNumber': (a,b)=> a.greaterThan(b) ? a : b })
- Factory function signature: factory(name, dependencies, create, meta?)

8. Serialization Procedures:
- To serialize: JSON.stringify(object, math.replacer)
- To deserialize: JSON.parse(string, math.reviver)
- Ensures complex types like Complex, Unit, Matrix are handled correctly

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATHJS

# MATH.JS DOCUMENTATION

## Installation

Install via npm:

npm install mathjs

For global installation: npm install -g mathjs

Download from CDNs:
- unpkg: https://unpkg.com/mathjs@14.4.0/
- cdnjs: https://cdnjs.com/libraries/mathjs
- jsDelivr: https://www.jsdelivr.com/package/npm/mathjs

## Core API and Usage

### Math Namespace

All functions and constants are available in the math namespace. Three calculation methods:
1. Direct function calls: math.add(math.sqrt(4), 2)
2. Expression evaluation: math.evaluate('sqrt(4) + 2')
3. Chaining: math.chain(4).sqrt().add(2).done()

### Configuration

Configure math.js instance with math.config() or when creating an instance:

Example:

import { create, all } from 'mathjs'
const config = {
  relTol: 1e-12,         // Default 1e-12
  absTol: 1e-15,         // Default 1e-15
  matrix: 'Matrix',      // Default: 'Matrix'. Alternative: 'Array'
  number: 'number',      // Options: 'number', 'BigNumber', 'bigint', 'Fraction'
  precision: 64,         // Applies for BigNumber only
  predictable: false,    // False returns type based on input, true forces consistent output
  randomSeed: null       // Null for random seeding, or a value for deterministic output
}

const math = create(all, config)

Change configuration dynamically:

math.config({ number: 'BigNumber' })

### Expressions, Parsing, and Evaluation

Methods:

- math.evaluate(expr [, scope])
- math.compile(expr) returns a compiled object with evaluate([scope]) method
- math.parse(expr) returns an expression tree node

Examples:

// Expression Evaluation
math.evaluate('sqrt(3^2 + 4^2)')  // Returns 5
math.evaluate('2 inch to cm')      // Returns 5.08 cm

// Compiling and parsing
const code = math.compile('sqrt(3^2 + 4^2)')
const result = code.evaluate()

const node = math.parse('x^a')
const compiled = node.compile()
let scope = { x: 3, a: 2 }
const output = compiled.evaluate(scope)  // Returns 9

### Chaining

Using math.chain:

math.chain(3)
    .add(4)
    .multiply(2)
    .done()  // Returns 14

For matrices:

math.chain([[1,2],[3,4]])
    .subset(math.index(0, 0), 8)
    .multiply(3)
    .done()  // Returns [[24,6],[9,12]]

### Import and Extension

Extend math.js using math.import()

Example:

math.import({
  myvalue: 42,
  hello: function (name) { return 'hello, ' + name + '!' }
}, { override: false, silent: false, wrap: false })

### Typed and Factory Functions

Create typed functions using math.typed:

const max = math.typed('max', {
  'number, number': function (a, b) { return Math.max(a, b) },
  'BigNumber, BigNumber': function (a, b) { return a.greaterThan(b) ? a : b }
})

Factory functions allow dependency injection:

Example:

import { factory, create, all } from 'mathjs'
const dependencies = ['multiply', 'unaryMinus']
const createNegativeSquare = factory('negativeSquare', dependencies, function ({ multiply, unaryMinus }) {
  return function negativeSquare (x) { return unaryMinus(multiply(x, x)) }
})

// Using in an instance
const mathInst = create(all)
mathInst.import(createNegativeSquare)

### Serialization

Serialize math.js types to JSON using JSON.stringify with math.replacer and deserialize with math.reviver.

Example:

const comp = math.complex('2+3i')
const jsonStr = JSON.stringify(comp, math.replacer)
const restored = JSON.parse(jsonStr, math.reviver)

## Additional API Methods and Signatures

- math.evaluate(expr: string | Array&lt;string&gt;, scope?: Object | Map): number | Complex | Matrix | Array
- math.compile(expr: string | Array&lt;string&gt;): { evaluate(scope?: Object | Map): any }
- math.parse(expr: string | Array&lt;string&gt;): Node (Node supports toString and toTex methods)
- math.config(options: Object): Object
- math.chain(value: any): Chain

Chain methods:
  - done(): any
  - valueOf(): any
  - toString(): string

Import options for math.import(functions: Object, options?: Object): void
Options: override (boolean), silent (boolean), wrap (boolean)

Factory function signature:
  factory(name: string, dependencies: string[], create: function, meta?: Object): function

## Troubleshooting Procedures

1. If functions return unexpected types, verify configuration with math.config().
2. Ensure using math.replacer and math.reviver for proper JSON serialization.
3. For issues with typed functions, double-check signature strings and type tests.
4. When importing external libraries, use {wrap: true, silent: true} options to avoid conflicts.

Example command line for testing:

node -e "const { create, all } = require('mathjs'); const math = create(all); console.log(math.evaluate('sqrt(-4)').toString());"

Retrieved on: 2023-10-05
Data Size: 13683292 bytes

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: Apache License (v2)
- Crawl Date: 2025-04-28T10:29:09.970Z
- Data Size: 13683292 bytes
- Links Found: 27432

## Retrieved
2025-04-28
