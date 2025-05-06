# Overview

Extend the CLI and programmatic API to support three output formats for time series data (JSON, NDJSON, CSV) and enhance the CLI default behavior so that when no arguments are provided the tool prints the help text along with usage examples.

# Source File Updates

In src/lib/main.js
1. At the top of the main(args) function, replace the existing empty-args check with:
   • Instantiate yargs with the full set of options including help and usage examples.
   • If args is empty or contains no recognized flags, invoke .showHelp() on the yargs instance to write the help text to stdout.
   • Read a small usage example block from USAGE.md and print it after the help text.
   • Return exit code 0 immediately after printing.
2. In the yargs configuration:
   • Add .help() so that --help flag is supported and prints the same help text.
   • Update the format option to include csv in addition to json and ndjson.
3. After generating the data points, branch on argv.format:
   • json: stringify full data array with indentation and output via console.log or fs.writeFileSync as before.
   • ndjson: loop over each data point and write JSON.stringify(point)+"\n" to stdout or a write stream, then close stream.
   • csv: build a CSV header line from the first point’s keys, write header+"\n", then write each row as comma-separated values to stdout or write stream, then close.
4. Ensure error handling remains: unsupported format yields exit code 1 and error message.

# Tests

In tests/unit:
• Add a test for the no-arguments case: mock console.log or process.stdout.write, call main([]) or process.argv with only node and script, and verify that help text and at least one usage example line from USAGE.md is printed, then exit code is 0.
• Add tests for CSV output to stdout and to file:
  – Stub process.stdout.write and fs.createWriteStream, run main() with --format csv and --output, verify header line and data rows written and stream end called.
• Update existing JSON and NDJSON tests to ensure they continue to pass under the new branching logic.
• Validate that supplying an unsupported format still yields exit code 1 and the appropriate error message.

# Documentation

Update README.md and USAGE.md
• Document that running the CLI with no arguments displays help and usage examples.
• Show the default behavior in examples: invoking the tool without flags prints the help summary and a short usage snippet.
• Include example commands demonstrating csv format alongside json and ndjson and highlight automatic help display.