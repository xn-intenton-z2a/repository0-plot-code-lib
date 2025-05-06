# Overview

Support streaming output in newline delimited JSON format via the CLI format flag. Stream each record on its own line for memory efficiency and compatibility with standard data processing tools.

# Source File Updates

In src/lib/main.js

1 Add a new CLI option format with choices json and ndjson, default json
2 After generating the data array, check the format value
  • If format is ndjson, determine write target as stdout or file
  • Create a write stream using fs.createWriteStream for file targets or use process.stdout for stdout
  • Loop over each record in the data array and write JSON.stringify of the record followed by a newline to the stream
  • Ensure the file stream is closed after writing all records
3 If format is json, retain existing behavior of stringifying the full array and writing to file or stdout

# Tests

In tests/unit

• Add a test for ndjson output to stdout by stubbing console.log or write stream and verifying each record line is emitted with a trailing newline
• Add a test for ndjson output to file by stubbing fs.createWriteStream and verifying write calls include each record plus newline
• Validate exit code zero and an error message when an unsupported format value is provided

# Documentation

Update README.md and USAGE.md

• Document the new format option with values json and ndjson
• Provide CLI examples showing streaming ndjson to stdout and writing ndjson to a file
• Highlight memory efficiency gains when using ndjson for large data sets