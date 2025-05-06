# NDJSON_SPEC

## Crawl Summary
NDJSON is a newline-delimited JSON format. Each record is a standalone JSON text terminated by a newline. The only record separator is U+000A. Encoding is UTF-8. Content type application/x-ndjson. Parsers must read up to newline, parse JSON, then continue. Empty lines and invalid UTF-8 must be rejected. Use for logs and streaming large data.

## Normalised Extract
Table of Contents

1 Format Definition
2 Content-Type
3 Character Encoding
4 Record Syntax
5 Parsing Rules
6 Error Handling
7 Examples

1 Format Definition
Each record is a valid JSON text terminated by a newline (U+000A). No other separators.

2 Content-Type
application/x-ndjson

3 Character Encoding
UTF-8 only. Reject invalid sequences.

4 Record Syntax
- Valid JSON values: object, array, string, number, boolean, null
- No trailing characters beyond newline
- Empty lines invalid

5 Parsing Rules
- Read bytes until newline
- Exclude newline, parse JSON text
- On error, emit record-level exception
- Continue until EOF

6 Error Handling
- Malformed JSON: parser must throw record error with line index
- Invalid UTF-8: stream-level error

7 Examples
Sample lines:
{ "foo": "bar" }
{"a":1,"nested":{"b":[2,3,4]}}

## Supplementary Details
Content-Type header: "application/x-ndjson"; charset=UTF-8. Parsers must process in streaming mode: read chunk, split on '\n', buffer incomplete lines across reads. Implementations should expose lineCount in error events. Acceptable JSON types: object, array, string, number, boolean, null. Reject BOM at start. Maximum line length unbounded; implementations may set configurable maxLineLength parameter default 1MB.

## Reference Details
### Node.js Example
```js
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('data.ndjson', { encoding: 'utf8' }),
  crlfDelay: Infinity
});
rl.on('line', line => {
  try {
    const record = JSON.parse(line);
    console.log(record);
  } catch (err) {
    console.error(`Parse error on line ${rl.input.bytesRead}:`, err.message);
  }
});
```

### Python Example
```py
import json
with open('data.ndjson', 'r', encoding='utf-8') as f:
    for line_no, line in enumerate(f, 1):
        if not line.strip():
            raise ValueError(f"Empty line at {line_no}")
        try:
            obj = json.loads(line)
        except json.JSONDecodeError as e:
            print(f"Error on line {line_no}: {e.msg}")
        else:
            print(obj)
```

### Go Example
```go
package main
import (
  "bufio"
  "encoding/json"
  "fmt"
  "io"
  "os"
)
func main() {
  file, _ := os.Open("data.ndjson")
  defer file.Close()
  scanner := bufio.NewScanner(file)
  lineNo := 0
  for scanner.Scan() {
    lineNo++
    var v interface{}
    err := json.Unmarshal(scanner.Bytes(), &v)
    if err != nil {
      fmt.Fprintf(os.Stderr, "Error line %d: %s\n", lineNo, err)
      continue
    }
    fmt.Println(v)
  }
  if err := scanner.Err(); err != nil && err != io.EOF {
    fmt.Fprintf(os.Stderr, "Scan error: %s\n", err)
  }
}
```

### Implementation Pattern
1. Open file/stream with UTF-8 decoding
2. Buffer data and split on '\n'
3. For each line: Verify non-empty, parse JSON
4. Handle parse or encoding errors at record-level
5. Continue until EOF

### Configuration Options
- maxLineLength (integer; default: 1048576 bytes): reject lines longer than this.
- skipEmptyLines (boolean; default: false): if true, ignore empty lines instead of throwing.
- onError callback(lineNo, error): custom record-level error handler.

### Best Practices
- Always validate input encoding is UTF-8.
- Do not accumulate entire file in memory; process line by line.
- Use backpressure in streaming contexts to avoid memory spikes.
- Expose diagnostics: line number, byte offset on errors.

### Troubleshooting
Command:
  head -c 100 file.ndjson | node parse.js
Expected:
  Logs of first 4 records or parse errors with line numbers.
If UTF-8 error: node will throw \"Unexpected token\" at byte offset; check encoding.
If line too long: custom error thrown: \"Line exceeds maxLineLength at 1050000 bytes\".

## Information Dense Extract
newline = U+000A separator; each record = standalone JSON text; content-type = application/x-ndjson; charset=UTF-8; invalid UTF-8 or empty line => error; parser pattern: stream→split at '\n'→JSON.parse; config: maxLineLength=1MB, skipEmpty=false, onError callback; Node/Python/Go examples above.

## Sanitised Extract
Table of Contents

1 Format Definition
2 Content-Type
3 Character Encoding
4 Record Syntax
5 Parsing Rules
6 Error Handling
7 Examples

1 Format Definition
Each record is a valid JSON text terminated by a newline (U+000A). No other separators.

2 Content-Type
application/x-ndjson

3 Character Encoding
UTF-8 only. Reject invalid sequences.

4 Record Syntax
- Valid JSON values: object, array, string, number, boolean, null
- No trailing characters beyond newline
- Empty lines invalid

5 Parsing Rules
- Read bytes until newline
- Exclude newline, parse JSON text
- On error, emit record-level exception
- Continue until EOF

6 Error Handling
- Malformed JSON: parser must throw record error with line index
- Invalid UTF-8: stream-level error

7 Examples
Sample lines:
{ 'foo': 'bar' }
{'a':1,'nested':{'b':[2,3,4]}}

## Original Source
Newline Delimited JSON (NDJSON) Specification
http://ndjson.org/

## Digest of NDJSON_SPEC

# NDJSON Specification

# Format Definition
Each line in an NDJSON stream is a complete JSON text. Lines are separated by the newline character (U+000A). No other separators or framing characters are used.

# Content-Type
application/x-ndjson

# Record Syntax
- Each record must be a valid JSON text: object, array, number, string, boolean or null.
- A record must end exactly at the newline; no extra characters allowed.
- Empty lines are invalid and must be rejected by strict parsers.

# Character Encoding
- UTF-8 is the normative encoding.
- Parsers must reject streams containing invalid UTF-8.

# Parsing Rules
1. Read bytes until newline (0x0A).
2. Interpret the bytes (excluding the newline) as a standalone JSON text.
3. Parse with a standard JSON parser.
4. Repeat until end-of-file.

# Examples
{ "foo": "bar" }
{"a":1,"b":[2,3,4]}

# Error Handling
- Any malformed JSON in a line must cause the parser to throw or return an error.
- In streaming contexts, parsers may emit a record-level error event with line number.

# Use Cases
- Log files: each log entry is a JSON object on a line.
- Data exchange: streaming large JSON datasets line by line.

# Compliance
Strict conformance requires every line to parse independently. Parsers may implement optional modes to skip empty lines or comments, but these are non-standard.


## Attribution
- Source: Newline Delimited JSON (NDJSON) Specification
- URL: http://ndjson.org/
- License: License: CC0
- Crawl Date: 2025-05-06T03:33:34.142Z
- Data Size: 247044 bytes
- Links Found: 158

## Retrieved
2025-05-06
