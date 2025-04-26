# Overview

Implement robust command line argument parsing and environment variable configuration. Use dotenv to load environment variables and zod to define and validate both environment variables and CLI flags. Ensure clear error messages and nonzero exit codes on invalid input.

# Environment Configuration

On startup main loads .env via dotenv.config. Define a zod schema for the following variables with sensible defaults and constraints:
- PLOT_WIDTH number greater than zero default 800
- PLOT_HEIGHT number greater than zero default 600
- PLOT_COLOR string default black
- PLOT_BACKGROUND string default white
Merge parsed environment settings with CLI flag values, allowing flags to override.

# CLI Interface and Validation

Define a zod schema for supported CLI flags and their types:
- --expression string required unless --input-file is provided
- --range string required unless --input-file is provided, syntax x=min:max[:step]
- --input-file string optional
- --input-format enum csv or json default csv
- --export-data-format enum csv or json optional
- --export-file string default stdout
- --format enum svg or png default svg
- --output-file string default stdout
- --serve number optional

Validate that at least one of expression or input file is present. Validate range syntax numeric bounds and positive step. Produce descriptive error messages and exit code 1 on validation failure.

# Implementation Details

In src/lib/main.js replace the console.log stub with zod based parsing logic. Process argv or provided args array. Load and validate environment, then parse flags into an options object. Return or output the merged configuration for subsequent features.

# Testing

Add tests in tests/unit/cli.parsing.test.js to cover:
- Successful parsing of valid flags and environment combinations
- Error when both expression and input-file are missing
- Error on invalid range syntax
- Override of environment defaults by CLI flags

# Documentation

Update README.md CLI Usage section to list the new flags and environment variables. Update docs/USAGE.md to reflect new flag descriptions and usage examples, including environment variable defaults and override behavior.