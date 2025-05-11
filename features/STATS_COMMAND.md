# Overview
Implement a new stats subcommand to compute common summary statistics (min, max, mean, median, standard deviation) over numeric datasets.  This complements time series generation by providing quick insights into the distribution of data produced or provided to the library.

# Function API
Add a function computeStats(data, options) to src/lib/main.js
- data: an array of numbers or an array of objects with numeric x and y properties
- options: object with field property indicating which numeric field to summarize ("y" by default)
- returns an object with keys min, max, mean, median, stddev, each a number

# CLI Interface
Extend the CLI entrypoint in src/lib/main.js with a "stats" subcommand
- repository0-plot-code-lib stats --expression <expression> --range <range> [--field <x|y>]
- repository0-plot-code-lib stats --data <path-to-json-file> [--field <x|y>]
- When invoked, parse inputs, generate or load data, run computeStats, and print JSON summary to stdout
- Support a help flag for the stats subcommand detailing usage and flags

# Input Validation
Use Zod to validate inputs
- expression must be non-empty string when provided
- range must match existing x=start:end[:step] pattern when provided
- data path must point to a readable JSON file containing an array
- field must be either "x" or "y"
- Provide clear error messages and exit with code 1 on invalid input

# Implementation Details
- Import existing generateTimeSeries for expression and range input
- For file input, read and parse JSON using fs and validate loaded array
- Extract numeric values for the specified field into a number array
- Use mathjs functions min, max, mean, median, std from the already imported math environment
- Return or log an object { min: number, max: number, mean: number, median: number, stddev: number }

# Testing
Create tests/unit/stats.test.js
- Unit tests for computeStats with pure numeric arrays, object arrays for x and y, and invalid input cases
- CLI tests invoking the stats subcommand with expression/range flags and with a temporary JSON file, verifying exit code and JSON output shape
- Cover error cases: missing flags, invalid JSON file, invalid field

# Documentation
Update README.md and USAGE.md
- Add a section for stats subcommand with usage examples
- Show API example calling computeStats programmatically
- Document shape of returned summary object and common error messages

# Dependencies
- No new dependencies; reuse mathjs for statistics, zod for validation, and fs from Node.js