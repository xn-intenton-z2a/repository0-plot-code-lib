D3_DSV

NORMALISED EXTRACT

Table of contents
- Overview
- Installation and import
- CSV parsing APIs
- CSV formatting APIs
- dsvFormat (custom delimiter)
- Node usage patterns
- Edge cases and CSV details

Overview
- d3-dsv is a lightweight CSV/DSV utility extracted from the D3 project. It provides sync parsing of a full CSV string into JavaScript arrays or objects and formatting of rows/objects back into delimited text. It is intended for deterministic in-memory parsing and formatting rather than streaming large files.

Installation and import
- Install: npm install d3-dsv
- ES module import: import { csvParse, csvParseRows, csvFormat, csvFormatRows, dsvFormat } from 'd3-dsv'
- CommonJS: const d3 = require('d3-dsv'); const csvParse = d3.csvParse

CSV parsing APIs (practical signatures)
- csvParse(text, row?) -> Array<Object>
  - text: string containing CSV text
  - row (optional): function(rowObject, index) -> transformedObject; runs for each parsed row; if row returns undefined the row is skipped
  - Returns: array of objects where keys are column headers (first non-empty header row) and values are strings (not auto-typed)
- csvParseRows(text, row?) -> Array<Array<string>>
  - Parses CSV into an array-of-rows where each row is an array of string fields; useful when no header row is present

CSV formatting APIs
- csvFormat(rows) -> string
  - rows: Array<Object> or Array<Array<string>>; when given objects, keys are used for header row order coerced by insertion order
- csvFormatRows(rowsOfArrays) -> string
  - rowsOfArrays: Array<Array<string>>; returns a CSV where each row is joined with commas and fields quoted when necessary

dsvFormat(delimiter) -> DSV object
- dsvFormat(delimiter) returns an object exposing parse, parseRows, format, formatRows methods analogous to the CSV helpers but using the supplied delimiter (e.g., '\t' for TSV)

Node usage patterns (actionable)
- For small/medium CSVs where file fits memory: read file as text and call csvParse(text) to obtain an array of objects.
- To convert back to CSV: csvFormat(arrayOfObjects) returns a string which can be written to disk using fs.writeFileSync.
- To apply a row reviver that coerces numeric fields: supply row(rowObject, i) and convert fields using parseFloat and Number.isFinite checks; return the mutated object.

Edge cases and CSV details
- Fields are returned as strings; d3-dsv does not coerce numeric types automatically.
- Empty lines are skipped (implementation detail may depend on leading/trailing newlines); use csvParseRows if precise control over row arrays is required.
- Quoting and embedded delimiters follow RFC4180-style semantics: fields containing delimiter, quote, or newlines are quoted and inner quotes doubled.

SUPPLEMENTARY DETAILS
- Performance: d3-dsv is optimized for parsed-in-memory workloads; it is synchronous and not intended as a streaming parser for very large files.
- When using csvParse with a row reviver, avoid heavy synchronous work per-row if the CSV contains many rows; consider streaming alternatives for very large datasets.

REFERENCE DETAILS (exact API specifications)
- csvParse(text: string, row?: (d: {[key: string]: string}, i: number) => any): any[]
- csvParseRows(text: string, row?: (d: string[], i: number) => any): any[]
- csvFormat(rows: Array<Object> | Array<Array<string>>): string
- csvFormatRows(rows: Array<Array<string>>): string
- dsvFormat(delimiter: string) -> { parse(text, row?), parseRows(text, row?), format(rows), formatRows(rows) }

DETAILED DIGEST
- Source: https://github.com/d3/d3-dsv
- Retrieval date: 2026-03-20
- Bytes downloaded during crawl: 265195 bytes
- Extracted technical points used above were taken from the package README and API reference on the project page. Key practical facts: API names (csvParse, csvParseRows, csvFormat, csvFormatRows, dsvFormat), synchronous in-memory parsing model, row reviver semantics, and lack of automatic type coercion.

ATTRIBUTION
- Original source: d3-dsv (GitHub) — https://github.com/d3/d3-dsv
- Retrieved: 2026-03-20
