# Overview
Extend the CLI entrypoint to parse a mathematical expression and a numeric range, generate a time series from that range, and serialize the result in JSON or CSV format. This delivers core functionality for transforming an expression into data.

# CLI Interface and Validation

- Accept arguments via process.argv or main(args).
- Supported flags:
  - --expression (string, required): mathematical expression in terms of x, e.g. y=sin(x) or sin(x).
  - --range (string, required): axis range syntax x=start:end[:step], e.g. x=0:10:0.5. Multiple variables optional in future.
  - --format (string, optional): output data format json or csv; default json.
  - --file (string, optional): output path; default writes to stdout.
  - --help or -h: display usage and exit code 0.

- Use zod to define and parse schema for flags and validate:
  - expression must be nonempty and parseable by mathjs.
  - range must match pattern and produce numeric parameters: start ≤ end, step > 0.
  - format must be one of json, csv.

# Expression and Range Processing

- Use mathjs or expr-eval to compile the expression into a function of x.
- Parse range string into start, end, step values.
- Generate an array of x values from start to end at intervals of step.
- Evaluate the expression function for each x to produce y values.

# Data Serialization

- For format=json: produce an object { x: [ ... ], y: [ ... ] } and serialize with JSON.stringify.
- For format=csv: produce header line "x,y" then each row x,y separated by comma and ending CRLF.
- Write serialized output to file or stdout using fsPromises.

# Error Handling

- On CLI validation failure, print user-friendly message and exit with code 1.
- On expression or range parse errors, report the cause and exit with code 1.

# Testing

- Add unit tests in tests/unit/plotting.test.js:
  - Flag parsing success and failure cases.
  - Range string parsing with valid and invalid inputs.
  - Expression evaluation over sample ranges.
  - JSON and CSV output formats correctness.

# Documentation

- Update README.md CLI Usage section with new --expression, --range, --format flags and examples.
- Update docs/USAGE.md with usage examples, sample output, and error scenarios.
