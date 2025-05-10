# CSV_FORMAT

## Crawl Summary
Each CSV record is a line delimited by CRLF; final record may omit CRLF. Optional header line with same field count controllable by header parameter. Fields separated by commas; spaces significant. Fields containing commas, CRLF, or quotes must be double-quoted; embedded quotes escaped by doubling. Uniform field count enforced. ABNF grammar defines file, header, record, field, escaped and non-escaped forms. MIME type text/csv with optional charset (IANA text sets) and header (present|absent); default charset US-ASCII; use CRLF. File extension .csv.

## Normalised Extract
Table of Contents
1. Record Delimitation
2. Final Record Handling
3. Header Line
4. Field Separation and Spacing
5. Quoted Fields
6. Embedded Quotes Escaping
7. ABNF Grammar
8. MIME Registration Parameters

1. Record Delimitation
   Uses CRLF (\x0D\x0A) as line terminator.

2. Final Record Handling
   Last line may lack CRLF.

3. Header Line
   Optional first line; same comma-separated format; field count equal to records; controlled by header parameter = present|absent.

4. Field Separation and Spacing
   Fields split on commas; spaces are part of field data; no trailing comma after last field.

5. Quoted Fields
   Enclose field in DQUOTE when containing CRLF, comma, or DQUOTE.
   Example: "a, b" + CRLF inside field.

6. Embedded Quotes Escaping
   Represent a literal quote inside a quoted field by doubling: "".

7. ABNF Grammar
   file = [header CRLF] record *(CRLF record) [CRLF]
   field = escaped / non-escaped
   escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
   non-escaped = *TEXTDATA
   COMMA=%x2C  CR=%x0D  LF=%x0A  DQUOTE=%x22  TEXTDATA=%x20-21/%x23-2B/%x2D-7E

8. MIME Registration Parameters
   text/csv; charset={US-ASCII|...}; header={present|absent}

## Supplementary Details
Parameter defaults and effects
- charset default: US-ASCII; any IANA-registered text charset allowed.
- header default: implementor decision if omitted; use header=present to declare header line.
- File extension: .csv recognized by OS and applications.

Implementation steps to generate valid CSV
1. Determine field count per record; pad or error if mismatch.
2. For each field:
   a. If field contains any of {CR, LF, COMMA, DQUOTE}, wrap in DQUOTE.
   b. Inside quoted field, replace each DQUOTE with two DQUOTEs.
3. Join fields with comma; append CRLF.
4. Optionally prepend header line with same process.

Interoperability
- Read conservatively: accept CRLF, LF, or CR as line break; trim no extra whitespace.
- Write strictly: always use CRLF per spec.

Security
- Avoid buffer overruns by validating line length and field count.
- Reject control characters outside CR/LF in non-escaped fields; sanitize input.

## Reference Details
1. MIME Type Registration Syntax
Content-Type: text/csv[; charset=<IANA-text-charset>][; header={present|absent}]

2. ABNF Grammar Full Definition (same as Detailed Digest section).

3. Example HTTP Response with CSV
HTTP/1.1 200 OK
Content-Type: text/csv; charset=UTF-8; header=present

name,age,city␍␊
"Doe, John",29,"New York, NY"␍␊

4. Node.js CSV Parser Function
Signature: parseCsv(data: string, delimiter: string = ',', quote: string = '"'): string[][]
Return: two-dimensional array of fields
Throws: Error("Unbalanced quotes at position X")
Implementation:
    function parseCsv(data, delimiter = ',', quote = '"') {
      const records = [];
      let field = '';
      let record = [];
      let inQuotes = false;
      for (let i = 0; i < data.length; i++) {
        const char = data[i];
        const next = data[i+1];
        if (char === quote) {
          if (inQuotes && next === quote) { field += quote; i++; }
          else { inQuotes = !inQuotes; }
        } else if (!inQuotes && char === delimiter) {
          record.push(field); field = '';
        } else if (!inQuotes && char === '\r' && next === '\n') {
          record.push(field); records.push(record); record = []; field = ''; i++;
        } else {
          field += char;
        }
      }
      if (inQuotes) throw new Error(`Unbalanced quotes at position ${data.lastIndexOf(quote)}`);
      if (field !== '' || record.length) record.push(field);
      if (record.length) records.push(record);
      return records;
    }

5. Best Practice Code Snippet (Python)
    import csv
    with open('data.csv', newline='', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            process(row)

6. Troubleshooting
a. Unbalanced quotes error:
   Command: node -e "console.log(require('./parser').parseCsv(fs.readFileSync('bad.csv','utf8')));"
   Expected: Error: Unbalanced quotes at position 12
b. Field count mismatch:
   Detect if record.length !== headerLength; Command: grep -n ',' data.csv
c. CRLF vs LF issues:
   Verify line endings: dos2unix -ic data.csv

## Information Dense Extract
Records: lines delimited CRLF; final CRLF optional. Header: optional first line, header={present|absent}, field count consistency. Fields: comma separated, spaces kept. Quoting: enclose with DQUOTE if containing CR, LF, comma or DQUOTE; escape internal DQUOTE by doubling. ABNF: see grammar. MIME: text/csv; charset=<IANA-text>; header=<present|absent>. File extension .csv. Parser parseCsv(data:string,delimiter=',',quote='"'):string[][]. Throws on unbalanced quotes. Generation: escape DQUOTE, join by comma, append CRLF. HTTP example: Content-Type: text/csv; charset=UTF-8; header=present. Troubleshoot: dos2unix, record count validation, balanced-quote errors.

## Sanitised Extract
Table of Contents
1. Record Delimitation
2. Final Record Handling
3. Header Line
4. Field Separation and Spacing
5. Quoted Fields
6. Embedded Quotes Escaping
7. ABNF Grammar
8. MIME Registration Parameters

1. Record Delimitation
   Uses CRLF ('x0D'x0A) as line terminator.

2. Final Record Handling
   Last line may lack CRLF.

3. Header Line
   Optional first line; same comma-separated format; field count equal to records; controlled by header parameter = present|absent.

4. Field Separation and Spacing
   Fields split on commas; spaces are part of field data; no trailing comma after last field.

5. Quoted Fields
   Enclose field in DQUOTE when containing CRLF, comma, or DQUOTE.
   Example: 'a, b' + CRLF inside field.

6. Embedded Quotes Escaping
   Represent a literal quote inside a quoted field by doubling: ''.

7. ABNF Grammar
   file = [header CRLF] record *(CRLF record) [CRLF]
   field = escaped / non-escaped
   escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
   non-escaped = *TEXTDATA
   COMMA=%x2C  CR=%x0D  LF=%x0A  DQUOTE=%x22  TEXTDATA=%x20-21/%x23-2B/%x2D-7E

8. MIME Registration Parameters
   text/csv; charset={US-ASCII|...}; header={present|absent}

## Original Source
Data Serialization Formats (JSON, NDJSON, CSV)
https://datatracker.ietf.org/doc/html/rfc4180

## Digest of CSV_FORMAT

# Definition of the CSV Format

1. Each record is on a separate line terminated by CRLF (0x0D 0x0A).
   Example: `aaa,bbb,ccc␍␊`  
            `zzz,yyy,xxx␍␊`

2. Final record may lack terminating CRLF.
   Example: `zzz,yyy,xxx`

3. Optional header line with same comma-separated field count as data records. Use MIME parameter header=(present|absent).
   Example: `field1,field2,field3␍␊`

4. Fields are comma-separated; lines must contain uniform field counts; spaces are significant; no trailing comma on last field.
   Example: `aaa, bbb ,ccc`

5. Fields containing CRLF, commas, or DQUOTE must be enclosed in DQUOTE (0x22).
   Example: `"aaa","b ␍␊ bb","ccc"␍␊`

6. To embed a DQUOTE within a quoted field, double it: `"b""bb"`.

# ABNF Grammar (RFC2234)

```
file       = [ header CRLF ] record *( CRLF record ) [ CRLF ]
header     = name *( COMMA name )
record     = field *( COMMA field )
name       = field
field      = ( escaped / non-escaped )
escaped    = DQUOTE *( TEXTDATA / COMMA / CR / LF / 2DQUOTE ) DQUOTE
non-escaped= *TEXTDATA
COMMA      = %x2C
CR         = %x0D
LF         = %x0A
CRLF       = CR LF
DQUOTE     = %x22
2DQUOTE    = 2 DQUOTE
TEXTDATA   = %x20-21 / %x23-2B / %x2D-7E
``` 

# MIME Type Registration of text/csv

- Type name: text
- Subtype: csv
- Required parameters: none
- Optional parameters:
  • charset = IANA text character set (default US-ASCII)
  • header = present | absent (indicates header line presence)
- Encoding: use CRLF for line breaks (implementations may accept other eol)
- File extension: .csv
- No magic number

# IANA Considerations

IANA has registered text/csv per above parameters.

## Attribution
- Source: Data Serialization Formats (JSON, NDJSON, CSV)
- URL: https://datatracker.ietf.org/doc/html/rfc4180
- License: License: IETF (public domain) / CC0
- Crawl Date: 2025-05-10T08:02:02.188Z
- Data Size: 3997195 bytes
- Links Found: 8188

## Retrieved
2025-05-10
