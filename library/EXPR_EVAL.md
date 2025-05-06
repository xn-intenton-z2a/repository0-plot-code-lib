# EXPR_EVAL

## Crawl Summary
Installation via npm. Parser constructor accepts an optional operators map to enable/disable each operator category. Static methods: parse(expression:string):Expression, evaluate(expression:string,variables?:object):number. Expression instance methods: evaluate(vars):number, substitute(var,expr):Expression, simplify(vars):Expression, variables({withMembers}):string[], symbols({withMembers}):string[], toString():string, toJSFunction(params:string[]|string,vars?):Function. Full operator precedence table. Unary operator list. Pre-defined functions with exact signatures. Custom function injection via parser.functions. Default and customizable constants in parser.consts. Test commands: npm test.

## Normalised Extract
Table of Contents
1 Installation
2 Parser Instantiation and Options
3 Static Parsing and Evaluation
4 Expression Instance Methods
5 Operator Precedence
6 Unary Operators List
7 Pre-defined Function Signatures
8 Custom Functions
9 Constants Configuration
10 Testing Procedure

1 Installation
npm install expr-eval

2 Parser Instantiation and Options
new Parser(options?:{
  operators?:{
    add:boolean,concatenate:boolean,conditional:boolean,divide:boolean,factorial:boolean,multiply:boolean,power:boolean,remainder:boolean,subtract:boolean,logical:boolean,comparison:boolean,in:boolean,assignment:boolean
  }
})
Defaults: all true.

3 Static Parsing and Evaluation
Parser.parse(expression:string):Expression
Parser.evaluate(expression:string,variables?:object):number // equivalent to parse+evaluate

4 Expression Instance Methods
evaluate(variables?:object):number
substitute(variable:string,expression:Expression|string|number):Expression
simplify(variables:object):Expression
variables(options?:{withMembers:boolean}):string[]
symbols(options?:{withMembers:boolean}):string[]
toString():string
toJSFunction(parameters:string[]|string,variables?:object):Function

5 Operator Precedence
( ), f(), x.y, a[i] (highest);
!, ^; unary (+, - , not, sqrt, etc.);
*, /, %;
+, -, ||;
==, !=, >=, <=, >, <, in;
and;
or;
x?y:z;
=; ; (lowest)

6 Unary Operators List
-x, +x, x!, abs x, acos x, acosh x, asin x, asinh x, atan x, atanh x, cbrt x, ceil x, cos x, cosh x, exp x, expm1 x, floor x, length x, ln x, log x, log10 x, log2 x, log1p x, not x, round x, sign x, sin x, sinh x, sqrt x, tan x, tanh x, trunc x

7 Pre-defined Function Signatures
random(n?:number):number
fac(n:number):number
min(...a:number[]):number
max(...a:number[]):number
hypot(...a:number[]):number
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

8 Custom Functions
parser.functions.customName = function(...args){...}
delete parser.functions.<name>

9 Constants Configuration
Default: parser.consts={E:Math.E,PI:Math.PI,true:true,false:false}
Customize: parser.consts.KEY = VALUE
Disable: parser.consts = {}

10 Testing Procedure
cd <project>
npm install
npm test

## Supplementary Details
Installation step installs package from npm registry. Parser.options.operators default map enables all arithmetic and logical operators. Set operator flags to false to disable. Static methods invoke parser parse-evaluate flow. Expression.substitute uses parse internally for string or numeric input. simplify performs partial constant folding. variables() and symbols() accept withMembers:true to return full member chains. toJSFunction parametrizes by list or comma-separated string; optional variables bound before code generation. parser.functions is a mutable object to inject or delete runtime functions. parser.consts stores named constants; can assign or reset object entirely. Test suite runs on Mocha/Chai, commands: npm test returns success code 0 on pass.

## Reference Details
Parser API:
constructor Parser(options?:{operators?:{add:boolean;concatenate:boolean;conditional:boolean;divide:boolean;factorial:boolean;multiply:boolean;power:boolean;remainder:boolean;subtract:boolean;logical:boolean;comparison:boolean;in:boolean;assignment:boolean}})
Parameters:
- options.operators.add (default:true)
- options.operators.concatenate (default:true)
... (all boolean defaults true)

Returns: Parser instance

Static Methods:
Parser.parse(expression: string): Expression
- expression: string, must conform to grammar
Returns: Expression object; throws SyntaxError on invalid input

Parser.evaluate(expression: string, variables?: object): number
- expression: string
- variables: object mapping variable names to numeric values or functions
Returns: number result; throws Error on unbound variables or invalid operations

Expression Methods:
evaluate(variables?:object): number
substitute(variable:string,expression:Expression|string|number): Expression
simplify(variables:object): Expression
variables(options?:{withMembers:boolean}): string[]
symbols(options?:{withMembers:boolean}): string[]
toString(): string
toJSFunction(parameters:string[]|string,variables?:object): Function

Configuration Patterns:
Disable comparison:
const parser = new Parser({operators:{comparison:false}})
Add custom function:
parser.functions.myFunc = (x,y) => x*y;

Constants:
parser.consts.NEW_CONST = 123; delete parser.consts.PI;

Best Practices Code:
// Pre-compile expression for repeated evaluation
const expr = Parser.parse('a * b + c');
const fn = expr.toJSFunction(['a','b','c']);
console.log(fn(2,3,4)); // 10

Troubleshooting:
$ Parser.parse('2 * ').evaluate()
Error: Unexpected end of expression

$ expr.evaluate({})
Error: Unbound variable: x
Ensure variables object includes all referenced variables.

$ npm test
> expr-eval@* test
> mocha

  385 passing (XXms)


## Information Dense Extract
expr-eval@Parser(options?):operators flags boolean default true; static parse(str):Expression; static evaluate(str,vars?):number; Expression.evaluate(vars?):number; .substitute(name,expr):Expression; .simplify(vars):Expression; .variables({withMembers}?):string[]; .symbols({withMembers}?):string[]; .toString():string; .toJSFunction(params:string[]|string,vars?):Function; Operator precedence: () > call/access > ! > ^ > unary(+,-,not,fn) > *,/,% > +,-,|| > comparisons,in > and > or > ternary > assignment > separator; Unary ops: -x,+x,x!,abs,acos,acosh,asin,asinh,atan,atanh,cbrt,ceil,cos,cosh,exp,expm1,floor,length,ln,log,log10,log2,log1p,not,round,sign,sin,sinh,sqrt,tan,tanh,trunc; Functions: random(n?):number; fac(n):number; min(...n):number; max(...); hypot(...); pyt(a,b); pow(x,y); atan2(y,x); roundTo(x,n); map(f,a); fold(f,y,a); filter(f,a); indexOf(x,a):number; join(sep,a):string; if(c,a,b); parser.functions custom injection; parser.consts default {E,PI,true,false}, mutable; Test: npm test returns code 0 on pass.

## Sanitised Extract
Table of Contents
1 Installation
2 Parser Instantiation and Options
3 Static Parsing and Evaluation
4 Expression Instance Methods
5 Operator Precedence
6 Unary Operators List
7 Pre-defined Function Signatures
8 Custom Functions
9 Constants Configuration
10 Testing Procedure

1 Installation
npm install expr-eval

2 Parser Instantiation and Options
new Parser(options?:{
  operators?:{
    add:boolean,concatenate:boolean,conditional:boolean,divide:boolean,factorial:boolean,multiply:boolean,power:boolean,remainder:boolean,subtract:boolean,logical:boolean,comparison:boolean,in:boolean,assignment:boolean
  }
})
Defaults: all true.

3 Static Parsing and Evaluation
Parser.parse(expression:string):Expression
Parser.evaluate(expression:string,variables?:object):number // equivalent to parse+evaluate

4 Expression Instance Methods
evaluate(variables?:object):number
substitute(variable:string,expression:Expression|string|number):Expression
simplify(variables:object):Expression
variables(options?:{withMembers:boolean}):string[]
symbols(options?:{withMembers:boolean}):string[]
toString():string
toJSFunction(parameters:string[]|string,variables?:object):Function

5 Operator Precedence
( ), f(), x.y, a[i] (highest);
!, ^; unary (+, - , not, sqrt, etc.);
*, /, %;
+, -, ||;
==, !=, >=, <=, >, <, in;
and;
or;
x?y:z;
=; ; (lowest)

6 Unary Operators List
-x, +x, x!, abs x, acos x, acosh x, asin x, asinh x, atan x, atanh x, cbrt x, ceil x, cos x, cosh x, exp x, expm1 x, floor x, length x, ln x, log x, log10 x, log2 x, log1p x, not x, round x, sign x, sin x, sinh x, sqrt x, tan x, tanh x, trunc x

7 Pre-defined Function Signatures
random(n?:number):number
fac(n:number):number
min(...a:number[]):number
max(...a:number[]):number
hypot(...a:number[]):number
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

8 Custom Functions
parser.functions.customName = function(...args){...}
delete parser.functions.<name>

9 Constants Configuration
Default: parser.consts={E:Math.E,PI:Math.PI,true:true,false:false}
Customize: parser.consts.KEY = VALUE
Disable: parser.consts = {}

10 Testing Procedure
cd <project>
npm install
npm test

## Original Source
expr-eval Parser Library
https://github.com/silentmatt/expr-eval#readme

## Digest of EXPR_EVAL

# Retrieved: 2024-07-18

# Installation

```
npm install expr-eval
```

# Parser Class

**Constructor**
```
new Parser(options?: {
  operators?: {
    add:boolean;
    concatenate:boolean;
    conditional:boolean;
    divide:boolean;
    factorial:boolean;
    multiply:boolean;
    power:boolean;
    remainder:boolean;
    subtract:boolean;
    logical:boolean;
    comparison:boolean;
    in:boolean;
    assignment:boolean;
  }
})
```

**Static Methods**
```
Parser.parse(expression: string): Expression
Parser.evaluate(expression: string, variables?: object): number
```

# Expression API

**Instance Methods**
```
evaluate(variables?: object): number   // throws Error on unbound variables
substitute(variable: string, expression: Expression | string | number): Expression
simplify(variables: object): Expression  // partial evaluation
variables(options?: {withMembers: boolean}): string[]
symbols(options?: {withMembers: boolean}): string[]
toString(): string
toJSFunction(parameters: string[] | string, variables?: object): Function
```

# Operator Precedence

| Operator                                  | Associativity |
|-------------------------------------------|---------------|
| ( )                                       | None          |
| f(), x.y, a[i]                            | Left          |
| !                                         | Left          |
| ^                                         | Right         |
| +, -, not, sqrt, etc.                     | Right         |
| *, /, %                                   | Left          |
| +, -, ||                                  | Left          |
| ==, !=, >=, <=, >, <, in                  | Left          |
| and                                       | Left          |
| or                                        | Left          |
| x ? y : z                                 | Right         |
| =                                         | Right         |
| ;                                         | Left          |

# Unary Operators

Negation: -x
Unary plus: +x
Factorial: x!
abs x | acos x | acosh x | asin x | asinh x | atan x | atanh x | cbrt x | ceil x | cos x | cosh x | exp x | expm1 x | floor x | length x | ln x | log x | log10 x | log2 x | log1p x | not x | round x | sign x | sin x | sinh x | sqrt x | tan x | tanh x | trunc x

# Pre-defined Functions

random(n?: number): number
fac(n: number): number  // deprecated
min(...a: number[]): number
max(...a: number[]): number
hypot(...a: number[]): number
pyt(a: number, b: number): number
pow(x: number, y: number): number
atan2(y: number, x: number): number
roundTo(x: number, n: number): number
map(f: Function, a: any[]): any[]
fold(f: Function, y: any, a: any[]): any
filter(f: Function, a: any[]): any[]
indexOf(x: any, a: any[]|string): number
join(sep: string, a: any[]): string
if(c: any, a: any, b: any): any

# Custom JavaScript Functions

```js
const parser = new Parser();
parser.functions.customAddFunction = function(arg1, arg2) {
  return arg1 + arg2;
};
delete parser.functions.fac;
parser.evaluate('customAddFunction(2,4) == 6'); // true
```

# Constants

Default parser.consts = {
  E: Math.E,
  PI: Math.PI,
  true: true,
  false: false
}
Customize: parser.consts.R = 1.234
Disable: parser.consts = {}

# Tests

```bash
cd expr-eval
npm install
npm test
```

## Attribution
- Source: expr-eval Parser Library
- URL: https://github.com/silentmatt/expr-eval#readme
- License: License: MIT
- Crawl Date: 2025-05-06T06:31:05.224Z
- Data Size: 609598 bytes
- Links Found: 4770

## Retrieved
2025-05-06
