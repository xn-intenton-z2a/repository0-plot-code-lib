# Overview

Implement robust parsing and validation for command-line inputs enabling users to specify mathematical expressions, value ranges, output formats, and output destinations. This feature lays the foundation for core functionality by interpreting user intent and converting it into structured options for downstream processing.

# CLI Flags

- --expression <expr>    Defines the mathematical expression, such as y=sin(x)
- --range <spec>         Specifies axis ranges in the form x=min:max or a comma-separated list for multiple axes
- --points <number>      (Optional) Number of data points to generate per axis. Defaults to 1000.
- --format <type>        (Optional) Output data format. Allowed values: json, csv. Defaults to json.
- --output <path>        (Optional) File path to write the structured output. Defaults to stdout.

# Validation

Use Zod schemas to enforce:
- expression is a non-empty string following basic formula syntax
- range strings match axis=min:max patterns and cover at least one axis
- points is an integer greater than zero
- format is one of the allowed values
- output, if provided, is a valid writable file path

# Behavior

- On invocation, parse process.argv with a minimal library or custom parser
- Validate parsed values against Zod schemas
- On validation failure, display a clear error with usage hints and exit with code 1
- On success, pass the structured options object to downstream modules for series generation

# Tests

- Add unit tests for parsing valid combinations of flags
- Add tests asserting correct error messages and exit code for missing or invalid inputs
- Cover edge cases: missing required flags, malformed ranges, unsupported formats

# Documentation

- Update README.md and USAGE.md to include examples of all CLI flags
- Provide sample commands and expected output snippets
