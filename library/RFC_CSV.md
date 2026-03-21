NORMALISED EXTRACT

Table of contents
- Record and field structure
- Quoting rules and escaping
- Line termination and headers
- Parsing algorithm outline

1. Record and field structure
- CSV is a sequence of records separated by CRLF (carriage return and line feed). Each record contains one or more fields separated by commas.
- The number of fields should be consistent across records when headers are used.

2. Quoting rules and escaping
- Fields that contain commas, double quotes, or line breaks must be enclosed in double quotes.
- A double quote appearing inside a field must be escaped by preceding it with another double quote (that is, represented as two consecutive double quote characters).
- Example: a field containing a quoted value: "John ""Johnny"" Doe"

3. Line termination and headers
- RFC 4180 prescribes CRLF as the line terminator but parsers often accept LF only. Be tolerant when reading files from Unix environments.
- An optional header line may appear as the first record containing field names.

4. Parsing algorithm outline (practical, robust)
- Read data as text using a streaming reader or readFile for small files.
- Parse character by character maintaining state: in-field vs in-quote. On comma outside quotes, split field. On CR or LF outside quotes treat as record separator. When a double quote is encountered inside quoted field, check next character; if double quote then append one quote to field and advance; otherwise, end of quoted field.
- Trim final CR and LF sequences; preserve embedded newlines within quoted fields.

SUPPLEMENTARY DETAILS
- Tolerance: accept files using LF-only line endings; trim optional trailing newline at EOF.
- Character encoding: CSV does not mandate UTF-8, but prefer UTF-8 and detect BOM if present.

REFERENCE DETAILS
- Formal source: RFC 4180 (https://datatracker.ietf.org/doc/html/rfc4180)
- Practical parser pseudocode: iterate bytes, on quote toggle quoted state; on comma outside quote finalize field; on CRLF outside quote finalize record.

DETAILED DIGEST
Source: RFC 4180 CSV specification
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced page (no bytes downloaded by this run)

ATTRIBUTION
RFC 4180 - Common Format and MIME Type for CSV Files (IETF)
