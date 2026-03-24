CSV_IMPORT

TABLE OF CONTENTS:
1. Normalised extract: RFC4180 key rules
2. Implementation: robust CSV parser for time,value
3. Node I/O patterns (fs streaming)
4. Data typing and parsing time/value
5. Reference details and digest

NORMALISED EXTRACT (RFC4180 rules):
- Records are separated by CRLF (\r\n) but implementations must accept LF-only lines.
- Fields are separated by commas.
- Fields with embedded commas, double-quotes, or line breaks must be enclosed in double-quotes.
- A double-quote appearing inside a field must be escaped by preceding it with another double-quote ("" becomes ").
- Optional header row: first record may contain column names.

IMPLEMENTATION PATTERN (robust parser):
- Exported signature: loadCsv(filePath: string, options?: {hasHeader?: boolean}): Promise<Array<{time:string,value:number}>>
- Use fs.createReadStream(filePath, {encoding:'utf8'}) and a streaming parser to avoid loading very large files into memory.
- State machine algorithm for parsing a record:
  - state = OUTSIDE_FIELD | IN_UNQUOTED_FIELD | IN_QUOTED_FIELD | QUOTE_IN_QUOTED_FIELD
  - iterate bytes/characters; on comma when OUTSIDE_FIELD or IN_UNQUOTED_FIELD => field boundary; on CR or LF treat as record boundary when not inside quoted field; on double-quote when IN_QUOTED_FIELD transition to QUOTE_IN_QUOTED_FIELD; when QUOTE_IN_QUOTED_FIELD and next char is double-quote append a single double-quote to field and return to IN_QUOTED_FIELD; if next char is comma or CR/LF then quoted field ends.
  - On record complete: if hasHeader and header not yet read, set header mapping (index->name). Use index positions to map 'time' and 'value' columns; otherwise assume columns are time,value in that order.
- Parse value field with Number(valueString); if result is NaN throw or mark as invalid row depending on options.
- Parse time field: accept ISO8601 preferred; Date.parse(timeString) returns timestamp; store original string and parsed numeric time if needed.

NODE I/O PATTERNS (fs):
- Use fs.promises.readFile for small CSVs: const text = await fs.promises.readFile(filePath, 'utf8') then parse.
- For large CSVs: fs.createReadStream(filePath, {encoding:'utf8'}) with incremental buffer processing.
- Use stream backpressure and line/record buffering; avoid splitting mid-UTF8 character by processing with string concatenation between 'data' events.

REFERENCE DETAILS:
- RFC 4180: https://datatracker.ietf.org/doc/html/rfc4180 retrieved 2026-03-24, bytes downloaded: 58764
- Node fs API: fs.createReadStream(path[, options]), fs.promises.readFile(path[, options]), fs.promises.writeFile(path, data[, options]) retrieved 2026-03-24, bytes downloaded (fs doc): 935744

DIGEST:
- RFC4180 defines field quoting and escaping rules; implement a strict parser following the state machine above to ensure correctness for fields containing commas and newlines.

USAGE:
- Return a Promise resolving to an array of points where each point is {time: originalTimeString, value: Number(value)}. Exported loader can optionally return parsedDate: number for each record for time-series semantics.
