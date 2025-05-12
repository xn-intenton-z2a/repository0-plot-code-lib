# Overview
Add support for exporting the generated or imported time series data directly to a file in JSON, CSV, or YAML format. This feature enables users to reuse or analyze numeric data outside of plots without manual extraction.

# CLI Flags
- --export-data <path>  Path to write raw data series. The file extension determines format: .csv, .json, .yaml, or .yml.
- --export-format <csv|json|yaml>  Optional override when extension is absent or ambiguous. Defaults to csv for .csv, json for .json, and yaml for .yaml or .yml files.

# Implementation
1. Schema and Argument Parsing
   Extend cliSchema in src/lib/main.js to include:
     • exportData: optional string
     • exportFormat: optional enum of csv, json, yaml
   In parseArgs detect --export-data and --export-format, normalize values into parsed.exportData and parsed.exportFormat.

2. Data Acquisition
   After generating or loading data series (from generateData, generateDerivativeData, or parseDataFile), assemble a unified data structure representing one or multiple series.

3. Data Conversion Helper
   Implement a helper function convertDataToString(dataOrSeries, format) that:
     • For csv: output header x,y for single series, and for multi-series include series,x,y columns.
     • For json: output a JSON array of point objects for single series, or an object mapping series labels to arrays of points for multi-series.
     • For yaml: use js-yaml to dump the same structures as JSON.

4. CLI Integration
   In main() after data conversion steps, if exportData is set:
     • Determine format from exportFormat or file extension.
     • Call convertDataToString with the data or series.
     • Write the resulting string to the specified path using fs.writeFileSync.
   Proceed with normal SVG or PNG rendering and file output without interruption.

# Testing
- Create tests/unit/data-export.test.js to cover:
  • parseArgs capturing --export-data and --export-format flags and error on missing values.
  • convertDataToString producing correct CSV, JSON, and YAML outputs for single and multi-series inputs.
  • CLI mode: running main with --export-data writes the correct file and also writes image output.
  • Error cases: unsupported extension or format mismatch produce descriptive errors.

# Documentation
- Update USAGE.md and README.md:
  • Document --export-data and --export-format flags with examples:
      repository0-plot-code-lib --expression y=x --range x=0:5 --export-data data.csv
      repository0-plot-code-lib --expression y=sin(x) --range x=0:6.28 --export-data out.yaml
      repository0-plot-code-lib --expression y=x --range x=0:5 --export-data out.dat --export-format json
  • Show sample CSV, JSON, and YAML snippets of exported data.