# CLI_TOOL

Overview
This feature specifies the command-line interface for the plotting tool. The CLI must be simple to use, support expression-based and CSV-based inputs, and produce SVG or PNG output files.

Specification
- Provide an executable entry point at src/lib/main.js that can be run with node.
- Supported flags: --expression <expression> to supply an expression string, --range <start:step:end> to supply sampling range, --csv <path> to supply a CSV time series file, --file <output path> to write the output, and --help to print usage examples and exit.
- Behavior rules: If --csv is present, ignore --expression and --range. Otherwise --expression and --range must both be provided. --file is required. The output type is inferred from the extension of the value passed to --file.
- The --help output must include usage examples and at least one example showing how to plot a sine expression and how to convert a CSV to PNG.
- Exit codes: 0 on success, nonzero on error with descriptive messages printed to stderr.

Rationale
A focused CLI allows users to generate plots quickly without writing JavaScript. Clear rules around input precedence and error messages reduce user confusion.

Acceptance criteria
- Running node src/lib/main.js --help prints usage information and exits without error.
- Running node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg creates output.svg in the current directory.
- Running the CLI with --csv data.csv --file output.png creates a PNG file that begins with PNG magic bytes.

Implementation notes
- Implement minimal option parsing internally (no new dependency) or document a small dependency addition if chosen.
- Add CLI behaviour tests under tests/unit/ that spawn the CLI and assert exit codes and created files.