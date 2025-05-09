features/RESEED_SUBCOMMAND.md
# features/RESEED_SUBCOMMAND.md
# Overview

Add a new reseed subcommand to the CLI that restores source, test, documentation, and dependency files to their original seed state as defined in agent configuration. This enables maintainers and automation workflows to consistently reset the repository to a known baseline.

# CLI Commands

- `repository0-plot-code-lib reseed`
  - Restores all tracked files (source, tests, README, USAGE.md, package.json) to the seed versions specified in the agent configuration.
- `repository0-plot-code-lib reseed --dry-run`
  - Prints a list of files that would be replaced without making any changes.
- `repository0-plot-code-lib reseed --verbose`
  - Logs each file copy operation and its source and destination paths.

# Implementation

- Update `src/lib/main.js` to:
  - Parse the first CLI argument as a subcommand and recognize "reseed".
  - Accept `--dry-run` and `--verbose` flags, validated with zod.
  - Load the agent configuration file (AGENT_CONFIG_FILE) to read the mapping of seed file paths.
  - For each mapping entry, copy the seed file over the target file using Node fs/promises.
  - If `--dry-run` is set, skip file writes and log the planned actions.
  - Exit with code 0 on success and non-zero on error.
- Add any necessary dependencies (e.g., zod for validation, fs-extra or use built-in fs/promises).

# Testing

- Extend `tests/unit/main.test.js` or create a new `tests/unit/reseed.test.js` to verify:
  - Running `main(["reseed", "--dry-run"])` returns successfully without modifying the filesystem.
  - Running `main(["reseed"])` in a temporary directory copies seed files into place.
  - `--verbose` emits detailed logs.
  - Invalid flags or missing configuration produce clear error messages and non-zero exit codes.

# Documentation

- Update `USAGE.md` and `README.md` with:
  - A new "Reseed" section describing the command and its flags.
  - Example invocations demonstrating reset, dry-run, and verbose modes.
  - Clarify which files are managed by reseed based on agent configuration mapping.features/PLOT_RENDERING.md
# features/PLOT_RENDERING.md
# Overview

Add the ability to render time series data as SVG or PNG images using ChartJSNodeCanvas. Introduce a renderPlot function and corresponding CLI flags to output charts in the desired format directly from the library.

# Implementation

- Update package.json dependencies to include chart.js and chartjs-node-canvas.
- In src/lib/main.js:
  - Import ChartJSNodeCanvas from chartjs-node-canvas.
  - Implement an async function renderPlot(dataPoints, options) that:
    - Creates a ChartJSNodeCanvas instance with options.width and options.height.
    - Builds a Chart.js configuration object using dataPoints as labels and dataset.
    - Calls renderToBuffer on the ChartJSNodeCanvas instance to get an image buffer.
    - Writes the buffer to the file specified by options.outputFile.
  - Extend argument parsing in main() with zod to support:
    - --output-file PATH (required)
    - --format svg or png (default svg)
    - --width NUMBER (default 800)
    - --height NUMBER (default 600)
  - After generating or receiving time series data, invoke renderPlot with the parsed options.

# Testing

- Create tests/unit/plot-rendering.test.js:
  - Generate a small sample dataset.
  - Call renderPlot with format svg and png, writing to temporary files.
  - Assert that output files exist and that the first bytes of each file match the expected SVG signature or PNG header.
  - Clean up temporary files after each test.

# Documentation

- Update USAGE.md:
  - Add a new section "Rendering Plots" with example invocations:
    repository0-plot-code-lib --expression "y=2*x+1" --range x=0:10 --output-file chart.svg --format svg
    repository0-plot-code-lib --expression "y=sin(x)" --range x=0:6.28 --output-file chart.png --format png --width 1024 --height 768
- Update README.md:
  - Document the renderPlot API export and CLI flags for output-file, format, width, and height.
features/TIME_SERIES_GENERATION.md
# features/TIME_SERIES_GENERATION.md
# Overview
Add CLI support to generate time series data from a mathematical expression over a specified range.

# CLI Options
- --expression EXPR    A mathematical expression where y is defined as a function of x.
- --range x=START:END  Range of x values to sample, expressed as start:end.
- --points N           Number of samples in the range (default: 100).
- --output FORMAT      Output format, json or csv (default: json).

# Implementation
Update src/lib/main.js to:
- Parse CLI flags using a lightweight parser and validate them with zod.
- Add expr-eval as a dependency and use it to compile and evaluate the expression.
- Generate an array of N evenly spaced x values between START and END.
- Evaluate y for each x and collect an array of data points { x, y }.
- Serialize the array in the requested format and print to stdout.

# Testing
- Extend tests/unit/plot-generation.test.js to cover:
  - Default behavior for a simple expression like y=x or y=2*x+1.
  - Custom points count and output formats.
  - Invalid expression or range inputs produce clear error messages.

# Documentation
- Update USAGE.md and README.md with examples and API reference.
- Example invocation:
  node repository0-plot-code-lib --expression y=sin(x) --range x=0:6.28 --points 50 --output json