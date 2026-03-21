# CLI_TOOL

Purpose
Provide a simple command line interface to generate plots from mathematical expressions or CSV time series and save them to disk.

Scope
- Support flags:
  - --expression followed by an expression that uses x
  - --range followed by start:step:end
  - --csv followed by a CSV file path containing time,value
  - --file followed by an output path; extension determines output format
  - --help prints usage and concise examples
- Validate argument combinations: expression requires range; csv and expression are mutually exclusive

Implementation Notes
- Implement a small argument parser to avoid extra dependencies; process argv directly
- The CLI entry point is src/lib/main.js and should export named functions for unit testing the CLI behavior
- Help text must include short examples and mention required Node version

Acceptance Criteria
- Running node src/lib/main.js with flags --expression y=Math.sin(x) --range -3.14:0.01:3.14 --file output.svg produces a file
- The CLI prints usage information when invoked with --help
- Unit tests invoke the module entry and capture stdout and stderr for automated verification
