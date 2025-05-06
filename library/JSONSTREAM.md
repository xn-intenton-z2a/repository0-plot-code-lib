# JSONSTREAM

## Crawl Summary
install npm install JSONStream; parse(path,map) returns Transform emitting header/data/footer; path supports string patterns such as 'rows.*.doc', recursive '..', array patterns using string, true, RegExp, function, {recurse:true}, {emitKey:true}, {emitPath:true}; stringify(open,sep,close) returns Writable with defaults open='[\\n', sep='\\n,\\n', close='\\n]\\n'; stringify(false) uses newline separator only; stringifyObject similar with '{\\n','\\n,\\n','\\n}\\n', accepts write([key,data]); numbers <=MAX_SAFE_INTEGER as Number, larger as String

## Normalised Extract
Table of Contents:
1 Installation
2 JSONStream.parse(path[,map])
3 Event API
4 JSONStream.stringify(open,sep,close)
5 JSONStream.stringifyObject(open,sep,close)
6 Recursive Patterns
7 Key and Path Emission
8 Number Handling

1 Installation
npm install JSONStream

2 JSONStream.parse(path[,map])
path: string or array pattern
  string examples: 'rows.*', 'rows.*.doc', 'docs..value'
  '..': recursive descent
array pattern elements:
  string: key name
  true: wildcard any key
  RegExp: match key
  function(value): custom test
  {recurse:true}: recursive descent
  {emitKey:true}: emit key/value pairs
  {emitPath:true}: emit match path/value
map: function(nodeValue) => return non-nullish to emit
returns: Transform stream emitting 'header','data','footer'

3 Event API
'on header': raw JSON before matches
'on data': each matched value or mapped result
'on footer': raw JSON after matches

4 JSONStream.stringify(open,sep,close)
returns Writable stream
defaults: open='[\n', sep='\n,\n', close='\n]\n'
write(value): serializes into JSON array
stringify(false): disables wrappers, uses '\n' separator

5 JSONStream.stringifyObject(open,sep,close)
returns Writable stream
defaults: open='{\n', sep='\n,\n', close='\n}\n'
write([key,value]): serializes into object entries

6 Recursive Patterns
use '..' in strings or {recurse:true} in arrays
example: JSONStream.parse('docs..value')

7 Key and Path Emission
{emitKey:true}: emit {key,value}
{emitPath:true}: emit {path,value}
string pattern 'obj.$*': emit keys for wildcard

8 Number Handling
numbers within JS safe integer range => Number
numbers outside range => string

## Supplementary Details
Defaults:
  JSONStream.stringify: open='[\n', sep='\n,\n', close='\n]\n'
  JSONStream.stringify(false): sep='\n', no open/close
  JSONStream.stringifyObject: open='{\n', sep='\n,\n', close='\n}\n'
Path patterns:
  string: dot-separated keys, '*' wildcard, '..' recursion, prefix '$' to '*' to emit key
  array: mix of string, true, RegExp, function(value), {recurse:true}, {emitKey:true}, {emitPath:true}
map callback: invoked per matched node value, return non-nullish to emit
Stream type: Transform extends Node.js stream.Transform
Writable type: inherits stream.Writable
Node.js versions: >=0.8
Dependencies: creationix/jsonparse >=1.2.0
License: MIT OR Apache-2.0

## Reference Details
API Specifications:

1. JSONStream.parse(path, map) -> Transform
  - path: string | Array<string|true|RegExp|Function|Object>
  - map: (nodeValue:any) => any | null | undefined
  Events:
    'header': listener(headerObject:Object)
    'data': listener(data:any)
    'footer': listener(footerObject:Object)
  Usage:
    var stream = JSONStream.parse(['rows', true, 'doc', {emitKey:true}]);
    stream.on('header', function(obj){ console.log(obj) });
    stream.on('data', function(node){ console.log(node.key, node.value) });
    stream.on('footer', function(obj){ console.log(obj) });

2. JSONStream.stringify(open?, sep?, close?) -> Writable
  - open: string, default='[\n'
  - sep: string, default='\n,\n'
  - close: string, default='\n]\n'
  Methods:
    write(value:any)
    end()
  Example:
    var out = JSONStream.stringify('[', ',', ']');
    out.write({a:1});
    out.write({b:2});
    out.end();

3. JSONStream.stringifyObject(open?, sep?, close?) -> Writable
  - open: string, default='{\n'
  - sep: string, default='\n,\n'
  - close: string, default='\n}\n'
  Methods:
    write([key:string, value:any])
    end()
  Example:
    var objOut = JSONStream.stringifyObject();
    objOut.write(['id', 123]);
    objOut.write(['name', 'abc']);
    objOut.end();

Concrete Best Practices:
  - Pipe HTTP responses: request(url).pipe(JSONStream.parse('rows.*.doc')).pipe(process.stdout)
  - Combine with event-stream mapSync for transformations
  - Use map parameter to filter or transform matched nodes
  - Use recursive patterns for nested JSON structures

Troubleshooting:
  - If no 'data' events: verify pattern syntax and JSON structure
  - Log 'header' to inspect pre-match content
  - Use map function with console.log to debug matching values
  - Ensure stream pipeline includes stream.resume() if paused

CLI Example:
  curl https://registry.npmjs.org/browserify | JSONStream 'versions.*.dependencies'

Configuration Options Effects:
  - stringify(false): newline-delimited JSON for streaming log lines
  - pattern array with RegExp: exact key matching without escape issues

Error Conditions:
  - Passing null or undefined path => no 'data' events
  - Invalid RegExp in array => thrown at stream creation
  - Exceeding memory when not using streaming: avoid JSON.parse on large payloads

## Information Dense Extract
npm install JSONStream;parse(path,map)->Transform;path:string('a.*.b','docs..value')|'array'[string,true,RegExp,Function,{recurse:true},{emitKey:true},{emitPath:true}];map filters/mapping;events:'header'(Object),'data'(value),'footer'(Object);stringify(open='[\n',sep='\n,\n',close='\n]\n')->Writable writes values as JSON array;stringify(false)->newline-delimited;stringifyObject(open='{\n',sep='\n,\n',close='\n}\n')->Writable.write([key,value]);numeric tokens<=2^53-1 Number,>String;use map to exclude nodes;prefix '$' to '*' for key emission

## Sanitised Extract
Table of Contents:
1 Installation
2 JSONStream.parse(path[,map])
3 Event API
4 JSONStream.stringify(open,sep,close)
5 JSONStream.stringifyObject(open,sep,close)
6 Recursive Patterns
7 Key and Path Emission
8 Number Handling

1 Installation
npm install JSONStream

2 JSONStream.parse(path[,map])
path: string or array pattern
  string examples: 'rows.*', 'rows.*.doc', 'docs..value'
  '..': recursive descent
array pattern elements:
  string: key name
  true: wildcard any key
  RegExp: match key
  function(value): custom test
  {recurse:true}: recursive descent
  {emitKey:true}: emit key/value pairs
  {emitPath:true}: emit match path/value
map: function(nodeValue) => return non-nullish to emit
returns: Transform stream emitting 'header','data','footer'

3 Event API
'on header': raw JSON before matches
'on data': each matched value or mapped result
'on footer': raw JSON after matches

4 JSONStream.stringify(open,sep,close)
returns Writable stream
defaults: open='['n', sep=''n,'n', close=''n]'n'
write(value): serializes into JSON array
stringify(false): disables wrappers, uses ''n' separator

5 JSONStream.stringifyObject(open,sep,close)
returns Writable stream
defaults: open='{'n', sep=''n,'n', close=''n}'n'
write([key,value]): serializes into object entries

6 Recursive Patterns
use '..' in strings or {recurse:true} in arrays
example: JSONStream.parse('docs..value')

7 Key and Path Emission
{emitKey:true}: emit {key,value}
{emitPath:true}: emit {path,value}
string pattern 'obj.$*': emit keys for wildcard

8 Number Handling
numbers within JS safe integer range => Number
numbers outside range => string

## Original Source
JSONStream Library
https://github.com/dominictarr/JSONStream#readme

## Digest of JSONSTREAM

# JSONStream.parse

Signature: JSONStream.parse(path[, map]) -> Transform

Parameters:
  path: string or array specifying JSONPath-like pattern. String patterns use dot notation with '*' wildcard and '..' recursive descent. Array patterns can include:
    - string: exact key name
    - true: wildcard matching any key
    - RegExp: key matches regex
    - function(value): custom filter function
    - {recurse:true}: recursive descent same as '..'
    - {emitKey:true}: emit key and value object
    - {emitPath:true}: emit path and value object
  map (optional): function(nodeValue) returning non-nullish to emit, nullish to skip

Returns: Transform stream emitting 'header', 'data', 'footer' events.

# Events

  'header': raw JSON chunk before first match
  'data': emitted for each matching node or mapped value
  'footer': raw JSON chunk after last match

# JSONStream.stringify

Signature: JSONStream.stringify([open, sep, close]) -> Writable

Parameters:
  open: string written before first element. Default '[\n'
  sep: string between elements. Default '\n,\n'
  close: string after last element. Default '\n]\n'

Behavior:
  - Calling stringify(false) disables open/close wrapper and uses '\n' as separator only
  - Writing values serializes into a JSON array or newline-delimited JSON sequence

# JSONStream.stringifyObject

Signature: JSONStream.stringifyObject([open, sep, close]) -> Writable

Parameters:
  open: default '{\n'
  sep: default '\n,\n'
  close: default '\n}\n'

Behavior:
  - Write entries using write([key, data]) to serialize object properties

# Recursive Patterns

Use '..' in string patterns or {recurse:true} in array patterns for recursive descent. Example:
  JSONStream.parse('docs..value')
  JSONStream.parse(['docs', {recurse:true}, 'value'])
Emits every 'value' property at any depth under 'docs'.

# Key and Path Emission

Pattern element {emitKey:true}: emits objects {key, value}
Pattern element {emitPath:true}: emits objects {path, value}
Prefix '$' to '*' in string pattern: 'obj.$*' to enable key emission

# Numbers

Numeric tokens within JavaScript safe range emitted as Number. Tokens exceeding MAX_SAFE_INTEGER emitted as string to preserve precision.

# Defaults and Dependencies

Module depends on creationix/jsonparse. Dual MIT or Apache 2.0 license. Archived read-only.

Retrieval Date: 2023-10-01

## Attribution
- Source: JSONStream Library
- URL: https://github.com/dominictarr/JSONStream#readme
- License: License: MIT
- Crawl Date: 2025-05-06T20:30:18.494Z
- Data Size: 800262 bytes
- Links Found: 5270

## Retrieved
2025-05-06
