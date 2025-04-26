# EXPRESSION_API

## Crawl Summary
math.evaluate overloads: evaluate(expr:string|string[],scope?:object|Map<string,any>)→any|any[]; scope: object or Map; assignments write to scope; ObjectWrappingMap & PartitionedMap behavior. math.compile(expr:string|string[])→CompiledExpression with evaluate(scope?:object|Map<string,any>)→any|any[]. math.parse(expr:string|string[])→Node|Node[]. Node.compile, Node.toString(), Node.toTex. math.parser()→Parser with methods clear(), evaluate(expr:string), get(name:string), getAll():object, getAllAsMap():Map<string,any>, remove(name:string), set(name:string,value:any). Scope types and wrapping.

## Normalised Extract
Table of Contents
1 Evaluate
2 Compile
3 Parse
4 Parser
5 Scope

1 Evaluate
Signature
  math.evaluate(expr: string | string[], scope?: object | Map<string, any>) → any | any[]
Parameters
  expr: single expression or array of expressions
  scope: optional; plain object, Map<string, any>, or custom class implementing get/set/has/keys
Behavior
  assignments (a=...) write to scope
  object scope wrapped via ObjectWrappingMap
  for custom functions scope wrapped via PartitionedMap

2 Compile
Signature
  math.compile(expr: string | string[]) → CompiledExpression
CompiledExpression API
  evaluate(scope?: object | Map<string, any>) → any | any[]
Behavior
  compile once; reuse across scopes

3 Parse
Signature
  math.parse(expr: string | string[]) → Node | Node[]
Node API
  compile(): CompiledExpression
  toString(): string
  toTex(): string
  evaluate via compile().evaluate(scope)

4 Parser
Signature
  math.parser() → Parser
Parser API
  clear(): void
  evaluate(expr: string): any
  get(name: string): any
  getAll(): object
  getAllAsMap(): Map<string, any>
  remove(name: string): void
  set(name: string, value: any): void

5 Scope
Types
  Plain object: {key:value}
  ES6 Map<string, any>
  Custom with methods get(key), set(key,value), has(key), keys()
Internal wrapping
  ObjectWrappingMap for objects
  PartitionedMap for function-scopes

## Supplementary Details
Parameter types
  expr: string or string[]
  scope: object with enumerable properties or Map<string, any> or custom Map-like
Default behaviors
  missing scope: new temporary map for evaluation
  assignments persist in provided scope instance
Implementation steps
  1 Import mathjs: const { create, all } = require('mathjs'); const math = create(all)
  2 Evaluate: math.evaluate('x+1',{x:5})
  3 Precompile: const code = math.compile('a*b'); code.evaluate(new Map([...]))
  4 Parse: const node = math.parse('sin(x)'); const compiled = node.compile(); compiled.evaluate({x:Math.PI/2})
  5 Parser: const parser = math.parser(); parser.set('y',10); parser.evaluate('y*2')
TypeScript definitions
  evaluate(expr: string| string[], scope?: MathJsScope): any| any[]
  compile(expr:string| string[]): CompiledExpr
  parse(expr:string| string[]): Node|Node[]
  parser(): Parser


## Reference Details
// npm install mathjs

const { create, all } = require('mathjs');
const math = create(all);

// Evaluate single expression
// Signature: math.evaluate(expr: string, scope?: object|Map<string,any>) → any
const resultA = math.evaluate('sqrt(3^2+4^2)'); // 5

// Evaluate array of expressions
// Signature: math.evaluate(exprs: string[], scope?: object|Map<string,any>) → any[]
const results = math.evaluate(['a=2+3','a*4']); // [5,20]

// Compile expression for reuse
// Signature: math.compile(expr: string) → CompiledExpression
const code = math.compile('x^2+1');
// Evaluate compiled code with Map scope
const scopeMap = new Map();
scopeMap.set('x',5);
const value = code.evaluate(scopeMap); // 26
// Evaluate with plain object
const valueObj = code.evaluate({x:7}); // 50

// Parse to node tree
// Signature: math.parse(expr: string) → Node
const node = math.parse('y/2');
const compiledNode = node.compile();
const out = compiledNode.evaluate({y:8}); //4
// Export
const text = node.toString(); // "y / 2"
const tex = node.toTex(); // returns LaTeX string

// Parser with persistent scope
// Signature: math.parser() → Parser
const parser = math.parser();
parser.set('a',3); // define variable
template: parser.evaluate('a^2'); // 9
parser.evaluate('b = a+4'); //7
const bVal = parser.get('b'); //7
const allVarsObj = parser.getAll(); // {a:3,b:7}
const allVarsMap = parser.getAllAsMap(); // Map {a→3,b→7}
parser.remove('b');
parser.clear();

// Best practices
// 1) Precompile static expressions outside loops
// 2) Use Map for large or mutable scopes to avoid blacklist restrictions
// 3) Use parser when maintaining state across evaluations

// Troubleshooting
// Command: node script.js
// If evaluation fails with "Undefined symbol x", verify scope contains 'x'
// Inspect parser scope: console.log(parser.getAll())


## Information Dense Extract
math.evaluate(expr:string|string[],scope?:object|Map<string,any>)→any|any[]; assigns to scope; objects→ObjectWrappingMap; functions→PartitionedMap. math.compile(expr:string|string[])→CompiledExpression with evaluate(scope?:object|Map<string,any>)→any|any[]. math.parse(expr:string|string[])→Node|Node[]; Node.compile():CompiledExpression; Node.toString():string; Node.toTex():string. math.parser()→Parser; methods: clear():void; evaluate(expr:string):any; get(name:string):any; getAll():object; getAllAsMap():Map<string,any>; remove(name:string):void; set(name:string,value:any):void. Scope types: plain object, ES6 Map, custom Map-like.

## Sanitised Extract
Table of Contents
1 Evaluate
2 Compile
3 Parse
4 Parser
5 Scope

1 Evaluate
Signature
  math.evaluate(expr: string | string[], scope?: object | Map<string, any>)  any | any[]
Parameters
  expr: single expression or array of expressions
  scope: optional; plain object, Map<string, any>, or custom class implementing get/set/has/keys
Behavior
  assignments (a=...) write to scope
  object scope wrapped via ObjectWrappingMap
  for custom functions scope wrapped via PartitionedMap

2 Compile
Signature
  math.compile(expr: string | string[])  CompiledExpression
CompiledExpression API
  evaluate(scope?: object | Map<string, any>)  any | any[]
Behavior
  compile once; reuse across scopes

3 Parse
Signature
  math.parse(expr: string | string[])  Node | Node[]
Node API
  compile(): CompiledExpression
  toString(): string
  toTex(): string
  evaluate via compile().evaluate(scope)

4 Parser
Signature
  math.parser()  Parser
Parser API
  clear(): void
  evaluate(expr: string): any
  get(name: string): any
  getAll(): object
  getAllAsMap(): Map<string, any>
  remove(name: string): void
  set(name: string, value: any): void

5 Scope
Types
  Plain object: {key:value}
  ES6 Map<string, any>
  Custom with methods get(key), set(key,value), has(key), keys()
Internal wrapping
  ObjectWrappingMap for objects
  PartitionedMap for function-scopes

## Original Source
Math.js (Mathematical Expression Parsing and Evaluation)
https://mathjs.org/docs/expressions/parsing.html

## Digest of EXPRESSION_API

# Document retrieved: 2024-07-01

# Evaluate
Signature: math.evaluate(expr: string | string[], scope?: object | Map<string, any>) → any | any[]
Scope parameter: plain object or Map<string, any> or custom with get(key), set(key,value), has(key), keys(). Assignment in expressions writes directly to scope. Object is wrapped in ObjectWrappingMap. Custom functions scope wrapped in PartitionedMap.

# Compile
Signature: math.compile(expr: string | string[]) → CompiledExpression
CompiledExpression.evaluate(scope?: object | Map<string, any>) → any | any[]
Evaluate compiled code against optional scope. Scope types same as math.evaluate.

# Parse
Signature: math.parse(expr: string | string[]) → Node | Node[]
Node.compile(): CompiledExpression
Node.evaluate(scope?: object | Map<string, any>) → any | any[]  // via node.compile().evaluate
Node.toString(): string
Node.toTex(): string

# Parser
Constructor: math.parser() → Parser
Parser.clear(): void
Parser.evaluate(expr: string): any
Parser.get(name: string): any
Parser.getAll(): object
Parser.getAllAsMap(): Map<string, any>
Parser.remove(name: string): void
Parser.set(name: string, value: any): void

# Scope
Allowed types: plain object, ES6 Map, or custom with get/set/has/keys. Object scopes are wrapped. PartitionedMap isolates function argument variables.


## Attribution
- Source: Math.js (Mathematical Expression Parsing and Evaluation)
- URL: https://mathjs.org/docs/expressions/parsing.html
- License: License
- Crawl Date: 2025-04-26T03:03:48.940Z
- Data Size: 27840477 bytes
- Links Found: 40933

## Retrieved
2025-04-26
