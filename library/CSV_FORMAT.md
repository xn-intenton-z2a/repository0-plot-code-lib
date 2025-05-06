# CSV_FORMAT

## Crawl Summary
Each CSV record is a CRLF-delimited line. Optional header line indicated via header parameter. Fields separated by comma; spaces significant. Quoting rules: quote fields containing CRLF, commas, quotes; escape internal quotes by doubling. ABNF grammar defines file, header, record, field, escaped and non-escaped forms. MIME type text/csv registered with optional charset and header parameters. File extension .CSV.

## Normalised Extract
Table of Contents:
1. Record Delimiter
2. Header Line
3. Field Separator
4. Quoting Rules
5. Escaping Double Quotes
6. ABNF Grammar
7. MIME Parameters and File Extension

1. Record Delimiter
Each record ends with CRLF (\r\n). Last record may omit trailing CRLF.

2. Header Line
Optional first line matching record format; header parameter = present|absent.

3. Field Separator
Comma (%x2C). No trailing comma after last field. Spaces are part of field content.

4. Quoting Rules
Fields may be enclosed in DQUOTE (%x22). Mandatory quoting when field includes comma, CR, LF, or quote.

5. Escaping Double Quotes
Within quoted field, represent a single quote by two sequential DQUOTE characters.

6. ABNF Grammar
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA

7. MIME Parameters and File Extension
MIME type: text/csv
Parameters:
  charset = IANA text charsets (default US-ASCII)
  header = present | absent
File extension: CSV

## Supplementary Details
Parameters and Defaults:
- charset: US-ASCII (other IANA text charsets allowed)
- header: present | absent (default implementor choice if omitted)
- delimiter: comma
- lineBreak: CRLF

Implementation Steps:
1. Read input as bytes, convert to string using specified charset.
2. Split input on CRLF boundary, preserving empty final line.
3. If header=present, parse first line as array of names by splitting per rules.
4. For each line, parse fields:
   a. If starts with DQUOTE, read until matching unescaped DQUOTE, handling doubled DQUOTE as single quote.
   b. If unquoted, read until next COMMA or line end.
5. Return array of records (arrays of strings).

## Reference Details
API: parseCSV(input: string|Buffer, options?: {charset?: string; header?: 'present'|'absent'; delimiter?: string;}): {headers?: string[]; rows: string[][]}

Parameters:
- input: UTF-8 string or Buffer
- options.charset: IANA text charset (default 'utf-8')
- options.header: 'present' | 'absent' (default 'absent')
- options.delimiter: string (default ',')

Returns:
- headers: string[] if header=present
- rows: array of records

Code Example (Node.js):
const fs = require('fs');
const { parseCSV } = require('csv-parser');

const raw = fs.readFileSync('data.csv', {encoding: 'utf-8'});
const {headers, rows} = parseCSV(raw, {header: 'present', charset: 'utf-8'});
console.log(headers);
console.table(rows);

Best Practices:
- Normalize line breaks to CRLF before parsing.
- Trim BOM if present.
- Validate uniform field count per record; raise error if mismatch.

Troubleshooting:
Command: head -n1 data.csv | od -c
 Expected: '\\r\\n' at end-of-line; presence of '\\n' only may indicate improper line-break.
Command: node test-parser.js
 Expected: no exceptions; rows.length > 0.



## Information Dense Extract
Record Delimiter=CRLF; Last record may omit. Header optional (header=present|absent). Delimiter=COMMA. Spaces significant. Fields requiring quoting: containing comma, CR, LF, quote. Quoted fields start/end with DQUOTE; internal DQUOTE escaped as two DQUOTE. ABNF: file=[headerCRLF]record*(CRLFrecord)[CRLF]; field=escaped/non-escaped; escaped=DQUOTE*(TEXTDATA/COMMA/CR/LF/2DQUOTE)DQUOTE; non-escaped=*TEXTDATA. MIME=text/csv; params: charset (IANA text; default US-ASCII), header (present|absent). Extension=CSV.

## Sanitised Extract
Table of Contents:
1. Record Delimiter
2. Header Line
3. Field Separator
4. Quoting Rules
5. Escaping Double Quotes
6. ABNF Grammar
7. MIME Parameters and File Extension

1. Record Delimiter
Each record ends with CRLF ('r'n). Last record may omit trailing CRLF.

2. Header Line
Optional first line matching record format; header parameter = present|absent.

3. Field Separator
Comma (%x2C). No trailing comma after last field. Spaces are part of field content.

4. Quoting Rules
Fields may be enclosed in DQUOTE (%x22). Mandatory quoting when field includes comma, CR, LF, or quote.

5. Escaping Double Quotes
Within quoted field, represent a single quote by two sequential DQUOTE characters.

6. ABNF Grammar
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA

7. MIME Parameters and File Extension
MIME type: text/csv
Parameters:
  charset = IANA text charsets (default US-ASCII)
  header = present | absent
File extension: CSV

## Original Source
CSV (RFC 4180) Specification
https://datatracker.ietf.org/doc/html/rfc4180

## Digest of CSV_FORMAT

# CSV Format and MIME Type (RFC4180)

_Originally retrieved on 2023-10-05_

# Definition of the CSV Format

1. Each record is on its own line, delimited by CRLF (\r\n).
   Example:
   aaa,bbb,ccc\r\n
   zzz,yyy,xxx\r\n

2. Final record may omit trailing CRLF:
   aaa,bbb,ccc\r\n
   zzz,yyy,xxx

3. Optional header line, same field count as data records. Indicated by MIME parameter header=present or header=absent.
   Example:
   field1,field2,field3\r\n
   aaa,bbb,ccc\r\n

4. Fields separated by comma. Spaces are significant. No trailing comma after last field.
   Example: aaa,bbb,ccc

5. Fields may be enclosed in double quotes ("). If not quoted, embedded quotes are disallowed.
   Example: "aaa","bbb","ccc"\r\n

6. Fields with CRLF, comma, or quote must be quoted.
   Example:
   "aaa","b\r\nbb","ccc"\r\n

7. To include a double quote inside a quoted field, escape by doubling it:
   Example: "aaa","b""bb","ccc"

# ABNF Grammar

file     = [header CRLF] record *(CRLF record) [CRLF]
header   = name *(COMMA name)
record   = field *(COMMA field)
field    = escaped / non-escaped
escaped  = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-esc. = *TEXTDATA
COMMA    = %x2C
CR       = %x0D
LF       = %x0A
CRLF     = CR LF
DQUOTE   = %x22
TEXTDATA = %x20-21 / %x23-2B / %x2D-7E

# MIME Type Registration (text/csv)

- Type: text
- Subtype: csv
- Optional parameters:
   * charset (default US-ASCII)
   * header = present | absent
- Encoding: CRLF line breaks
- File extension: .CSV


## Attribution
- Source: CSV (RFC 4180) Specification
- URL: https://datatracker.ietf.org/doc/html/rfc4180
- License: License: IETF (public domain)
- Crawl Date: 2025-05-06T18:31:03.253Z
- Data Size: 4025809 bytes
- Links Found: 8227

## Retrieved
2025-05-06
