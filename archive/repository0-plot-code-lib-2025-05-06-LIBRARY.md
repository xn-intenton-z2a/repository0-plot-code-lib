library/ZOD_API.md
# library/ZOD_API.md
# ZOD_API

## Crawl Summary
Zod provides TypeScript-first schema definitions for runtime validation. Core schemas include string(), number(), boolean(), object(). Parsing methods parse() throws on failure; safeParse() returns success flag and data or error. Transformations via refine() and transform(). Asynchronous checks supported. Global errorMap override via setErrorMap(). Object schemas accept strict flag. Coercion enabled on numeric, boolean, date schemas via coerce option.

## Normalised Extract
Table of Contents:
1. Schema Creation
2. Parsing Methods
3. Refinement & Transformation
4. Asynchronous Validation
5. Error Mapping
6. Configuration Options

1. Schema Creation
- z.string(): ZodString
- z.number(): ZodNumber
- z.boolean(): ZodBoolean
- z.object<T>(shape, { strict? }): ZodObject<T> (strict defaults to false)

2. Parsing Methods
- parse<T>(input: unknown): T throws ZodError
- safeParse<T>(input: unknown): { success: true; data: T } | { success: false; error: ZodError }

3. Refinement & Transformation
- .refine(check: (data: T) => boolean, message?): this
- .transform<U>(transformer: (data: T) => U): ZodEffects<T, U>

4. Asynchronous Validation
- .refine(asyncCheck: (data: T) => Promise<boolean>, message?): ZodEffects<T, T>

5. Error Mapping
- setErrorMap(mapper: ZodErrorMap): void

6. Configuration Options
- strict: boolean (object unknown key handling)
- coerce: boolean (enable input coercion)


## Supplementary Details
Installation: npm install zod@3.21.4 or yarn add zod@3.21.4
Import: import { z, ZodError, ZodEffects, ZodErrorMap } from 'zod';
Default error messages: min, max, invalid_type
Coercion options: z.coerce.number(), z.coerce.boolean(), z.coerce.date()
Strict object: z.object(shape, { strict: true }) rejects extra keys
Global errorMap example: setErrorMap((issue, ctx) => ({ message: `Error at ${ctx.path.join('.')}: ${issue.code}` }));

## Reference Details
API Signatures:
function string(): ZodString
interface ZodString {
  min(min: number, message?: string): ZodString;
  max(max: number, message?: string): ZodString;
  email(message?: string): ZodString;
  url(message?: string): ZodString;
  uuid(message?: string): ZodString;
  regex(pattern: RegExp, message?: string): ZodString;
  refine(check: (val: string) => boolean, message?: string): ZodEffects<string, string>;
}

function number(): ZodNumber
interface ZodNumber {
  min(min: number, message?: string): ZodNumber;
  max(max: number, message?: string): ZodNumber;
  int(message?: string): ZodNumber;
  positive(message?: string): ZodNumber;
  nonnegative(message?: string): ZodNumber;
  refine(check: (val: number) => boolean, message?: string): ZodEffects<number, number>;
}

function boolean(): ZodBoolean
interface ZodBoolean {}

function object<T extends ZodRawShape>(shape: T, params?: { strict?: boolean; catchall?: ZodTypeAny }): ZodObject<T>
interface ZodObject<T> {
  partial(): ZodObject<Partial<T>>;
  strict(): ZodObject<T>;
  extend<Ext extends ZodRawShape>(extension: Ext): ZodObject<T & Ext>;
  refine(check: (obj: z.infer<ZodObject<T>>) => boolean, message?: string): ZodEffects<any, z.infer<ZodObject<T>>>;
}

Parsing:
- const result = schema.parse(input);
Throws ZodError
- const safe = schema.safeParse(input);
Returns { success: boolean; data?: T; error?: ZodError }

ErrorMap:
function setErrorMap(mapper: ZodErrorMap): void

Examples:
const userSchema = z.object({
  id: z.string().uuid(),
  age: z.number().int().nonnegative()
}, { strict: true });

try {
  const user = userSchema.parse(input);
} catch (e) {
  if (e instanceof ZodError) console.log(e.errors);
}

Best Practices:
- Use safeParse for user input to avoid exceptions
- Enable strict mode on object schemas to strip or reject unknown properties
- Apply .transform for derived values after validation
- Leverage .refine for custom synchronous or asynchronous checks

Troubleshooting:
Command: node -e "console.log(require('zod').z.string().parse(123))"
Expected Output: Throws ZodError with code invalid_type
Fix: Use z.coerce.string() to coerce non-string inputs


## Information Dense Extract
z.string(): ZodString; methods: min(n,msg), max(n,msg), email(msg), url(msg), uuid(msg), regex(rx,msg), refine(fn,msg) -> ZodEffects
z.number(): ZodNumber; methods: min, max, int, positive, nonnegative, refine
z.boolean(): ZodBoolean
z.object(shape, { strict?, catchall? }): ZodObject; methods: partial, strict, extend, refine
parse(input): T throws ZodError
safeParse(input): { success:boolean; data?:T; error?:ZodError }
refine(fn,msg), transform(fn) -> ZodEffects
async refine supported
setErrorMap(mapper) overrides default messages
enable strict to reject unknown keys
use z.coerce.* for input coercion


## Sanitised Extract
Table of Contents:
1. Schema Creation
2. Parsing Methods
3. Refinement & Transformation
4. Asynchronous Validation
5. Error Mapping
6. Configuration Options

1. Schema Creation
- z.string(): ZodString
- z.number(): ZodNumber
- z.boolean(): ZodBoolean
- z.object<T>(shape, { strict? }): ZodObject<T> (strict defaults to false)

2. Parsing Methods
- parse<T>(input: unknown): T throws ZodError
- safeParse<T>(input: unknown): { success: true; data: T } | { success: false; error: ZodError }

3. Refinement & Transformation
- .refine(check: (data: T) => boolean, message?): this
- .transform<U>(transformer: (data: T) => U): ZodEffects<T, U>

4. Asynchronous Validation
- .refine(asyncCheck: (data: T) => Promise<boolean>, message?): ZodEffects<T, T>

5. Error Mapping
- setErrorMap(mapper: ZodErrorMap): void

6. Configuration Options
- strict: boolean (object unknown key handling)
- coerce: boolean (enable input coercion)

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD_API

# Zod API Specifications
Content retrieved on: 2024-06-25

# Schema Creation

### z.string(): ZodString
TypeScript signature: function string(): ZodString;
Definition: ZodType<string, ZodStringDef, string>

### z.number(): ZodNumber
TypeScript signature: function number(): ZodNumber;
Definition: ZodType<number, ZodNumberDef, number>

### z.boolean(): ZodBoolean
TypeScript signature: function boolean(): ZodBoolean;
Definition: ZodType<boolean, ZodBooleanDef, boolean>

### z.object<T extends ZodRawShape>(shape: T, params?: { strict?: boolean }): ZodObject<T>
TypeScript signature: function object<T extends ZodRawShape>(shape: T, params?: { strict?: boolean }): ZodObject<T>;
Default: strict = false

# Parsing and Validation

## parse<T>(input: unknown): T
Throws ZodError if validation fails.

## safeParse<T>(input: unknown): SafeParseReturn<T>
Returns { success: boolean; data: T } or { success: boolean; error: ZodError }

# Refinement and Transformation

### .refine(check: (data: T) => boolean, message?: string | { message: string }): this
Runs custom synchronous check

### .transform<U>(transformer: (data: T) => U): ZodEffects<T, U>
Applies transformation after validation

# Asynchronous Schemas

### z.string().refine(asyncCheck: (data: string) => Promise<boolean>, message?: string): ZodEffects<string, string>

# Error Mapping

### setErrorMap(mapper: ZodErrorMap): void
Global override for default error messages

# Configuration Options

- strictObjects (boolean): when true, object schemas reject unknown keys
- coerce: enable input coercion for number, date, boolean

# Code Examples

See reference details section for full examples.

# Attribution
Source: Zod Official Documentation (https://zod.dev)
Data Size: 0 bytes
Links Found: 0

## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-06T00:28:23.964Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-06
library/NDJSON_SPEC.md
# library/NDJSON_SPEC.md
# NDJSON_SPEC

## Crawl Summary
NDJSON is a UTF-8 encoded, line-delimited JSON format with one valid JSON value per LF-terminated line.  It uses MIME `application/x-ndjson`.  Streaming reads by line and applies `JSON.parse` or equivalent per record.  No CR or CRLF line endings.  Examples provided for Node.js and Python.

## Normalised Extract
Table of Contents:
1. Format Definition
2. Encoding and MIME Type
3. Parsing Algorithm
4. Streaming Code Patterns
5. Examples and Schemas

1. Format Definition
   - Each record is one JSON value per LF-terminated line.
   - Valid JSON values: object, array, number, string, true, false, null.
   - No trailing commas or comments.

2. Encoding and MIME Type
   - UTF-8 encoding, no BOM.
   - MIME type: application/x-ndjson.

3. Parsing Algorithm
   - Open file or stream.
   - Read until U+000A.
   - Trim optional whitespace, deliver substring as `line`.
   - Apply `parse(line)`.
   - Emit parsed value.

4. Streaming Code Patterns
   Node.js:
     - fs.createReadStream(path) → pipe(split2()) → on('data', line) → JSON.parse(line).
   Python:
     - open(path, 'r', encoding='utf-8') → iterate lines → json.loads(line).

5. Examples and Schemas
   - Example records above.
   - Schema: no envelope object; each line is record itself.


## Supplementary Details
- Maximum line length: unlimited; parsers must support streaming to avoid full-file buffering.
- Recommended buffer highWaterMark in Node.js streams: 16kb per chunk.
- split2 options: {strict: true} to drop empty lines.
- JSON parser limitations: must throw on invalid token; catch and log with line number.
- Performance: avoid synchronous reads; use streams and backpressure.


## Reference Details
APIs and Method Signatures:

Node.js fs.createReadStream(path: string, options?: {encoding?: string, highWaterMark?: number}): ReadableStream

split2(options?: {strict?: boolean}): TransformStream<string>

Stream events:
- 'data': handler(line: string)
- 'error': handler(err: Error)
- 'end': handler()

Python io.open(file: str, mode: 'r', encoding: str) → TextIOBase

json.loads(s: str, *, cls=None, parse_float=None, parse_int=None, parse_constant=None): Any

Code Examples:

Node.js setup:
```bash
npm install split2
```

Node.js full pattern:
```js
const {createReadStream} = require('fs');
const split2 = require('split2');
function processNdjson(filePath) {
  return new Promise((resolve, reject) => {
    createReadStream(filePath, {encoding: 'utf8', highWaterMark: 16384})
      .pipe(split2({strict: true}))
      .on('data', line => {
        try {
          const record = JSON.parse(line);
          handleRecord(record);
        } catch(parseErr) {
          console.error(`Parse error at line: ${line}`);
        }
      })
      .on('error', err => reject(err))
      .on('end', () => resolve());
  });
}
```

Python full pattern:
```bash
pip install ndjson
```

```py
import ndjson
with open('data.ndjson','r',encoding='utf-8') as f:
    reader = ndjson.reader(f)
    for record in reader:
        handle_record(record)
```

Configuration Options and Effects:
- split2.strict (boolean): if true, skips empty lines. Default false.
- fs.createReadStream.highWaterMark (number): bytes per internal buffer. Default 64kb.

Best Practices:
- Use streaming to process large files (>50MB).
- Set strict mode to drop blank lines.
- Catch JSON.parse errors and continue processing.
- Validate each record against JSON Schema post-parse.

Troubleshooting:
```bash
# Verify first few lines are valid JSON
head -n 5 data.ndjson | jq .
# Expected: each line prints parsed JSON or jq error

# Check for CRLF issues
grep -U '\r$' data.ndjson | head
# Expected: no output; CRLF lines are invalid.
```

## Information Dense Extract
NDJSON: UTF-8 LF-delimited JSON; MIME application/x-ndjson. One JSON value per line; values: object/array/number/string/true/false/null. No CR/CRLF. Parse: read stream by LF, JSON.parse per line. Node.js: fs.createReadStream(path,{encoding:'utf8',highWaterMark:16384}).pipe(split2({strict:true})).on('data',line=>JSON.parse(line)).on('error',...). Python: ndjson.reader(open(file,'r',encoding='utf-8')). Config: split2.strict(boolean,false), highWaterMark(number,65536). Best practice: streaming, error catch, schema validate. Troubleshoot: head|jq, grep CR check.

## Sanitised Extract
Table of Contents:
1. Format Definition
2. Encoding and MIME Type
3. Parsing Algorithm
4. Streaming Code Patterns
5. Examples and Schemas

1. Format Definition
   - Each record is one JSON value per LF-terminated line.
   - Valid JSON values: object, array, number, string, true, false, null.
   - No trailing commas or comments.

2. Encoding and MIME Type
   - UTF-8 encoding, no BOM.
   - MIME type: application/x-ndjson.

3. Parsing Algorithm
   - Open file or stream.
   - Read until U+000A.
   - Trim optional whitespace, deliver substring as 'line'.
   - Apply 'parse(line)'.
   - Emit parsed value.

4. Streaming Code Patterns
   Node.js:
     - fs.createReadStream(path)  pipe(split2())  on('data', line)  JSON.parse(line).
   Python:
     - open(path, 'r', encoding='utf-8')  iterate lines  json.loads(line).

5. Examples and Schemas
   - Example records above.
   - Schema: no envelope object; each line is record itself.

## Original Source
Newline Delimited JSON (NDJSON) Specification
http://ndjson.org/

## Digest of NDJSON_SPEC

# NDJSON Specification

## Format Definition

Each NDJSON document consists of one JSON value per line.  A line is terminated by a single U+000A (LF) character.  No other line endings (CR or CR+LF) are permitted.  Each line must be a valid standalone JSON value: object, array, number, string, true, false, or null.  Lines cannot contain trailing commas or comments.

## MIME Type

The official MIME type for NDJSON is `application/x-ndjson`.

## Character Encoding

NDJSON MUST be encoded in UTF-8 without BOM.

## Parsing Behavior

1. Read stream by line.
2. For each line, apply a JSON parser (e.g., `JSON.parse`).
3. Values MUST be emitted or buffered per record; no partial values across lines.
4. Whitespace is allowed outside JSON tokens at line ends but not inside tokens.

## Streaming Patterns

### Node.js (split2)

```js
const fs = require('fs');
const split2 = require('split2');
fs.createReadStream('data.ndjson')
  .pipe(split2())
  .on('data', line => {
    const obj = JSON.parse(line);
    // handle obj
  })
  .on('error', err => console.error('Stream error:', err));
```

### Python

```py
import json
with open('data.ndjson','r',encoding='utf-8') as f:
    for line in f:
        record = json.loads(line)
        # handle record
```

## Examples

```ndjson
{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
[1,2,3]
"string literal"
true
null
```


## Attribution
- Source: Newline Delimited JSON (NDJSON) Specification
- URL: http://ndjson.org/
- License: License: CC0
- Crawl Date: 2025-05-06T01:07:14.124Z
- Data Size: 247044 bytes
- Links Found: 158

## Retrieved
2025-05-06
