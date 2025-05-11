# EXPRESSION_PARSING

## Crawl Summary
Evaluate: math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap) → any. Wraps Object into ObjectWrappingMap, uses PartitionedMap for functions. Compile: math.compile(expr: string|string[]) → CodeObject{ evaluate(scope?: Map|Object) → any }. Parse: math.parse(expr: string|string[]) → Node{ compile(), toString(): string, toTex(): string }. Parser: math.parser() → Parser{ clear(): void, evaluate(expr: string): any, get(name: string): any, getAll(): Object, getAllAsMap(): Map, remove(name: string): void, set(name: string, value: any): void }. Scope: accepts Object, Map, or custom Map interface; Object is wrapped, Map avoids blacklist enforcement.

## Normalised Extract
Table of Contents:
1 Evaluate
2 Compile
3 Parse
4 Parser
5 Scope

1 Evaluate
Signature: math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap) → any
Scope: implements get, set, keys, has
Object scope wrapped by ObjectWrappingMap; custom functions use PartitionedMap

2 Compile
Signature: math.compile(expr: string|string[]) → CodeObject
CodeObject.evaluate(scope?: Map|Object) → any
Compile once, evaluate repeatedly

3 Parse
Signature: math.parse(expr: string|string[]) → Node
Node.compile() → CodeObject; Node.evaluate via code.evaluate
Node.toString() → string; Node.toTex() → string

4 Parser
Creation: const parser = math.parser()
Methods:
 clear(): void
 evaluate(expr: string): any
 get(name: string): any
 getAll(): Object
 getAllAsMap(): Map
 remove(name: string): void
 set(name: string, value: any): void

5 Scope
Allowed types: Plain Object, ES6 Map, CustomMap (get/set/keys/has)
Object scope wrapped automatically; Map avoids blacklist enforcement

## Supplementary Details
• Scope Implementation: ObjectWrappingMap wraps plain objects; PartitionedMap separates function parameters and original scope. • Parameter Types: expr must be UTF-8 string or array of strings. • Return Types: evaluate() returns number, BigNumber, Complex, Fraction, unit, matrix, or string based on expression. • Map Interface: get(key): any; set(key,value): void; keys(): Iterable<string>; has(key): boolean. • Reuse Pattern: const code = math.compile(expr); code.evaluate(scope) inside loops. • CustomMap: any class implementing Map interface can be used for domain-specific storage.

## Reference Details
API Specifications:

math.evaluate(expr: string|string[], scope?: Map<string,any>|object|CustomMap): any
Throws: SyntaxError for invalid expr; PermissionError for blacklisted symbols when using object scope.
Example:
const result = math.evaluate('a*b', new Map([['a',3],['b',4]])) // 12

math.compile(expr: string|string[]): CodeObject
CodeObject.evaluate(scope?: Map<string,any>|object): any
Example:
const code = math.compile('sqrt(2)'); console.log(code.evaluate()) //1.4142...

math.parse(expr: string|string[]): Node
Node.compile(): CodeObject
Node.toString(): string
Node.toTex(): string
Example:
const node = math.parse('x^2+y^2'); const code = node.compile(); console.log(code.evaluate({x:3,y:4})) //25

math.parser(): Parser
Parser.clear(): void
Parser.evaluate(expr: string): any
Parser.get(name: string): any
Parser.getAll(): object
Parser.getAllAsMap(): Map<string,any>
Parser.remove(name: string): void
Parser.set(name: string, value: any): void
Example:
const p = math.parser(); p.set('x',5); console.log(p.evaluate('x+2')) //7

Best Practices:
• Use ES6 Map for full symbol definition and to bypass blacklist.
• Compile expressions outside loops to improve performance.
• Use parser for stateful workflows requiring variable retention.

Troubleshooting:
1. Error: SyntaxError: Parenthesis ) expected at char 5
 Command: node -e "console.log(require('mathjs').evaluate('2+'))"
2. PermissionError: Symbol import is blacklisted
 Workaround: use parser or Map scope:
  node -e "const m=require('mathjs'); console.log(m.evaluate('import', new Map()))"
3. Incorrect result with plain Object scope due to property collision
 Solution: use Map scope to isolate variables.

## Information Dense Extract
math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap)=any; math.compile(expr: string|string[])→{evaluate(scope?:Map|Object):any}; math.parse(expr: string|string[])→Node{compile():CodeObject,toString():string,toTex():string}; math.parser():Parser{clear():void,evaluate(expr:string):any,get(name:string):any,getAll():object,getAllAsMap():Map,remove(name:string):void,set(name:string,value:any):void}; scope types: Plain Object wrapped by ObjectWrappingMap, ES6 Map avoids blacklist, CustomMap allowed (get,set,keys,has).

## Sanitised Extract
Table of Contents:
1 Evaluate
2 Compile
3 Parse
4 Parser
5 Scope

1 Evaluate
Signature: math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap)  any
Scope: implements get, set, keys, has
Object scope wrapped by ObjectWrappingMap; custom functions use PartitionedMap

2 Compile
Signature: math.compile(expr: string|string[])  CodeObject
CodeObject.evaluate(scope?: Map|Object)  any
Compile once, evaluate repeatedly

3 Parse
Signature: math.parse(expr: string|string[])  Node
Node.compile()  CodeObject; Node.evaluate via code.evaluate
Node.toString()  string; Node.toTex()  string

4 Parser
Creation: const parser = math.parser()
Methods:
 clear(): void
 evaluate(expr: string): any
 get(name: string): any
 getAll(): Object
 getAllAsMap(): Map
 remove(name: string): void
 set(name: string, value: any): void

5 Scope
Allowed types: Plain Object, ES6 Map, CustomMap (get/set/keys/has)
Object scope wrapped automatically; Map avoids blacklist enforcement

## Original Source
Math.js Expression Evaluation
https://mathjs.org/docs/expressions/parsing.html

## Digest of EXPRESSION_PARSING

# Expression Parsing and Evaluation (Math.js)
Retrieved: 2024-06-24
Source: https://mathjs.org/docs/expressions/parsing.html

# Evaluate

Signature:
math.evaluate(expr)
math.evaluate(expr, scope)
math.evaluate([expr1, expr2, ...])
math.evaluate([expr1, expr2, ...], scope)

Parameters:
• expr: string or array of strings
• scope (optional): Map | Object | custom Map interface (methods get, set, keys, has)

Behavior:
• Resolves symbols and writes assigned variables/functions into scope
• Wraps plain Object into ObjectWrappingMap
• Uses PartitionedMap for custom functions

# Compile

Signature:
math.compile(expr)
math.compile([expr1, expr2, ...])

Returns:
{ evaluate(scope?) → any }

Parameters:
• expr: string or array of strings
• scope (optional when calling evaluate): Map | Object

Behavior:
• Parses and compiles once, reuses code.evaluate for repeated evaluation

# Parse

Signature:
math.parse(expr)
math.parse([expr1, expr2, ...])

Returns:
Node

Node API:
• node.compile() → { evaluate(scope?) → any }
• node.toString() → string
• node.toTex() → string

Parameters:
• expr: string or array of strings
• scope (optional when evaluating code): Map | Object

# Parser

Creation:
const parser = math.parser()

Parser Methods:
• parser.clear() → void
• parser.evaluate(expr: string) → any
• parser.get(name: string) → any
• parser.getAll() → Object
• parser.getAllAsMap() → Map
• parser.remove(name: string) → void
• parser.set(name: string, value: any) → void

# Scope

Allowed Types:
• Plain JavaScript Object
• ES6 Map
• Custom class implementing Map interface (get, set, keys, has)

Notes:
• evaluate enforces symbol blacklist on Object scope
• Use Map scope to bypass blacklist

## Attribution
- Source: Math.js Expression Evaluation
- URL: https://mathjs.org/docs/expressions/parsing.html
- License: Apache-2.0
- Crawl Date: 2025-05-11T06:06:03.716Z
- Data Size: 27468012 bytes
- Links Found: 40711

## Retrieved
2025-05-11
