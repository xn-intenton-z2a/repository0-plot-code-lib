features/ADVANCED_CLI_PARSING.md
# features/ADVANCED_CLI_PARSING.md
# Overview

Integrate a robust argument parsing framework to streamline and standardize CLI behavior, replace custom parsing logic, and provide built-in help, version, and error messaging. Ensure consistent handling of all flags and support of future subcommands.

# CLI Behavior

- repository0-plot-code-lib [options]
- -x, --expression <string>   Define a mathematical expression (for example "y=sin(x)")
- -r, --range <string>        Specify variable ranges in the form "x=min:max[:step]"
- -o, --output <path>         Write generated output (SVG/PNG or data) to the specified file
- -V, --version               Display version information and exit
- -h, --help                  Show help information for the command

Additionally, support future subcommands such as plot and export with consistent flag definitions.

# Implementation Details

1. Remove minimist dependency and import a dedicated CLI framework such as commander.
2. In src/lib/main.js:
   - Initialize a new Command instance.
   - Define options for expression, range, output, version, and help.
   - Parse process.argv and validate required options.
   - On parse errors, display user-friendly messages and exit with nonzero status.
   - Map parsed option values into a structured args object and pass to existing main logic.
3. Ensure exported main function remains compatible with library usage by accepting an options object.
4. Update package.json to add commander as a dependency and remove minimist if no longer used.

# Testing Requirements

- Create tests in tests/unit/cli-parsing.test.js:
  - Validate help output includes all defined options.
  - Verify version output matches package.json version.
  - Test parsing of single and combined flags, ensuring main receives the correct args object.
  - Simulate invalid flag usage to ensure proper error exit code and message.
- Achieve full coverage of parsing logic and error branches.

# Documentation

Update README.md with a dedicated CLI Reference section:

- Describe each option with its aliases and usage.
- Provide examples for generating a plot, exporting to a file, and displaying help or version.
- Show how to invoke future subcommands and mention extensibility.features/TIME_SERIES_GENERATION.md
# features/TIME_SERIES_GENERATION.md
# Overview

Add support for generating time series data from a mathematical expression and numeric range. This feature will parse a simple expression syntax, sample across the specified range at a uniform interval, and produce an array of points to be consumed by downstream plotting or export logic.

# Implementation Details

- Add mathjs as a dependency to parse and evaluate mathematical expressions safely.
- Implement a parseRange function in src/lib/main.js to accept range strings in the form "variable=min:max[:step]" and return an object with numeric min, max, and step values. If step is omitted, default to 100 samples evenly spaced across the range.
- Implement generateTimeSeries(expression, rangeObj) in src/lib/main.js:
  1. Use mathjs to compile the expression (e.g., "y=sin(x)") and extract the right-hand side function.
  2. Generate an array of x values from min to max using step or default sample count.
  3. Evaluate the compiled expression for each x, producing an array of {x, y} objects.
- Integrate with main(args): after parsing CLI flags, if both expression and range are provided, call generateTimeSeries and pass the resulting data array to the plotting pipeline or console output.
- Export parseRange and generateTimeSeries from the module for library consumers and testing.

# Testing Requirements

- Create tests in tests/unit/time-series.test.js:
  - Test parseRange with valid inputs (including optional step) and invalid syntax scenarios to ensure zod validation or manual checks catch errors.
  - Test generateTimeSeries for simple expressions such as "y=2*x", verifying correct output length and value pairs.
  - Achieve 100% coverage for error handling and normal branches in both parseRange and generateTimeSeries.

# Documentation

- Update README.md to include a new section titled Time Series Generation with usage examples:
  - Inline API: import { generateTimeSeries } from the library and call it with a sample expression and range.
  - CLI: provide an example calling repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1" and illustrate the JSON or CSV output of the time series.
