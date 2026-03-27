CSV_PARSE

Table of contents
1. Overview
2. parse() signature and return types
3. Key options and their effects
4. Usage patterns for time series (time,value)
5. Error handling and robustness
6. Supplementary details
7. Reference details
8. Detailed digest
9. Attribution

Normalised extract
Overview
- csv-parse is a robust CSV parsing library for Node.js providing both callback and streaming APIs.

parse() signature
- parse(input, [options], [callback]) -> returns array of records (if callback omitted and input is a string) or stream/transform depending on API variant.
- Input: a string or Buffer containing CSV content, or a stream when using streaming API.
- Return: Array<Record> or stream transform; when columns option is true, output is array of objects keyed by header names.

Key options (names and effects)
- columns: boolean | Function | Array
  - true: use first line as header and return objects
  - false (default): return arrays of values
  - function: called for each header to transform column names
- delimiter: string (default ',')
- from_line: number (start parsing at this line, 1-based)
- skip_empty_lines: boolean (skip blank lines)
- relax_column_count: boolean (allow variable number of columns)
- trim: boolean (remove surrounding whitespace from fields)

Usage patterns for time series (time,value)
- Typical use: parse(fileContents, { columns: ['time','value'], skip_empty_lines: true, trim: true }) to get array of {time, value} objects.
- Convert parsed time strings to Date or numeric timestamps as required: Number(new Date(record.time)) or Date.parse(record.time).

Error handling and robustness
- Watch for inconsistent column counts and use relax_column_count or pre-validate the header.
- Handle empty lines and BOMs explicitly (skip_empty_lines, trim, and strip BOM if necessary).

Supplementary details
- For large files, use the streaming API: createReadStream(file).pipe(parse(options)).on('data', handler).

Reference details
- Source API: csv-parse parse() function and streaming transform design. Exact option names documented on the project site.

Detailed digest
- Source: csv-parse documentation
- URL: https://csv.js.org/parse/
- Retrieved: 2026-03-27
- Data size obtained during crawl: approximately 59 KB

Attribution
- Source: CSV project documentation (csv.js.org). Use documented options above to map CSV to mission format.