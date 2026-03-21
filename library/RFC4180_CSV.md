RFC4180_CSV

Table of contents
1. Purpose and overview
2. Exact format rules (core ABNF-style excerpts)
3. Field parsing algorithm (practical step-by-step)
4. Header and MIME notes
5. Reference details
6. Detailed digest (retrieved)
7. Attribution and crawl size

1. Purpose and overview
RFC 4180 specifies a commonly used textual format for comma-separated values (CSV): record-per-line, fields separated by commas, optional header row, and rules for quoting fields that contain delimiters, quotes or line breaks.

2. Exact format rules (core excerpts)
- Each record is located on a separate line, delimited by a line break (CRLF). For interoperability prefer CRLF line endings.
- The last record in the file may or may not be followed by a CRLF.
- Within the header and each record, there may be one or more fields, separated by commas.
- Each field may be enclosed in double-quotes (DQUOTE). If fields are not enclosed with double-quotes, then double-quotes may not appear inside the fields.
- If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.

Core grammar (ABNF-like summary):
- file = [ header CRLF ] record *( CRLF record ) [ CRLF ]
- header = fieldName *( COMMA fieldName )
- record = field *( COMMA field )
- field = ( escaped / non-escaped )
- escaped = DQUOTE *( TEXTDATA / COMMA / CR / LF / 2DQUOTE ) DQUOTE
- non-escaped = *( TEXTDATA )
Where TEXTDATA is any character except comma, CR, LF, and DQUOTE.

3. Field parsing algorithm (practical step-by-step)
To robustly parse a CSV record line into fields:
1. Iterate over characters in the line with an index and a boolean inQuotes flag.
2. On encountering an unquoted comma (inQuotes false), treat it as a field separator and push the accumulated buffer as one field.
3. On encountering a double-quote when not inQuotes, set inQuotes = true and continue (the opening quote).
4. When inQuotes and encountering two consecutive double-quotes, append a single double-quote to the field buffer and advance past both quotes.
5. When inQuotes and encountering a single double-quote followed by comma or end-of-line, treat it as the closing quote (set inQuotes = false).
6. CR and LF characters encountered while inQuotes are part of the field and must be preserved.
7. After finishing the line, the last field buffer is the final field.

4. Header and MIME notes
- The first record MAY be a header containing column names; if present, it describes the fields.
- The MIME type commonly used is text/csv.

5. Reference details
- Quoting rule: double-quote inside quoted field is represented by two double-quotes.
- Use CRLF for maximum compatibility but accept LF in practice.

6. Detailed digest (retrieved)
Source: RFC 4180 (IETF datatracker)
Retrieved: 2026-03-21
Crawl bytes downloaded: 58764
Key extracted facts used above: exact grammar fragments, quoting rules, CRLF line termination recommendation, and the field parsing algorithm spelled out step-by-step.

7. Attribution
Source URL: https://datatracker.ietf.org/doc/html/rfc4180
Crawl size (bytes): 58764
License / attribution: IETF RFC (see source).