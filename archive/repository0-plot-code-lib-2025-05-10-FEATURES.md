features/PERFORMANCE_PROFILING.md
# features/PERFORMANCE_PROFILING.md
# Purpose

Add performance profiling capabilities to measure time taken by plot generation stages for large datasets

# Behavior

When users include the profile flag in the plot CLI invocation the application marks key stages of the generation process including sampling formula evaluation and formatting
At completion the CLI outputs a summary of elapsed times for each stage or writes a JSON report to a file if profile output path is specified

# Implementation

In src lib main js extend the CLI option schema to include profile and profile output path using zod
Import perf hooks from node perf hooks and instrument performance marks before and after sample computation formula evaluation and output rendering
After rendering call performance measure to capture durations then collect entries and format a text summary or a JSON object
Write the report to stdout or to the configured output file using fs
Ensure builtin perf hooks are used without new dependencies

# Testing

Add unit tests in tests unit main test js to simulate runs with profile flag by mocking perf hooks entries and verifying that measurements are collected and output contains expected stage labels and durations
Test writing a JSON report to a file path and handle errors when the file path is invalid

# Documentation

Update README md to add Profiling section under CLI Usage describing profile and profile output options with examples of summary and JSON report
Update USAGE md to mirror these additionsfeatures/RESEED_CONFIGURATION.md
# features/RESEED_CONFIGURATION.md
# Purpose

Enhance the existing --reseed CLI flag documentation and maintain a clear change history by updating the project changelog.

# Behavior

When users invoke the CLI help or consult the README, they will see a dedicated section describing the --reseed flag, its purpose, and an example. In addition, the repository CHANGELOG.md will include a new entry under an Unreleased heading that summarizes the documentation update.

# Implementation

- In README.md:
  - Add a "Reseed Flag" subsection under the "CLI Usage" heading.
  - Document the syntax: `repository0-plot-code-lib --reseed`.
  - Explain that this flag triggers the reseeding process using the configuration file defined by the AGENT_CONFIG_FILE environment or default path.
  - Provide an example invocation and expected console output snippet.

- In USAGE.md:
  - Mirror the updated documentation for the --reseed flag under the CLI Usage section.
  - Ensure that examples and descriptions match the README content.

- In CHANGELOG.md:
  - Under the topmost Unreleased section (or create it if missing), add:
    "Added documentation for the --reseed CLI flag in README and USAGE, and updated changelog."
  - Follow the existing changelog formatting conventions.

# Testing

- In tests/unit/main.test.js:
  - Add a unit test that invokes the CLI with `--reseed` and verifies that the main function routes into the reseeding logic path (mocking fs and js-yaml).  
  - Confirm that missing seed file errors are handled gracefully.

# Documentation

- Ensure README.md now contains a fully detailed "Reseed Flag" section with usage, description, and example output.  
- Confirm USAGE.md is updated similarly.  
- Verify CHANGELOG.md accurately reflects the new documentation changes under Unreleased.
features/PLOT_HTTP_API.md
# features/PLOT_HTTP_API.md
# Purpose

Add an HTTP API server mode to allow remote plotting requests over HTTP, enabling integration into other tools and services.

# Behavior

When invoked as repository0-plot-code-lib serve [--port <port>], the CLI will start an Express server listening on the specified port (default 3000). It exposes a GET endpoint at /plot that accepts the following query parameters:
- formula: a mathematical expression to plot
- range: comma-separated minimum and maximum values for x (default -10,10)
- format: one of ascii, json, svg (default json)
- width: output width (number, default 80)
- height: output height (number, default 20)

The server validates inputs, computes N equidistant data points from range, and returns the result in the requested format with appropriate Content-Type headers. Invalid inputs produce a 400 response with an error message.

# Implementation

- In src/lib/main.js, detect when args[0] is serve and import express to create an HTTP server.
- Use zod to validate and coerce query parameters from req.query.
- Import or extract the existing plot-generation logic (using mathjs) to compute data points.
- Route GET /plot to run plot logic and send the response: ASCII as text/plain, JSON as application/json, SVG as image/svg+xml.
- Default port to 3000 and allow override via --port flag.
- Update package.json to add a dependency on mathjs.

# Testing

- Extend tests/unit/plot-generation.test.js to include new tests for the HTTP server:
  - Start the server in test mode and issue GET requests to /plot with valid and invalid parameters.
  - Use a lightweight HTTP client or supertest to verify status codes, headers, and body formats.
  - Mock mathjs evaluate calls to return predictable values for error and success cases.

# Documentation

- Update README.md to add a section "HTTP API" describing how to start the server, endpoint parameters, example requests, and sample responses for each format.
- Update USAGE.md to document the serve command, --port option, and /plot query parameters with examples.features/PLOT_REPL.md
# features/PLOT_REPL.md
# Purpose

This feature adds an interactive REPL mode to allow users to enter formulas and options dynamically at the command line and immediately view plots.

# Behavior

When invoked as repository0-plot-code-lib repl, the CLI enters an interactive mode. Users see a prompt where they can type commands:
- Enter a mathematical formula to plot.
- Optionally specify parameters inline using syntax range=min,max format=ascii|json|svg width=n height=n.
- The REPL evaluates the input, generates the plot using existing logic, and displays the result.
- Typing exit or quit ends the session.

# Implementation

In src/lib/main.js update main to detect 'repl'. When repl is invoked:
- Use Node's readline module to create an interactive prompt.
- For each input line, parse the formula and inline option flags using zod or simple parsing.
- Reuse existing plot-generation functionality from the plot command to compute data points and format output.
- Write output to stdout and re-display the prompt.
- Handle invalid input by printing an error message without exiting the REPL.

# Testing

In tests/unit/main.test.js add unit tests for REPL mode:
- Mock readline.createInterface to simulate user inputs and capture console output.
- Provide a sequence of valid and invalid inputs, verify correct plot output or error messages.
- Ensure that exit and quit commands close the interface.

# Documentation

Update README.md and USAGE.md to include a new section "REPL Mode". Describe how to start the REPL, show sample interactive session including formula input and resulting ASCII or JSON output.features/PLOT_BATCH.md
# features/PLOT_BATCH.md
# Purpose

Add a batch processing mode that enables users to generate multiple plots from a single input file in JSON or CSV format.

# Behavior

When users invoke repository0-plot-code-lib batch --input <file> [--output-dir <dir>], the CLI:
- Reads the specified input file.  Supports JSON arrays of objects and CSV files with headers formula, range, format, width, height, points, time-format.
- Processes each record independently, applying default CLI options for any missing fields.
- Generates a plot for each record using the existing plot logic.
- If --output-dir is provided, writes each plot to a separate file named index.format (for example, 1.svg).  Otherwise prints each plot to stdout, separated by a header indicating record index.
- Reports errors for malformed records to stderr without stopping the processing of remaining entries.

# Implementation

- In src/lib/main.js detect when args[0] is batch and parse flags --input (required) and --output-dir (optional) using zod.
- Use fs to read the input file; branch on extension: parse JSON for .json or CSV for .csv/.tsv using a simple parser based on CSV_FORMAT.md guidelines.
- For each parsed record, merge values with CLI defaults, then invoke the plot-generation function to compute output in the requested format.
- When --output-dir is set, use fs.writeFileSync to write each result to a file in the directory, creating the directory if necessary.
- On parsing or processing errors for a record, log a descriptive error with record index and continue.

# Testing

- In tests/unit/main.test.js mock fs.readFileSync and fs.writeFileSync:
  - Provide a JSON array input and verify that main routes through batch logic and writes correct files or outputs correct stdout segments.
  - Provide a CSV string input and verify parsing and output behavior.
  - Simulate a malformed record and confirm that an error is logged and processing continues for other records.
  - Test missing --input flag results in a usage error and non-zero exit code.

# Documentation

- Update README.md under "CLI Usage" to introduce the batch command, describe flags, input formats, and examples of invocation.
- Update USAGE.md to document the batch command, --input and --output-dir options, sample input file structures, and expected outputs.
- Add an entry under Unreleased in CHANGELOG.md: "Added batch plotting mode to process multiple plot commands from JSON or CSV input files."
features/PLOT_GENERATION.md
# features/PLOT_GENERATION.md
# Purpose

Add core plot generation support including expression parsing, range processing, and time-series data output in multiple formats.

# Behavior

- Recognize numeric mode by default.  Enable time series mode when the time-format option is provided.
- Accept a mathematical formula string for evaluation and an optional range parameter with two comma separated values for minimum and maximum.
- Support an optional points parameter to control the number of sample points, defaulting to 50.
- In numeric mode, sample equidistant numeric x values within the given range.  In time-series mode, parse range boundaries as ISO8601 timestamps, sample equidistant timestamps, and convert them to milliseconds for formula evaluation.
- Compute y equal to the formula evaluated at each sample.
- Support four output formats: ascii, json, svg, and csv.  Each format adapts labels and headers to numeric or time-series mode.

# Implementation

- Extend the CLI option schema using zod to include format, width, height, range, points, and time-format options.
- In src/lib/main.js, detect time-series mode when the time-format option is present.
- Parse the range value as numeric for numeric mode or as ISO strings to Date objects in time-series mode.
- Generate an array of sample points: numeric values or Date objects converted to milliseconds.
- Use mathjs to evaluate the formula at each sample value.
- Branch on the format option:
  - ascii: render a chart with axes, markers, and time labels for time-series mode.
  - json: output an array of objects with keys x and y in numeric mode or time and value in time-series mode.
  - svg: produce an SVG polyline graph with axis ticks and labels appropriate to the mode and set content type to image/svg+xml.
  - csv: build a string starting with a header line using x,y or time,value and escape values per RFC4180.
- Determine the output destination: write to stdout or to a file path supplied via the output option.

# Testing

- Extend tests in tests/unit/plot-generation.test.js for time-series mode:
  - Mock mathjs evaluate and Date parsing to return predictable values.
  - Verify the JSON output array has the correct time or x keys and matching values.
  - Verify the CSV output has the correct header and data lines.
- Ensure existing tests for ascii, json, svg, and csv formats pass unchanged.
- Test error handling for invalid range formats, malformed timestamps, and unsupported formats.

# Documentation

- Update README.md under the plot command section to describe time-series mode, how to specify the time-format option, and how to supply ISO8601 range boundaries.
- Update USAGE.md to document the new options points and time-format, including sample invocation lines and sample outputs in each format.