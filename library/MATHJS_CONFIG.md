# MATHJS_CONFIG

## Crawl Summary
math.config supports eight options: relTol(1e-12), absTol(1e-15), matrix('Matrix'|'Array'), number('number'|'BigNumber'|'bigint'|'Fraction'), numberFallback('number'|'BigNumber'), precision(64), predictable(false), randomSeed(null). Create an instance with create(all, config). Override config at runtime with math.config(partialConfig). Default behaviors: relational tolerance, matrix output type, numeric parsing and fallback, BigNumber precision, predictable complex output, seeded RNG.

## Normalised Extract
Table of Contents
1 Installation
2 Loading and Bundling
3 Instantiating with Configuration
4 Configuration Options
5 Runtime Overrides

1 Installation
  npm install mathjs@<version>
  - Type definitions included for TypeScript.

2 Loading and Bundling
  CommonJS (Node.js)
    const { create, all } = require('mathjs')
  ES Modules
    import { create, all } from 'mathjs'
    // Lightweight build
    import { sqrt } from 'mathjs/number'
  Browser
    <script src="math.js"></script>
    // Global variable: math
  Tree-shaking
    import only required functions or bundles via custom bundling API.

3 Instantiating with Configuration
  Signature: create(all: MathJsStatic, config: ConfigOptions) => MathJsInstance
  Example:
    const config = { matrix:'Array', number:'BigNumber', precision:32 }
    const math = create(all, config)

4 Configuration Options
  relTol: number (default=1e-12)
    Minimum relative tolerance for comparisons.
  absTol: number (default=1e-15)
    Minimum absolute tolerance for comparisons.
  matrix: 'Matrix'|'Array' (default='Matrix')
    Output type for matrix operations.
  number: 'number'|'BigNumber'|'bigint'|'Fraction' (default='number')
    Type for parsing strings and creating values.
  numberFallback: 'number'|'BigNumber' (default='number')
    Fallback when primary number type cannot parse value.
  precision: number (default=64)
    Significant digits for BigNumber operations.
  predictable: boolean (default=false)
    When true, forces output types based solely on input types.
  randomSeed: string|number|null (default=null)
    Seed pseudo RNG for deterministic random(), randomInt().

5 Runtime Overrides
  Signature: math.config(options: Partial<ConfigOptions>) => ConfigOptions
  Usage:
    math.config({ number:'Fraction' })
    const cfg = math.config()


## Supplementary Details
Implementation Steps
1. npm install or include via CDN.
2. Import create and all from 'mathjs'.
3. Define a ConfigOptions object with only required keys.
4. Call create(all, config) to obtain math instance.
5. Use math.config(...) at any time to override options.
6. Retrieve current config via math.config().

Custom Bundling
  Use the custom bundle builder or tree-shaking import patterns to reduce bundle size.
  Example: import { evaluate } from 'mathjs/small'

Command Line Interface
  npm install -g mathjs
  Usage: mathjs -e "sqrt(3^2+4^2)"

CDN Links
  https://unpkg.com/mathjs@14.4.0/
  https://cdnjs.com/libraries/mathjs

Extensions
  Import external libraries via math.import(lib, {wrap:true}).
  Example: math.import(numbers, {wrap:true, silent:true})

RNG Seeding
  math.config({randomSeed:'myseed'})
  math.random() returns deterministic sequence.


## Reference Details
API Signatures

create(all: MathJsStatic, config: ConfigOptions) => MathJsInstance
  - all: built-in namespace containing all functions and constants.
  - config: full ConfigOptions object.
  - Returns: a configured Math.js instance.

math.config(): ConfigOptions
  - No arguments: returns current full configuration.

math.config(options: Partial<ConfigOptions>): ConfigOptions
  - options: subset of ConfigOptions to override.
  - Returns: updated full configuration.

ConfigOptions properties
  relTol: number = 1e-12
  absTol: number = 1e-15
  matrix: 'Matrix' | 'Array' = 'Matrix'
  number: 'number' | 'BigNumber' | 'bigint' | 'Fraction' = 'number'
  numberFallback: 'number' | 'BigNumber' = 'number'
  precision: number = 64
  predictable: boolean = false
  randomSeed: string | number | null = null

math.import(functions: object | Array<factory>, options?: {override?:boolean, silent?:boolean, wrap?:boolean}): void
  - functions: object mapping names to functions/values or factory array.
  - options.override: overwrite existing definitions.
  - options.silent: suppress duplicate errors.
  - options.wrap: auto-convert wrapped types.

Chain API

math.chain(value: any) => Chain
Chain.done(): any      // finalize and return result
Chain.valueOf(): any   // alias of done()
Chain.toString(): string // format output as string

Parser API

math.parser(): Parser
Parser.evaluate(expr: string): any
Parser.get(name: string): any
Parser.set(name: string, value: any): void
Parser.remove(name: string): void
Parser.clear(): void

Troubleshooting Procedures

1. Unrecognized config key error
   - Check spelling of keys in ConfigOptions.
2. BigNumber precision insufficient
   - Increase precision parameter via math.config({precision:<digits>}).
3. Non-deterministic random()
   - Set randomSeed: math.config({randomSeed:<value>}).
4. Bundle too large
   - Use tree-shaking: import only required modules: e.g. import { sqrt } from 'mathjs/number'.
5. CLI not found after global install
   - Ensure npm global bin is in PATH: echo $PATH

Best Practices

- Always specify only required config overrides.
- Use Partial<ConfigOptions> with math.config to avoid resetting defaults.
- Seed RNG in tests for repeatability.
- Choose number or BigNumber consistently to avoid fallback performance hits.


## Information Dense Extract
npm install mathjs@<ver>; import { create, all } from 'mathjs'; const math = create(all,{relTol:1e-12,absTol:1e-15,matrix:'Array',number:'BigNumber',numberFallback:'number',precision:64,predictable:false,randomSeed:null}); math.config(); math.config({number:'number'}); API: create(all,ConfigOptions):MathJsInstance; math.config():ConfigOptions; math.config(Partial<ConfigOptions>):ConfigOptions; ConfigOptions keys: relTol,absTol,matrix,number,numberFallback,precision,predictable,randomSeed; math.import(obj,{override?,silent?,wrap?}); math.chain(val).add(x).done(); math.parser().evaluate(expr); troubleshooting: set randomSeed for deterministic RNG; tree-shake via import from 'mathjs/number.'

## Sanitised Extract
Table of Contents
1 Installation
2 Loading and Bundling
3 Instantiating with Configuration
4 Configuration Options
5 Runtime Overrides

1 Installation
  npm install mathjs@<version>
  - Type definitions included for TypeScript.

2 Loading and Bundling
  CommonJS (Node.js)
    const { create, all } = require('mathjs')
  ES Modules
    import { create, all } from 'mathjs'
    // Lightweight build
    import { sqrt } from 'mathjs/number'
  Browser
    <script src='math.js'></script>
    // Global variable: math
  Tree-shaking
    import only required functions or bundles via custom bundling API.

3 Instantiating with Configuration
  Signature: create(all: MathJsStatic, config: ConfigOptions) => MathJsInstance
  Example:
    const config = { matrix:'Array', number:'BigNumber', precision:32 }
    const math = create(all, config)

4 Configuration Options
  relTol: number (default=1e-12)
    Minimum relative tolerance for comparisons.
  absTol: number (default=1e-15)
    Minimum absolute tolerance for comparisons.
  matrix: 'Matrix'|'Array' (default='Matrix')
    Output type for matrix operations.
  number: 'number'|'BigNumber'|'bigint'|'Fraction' (default='number')
    Type for parsing strings and creating values.
  numberFallback: 'number'|'BigNumber' (default='number')
    Fallback when primary number type cannot parse value.
  precision: number (default=64)
    Significant digits for BigNumber operations.
  predictable: boolean (default=false)
    When true, forces output types based solely on input types.
  randomSeed: string|number|null (default=null)
    Seed pseudo RNG for deterministic random(), randomInt().

5 Runtime Overrides
  Signature: math.config(options: Partial<ConfigOptions>) => ConfigOptions
  Usage:
    math.config({ number:'Fraction' })
    const cfg = math.config()

## Original Source
Math.js
https://mathjs.org/docs/index.html

## Digest of MATHJS_CONFIG

# Math.js Configuration (retrieved on 2024-06-12)

## Configuration API

Signature

  math.config(config: ConfigOptions): ConfigOptions

Description

  Apply or override runtime configuration on a Math.js instance. Returns the full applied configuration.

## ConfigOptions Interface

  interface ConfigOptions {
    relTol: number         // Minimum relative difference for relational comparisons (default: 1e-12)
    absTol: number         // Minimum absolute difference for relational comparisons (default: 1e-15)
    matrix: 'Matrix' | 'Array'    // Default output type for matrix functions (default: 'Matrix')
    number: 'number' | 'BigNumber' | 'bigint' | 'Fraction'  // Numeric type for parsing and creation (default: 'number')
    numberFallback: 'number' | 'BigNumber'  // Fallback type when primary number type cannot represent a value (default: 'number')
    precision: number      // Significant digits for BigNumber (default: 64)
    predictable: boolean   // Force predictable output types (default: false)
    randomSeed: string | number | null  // Seed for deterministic RNG (default: null)
  }

## Instantiation with Configuration

Signature

  import { create, all } from 'mathjs'
  const math = create(all, config: ConfigOptions)

Example

  const config = {
    relTol: 1e-10,
    absTol: 1e-14,
    matrix: 'Array',
    number: 'BigNumber',
    precision: 32,
    predictable: true,
    randomSeed: 'seed123'
  }
  const math = create(all, config)
  console.log(math.config())

## Overriding at Runtime

Signature

  math.config(options: Partial<ConfigOptions>): ConfigOptions

Example

  math.config({ number: 'Fraction', matrix: 'Array' })
  const current = math.config()
  console.log(current.number, current.matrix)


## Attribution
- Source: Math.js
- URL: https://mathjs.org/docs/index.html
- License: Apache-2.0
- Crawl Date: 2025-05-19T06:32:03.807Z
- Data Size: 3160396 bytes
- Links Found: 4341

## Retrieved
2025-05-19
