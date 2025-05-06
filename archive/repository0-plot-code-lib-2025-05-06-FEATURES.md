features/CLI_ARGUMENT_PARSING.md
# features/CLI_ARGUMENT_PARSING.md
# CLI Argument Parsing and Time Series Generation

# Overview
Combine structured CLI argument parsing with core time series generation into a single end-to-end command. Users will supply an expression, a range, optional output file, and output format. The tool will validate inputs, compute a series of (x, y) points, and emit results in JSON or NDJSON to console or file.

# Implementation

1. Add dependencies:
   • zod for CLI validation
   • expr-eval for parsing and evaluating mathematical expressions
   • fs for file output

2. Update src/lib/main.js:
   • Import zod, Parser from expr-eval, and fs/promises
   • Define a CLI schema with z.object:
     – expression: nonempty string
     – range: string matching x=min:max
     – file: optional string
     – format: literal 'json' or 'ndjson', default 'json'
   • Parse process.argv.slice(2) with schema.safeParse; on error print friendly message and exit with code 1
   • Parse the range string by splitting on '=' and ':' to build { x: { min, max } }
   • Use Parser to parse the expression once into ast
   • Sample N=100 points between x.min and x.max; compute y = ast.evaluate({ x })
   • Collect data: Array<{ x: number; y: number }>
   • Serialize output:
     – json: JSON.stringify(array)
     – ndjson: join lines JSON.stringify(point)
   • If file is provided, write serialized output to file, otherwise console.log

# Testing and Documentation

- Add tests in tests/unit/cli-ts.test.js:
  • Valid cases: linear expression, default JSON to console; ndjson format; writing to a temporary file
  • Invalid cases: missing expression, bad range format, unsupported format value
- Update USAGE.md and README.md:
  • Document flags: --expression, --range, --format, --file
  • Provide usage examples for JSON and NDJSON outputs and file redirection