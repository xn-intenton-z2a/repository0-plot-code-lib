# MATHJS

## Crawl Summary
Installation: npm install mathjs; Configuration options include relTol (default 1e-12), absTol (default 1e-15), matrix ('Matrix' vs 'Array'), number type options ('number', 'BigNumber', 'bigint', 'Fraction'), precision (default 64), predictable (false), randomSeed (null). Chaining with math.chain(value) and finishing with .done(). Expression evaluation via math.evaluate, math.compile, and math.parse. Extension capabilities via math.import with override, silent, and wrap options. Advanced API includes typed functions (math.typed) and factory functions (factory(name, dependencies, create, meta)). Serialization via JSON.stringify(value, math.replacer) and JSON.parse(str, math.reviver).

## Normalised Extract
Table of Contents:
1. Installation
   - Use npm install mathjs, CDN links available.
2. Configuration
   - Create instance using create(all, config) with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number' default, 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null).
3. Chaining
   - Create chain: math.chain(value) then sequentially call functions and end with .done().
   - Example: math.chain(3).add(4).multiply(2).done() returns 14.
4. Expression Parsing
   - Evaluate using math.evaluate(expr, scope).
   - Compile with math.compile(expr) and then evaluate with .evaluate(scope).
   - Parse into expression tree with math.parse(expr) supporting toString() and toTex().
5. Extension
   - Extend library using math.import(object, {override, silent, wrap}).
6. Factory and Typed Functions
   - Create typed functions with math.typed and factory functions with math.factory(name, dependencies, create, meta).
7. Serialization
   - Serialize using JSON.stringify(object, math.replacer) and deserialize with JSON.parse(string, math.reviver).

Detailed Topics:
Installation: npm install mathjs, global usage via mathjs command line.
Configuration: Exact keys include relTol, absTol, matrix, number, precision, predictable, randomSeed. Update via math.config({ ... }).
Chaining: Use math.chain(value), operations auto prepend chain value; must conclude with done().
Expression Parsing: Use math.evaluate for direct evaluation, compile for performance on repeated evaluation, parse for obtaining expression nodes.
Extension: Import new functions and constants; options allow overriding or silent failures.
Factory/Typed: Factory functions use dependency injection for number type support; typed functions allow multiple signatures.
Serialization: Math.js data types support toJSON; use replacer and reviver for full fidelity.

## Supplementary Details
Configuration Options:
- relTol: 1e-12 (minimum relative difference for equality)
- absTol: 1e-15 (minimum absolute difference)
- matrix: 'Matrix' (default) or 'Array'
- number: 'number' (default), 'BigNumber', 'bigint', or 'Fraction'
- precision: 64 (for BigNumbers)
- predictable: false (if true, forces deterministic output types)
- randomSeed: null (set a seed value for deterministic pseudo random numbers)

Chaining Implementation Pattern:
1. Start chain with math.chain(initialValue)
2. Call sequential functions, inheriting chain value
3. End chain with .done() to retrieve computed value

Extension Implementation Pattern:
1. Use math.import with an object of new functions/values
2. Options: override (true/false), silent (true/false), wrap (true/false)

Factory Function Pattern:
- Use math.factory(name, dependencies, create, meta)
- Example: negativeSquare that returns negative of square of input

Typed Functions:
- Define multiple signatures; example for function max handling number and BigNumber types

Serialization Procedures:
- JSON.stringify(object, math.replacer) converts types such as Complex and Unit
- Use JSON.parse(string, math.reviver) to rehydrate objects

Troubleshooting Steps:
- Verify configuration via math.config() output
- For evaluation errors, inspect expression syntax with math.parse
- For import issues, check module system (CommonJS vs ES modules) and use correct syntax

## Reference Details
API Specifications:
1. math.evaluate(expr: string | Array, scope?: Object | Map) -> returns computed result (number, Complex, Matrix, etc.)
2. math.compile(expr: string | Array) -> { evaluate(scope?: Object | Map): any }
3. math.parse(expr: string | Array) -> Node with methods: compile(), toString(), toTex()
4. math.chain(value: any) -> Chain instance with all math function methods, and special methods:
   - done(): any
   - valueOf(): any
   - toString(): string

Example Code:
-------------------------------
// Node.js CommonJS usage
const { create, all } = require('mathjs');
const config = { matrix: 'Array', number: 'BigNumber', precision: 32 };
const math = create(all, config);
const result = math.evaluate('1 / 3'); // returns BigNumber with value 0.333... with precision 32
console.log(result.toString());

// Chaining example:
const chained = math.chain(3).add(4).multiply(2).done();
console.log(chained); // 14

// Extension and Import:
math.import({
  myFunc: function(name) { return 'hello, ' + name + '!'; }
}, { override: false, silent: false, wrap: false });

// Factory function example:
const negativeSquare = math.factory('negativeSquare', ['multiply','unaryMinus'], function({ multiply, unaryMinus }) {
  return function(x) {
    return unaryMinus(multiply(x, x));
  };
});
math.import(negativeSquare);
console.log(math.negativeSquare(5)); // -25

// Parser instance
const parser = math.parser();
parser.evaluate('x = 7/2');
console.log(parser.get('x')); // 3.5

// Serialization
const complexObj = math.complex('2 + 3i');
const jsonStr = JSON.stringify(complexObj, math.replacer);
const rehydrated = JSON.parse(jsonStr, math.reviver);
console.log(rehydrated.toString()); // '2+3i'
-------------------------------

Configuration Options Detail:
- relTol: number, default 1e-12, used for comparing equality
- absTol: number, default 1e-15, used for comparing equality
- matrix: string, 'Matrix' or 'Array'; influences output type
- number: string, options 'number' (default), 'BigNumber', 'bigint', 'Fraction'
- precision: number; applies only when number is 'BigNumber', default 64
- predictable: boolean; default false, forces deterministic output types
- randomSeed: any; default null, can be set to a constant seed

Troubleshooting Commands:
- Verify configuration: console.log(math.config());
- Test evaluation: math.evaluate('sqrt(16)') should yield 4
- Check imported functions: console.log(math.myFunc('user')) should return 'hello, user!'
- For chain errors, ensure chain methods are called sequentially and finished with .done()
- For parser scope issues, use parser.get('variable') to inspect current scope

## Information Dense Extract
npm install mathjs; create(all, {relTol:1e-12, absTol:1e-15, matrix:'Matrix', number:'number', precision:64, predictable:false, randomSeed:null}); math.chain(value).add().multiply().done(); math.evaluate(expr, scope?); math.compile(expr) returns { evaluate(scope?) }; math.parse(expr) returns Node with compile(), toString(), toTex(); math.import({obj}, {override:false, silent:false, wrap:false}); math.typed for multi-signature functions; factory(name, deps, create, meta?) for dependency injection; JSON.stringify(val, math.replacer) and JSON.parse(str, math.reviver) for serialization; Use parser = math.parser() with evaluate, get, set, clear, remove; Full API methods include evaluate(string|Array, scope), compile(string|Array), chain(value), config(obj), parser(), import(obj, opts).

## Sanitised Extract
Table of Contents:
1. Installation
   - Use npm install mathjs, CDN links available.
2. Configuration
   - Create instance using create(all, config) with options: relTol (1e-12), absTol (1e-15), matrix ('Matrix' or 'Array'), number ('number' default, 'BigNumber', 'bigint', 'Fraction'), precision (64), predictable (false), randomSeed (null).
3. Chaining
   - Create chain: math.chain(value) then sequentially call functions and end with .done().
   - Example: math.chain(3).add(4).multiply(2).done() returns 14.
4. Expression Parsing
   - Evaluate using math.evaluate(expr, scope).
   - Compile with math.compile(expr) and then evaluate with .evaluate(scope).
   - Parse into expression tree with math.parse(expr) supporting toString() and toTex().
5. Extension
   - Extend library using math.import(object, {override, silent, wrap}).
6. Factory and Typed Functions
   - Create typed functions with math.typed and factory functions with math.factory(name, dependencies, create, meta).
7. Serialization
   - Serialize using JSON.stringify(object, math.replacer) and deserialize with JSON.parse(string, math.reviver).

Detailed Topics:
Installation: npm install mathjs, global usage via mathjs command line.
Configuration: Exact keys include relTol, absTol, matrix, number, precision, predictable, randomSeed. Update via math.config({ ... }).
Chaining: Use math.chain(value), operations auto prepend chain value; must conclude with done().
Expression Parsing: Use math.evaluate for direct evaluation, compile for performance on repeated evaluation, parse for obtaining expression nodes.
Extension: Import new functions and constants; options allow overriding or silent failures.
Factory/Typed: Factory functions use dependency injection for number type support; typed functions allow multiple signatures.
Serialization: Math.js data types support toJSON; use replacer and reviver for full fidelity.

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATHJS

# MATHJS DOCUMENTATION

## Installation

- Install via npm: npm install mathjs
- Global installation: npm install -g mathjs
- CDN links available (unpkg, cdnjs, jsDelivr, PageCDN)

## Configuration

Create a mathjs instance with custom config:

-------------------------------
// Import and create instance
import { create, all } from 'mathjs'

const config = {
  relTol: 1e-12,            // Relative tolerance for equality tests (default 1e-12)
  absTol: 1e-15,            // Absolute tolerance for equality tests (default 1e-15)
  matrix: 'Matrix',         // Output type: 'Matrix' or 'Array'; default 'Matrix'
  number: 'number',         // Numeric type: 'number', 'BigNumber', 'bigint', or 'Fraction'
  precision: 64,            // Significant digits for BigNumbers (default 64)
  predictable: false,       // If true, output types depend solely on input types
  randomSeed: null          // Seed for RNG; set to a value for deterministic results
}

const math = create(all, config)

// Update configuration
math.config({
  number: 'BigNumber'
})
-------------------------------

## Chaining

Chaining allows sequential operations using math.chain:

-------------------------------
// Chaining example
math.chain(3)
    .add(4)        // adds 4
    .multiply(2)   // multiplies result by 2
    .done()        // returns 14

// Matrix example
math.chain([[1, 2], [3, 4]])
    .subset(math.index(0, 0), 8)  // updates element
    .multiply(3)
    .done()  // returns updated matrix
-------------------------------

## Expression Parsing and Evaluation

Three primary methods:

1. Evaluate: math.evaluate(expr, [scope])
   - Example: math.evaluate('sqrt(3^2 + 4^2)') returns 5
   - Can accept scope as an Object or Map for variables

2. Compile: math.compile(expr)
   - Returns a code object with .evaluate(scope?) method
   - Example: const code = math.compile('sqrt(3^2 + 4^2)'); code.evaluate();

3. Parse: math.parse(expr)
   - Returns an expression tree; node.compile() to create executable code
   - Supports toString() and toTex() for exports

Additionally, a parser instance can be created:

-------------------------------
// Parser instance usage
const parser = math.parser()
parser.evaluate('x = 7/2')    // sets x = 3.5
parser.evaluate('f(x, y) = x^y') // defines function f
let result = parser.evaluate('f(2, 3)') // returns 8
-------------------------------

## Extension and Importing Functions

- Extend math.js using math.import({ ... }, options)
- Options:
    override (boolean): Overwrite existing functions (default false)
    silent (boolean): Suppress errors on duplicates (default false)
    wrap (boolean): Wrap functions to convert types, default false

-------------------------------
// Example extension
math.import({
  myvalue: 42,
  hello: function(name) {
    return 'hello, ' + name + '!'
  }
}, { override: false, silent: false, wrap: false })
-------------------------------

## Factory and Typed Functions

### Typed Functions

-------------------------------
// Create a typed function for max
const max = math.typed('max', {
  'number, number': function(a, b) { return Math.max(a, b) },
  'BigNumber, BigNumber': function(a, b) { return a.greaterThan(b) ? a : b }
})
-------------------------------

### Factory Functions

- Syntax: factory(name, dependencies, create, meta?)
- Example for negativeSquare:

-------------------------------
const name = 'negativeSquare'
const dependencies = ['multiply', 'unaryMinus']
const createNegativeSquare = math.factory(name, dependencies, function ({ multiply, unaryMinus }) {
  return function negativeSquare(x) {
    return unaryMinus(multiply(x, x))
  }
})

// Using the factory
const mathInstance = create(all)
mathInstance.import(createNegativeSquare)
mathInstance.evaluate('negativeSquare(4)') // returns -16
-------------------------------

## Serialization

Serialize math.js data types using JSON.stringify with math.replacer and deserialize using JSON.parse with math.reviver

-------------------------------
const complexVal = math.complex('2 + 3i')
const str = JSON.stringify(complexVal, math.replacer)
const deserialized = JSON.parse(str, math.reviver)
-------------------------------

## Detailed API Functions

- math.evaluate(expr[, scope]) -> number | Complex | Matrix | BigNumber | etc.
- math.compile(expr) -> { evaluate(scope?): any }
- math.parse(expr) -> Node { compile(): { evaluate(scope?): any }, toString(): string, toTex(): string }
- math.chain(value) -> Chain with methods: add, subtract, multiply, done(), valueOf(), toString()
- math.import(obj, options?) -> void
- math.config(configObj) -> Object (updated configuration)
- math.parser() -> Parser instance with methods: evaluate, get, set, clear, remove, getAll, getAllAsMap

## Troubleshooting Procedures

1. If configuration changes do not apply:
   - Verify instance creation with create(all, config)
   - Check math.config() output for correct properties

2. For incorrect evaluation results:
   - Confirm that expressions use correct syntax (e.g., '^' for power, no need for math. prefix)
   - Use math.parse to inspect expression tree

3. Command-line usage:
   - Run: mathjs <expression> e.g., mathjs 'sqrt(4)'

4. For module import issues:
   - Ensure proper ES module or CommonJS syntax:
     CommonJS: const { sqrt } = require('mathjs')
     ES Module: import { sqrt } from 'mathjs'


## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: MIT License
- Crawl Date: 2025-04-28T21:47:54.556Z
- Data Size: 6109837 bytes
- Links Found: 12670

## Retrieved
2025-04-28
