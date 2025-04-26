# Overview
Add CLI functionality to parse mathematical expressions and numeric ranges, generate time series data, and serialize the results in JSON or CSV formats. This implements the core mission of transforming formulae into structured data and replaces the current argument logging stub.

# CLI Interface and Validation
Use zod to define and parse command flags:
- --expression (string, required): mathematical expression in variable x, for example sin(x) + x^2.
- --range (string, required): axis range syntax x=start:end[:step], for example x=0:10:0.5. Ensure start ≤ end and step > 0.
- --format (string, optional): output format, either json or csv; default is json.
- --file (string, optional): output file path; default writes to stdout.
- --help or -h: display usage information and exit code 0.

# Expression Evaluation and Data Generation
- Add expr-eval as a dependency and import the Parser from expr-eval.
- Compile the provided expression string into an evaluable function of x.
- Parse the range string into numeric start, end, and step values.
- Generate an array of x values from start to end inclusive at the specified step.
- Evaluate the compiled expression for each x to produce corresponding y values.

# Data Serialization and Output
- For format=json: produce an object { x: [...], y: [...] } and serialize with JSON.stringify.
- For format=csv: produce a header line x,y followed by CRLF-delimited rows, quoting fields when necessary according to CSV format conventions.
- Use fsPromises to write to the specified file path or to stdout when no file is provided.

# Error Handling
- Use zod.safeParse for flag validation; on failure print validation errors to stderr and exit with code 1.
- Catch expression parse or evaluation errors, print an informative error message to stderr, and exit with code 1.

# Testing
- Add unit tests in tests/unit/plotting.test.js to cover:
  - Successful and failing flag parsing scenarios.
  - Range parsing with valid and invalid inputs.
  - Expression evaluation over sample ranges, including boundary conditions.
  - Correctness of JSON and CSV output formats.

# Documentation
- Update README.md under CLI Usage and Quick Start with examples for --expression, --range, --format, and --file flags.
- Update docs/USAGE.md with detailed usage examples, sample outputs, and error scenarios.