PAPAPARSE

Table of contents
- Overview
- Primary APIs and signatures
- Important parsing options and behaviors
- Node streaming mode and integration notes
- CSV -> JSON and JSON -> CSV conversions
- Error handling and limits
- Supplementary implementation notes
- Detailed digest and retrieval metadata
- Attribution and raw data size

Overview
Papa Parse is a fast, RFC4180-compliant CSV parser designed primarily for browser usage but with Node.js support. It supports parsing local files, remote files (download), streaming large files, worker-thread parsing (browser), auto-detecting delimiters, header row handling, and converting numeric and boolean values automatically.

Primary APIs and signatures
- parse(input, config) -> Parser or immediate result depending on config
  - input: File | string | readable stream (in Node)
  - config: object with the parsing options described below
  - returns: when used with streams or step callbacks returns an object/stream; otherwise invokes callbacks per config
- unparse(data, config) -> string
  - Converts JSON/arrays into CSV text

Important parsing options and behaviors (extracted from README and docs reference)
- header: boolean (if true, the first row is interpreted as field names and results are objects keyed by header)
- dynamicTyping: boolean | object (if true, attempts to convert numeric and boolean-looking strings to their native types)
- preview: integer (limits number of rows parsed)
- delimiter: string (auto-detection supported when not specified)
- worker: boolean (browser-only; use worker threads to keep UI responsive)
- step: function(results, parser) callback invoked for each parsed row when streaming
- complete: function(results, file) called when parsing finishes (results contains data and errors)
- error: function(err, file) error callback
- download: boolean (when parsing a URL in browser; not applicable to Node stream mode)

Node streaming mode and integration notes
- In Node.js Papa Parse accepts a Readable stream as input; encoding must be a Node-supported encoding when specified
- Node streaming style: pipe a Readable stream into the stream returned from Papa.parse(Papa.NODE_STREAM_INPUT, options); then consume 'data' and 'end' events on the returned stream. Certain browser-only config options (download, worker, withCredentials, LocalChunkSize, RemoteChunkSize) are not available in Node mode.
- To use parser-like streaming with events: stream.on('data', callback) and stream.on('end', callback')

CSV -> JSON and JSON -> CSV conversions
- parse converts CSV text to arrays or objects (if header option used)
- unparse converts arrays or object arrays into CSV text with selectable config options for delimiter, quoting, and header inclusion

Error handling and limits
- Papa Parse exposes callbacks for errors and provides preview and step facilities to abort early when needed
- Correct handling of line breaks and quotation according to RFC4180 is a core feature

Supplementary implementation notes
- The project README indicates strong compatibility with RFC4180, streaming capabilities, and conversion features (dynamicTyping). For Node use prefer piping Readable streams to Papa or using file input via streams.

Detailed digest and retrieval metadata
- Source fetched on: 2026-03-20T13:46:25.591Z
- Raw file saved: library/_RAW_PAPAPARSE.md (source: https://raw.githubusercontent.com/mholt/PapaParse/master/README.md) size: 3683 bytes

Attribution and source links
- Papa Parse project README: https://raw.githubusercontent.com/mholt/PapaParse/master/README.md
- Official documentation: https://www.papaparse.com/docs
- Home/demo pages: https://www.papaparse.com and https://www.papaparse.com/demo
