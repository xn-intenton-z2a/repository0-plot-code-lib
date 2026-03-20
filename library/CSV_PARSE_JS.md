CSV_PARSE_JS

Table of contents
- Overview
- API signatures and exports
- Parser behavior and events
- Key options (normalized) and types
- Streaming and callback usage patterns
- Error handling and validation
- Supplementary implementation notes
- Reference details (exact signatures, properties)
- Detailed digest and retrieval metadata
- Attribution and raw data sizes

Overview
The csv-parse package (CSV project) provides a CSV parser that converts CSV text into arrays or objects. It implements the Node.js stream.Transform API and also exposes a convenience callback API. The parser is designed for high performance, RFC4180-compatible parsing, flexible options, and stream-based processing of large datasets.

API signatures and exports
- Named exports: parse, Parser, CsvError, normalize_options
- parse([data], [options], [callback]) -> Parser (stream.Transform)
  - data: string | Buffer (optional) — if present the parser will consume and end automatically
  - options: object (optional) — configuration described below
  - callback: function(error, records, infoDataSet) (optional) — invoked when parsing finishes
  - returns: Parser instance implementing stream.Transform with readableObjectMode enabled and encoding set to null
- Parser: class extends stream.Transform; created internally by parse(options) or new Parser(options)

Parser behavior and events
- Parser instances operate as Node.js transform streams; they emit the standard stream events and parse output records as objects or arrays depending on options.
- Typical events exposed by users: readable, data, end, error, skip
- For callback usage parse(data, options, callback) the parser collects results and invokes callback(error, records, infoDataSet) at end
- The parser exposes internal accessors: parser.options (normalized options), parser.info (info state) and parser.api.__infoDataSet() which is used by the callback form to return detailed parsing information

Key options (normalized) and types — extracted from normalize_options
Provide these key normalized options and validation rules. All normalization logic follows the package's normalize_options implementation.
- encoding: string | null | true (default: "utf8")
  - If null or false, parser returns Buffer values; if undefined or true defaults to utf8
- bom: boolean (default: false)
- cast: boolean | function (default: undefined)
  - If a function, cast_function is set and used to convert field values
- cast_date: boolean | function (default: false)
  - If true, a built-in date cast function is used (Date.parse)
- columns: false | true | Array | function (default: false)
  - true -> use header line as-is for object keys; array -> explicit column list; function -> custom column mapper
- group_columns_by_name: boolean (default: false) — requires columns mode
- comment: string | Buffer | null (default: null)
- delimiter: string | Buffer | Array<string|Buffer> (default: comma)
  - Delimiter is normalized to one-or-more buffers; cannot be empty
- escape: string | Buffer | null (default: '"')
- quote: string | Buffer | null (default: '"')
- from: integer >= 1 (default: 1) — first record index to parse
- from_line: integer > 0 (default: 1) — first source line to parse
- to: integer >= 1 or -1 (default: -1) — last record index to parse
- to_line: integer > 0 or -1 (default: -1) — last source line to parse
- info: boolean (default: false) — when true, parser.api.__infoDataSet() is used to produce info data
- max_record_size: integer >= 0 (default: 0 meaning unbounded)
- objname: string | number | Buffer | undefined — used to build object maps when required
- on_record: function(record, context) | undefined — used to post-process each record; must be a function when present
- on_skip: function(err, chunk) | undefined — callback invoked when lines are skipped
- ignore_last_delimiters: boolean | integer (default: false) — integer interpreted as number of trailing delimiters to ignore; requires columns mode when true
- record_delimiter: string | Buffer | Array (empty array default) — normalized to non-empty buffers
- relax_column_count, relax_quotes: booleans (default: false)
- skip_empty_lines, skip_records_with_empty_values, skip_records_with_error: booleans (default: false)
- trim, ltrim, rtrim: booleans (defaults false); trim=true implies ltrim and rtrim true unless explicitly set otherwise
- raw: boolean (default false) — when true yields raw records

Streaming and callback usage patterns (concise)
- Stream / scalable usage (recommended for large files):
  - Create parser: parser = parse(options) or import { parse } from 'csv-parse' and call parse(options)
  - Attach listeners: parser.on('readable', () => { while((r = parser.read()) !== null) process(r); }); parser.on('error', handler); parser.on('end', handler)
  - Feed data: parser.write(chunk); // multiple writes allowed
  - Finish: parser.end()
- Callback / convenience usage (small inputs): parse(dataStringOrBuffer, options, (err, records, info) => { /* records is array or object map */ })
  - parse will schedule writer invocation via setImmediate or setTimeout and return parser instance

Error handling and validation
- Most options are validated and normalized in normalize_options; invalid types throw CsvError or Error with a descriptive message: e.g., invalid delimiter, invalid encoding, invalid option types
- When errors occur during streaming, parser emits 'error' and stops parsing (state.stop === true)

Supplementary implementation notes
- Parser constructor sets readableObjectMode: true and encoding: null so consumers always receive records as objects/arrays (not raw text)
- The parser relies on an internal API object (parser.api) which performs parse(buf, flush, on_record_callback, on_end_callback). parser.api.state and parser.api.options are exposed via parser.state and parser.options for backward compatibility
- Using info=true enables collecting metadata (line number, bytes read, etc.) available via parser.api.__infoDataSet() used in callbacks

Reference details (exact signatures and properties)
- Exports: { parse, Parser, CsvError, normalize_options }
- parse signature: parse([data: string|Buffer], [options: object], [callback: function(error, records, infoDataSet)]) -> Parser
- Parser: class extends stream.Transform with constructor Parser(opts = {})
  - Parser.push(record) on record emission, Parser.read() to retrieve records
  - Parser._transform(buf, _, callback) and _flush(callback) implement core parsing
  - Parser.api.__infoDataSet() -> returns info dataset used by callback form
- normalize_options(options) -> returns normalized options object; performs strong validation and conversion for many option keys as listed above

Detailed digest and retrieval metadata
- Sources fetched on: 2026-03-20T13:46:25.591Z
- Raw files saved to repository for verification:
  - library/_RAW_CSV_PARSE.md (source: https://unpkg.com/csv-parse@latest/README.md) size: 3266 bytes
  - library/_RAW_CSV_NORMALIZE_OPTIONS.js (source: https://unpkg.com/csv-parse@latest/lib/api/normalize_options.js) size: 21562 bytes
- HTML docs fetched: https://csv.js.org/parse/options/ size: 68246 bytes (retrieved 2026-03-20T18:35:06Z)

Attribution and source links
- csv-parse project (README): https://unpkg.com/csv-parse@latest/README.md
- normalize_options implementation: https://unpkg.com/csv-parse@latest/lib/api/normalize_options.js
- Project homepage and docs: https://csv.js.org/parse/
