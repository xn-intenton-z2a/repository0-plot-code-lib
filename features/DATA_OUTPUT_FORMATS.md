# Overview

Extend the CLI and programmatic API to support three output formats for time series data: JSON (default), newline-delimited JSON (NDJSON), and comma-separated values (CSV). This feature consolidates existing JSON and NDJSON functionality and adds CSV support for easier integration with spreadsheet and data analysis tools.

# Source File Updates

In src/lib/main.js
1 Update the format option in yargs to include csv in addition to json and ndjson.
2 After data generation, branch on argv.format:
   • If format is json, stringify the full data array with indentation and write to stdout or file as before.
   • If format is ndjson, loop over each data point and write JSON.stringify(point) plus newline to stdout or a write stream.
   • If format is csv, build a header line "x,y" followed by newline. Then for each point write `${point.x},${point.y}` plus newline to stdout or file stream.
3 Ensure streams are properly closed after writing when an output file is provided.
4 Throw an error if an unsupported format value is supplied.

# Tests

In tests/unit
• Add a test for CSV output to stdout by stubbing process.stdout.write and verifying the header line and each data line are output with trailing newlines.
• Add a test for CSV output to file by stubbing fs.createWriteStream and verifying write calls include header and row lines and that end is called.
• Update existing JSON and NDJSON tests to ensure they still pass under the new branching logic.
• Validate that supplying an unsupported format yields exit code 1 and appropriate error message.

# Documentation

Update README.md and USAGE.md
• Document the new csv format option alongside json and ndjson.
• Provide CLI examples for writing CSV to stdout and to file.
• Highlight interoperability with spreadsheet tools and data analysis workflows.