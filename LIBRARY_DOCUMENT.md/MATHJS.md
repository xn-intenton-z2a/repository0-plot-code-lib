# MATHJS

## Crawl Summary
Math.js supports extensive numeric and symbolic computations with APIs such as math.round, math.atan2, math.log, math.sqrt, and math.derivative. It provides expression evaluation (math.evaluate) and method chaining (math.chain). CLI usage, bundling optimization with tree-shaking, and RESTful API (https://api.mathjs.org) are detailed with CDN download options and extension support.

## Normalised Extract
Table of Contents:
1. Installation
2. Usage Examples
3. API Functions
4. Expression Parser
5. Chained Operations
6. CLI Commands
7. Custom Bundling

1. Installation: Use npm install mathjs; Global install with -g; CDN links from unpkg, cdnjs, jsDelivr, PageCDN.
2. Usage Examples: Functions include round, atan2, log, sqrt, derivative; Evaluate expressions like '1.2 * (2 + 4.5)' and unit conversions like '12.7 cm to inch'.
3. API Functions: Methods include math.round(x, precision), math.atan2(y, x), math.log(value, base), math.sqrt(x), math.derivative(expr, variable), math.pow(matrix, exponent). Return types are number, Complex, or matrix.
4. Expression Parser: Accepts string expressions, supports unit conversion and symbolic computation.
5. Chained Operations: Initiate with math.chain(value) then apply add(n), multiply(n), and complete with done().
6. CLI Commands: Launch with mathjs; use options --tex, --string, --parenthesis=auto/all for formatted outputs.
7. Custom Bundling: Use create() with selective dependency imports (e.g., addDependencies, fractionDependencies) to enable smaller bundles via tree-shaking.

## Supplementary Details
Configuration and Implementation Details:
- Use create(all, config) where config is typically {} by default.
- API functions support multiple data types; for example, math.add supports numbers and matrices.
- CLI usage: Execute mathjs directly for REPL, run scripts, or pipe input. Options:
   --tex: Format output as LaTeX
   --string: Output as plain string
   --parenthesis: Set with auto or all
- Installation can be via npm or CDN. RESTful API endpoint is https://api.mathjs.org.
- Custom bundling: Import only selected factory dependencies to minimize bundle size. Use Webpack with tree-shaking enabled.
- Troubleshooting steps: Run node bin/repl.js to diagnose issues; use source-map-explorer for bundle breakdown.

## Reference Details
API Specifications:
- math.round(x: number, precision: number): number
- math.atan2(y: number, x: number): number
- math.log(value: number, base: number): number
- math.sqrt(x: number): number | Complex
- math.derivative(expr: string, variable: string): string
- math.pow(matrix: Array<Array<number>>, exponent: number): Array<Array<number>>

SDK Method Signatures:
- math.evaluate(expr: string): number | string | Complex
- math.chain(value: number): { add(n: number): object, multiply(n: number): object, done(): number }

CLI Commands:
- Run: mathjs [script files]
- Options:
  --tex: Outputs expression in LaTeX format
  --string: Outputs raw string result
  --parenthesis=auto|all: Configures output parenthesis style

Code Example (Node.js):
// Require math.js
const { create, all } = require('mathjs');
const config = {};
const math = create(all, config);
console.log(math.sqrt(-4).toString()); // Output: 2i

Custom Bundling Example:
import { create, addDependencies, fractionDependencies, divideDependencies, formatDependencies } from 'mathjs';
const config = {};
const { fraction, add, divide, format } = create({
  fractionDependencies,
  addDependencies,
  divideDependencies,
  formatDependencies
}, config);
const a = fraction(1, 3);
const b = fraction(3, 7);
const c = add(a, b);
const d = divide(a, b);
console.log('c =', format(c)); // Expected: 16/21
console.log('d =', format(d)); // Expected: 7/9

Troubleshooting Procedures:
- For REPL errors: Run node bin/repl.js and observe output for syntax errors.
- For bundle analysis: Execute source-map-explorer on the build bundle; verify percentage contributions (core functionality ~5%, data classes ~30%, expression parser ~25%, built-in functions ~40%).

Configuration Options (defaults):
- config: {} (empty by default, can include precision, formatting options)
- CLI default for parenthesis: auto

Best Practices:
- Use tree-shaking to minimize bundle size by importing only required functions.
- Validate expressions before evaluation to prevent runtime errors.
- Utilize TypeScript definitions provided for accurate parameter types and return types.

## Information Dense Extract
Math.js; npm install mathjs; API: round(x,precision), atan2(y,x), log(value,base), sqrt(x), derivative(expr,variable), pow(matrix,exponent); evaluate(expr); chain(3)->add(4)->multiply(2)->done(); CLI: mathjs [script] with options --tex, --string, --parenthesis=auto/all; Node.js require('mathjs') or ES import; REST: https://api.mathjs.org; CDN: https://unpkg.com/mathjs@14.4.0/; custom bundling via create({dependencies}); troubleshooting via node bin/repl.js and source-map-explorer.

## Sanitised Extract
Table of Contents:
1. Installation
2. Usage Examples
3. API Functions
4. Expression Parser
5. Chained Operations
6. CLI Commands
7. Custom Bundling

1. Installation: Use npm install mathjs; Global install with -g; CDN links from unpkg, cdnjs, jsDelivr, PageCDN.
2. Usage Examples: Functions include round, atan2, log, sqrt, derivative; Evaluate expressions like '1.2 * (2 + 4.5)' and unit conversions like '12.7 cm to inch'.
3. API Functions: Methods include math.round(x, precision), math.atan2(y, x), math.log(value, base), math.sqrt(x), math.derivative(expr, variable), math.pow(matrix, exponent). Return types are number, Complex, or matrix.
4. Expression Parser: Accepts string expressions, supports unit conversion and symbolic computation.
5. Chained Operations: Initiate with math.chain(value) then apply add(n), multiply(n), and complete with done().
6. CLI Commands: Launch with mathjs; use options --tex, --string, --parenthesis=auto/all for formatted outputs.
7. Custom Bundling: Use create() with selective dependency imports (e.g., addDependencies, fractionDependencies) to enable smaller bundles via tree-shaking.

## Original Source
Math.js Documentation
https://mathjs.org/

## Digest of MATHJS

# MATHJS DOCUMENTATION

## Overview
Math.js is an extensive math library for JavaScript and Node.js that supports numbers, BigNumbers, bigints, complex numbers, fractions, units, strings, arrays, and matrices. It offers a flexible expression parser, symbolic computation, and a large set of built-in functions and constants.

## Installation
- Install via npm: npm install mathjs
- Global installation: npm install -g mathjs (makes mathjs available as a command line application)
- CDN options: unpkg (https://unpkg.com/mathjs@14.4.0/), cdnjs, jsDelivr, PageCDN

## Usage Examples

### Basic API
- math.round(math.e, 3) returns 2.718
- math.atan2(3, -3) / math.pi returns 0.75
- math.log(10000, 10) returns 4
- math.sqrt(-4) returns 2i
- math.derivative('x^2 + x', 'x') returns '2*x+1'

### Expression Evaluation
- math.evaluate('1.2 * (2 + 4.5)') returns 7.8
- math.evaluate('12.7 cm to inch') returns 5 inch
- math.evaluate('sin(45 deg) ^ 2') returns 0.5
- math.evaluate('det([-1, 2; 3, 1])') returns -7

### Chaining Operations
- math.chain(3).add(4).multiply(2).done() returns 14

## CLI Usage
- Start REPL by simply running: mathjs
- Execute a script file: mathjs script.txt
- Pipe input: cat script.txt | mathjs
- Options include --tex (LaTeX output), --string (raw string output), --parenthesis=auto/all

## Node.js & Browser Usage
- Node.js (CommonJS): const { sqrt } = require('mathjs');
- ES Modules: import { sqrt } from 'mathjs';
- In Browser: include math.js script and access via global math

## Custom Bundling & Tree-Shaking
- Import only required functions using ES modules:
  import { create, all } from 'mathjs';
  const math = create(all, config);
- For number-only implementations: import from 'mathjs/number'

## RESTful Web Service
- Available at https://api.mathjs.org

## Extensions
- Notable extensions include mathsteps, mathjs-expression-parser, mathjs-simple-integral, math.diff.js, postcss-math

## Configuration Options
- Optional configuration object in create(): const math = create(all, config)
  where config is an object (default: {}) allowing further customizations

## Troubleshooting & Debugging
- Start REPL with: node bin/repl.js
- Analyze bundles with: source-map-explorer

Retrieved: 2023-10-05
Attribution: Data Size 23854862 bytes, 38140 links

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/
- License: Apache-2.0
- Crawl Date: 2025-05-01T20:47:12.887Z
- Data Size: 23854862 bytes
- Links Found: 38140

## Retrieved
2025-05-01
