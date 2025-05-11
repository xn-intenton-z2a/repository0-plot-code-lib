features/AXIS_SCALING.md
# features/AXIS_SCALING.md
# Overview
Add per-axis scale options for how sample points are distributed across each axis. Linear sampling remains the default. Logarithmic sampling can be selected for axes that span several orders of magnitude and only supports positive minimum and maximum values.

# CLI Integration
- Introduce a new optional flag --scale that accepts assignments of axis to scale type such as x=log or y=linear. Multiple assignments separated by commas.
- Update minimist configuration to parse scale as a string and Zod schema to validate a record mapping axis names to one of the allowed values linear or log.
- Default behavior when --scale is omitted continues to use linear sampling for all axes.

# Implementation
1. Parse the scale specification string into an object mapping each axis to its scale type. If an invalid scale type is encountered, display a clear error and exit with code 1.
2. Extend the safeParsed options object to include an optional scale record alongside expression, range, points, format, and output.
3. Modify generateSeries to accept the scale record. For each axis apply the selected sampling method:
   1. linear: compute an evenly spaced array of values between min and max as before.
   2. log: verify that both min and max are strictly positive, then generate a geometric progression where each point equals min times the ratio (max divided by min) raised to the fractional index.
   3. On scale error or invalid axis name, throw an error before data generation.
4. Proceed to build the Cartesian product and evaluate each combination exactly as existing behavior.

# Tests
- Add unit tests for parsing the scale flag that confirm valid inputs produce the correct mapping and invalid inputs produce errors.
- Add tests for generateSeries using log scale on a simple range such as x spanning 1 to 100 with three points yielding [1,10,100].
- Add an integration test invoking CLI with --expression y=x --range x=1:100 --points 3 --scale x=log that inspects the axis values in the output series.

# Documentation
- Update USAGE.md with examples demonstrating the --scale flag and comparing linear versus log sampling.
- Update README.md features list to mention axis scaling support under Time Series Generation.
features/CONFIG_FILE_SUPPORT.md
# features/CONFIG_FILE_SUPPORT.md
# Overview

Introduce support for configuration files to define CLI options in JSON or YAML format. Users can place common settings such as expression, range, points, format, and output in a config file and reduce repetitive flag usage.

# CLI Integration

- Add a new optional flag --config <path> (alias -c) to minimist options.
- Detect flag order: load config file first, then apply any explicit CLI flags to override values.
- Support JSON (extension .json) and YAML (extensions .yml, .yaml) via built-in JSON.parse and js-yaml’s safeLoad.
- Maintain existing flags: expression, range, points, format, output remain valid and take precedence over config values.

# Implementation

1. In src/lib/main.js, update minimist configuration to include string: ['config'] and alias: {c: 'config'}.
2. After parsing args, if args.config is present:
   1. Verify file exists and is readable; on failure, print error and set exit code.
   2. Read file contents synchronously.
   3. Determine parser based on file extension: JSON.parse for .json, js-yaml safeLoad for .yml/.yaml. On parse error, display clear message and exit with code 1.
   4. Validate loaded object contains allowed keys: expression, range, points, format, output.
   5. Merge config options with CLI args: for each allowed key use CLI if provided, else use config.
3. Validate merged options as before with parseRange and Zod schema.

# Tests

- Unit tests for main():
  - Loading a valid JSON config file produces expected options.
  - Loading a valid YAML config file produces expected options.
  - CLI flags override values in config file.
  - Missing config file or unreadable path yields error and exitCode 1.
  - Invalid config content yields parse error and exitCode 1.
- Integration tests:
  - main(['--config', 'test/fixtures/sample.json']) returns merged options.
  - main(['--config', 'sample.yml','--format','csv']) uses csv despite config specifying json.

# Documentation

- Update USAGE.md to include --config examples and syntax for JSON and YAML.
- Update README.md features list to mention Config File Support.
features/SERIES_EXPORT.md
# features/SERIES_EXPORT.md
# Overview

Implement data generation and export capabilities to transform parsed mathematical expressions into time series arrays and serialize them in JSON or CSV formats for output to stdout or files.

# Dependencies

Add a lightweight expression evaluator to compile and run mathematical formulas:
- expr-eval: to parse and evaluate expressions

# Implementation

1. Install expr-eval in package.json dependencies.
2. In src/lib/main.js, after validating CLI options, import { Parser } from expr-eval.
3. Compile the expression string into a function using Parser.parse(expression).toJSFunction('x', ...axes).
4. Generate a series of data points:
   - For each axis, compute an evenly spaced array of values based on range and points.
   - Evaluate the parsed function at each sample point to produce an array of objects mapping axis names to values and the result.
5. Serialize the resulting array:
   - JSON: format with indentation for readability.
   - CSV: produce a header row of column names followed by rows of comma-separated values.
6. Write the serialized output to stdout or to the file path specified by the --output flag.

# CLI Integration

- After parsing and validating flags, compile the user expression.
- Invoke generateSeries to create raw data points.
- Choose serializer based on the format flag.
- Write the serialized data to destination.
- On serialization or write errors, display a clear error and exit with code 1.

# Tests

- Unit tests for generateSeries:
  - Confirm correct series length and values for simple expressions (e.g., y=x*2).
  - Test multi-axis generation producing expected grid sizes.
- Tests for serialization:
  - Verify JSON.stringify output matches series structure.
  - Verify CSV output has correct headers and rows for sample series.
- Integration tests:
  - CLI invocation with --format json outputs valid JSON.
  - CLI invocation with --format csv outputs well-formed CSV.

# Documentation

- Update README.md and USAGE.md to show example commands and resulting JSON and CSV outputs.
features/PLOT_EXPORT.md
# features/PLOT_EXPORT.md
# Overview

Add native chart rendering capabilities to generate SVG and PNG images directly from time series data via the CLI. Users can invoke plotting commands to produce ready-to-share graphics without external tooling.

# Dependencies
- chart.js for chart configuration and rendering
- canvas for Node.js Canvas implementation to back Chart.js

# Implementation
1. Add chart.js and canvas to dependencies in package.json.
2. Update Zod optionsSchema to allow new format values svg and png.
3. In src/lib/main.js, after generateSeries or before serializing, branch on format:
   1. For svg: import Chart and Canvas, use createCanvas(width, height, 'svg') to create an SVG canvas.
   2. For png: use createCanvas(width, height) to create a PNG canvas.
   3. Initialize a Chart instance of type line with axis labels from series and dataset values. Set options to maintain aspect ratio false and include chart title with the expression.
   4. Render the chart, then call canvas.toBuffer('image/svg+xml') for SVG or canvas.toBuffer('image/png') for PNG.
   5. Write the resulting buffer or string to the output path or stdout (stdout only for svg).
4. Maintain error handling: on any render or write error, display clear message and set exit code to 1.

# CLI Integration
- Extend minimist config to accept --format svg and --format png alongside existing json and csv.
- Examples:
  node src/lib/main.js --expression y=sin(x) --range x=0:6.28 --format svg --output chart.svg
  node src/lib/main.js --expression y=sin(x) --range x=0:6.28 --format png --output chart.png

# Tests
- Unit tests for plot generation:
  - Verify svg output string begins with `<svg`.
  - Verify png buffer starts with PNG signature bytes (0x89 0x50 0x4E 0x47).
  - Test error is thrown for unsupported image format.
- Integration tests:
  - CLI invocation with --format svg writes a valid .svg file with expected tags.
  - CLI invocation with --format png writes a .png file whose first bytes match the PNG signature.

# Documentation
- Update USAGE.md with examples of svg and png outputs.
- Update README.md features list to include Plot Export with svg and png flags.features/ARGUMENT_PARSING.md
# features/ARGUMENT_PARSING.md
# Overview

Implement robust parsing and validation for command-line inputs enabling users to specify mathematical expressions, value ranges, output formats, and output destinations. This feature lays the foundation for core functionality by interpreting user intent and converting it into structured options for downstream processing.

# CLI Flags

- --expression <expr>    Defines the mathematical expression, such as y=sin(x)
- --range <spec>         Specifies axis ranges in the form x=min:max or a comma-separated list for multiple axes
- --points <number>      (Optional) Number of data points to generate per axis. Defaults to 1000.
- --format <type>        (Optional) Output data format. Allowed values: json, csv. Defaults to json.
- --output <path>        (Optional) File path to write the structured output. Defaults to stdout.

# Validation

Use Zod schemas to enforce:
- expression is a non-empty string following basic formula syntax
- range strings match axis=min:max patterns and cover at least one axis
- points is an integer greater than zero
- format is one of the allowed values
- output, if provided, is a valid writable file path

# Behavior

- On invocation, parse process.argv with a minimal library or custom parser
- Validate parsed values against Zod schemas
- On validation failure, display a clear error with usage hints and exit with code 1
- On success, pass the structured options object to downstream modules for series generation

# Tests

- Add unit tests for parsing valid combinations of flags
- Add tests asserting correct error messages and exit code for missing or invalid inputs
- Cover edge cases: missing required flags, malformed ranges, unsupported formats

# Documentation

- Update README.md and USAGE.md to include examples of all CLI flags
- Provide sample commands and expected output snippets
features/TIME_SERIES_GENERATION.md
# features/TIME_SERIES_GENERATION.md
# Overview

Implement generation of time series data points from a parsed mathematical expression and specified axis ranges. This feature transforms user inputs into a structured array of numerical samples suitable for downstream plotting or export.

# Data Generation

- Use a lightweight expression evaluation library (for example mathjs or expr-eval) to compile the provided expression into a callable function.
- For a single-axis expression y = f(x):
  1. Determine x-min and x-max from the parsed range object.
  2. Compute an evenly spaced array of x values of length `points`.
  3. Evaluate f(x) for each value to produce an array of { x, y } pairs.
- For multi-axis expressions (for example z = f(x, y)):
  1. Determine ranges for each axis from the parsed range specification.
  2. Generate a grid of evenly spaced samples across each axis.
  3. Evaluate f(...) at each sample point to produce an array of coordinate objects.

# API and Integration

- Export a function `generateSeries(options)` that accepts:
  - expressionFn: the compiled expression function
  - ranges: object mapping axis names to [min, max]
  - points: number of samples per axis
- The function returns an array of point objects.
- Integrate `generateSeries` into `main` so that after parsing and validation, `generateSeries` is invoked to produce raw data.

# Tests

- Add unit tests to verify series length matches `points` setting for single-axis cases.
- Test correct value generation for a known expression such as y = x * 2 over a simple range.
- Add edge case tests: zero-length range, negative ranges, and malformed expression errors.

# Documentation

- Update USAGE.md and README.md to include an example of invoking the CLI to generate raw series output.
- Document the shape of the returned data structure and available options.
features/HTTP_API.md
# features/HTTP_API.md
# Overview

Add HTTP API endpoints leveraging an Express server to serve time series data and plots on demand. This feature allows integration with other applications and remote clients without invoking the CLI directly.

# Dependencies

- express: to create HTTP server and parse JSON bodies

# Implementation

1. Extend src/lib/main.js to accept a new CLI flag --serve <port>. When provided, skip CLI generation flow and start the HTTP server instead.
2. Import express and configure middleware:
   - Use express.json() to parse incoming request bodies as JSON.
3. Define routes:
   
   POST /api/series
   - Expects a JSON body with fields: expression, range, points (optional), format (json or csv).
   - Validate inputs using existing Zod optionsSchema (allow only json and csv here).
   - Invoke generateSeries and serializer logic to build the response.
   - Respond with Content-Type application/json for json format or text/csv for csv format. Return status 200 on success.
   - On validation or generation error, respond status 400 with a JSON body { error: <message> }.

   POST /api/plot
   - Expects a JSON body with fields: expression, range, points (optional), format (svg or png).
   - Validate inputs and ensure format is svg or png.
   - Invoke existing plot generation logic (Chart.js and Node canvas) to produce an image buffer or string.
   - Respond with Content-Type image/svg+xml for svg or image/png for png. Return status 200 on success.
   - On error, respond status 400 with JSON { error: <message> }.

   GET /api/health
   - Returns status 200 with JSON { status: "ok" } to confirm server is running.
4. Start listening on the provided port and log a message indicating HTTP API is available.

# CLI Integration

- Add new flag --serve <port> (alias -S) in minimist configuration and Zod schema as optional number.
- If serve flag is present, main should return early after starting server.
- Example: node src/lib/main.js --serve 3000 to start the API on port 3000.

# Tests

- Add unit or integration tests for HTTP endpoints using a lightweight HTTP client.
  - Test POST /api/series returns valid JSON or CSV for a simple expression.
  - Test POST /api/plot returns an SVG string beginning with <svg and a PNG buffer starting with PNG signature bytes.
  - Test error responses when missing or invalid fields.
  - Test GET /api/health returns status 200 and correct JSON.

# Documentation

- Update USAGE.md to include examples for HTTP API:
  - curl -X POST localhost:3000/api/series -d '{"expression":"y=x","range":{"x":[0,1]}}'
  - curl -X POST localhost:3000/api/plot -d '{"expression":"y=sin(x)","range":{"x":[0,6.28]},"format":"svg"}'
- Update README.md feature list to reference HTTP API endpoints.