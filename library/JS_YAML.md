# JS_YAML

## Crawl Summary
load(string,options?): any; options.filename:null; onWarning:null; schema:DEFAULT_SCHEMA; json:false
loadAll(string,iterator?,options?): any[] or applies iterator; iterator(doc): void
dump(object,options?): string; options.indent:2; noArrayIndent:false; skipInvalid:false; flowLevel:-1; styles:{}; schema:DEFAULT_SCHEMA; sortKeys:false; lineWidth:80; noRefs:false; noCompatMode:false; condenseFlow:false; quotingType:'; forceQuotes:false; replacer:null
Schemas: FAILSAFE (strings,arrays,plain objects); JSON_SCHEMA (JSON types); CORE_SCHEMA; DEFAULT_SCHEMA (all YAML 1.2 types)
Supported tags: !!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map; JS types: null,boolean,number,Buffer,Date,Array,object

## Normalised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
 3.1 load(string, options)
 3.2 loadAll(string, iterator, options)
 3.3 dump(object, options)
4 Supported Tags and Types
5 Caveats

1 Installation
npm install js-yaml
npm install -g js-yaml

2 CLI Usage
Usage: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3 API Methods

3.1 load(string, options)
Signature: load(string: string, options?: {
  filename?: string | null  default null
  onWarning?: (YAMLException) => void  default null
  schema?: Schema  default DEFAULT_SCHEMA
  json?: boolean  default false
}) => any
Throws: YAMLException

3.2 loadAll(string, iterator?, options)
Signature: loadAll(string: string, iterator?: (doc:any)=>void, options?: same as load) => any[] | void

3.3 dump(object, options)
Signature: dump(object: any, options?: {
  indent?: number  default 2
  noArrayIndent?: boolean  default false
  skipInvalid?: boolean  default false
  flowLevel?: number  default -1
  styles?: Record<string,string>  default {}
  schema?: Schema  default DEFAULT_SCHEMA
  sortKeys?: boolean|((a,b)=>number)  default false
  lineWidth?: number  default 80
  noRefs?: boolean  default false
  noCompatMode?: boolean  default false
  condenseFlow?: boolean  default false
  quotingType?: "'"|"\""  default "'"
  forceQuotes?: boolean  default false
  replacer?: (key:string,value:any)=>any  default null
}) => string
Throws: YAMLException

4 Supported Tags and Types
!!null -> null
!!bool -> boolean
!!int -> number
!!float -> number
!!binary -> Buffer
!!timestamp -> Date
!!omap -> Array<[key,value]>
!!pairs -> Array<[key,value]>
!!set -> Array<{key:null}>
!!str -> string
!!seq -> any[]
!!map -> object

5 Caveats
• Object or array keys stringify with toString().
• Block mapping key references unsupported; duplicate anchors error.

## Supplementary Details
Import and Usage Pattern
const yaml = require('js-yaml')
const fs   = require('fs')

// Load single document
try {
  const content = fs.readFileSync('example.yml','utf8')
  const doc = yaml.load(content,{filename:'example.yml',json:true})
  console.log(doc)
} catch(e) {
  console.error('YAML load error:',e.message)
}

// Load multiple documents
const docs = yaml.loadAll(fs.readFileSync('multi.yml','utf8'), null, {schema:yaml.JSON_SCHEMA})

// Dump object to YAML
const out = yaml.dump({a:1,b:2},{indent:4,sortKeys:true,styles:{'!!null':'canonical'}})
fs.writeFileSync('out.yml',out,'utf8')


## Reference Details
API Signatures
load(string: string, options?: LoadOptions) => any
loadAll(string: string, iterator?: (doc:any)=>void, options?: LoadOptions) => any[] | void
dump(object: any, options?: DumpOptions) => string

Type Definitions
interface LoadOptions {
  filename?: string | null  default null
  onWarning?: (warning: YAMLException)=>void  default null
  schema?: Schema  default DEFAULT_SCHEMA
  json?: boolean  default false
}
interface DumpOptions {
  indent?: number  default 2
  noArrayIndent?: boolean  default false
  skipInvalid?: boolean  default false
  flowLevel?: number  default -1
  styles?: Record<string,string>  default {}
  schema?: Schema  default DEFAULT_SCHEMA
  sortKeys?: boolean|((a:string,b:string)=>number)  default false
  lineWidth?: number  default 80
  noRefs?: boolean  default false
  noCompatMode?: boolean  default false
  condenseFlow?: boolean  default false
  quotingType?: "'"|"\""  default "'"
  forceQuotes?: boolean  default false
  replacer?: (key:string,value:any)=>any  default null
}

Schemas and Effects
FAILSAFE_SCHEMA: only strings, arrays, plain objects
JSON_SCHEMA: JSON types only
CORE_SCHEMA: identical to JSON_SCHEMA
DEFAULT_SCHEMA: all YAML 1.2 types

Best Practices
• Use json:true to emulate JSON.parse behavior (duplicate keys override).
• Enable onWarning to capture non-critical parsing issues.
• Set skipInvalid:true when dumping data structures with functions or regexps.
• Use sortKeys or custom comparator to produce deterministic output.
• Quote null as ~ by styles:{'!!null':'canonical'} for compact notation.

Troubleshooting Procedures
Command-Line
js-yaml config.yml        # parse and output parsed object
js-yaml --compact config.yml   # show compact error messages
js-yaml --trace config.yml     # include stack trace on error

Programmatic
try { yaml.load(invalidYAML) } catch(e) { console.error(e.stack) }

Common Errors
YAMLException: duplicated mapping key                  use json:true to override
YAMLException: multi-document source in load()         switch to loadAll()


## Information Dense Extract
load(string,options?):any; options:{filename=null,onWarning=null,schema=DEFAULT_SCHEMA,json=false} loadAll(string,iterator?,options?):any[]|void dump(object,options?):string; options:{indent=2,noArrayIndent=false,skipInvalid=false,flowLevel=-1,styles={},schema=DEFAULT_SCHEMA,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType='forceQuotes=false,replacer=null}
Schemas:FAILSAFE(strings,arrays,plain objects);JSON_SCHEMA(JSON types);CORE_SCHEMA;DEFAULT_SCHEMA(all YAML1.2 types)
Supported tags:!!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map
Caveats:object/array keys stringify via toString();implicit block mapping references unsupported

## Sanitised Extract
Table of Contents
1 Installation
2 CLI Usage
3 API Methods
 3.1 load(string, options)
 3.2 loadAll(string, iterator, options)
 3.3 dump(object, options)
4 Supported Tags and Types
5 Caveats

1 Installation
npm install js-yaml
npm install -g js-yaml

2 CLI Usage
Usage: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file

3 API Methods

3.1 load(string, options)
Signature: load(string: string, options?: {
  filename?: string | null  default null
  onWarning?: (YAMLException) => void  default null
  schema?: Schema  default DEFAULT_SCHEMA
  json?: boolean  default false
}) => any
Throws: YAMLException

3.2 loadAll(string, iterator?, options)
Signature: loadAll(string: string, iterator?: (doc:any)=>void, options?: same as load) => any[] | void

3.3 dump(object, options)
Signature: dump(object: any, options?: {
  indent?: number  default 2
  noArrayIndent?: boolean  default false
  skipInvalid?: boolean  default false
  flowLevel?: number  default -1
  styles?: Record<string,string>  default {}
  schema?: Schema  default DEFAULT_SCHEMA
  sortKeys?: boolean|((a,b)=>number)  default false
  lineWidth?: number  default 80
  noRefs?: boolean  default false
  noCompatMode?: boolean  default false
  condenseFlow?: boolean  default false
  quotingType?: '''|''''  default '''
  forceQuotes?: boolean  default false
  replacer?: (key:string,value:any)=>any  default null
}) => string
Throws: YAMLException

4 Supported Tags and Types
!!null -> null
!!bool -> boolean
!!int -> number
!!float -> number
!!binary -> Buffer
!!timestamp -> Date
!!omap -> Array<[key,value]>
!!pairs -> Array<[key,value]>
!!set -> Array<{key:null}>
!!str -> string
!!seq -> any[]
!!map -> object

5 Caveats
 Object or array keys stringify with toString().
 Block mapping key references unsupported; duplicate anchors error.

## Original Source
js-yaml (YAML Parser and Dumper)
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML Parser and Dumper

Retrieved: 2024-02-14
Data Size: 603849 bytes
Source: https://github.com/nodeca/js-yaml#readme

# Installation

• npm install js-yaml
• npm install -g js-yaml

# CLI Usage

usage: js-yaml [-h] [-v] [-c] [-t] file

Positional arguments:
  file           File with YAML document(s)

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
  -c, --compact  Display errors in compact mode
  -t, --trace    Show stack trace on error

# load(string [, options])

Parses string as a single YAML document.
Signature: load(string: string, options?: LoadOptions): any
Throws: YAMLException on error.
Returns: object | string | number | null | undefined

LoadOptions:
  filename      string | null        default: null
  onWarning     (warning: YAMLException) => void | null    default: null
  schema        Schema               default: DEFAULT_SCHEMA
    FAILSAFE_SCHEMA  only strings, arrays, plain objects
    JSON_SCHEMA      JSON types only
    CORE_SCHEMA      same as JSON_SCHEMA
    DEFAULT_SCHEMA   all supported YAML types
  json          boolean              default: false
                    if true duplicate mapping keys override values

# loadAll(string [, iterator] [, options])

Parses string as multi-document source.
Signature: loadAll(string: string, iterator?: (doc: any) => void, options?: LoadOptions): any[] | void
Returns: array of documents if iterator is omitted, otherwise applies iterator to each doc.
Throws: YAMLException on multi-doc when using load.
Iterator: function(doc: any): void
Options: same as load.

# dump(object [, options])

Serializes object to YAML.
Signature: dump(object: any, options?: DumpOptions): string
Throws: YAMLException on invalid types (regexps, functions) unless skipInvalid is true.
Returns: string

DumpOptions:
  indent         number       default: 2
  noArrayIndent  boolean      default: false
  skipInvalid    boolean      default: false
  flowLevel      number       default: -1
  styles         Record<string,string>   default: {}
  schema         Schema       default: DEFAULT_SCHEMA
  sortKeys       boolean | ((a: string, b: string) => number)   default: false
  lineWidth      number       default: 80
  noRefs         boolean      default: false
  noCompatMode   boolean      default: false
  condenseFlow   boolean      default: false
  quotingType    "'"|"\""   default: '\''
  forceQuotes    boolean      default: false
  replacer       (key:string,value:any) => any   default: null

# Styles Table

Tag       Available Styles             Default
!!null    canonical, lowercase, uppercase, camelcase, empty    lowercase
!!int     binary, octal, decimal, hexadecimal                 decimal
!!bool    lowercase, uppercase, camelcase                     lowercase
!!float   lowercase, uppercase, camelcase                     lowercase

# Supported YAML Tags and JS Types

!!null      null
!!bool      boolean
!!int       number
!!float     number
!!binary    Buffer
!!timestamp Date
!!omap      Array<[key,value]>
!!pairs     Array<[key,value]>
!!set       Array<{key:null}>
!!str       string
!!seq       Array<any>
!!map       object

# Caveats

• Using arrays or objects as keys stringifies them via toString().
• Implicit block mapping key references not supported; duplicate anchors will fail.


## Attribution
- Source: js-yaml (YAML Parser and Dumper)
- URL: https://github.com/nodeca/js-yaml#readme
- License: License
- Crawl Date: 2025-04-26T10:46:38.103Z
- Data Size: 603849 bytes
- Links Found: 4883

## Retrieved
2025-04-26
