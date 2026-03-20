NORMALISED EXTRACT

Table of Contents
1. Core CSV format rules (RFC 4180)
2. Field quoting and escaped quotes
3. Line termination and header rows
4. Robust parsing algorithm (step-by-step)
5. Implementation notes for time series CSV (time,value)

1. Core CSV format rules (RFC 4180)
- Records are separated by line breaks. Each record consists of fields separated by commas.
- The first record may be a header line listing column names.

2. Field quoting and escaped quotes
- Fields that contain commas, CR/LF, or double quotes must be enclosed in double quotes.
- A double quote appearing inside a field must be escaped by preceding it with another double quote. For example, a field containing quote marks is represented as "" inside a quoted field.

3. Line termination and header rows
- RFC 4180 specifies CRLF as line terminator but implementations should accept LF or CRLF in practice.
- Header row is optional; when present, it typically contains column names such as time,value.

4. Robust parsing algorithm (step-by-step)
- Read the file as text and normalize line endings to LF.
- Iterate through characters, maintaining a state variable inQuote (true/false) and a current field buffer.
- For each character:
  a. If character is a double quote and inQuote is false and current field buffer is empty, set inQuote = true (start quoted field).
  b. Else if character is a double quote and inQuote is true: if next character is a double quote, append one double quote to the field buffer and advance past the second quote; else set inQuote = false (end quoted field).
  c. Else if character is comma and inQuote is false: finalize current field, push to current record, and reset buffer.
  d. Else if character is LF and inQuote is false: finalize current field and push record.
  e. Else append character to field buffer.
- After parsing, trim optional carriage returns and whitespace from fields (but only outside quoted contexts) and unescape doubled quotes inside quoted fields.

5. Implementation notes for time series CSV (time,value)
- Expect exactly two columns named time and value or infer columns when header missing (use first two fields).
- Parse time field using ISO 8601 compatible parsing where possible (Date.parse or new Date(timeString) in Node) or adopt numeric epoch milliseconds if source uses epoch.
- Parse value as Number; handle empty or non-numeric values by producing NaN or skipping the record depending on project policy.

SUPPLEMENTARY DETAILS
- For large CSVs stream the file and parse line-by-line with a stateful tokenizer to avoid reading the entire file into memory.
- Consider tolerant parsing: accept both quoted and unquoted numeric fields and accept LF-only line endings.

REFERENCE DETAILS (implementation signatures)
- Proposed parseCSV(text) -> Array of records where each record is an array of strings or an object keyed by header names.
- For time series loader: loadCSV(path) -> Promise<Array<{time: Number, value: Number}>> where time is epoch ms and value is Number.

DETAILED DIGEST
- Source: RFC 4180 specification
- Retrieved: 2026-03-20
- Source URL: https://datatracker.ietf.org/doc/html/rfc4180
- Bytes fetched: 58764

ATTRIBUTION
- Rules and parsing guidance condensed directly from RFC 4180 and adapted to practical tolerance for LF line endings and common CSV variants.