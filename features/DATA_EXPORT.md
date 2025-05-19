# Overview
Enable users to export sampled time-series data points generated from expression plots into structured data files. This feature extends both the CLI and API to output raw series in JSON or CSV format alongside or instead of image plots.

# CLI Usage
Provide new flags to specify export format and file paths:

node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --export-format csv --export-output data.csv

Supported flags:
--export-format  Choose output type: json or csv. Defaults to json when used.
--export-output  Filename for the exported data. If omitted, writes to stdout.

Users can combine plotting and data export by passing both --format and --export-format with respective outputs.

# API Usage
Extend plotExpression options and exportData function:

import { plotExpression, exportSeries } from '@xn-intenton-z2a/repository0-plot-code-lib';

plotExpression({ expression: 'y=sin(x)', range: { x: [0,6.28] }, format: 'png', output: 'plot.png' });
exportSeries({ expression: 'y=sin(x)', range: { x: [0,6.28] }, format: 'csv', output: 'data.csv' })

Both functions return a Promise that resolves when file writing completes or rejects on errors.

# Specification
- Default sampling interval remains 100 points unless overridden via new --sample-interval flag.
- exportSeries reads the same parsing logic as plotExpression to produce an array of data points.
- JSON output: array of objects { x: number, y: number }.
- CSV output: header row x,y followed by rows of numeric values.
- When --export-output is not provided, write data to stdout.
- Descriptive errors for invalid export format or file write failures.

# Testing
- Unit tests cover JSON and CSV export of simple expressions.
- CLI tests verify correct flags produce expected file content or stdout.
- Error conditions tested: unsupported export-format, missing required flags, write permission errors.