# CLI_TOOL

Summary

Define the command-line interface that drives the library features. The CLI must accept expression and CSV inputs, support range syntax, and write output files in SVG or PNG inferred from the file extension.

Scope

- Provide a callable CLI entry point at src/lib/main.js and expose a programmatic runCli named export for unit testing.
- Supported flags: --expression, --range, --csv, --file, --help. Range format is start:step:end.
- The CLI should validate arguments and print usage information when invoked with --help or invalid args.

Acceptance criteria

- node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg creates output.svg and exits with code 0 when run interactively.
- node src/lib/main.js --help prints concise usage examples covering expression and CSV modes.
- The CLI uses named exports so runCli can be called from unit tests with a synthetic argv array.

Implementation notes

- Keep argument parsing minimal and dependency-free; use process.argv parsing or a tiny argument helper.
- For file writing, infer output format from the filename extension and use renderSVG or renderPNG accordingly.

Tests

- Unit test that runCli invoked with help flag returns the usage string.
- Unit test that runCli with expression and range yields a saved file path or returns the SVG string when asked to write to stdout.

# END
