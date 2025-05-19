# Overview

Extend the CLI entry point to fully implement expression parsing, numeric range handling, time series generation, and persistence in JSON, JSON Lines, and CSV formats using robust argument validation.

# CLI Arguments

- Define a Zod schema for the following flags:
  - `--expression <string>`: required; a mathematical expression in terms of x (e.g., `sin(x)`).
  - `--range <start:end:step>`: required; x start, end, and step values separated by colons.
  - `--output-format <json|jsonl|csv>`: optional; defaults to `json`.
  - `--output-file <path>`: optional; when provided, persist output to file.
- Parse and validate `process.argv` against the schema, producing structured config or exiting with code 1 and an error message.
- On validation failure, print a descriptive message to stderr.

# Time Series Generation

- Parse the `range` token into numeric `start`, `end`, and `step` components.
- Configure mathjs per MATHJS_CONFIG guidelines (e.g., BigNumber for high precision).
- Compile the expression string and evaluate for each x in the defined range.
- Collect an array of `{ x, y }` objects in memory.

# Persistence

- When `--output-file` is provided:
  - For `json`: write the full array as a JSON string.
  - For `jsonl`: write one JSON object per line, UTF-8, LF line endings.
  - For `csv`: write a header row `x,y`, then comma-separated values, escaping if necessary.
- When no `--output-file` is provided, print JSON output to stdout.

# Error Handling

- Detect invalid numeric ranges (e.g., zero step, start > end) and exit with code 1.
- Catch evaluation errors from mathjs and report the invalid expression.

# Testing

- Unit tests for:
  - Zod schema validation (valid and invalid flag combinations).
  - Range parsing logic for edge cases.
  - Mathjs-based evaluation correctness.
  - Persistence utilities for JSON, JSONL, CSV outputs.
- CLI integration tests using Vitest and `execa`:
  - Spawn the CLI with various flag sets and assert exit codes.
  - Verify file creation and exact contents for JSON, JSONL, and CSV modes.

# Documentation

- Update README.md Quickstart section with example commands for writing time series to JSON, JSONL, and CSV files.
- Update USAGE.md with a new section on CSV persistence, sample outputs, and notes on external tool interoperability.