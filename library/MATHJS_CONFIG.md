# MATHJS_CONFIG

## Crawl Summary
npm install mathjs; import/create instances; load via ES modules, CommonJS, browser; configure relTol, absTol, matrix, number, numberFallback, precision, predictable, randomSeed; core functions evaluate, compile, parse, chain, import, replacer/reviver; chaining pattern; JSON serialization with replacer and reviver.

## Normalised Extract
Table of Contents
1 Installation
2 Loading
3 Configuration Options
4 Core APIs
5 Chaining
6 Serialization

1 Installation
- npm install mathjs
- version 14.4.0 CDN URLs unpkg, cdnjs, jsDelivr, PageCDN

2 Loading
ES Modules: import { create, all } from 'mathjs'; const math = create(all, config)
CommonJS: const { create, all } = require('mathjs'); const math = create(all, config)
Browser: <script src="math.js"></script>; use global math

3 Configuration Options
relTol:1e-12 absTol:1e-15 matrix:'Matrix'|'Array' number:'number'|'BigNumber'|'bigint'|'Fraction' numberFallback:'number'|'BigNumber' precision:64 predictable:false randomSeed:null
Use math.config({ ... }) or supply second arg to create(all, config)

4 Core APIs
math.evaluate(expr[,scope]):any
math.compile(expr):{evaluate(scope?):any}
math.parse(expr):Node
type Node: compile(), evaluate()
math.chain(value):Chain; Chain.done():any; Chain.valueOf():any; Chain.toString():string
math.import(funcs[,options]); options.override,silent,wrap
math.replacer: function for JSON.stringify; math.reviver: function for JSON.parse

5 Chaining
math.chain(value).fn1(...).fn2(...).done()
All math.* functions available

6 Serialization
JSON.stringify(obj, math.replacer)
JSON.parse(json, math.reviver)
Pass replacer to retain Infinity as 'Infinity'



## Supplementary Details
Implementation Steps
1. Install: npm install mathjs
2. Import or require: ES modules or CommonJS
3. Create instance: const math = create(all, config)
4. Configure at runtime: math.config({ matrix:'Array', number:'BigNumber', precision:32, predictable:true })
5. Use core APIs: math.evaluate, math.compile, math.parse, math.chain
6. Extend library: math.import({ fn:..., ...}, { override:true, wrap:true, silent:false })
7. Serialize data types: JSON.stringify(x, math.replacer); restore: JSON.parse(str, math.reviver)

Configuration Effects
- Changing matrix affects all matrix-returning functions
- Changing number affects evaluate, parse, range, unit parsing
- predictable:true forces NaN for sqrt(-4)
- Setting randomSeed resets PRNG deterministically on each set

Custom Bundling
- Import subsets: import { sqrt } from 'mathjs/number'
- Build tree-shakable bundles with create and selective import



## Reference Details
API Specifications

math.evaluate(expr: string | string[], scope?: Map|string|Object): any | any[]
  - expr: expression or list of expressions
  - scope: Map with get, set, has, keys or plain object
  - returns evaluated result(s)

math.compile(expr: string | string[]): { evaluate(scope?: Map|string|Object): any | any[] }
  - compile once, evaluate multiple times

math.parse(expr: string | string[]): Node | Node[]
  - Node methods: compile():Compiled, evaluate(scope?): any
  - Node.toString(): string; Node.toTex(): string

math.chain(value: any): Chain
  - Chain methods: .done(): any; .valueOf(): any; .toString(): string
  - All math.* functions available on chain instance

math.config(options: {
    relTol?: number,
    absTol?: number,
    matrix?: 'Matrix'|'Array',
    number?: 'number'|'BigNumber'|'bigint'|'Fraction',
    numberFallback?: 'number'|'BigNumber',
    precision?: number,
    predictable?: boolean,
    randomSeed?: string|null
}): Config
  - Returns current config object

math.import(
    functions: Object|Function[],
    options?: { override?: boolean, silent?: boolean, wrap?: boolean }
): void

math.replacer(key: string, value: any): any
math.reviver(key: string, value: any): any

Code Examples

// Evaluate and parse
const res = math.evaluate('2+3*4') //14
const code = math.compile('sqrt(x^2+y^2)')
console.log(code.evaluate({ x:3, y:4 })) //5

// Chaining
const c = math.chain([1,2,3]).map(x => x*2).sum().done() //12

// Typed import extension
const custom = {
  negSquare: factory('negSquare', ['multiply','unaryMinus'], ({multiply,unaryMinus}) => x => unaryMinus(multiply(x,x)))
}
math.import(custom)

Best Practices
- Always pass math.replacer to JSON.stringify to handle Infinity and NaN
- Use create(all, config) for isolated instances, avoid mutating default global
- Use tree-shaking via selective imports to reduce bundle size

Troubleshooting
- If math.evaluate throws “UndefinedSymbolError”, ensure scope includes variable: math.evaluate('a+1',{a:2})
- Infinity serializes to null without replacer: JSON.stringify(Infinity) => null; use replacer to get "Infinity"
- Setting predictable:true changes sqrt(-4) from Complex to NaN; revert setting if unexpected NaN



## Information Dense Extract
install:npm install mathjs;import:{create,all}from'mathjs';const math=create(all,{relTol:1e-12,absTol:1e-15,matrix:'Matrix',number:'number',numberFallback:'number',precision:64,predictable:false,randomSeed:null});APIs:evaluate(expr,scope?):any;compile(expr)->{evaluate(scope?):any};parse(expr)->Node;chain(value)->Chain;import(funcs,options?);replacer;reviver;config(options);usage:math.evaluate('sqrt(3^2+4^2)');math.chain(3).add(4).multiply(2).done();serialization:JSON.stringify(x,math.replacer);JSON.parse(str,math.reviver);best:use create() for isolated instance;pass replacer;tree-shake via selective imports;predictable:true→NaN for negative sqrt;randomSeed for deterministic random

## Sanitised Extract
Table of Contents
1 Installation
2 Loading
3 Configuration Options
4 Core APIs
5 Chaining
6 Serialization

1 Installation
- npm install mathjs
- version 14.4.0 CDN URLs unpkg, cdnjs, jsDelivr, PageCDN

2 Loading
ES Modules: import { create, all } from 'mathjs'; const math = create(all, config)
CommonJS: const { create, all } = require('mathjs'); const math = create(all, config)
Browser: <script src='math.js'></script>; use global math

3 Configuration Options
relTol:1e-12 absTol:1e-15 matrix:'Matrix'|'Array' number:'number'|'BigNumber'|'bigint'|'Fraction' numberFallback:'number'|'BigNumber' precision:64 predictable:false randomSeed:null
Use math.config({ ... }) or supply second arg to create(all, config)

4 Core APIs
math.evaluate(expr[,scope]):any
math.compile(expr):{evaluate(scope?):any}
math.parse(expr):Node
type Node: compile(), evaluate()
math.chain(value):Chain; Chain.done():any; Chain.valueOf():any; Chain.toString():string
math.import(funcs[,options]); options.override,silent,wrap
math.replacer: function for JSON.stringify; math.reviver: function for JSON.parse

5 Chaining
math.chain(value).fn1(...).fn2(...).done()
All math.* functions available

6 Serialization
JSON.stringify(obj, math.replacer)
JSON.parse(json, math.reviver)
Pass replacer to retain Infinity as 'Infinity'

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATHJS_CONFIG

# Math.js Technical Digest (retrieved 2024-06-20)

## Installation

- npm install mathjs
- Built-in TypeScript definitions included
- CDN URLs (version 14.4.0):
  - unpkg: https://unpkg.com/mathjs@14.4.0/
  - cdnjs: https://cdnjs.com/libraries/mathjs
  - jsDelivr: https://www.jsdelivr.com/package/npm/mathjs
  - PageCDN: https://pagecdn.com/lib/mathjs

## Loading and Instantiation

### ES Modules

```js
import { create, all } from 'mathjs'
const config = { /* see Configuration below */ }
const math = create(all, config)
```

### CommonJS (Node.js)

```js
const { create, all } = require('mathjs')
const config = { /* see Configuration below */ }
const math = create(all, config)
```

### Browser Global

```html
<script src="math.js"></script>
<script>
  console.log(math.sqrt(-4).toString()) // 2i
</script>
```

## Configuration Options

Call `math.config(options)` or supply `options` to `create(all, options)`.

| Option         | Type                 | Default     | Description                                                                                           |
|----------------|----------------------|-------------|-------------------------------------------------------------------------------------------------------|
| relTol         | number               | 1e-12       | Minimum relative difference for relational functions                                                  |
| absTol         | number               | 1e-15       | Minimum absolute difference for relational functions                                                  |
| matrix         | 'Matrix'  'Array' | 'Matrix'    | Default output type for matrix functions                                                             |
| number         | 'number'|'BigNumber'|'bigint'|'Fraction' | 'number'    | Type used for parsing and internal numeric values                                                     |
| numberFallback | 'number'|'BigNumber'    | 'number'    | Fallback type when value cannot be represented in `number` type                                      |
| precision      | integer              | 64          | Maximum significant digits for BigNumbers                                                            |
| predictable    | boolean              | false       | When true, output type depends only on input types (e.g. sqrt(-4) → NaN when true)                   |
| randomSeed     | string|null          | null        | Seed for pseudo-random generator; resets RNG on setting                                               |

### Examples

```js
// create with BigNumber and custom tolerance
t const math = create(all, { number: 'BigNumber', precision: 32, relTol: 1e-10 })
console.log(math.evaluate('1 / 3')) // BigNumber: 0.333... (32 digits)
math.config({ predictable: true })
console.log(math.sqrt(-4))        // NaN
```

## Core APIs

- `math.evaluate(expr[, scope]) : any`
- `math.compile(expr) -> { evaluate(scope?): any }`
- `math.parse(expr) -> Node`
- `math.chain(value) -> Chain`
- `math.import(functions[, options])`
- `math.replacer` and `math.reviver` for JSON serialization

## Chaining

```js
math.chain(3)
    .add(4)
    .multiply(2)
    .done() // 14
```

## Serialization

```js
const x = math.complex('2+3i')
const json = JSON.stringify(x, math.replacer)
// '{"mathjs":"Complex","re":2,"im":3}'
const restored = JSON.parse(json, math.reviver)
```

---

**Attribution**: Math.js documentation, Data Size: 19021957 bytes, Links Found: 35602

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: License: Apache-2.0
- Crawl Date: 2025-05-10T03:34:17.993Z
- Data Size: 19021957 bytes
- Links Found: 35602

## Retrieved
2025-05-10
