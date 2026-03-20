FAST_CSV

NORMALISED EXTRACT

Table of contents
- Overview
- Install and import
- Parser (streaming) API and options
- Example streaming usage pattern
- Common parser options (headers, delimiter, quote, escape, trim, skipRows)
- Error handling and events

Overview
- fast-csv is a streaming CSV parser and formatter for Node.js built on top of the Node Stream API. It is suitable for large files and streaming pipelines where memory usage must be bounded.

Install and import
- Install: npm install fast-csv
- Import: const { parse } = require('fast-csv') or import { parse } from 'fast-csv'

Parser API and options (practical)
- parse(opts?) -> Transform stream that parses CSV input into object-mode row events
  - opts.headers: boolean | Array<string> | 'infer'  (true to use first row as headers; false to return row arrays)
  - opts.delimiter: string (default ',')
  - opts.quote: string (default '"')
  - opts.escape: string (default '"')
  - opts.trim: boolean (trim leading/trailing whitespace from fields)
  - opts.skipRows: number (skip N initial rows)
  - opts.ignoreEmpty: boolean (skip empty lines)
  - opts.strictColumnHandling: boolean (error on extra/missing columns when headers set)

Example streaming usage (conceptual sequence)
1. const fs = require('fs')
2. const { parse } = require('fast-csv')
3. fs.createReadStream('data.csv')
   .pipe(parse({ headers: true }))
   .on('error', err => handle(err))
   .on('data', row => processRow(row))
   .on('end', rowCount => console.log(`Parsed ${rowCount} rows`))

- The parse stream emits 'data' events for each parsed row (object or array depending on headers option). Use stream piping and backpressure to control memory usage.

Error handling and events
- Standard events: 'error', 'data', 'end', 'headers' (emitted when headers are parsed if headers option used)
- For robust CSV ingestion, attach 'error' and 'end' handlers and prefer piping into a Writable that handles backpressure for downstream processing.

SUPPLEMENTARY DETAILS
- Use fast-csv when files are large or when you need to transform rows incrementally (e.g. write to a database or stream to another service).
- For small files or when you need full in-memory access to all rows, prefer d3-dsv or papaparse (sync parse) depending on environment and features.

REFERENCE DETAILS
- parse(opts?: object) -> Transform stream (object mode)
- Options summary:
  - headers: boolean | string[] | 'infer'
  - delimiter: string
  - quote: string
  - escape: string
  - trim: boolean
  - skipRows: number
  - ignoreEmpty: boolean
  - strictColumnHandling: boolean

DETAILED DIGEST
- Source: https://c2fo.github.io/fast-csv/
- Retrieval date: 2026-03-20
- Bytes downloaded during crawl: 6318 bytes
- Extracted points used: streaming parser model; parse(opts) returning a Transform stream; headers option semantics; common options and error/event model.

ATTRIBUTION
- Original source: fast-csv documentation (project website and docs)
- Retrieved: 2026-03-20
