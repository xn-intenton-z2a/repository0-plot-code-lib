# MATH_JS

## Crawl Summary
Math.js provides a comprehensive set of capabilities for mathematical operations in JavaScript. Key technical points include: installation via npm, configuration via options such as relTol (1e-12), absTol (1e-15), matrix type, number type (with options 'number', 'BigNumber', 'bigint', 'Fraction'), precision, predictable output, and randomSeed settings. The library supports expression evaluation (using evaluate, compile, parse), chaining of operations via math.chain, extension via math.import (supporting overrides, silence, and wrapping), advanced typed function creation (using math.typed), factory functions for dependency injection, and full support for JSON serialization with math.replacer and math.reviver. Additionally, complete operator support (arithmetic, logical, bitwise, relational) is provided with strict operator precedence.

## Normalised Extract
# Normalised Extract

## Table of Contents

1. Getting Started & Installation
   - npm install commands
   - Usage in Node.js, ES Modules, and Browser

2. Configuration Options
   - Available settings: relTol, absTol, matrix, number, numberFallback, precision, predictable, randomSeed
   - Code example on configuring math.js instance

3. Expression Parsing & Evaluation
   - Methods: math.evaluate(), math.compile(), math.parse(), and parser API
   - Example code with scope

4. Chaining Operations
   - Creating chains with math.chain(value)
   - Methods: add, subtract, multiply, done
   - Example with matrix operations

5. Extension Mechanisms
   - Importing new functions and values using math.import() and its options
   - Typed functions creation with math.typed
   - Factory functions: factory(name, dependencies, create, meta?)
   - Code examples for each

6. Serialization
   - Using JSON.stringify with math.replacer
   - Deserialization with math.reviver
   - Example code

7. Operators & Precedence
   - Detailed operator table (e.g., +, -, *, /, ^, factorial, etc.) with associativity
   - Examples for each operator

8. API Specifications
   - Method signatures for evaluate, compile, parse, parser API, chaining API, and factory functions

## Detailed Technical Information

**Installation & Usage:**

- Install math.js via npm:

  `npm install mathjs`

- Node.js usage example:

  ```js
  const { sqrt, evaluate } = require('mathjs');
  console.log(sqrt(-4).toString()); // '2i'
  ```

- ES Module usage example:

  ```js
  import { create, all, sqrt } from 'mathjs';
  const math = create(all, {});
  console.log(sqrt(-4).toString()); // '2i'
  ```

- Browser usage:

  ```html
  <script src="math.js"></script>
  <script>
    console.log(math.sqrt(-4).toString()); // '2i'
  </script>
  ```

**Configuration Options:**

```js
const config = {
  relTol: 1e-12,
  absTol: 1e-15,
  matrix: 'Array', // or 'Matrix'
  number: 'BigNumber', // or 'number', 'bigint', 'Fraction'
  numberFallback: 'number',
  precision: 64,
  predictable: false,
  randomSeed: null
};
const math = create(all, config);
```

**Expression Parsing & Evaluation:**

```js
// Direct evaluation
console.log(math.evaluate('sqrt(3^2 + 4^2)')); // 5

// Compile expression for repeated use
const code = math.compile('sqrt(3^2 + 4^2)');
console.log(code.evaluate());

// Parsing an expression
const node = math.parse('sqrt(3^2 + 4^2)');
console.log(node.compile().evaluate());

// Using a persistent parser
const parser = math.parser();
parser.evaluate('x = 7/2');
console.log(parser.get('x')); // 3.5
```

**Chaining Operations:**

```js
const result = math.chain(3)
  .add(4)
  .subtract(2)
  .done();
console.log(result); // 5
```

**Extension Mechanisms:**

- Import example:

```js
math.import({
  myvalue: 42,
  hello: function(name) {
    return 'hello, ' + name + '!';
  }
});
```

- Typed function example:

```js
const max = math.typed('max', {
  'number, number': (a, b) => Math.max(a, b),
  'BigNumber, BigNumber': (a, b) => a.greaterThan(b) ? a : b
});
```

- Factory function example:

```js
import { factory } from 'mathjs';
const negativeSquare = factory('negativeSquare', ['multiply', 'unaryMinus'], ({ multiply, unaryMinus }) => {
  return function(x) {
    return unaryMinus(multiply(x, x));
  };
});

// Use directly or import into math instance
```

**Serialization:**

```js
const x = math.complex('2 + 3i');
const jsonString = JSON.stringify(x, math.replacer);
const parsedObject = JSON.parse(jsonString, math.reviver);
```

**Operators & Precedence:**

Operators include +, -, *, /, ^ (power), ! (factorial), and element-wise versions (.*, ./, .^). Full examples:

```js
console.log(math.evaluate('2 + 3'));  // 5
console.log(math.evaluate('2 ^ 3'));    // 8
console.log(math.evaluate('(2 + 3) * 4')); // 20
```

**API Specifications:** Refer to the next section in the reference details for complete SDK method signatures.


## Supplementary Details
# Supplementary Details

## Configuration Options Detailed

- **relTol (number):**
  - Description: Minimum relative tolerance for equality comparisons.
  - Default: 1e-12

- **absTol (number):**
  - Description: Minimum absolute tolerance for equality comparisons.
  - Default: 1e-15

- **matrix (string):**
  - Description: Default matrix type for output. Determines if output is a 'Matrix' object or an ordinary 'Array'.
  - Options: 'Matrix', 'Array'
  - Default: 'Matrix'

- **number (string):**
  - Description: Numeric type used internally and for parsing inputs.
  - Options: 'number', 'BigNumber', 'bigint', 'Fraction'
  - Default: 'number'

- **numberFallback (string):**
  - Description: Fallback type if the desired type (e.g. bigint) cannot represent a given value.
  - Options: 'number', 'BigNumber'
  - Default: 'number'

- **precision (number):**
  - Description: Maximum number of significant digits for BigNumbers.
  - Default: 64

- **predictable (boolean):**
  - Description: Whether output types are strictly determined by input types.
  - Default: false

- **randomSeed (any):**
  - Description: Seed value for deterministic pseudo-random number generation.
  - Default: null

## Implementation Patterns

- **Initialization:** Always configure math.js with explicit configuration to guarantee consistent behavior for different numeric types.
- **Using the Parser:** Create a persistent parser instance with `math.parser()` to manage scopes and variables across multiple evaluations.
- **Chaining:** For concise calculations, use `math.chain(value)` to chain successive operations and finalize with `done()`.
- **Extension:** Use `math.import()` for adding custom functions or overriding existing ones, with options like `override`, `silent`, and `wrap` to control behavior.

## Best Practices

- Use explicit configuration when precision or numeric type consistency is required.
- Precompile frequently used expressions to enhance performance.
- Always use math.replacer and math.reviver for JSON serialization to correctly handle custom math.js types.
- When extending math.js, test imported functions in both JavaScript and parser contexts.

## Troubleshooting

- **Parser Errors:** If an expression fails to parse, verify syntax (e.g. proper use of parentheses and operator precedence). Use the parser API (`math.parse`) to inspect the expression tree.
- **Configuration Mismatches:** If unexpected types appear (for example, a number instead of a BigNumber), check the current configuration via `math.config()` and ensure the correct settings were applied.
- **Chain Interruptions:** Ensure that chaining method calls are properly connected; avoid inserting unrelated statements between chained calls.
- **Serialization Issues:** If JSON serialization of special numbers (e.g. Infinity) fails, always pass `math.replacer` to JSON.stringify.

Example troubleshooting command:

```
// Check current configuration and type settings
console.log(math.config());

// Example output:
// {
//   relTol: 1e-12,
//   absTol: 1e-15,
//   matrix: 'Matrix',
//   number: 'number',
//   precision: 64,
//   predictable: false,
//   randomSeed: null
// }
```


## Reference Details
# Reference Details

## Complete API Specifications

### Expression Evaluation

- **math.evaluate(expr: string): any**
  - Description: Evaluates the expression `expr` and returns the result.
  - Parameters:
    - `expr` (string): The expression to evaluate.
  - Returns: `any` - the numeric, complex or unit result.
  - Exceptions: Throws error if expression syntax is invalid.

- **math.evaluate(expr: string, scope: Object | Map): any**
  - Description: Evaluates the expression `expr` within the provided scope.
  - Parameters:
    - `expr` (string): Expression to evaluate.
    - `scope` (Object | Map): Mapping of variable names to values.
  - Returns: `any`.

### Expression Compilation

- **math.compile(expr: string): { evaluate(scope?: Object | Map): any }**
  - Description: Compiles an expression for repeated evaluations.
  - Parameters:
    - `expr` (string): The expression to compile.
  - Returns: An object with an `evaluate` method.

### Expression Parsing

- **math.parse(expr: string): Node**
  - Description: Parses the expression and returns a node tree.
  - Parameters:
    - `expr` (string): Expression to parse.
  - Returns: `Node` (the root of the expression tree).

### Parser API

- **math.parser(): Parser**

The returned Parser object has the following methods:

```
// Evaluate an expression
parser.evaluate(expr: string): any;

// Retrieve a variable or function
parser.get(name: string): any;

// Set a variable or function
parser.set(name: string, value: any): void;

// Remove a variable or function
parser.remove(name: string): void;

// Get all defined symbols
parser.getAll(): Object;

// Clear the parser's scope
parser.clear(): void;
```

### Chaining API

- **math.chain(value: any): Chain**
  - Returns a Chain object that supports all math functions.

Chain Object Methods:

```
Chain.add(x: any): Chain;
Chain.subtract(x: any): Chain;
Chain.multiply(x: any): Chain;
Chain.divide(x: any): Chain;
Chain.done(): any;       // Finalizes and returns the result
Chain.valueOf(): any;    // Synonym for done()
Chain.toString(): string; // Returns formatted string representation
```

### Extension via Import

- **math.import(functions: Object | Array, options?: { override?: boolean, silent?: boolean, wrap?: boolean }): void**
  - Imports new functions or constants into the math.js instance.
  - Parameters:
    - `functions`: An object or an array of factory functions.
    - `options` (optional): Configuration options for import.

Example:

```
math.import({
  myFunc: function(a, b) { return a + b; }
}, { override: false, silent: false, wrap: false });
```

### Typed Functions

- **math.typed(name: string, signatures: Object): Function**
  - Creates a function that supports multiple type signatures.

Example:

```
const max = math.typed('max', {
  'number, number': function(a, b) { return Math.max(a, b); },
  'BigNumber, BigNumber': function(a, b) { return a.greaterThan(b) ? a : b; }
});
```

### Factory Functions

- **factory(name: string, dependencies: string[], create: Function, meta?: Object): Function**
  - Creates a new function with injected dependencies.

Example:

```
const negativeSquare = factory('negativeSquare', ['multiply', 'unaryMinus'], function({ multiply, unaryMinus }) {
  return function(x: number): number {
    return unaryMinus(multiply(x, x));
  };
});
```

### Serialization

- **JSON.stringify(value, math.replacer): string**
  - Serializes math.js types using a custom replacer to maintain type fidelity.

- **JSON.parse(jsonString, math.reviver): any**
  - Deserializes JSON strings and reconstructs math.js types.

Example:

```
const complexVal = math.complex('2 + 3i');
const jsonStr = JSON.stringify(complexVal, math.replacer);
const restored = JSON.parse(jsonStr, math.reviver);
```

## Detailed Code Examples with Comments

```js
// Example: Creating a math.js instance with custom configuration
import { create, all } from 'mathjs';

const config = {
  relTol: 1e-12,
  absTol: 1e-15,
  matrix: 'Array',
  number: 'BigNumber',
  precision: 32,
  predictable: false,
  randomSeed: null
};

const math = create(all, config);
console.log('Current config:', math.config());

// Evaluating an expression with scope
const scope = { a: 3, b: 4 };
const result = math.evaluate('sqrt(a^2 + b^2)', scope);
console.log('Hypotenuse:', result); // Expected output: 5

// Using the parser
const parser = math.parser();
parser.evaluate('x = 10');
console.log('Value of x:', parser.get('x'));

// Chaining operations
const chainResult = math.chain(5)
  .multiply(2)
  .subtract(3)
  .done();
console.log('Chain result:', chainResult); // Expected: 7

// Importing an external function
math.import({
  greet: function(name) { return `Hello, ${name}!`; }
});
console.log(math.greet('Developer'));

// Serialization and Deserialization
const complexNum = math.complex('2 + 3i');
const serialized = JSON.stringify(complexNum, math.replacer);
const deserialized = JSON.parse(serialized, math.reviver);
console.log('Deserialized complex:', deserialized.toString());
```

## Troubleshooting Procedures

1. **Parser Error Handling:**
   - Command: `math.parse('invalid_expression')`
   - Expected: Error message indicating a syntax error with details on token position.

2. **Configuration Verification:**
   - Command: `console.log(math.config());`
   - Expected: Object displaying current configuration options with their default or set values.

3. **Chain Operation Failures:**
   - Ensure method calls are chained directly. For example, avoid:
     ```js
     let chain = math.chain(3);
     chain.add(4);
     // Incorrect: breaking the chain without immediate continuation
     chain.subtract(2).done();
     ```
   - Correct Pattern:
     ```js
     math.chain(3).add(4).subtract(2).done();
     ```

4. **Serialization Issues:**
   - When special numeric values (e.g. Infinity) are serialized, always pass `math.replacer` to avoid loss of type data.
   - Command:
     ```js
     JSON.stringify(Infinity, math.replacer);
     ```
   - Expected: Correct JSON representation rather than null.

---

Developers can directly use these API specifications, code examples, and detailed configuration options to implement and troubleshoot applications using math.js without referring to external documentation.


## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATH_JS

# Math.js Documentation Digest

**Retrieved Date:** 2023-10-26
**Data Size:** 5364907 bytes

---

# Overview

Math.js is an extensive math library for JavaScript and Node.js. It offers a flexible expression parser with support for symbolic computation, a wide range of built-in functions and constants, and native support for data types such as numbers, BigNumbers, bigints, Complex numbers, Fractions, Units, and Matrices.

---

# Table of Contents

1. Getting Started & Installation
2. Configuration Options
3. Expression Parsing & Evaluation
4. Chaining Operations
5. Extension Mechanisms
   - Importing Functions and Values
   - Typed Functions
   - Factory Functions
6. Serialization
7. Operators & Precedence
8. API Specifications

---

# 1. Getting Started & Installation

**Installation via npm:**

```
npm install mathjs
```

For global installation:

```
npm install -g mathjs
```

**Usage in Node.js (CommonJS):**

```
const { sqrt, evaluate } = require('mathjs');
console.log(sqrt(-4).toString()); // Output: 2i
```

**Usage in ES Modules:**

```
import { create, all, sqrt } from 'mathjs';

const config = {};
const math = create(all, config);
console.log(sqrt(-4).toString()); // Output: 2i
```

**Browser Usage:**

Include the script in HTML:

```
<script src="math.js" type="text/javascript"></script>
<script>
  console.log(math.sqrt(-4).toString()); // Output: 2i
</script>
```

---

# 2. Configuration Options

Math.js can be configured at initialization or modified later. The following options are available:

- **relTol**: Minimum relative difference for equality testing. _Default_: `1e-12`.
- **absTol**: Minimum absolute difference for equality testing. _Default_: `1e-15`.
- **matrix**: Default output type for matrix functions. _Options_: `'Matrix'` (default) or `'Array'`.
- **number**: Type used to parse numeric values. _Options_: `'number'` (default), `'BigNumber'`, `'bigint'`, or `'Fraction'`.
- **numberFallback**: Fallback type if a value cannot be represented in the configured type. _Default_: `'number'`.
- **precision**: Maximum significant digits for BigNumbers. _Default_: `64`.
- **predictable**: When `true`, output types are strictly derived from input types. _Default_: `false`.
- **randomSeed**: Seed value for deterministic pseudo-random generation. _Default_: `null`.

**Example Code (Node.js):**

```
import { create, all } from 'mathjs';

const config = {
  relTol: 1e-12,
  absTol: 1e-15,
  matrix: 'Array',
  number: 'BigNumber',
  precision: 32,
  predictable: false,
  randomSeed: null
};

const math = create(all, config);
console.log(math.config());
// Modify configuration at runtime
math.config({ matrix: 'Matrix' });
```

---

# 3. Expression Parsing & Evaluation

Math.js provides multiple methods for working with expressions:

**Evaluate Directly:**

```
// Evaluate a single expression
math.evaluate('sqrt(3^2 + 4^2)'); // Returns 5

// Evaluate with a scope
const scope = { a: 3, b: 4 };
math.evaluate('a * b', scope); // Returns 12
```

**Compile Expression:**

```
const code = math.compile('sqrt(3^2 + 4^2)');
console.log(code.evaluate()); // Returns 5
```

**Parse Expression:**

```
const node = math.parse('sqrt(3^2 + 4^2)');
const compiled = node.compile();
console.log(compiled.evaluate()); // Returns 5
```

**Parser Instance:**

```
const parser = math.parser();
parser.evaluate('x = 7/2');
console.log(parser.get('x')); // 3.5
parser.clear();
```

---

# 4. Chaining Operations

Math.js supports chaining to perform sequential operations:

```
const result = math.chain(3)
                  .add(4)
                  .subtract(2)
                  .done();
// result: 5
```

For matrix operations:

```
const resultMatrix = math.chain([[1, 2], [3, 4]])
                      .subset(math.index(0, 0), 8)
                      .multiply(3)
                      .done();
// resultMatrix: [[24, 6], [9, 12]]
```

**Chain API Methods:**

- `done()` or `valueOf()`: Finalizes the chain and returns the value.
- `toString()`: Returns a formatted string of the chain's value.

---

# 5. Extension Mechanisms

## 5.1 Importing Functions and Values

Use `math.import()` to add custom functions or values:

```
math.import({
  myvalue: 42,
  hello: function (name) {
    return 'hello, ' + name + '!';
  }
});

// Usage in expressions and parser
math.myvalue * 2;  // 84
math.hello('user');  // 'hello, user!'
```

Options for `import` include:

- `override` (boolean): Overwrite existing functions. Default: `false`.
- `silent` (boolean): Suppress errors on duplicates or invalid types. Default: `false`.
- `wrap` (boolean): Wrap functions to convert data types (e.g. Matrix to Array). Default: `false`.

## 5.2 Typed Functions

Define functions with multiple signatures using `math.typed`:

```
const max = math.typed('max', {
  'number, number': function (a, b) {
    return Math.max(a, b);
  },
  'BigNumber, BigNumber': function (a, b) {
    return a.greaterThan(b) ? a : b;
  }
});
```

Extend data types by adding new type tests and functions:

```
function MyType(value) {
  this.value = value;
}
MyType.prototype.isMyType = true;

math.typed.addType({
  name: 'MyType',
  test: function (x) { return x && x.isMyType; }
});

const add = math.typed('add', {
  'MyType, MyType': function (a, b) {
    return new MyType(a.value + b.value);
  }
});

math.import({ add: add });
```

## 5.3 Factory Functions

Factory functions allow dependency injection:

```
import { factory, create, all } from 'mathjs';

const name = 'negativeSquare';
const dependencies = ['multiply', 'unaryMinus'];
const createNegativeSquare = factory(name, dependencies, function ({ multiply, unaryMinus }) {
  return function negativeSquare(x) {
    return unaryMinus(multiply(x, x));
  };
});

// Direct use
const negativeSquare = createNegativeSquare({
  multiply: (a, b) => a * b,
  unaryMinus: (a) => -a
});
console.log(negativeSquare(3)); // -9

// Import into a math.js instance
const mathInstance = create(all);
mathInstance.import(createNegativeSquare);
console.log(mathInstance.negativeSquare(4)); // -16
```

---

# 6. Serialization

Math.js data types (e.g. Matrix, Complex, Unit) support JSON serialization:

**Serializing:**

```
const complexVal = math.complex('2 + 3i');
const str = JSON.stringify(complexVal, math.replacer);
// Output: '{"mathjs":"Complex","re":2,"im":3}'
```

**Deserializing:**

```
const json = '{"mathjs":"Unit","value":5,"unit":"cm","fixPrefix":false}';
const unitVal = JSON.parse(json, math.reviver);
// unitVal: Unit 5 cm
```

---

# 7. Operators & Precedence

Math.js supports common operators with the following examples:

- **Addition:** `2 + 3` yields `5`
- **Multiplication:** `2 * 3` yields `6`
- **Exponentiation:** `2 ^ 3` yields `8` (right-associative)
- **Matrix Transpose:** `[[1,2],[3,4]]'` yields `[[1,3],[2,4]]`

The full list includes grouping, matrix indexing, property access, arithmetic (+, -, *, /), percentage, modulus, power (`^` and `.^`), factorial (`!`), bitwise operations, relational operators, logical operators, assignment (`=`), conditional (`? :`), and range (`:`).

Operators are evaluated based on precedence; for a complete list, refer to the documentation sections on operators and precedence.

---

# 8. API Specifications

Below are key API method signatures and their details:

**Expression Evaluation:**

```
// Evaluate an expression
math.evaluate(expr: string): any;
math.evaluate(expr: string, scope: Object | Map): any;

// Compile an expression
const code = math.compile(expr: string);
code.evaluate(scope?: Object | Map): any;

// Parse an expression into a node tree
const node = math.parse(expr: string);
node.compile(): { evaluate(scope?: Object | Map): any };
```

**Parser API:**

```
const parser = math.parser();
parser.evaluate(expr: string): any;
parser.get(name: string): any;
parser.set(name: string, value: any): void;
parser.remove(name: string): void;
parser.getAll(): Object;
parser.clear(): void;
```

**Chaining API:**

```
math.chain(value: any): Chain;
// Chain methods:
Chain.add(value: any): Chain;
Chain.subtract(value: any): Chain;
Chain.multiply(value: any): Chain;
Chain.divide(value: any): Chain;
Chain.done(): any;
Chain.valueOf(): any;
Chain.toString(): string;
```

**Factory Function API:**

```
factory(name: string, dependencies: string[], create: Function, meta?: Object): Function;

// Example:
const negativeSquare = factory('negativeSquare', ['multiply', 'unaryMinus'], function({ multiply, unaryMinus }) {
  return function(x: number): number {
    return unaryMinus(multiply(x, x));
  };
});
```


## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: Apache-2.0
- Crawl Date: 2025-04-21T12:58:17.154Z
- Data Size: 5364907 bytes
- Links Found: 11017

## Retrieved
2025-04-21
