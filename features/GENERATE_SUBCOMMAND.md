# Generate Subcommand

Introduce a dedicated generate subcommand that isolates time series data generation under a clear command. This refines the CLI interface by separating data generation from plotting, improving discoverability and maintainability.

# Usage

When invoked as:

    repository0-plot-code-lib generate --expression y=<expr> --range x=<start>:<end>:<step> [--format json|csv] [--output <file>]

# Behavior

- Required Flags:
  • --expression, -e (string): Formula in the form y=<expression> or <expression>.
  • --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional Flags:
  • --format, -f (string): Output format, json (default) or csv.
  • --output, -o (string): File path to write output; when omitted, prints to stdout.
  • --help, -h: Display help for generate subcommand and exit 0.
  • --version, -v: Display global version and exit 0.

On execution:
1. Strip optional y= prefix and compile the expression via mathjs.compile(). Invalid expressions cause exit code 1 with "Error: Invalid expression".
2. Parse and validate the range string. It must match x=<start>:<end>:<step>, enforce start ≤ end and step > 0. Invalid ranges cause exit code 1 with "Error: Invalid range".
3. Generate an inclusive series of { x, y } points by stepping from start to end.
4. Serialize output based on format:
   - JSON: JSON.stringify(series, null, 2)
   - CSV: header line "x,y" followed by comma-separated rows of each point.
5. Write to the specified file via fs.writeFileSync, or print to stdout if no output file.
6. Exit with code 0 on success.

# Implementation

Use yargs.command('generate', …) in src/lib/main.js to define the subcommand. Move existing series generation logic into the generate handler. Maintain a programmatic export main(options) for tests and API use.