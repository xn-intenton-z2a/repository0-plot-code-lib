# JS_YAML

## Crawl Summary
load: parse single document via load(string,options)->Object|String|Number|null|undefined, options: filename:String|null, onWarning:Function, schema:DEFAULT_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|FAILSAFE_SCHEMA, json:Boolean; loadAll: parse multi-docs via loadAll(string,iterator?,options)->Array or iterates docs; dump: serialize object->YAML string, options control indent, flowLevel, skipInvalid, styles, schema, sortKeys, lineWidth, refs, compatMode, condenseFlow, quotingType, forceQuotes, replacer; CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file; Tag styles: configurable per tag output for !!null,!!int,!!bool,!!float; Supported types mapped to JS primitives; Caveats: object/array keys stringified, anchors limited.

## Normalised Extract
Table of Contents:
1 Installation
2 CLI Usage
3 load(string,options)
4 loadAll(string,iterator,options)
5 dump(object,options)
6 Tag Styles
7 Supported Types
8 Caveats

1 Installation:
npm install js-yaml
npm install -g js-yaml

2 CLI Usage:
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3 load(string,options):
Returns Object|String|Number|null|undefined or throws YAMLException
Options:
  filename: String|null (default null)
  onWarning: Function(YAMLException) (default null)
  schema: SchemaConstant (FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA; default DEFAULT_SCHEMA)
  json: Boolean (default false)

4 loadAll(string,iterator,options):
Returns Array<any> or invokes iterator per doc; options same as load

5 dump(object,options):
Returns YAML string
Options:
  indent: Number (default 2)
  noArrayIndent: Boolean (default false)
  skipInvalid: Boolean (default false)
  flowLevel: Number (default -1)
  styles: Record<tag,style> (default {})
  schema: SchemaConstant (default DEFAULT_SCHEMA)
  sortKeys: Boolean|Function (default false)
  lineWidth: Number (default 80)
  noRefs: Boolean (default false)
  noCompatMode: Boolean (default false)
  condenseFlow: Boolean (default false)
  quotingType: ' or " (default ')
  forceQuotes: Boolean (default false)
  replacer: Function(key,value)

6 Tag Styles:
!!null: canonical(~),lowercase(null),uppercase(NULL),camelcase(Null),empty("")
!!int: binary(0b1),octal(0o1),decimal(1),hexadecimal(0x1)
!!bool: lowercase(true/false),uppercase(TRUE/FALSE),camelcase(True/False)
!!float: lowercase(.nan/.inf),uppercase(.NAN/.INF),camelcase(.NaN/.Inf)

7 Supported Types:
!!null->null, !!bool->Boolean, !!int->Number, !!float->Number, !!binary->Buffer, !!timestamp->Date, !!omap->Array<[key,value]>, !!pairs->Array<[key,value]>, !!set->Array<{[key]:null}>, !!str->String, !!seq->Array, !!map->Object

8 Caveats:
JS-YAML stringifies object/array keys; multi-doc input requires loadAll


## Supplementary Details
Implementation Steps:
1  require('js-yaml');  const fs = require('fs');
2  Read input: const data = fs.readFileSync('file.yml','utf8');
3  Single doc: try { const doc = yaml.load(data,{filename:'file.yml',onWarning:warnFn,schema:yaml.JSON_SCHEMA,json:true}); } catch(e){handleError(e)}
4  Multi-doc: yaml.loadAll(data,doc=>process(doc),{schema:yaml.CORE_SCHEMA});
5  Serialization: const out = yaml.dump(obj,{indent:4,sortKeys:true,styles:{'!!null':'canonical'},lineWidth:-1,noRefs:true});

Schema Constants:
yaml.FAILSAFE_SCHEMA
yaml.JSON_SCHEMA
yaml.CORE_SCHEMA
yaml.DEFAULT_SCHEMA

Warning Handler:
function warnFn(e){ console.warn('YAML warning:', e.message) }

skipInvalid:
set skipInvalid:true to omit invalid entries rather than throwing

Flow Control:
flowLevel:-1 for block-only, 0 for flow at root, n for deeper

References:
set noRefs:true to disable anchors and references
enable noCompatMode:true to enforce YAML 1.2 quoting

Custom Replacer Example:
function replacer(key,value){ if(key==='secret') return undefined; return value }


## Reference Details
API Specifications:

function load(
  string: string,
  options?: {
    filename?: string | null,
    onWarning?: (e: YAMLException) => void,
    schema?: Schema,
    json?: boolean
  }
): any
Throws: YAMLException on parse errors or multi-document input

function loadAll(
  string: string,
  iterator?: (doc: any) => void,
  options?: {
    filename?: string | null,
    onWarning?: (e: YAMLException) => void,
    schema?: Schema,
    json?: boolean
  }
): any[]

function dump(
  object: any,
  options?: {
    indent?: number,
    noArrayIndent?: boolean,
    skipInvalid?: boolean,
    flowLevel?: number,
    styles?: {[tag: string]: string},
    schema?: Schema,
    sortKeys?: boolean | ((a:string,b:string)=>number),
    lineWidth?: number,
    noRefs?: boolean,
    noCompatMode?: boolean,
    condenseFlow?: boolean,
    quotingType?: "'" | "\"",
    forceQuotes?: boolean,
    replacer?: (key: string, value: any) => any
  }
): string

Code Examples:
```js
const yaml = require('js-yaml');
const fs = require('fs');

// Load single
const single = yaml.load(fs.readFileSync('a.yml','utf8'));

// Load all
yaml.loadAll(fs.readFileSync('a.yml','utf8'), doc => console.log(doc));

// Dump with custom settings
const str = yaml.dump(
  {a:1, b:[2,3]},
  {indent:4, sortKeys:(a,b)=>a.localeCompare(b), noRefs:true}
);
```

Troubleshooting:
- Error: "YAMLException: multi-document source": switch to `loadAll`
- Duplicate key error: set `json:true` or handle in `onWarning`
- File not found: CLI returns `ENOENT` with stack trace; use `--compact` for concise output

Best Practices:
- Always specify `schema` when using custom tags
- Use `noRefs:true` for self-contained YAML output
- Use `json:true` for JSON interoperability
- Set `lineWidth:-1` to preserve long strings


## Information Dense Extract
load:str,opts->{filename:string|null,onWarning:fn(e),schema:SchemaConstant,json:bool}->any;loadAll:str,iter?,opts->Array<any>|iter;dump:obj,opts->{indent:2..n,noArrayIndent:bool,skipInvalid:bool,flowLevel:int,styles:map, schema:SchemaConstant, sortKeys:bool|fn, lineWidth:int, noRefs:bool, noCompatMode:bool, condenseFlow:bool, quotingType:"'"|"\"", forceQuotes:bool, replacer:fn}->string;Schemas:FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA;CLI:js-yaml [-h,--help] [-v,--version] [-c,--compact] [-t,--trace] file;TagStyles:!!null(canonical,lowercase,uppercase,camelcase,empty),!!int(binary,octal,decimal,hexadecimal),!!bool(lowercase,uppercase,camelcase),!!float(lowercase,uppercase,camelcase);SupportedTypes:null,Boolean,Number,Buffer,Date,Array<{k,v}>,Object;Caveats:object/array keys stringified,multi-doc loadAll required

## Sanitised Extract
Table of Contents:
1 Installation
2 CLI Usage
3 load(string,options)
4 loadAll(string,iterator,options)
5 dump(object,options)
6 Tag Styles
7 Supported Types
8 Caveats

1 Installation:
npm install js-yaml
npm install -g js-yaml

2 CLI Usage:
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3 load(string,options):
Returns Object|String|Number|null|undefined or throws YAMLException
Options:
  filename: String|null (default null)
  onWarning: Function(YAMLException) (default null)
  schema: SchemaConstant (FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA; default DEFAULT_SCHEMA)
  json: Boolean (default false)

4 loadAll(string,iterator,options):
Returns Array<any> or invokes iterator per doc; options same as load

5 dump(object,options):
Returns YAML string
Options:
  indent: Number (default 2)
  noArrayIndent: Boolean (default false)
  skipInvalid: Boolean (default false)
  flowLevel: Number (default -1)
  styles: Record<tag,style> (default {})
  schema: SchemaConstant (default DEFAULT_SCHEMA)
  sortKeys: Boolean|Function (default false)
  lineWidth: Number (default 80)
  noRefs: Boolean (default false)
  noCompatMode: Boolean (default false)
  condenseFlow: Boolean (default false)
  quotingType: ' or ' (default ')
  forceQuotes: Boolean (default false)
  replacer: Function(key,value)

6 Tag Styles:
!!null: canonical(~),lowercase(null),uppercase(NULL),camelcase(Null),empty('')
!!int: binary(0b1),octal(0o1),decimal(1),hexadecimal(0x1)
!!bool: lowercase(true/false),uppercase(TRUE/FALSE),camelcase(True/False)
!!float: lowercase(.nan/.inf),uppercase(.NAN/.INF),camelcase(.NaN/.Inf)

7 Supported Types:
!!null->null, !!bool->Boolean, !!int->Number, !!float->Number, !!binary->Buffer, !!timestamp->Date, !!omap->Array<[key,value]>, !!pairs->Array<[key,value]>, !!set->Array<{[key]:null}>, !!str->String, !!seq->Array, !!map->Object

8 Caveats:
JS-YAML stringifies object/array keys; multi-doc input requires loadAll

## Original Source
js-yaml YAML Parser & Dumper
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML README

## Overview
JS-YAML is a YAML 1.2 parser and writer for JavaScript. It is rewritten from scratch and optimized for speed.

## Installation

```bash
npm install js-yaml
npm install -g js-yaml   # for CLI usage
```

## CLI Usage

```
usage: js-yaml [-h] [-v] [-c] [-t] file
```

Options:
  -h, --help       Show this help message and exit.
  -v, --version    Show program's version number and exit.
  -c, --compact    Display errors in compact mode
  -t, --trace      Show stack trace on error

## API Methods

### load(string[, options])
Parses `string` as a single YAML document.
Returns: `Object | String | Number | null | undefined` or throws `YAMLException` on error.

Options (defaults in parentheses):
- filename (null): string used in error/warning messages
- onWarning (null): `(e: YAMLException) => void`
- schema (DEFAULT_SCHEMA): one of:
  - FAILSAFE_SCHEMA
  - JSON_SCHEMA
  - CORE_SCHEMA
  - DEFAULT_SCHEMA
- json (false): if true, duplicate keys override rather than error

### loadAll(string[, iterator][, options])
Parses `string` containing multiple YAML documents.
Returns: `Array<any>` or invokes `iterator(doc: any)` for each document.
Options: same as `load`.

### dump(object[, options])
Serializes `object` to a YAML string.
Returns: `string` or throws on invalid types (unless `skipInvalid`).

Options (defaults in parentheses):
- indent (2): number of spaces for indentation
- noArrayIndent (false): if true, array elements not indented
- skipInvalid (false): skip invalid types instead of throwing
- flowLevel (-1): nesting level to switch to flow style (-1 = block everywhere)
- styles ({}): map of `tag` => `style` (e.g. {'!!null': 'canonical'})
- schema (DEFAULT_SCHEMA)
- sortKeys (false | Function): sort object keys when dumping
- lineWidth (80): maximum line width (-1 = unlimited)
- noRefs (false): do not convert duplicate objects into references
- noCompatMode (false): disable YAML 1.1 compatibility quirks
- condenseFlow (false): condense flow sequences (no spaces)
- quotingType (' or ", default '): single- or double-quote style
- forceQuotes (false): quote all non-key strings
- replacer (Function(key, value)): called recursively on each entry

## Tag Styles

Tag      | Styles and Output Examples
---------|-----------------------------------
!!null    | canonical -> ~
          | lowercase => null
          | uppercase -> NULL
          | camelcase -> Null
          | empty     -> ""
!!int     | binary    -> 0b1, 0b1010
          | octal     -> 0o1, 0o52
          | decimal   => 1, 42
          | hexadecimal -> 0x1, 0x2A
!!bool    | lowercase => true, false
          | uppercase -> TRUE, FALSE
          | camelcase -> True, False
!!float   | lowercase => .nan, .inf
          | uppercase -> .NAN, .INF
          | camelcase -> .NaN, .Inf

## Supported YAML Types
!!null (null)
!!bool (Boolean)
!!int (Number)
!!float (Number)
!!binary (Buffer)
!!timestamp (Date)
!!omap (Array<[key,value]>)
!!pairs (Array<[key,value]>)
!!set (Array<{[key]: null}>)
!!str (String)
!!seq (Array)
!!map (Object)

## Caveats

- Arrays or objects used as keys are stringified via `toString()`.
- Implicit block mapping keys with anchors are not fully supported.
- Multi-document input must use `loadAll`, `load` throws on multiple docs.


## Attribution
- Source: js-yaml YAML Parser & Dumper
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT
- Crawl Date: 2025-05-13T03:36:37.176Z
- Data Size: 619469 bytes
- Links Found: 4918

## Retrieved
2025-05-13
