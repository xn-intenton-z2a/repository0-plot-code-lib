# CLI Interface

## Purpose
Provide a command-line interface for generating time series data and plots from mathematical expressions and numeric ranges, enabling users to run everything without HTTP.

## Behavior
1. Accept subcommands timeseries and plot. Without subcommand, print usage and exit 1.
2. Global flags:
   • --expression <expr> (required)
   • --range <start:end> (required)
3. timeseries subcommand flags:
   • --points <number> (default 100)
   • --format <csv|json> (default csv)
   • --output <file path> (optional) to write output to file; if omitted, write to stdout
4. plot subcommand flags:
   • --plot-format <svg|png> (default svg)
   • --width <number> (default 800)
   • --height <number> (default 600)
   • --title <string> (optional)
   • --output <file path> (required) to write image to file
5. For timeseries, parse expression and numeric range, generate array of { x, y } points, serialize to CSV or JSON.
6. For plot, generate SVG or PNG image from time series and save binary to file.
7. On missing or invalid parameters, exit code 1 and print error to stderr. On evaluation errors, exit code 2.

## Implementation
- In src/lib/main.js, inspect process.argv. Identify subcommand and flags. Use zod to validate arguments.
- Use existing time series generator module imported or implemented inline to compute points.
- Use csv-stringify for CSV output or JSON.stringify for JSON.
- Use existing plot renderer function to generate image buffers.
- Use fs.writeFileSync for writing to file, or process.stdout.write.
- Exit with process.exit(0) on success, process.exit(1 or 2) on errors.

## Testing
- In tests/unit/main.test.js, simulate process.argv for timeseries and plot cases.
- For timeseries without output flag, capture stdout and verify correct CSV or JSON.
- For timeseries with output flag, write to temp file and verify file contents.
- For plot, simulate with --output to temp file, verify file exists and has nonzero size and correct mime signature (<?xml or PNG signature).
- Test missing required flags exits with code 1 and error message.