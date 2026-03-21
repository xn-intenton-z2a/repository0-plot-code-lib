CSV_RFC4180

Table of contents
- Record and field delimiters
- Quoted fields and escaping
- Optional header row
- Robust parsing notes

Normalised extract
- Fields are separated by commas, records by CRLF (CRLF recommended but parsers should accept LF).
- Fields that contain commas, double quotes, or line breaks must be enclosed in double quotes.
- A double-quote inside a quoted field is represented by two consecutive double quotes.
- There may be an optional header record as the first line of the file.

Reference details (rules)
1. Each record on separate line, delimited by CRLF. Last record may or may not end with a line break.
2. Optional header line with column names.
3. Fields with embedded commas, double-quotes, or CRLF must be quoted.
4. Quoted field interior double-quote characters are represented by a pair of double-quotes.
5. Parsers must accept CRLF or LF line endings for robustness.

Implementation pattern (robust parser outline)
- Implement a state machine that scans characters in a line and handles three states: inField, inQuotedField, quoteEscape.
- When starting a field: if first char is double-quote, enter inQuotedField; otherwise parse until comma or line end.
- In inQuotedField: two consecutive double quotes mean one literal double-quote; a single unescaped double quote followed by comma or line end ends the quoted field.
- For files with embedded newlines inside quoted fields, read the stream and join continuation lines until the quoted field is closed.
- Alternatively use a well-tested CSV library (PapaParse, csv-parse) for edge cases.

Troubleshooting
- Naive split on commas breaks when fields contain commas or newlines; use a parser or state machine.
- Mixed line endings (CRLF vs LF) can produce empty header/footer lines; normalize line breaks before parsing.

Detailed digest (source and retrieval)
Source: RFC 4180 (Common Format and MIME Type for CSV Files)
Retrieved: 2026-03-21
Crawled bytes: 58764
Attribution: https://datatracker.ietf.org/doc/html/rfc4180
