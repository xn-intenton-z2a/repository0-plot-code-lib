# CLI_AND_README

Summary
Provide a command line interface for generating plots from an expression or CSV and saving to SVG or PNG, and update README with concise usage examples and the PNG approach decision.

Specification
- The entry point is src/lib/main.js and must be runnable from node. The module also exports its public API as named exports for programmatic use.
- CLI flags: --expression accepts an expression string; --range accepts start:step:end; --csv accepts a CSV file path; --file accepts an output filename whose extension infers output format; --help prints usage and examples and exits successfully.
- When invoked with expression and range the CLI evaluates the expression, renders SVG or PNG based on the output filename, and writes the file to disk. When invoked with CSV the CLI loads the CSV and renders similarly.
- README must include at least one example for expression-based plotting and one for CSV-based plotting, and document which library is used for PNG rendering and why.

Acceptance Criteria
- Running the program with the help flag prints a usage summary that includes short examples and exits with a success status.
- Running the program with --expression and --range and a file path writes the output file and the file contents match the expected format (SVG contains an svg root and polyline, PNG begins with PNG signature).
- README contains clear example commands for both expression and CSV workflows and documents the PNG rendering approach.

Testing notes
- CLI tests should spawn the script with arguments and assert files are created and contain expected substrings or signatures.