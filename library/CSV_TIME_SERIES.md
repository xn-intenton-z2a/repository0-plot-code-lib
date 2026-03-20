CSV_TIME_SERIES

Table of contents:
1. Normalised extract
2. Topics covered
3. RFC4180 CSV parsing rules (exact)
4. Implementation: robust line-field parser for time,value
5. Reference API (signatures)
6. Alternative: PapaParse usage
7. Digest and attribution

1. Normalised extract
- Input: CSV file with columns time,value (header optional).
- CSV field rules follow RFC4180: fields separated by commas, fields containing commas or CR/LF must be double-quoted, double-quotes inside a quoted field are represented by two consecutive double-quotes.
- Output: array of records [{time: string, value: number}] where value is coerced to Number(value) and time preserved or parsed to Date depending on consumer.

2. Topics covered
- RFC4180 exact parsing behavior
- Handling CRLF and LF line endings
- Header detection (optional) and column selection
- Simple robust parser state machine for two-column expectation

3. RFC4180 CSV parsing rules (exact excerpts, implementation-relevant):
- Each record is located on a separate line, delimited by a line break (CRLF). The last record in the file may or may not have an ending line break.
- Within the header and each record, there may be one or more fields, separated by commas.
- Each field may or may not be enclosed in double-quotes (" "). If fields are not enclosed with double-quotes, then double-quotes may not appear inside the fields.
- If fields are enclosed with double-quotes, then a double-quote appearing inside a field must be escaped by preceding it with another double quote. Example: "aaa","b""bb","ccc".

4. Implementation: robust parser (state machine)
- Read file as text (utf8) using Node.js fs.readFileSync(path,'utf8') or asynchronous variant.
- Split into records using a line-splitting method that tolerates CRLF and LF: const lines = text.split(/\r?\n/);
- If the first non-empty line contains a header with columns matching /time/i and /value/i then drop header and use indices accordingly; otherwise assume column 0=time, 1=value.
- Field parser (per-line):
  - let fields = [];
  - iterate characters with index i, current field buffer buf = '', inQuotes = false;
  - if char === '"' and not inQuotes -> inQuotes = true; else if char === '"' and inQuotes:
      - if next char === '"' -> append '"' to buf and advance i by 1;
      - else inQuotes = false;
    else if char === ',' and !inQuotes -> fields.push(buf), buf = '';
    else append char to buf;
  - After loop push last field.
- For time,value: const time = fields[timeIndex].trim(); const value = Number(fields[valueIndex]); if (Number.isNaN(value)) value = NaN (caller may filter); push {time,value}.

5. Reference API (signatures)
- loadCsvTimeSeries(filePath: string): Array<{time: string, value: number}>
  - Parameters: filePath - path to CSV file (utf8)
  - Returns: array of objects in the same order as CSV rows (excluding header if present)
  - Throws: file system errors if file not readable

6. Alternative: PapaParse (recommended for heavy CSV with edge cases)
- For convenience and robustness, PapaParse (https://www.papaparse.com/) supports streaming, workers, autodetect of delimiter, and RFC4180-compliant parsing. Example: Papa.parse(fileOrString, {header: true, dynamicTyping: true}). Use when input source is untrusted or very large.

7. Digest and attribution
- RFC4180 (https://datatracker.ietf.org/doc/html/rfc4180) — 58764 bytes retrieved 2026-03-20
- PapaParse homepage (https://www.papaparse.com/) — 18369 bytes retrieved 2026-03-20

