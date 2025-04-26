# EXPR_EVAL

## Crawl Summary
Parser(options?), parse(string)->Expression, evaluate(string,vars?)->any, Expression methods: evaluate(vars?)->any, substitute(var,expr)->Expression, simplify(vars)->Expression, variables({withMembers?})->string[], symbols({withMembers?})->string[], toString()->string, toJSFunction(params: string[]|string,vars?)->Function. Operator precedence, unary ops list, predefined functions list, constants in parser.consts, add custom JS functions on parser.functions.

## Normalised Extract
Table of Contents
1  Parser Class
2  Expression Class
3  Operator Precedence
4  Unary Operators
5  Pre-defined Functions
6  Constants
7  Custom JavaScript Functions

1  Parser Class
Constructor: new Parser({operators:{add:boolean,concatenate:boolean,conditional:boolean,divide:boolean,factorial:boolean,multiply:boolean,power:boolean,remainder:boolean,subtract:boolean,logical:boolean,comparison:boolean,in:boolean,assignment:boolean}})
Static Methods:
  parse(expression:string):Expression
  evaluate(expression:string,variables?:object):any

2  Expression Class
Methods:
  evaluate(variables?:object):any
  substitute(variable:string,expression:Expression|string|number):Expression
  simplify(variables:object):Expression
  variables(options?:{withMembers:boolean}):string[]
  symbols(options?:{withMembers:boolean}):string[]
  toString():string
  toJSFunction(parameters:string[]|string,variables?:object):Function

3  Operator Precedence
Order:
  () / f() / x.y / a[i]
  !
  ^ (right)
  + - not sqrt etc. (right)
  * / %
  + - ||
  == != >= <= > < in
  and
  or
  ?: (right)
  = (right)
  ;

4  Unary Operators
-x, +x, x!, abs x, acos x, acosh x, asin x, asinh x, atan x, atanh x, cbrt x, ceil x, cos x, cosh x, exp x, expm1 x, floor x, length x, ln x, log x, log10 x, log2 x, log1p x, not x, round x, sign x, sin x, sinh x, sqrt x, tan x, tanh x, trunc x

5  Pre-defined Functions
random(n?:number):number
fac(n:number):number
default factorial
min(...values:number[]):number
max(...values:number[]):number
hypot(...args:number[]):number
pyt(a:number,b:number):number
pow(x:number,y:number):number
atan2(y:number,x:number):number
roundTo(x:number,n:number):number
map(f:Function,a:any[]):any[]
fold(f:Function,y:any,a:any[]):any
filter(f:Function,a:any[]):any[]
indexOf(x:any,a:any[]):number
join(sep:string,a:any[]):string
if(c:any,a:any,b:any):any

6  Constants
parser.consts = { E:number, PI:number, true:boolean, false:boolean }

7  Custom JavaScript Functions
parser.functions[key:string] = (...args)=>any
delete parser.functions[key]

## Supplementary Details
ParserOptions defaults: all operators true. parser.consts initial: {E:Math.E,PI:Math.PI,true:true,false:false}. Simplify behavior: only constant sub-expressions, built-in functions not executed. variables() default excludes member chains. symbols() includes built-ins. toJSFunction outputs JS function string: function(parameters){return <expression>}.

## Reference Details
API Specifications
Parser(options?:ParserOptions)
  options.operators.add:boolean = true
  options.operators.concatenate:boolean = true
  options.operators.conditional:boolean = true
  options.operators.divide:boolean = true
  options.operators.factorial:boolean = true
  options.operators.multiply:boolean = true
  options.operators.power:boolean = true
  options.operators.remainder:boolean = true
  options.operators.subtract:boolean = true
  options.operators.logical:boolean = true
  options.operators.comparison:boolean = true
  options.operators['in']:boolean = true
  options.operators.assignment:boolean = true

Parser.parse(expr:string):Expression
Parser.evaluate(expr:string,vars?:object):any

Expression.evaluate(vars?:object):any
Throws exception if unbound vars found: Error("Undefined variable: <var>")

Expression.substitute(variable:string,expression:Expression|string|number):Expression
Expression.simplify(vars:object):Expression
Expression.variables(options?:{withMembers:boolean}):string[]
Expression.symbols(options?:{withMembers:boolean}):string[]
Expression.toString():string
Expression.toJSFunction(params:string[]|string,vars?:object):Function

Implementation Patterns:
1  Parse then Evaluate
  const parser=new Parser();const expr=parser.parse('2*x+1');const result=expr.evaluate({x:3});
2  Direct Evaluate
  Parser.evaluate('6*x',{x:7});
3  Compile to JS Function
  const f=expr.toJSFunction(['x','y'],{z:5});f(1,2);
4  Customize Operators
  new Parser({operators:{in:true,assignment:true}})
5  Add Custom Function
  parser.functions.customAdd=(a,b)=>a+b;
6  Remove Built-in
  delete parser.functions.fac;

Configuration Options:
operators.add (default true) - toggles +
operators.logical (default true) - enables and/or/not

Best Practices:
Always handle exceptions when evaluating dynamic expressions.
Use toJSFunction to precompile hot expressions.
Lock down operators in user input scenarios.
Simplify expressions with constants before evaluation to improve performance.

Troubleshooting:
Command: Parser.parse('2^x').evaluate({}). Expect: throws "Undefined variable: x".
Command: parser.parse('x in [1,2]').evaluate({x:1}). Expect: true
If missing operator, ensure enable in options.


## Information Dense Extract
Parser(options?){operators:attributes};Parser.parse(str)->Expression;Parser.evaluate(str,vars?)->any;Expression:{evaluate(vars?)->any,substitute(var,expr)->Expression,simplify(vars)->Expression,variables({withMembers?})->string[],symbols({withMembers?})->string[],toString()->string,toJSFunction(params:string[]|string,vars?)->Function};OperatorPrecedence:(),f(),x.y,a[i],!,^,unary+,unary-,not,sqrt,*,/,%,+, -,||,==,!=,>=,<=,>,<,in,and,or,?:,=,; ;UnaryOps:[negation,plus,factorial,abs,acos,acosh,asin,asinh,atan,atanh,cbrt,ceil,cos,cosh,exp,expm1,floor,length,ln,log,log10,log2,log1p,not,round,sign,sin,sinh,sqrt,tan,tanh,trunc];PreDefs:random(n?),fac(n),min(...),max(...),hypot(...),pyt(a,b),pow(x,y),atan2(y,x),roundTo(x,n),map(f,a),fold(f,y,a),filter(f,a),indexOf(x,a),join(sep,a),if(c,a,b);Constants:parser.consts={E,PI,true,false};CustomFunctions: parser.functions[key]=fn;delete parser.functions[key]

## Sanitised Extract
Table of Contents
1  Parser Class
2  Expression Class
3  Operator Precedence
4  Unary Operators
5  Pre-defined Functions
6  Constants
7  Custom JavaScript Functions

1  Parser Class
Constructor: new Parser({operators:{add:boolean,concatenate:boolean,conditional:boolean,divide:boolean,factorial:boolean,multiply:boolean,power:boolean,remainder:boolean,subtract:boolean,logical:boolean,comparison:boolean,in:boolean,assignment:boolean}})
Static Methods:
  parse(expression:string):Expression
  evaluate(expression:string,variables?:object):any

2  Expression Class
Methods:
  evaluate(variables?:object):any
  substitute(variable:string,expression:Expression|string|number):Expression
  simplify(variables:object):Expression
  variables(options?:{withMembers:boolean}):string[]
  symbols(options?:{withMembers:boolean}):string[]
  toString():string
  toJSFunction(parameters:string[]|string,variables?:object):Function

3  Operator Precedence
Order:
  () / f() / x.y / a[i]
  !
  ^ (right)
  + - not sqrt etc. (right)
  * / %
  + - ||
  == != >= <= > < in
  and
  or
  ?: (right)
  = (right)
  ;

4  Unary Operators
-x, +x, x!, abs x, acos x, acosh x, asin x, asinh x, atan x, atanh x, cbrt x, ceil x, cos x, cosh x, exp x, expm1 x, floor x, length x, ln x, log x, log10 x, log2 x, log1p x, not x, round x, sign x, sin x, sinh x, sqrt x, tan x, tanh x, trunc x

5  Pre-defined Functions
random(n?:number):number
fac(n:number):number
default factorial
min(...values:number[]):number
max(...values:number[]):number
hypot(...args:number[]):number
pyt(a:number,b:number):number
pow(x:number,y:number):number
atan2(y:number,x:number):number
roundTo(x:number,n:number):number
map(f:Function,a:any[]):any[]
fold(f:Function,y:any,a:any[]):any
filter(f:Function,a:any[]):any[]
indexOf(x:any,a:any[]):number
join(sep:string,a:any[]):string
if(c:any,a:any,b:any):any

6  Constants
parser.consts = { E:number, PI:number, true:boolean, false:boolean }

7  Custom JavaScript Functions
parser.functions[key:string] = (...args)=>any
delete parser.functions[key]

## Original Source
expr-eval (Expression Parsing and Evaluation)
https://github.com/silentmatt/expr-eval#readme

## Digest of EXPR_EVAL

# EXPR_EVAL Technical Reference

Retrieved: 2023-10-05
Data Size: 668776 bytes

## Parser Class

### Constructor
`new Parser(options?: ParserOptions)`

ParserOptions:
```
{
  operators?: {
    add?: boolean;
    concatenate?: boolean;
    conditional?: boolean;
    divide?: boolean;
    factorial?: boolean;
    multiply?: boolean;
    power?: boolean;
    remainder?: boolean;
    subtract?: boolean;
    logical?: boolean;
    comparison?: boolean;
    in?: boolean;
    assignment?: boolean;
  };
}
```
Defaults: all true except logical/comparison/in/assignment false if overridden.

### Static Methods
- `Parser.parse(expression: string): Expression`
- `Parser.evaluate(expression: string, variables?: {[key:string]: any}): number | string | boolean | any[]`

## Expression Class

### Methods
- `evaluate(variables?: {[key:string]: any}): any`
- `substitute(variable: string, expression: Expression | string | number): Expression`
- `simplify(variables: {[key:string]: any}): Expression`
- `variables(options?: {withMembers?: boolean}): string[]`
- `symbols(options?: {withMembers?: boolean}): string[]`
- `toString(): string`
- `toJSFunction(parameters: string[] | string, variables?: {[key:string]: any}): Function`

## Operator Precedence
```
Highest: () f(), x.y, a[i]
! (factorial)
^ (right-assoc)
Unary +, -, not, sqrt, etc. (right-assoc)
*, /, %
+, -, ||
==, !=, >=, <=, >, <, in
and
or
?: (right-assoc)
= (assignment, right-assoc)
; (separator)
```

## Unary Operators
List: -x, +x, x!, abs x, acos x, acosh x, asin x, asinh x, atan x, atanh x, cbrt x, ceil x, cos x, cosh x, exp x, expm1 x, floor x, length x, ln x, log x, log10 x, log2 x, log1p x, not x, round x, sign x, sin x, sinh x, sqrt x, tan x, tanh x, trunc x.

## Pre-defined Functions
```
random(n?: number): number         // [0,n)
fac(n: number): number            // factorial (deprecated)
min(...values: number[]): number
max(...values: number[]): number
hypot(...args: number[]): number
pyt(a: number,b: number): number
pow(x: number,y: number): number
atan2(y: number,x: number): number
roundTo(x: number,n: number): number
map(f: Function,a: any[]): any[]
fold(f: Function,y: any,a: any[]): any
filter(f: Function,a: any[]): any[]
indexOf(x: any,a: any[]): number
join(sep: string,a: any[]): string
if(c: any,a: any,b: any): any
```

## Constants
```
parser.consts = {
  E: number,
  PI: number,
  true: boolean,
  false: boolean
}
```

## Custom Functions
```
parser.functions[key:string] = (...args)=>any;
delete parser.functions[key];
```

## Examples
```
const Parser = require('expr-eval').Parser;
const parser = new Parser({operators:{in:true,assignment:true}});
let expr = parser.parse('2 * x + 1');
expr.evaluate({x:3}); //7
Parser.evaluate('6 * x',{x:7}); //42
let f = expr.toJSFunction('x'); //function(x){return 2*x+1}
f(4); //9
```


## Attribution
- Source: expr-eval (Expression Parsing and Evaluation)
- URL: https://github.com/silentmatt/expr-eval#readme
- License: License
- Crawl Date: 2025-04-26T03:51:06.602Z
- Data Size: 668776 bytes
- Links Found: 5113

## Retrieved
2025-04-26
