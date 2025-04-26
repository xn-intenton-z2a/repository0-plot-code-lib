# CSV_FORMAT

## Crawl Summary
Records: separated by CRLF; optional header per header parameter; fields: commas; quoting rules: embed CRLF, commas, quotes only in quoted fields; escape quotes with double quotes; ABNF grammar defines structure; MIME subtype text/csv with optional charset and header parameters; encoding CRLF; extension .csv.

## Normalised Extract
Table of Contents:
1 Record Delimiters
2 Header Line Parameter
3 Field Separator Rules
4 Field Enclosure and Escaping
5 ABNF Grammar
6 MIME Type Parameters

1 Record Delimiters
Records end with CRLF (0x0D 0x0A). Last record may omit CRLF.

2 Header Line Parameter
Optional first record; MIME parameter header=present or header=absent.

3 Field Separator Rules
Fields separated by comma (0x2C). No trailing comma after last field.

4 Field Enclosure and Escaping
Unquoted fields: no double quotes. Quoted fields begin and end with DQUOTE (0x22). Inside quoted fields, double any DQUOTE to represent a literal quote.
Embed CRLF, comma, or DQUOTE only inside quoted fields.

5 ABNF Grammar
file    = [header CRLF] record *(CRLF record) [CRLF]
header  = name *(COMMA name)
record  = field *(COMMA field)
field   = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA   = %x2C  CR = %x0D  LF = %x0A  DQUOTE = %x22
TEXTDATA= %x20-21 / %x23-2B / %x2D-7E

6 MIME Type Parameters
Media Type: text/csv
charset: any IANA text charset, default US-ASCII
header: present or absent
Encoding uses CRLF
File extension .csv

## Supplementary Details
Configuration Options:
  header parameter: present | absent
  charset parameter: US-ASCII | UTF-8 | other IANA text charsets

Implementation Steps:
1. Open file in binary mode; read bytes.
2. Split stream by CRLF to extract records; handle missing CRLF on last line.
3. For each record, parse fields by scanning for commas outside quoted ranges.
4. In quoted ranges, detect DQUOTE pairs as escaped quote. Replace "" with DQUOTE.
5. Trim nothing (spaces are part of field). Preserve empty fields as empty string.
6. Optional: if header=present, map header names to indices.


## Reference Details
MIME Media-Type Registration for text/csv:
  Type name: text
  Subtype name: csv
  Required parameters: none
  Optional parameters:
    charset=US-ASCII|UTF-8|...   default US-ASCII
    header=present|absent        indicates header line presence
  Encoding considerations: CRLF for line break
  File extension: .csv

ABNF Grammar (full):
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA = %x2C   CR = %x0D   LF = %x0A   DQUOTE = %x22
TEXTDATA = %x20-21 / %x23-2B / %x2D-7E

Concrete Best Practices:
- Always normalize line breaks to CRLF when writing CSV.
- Quote fields containing separators or newlines.
- Escape quotes by doubling.
- Consistently apply header parameter across producers and consumers.

Troubleshooting Procedures:
Command: awk -F',' '{ if (NF != expected) print NR, NF }' file.csv
Expected: no output if all records have same field count.
Regex Validation: grep -Pv '^(?:"(?:[^"]|"")*"|[^,]*)(?:,(?:"(?:[^"]|"")*"|[^,]*))*$' file.csv
Expected: no matching lines if all conform.

## Information Dense Extract
Records separated by CRLF; optional header line enabled via header=present|absent; fields separated by comma; unquoted fields exclude DQUOTE; quoted fields enclosed in DQUOTE with internal quotes escaped as double DQUOTE; embed CRLF, comma, DQUOTE only inside quoted fields; ABNF grammar defines file, header, record, field, escaped, non-escaped; MIME type text/csv optional charset (default US-ASCII) and header parameters; encoding CRLF; extension .csv.

## Sanitised Extract
Table of Contents:
1 Record Delimiters
2 Header Line Parameter
3 Field Separator Rules
4 Field Enclosure and Escaping
5 ABNF Grammar
6 MIME Type Parameters

1 Record Delimiters
Records end with CRLF (0x0D 0x0A). Last record may omit CRLF.

2 Header Line Parameter
Optional first record; MIME parameter header=present or header=absent.

3 Field Separator Rules
Fields separated by comma (0x2C). No trailing comma after last field.

4 Field Enclosure and Escaping
Unquoted fields: no double quotes. Quoted fields begin and end with DQUOTE (0x22). Inside quoted fields, double any DQUOTE to represent a literal quote.
Embed CRLF, comma, or DQUOTE only inside quoted fields.

5 ABNF Grammar
file    = [header CRLF] record *(CRLF record) [CRLF]
header  = name *(COMMA name)
record  = field *(COMMA field)
field   = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA   = %x2C  CR = %x0D  LF = %x0A  DQUOTE = %x22
TEXTDATA= %x20-21 / %x23-2B / %x2D-7E

6 MIME Type Parameters
Media Type: text/csv
charset: any IANA text charset, default US-ASCII
header: present or absent
Encoding uses CRLF
File extension .csv

## Original Source
RFC 4180 (Common Format and MIME Type for CSV Files)
https://tools.ietf.org/html/rfc4180

## Digest of CSV_FORMAT

# Definition of CSV Format

Each CSV file consists of records and fields according to the following rules:

1. Record Delimiter: Records separated by CRLF (0x0D 0x0A). Last record may omit trailing CRLF.
2. Header Line: Optional first record. Indicated by MIME parameter header=(present|absent).
3. Field Separator: Comma (0x2C). No trailing comma after last field.
4. Field Enclosure: Fields may be enclosed in DQUOTE (0x22). Unquoted fields must not contain DQUOTE.
5. Embedded Special Characters: Fields with commas, CR, LF, or DQUOTE must be quoted.
6. Quote Escaping: DQUOTE within quoted field represented as two DQUOTE.

# ABNF Grammar

file    = [header CRLF] record *(CRLF record) [CRLF]
header  = name *(COMMA name)
record  = field *(COMMA field)
name    = field
field   = (escaped / non-escaped)
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA   = %x2C
CR      = %x0D
LF      = %x0A
CRLF    = CR LF
DQUOTE  = %x22
TEXTDATA= %x20-21 / %x23-2B / %x2D-7E

# MIME Type text/csv Registration

Media Type: text/csv
Parameters:
  charset = IANA text charset (default US-ASCII)
  header  = present / absent (indicates header line presence)
Encoding: CRLF for line breaks
File Extension: .csv


## Attribution
- Source: RFC 4180 (Common Format and MIME Type for CSV Files)
- URL: https://tools.ietf.org/html/rfc4180
- License: License
- Crawl Date: 2025-04-26T01:04:51.466Z
- Data Size: 1182016 bytes
- Links Found: 1236

## Retrieved
2025-04-26
