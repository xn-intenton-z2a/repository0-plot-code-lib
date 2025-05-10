# JS_YAML

## Crawl Summary
Installation: npm install js-yaml; CLI: js-yaml <file> with flags -h, -v, -c, -t. API:

load(string, options): returns JS value or throws, options: filename, onWarning, schema, json.

loadAll(string, iterator, options): multi-doc parser.

dump(object, options): serialize object to YAML, options: indent, noArrayIndent, skipInvalid, flowLevel, styles, schema, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, forceQuotes, replacer.

Supported tags: null, bool, int, float, binary, timestamp, omap, pairs, set, str, seq, map.

Styles mapping per tag with default values.

Caveats: object-as-key stringification, block mapping key limitations.


## Normalised Extract
Table of Contents:
1. Installation Commands
2. CLI Behavior and Flags
3. Programmatic API Usage
   3.1 load()
   3.2 loadAll()
   3.3 dump()
4. Option Parameters and Defaults
5. Supported YAML Types Mapping
6. Tag Style Configuration
7. Usage Caveats

1. Installation Commands
   - npm install js-yaml
   - npm install -g js-yaml

2. CLI Behavior and Flags
   js-yaml <file>
   Flags:
     --help (-h)
     --version (-v)
     --compact (-c)
     --trace (-t)

3. Programmatic API Usage

3.1 load(string, options)
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Errors: throws YAMLException on parse errors or when multi-doc present.

3.2 loadAll(string, iterator?, options?)
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: same as load): any[] | void

3.3 dump(object, options)
   Signature: dump(obj: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean | ((a:string,b:string)=>number);
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: '"' | "'";
     forceQuotes?: boolean;
     replacer?: (key: string, value: any) => any;
   }): string

4. Option Parameters and Defaults
   indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='\'', forceQuotes=false

5. Supported YAML Types Mapping
   !!null=>null; !!bool=>boolean; !!int=>number; !!float=>number; !!binary=>Buffer; !!timestamp=>Date; !!omap/!!pairs=>Array<[k,v]>; !!set=>Array<string>; !!str=>string; !!seq=>Array<any>; !!map=>Object

6. Tag Style Configuration
   Map tag to style string. E.g. styles['!!null']='canonical' to emit '~'.

7. Usage Caveats
   Objects/arrays as keys get stringified. Block mapping key properties on non-string keys unsupported.


## Supplementary Details
Installation steps:
1. npm install js-yaml locally
2. require('js-yaml') in code

Basic code example:
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const input = fs.readFileSync('example.yml','utf8');
  const data = yaml.load(input, {filename:'example.yml', json:true});
  console.log(data);
} catch(err) {
  console.error(err.message);
}

Multi-document parsing:
const docs = yaml.loadAll(input,(doc)=> console.log(doc), {schema:yaml.JSON_SCHEMA});

Dumping with custom styles:
const out = yaml.dump(obj, {
  skipInvalid:true,
  styles:{'!!null':'canonical'},
  sortKeys:(a,b)=>a.localeCompare(b)
});

Caveat workaround:
Use only string keys or pre-serialize complex keys to avoid unexpected toString() results.


## Reference Details
### CLI Examples
$ js-yaml sample.yml
$ js-yaml -c sample.yml
$ js-yaml -t sample.yml

### load()
Signature: load(input: string, options?: LoadOptions): any
LoadOptions:
  filename: string | null
  onWarning: (e: YAMLException)=>void
  schema: Schema (FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA)
  json: boolean
Returns: any
Throws: YAMLException

Example:
const data = yaml.load(fs.readFileSync('config.yml','utf8'), {
  filename:'config.yml',
  onWarning:(w)=>console.warn(w.message),
  schema:yaml.CORE_SCHEMA,
  json:false
});

### loadAll()
Signature: loadAll(input: string, iterator?: (doc:any)=>void, options?: LoadOptions): any[] | void
Returns array if iterator omitted, otherwise void

Example:
const all = yaml.loadAll(input, undefined, {schema:yaml.DEFAULT_SCHEMA});

### dump()
Signature: dump(obj:any, options?: DumpOptions): string
DumpOptions:
  indent:2
  noArrayIndent:false
  skipInvalid:false
  flowLevel:-1
  styles:Record<string,string>
  schema:Schema
  sortKeys:boolean|func
  lineWidth:80
  noRefs:false
  noCompatMode:false
  condenseFlow:false
  quotingType:'|' or '"'
  forceQuotes:false
  replacer:(key,value)=>any
Returns: string

Example:
const out = yaml.dump({a:1,b:2}, {
  flowLevel:0,
  noRefs:true,
  quotingType:'"',
  forceQuotes:true
});

### Best Practices
- Use DEFAULT_SCHEMA for full YAML feature support
- Set json:true on load() for JSON-compat behavior
- Use skipInvalid:true on dump() to drop functions and undefined without error
- Sort keys via sortKeys:true or custom comparator for deterministic output

### Troubleshooting
1. Unexpected multi-document error on load(): use loadAll() instead
2. Regex/function types error on dump(): set skipInvalid:true
3. Duplicate key error: set json:true to override rather than throw
4. CLI silent failure: add -c for compact errors or -t for full stack trace

Commands:
$ js-yaml -c bad.yml
Error: duplicated mapping key at line 3, column 5
$ js-yaml -t bad.yml
YAMLException: duplicated mapping key
    at ...stack trace...


## Information Dense Extract
install:npm i js-yaml; CLI:js-yaml file.yml [-h|--help][-v|--version][-c|--compact][-t|--trace];
load(input:string,opts?:{filename?:string,onWarning?:(YAMLException)=>void,schema?:Schema,json?:boolean}):any throws YAMLException;
loadAll(input:string,iterator?:(any)=>void,opts?:LoadOptions):any[]|void;
dump(obj:any,opts?:{indent?:number,noArrayIndent?:boolean,skipInvalid?:boolean,flowLevel?:number,styles?:Map<string,string>,schema?:Schema,sortKeys?:boolean|func,lineWidth?:number,noRefs?:boolean,noCompatMode?:boolean,condenseFlow?:boolean,quotingType?:"'"|"\"",forceQuotes?:boolean,replacer?:(k,v)=>any}):string;
Supported tags:!!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map;
Default schema:DEFAULT_SCHEMA;FAILSAFE_SCHEMA for safe;JSON_SCHEMA for JSON-only;CORE_SCHEMA same as JSON_SCHEMA;
json:true=>override duplicate keys;skipInvalid:true=>ignore invalid types;
sortKeys:true|func for stable dumps;
caveat:object/array keys stringified via toString();block mapping non-string keys unsupported.

## Sanitised Extract
Table of Contents:
1. Installation Commands
2. CLI Behavior and Flags
3. Programmatic API Usage
   3.1 load()
   3.2 loadAll()
   3.3 dump()
4. Option Parameters and Defaults
5. Supported YAML Types Mapping
6. Tag Style Configuration
7. Usage Caveats

1. Installation Commands
   - npm install js-yaml
   - npm install -g js-yaml

2. CLI Behavior and Flags
   js-yaml <file>
   Flags:
     --help (-h)
     --version (-v)
     --compact (-c)
     --trace (-t)

3. Programmatic API Usage

3.1 load(string, options)
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Errors: throws YAMLException on parse errors or when multi-doc present.

3.2 loadAll(string, iterator?, options?)
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: same as load): any[] | void

3.3 dump(object, options)
   Signature: dump(obj: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean | ((a:string,b:string)=>number);
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: ''' | ''';
     forceQuotes?: boolean;
     replacer?: (key: string, value: any) => any;
   }): string

4. Option Parameters and Defaults
   indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='''', forceQuotes=false

5. Supported YAML Types Mapping
   !!null=>null; !!bool=>boolean; !!int=>number; !!float=>number; !!binary=>Buffer; !!timestamp=>Date; !!omap/!!pairs=>Array<[k,v]>; !!set=>Array<string>; !!str=>string; !!seq=>Array<any>; !!map=>Object

6. Tag Style Configuration
   Map tag to style string. E.g. styles['!!null']='canonical' to emit '~'.

7. Usage Caveats
   Objects/arrays as keys get stringified. Block mapping key properties on non-string keys unsupported.

## Original Source
dotenv & YAML Specification & js-yaml Parsing (merged)
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML Installation and Setup

Date Retrieved: 2024-06-05
Data Size: 958290 bytes

## Installation

Run in project folder:
```
npm install js-yaml
```
For CLI globally:
```
npm install -g js-yaml
```

## CLI Usage

Command:
```
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] <file>
```
Flags:
- `-h, --help`: display usage
- `-v, --version`: display js-yaml version
- `-c, --compact`: show compact error messages
- `-t, --trace`: include stack trace

## API Methods

### load(string[, options])
Parses a single-document YAML string.
- Returns: Object | string | number | null | undefined
- Throws: YAMLException on parse error or if multi-document source
- Options:
  - `filename` (string, default: null)
  - `onWarning` (function, default: null)
  - `schema` (FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA)
  - `json` (boolean, default: false)

### loadAll(string[, iterator][, options])
Parses multi-document YAML string.
- Returns: Array of documents if no iterator
- Calls `iterator(doc)` for each document
- Options same as load()

### dump(object[, options])
Serializes JS object to YAML string.
- Returns: YAML string
- Throws: on unsupported types unless `skipInvalid: true`
- Options:
  - `indent` (number, default: 2)
  - `noArrayIndent` (boolean, default: false)
  - `skipInvalid` (boolean, default: false)
  - `flowLevel` (number, default: -1)
  - `styles` (map of tag->style)
  - `schema` (DEFAULT_SCHEMA etc.)
  - `sortKeys` (boolean|function, default: false)
  - `lineWidth` (number, default: 80)
  - `noRefs` (boolean, default: false)
  - `noCompatMode` (boolean, default: false)
  - `condenseFlow` (boolean, default: false)
  - `quotingType` ("'"|"\"", default: "'")
  - `forceQuotes` (boolean, default: false)
  - `replacer` (function, default: none)

## Supported YAML Types and JavaScript Mappings

| Tag          | JS Type             |
|--------------|---------------------|
| !!null       | null                |
| !!bool       | boolean             |
| !!int        | number              |
| !!float      | number              |
| !!binary     | Buffer              |
| !!timestamp  | Date                |
| !!omap       | Array<[key,value]>  |
| !!pairs      | Array<[key,value]>  |
| !!set        | Array<string>       |
| !!str        | string              |
| !!seq        | Array<any>          |
| !!map        | Object              |

## Styles Per Tag

- !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
- !!int: binary(0b...), octal(0o...), decimal, hexadecimal(0x...)
- !!bool: lowercase, uppercase, camelcase
- !!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

## Caveats

- Objects/arrays as keys are stringified via toString().
- Implicit block mapping keys cannot be read if they are objects/arrays.


## Attribution
- Source: dotenv & YAML Specification & js-yaml Parsing (merged)
- URL: https://github.com/nodeca/js-yaml#readme
- License: License: MIT / OASIS (public domain)
- Crawl Date: 2025-05-10T02:28:22.874Z
- Data Size: 958290 bytes
- Links Found: 5530

## Retrieved
2025-05-10
