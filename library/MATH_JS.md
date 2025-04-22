# MATH_JS

## Crawl Summary
Extracted technical details include precise installation commands, detailed configuration options (relTol, absTol, matrix type, numeric types, precision, predictable flag, randomSeed), chaining syntax and API, extension and import methods with options (override, silent, wrap), serialization/deserialization using math.replacer and math.reviver, comprehensive expression evaluation including compile and parse methods, persistent parser API (get, set, clear), full expression syntax with operators and their precedence, and advanced topics like factory and typed functions. Full code examples for Node.js, ES modules, and browser usage are provided.

## Normalised Extract
## Table of Contents
1. Installation / Download
2. Getting Started
3. Configuration
4. Chaining
5. Extension
6. Serialization
7. Expressions & Parsing
8. Parser API
9. Expression Syntax & Operators
10. Functions & Custom Functions
11. Factory & Typed Functions
12. Troubleshooting

### 1. Installation / Download
- npm install command and CDN URLs.

### 2. Getting Started
- Node.js, ES module, and Browser usage examples with code snippets.

### 3. Configuration
- Detailed parameter list:
  * relTol: number (default 1e-12)
  * absTol: number (default 1e-15)
  * matrix: string ('Matrix'|'Array')
  * number: string ('number', 'BigNumber', 'bigint', 'Fraction')
  * numberFallback: string (default 'number')
  * precision: number (default 64)
  * predictable: boolean (default false)
  * randomSeed: any (default null)

### 4. Chaining
- Usage of math.chain with methods .add(), .subtract(), .multiply(), and .done().

### 5. Extension
- Importing functions/constants with options { override, silent, wrap }.

### 6. Serialization
- JSON.stringify with math.replacer and deserialization with math.reviver.

### 7. Expressions & Parsing
- Using math.evaluate, math.compile, and math.parse with complete examples.

### 8. Parser API
- Methods: clear(), evaluate(), get(), getAll(), remove(), set(). Detailed usage examples provided.

### 9. Expression Syntax & Operators
- Differences from JavaScript, operator listing with sample expressions.

### 10. Functions & Custom Functions
- Defining functions using assignment (e.g., f(x) = x^2 - 5).

### 11. Factory & Typed Functions
- Factory function signature: factory(name: string, dependencies: string[], create: function, meta?: object).
- Typed function definition using math.typed with multiple signatures.

### 12. Troubleshooting
- Guidance on JSON serialization, resetting parser scope, and verifying configuration options with command-line examples.


## Supplementary Details
Detailed technical specifications include:
- Exact installation commands: `npm install mathjs` and global installation usage.
- Configuration options with default values and effects:
  * relTol (1e-12): Minimum relative tolerance for equality checks.
  * absTol (1e-15): Minimum absolute tolerance.
  * matrix: Determines output type; 'Matrix' returns a math.js Matrix, 'Array' returns a JavaScript Array.
  * number: Defines numeric type for parsing (default 'number', options include BigNumber, bigint, Fraction).
  * numberFallback: Fallback type if conversion fails.
  * precision (64): Significant digits for BigNumber operations.
  * predictable (false): If true, output types match input strictly.
  * randomSeed (null): Used to seed the pseudo random generator for deterministic outputs.
- Implementation steps for instance creation in Node.js, browser, and ES modules with precise code snippets.
- Troubleshooting steps include using math.replacer and math.reviver in JSON operations, resetting parser with clear(), and verifying factory function dependencies.


## Reference Details
API Specifications and Code Examples:

1. Math Functions:
   - math.round(value: number, decimals: number): number
   - math.atan2(y: number, x: number): number
   - math.sqrt(value: number|string): number|Complex // e.g., math.sqrt(-4) returns Complex('2i')
   - math.pow(matrix: Array | Matrix, exponent: number): Array | Matrix

2. Chain API:
   - math.chain(value: any): Chain
     * Chain.add(value: number): Chain
     * Chain.subtract(value: number): Chain
     * Chain.multiply(value: number): Chain
     * Chain.done(): any

3. Configuration API:
   - create(all: any, config?: Object) returns a math instance.
   - math.config(config: Object): void
   Example:
   ```javascript
   const math = create(all, {
     relTol: 1e-12,
     absTol: 1e-15,
     matrix: 'Matrix',
     number: 'number',
     precision: 64,
     predictable: false,
     randomSeed: null
   });
   ```

4. Parser API:
   - math.parser(): Parser
     * Parser.evaluate(expr: string): any
     * Parser.get(name: string): any
     * Parser.set(name: string, value: any): void
     * Parser.clear(): void

5. Factory Function API:
   - factory(name: string, dependencies: string[], create: Function, meta?: Object): Function
   Example:
   ```javascript
   const createNegativeSquare = factory('negativeSquare', ['multiply', 'unaryMinus'], ({ multiply, unaryMinus }) => {
     return function negativeSquare(x) {
       return unaryMinus(multiply(x, x));
     };
   });
   ```

6. Troubleshooting Procedures:
   - For JSON serialization issues:
     Use: JSON.stringify(object, math.replacer) and JSON.parse(jsonString, math.reviver).
   - To reset the parser scope in case of stale variable issues:
     ```javascript
     const parser = math.parser();
     parser.clear();
     ```
   - Command-line test for basic functionality:
     ```bash
     node -e "const { create, all } = require('mathjs'); const math = create(all); console.log(math.sqrt(-4).toString());"
     ```
     Expected output: 2i

Full SDK method signatures with parameter types, return types and exceptions are embedded in the examples above. Best practices include explicit configuration, use of math.replacer/math.reviver for JSON operations, and clearing the parser scope for consistent results.


## Original Source
Math.js Documentation
https://mathjs.org/docs/index.html

## Digest of MATH_JS

# Math.js Documentation

*Date Retrieved: 2023-11-24*

## Overview
Math.js is an extensive math library for JavaScript and Node.js. It provides a flexible expression parser supporting symbolic computation and a large set of built-in functions and constants. It operates with various data types including numbers, BigNumbers, complex numbers, fractions, units, and matrices.

## Table of Contents
1. Installation / Download
2. Getting Started
3. Configuration
4. Chaining
5. Extension
6. Serialization
7. Expressions & Parsing
8. Parser API
9. Expression Syntax & Operators
10. Functions & Custom Functions
11. Factory & Typed Functions
12. Troubleshooting

## 1. Installation / Download
- **npm Installation:**
  ```bash
  npm install mathjs
  ```
- **Global/CLI Usage:** Install with `-g` to use the command line application `mathjs`.
- **CDN Links:**
  - unpkg: `https://unpkg.com/mathjs@14.4.0/`
  - cdnjs: `https://cdnjs.com/libraries/mathjs`
  - jsDelivr: `https://www.jsdelivr.com/package/npm/mathjs`

## 2. Getting Started
### Node.js Example
```javascript
const { create, all } = require('mathjs');
const math = create(all);
console.log(math.sqrt(-4).toString()); // Outputs: 2i
```

### ES Modules Example
```javascript
import { sqrt } from 'mathjs';
console.log(sqrt(-4).toString()); // Outputs: 2i
```

### Browser Example
```html
<!DOCTYPE HTML>
<html>
  <head>
    <script src="math.js" type="text/javascript"></script>
  </head>
  <body>
    <script type="text/javascript">
      console.log(math.sqrt(-4).toString()); // Outputs: 2i
    </script>
  </body>
</html>
```

## 3. Configuration
### Creating an Instance with Custom Options
```javascript
import { create, all } from 'mathjs';

const config = {
  relTol: 1e-12,       // Default: 1e-12
  absTol: 1e-15,       // Default: 1e-15
  matrix: 'Matrix',    // Options: 'Matrix' (default) or 'Array'
  number: 'number',    // Options: 'number' (default), 'BigNumber', 'bigint', 'Fraction'
  numberFallback: 'number', // Fallback type if conversion fails
  precision: 64,       // Default for BigNumber precision
  predictable: false,  // When true, output type is strictly based on input types
  randomSeed: null     // Seed for deterministic pseudo random numbers
};

const math = create(all, config);

// Reading and updating configuration
console.log(math.config());
math.config({ number: 'BigNumber' });
```

## 4. Chaining
### Using Chain Operations
```javascript
// Simple chaining
math.chain(3)
    .add(4)
    .multiply(2)
    .done(); // Returns: 14

// Chaining with matrices
math.chain([[1, 2], [3, 4]])
    .subset(math.index(0, 0), 8)
    .multiply(3)
    .done(); // Returns: [[24, 6], [9, 12]]
```

## 5. Extension
### Importing New Functions & Constants
```javascript
import { create, all } from 'mathjs';

const math = create(all);

// Importing functions and variables
math.import({
  myvalue: 42,
  hello: function(name) {
    return 'hello, ' + name + '!';
  }
});

// Usage
console.log(math.myvalue * 2);        // 84
console.log(math.hello('user'));        // 'hello, user!'
```

### Import Options
- **override:** (boolean) Overwrites existing functions if true. Default: false.
- **silent:** (boolean) No errors on duplicates if true. Default: false.
- **wrap:** (boolean) Wraps imported functions to convert types (e.g., Matrix to Array). Default: false.

## 6. Serialization
### Serializing Math.js Data Types
```javascript
const x = math.complex('2 + 3i');
const jsonString = JSON.stringify(x, math.replacer);
console.log(jsonString); // Example output: '{"mathjs":"Complex","re":2,"im":3}'
```

### Deserialization
```javascript
const json = '{"mathjs":"Unit","value":5,"unit":"cm","fixPrefix":false}';
const unit = JSON.parse(json, math.reviver);
// unit => Unit representing 5 cm
```

*Note:* Always pass `math.replacer` and `math.reviver` to handle edge cases (e.g., Infinity).

## 7. Expressions & Parsing
### Evaluating Expressions
```javascript
// Single expression
math.evaluate('sqrt(3^2 + 4^2)'); // Returns: 5

// With a scope
let scope = { a: 3, b: 4 };
math.evaluate('a * b', scope); // Returns: 12
```

### Compiling Expressions
```javascript
const code = math.compile('sqrt(3^2 + 4^2)');
const result = code.evaluate(); // 5
```

### Parsing to Expression Trees
```javascript
const node = math.parse('sqrt(3^2 + 4^2)');
const compiled = node.compile();
compiled.evaluate(); // 5
```

## 8. Parser API
### Using a Persistent Parser with Scope
```javascript
const parser = math.parser();

// Evaluations
parser.evaluate('sqrt(3^2 + 4^2)'); // 5
parser.evaluate('x = 7/2');           // x becomes 3.5
parser.evaluate('f(x, y) = x^y');       // Defines function f

// Accessing Variables and Functions
const xVal = parser.get('x');
const fFunc = parser.get('f');
console.log(fFunc(2, 3));              // Computes 2^3, outputs: 8

// Cleaning up
parser.clear();
```

Methods available in the parser:
- `clear()`: Clears the scope
- `evaluate(expr)`: Evaluates an expression
- `get(name)`: Retrieves a variable or function
- `getAll()`: Returns all definitions
- `remove(name)`: Removes a variable/function
- `set(name, value)`: Sets a variable/function

## 9. Expression Syntax & Operators
### Differences from JavaScript
- Functions and constants do not require the `math.` prefix (e.g., `sin(pi/4)`).
- Matrix indexing is one-based.
- Index and range operators allow syntax like `A[2:4, 1]` where both upper and lower bounds are inclusive.
- Implicit multiplication: `2 pi` is allowed.

### Operators
Examples:
```javascript
math.evaluate('2 + 3');         // 5
math.evaluate('2 * 3');         // 6
math.evaluate('2 + 3 * 4');       // 14
math.evaluate('(2 + 3) * 4');     // 20
math.evaluate('5!');            // 120
math.evaluate('sin(pi/4)');       // 0.7071067811865476
```

Detailed operator list with associativity and precedence is provided in the documentation.

## 10. Functions & Custom Functions
### Defining Functions via Assignment
```javascript
const parser = math.parser();

// Defining a function f(x) = x^2 - 5
parser.evaluate('f(x) = x^2 - 5');

// Usage:
parser.evaluate('f(2)'); // Returns: -1
parser.evaluate('f(3)'); // Returns: 4
```

## 11. Factory & Typed Functions
### Factory Function Syntax
```javascript
import { factory, create, all } from 'mathjs';

const name = 'negativeSquare';
const dependencies = ['multiply', 'unaryMinus'];
const createNegativeSquare = factory(name, dependencies, ({ multiply, unaryMinus }) => {
  return function negativeSquare(x) {
    return unaryMinus(multiply(x, x));
  };
});

// Using the factory directly:
const negativeSquare = createNegativeSquare({ multiply: (a, b) => a * b, unaryMinus: a => -a });
console.log(negativeSquare(3)); // Outputs: -9

// Importing into a math.js instance
const mathInstance = create(all);
mathInstance.import(createNegativeSquare);
console.log(mathInstance.negativeSquare(4)); // -16
```

### Typed Functions
```javascript
const max = math.typed('max', {
  'number, number': function (a, b) {
    return Math.max(a, b);
  },
  'BigNumber, BigNumber': function (a, b) {
    return a.greaterThan(b) ? a : b;
  }
});
```

## 12. Troubleshooting
- **JSON Serialization Issues:**
  Always use `math.replacer` with `JSON.stringify` to correctly serialize special numbers like `Infinity`.

- **Scope Issues in Parser:**
  Use `parser.clear()` to remove stale definitions.

- **Type Configuration Problems:**
  If unexpected results occur, verify configuration options such as `number`, `precision`, and `predictable`.

- **Factory/Typed Function Integration:**
  Ensure that all dependencies are correctly injected into factory functions.

Command line check:
```bash
node -e "const math = require('mathjs'); console.log(math.sqrt(-4).toString());"
```
Expected output: `2i`


## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/index.html
- License: License: Apache-2.0
- Crawl Date: 2025-04-22T00:12:09.637Z
- Data Size: 3647606 bytes
- Links Found: 6952

## Retrieved
2025-04-22
