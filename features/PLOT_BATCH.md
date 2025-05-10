# Purpose

Add a batch processing mode that enables users to generate multiple plots from a single input file in JSON or CSV format.

# Behavior

When users invoke repository0-plot-code-lib batch --input <file> [--output-dir <dir>], the CLI:
- Reads the specified input file.  Supports JSON arrays of objects and CSV files with headers formula, range, format, width, height, points, time-format.
- Processes each record independently, applying default CLI options for any missing fields.
- Generates a plot for each record using the existing plot logic.
- If --output-dir is provided, writes each plot to a separate file named index.format (for example, 1.svg).  Otherwise prints each plot to stdout, separated by a header indicating record index.
- Reports errors for malformed records to stderr without stopping the processing of remaining entries.

# Implementation

- In src/lib/main.js detect when args[0] is batch and parse flags --input (required) and --output-dir (optional) using zod.
- Use fs to read the input file; branch on extension: parse JSON for .json or CSV for .csv/.tsv using a simple parser based on CSV_FORMAT.md guidelines.
- For each parsed record, merge values with CLI defaults, then invoke the plot-generation function to compute output in the requested format.
- When --output-dir is set, use fs.writeFileSync to write each result to a file in the directory, creating the directory if necessary.
- On parsing or processing errors for a record, log a descriptive error with record index and continue.

# Testing

- In tests/unit/main.test.js mock fs.readFileSync and fs.writeFileSync:
  - Provide a JSON array input and verify that main routes through batch logic and writes correct files or outputs correct stdout segments.
  - Provide a CSV string input and verify parsing and output behavior.
  - Simulate a malformed record and confirm that an error is logged and processing continues for other records.
  - Test missing --input flag results in a usage error and non-zero exit code.

# Documentation

- Update README.md under "CLI Usage" to introduce the batch command, describe flags, input formats, and examples of invocation.
- Update USAGE.md to document the batch command, --input and --output-dir options, sample input file structures, and expected outputs.
- Add an entry under Unreleased in CHANGELOG.md: "Added batch plotting mode to process multiple plot commands from JSON or CSV input files."
