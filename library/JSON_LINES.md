# JSON_LINES

## Crawl Summary
Specification: UTF-8 without BOM; one JSON value per line; newline `\n` separator; trailing newline allowed. Conventions: .jsonl extension, optional gzip/bzip2 compression, MIME type application/jsonl. Examples: tabular arrays, JSON objects, nested arrays. Shell tooling: grep + jq.

## Normalised Extract
Table of Contents:
 1. Requirements
 2. Conventions
 3. Examples
 4. Shell Tooling

1. Requirements
 • Encoding: UTF-8 only
 • No BOM (U+FEFF prohibited)
 • Each line contains exactly one valid JSON value
 • Whitespace trimmed around values
 • End-of-line delimiter is `\n`; `\r\n` normalized to `\n`
 • Optional trailing newline does not create empty record

2. Conventions
 • Filename extension: `.jsonl`
 • Compressed forms: `.jsonl.gz`, `.jsonl.bz2`
 • Recommended MIME: `application/jsonl`
 • Line count equals record index (first line = record 1)

3. Examples
 • Tabular data as JSON arrays:
   ["Name","Session","Score","Completed"]
   ["Alexa","2013",29,true]
 • Self-describing records:
   {"name":"May","session":"2012B","score":14,"completed":false}
 • Nested arrays:
   {"name":"Deloise","wins":[["three of a kind","5♣"]]}

4. Shell Tooling
 • Filtering: `grep pattern file.jsonl`
 • Pretty print: pipe to `jq .`
 • Combined: `grep pair file.jsonl | jq .`

## Supplementary Details
Parameter Values:
 • Encoding: UTF-8 (RFC 3629)
 • BOM: must not include U+FEFF at start
 • Line separator: LF (`0x0A`); CRLF (`0x0D0A`) accepted but normalized
 • File extension: `.jsonl`; compressors yield `.jsonl.gz` or `.jsonl.bz2`
 • MIME type: `application/jsonl` (draft)

Implementation Steps:
 1. Open file in text mode with UTF-8 decoding
 2. Read line by line, trimming trailing CR and LF
 3. For each non-empty line, parse JSON value
 4. Process or stream values sequentially

Best Practices:
 • Use streaming JSON parsers to handle large files
 • Avoid loading entire file into memory
 • Compress large archives with gzip or bzip2

Tools & Libraries:
 • jq: lightweight JSON processor (filtering & formatting)
 • Python: built-in `json` module with `for line in open(...)` loop
 • Node.js: `readline` module paired with `JSON.parse(line)`
 • Go: `bufio.Scanner` + `encoding/json`

Troubleshooting:
 • Error: unexpected BOM: remove BOM or ensure UTF-8 without BOM
 • Malformed JSON: validate with `jq .` or online validators
 • Incomplete lines: ensure trailing newline at EOF


## Reference Details
Shell Example:
 Command: grep pair winning_hands.jsonl | jq .
 Expected Output:
 {
   "name": "Gilbert",
   "wins": [["straight","7♣"],["one pair","10♥"]]
 }
 {
   "name": "Alexa",
   "wins": [["two pair","4♠"],["two pair","9♠"]]
 }

Tool Integrations:
 • pytest-reportlog plugin: outputs JSON Lines from pytest
 • Logstash json_lines codec: configure `codec => json_lines`
 • Scrapy: `FEED_FORMAT = 'jsonlines'`
 • ClickHouse: use `JSONEachRow` format for INSERT/SELECT
 • BigQuery: specify `NEWLINE_DELIMITED_JSON` for load jobs

Configuration Snippets:
 - Logstash pipeline:
   input { file { path => "/path/to/*.jsonl" codec => json_lines } }
 - Scrapy settings.py:
   FEED_URI = 'output.jsonl'
   FEED_FORMAT = 'jsonlines'


## Information Dense Extract
UTF-8 no BOM, LF delim. One JSON value per line, whitespace-trimmed. .jsonl extension, .jsonl.gz/.bz2 optional, MIME application/jsonl. Examples: arrays for tabular data, objects for records, nested arrays. Tools: grep + jq, Python json module, Node.js readline+JSON.parse, Go bufio.Scanner+encoding/json. Integrations: Scrapy FEED_FORMAT=jsonlines; Logstash codec=json_lines; ClickHouse JSONEachRow; BigQuery NEWLINE_DELIMITED_JSON.

## Sanitised Extract
Table of Contents:
 1. Requirements
 2. Conventions
 3. Examples
 4. Shell Tooling

1. Requirements
  Encoding: UTF-8 only
  No BOM (U+FEFF prohibited)
  Each line contains exactly one valid JSON value
  Whitespace trimmed around values
  End-of-line delimiter is ''n'; ''r'n' normalized to ''n'
  Optional trailing newline does not create empty record

2. Conventions
  Filename extension: '.jsonl'
  Compressed forms: '.jsonl.gz', '.jsonl.bz2'
  Recommended MIME: 'application/jsonl'
  Line count equals record index (first line = record 1)

3. Examples
  Tabular data as JSON arrays:
   ['Name','Session','Score','Completed']
   ['Alexa','2013',29,true]
  Self-describing records:
   {'name':'May','session':'2012B','score':14,'completed':false}
  Nested arrays:
   {'name':'Deloise','wins':[['three of a kind','5']]}

4. Shell Tooling
  Filtering: 'grep pattern file.jsonl'
  Pretty print: pipe to 'jq .'
  Combined: 'grep pair file.jsonl | jq .'

## Original Source
JSON Lines
https://jsonlines.org/

## Digest of JSON_LINES

# JSON Lines Format Specification (retrieved 2024-07-13)

# Overview
JSON Lines (newline-delimited JSON) is a text format for storing structured data one record per line. It supports stream processing, shell pipelines, and parallel loading of large datasets.

# 1. Requirements

## 1.1 UTF-8 Encoding
• Files MUST be encoded in UTF-8
• No byte order mark (U+FEFF) may appear

## 1.2 Valid JSON Value per Line
• Each line must contain exactly one complete JSON value (object, array, string, number, boolean, or null)
• Leading and trailing whitespace on each line is ignored

## 1.3 Line Separator
• Lines are terminated by a single `\n` character
• `\r\n` sequences are accepted and parsed as if trimmed to `\n`
• The file may end with a trailing `\n`; it does not introduce an empty record

# 2. Suggested Conventions

• File extension: `.jsonl`
• Compressed variants: `.jsonl.gz`, `.jsonl.bz2`
• Recommended MIME type: `application/jsonl` (in-progress)
• Value indexing: first line is value 1, second line is value 2, etc.

# 3. Usage Examples

## 3.1 Tabular Data
["Name", "Session", "Score", "Completed"]
["Gilbert", "2013", 24, true]

## 3.2 Self-Describing Objects
{"name": "Gilbert", "session": "2013", "score": 24, "completed": true}

## 3.3 Nested Structures
{"name": "Gilbert", "wins": [["straight", "7♣"], ["one pair", "10♥"]]}

# 4. Shell Processing

Use Unix tools for filtering and pretty-printing:

```shell
grep pair winning_hands.jsonl | jq .
```

## Attribution
- Source: JSON Lines
- URL: https://jsonlines.org/
- License: CC0
- Crawl Date: 2025-05-18T18:30:52.918Z
- Data Size: 81999 bytes
- Links Found: 23

## Retrieved
2025-05-18
