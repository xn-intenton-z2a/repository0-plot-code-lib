# CSV_FORMAT

## Crawl Summary
Record delimitation: lines end with CRLF; last line may omit CRLF. Optional header with same field count indicated by header parameter. Fields separated by comma; spaces retained. Fields with commas, CRLF or quotes must be quoted. Quoted fields start/end with double-quote; internal quotes escaped by doubling. ABNF grammar defines file, header, record, field structures. MIME registration: text/csv; parameters charset (US-ASCII default, any IANA text charset) and header (present, absent); CRLF line breaks; file extension .csv.

## Normalised Extract
Table of Contents:
1. Record Structure
2. Header Line Parameter
3. Field Delimiting
4. Quoting and Escaping
5. ABNF Grammar
6. MIME Registration Parameters

1. Record Structure
   Definition: record = field *(COMMA field)
   Terminator: CRLF or EOF

2. Header Line Parameter
   header = name *(COMMA name)
   Parameter: header=present | header=absent
   Behavior: when present, first record is header; when absent, first record is data.

3. Field Delimiting
   Separator: COMMA (0x2C)
   No trailing comma after final field.
   Spaces preserved within fields.

4. Quoting and Escaping
   Unescaped field: TEXTDATA = %x20-21 / %x23-2B / %x2D-7E
   Escaped field: DQUOTE text DQUOTE
   text: TEXTDATA / COMMA / CR / LF / 2DQUOTE
   Internal DQUOTE: represented as two DQUOTE (""")

5. ABNF Grammar
   file = [header CRLF] record *(CRLF record) [CRLF]
   CRLF = 0x0D 0x0A

6. MIME Registration Parameters
   media-type: text/csv
   charset (optional): US-ASCII default, others allowed
   header (optional): present | absent

## Supplementary Details
Parameter Values:
• charset=US-ASCII (default), or any IANA text charset (e.g., UTF-8).
• header=present or header=absent (no default; implementations choose if omitted).

Implementation Steps:
1. Open file in binary or text mode respecting CRLF sequences.
2. Read until CRLF or EOF to obtain each record line.
3. If header=present, parse first record as field names.
4. For each record, split on commas, but only at positions not within quoted segments.
5. For each field:
   a. If surrounded by DQUOTE, remove leading/trailing DQUOTE and replace """ with DQUOTE.
   b. Otherwise, take raw TEXTDATA.
6. Validate field count matches header or first record count.

Character Handling:
• Accept CRLF, LF, or CR alone when reading lines.
• Internally normalize to LF or native line endings.

Edge Cases:
• Lines ending in CRLF or LF only.
• Unescaped quotes raise parsing errors.


## Reference Details
ABNF Grammar:
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
name = field
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA = %x2C
CR = %x0D
LF = %x0A
CRLF = CR LF
DQUOTE = %x22
TEXTDATA = %x20-21 / %x23-2B / %x2D-7E

MIME Registration Table:
Parameter    | Values              | Default   | Effect
-------------|---------------------|-----------|------------------------------
charset      | US-ASCII, UTF-8,... | US-ASCII  | character encoding of data
header       | present, absent     | none      | indicates header line usage

Best Practice Code (JavaScript):
function parseCsv(buffer, options){
  const charset = options.charset||'utf8'
  const headerFlag = options.header==='present'
  const text = Buffer.isBuffer(buffer)?buffer.toString(charset):buffer
  const lines = text.split(/\r?\n/)  // normalize CRLF, LF
  if(lines.length===0) return []
  let keys=[], start=0
  if(headerFlag){ keys = splitLine(lines[0]); start=1 }
  const result = []
  for(let i=start;i<lines.length;i++){
    if(!lines[i]) continue
    const fields = splitLine(lines[i])
    if(keys.length&&fields.length!==keys.length) throw new Error('Field count mismatch on line '+(i+1))
    result.push(keys.length?Object.fromEntries(keys.map((k,j)=>[k,fields[j]])):fields)
  }
  return result
}

function splitLine(line){
  const fields=[]
  let field='', inQuotes=false
  for(let i=0;i<line.length;i++){
    const ch=line[i]
    if(ch==='"'){
      if(inQuotes && line[i+1]==='"'){ field+='"'; i++ }
      else inQuotes=!inQuotes
    } else if(ch===',' && !inQuotes){ fields.push(field); field='' }
    else field+=ch
  }
  fields.push(field)
  return fields
}

// Usage:
// const data = fs.readFileSync('file.csv');
// const records = parseCsv(data,{charset:'utf8',header:'present'});

Troubleshooting:
1. Unbalanced quotes => Error: Field count mismatch on line X. Solution: verify quotes and escapes.
2. Mixed line endings => use dos2unix and unix2dos to normalize:
   dos2unix file.csv => converts CRLF to LF
   unix2dos file.csv => converts LF to CRLF
3. Unexpected encoding => verify charset parameter against BOM or external metadata.


## Information Dense Extract
Record=fields separated by COMMA, terminated by CRLF or EOF; Last record CRLF optional; Optional header line indicated via header parameter (present|absent); Field: unquoted TEXTDATA(%x20-21/%x23-2B/%x2D-7E) or quoted DQUOTE(text)DQUOTE; text includes TEXTDATA, COMMA, CR, LF, or 2DQUOTE; Internal DQUOTE escaped as two DQUOTE; ABNF defines file/header/record/field grammar; MIME=text/csv; charset=US-ASCII default, others allowed; header parameter configures header usage; Line breaks CRLF but tolerant of LF; Implementation: split lines on /\r?\n/, parse fields with state machine handling quotes, validate field counts; Best practice: conservative parsing, liberal acceptance; Troubleshoot unbalanced quotes and line ending inconsistencies.

## Sanitised Extract
Table of Contents:
1. Record Structure
2. Header Line Parameter
3. Field Delimiting
4. Quoting and Escaping
5. ABNF Grammar
6. MIME Registration Parameters

1. Record Structure
   Definition: record = field *(COMMA field)
   Terminator: CRLF or EOF

2. Header Line Parameter
   header = name *(COMMA name)
   Parameter: header=present | header=absent
   Behavior: when present, first record is header; when absent, first record is data.

3. Field Delimiting
   Separator: COMMA (0x2C)
   No trailing comma after final field.
   Spaces preserved within fields.

4. Quoting and Escaping
   Unescaped field: TEXTDATA = %x20-21 / %x23-2B / %x2D-7E
   Escaped field: DQUOTE text DQUOTE
   text: TEXTDATA / COMMA / CR / LF / 2DQUOTE
   Internal DQUOTE: represented as two DQUOTE (''')

5. ABNF Grammar
   file = [header CRLF] record *(CRLF record) [CRLF]
   CRLF = 0x0D 0x0A

6. MIME Registration Parameters
   media-type: text/csv
   charset (optional): US-ASCII default, others allowed
   header (optional): present | absent

## Original Source
CSV (RFC 4180) Specification
https://datatracker.ietf.org/doc/html/rfc4180

## Digest of CSV_FORMAT

# Definition of the CSV Format

Date Retrieved: 2024-06-10
Data Size: 4025809 bytes, Links Found: 8227

1. Each record: one line terminated by CRLF (0x0D 0x0A).
   Examples:
   aaa,bbb,ccc CRLF
   zzz,yyy,xxx CRLF

2. Last record may omit terminal CRLF:
   aaa,bbb,ccc CRLF
   zzz,yyy,xxx

3. Optional header line as first line; same field count as subsequent records; indicated via header parameter.
   Example:
   field_name,field_name,field_name CRLF
   aaa,bbb,ccc CRLF
   zzz,yyy,xxx CRLF

4. Fields separated by COMMA (0x2C); spaces are data; no trailing comma on last field.
   Example: aaa,bbb,ccc

5. Field quoting rules:
   • Unquoted fields: TEXTDATA only, no quotes allowed.
   • Quoted fields: begin and end with DQUOTE (0x22).
   • Fields with CRLF, comma or DQUOTE must be quoted.
   • Inside quoted fields, a DQUOTE is represented by two DQUOTE.
   Examples:
   "aaa","b CRLF
   bb","ccc" CRLF
   "aaa","b""bb","ccc"

# ABNF Grammar (RFC2234 Section 6.1)

file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
name = field
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA
COMMA = %x2C
CR = %x0D
LF = %x0A
CRLF = CR LF
DQUOTE = %x22
TEXTDATA = %x20-21 / %x23-2B / %x2D-7E

# MIME Type Registration of text/csv

Media Type: text/csv
Required parameters: none
Optional parameters:
  • charset: default US-ASCII; any IANA-registered text charset.
  • header: present | absent; indicates presence of header line.

Encoding: CRLF for line breaks; implementations may tolerate other newline sequences.

Security: passive text; buffer-overflow risk if binary inserted; treat data conservatively.

Interoperability: be conservative in output, liberal in input; header parameter optional; implementations decide header presence if header absent.

Additional info:
  • File extension: .csv
  • Magic number: none
  • Macintosh type code: TEXT

Contact: Yakov Shafranovich <ietf@shaftek.org>

## Attribution
- Source: CSV (RFC 4180) Specification
- URL: https://datatracker.ietf.org/doc/html/rfc4180
- License: License: IETF (public domain)
- Crawl Date: 2025-05-06T16:30:33.423Z
- Data Size: 4025809 bytes
- Links Found: 8227

## Retrieved
2025-05-06
