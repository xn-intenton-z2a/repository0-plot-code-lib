# Overview
Implement robust CLI argument parsing for the main entrypoint using zod. Provide clear validation, default values, and help output so users can immediately invoke the tool with correct flags. This lays the foundation for expression parsing and plotting in subsequent iterations.

# CLI Interface and Validation
- Accept arguments from process.argv.slice(2) or via explicit main(args) invocation.
- Supported flags:
  - --expression (string, required): mathematical expression, e.g., y=sin(x).
  - --range (string, required): value range syntax x=min:max[:step].
  - --file (string, optional): output path for plot or data; defaults to stdout.
  - --help or -h: display usage information and exit.
- Use zod to define a schema for the flags. Parse and coerce values:
  - Validate expression is nonempty.
  - Validate range matches pattern and numeric constraints: start ≤ end, step > 0.
  - Provide default for file as undefined (stdout).
- On schema error, print user-friendly messages and exit with nonzero code.
- On --help flag, print usage text including flag descriptions and exit with code 0.

# Tests
- Add tests in tests/unit/cli-args.test.js:
  - Parsing succeeds for valid flags and returns parsed object.
  - Schema errors for missing required flags or invalid range syntax.
  - --help prints usage and does not throw.

# Documentation
- Update README.md under CLI Usage to list the new flags and show examples of correct invocation and error scenarios.
- Update docs/USAGE.md to include flag descriptions, usage examples, and sample output of error and help commands.
