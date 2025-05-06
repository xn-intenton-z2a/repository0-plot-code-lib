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
