Plan: Update SOURCES.md and add targeted library documents for CSV parsing and numeric range parsing

Problem
- SOURCES.md covers many relevant links but lacks focused references for CSV parsing libraries and explicit range-format guidance used by the CLI (start:step:end).
- Library should contain concise, actionable extracts for CSV parsing and range parsing to close open issue #8 and to support CSV_LOADER and SERIES_GENERATION features.

Approach
1. Add high-quality references to SOURCES.md for csv-parse and PapaParse and node fs.promises.
2. Fetch the new references and extract critical technical material into library/CSV_PARSE_JS.md and library/PAPAPARSE.md.
3. Keep existing library entries unchanged unless a source is removed.
4. Track progress via session todos.

Todos
- update-sources: Update SOURCES.md to include csv.js parse, PapaParse, and fs.promises links.
- create-csv-parse-doc: Fetch https://csv.js.org/parse/ and extract technical API and usage notes into library/CSV_PARSE_JS.md.
- create-papaparse-doc: Fetch https://www.papaparse.com/docs and extract key parsing options and streaming usage into library/PAPAPARSE.md.

Notes
- Keep extracts focused on concrete API signatures, configuration options, and examples of parsing streams and handling RFC4180 fields.
- Avoid code samples that require escaping; present plain technical facts and signatures.
