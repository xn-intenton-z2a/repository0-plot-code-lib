# MATH_JS

## Crawl Summary
Installation via npm or CDN; core functions include evaluate, compile, parse, chain; configuration options (relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix', number: 'number', precision: 64, predictable: false, randomSeed: null); extension via import with options (override, silent, wrap); support for serialization using math.replacer and reviver; detailed expression parser and operator precedence provided.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs, CDN links remain exact
2. Configuration Options
   - relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix' or 'Array', number: 'number', 'BigNumber', 'bigint', 'Fraction', precision: 64 (default; e.g., 32 for BigNumbers), predictable: false, randomSeed: null
3. Core API Methods
   - math.evaluate(expr[, scope]) returns evaluated result
   - math.compile(expr) returns an object with evaluate([scope])
   - math.parse(expr) returns an expression tree node with compile, toString, toTex
   - math.parser() returns a parser with methods set, get, clear, remove
4. Chaining
   - math.chain(value) creates a chain; methods: add, subtract, multiply, done()
5. Import and Extension
   - math.import(functions, {override: boolean, silent: boolean, wrap: boolean})
6. Serialization
   - JSON.stringify(data, math.replacer) and JSON.parse(json, math.reviver)
7. Expression Syntax and Operators
   - Detailed operator list: +, -, *, /, ^, .' and factorial (!), with defined precedence

Each section provides exact code examples and detailed parameter values for immediate implementation.

## Supplementary Details
Configuration example:
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

Chaining Example:
math.chain(3)
    .add(4)
    .multiply(2)
    .done(); // returns 14

Expression Evaluation:
const result = math.evaluate('sqrt(3^2 + 4^2)'); // returns 5

Import Example:
math.import({
  myvalue: 42,
  hello: function(name) { return 'hello, ' + name + '!'; }
}, { override: false, silent: false, wrap: false });

Serialization Example:
const x = math.complex('2+3i');
const jsonStr = JSON.stringify(x, math.replacer);
const restored = JSON.parse(jsonStr, math.reviver);

Detailed configuration options with defaults and effects are provided. API methods include exact parameter types (e.g., string for expression, Object or Map for scope) and return type descriptions.

## Reference Details
API Specifications:

1. math.evaluate(expr: string, scope?: Object|Map): any
   - Evaluates an expression string with optional scope. Throws error if expression contains blacklisted symbols.

2. math.compile(expr: string): { evaluate(scope?: Object|Map): any }
   - Compiles an expression for repeated evaluations.

3. math.parse(expr: string): Node
   - Returns a Node representing the parsed expression. Node methods: compile(), toString(), toTex().

4. math.chain(value: any): Chain
   - Returns a Chain object with methods:
       done(): any   // Finalize and return the value
       valueOf(): any
       toString(): string
       Chain supports all math namespace functions where the chain's value is passed as first argument.

5. math.import(functions: Object|Array, options?: { override?: boolean, silent?: boolean, wrap?: boolean }): void
   - Imports functions/constants. override defaults to false, silent to false, wrap to false.

6. math.config(options: Object): Object
   - Sets configuration options. Options include:
       relTol: number (default 1e-12)
       absTol: number (default 1e-15)
       matrix: 'Matrix'|'Array' (default 'Matrix')
       number: 'number'|'BigNumber'|'bigint'|'Fraction' (default 'number')
       precision: number (default 64, applicable for BigNumbers)
       predictable: boolean (default false)
       randomSeed: any (default null)

Code Examples with comments are embedded above. 

Implementation Pattern:
- Create math instance: const math = create(all, config);
- Evaluate expressions repeatedly with compile and parse.
- Extend functionality using math.import.
- Manage chain operations with math.chain.

Troubleshooting Procedures:
- If incorrect types occur, check configuration (e.g., 'number' vs 'BigNumber').
- Use math.replacer with JSON.stringify to avoid serialization issues with Infinity.
- For complex expressions, first parse with math.parse(expr) to debug structure.

Commands:
- npm install mathjs
- In Node.js, require or import the module as shown in examples.

Return types, parameter types, and potential exceptions (e.g., parsing errors) are handled by the library, following JavaScript error conventions.

## Information Dense Extract
npm install mathjs; CDN: unpkg, cdnjs, jsDelivr; API: math.evaluate(string, [scope]) -> any; math.compile(string) -> { evaluate([scope]) }; math.parse(string) -> Node (methods: compile(), toString(), toTex()); math.chain(value) -> Chain (methods: done(), valueOf(), toString()); math.import(object, {override:boolean, silent:boolean, wrap:boolean}); math.config({relTol:1e-12, absTol:1e-15, matrix:'Matrix'|'Array', number:'number'|'BigNumber'|'bigint'|'Fraction', precision:64, predictable:false, randomSeed:null}); Expression parser supports infix notation with operators: +, -, *, /, ^, %, !, etc.; Operator precedence strictly defined; JSON serialization using math.replacer and math.reviver; Detailed step-by-step examples provided for chaining, import, configuration, and expression evaluation.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - npm install mathjs, CDN links remain exact
2. Configuration Options
   - relTol: 1e-12, absTol: 1e-15, matrix: 'Matrix' or 'Array', number: 'number', 'BigNumber', 'bigint', 'Fraction', precision: 64 (default; e.g., 32 for BigNumbers), predictable: false, randomSeed: null
3. Core API Methods
   - math.evaluate(expr[, scope]) returns evaluated result
   - math.compile(expr) returns an object with evaluate([scope])
   - math.parse(expr) returns an expression tree node with compile, toString, toTex
   - math.parser() returns a parser with methods set, get, clear, remove
4. Chaining
   - math.chain(value) creates a chain; methods: add, subtract, multiply, done()
5. Import and Extension
   - math.import(functions, {override: boolean, silent: boolean, wrap: boolean})
6. Serialization
   - JSON.stringify(data, math.replacer) and JSON.parse(json, math.reviver)
7. Expression Syntax and Operators
   - Detailed operator list: +, -, *, /, ^, .' and factorial (!), with defined precedence

Each section provides exact code examples and detailed parameter values for immediate implementation.

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATH_JS

# Installation

Install Math.js via npm: npm install mathjs

Download from CDNs (unpkg, cdnjs, jsDelivr) or create a custom bundle. The library ships with built-in TypeScript definitions.

# Core API and Usage

Math.js exposes a global math namespace containing functions and constants. Three main usage patterns:
1. Direct function calls: e.g. math.add(math.sqrt(4), 2)
2. Expression evaluation: math.evaluate('sqrt(4)+2')
3. Chaining: math.chain(3).add(4).multiply(2).done()

# Configuration

Configuration options are set via math.config() and applied on a math.js instance. Example configuration object:
  {
    relTol: 1e-12,      // Minimum relative tolerance for equality checks (default: 1e-12)
    absTol: 1e-15,      // Minimum absolute tolerance for equality checks (default: 1e-15)
    matrix: 'Matrix',   // Default matrix output ('Matrix' or 'Array')
    number: 'number',   // Number type: 'number', 'BigNumber', 'bigint', or 'Fraction'
    precision: 64,      // Significant digits for BigNumbers (default: 64)
    predictable: false, // Determines output type consistency; false returns complex numbers for sqrt(-4)
    randomSeed: null    // Seed for deterministic random number generation
  }

# Chaining

Chaining is supported using math.chain(value), allowing a series of operations to be executed sequentially, with special methods:

  done() - Finalizes the chain and returns the resulting value
  valueOf() - Alias of done()
  toString() - Returns a formatted string of the chain’s value

Example:

  math.chain(3)
      .add(4)
      .subtract(2)
      .done()  // Returns 5

# Expressions and Parsing

Math.js includes an expression parser with several interfaces:

  - math.evaluate(expr, [scope]) evaluates an expression string or array of expressions.
  - math.compile(expr) compiles an expression once and allows repeated execution with evaluate([scope]).
  - math.parse(expr) converts the expression string into an expression tree (node) that can be compiled.
  - A parser instance can be created with math.parser(), which maintains its own scope with methods get, set, clear, remove.

Example:

  const code = math.compile('sqrt(3^2 + 4^2)');
  const result = code.evaluate();  // 5

# Import and Extension

Math.js can be extended with new functions/constants using math.import(object, [options]). Available options:

  override (boolean): Overwrite existing functions (default false)
  silent (boolean): Suppress errors on duplicates/invalid types (default false)
  wrap (boolean): Wrap functions to convert types when needed (default false)

Example:

  math.import({
    myvalue: 42,
    hello: function(name) { return 'hello, ' + name + '!'; }
  });

After import, both math.evaluate and direct function calls can use these new functions.

# Serialization

Math.js data types (Matrix, Complex, Unit) can be serialized to JSON. Use math.replacer with JSON.stringify to ensure special cases (like Infinity) are handled properly. To restore from JSON, use math.reviver with JSON.parse.

Example:

  const json = JSON.stringify(x, math.replacer);
  const restored = JSON.parse(json, math.reviver);

# Detailed Expression Syntax and Operators

Supported operators include +, -, *, /, ^, and many functions. Operators have defined precedence:

  1. Grouping and indexing (parentheses, brackets)
  2. Transpose (') and Factorial (!)
  3. Exponentiation (^, .^)
  4. Unary operators (+, -, not, ~)
  5. Implicit multiplication
  6. Multiplication, Division, Modulus (% or mod)
  7. Addition and Subtraction
  8. Range (:) and Unit conversions (to, in)
  9. Shifts, Relational, Bitwise operators
  10. Logical operators (and, or, xor)
  11. Conditional (? :) and Assignment (=)

# API Examples and Method Signatures

math.evaluate(expr[, scope]) -> returns evaluated result. scope is an object or Map.

math.compile(expr) -> { evaluate(scope: Object): any } 

math.parse(expr) -> returns Node with methods compile(), toString(), toTex()

math.chain(value) -> returns Chain object with methods:
  done() -> any
  valueOf() -> any
  toString() -> string

math.import(functions: Object, [options: Object]) -> void

math.config(options: Object) -> returns current configuration

# Metadata

Attribution: Crawled from https://mathjs.org/docs/ on 

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: MIT License
- Crawl Date: 2025-04-29T13:03:21.916Z
- Data Size: 3725547 bytes
- Links Found: 7278

## Retrieved
2025-04-29
