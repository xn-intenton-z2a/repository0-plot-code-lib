# CLI_TOOL

Summary
Provide a command-line interface entry point at src/lib/main.js supporting expression, range, csv, file and help flags.

Specification
- When invoked directly with Node, parse command-line flags and dispatch to library functions.
- Supported flags: --expression, --range, --csv, --file and --help.
- Behavior examples: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg and node src/lib/main.js --csv data.csv --file output.png.
- --help prints usage examples and exits with status code 0.
- The CLI must infer output format from file extension (.svg or .png) and call renderSvg or exportPng accordingly.

Files to change
- Implement CLI parsing and behavior in src/lib/main.js.
- Add unit tests tests/unit/cli.test.js that assert help output and file generation behavior.
- Update README.md to include CLI examples.

Acceptance Criteria
- The CLI --help prints usage text and exits with status 0.
- A CLI invocation with expression and range produces the requested output file on disk.
- The CLI chooses the correct exporter based on file extension.
