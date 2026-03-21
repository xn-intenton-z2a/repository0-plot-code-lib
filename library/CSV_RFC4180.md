CSV_RFC4180

Table of contents
- Normalised extract: RFC 4180 rules for CSV format
- Field escaping and quoting rules (exact specification)
- Parser algorithm (state machine) to load time,value series
- Practical parsing notes for time and numeric fields
- Troubleshooting edge cases and examples of malformed input handling
- Detailed digest and attribution

Normalised extract: RFC 4180 core rules
- Records are delimited by CRLF (\r\n). Implementations commonly accept LF alone as well.
- Fields are separated by commas.
- The first record may contain column headers.
- Fields that contain commas, double-quotes, or CRLF must be enclosed in double-quotes.
- A double-quote appearing inside a field must be escaped by preceding it with another double-quote ("" represents one ").

Exact escaping rule (RFC text)
- If fields are not enclosed with double-quotes, then double-quotes may not appear inside the fields.
- Fields containing line breaks, double-quotes, and commas should be enclosed in double-quotes.
- Double-quote characters inside an enclosed field are represented by a pair of double-quote characters.

Parser algorithm (robust, streaming state machine)
1. Initialize field buffer = empty, inQuotes = false, record = [], results = [].
2. Read byte/character stream sequentially.
3. For each character c:
   - If c == '"':
       - If inQuotes and next character is '"' then append '"' to buffer and advance past next char (escaped quote).
       - Else toggle inQuotes (enter or exit quoted field).
   - Else if c == ',' and not inQuotes: push buffer as a field, clear buffer.
   - Else if c is CR or LF and not inQuotes: end of record; push buffer as final field, clear buffer, append record to results, reset record.
   - Else append c to buffer.
4. At EOF, if buffer non-empty, push as final field and append record.
5. Optionally trim whitespace from unquoted fields if desired, but RFC preserves whitespace.

Practical parsing notes for time,value series
- Expect header row with columns: time,value. If present, use header names to locate columns; otherwise assume first two columns are time and value.
- Time formats commonly seen: ISO-8601 string, Unix epoch seconds, Unix epoch milliseconds. Normalize to a numeric epoch (ms since UNIX epoch) for plotting.
- Value should be parsed with parseFloat; handle missing or empty values by skipping the point or treating value as NaN.
- For large CSVs, implement streaming parsing to avoid large memory usage.

Troubleshooting
- Non-CRLF line endings: accept LF-only line endings to be tolerant of files generated on Unix systems.
- Fields containing unescaped quotes are malformed: either reject or attempt recovery heuristics (not recommended).
- Inconsistent column counts per row: treat missing trailing fields as empty; if a row has more fields than header, drop extras or raise an error depending on strictness.

Detailed digest
- Source: RFC 4180 — Common Format and MIME Type for Comma-Separated Values (CSV) Files
- URL: https://datatracker.ietf.org/doc/html/rfc4180
- Retrieved: 2026-03-21
- Data obtained during crawl: 61781 bytes

Attribution
- Core CSV rules and exact escaping semantics are taken from RFC 4180 and condensed into a streaming parser algorithm and practical notes for time,value series ingestion.