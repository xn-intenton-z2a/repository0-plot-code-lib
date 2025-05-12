# Overview
Add the ability for users to dump the computed or imported data series directly to a file in CSV or JSON format. This feature complements plotting workflows by letting users reuse, analyze or share the underlying numeric data without manual extraction from images or code.

# CLI Flags
- --export-data <path>   Path to write raw data. Supported extensions indicate format: .csv or .json
- --export-format <csv|json>   Force output format when file extension is ambiguous. Defaults to csv for .csv files and json for .json files. Optional when export-data is provided.

# Implementation
1. Schema and Argument Parsing
   In src/lib/main.js extend cliSchema to include optional fields:
     • exportData: z.string().optional()
     • exportFormat: z.enum(["csv","json"]).optional()
   In parseArgs detect --export-data and --export-format flags and normalize into parsed.exportData and parsed.exportFormat.

2. Data Acquisition
   After generateData or parseDataFile or derivative transformations, before or alongside rendering, assemble the final data series array of {x,y} or named series.

3. Data Conversion Helper
   Implement a helper convertDataToString(dataOrSeries, format) that:
     • For csv: outputs a header and rows. For single series header "x,y" then each line x comma y. For multi-series include "series,x,y" prefix per row.
     • For json: outputs a JSON array. For single series an array of points. For multi-series an object with keys as series labels and arrays of points.

4. CLI Integration
   In main(), after computing data and before writing SVG or PNG, if exportData is set:
     • Determine output format from exportFormat or file extension
     • Call convertDataToString on data or series
     • Write the string to the specified path via fs.writeFileSync
   Proceed with normal image rendering and file output.

# Testing
- Create tests/unit/data-export.test.js
  • Test parseArgs recognizes export-data and export-format flags and errors on missing value
  • In main() when export-data is provided verify fs.writeFileSync writes the correct CSV or JSON string and that plotting output still writes image
  • Test convertDataToString helper for single and multi-series data in both formats

# Documentation
- Update USAGE.md and README.md:
  • Document new --export-data and --export-format flags with examples:
      repository0-plot-code-lib --expression y=x --range x=0:5 --export-data data.csv
      repository0-plot-code-lib --expression y=x --range x=0:5 --export-data data.out --export-format json
  • Show sample CSV and JSON snippets of exported data