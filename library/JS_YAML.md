# JS_YAML

## Crawl Summary
load: parses single-doc YAML, options filename:null, onWarning:null, schema:DEFAULT_SCHEMA, json:false. loadAll: parses multi-doc, returns array or applies iterator, same options. dump: serializes JS to YAML string, options indent:2, noArrayIndent:false, skipInvalid:false, flowLevel:-1, styles:{}, schema:DEFAULT_SCHEMA, sortKeys:false, lineWidth:80, noRefs:false, noCompatMode:false, condenseFlow:false, quotingType:'', forceQuotes:false, replacer:null. CLI: js-yaml [-h|-v|-c|-t] file. Supports YAML 1.2 spec, primary tags null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map. Caveats: object keys stringified, no implicit block mapping property read.

## Normalised Extract
Table of Contents:
1. Methods
2. CLI Usage
3. Options Details
4. Styles Map
5. Supported Types
6. Caveats

1. Methods
 load
  Signature: load(string, options)
  Returns: object|string|number|null|undefined
  Throws: YAMLException
  Options:
   filename: string|null (default null)
   onWarning: function(YAMLException)|null (default null)
   schema: FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
   json: boolean (default false)

 loadAll
  Signature: loadAll(string, iterator, options)
  Returns: array of documents or void when iterator used
  Throws: YAMLException
  Options: same as load

 dump
  Signature: dump(object, options)
  Returns: string
  Throws: YAMLException (unless skipInvalid=true)
  Options:
   indent: number (default 2)
   noArrayIndent: boolean (default false)
   skipInvalid: boolean (default false)
   flowLevel: number (default -1)
   styles: map<tag:string,style:string> (default {})
   schema: DEFAULT_SCHEMA (default)
   sortKeys: boolean|function (default false)
   lineWidth: number (default 80)
   noRefs: boolean (default false)
   noCompatMode: boolean (default false)
   condenseFlow: boolean (default false)
   quotingType: ' or " (default ')
   forceQuotes: boolean (default false)
   replacer: function or null (default null)

2. CLI Usage
 Command: js-yaml [options] file
 Options:
  -h, --help  
  -v, --version
  -c, --compact
  -t, --trace

3. Options Details
 filename: used in messages; onWarning: warning callback; json: JSON.parse-like duplicate key handling

4. Styles Map
 !!null: canonical,lowercase,uppercase,camelcase,empty
 !!int: binary,octal,decimal,hexadecimal
 !!bool: lowercase,uppercase,camelcase
 !!float: lowercase,uppercase,camelcase

5. Supported Types
 null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map

6. Caveats
 object/array keys stringified
 no property read on implicit block mapping keys

## Supplementary Details
Installation and Setup:
- npm install js-yaml
- npm install -g js-yaml for CLI
- require: const yaml = require('js-yaml'); const fs = require('fs');
- Read file: fs.readFileSync(path, 'utf8')

Schemas:
- FAILSAFE_SCHEMA: strings, arrays, objects only
- JSON_SCHEMA: JSON types (null, boolean, number, string, array, object)
- CORE_SCHEMA: alias of JSON_SCHEMA
- DEFAULT_SCHEMA: includes YAML 1.2 types (null,bool,int,float,binary,timestamp,omap,pairs,set)

Implementation Steps:
1. Read YAML source
2. Call yaml.load or yaml.loadAll
3. Handle YAMLException in try/catch
4. Process returned JS object(s)
5. To serialize, call yaml.dump
6. Pass dump options to adjust formatting (indent,lineWidth,styles)

Default Option Values:
indent=2; noArrayIndent=false; skipInvalid=false; flowLevel=-1; schema=DEFAULT_SCHEMA; sortKeys=false; lineWidth=80; noRefs=false; noCompatMode=false; condenseFlow=false; quotingType="'"; forceQuotes=false; replacer=null


## Reference Details
API Specifications:

Function: load(string, options)
Parameters:
 string: YAML source text
 options: {
  filename?: string|null,
  onWarning?: (warn: YAMLException)=>void,
  schema?: Schema,
  json?: boolean
 }
Returns: any (object|string|number|null|undefined)
Throws: YAMLException

Function: loadAll(string, iterator?, options?)
Parameters:
 string: YAML source text
 iterator?: (doc:any)=>void
 options?: same as load
Returns: any[] when iterator omitted; void when iterator provided
Throws: YAMLException

Function: dump(object, options)
Parameters:
 object: JS object to serialize
 options: {
  indent?: number,
  noArrayIndent?: boolean,
  skipInvalid?: boolean,
  flowLevel?: number,
  styles?: { [tag:string]:string },
  schema?: Schema,
  sortKeys?: boolean|((a:string,b:string)=>number),
  lineWidth?: number,
  noRefs?: boolean,
  noCompatMode?: boolean,
  condenseFlow?: boolean,
  quotingType?: '"'|"\'",
  forceQuotes?: boolean,
  replacer?: (key:string,value:any)=>any
 }
Returns: string
Throws: YAMLException

CLI Invocation:
$ js-yaml [options] file
Options and Effects:
 -h, --help       display help
 -v, --version    display version
 -c, --compact    error messages in compact mode
 -t, --trace      include stack trace on error
Exit Codes: 0 on success; 1 on parse error

Code Examples:

// Load example.yml as JS object
const yaml = require('js-yaml');
const fs   = require('fs');
try {
  const input = fs.readFileSync('/path/example.yml','utf8');
  const doc = yaml.load(input, { filename:'/path/example.yml', onWarning:w=>console.warn(w), json:true });
  console.log(doc);
} catch (e) {
  console.error('YAML error:', e.message);
}

// Dump JS object with custom options
const obj = { foo:null, bar:[1,2,3], nested:{a:1,b:2} };
const yamlStr = yaml.dump(obj, { indent:4, sortKeys:true, lineWidth:120, styles:{'!!null':'empty'} });
console.log(yamlStr);

Best Practices:
- Use json:true to handle duplicate keys gracefully
- Enable skipInvalid:true to omit unsupported types during dump
- Use custom styles map to control tag serialization
- Sort keys for predictable output in CI/CD

Troubleshooting:
# Display help
$ js-yaml --help
# Check version
$ js-yaml --version
# Parse with trace on error
$ js-yaml -t bad.yml
Expected output:
Error: unacceptable indentation at line 3, column 5
    at generateError (lib/loader.js:xxx:xx)
    at fail (lib/loader.js:xxx:xx)
# Compact errors
$ js-yaml -c bad.yml
unacceptable indentation at line 3, column 5


## Information Dense Extract
load(string,options): returns JS value or throws YAMLException; options: filename=null,onWarning=null,schema=DEFAULT_SCHEMA,json=false; loadAll(string,iterator,options): same options, returns array if no iterator, else void; dump(object,options): returns YAML string; options: indent=2,noArrayIndent=false,skipInvalid=false,flowLevel=-1,styles={},schema=DEFAULT_SCHEMA,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType="'",forceQuotes=false,replacer=null; CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file; Styles: !!null[canonical,lowercase,uppercase,camelcase,empty];!!int[binary,octal,decimal,hexadecimal];!!bool[lowercase,uppercase,camelcase];!!float[lowercase,uppercase,camelcase]; Supported types: null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map; Caveats: object/array keys stringified, implicit block mapping property read unsupported.

## Sanitised Extract
Table of Contents:
1. Methods
2. CLI Usage
3. Options Details
4. Styles Map
5. Supported Types
6. Caveats

1. Methods
 load
  Signature: load(string, options)
  Returns: object|string|number|null|undefined
  Throws: YAMLException
  Options:
   filename: string|null (default null)
   onWarning: function(YAMLException)|null (default null)
   schema: FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
   json: boolean (default false)

 loadAll
  Signature: loadAll(string, iterator, options)
  Returns: array of documents or void when iterator used
  Throws: YAMLException
  Options: same as load

 dump
  Signature: dump(object, options)
  Returns: string
  Throws: YAMLException (unless skipInvalid=true)
  Options:
   indent: number (default 2)
   noArrayIndent: boolean (default false)
   skipInvalid: boolean (default false)
   flowLevel: number (default -1)
   styles: map<tag:string,style:string> (default {})
   schema: DEFAULT_SCHEMA (default)
   sortKeys: boolean|function (default false)
   lineWidth: number (default 80)
   noRefs: boolean (default false)
   noCompatMode: boolean (default false)
   condenseFlow: boolean (default false)
   quotingType: ' or ' (default ')
   forceQuotes: boolean (default false)
   replacer: function or null (default null)

2. CLI Usage
 Command: js-yaml [options] file
 Options:
  -h, --help  
  -v, --version
  -c, --compact
  -t, --trace

3. Options Details
 filename: used in messages; onWarning: warning callback; json: JSON.parse-like duplicate key handling

4. Styles Map
 !!null: canonical,lowercase,uppercase,camelcase,empty
 !!int: binary,octal,decimal,hexadecimal
 !!bool: lowercase,uppercase,camelcase
 !!float: lowercase,uppercase,camelcase

5. Supported Types
 null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map

6. Caveats
 object/array keys stringified
 no property read on implicit block mapping keys

## Original Source
js-yaml Usage Guide
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# js-yaml API (Retrieved: 2024-06-15)

# load (string [, options])
Parses a YAML string as a single document. Returns a JavaScript value or throws YAMLException on error.

Signature:
```js
load(string, options)
```
Returns: object | string | number | null | undefined
Throws: YAMLException

Options:
- filename (string|null, default: null): file path for error/warning messages
- onWarning (function(YAMLException)|null, default: null): invoked on each warning
- schema (Schema, default: DEFAULT_SCHEMA): YAML schema to apply
  - FAILSAFE_SCHEMA: only strings, arrays, plain objects
  - JSON_SCHEMA: JSON types support
  - CORE_SCHEMA: alias of JSON_SCHEMA
  - DEFAULT_SCHEMA: all YAML 1.2 types
- json (boolean, default: false): duplicate keys override values instead of error

# loadAll (string [, iterator] [, options])
Parses multi-document YAML source. If iterator provided, invokes iterator(doc) per document; otherwise returns an array of documents.

Signature:
```js
loadAll(string, iterator, options)
```
Returns: void | Array<any>
Throws: YAMLException

Options: same as load

# dump (object [, options])
Serializes a JavaScript object into a YAML document string.

Signature:
```js
dump(object, options)
```
Returns: string
Throws: YAMLException if invalid types encountered unless skipInvalid=true

Options:
- indent (number, default: 2): indentation width in spaces
- noArrayIndent (boolean, default: false): no extra indent on array elements
- skipInvalid (boolean, default: false): skip invalid types instead of throwing
- flowLevel (number, default: -1): nesting level to switch to flow style (-1 = block always)
- styles (object[tag:string]=>style:string, default: {}): per-tag style overrides
- schema (Schema, default: DEFAULT_SCHEMA)
- sortKeys (boolean|function, default: false): sort mapping keys or custom sort function
- lineWidth (number, default: 80): maximum line width (-1 = unlimited)
- noRefs (boolean, default: false): disable object reference anchors
- noCompatMode (boolean, default: false): disable legacy YAML 1.1 compatibility (no quoting of yes/no)
- condenseFlow (boolean, default: false): condense flow sequences and mappings
- quotingType ("'"|"\"", default: "'"): style for quoting strings
- forceQuotes (boolean, default: false): quote all non-key strings
- replacer (function(key:string, value:any), default: null): JSON.stringify-style replacer

# CLI Executable
Usage: js-yaml [options] file
Options:
- -h, --help: show help and exit
- -v, --version: show version and exit
- -c, --compact: compact error output
- -t, --trace: include stack trace on error

# Styles Table
Lists available output styles per YAML tag:

!!null: canonical("~"), lowercase("null"), uppercase("NULL"), camelcase("Null"), empty("")
!!int: binary(0b...), octal(0o...), decimal(1,42,...), hexadecimal(0x...)
!!bool: lowercase(true,false), uppercase(TRUE,FALSE), camelcase(True,False)
!!float: lowercase(.nan,.inf), uppercase(.NAN,.INF), camelcase(.NaN,.Inf)

# Supported YAML Types
Tag => JS type
!!null => null
!!bool => boolean
!!int => number
!!float => number
!!binary => Buffer
!!timestamp => Date
!!omap => Array<[key,value]>
!!pairs => Array<[key,value]>
!!set => Array of {key:null}
!!str => string
!!seq => Array
!!map => Object

# Caveats
- Arrays or objects used as mapping keys are stringified via toString().
- Implicit block mapping keys do not support property reading.
- Duplicate anchor keys in block mapping are not currently supported.

## Attribution
- Source: js-yaml Usage Guide
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT
- Crawl Date: 2025-05-10T23:01:39.778Z
- Data Size: 656176 bytes
- Links Found: 4983

## Retrieved
2025-05-10
