NORMALISED_EXTRACT

Table of contents:
- API entry points: parse and unparse
- Parser configuration options (actionable list)
- Result object structure and streaming/step behaviour
- Node/browser differences and large-file strategies

API entry points
- Papa.parse(input, config?)
  - input can be a CSV string, a File/Blob (browser), a URL (with download:true), or a stream-like object in Node when using the node package.
- Papa.unparse(data, config?) -> string (CSV output)

Parser configuration options (commonly used, actionable)
- delimiter: string; explicit delimiter or autodetect when omitted.
- header: boolean; default false. When true rows are returned as objects keyed by header fields.
- dynamicTyping: boolean | function; when true convert numeric-looking strings to Number and booleans to Boolean; a function can control per-field conversion.
- skipEmptyLines: boolean or 'greedy'; controls ignoring blank lines.
- comments: string; lines beginning with this string are ignored as comments.
- worker: boolean; if true and running in browser, parsing runs in a Worker thread to avoid blocking UI.
- download: boolean; when true and input is a URL the file is downloaded first (browser support).
- step: function(row): called once per parsed row; signature receives {data, errors, meta} or similar and an internal parser object; use for streaming handling.
- complete: function(results): called after parsing finishes; results contains data, errors and meta.

Result object structure
- results.data: Array of rows (arrays or objects when header:true)
- results.errors: Array of objects { type, code, message, row }
- results.meta: Object with fields including delimiter, linebreak, aborted, fields (array of header names when header:true)

Streaming and large-file behaviour
- For large files prefer using step callback to process rows incrementally and worker:true in the browser to avoid UI freeze.
- In Node use streaming APIs (streams) or parse slices/chunks to avoid loading entire file into memory.

Node usage notes
- Install papaparse via npm. When parsing local files in Node prefer reading file into a stream and using Papa's parser to consume chunks, or convert the file buffer into a string and call parse with appropriate options.

DETAILED_DIGEST

Source: https://www.papaparse.com/
Date retrieved: 2026-03-25
Data captured: ~38 KB

Extracted technical points used above: parse/unparse signatures, full list of effective config options for CSV parsing and streaming behaviour.

ATTRIBUTION
Papa Parse project site and documentation (mholt/PapaParse). Condensed for CSV ingestion guidance.