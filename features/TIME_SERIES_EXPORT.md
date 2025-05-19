# Overview

Add ability to export computed time series data to a file in CSV or JSON format.

# CLI Arguments

--export-data-file <string>
  Path to write the data file.

--data-format <string>
  Data format: csv or json. Defaults to json

# Behavior

1. Parse and validate new CLI flags
2. After generating time series data invoke export logic
3. Serialize data to JSON or CSV based on data-format
4. Write serialized data to export-data-file

# Implementation Details

Update src/lib/main.js:
- Extend argument parsing to include export-data-file and data-format flags
- After sampling expression evaluate, collect an array of {x, y} objects
- Use JSON.stringify for JSON export
- Build CSV by mapping header row and data rows joined by newline
- Write file via fs.writeFileSync

Update package.json if adding any CSV utility dependency (otherwise none)

Add or update tests in tests/unit/plot-generation.test.js:
- Test JSON export produces valid JSON file
- Test CSV export produces correct comma-separated values with headers

# Documentation

Update README.md:
- Document new CLI flags with examples

Update USAGE.md:
- Show sample commands for exporting data in CSV and JSON formats
