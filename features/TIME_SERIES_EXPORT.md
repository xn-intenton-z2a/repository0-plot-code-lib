# Overview

Extend the time series generation command to support both JSON and CSV output formats, providing users with flexible export options for downstream processing and integration with data tools.

# Behavior

Users invoke the CLI with:
- `--expression, -e`  A single mathematical formula in the form y=<formula> (e.g. y=sin(x)).
- `--range, -r`       A numeric range string in the form x=<start>:<end>:<step> (e.g. x=0:2:0.5).
- `--format, -f`      Choose output format: json (default) or csv.
- `--output, -o`      Optional file path to write the output; if omitted, prints to stdout.

Behavior details:
- When format=json, the output is a JSON array of objects: [ { x: number, y: number }, ... ].
- When format=csv, output begins with header x,y and each subsequent line contains comma-separated x and y values.
- Errors in expression parsing or invalid ranges terminate with exit code 1 and descriptive error on stderr.

# Implementation

- Add `format` option to the existing yargs configuration.
- After generating the series array:
  - For JSON, serialize with JSON.stringify(series, null, 2).
  - For CSV, build a string: header "x,y" plus lines "<x>,<y>" for each point.
- Write to the specified file or stdout using fs.writeFileSync or console.log.
- Add and update unit tests to cover both formats and file-writing behavior.
