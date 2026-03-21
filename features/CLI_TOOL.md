# CLI_TOOL

Purpose
Provide a simple command line interface to generate plots from mathematical expressions or CSV time series and save them to disk.

Scope
- Support flags:
  - --expression followed by an expression that uses x
  - --range followed by start:step:end
  - --csv followed by a CSV file path containing time,value
  - --file followed by an output path; extension determines output format (.svg or .png)
  - --help prints usage, concise examples, and a short description of output formats
- Validate argument combinations: --expression requires --range; --csv and --expression are mutually exclusive

Implementation Notes
- Implement a small argument parser using process.argv to avoid extra dependencies
- The CLI entry point is src/lib/main.js and must export named functions for unit testing the CLI behavior
- Help text must include short examples (expression+range example, csv example) and mention the required Node version (>=24)
- README.md must include a CLI usage section with example commands and short descriptions of produced files (SVG/PNG)

Acceptance Criteria
- Running node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg produces a non-empty file at output.svg and, if .svg was requested, the file contains a viewBox attribute and a polyline element
- The CLI prints usage information when invoked with --help and the output includes the word "Usage" and at least one example command for expression/range and one for CSV usage
- README.md contains a "CLI" or "Usage" section with at least two example commands (one expression+range example and one CSV example) and brief descriptions of the output formats
- src/lib/main.js exports the following named functions for programmatic tests and library use: parseExpression, evaluateRange, parseCsvToSeries, renderSvg, renderPng, savePlot, and runCli
- Unit tests can import runCli and other named exports to exercise argument parsing and capture stdout/stderr for assertions
