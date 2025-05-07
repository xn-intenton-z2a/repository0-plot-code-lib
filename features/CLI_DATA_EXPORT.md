# Overview

Enhance the CLI tool to support multiple data output formats for time series generation, enabling users to choose between JSON array, NDJSON, or CSV. This provides flexibility for integration with downstream pipelines and tools without adding new files.

# CLI Interface

--data-format    Specify the data output format when no plot rendering flags are provided.  Supported values: json, ndjson, csv.  Defaults to json.

# Behavior

1. Extend parseArgs to accept --data-format and normalize to lowercase, defaulting to json.
2. After computing the data array and before checking plot rendering flags:
   • If format and output flags are absent (data-only mode):
     ○ If data-format=json: print the full data array as pretty-printed JSON as before.
     ○ If data-format=ndjson: for each point in the data array, print a single JSON object per line to stdout.
     ○ If data-format=csv: print a header line `x,y`, then for each point print `x,y` values as comma-separated numbers on its own line.
     ○ Return the data array unchanged.
3. Ensure existing behavior for plot rendering remains unchanged when --format or --output are present.

# Tests

• Create tests/unit/data-export-json.test.js:
  - Invoke main with --expression, --range, and --data-format json (explicit) and capture stdout to verify JSON array output.
• Create tests/unit/data-export-ndjson.test.js:
  - Invoke main with --expression, --range, --data-format ndjson and verify stdout lines equal JSON representations of each point.
• Create tests/unit/data-export-csv.test.js:
  - Invoke main with --expression, --range, --data-format csv and verify first line is `x,y` and subsequent lines parse as numbers matching generated series.

# Documentation Updates

- In USAGE.md, update the "Generating Time Series Data" section to describe --data-format and examples for each supported format.
- In README.md under Examples, add invocations for CSV and NDJSON output and brief sample outputs.
