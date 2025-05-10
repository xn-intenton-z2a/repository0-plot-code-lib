features/BATCH_PLOTTING.md
# features/BATCH_PLOTTING.md
# Overview
Add batch plotting mode that allows users to specify multiple plotting tasks in a single YAML or JSON configuration file and generate all plots in one command.

# CLI Interface
Add a new --batch option that accepts a path to a configuration file. The file can be YAML or JSON and must define an array of plot tasks. Each task supports the following properties:

- expression or dataFile: A mathematical formula string or path to a JSON or CSV file containing x and y data arrays
- format: svg or png, default svg
- output: file path for the generated plot
- title (optional): Plot title
- xLabel (optional): Label for the X axis
- yLabel (optional): Label for the Y axis

Examples:
repository0-plot-code-lib --batch plots.yml
repository0-plot-code-lib --batch tasks.json

# Implementation
- Extend src/lib/main.js to detect the --batch flag. Use fs.promises to read the configuration file and js-yaml for YAML support. Validate the configuration using zod according to the defined schema for plot tasks. Loop through each task and invoke the existing plot rendering logic from PLOT_RENDERER. Handle file I/O errors and validation failures with descriptive error messages and non-zero exit codes.
- Ensure that chartjs-node-canvas is available for rendering. Allow CSV input by detecting the file extension and parsing it with a lightweight built-in CSV parser.
- Support concurrent or sequential processing of tasks based on performance and resource constraints.

# Testing
- Add tests in tests/unit/batch-plotting.test.js that mock the file system to provide sample batch config files in YAML and JSON formats. Spawn the CLI with the --batch option and verify that multiple output files are created with correct headers and content. Clean up generated files after each test.
- Include validation tests for malformed configuration files and ensure proper error codes and messages.

# Documentation Updates
- Update USAGE.md and README.md to include a new section Batch Plotting with examples of the --batch flag and configuration file format.features/PROGRAMMATIC_API.md
# features/PROGRAMMATIC_API.md
# Overview
Provide a programmatic JavaScript API for generating plots directly from code without invoking the CLI or HTTP server. This API enables users to import core plot functionality and integrate plot creation into their own scripts and applications.

# API
Exported functions from src/lib/main.js:

generatePlot(expressionOrData, options)
  expressionOrData  A string containing a mathematical formula or a path to a JSON or CSV data file
  options           An object with optional properties
    format          svg or png, default svg
    title           Plot title string
    xLabel          Label for the X axis
    yLabel          Label for the Y axis
  Returns a Promise resolving to a Buffer for PNG or a string for SVG output

# Implementation
Refactor src/lib/main.js to modularize the existing plot rendering logic into named exports. Add a function generatePlot that accepts input and options, validates parameters with Zod, loads data files with fs.promises, and invokes chartjs-node-canvas to render SVG or PNG. Maintain error handling through rejected Promises with descriptive messages.

# Testing
Add a new test file tests/unit/api.test.js:
  Import generatePlot from src/lib/main.js
  Test generating a simple plot from a formula and verify the returned output type and format header
  Test loading a sample JSON data file and verify plotted output
  Test error conditions such as invalid formula strings or missing data files and expect Promise rejections with error messages
  Use vitest mock for fs.promises and chartjs-node-canvas to control outputs

# Documentation Updates
Update README.md to include a "Programmatic API" section:
  Show example import usage
  Demonstrate generatePlot usage with code snippets and options
  Describe return types and error handling
Update USAGE.md to reference the API functions and link to examples in README.mdfeatures/DATA_TRANSFORM.md
# features/DATA_TRANSFORM.md
# Overview
Add data transformation mode allowing users to apply operations to data arrays loaded from CSV or JSON before plotting.

# CLI Interface
Add a new --transform option that accepts a path to a JSON or YAML transform specification file or an inline JSON string defining an array of transform operations. Each operation supports:
- type: normalize | smooth | scale | offset
- windowSize: number (for smooth)
- factor: number (for scale)
- offset: number (for offset)

# Implementation
- Extend src/lib/main.js to parse the --transform flag and load the specification using fs.promises and js-yaml for YAML support. Validate the specification with Zod against a TransformSpec schema defining an array of operations.
- Implement data transformation functions within the same file: normalize applies min-max scaling to y values, smooth applies a sliding window average, scale multiplies y values by the factor, offset adds a constant to y values.
- Before rendering a plot, detect if transform spec is provided and apply the operations sequentially to the data array loaded from JSON or CSV input.
- Maintain descriptive error handling for invalid specifications or unsupported operation types, exiting with non-zero codes on errors.

# Testing
- Add tests in tests/unit/data-transform.test.js that define sample data arrays and transform specifications inline and via temporary files. Verify that each operation produces the expected output arrays.
- Mock the file system and use vitest to invoke the CLI with --transform and confirm that plots generated reflect transformed data by inspecting rendered data arrays or test hooks.

# Documentation Updates
- Update USAGE.md and README.md to include a "Data Transformation" section that describes the --transform option, shows examples of transform specification formats, and demonstrates combining transforms with plotting commands.features/WATCH_MODE.md
# features/WATCH_MODE.md
# Overview
Add a watch mode that monitors input data and configuration files and automatically regenerates plots, batches, and reports when files change without exiting the process.

# CLI Interface
Add a new --watch or -w flag. When specified alongside --plot, --batch, --report, or --transform, the tool enters watch mode and watches the relevant file paths for changes:

- Single Plot:
  repository0-plot-code-lib --plot data.csv --output chart.svg --watch

- Batch:
  repository0-plot-code-lib --batch tasks.yml --watch

- Report:
  repository0-plot-code-lib --report report-config.json --watch

- Transform:
  repository0-plot-code-lib --plot data.csv --transform ops.yml --watch

The process remains running until interrupted, and each time a watched file changes the same command is re-executed with updated inputs. Console logs indicate file events and regeneration results.

# Implementation

- Add chokidar dependency at version ^3.5.0 to package.json.
- In src/lib/main.js, after parsing CLI flags, detect the --watch flag. Determine watch targets:
  - For --plot: watch the dataFile path if provided and the source script for expression inputs.
  - For --batch or --report: parse the configuration file (YAML or JSON) and extract any dataFile references to watch alongside the config file itself.
  - For --transform: watch the transform specification file.
- Use chokidar.watch to monitor the determined paths. On 'change' events, debounce triggers (500ms) and invoke the original plot, batch, or report generation logic instead of exiting.
- Ensure only one generation runs at a time and queue or skip rapid successive events within the debounce window.
- On each regeneration, catch and log errors without terminating the watcher process, returning to watch state on error.

# Testing

- Add tests in tests/unit/watch-mode.test.js mocking chokidar.watch to simulate file change events.
- Verify that the CLI does not exit on watch initialization, and that regeneration logic is invoked on mock events.
- Test combinations with --plot and --batch by mocking file system reads and spying on the core rendering calls.
- Assert debounce behavior by simulating rapid change events.

# Documentation Updates

- Update USAGE.md and README.md to add a "Watch Mode" section describing the --watch flag, watched targets, and usage examples.
- Show examples for each command combination and describe console output on file change events.features/CONFIG_LOADER.md
# features/CONFIG_LOADER.md
# Overview
Add a CLI option to load and display the agentic-lib configuration.

# CLI Interface
When run with --show-config, the tool reads the YAML configuration file at agent-config.yml or a path supplied via AGENT_CONFIG_PATH environment variable, parses it, and prints the resulting JSON object to standard output.

# Implementation
Use fs.promises to read the file, js-yaml to parse the content. Handle file not found and parse errors by printing descriptive messages and exiting with a non-zero code.

# Testing
Add unit tests that mock the file system to provide a sample YAML file. Verify that --show-config outputs valid JSON for a correct file and that missing or malformed files produce appropriate error messages and exit codes.features/REPORT_GENERATION.md
# features/REPORT_GENERATION.md
# Overview
Add a report generation mode that produces a standalone HTML report combining one or more plots with optional narrative sections. Users can supply a JSON or YAML configuration describing multiple plot tasks and textual sections. The tool renders each plot in memory and embeds it in an EJS-based HTML template to produce a single report file.

# CLI Interface
Introduce a new --report option that accepts a path to a configuration file in JSON or YAML format. Support the following additional flags:

--template <filePath>
  Path to a custom EJS template. If omitted, use a built-in default template that includes a title, date, and each plot with its caption or title.

--output <filePath>
  Path to write the generated HTML report. Default is report.html in the current working directory.

Example:
repository0-plot-code-lib --report report-config.yml --template custom-report.ejs --output summary.html

# Implementation
- Extend src/lib/main.js to detect the --report flag. Use fs.promises to read the configuration file and js-yaml to parse YAML or JSON.
- Define a Zod schema for the report configuration with an array of report sections. Each section can be either:
  - plotTask: same schema as in batch plotting (expression or dataFile, format, title, xLabel, yLabel)
  - markdown: a string containing narrative text in Markdown (optional)
- Loop through sections. For each plotTask, invoke the existing PLOT_RENDERER logic in memory to obtain a base64-encoded image. For each markdown section, convert the text to HTML using markdown-it.
- Load the EJS template (custom or use default built into the code). Supply template variables: reportTitle, generatedAt, and an array of renderedSections (each with HTML for text or <img> elements for plots).
- Render the EJS template to produce HTML. Write the output file using fs.promises.
- Handle errors at each step: configuration validation, file I/O, template rendering, plot generation. Exit with non-zero code and descriptive messages if errors occur.

# Testing
- Add tests in tests/unit/report-generation.test.js:
  - Mock fs.promises to provide sample config files in YAML and JSON.
  - Provide a minimal built-in template for testing. Mock PLOT_RENDERER to return predictable base64 data.
  - Invoke the CLI with the --report option and verify the HTML file is created.
  - Inspect the generated HTML string for expected tags: <html>, <head>, each <img src="data:image/png;base64,..."> and captions.
  - Test error conditions: malformed config, missing template file, template syntax error.
  - Clean up generated files after each test.

# Documentation Updates
- Update USAGE.md and README.md:
  - Add a "Report Generation" section under Usage.
  - Show examples of report configuration format, CLI invocation, and sample output.
  - Document default template features and how to supply a custom template.
features/PATCH_RELEASE.md
# features/PATCH_RELEASE.md
# Overview
Add a new release mode to automate version bumping, changelog updates, pull request creation, and npm publishing for v1.2.0.

# CLI Interface
Add a --release flag to the CLI. Support an optional --dry-run flag to preview steps without execution.

Examples:
repository0-plot-code-lib --release
repository0-plot-code-lib --release --dry-run

# Implementation
- Detect --release and --dry-run flags in src/lib/main.js using manual parsing of process.argv.
- Read package.json via fs.promises and update version from 1.2.0-0 to 1.2.0.
- Use npx conventional-changelog -p angular -i CHANGELOG.md -s to update CHANGELOG.md.
- Commit changes and tag v1.2.0 using child_process.spawn for git add, git commit, and git tag.
- Create a GitHub pull request using gh CLI: gh pr create --title 'chore(release): v1.2.0' --body file:CHANGELOG.md.
- After PR merge, publish to npm using npm publish.
- Log descriptive messages at each step and handle errors with non-zero exit codes.

# Testing
- Add tests in tests/unit/release-pr.test.js mocking fs.promises and child_process.spawn to simulate version bump, changelog update, git, gh, and npm commands.
- Verify that --release triggers the correct sequence and that --dry-run outputs planned steps without executing commands.

# Documentation Updates
- Update README.md with a "Release Workflow" section describing the --release flag and usage examples.
- Update USAGE.md to reference release mode and flags.features/PLOT_RENDERER.md
# features/PLOT_RENDERER.md
# Overview
Finalize and merge the renderPlot implementation from agentic-lib-issue-2907 to enable end-to-end SVG and PNG rendering via both CLI and programmatic API. Add comprehensive unit and integration tests for both output formats. Update USAGE.md and README.md with concrete rendering examples for users.

# CLI Interface
Add and document a --plot command that accepts:

--plot <expression|dataFile>
  Provide a mathematical expression (for example y=sin(x)) or a path to a JSON or CSV data file containing x and y arrays

--format <svg|png>
  Output format, default svg

--output <filePath>
  Path for the generated plot file; extension must match the format

Examples:
repository0-plot-code-lib --plot "y=sin(x)" --format=png --output=plot.png
repository0-plot-code-lib --plot data.json --output=chart.svg

# Programmatic API
Export an async function renderPlot(input, options):

  input: expression string or file path to JSON/CSV data
  options: {
    format: "svg" | "png",
    width?: number,
    height?: number,
    title?: string,
    xLabel?: string,
    yLabel?: string
  }

Returns:
- Promise<Buffer> when format is png
- Promise<string> when format is svg

Validate parameters with Zod, load files with fs.promises, and invoke chartjs-node-canvas for rendering.

# Implementation
- Merge the pending patch from agentic-lib-issue-2907 into src/lib/main.js.
- Refactor core plotting logic into a helper function renderPlot in src/lib/main.js or a new module under src/lib.
- Use mathjs.evaluate or compile for expressions and parse JSON/CSV data when provided.
- Use chartjs-node-canvas to generate SVG or PNG based on options.
- In CLI entrypoint detect --plot, parse inputs, call renderPlot, and write the output file using fs.promises. Exit with non-zero code on errors.
- Ensure robust error handling for invalid formulas, missing files, unsupported formats, and surface descriptive messages.

# Testing

## Unit Tests
- Add tests in tests/unit/plot-renderer.unit.test.js:
  - Mock chartjs-node-canvas and fs.promises to simulate rendering and file operations.
  - Test renderPlot returns a string when format is svg and a Buffer when format is png.
  - Validate that invalid inputs (missing expression and dataFile, unsupported format) cause Promise rejections with descriptive messages.
  - Test CLI invocation mocking process.argv, verify process exits successfully and writes output to correct path.

## Integration Tests
- Add tests in tests/integration/plot-renderer.test.js:
  - Use real chartjs-node-canvas to generate actual SVG and PNG outputs in a temporary directory.
  - Spawn the CLI with expression and sample JSON data. Verify files are created and inspect header bytes:
    - SVG files start with '<svg'
    - PNG buffers begin with the PNG signature bytes (0x89,0x50,0x4E,0x47)
  - Import renderPlot directly and invoke with valid inputs. Assert returned data matches expected type and includes chart elements.
  - Test error scenarios: invalid formula syntax, missing data file, expecting process exit code or Promise rejection.
  - Clean up generated files after tests.

# Documentation Updates
- Update USAGE.md:
  - Add a "Plot Generation" section describing --plot, --format, and --output flags with examples.
  - Show sample CLI commands and expected file output.

- Update README.md:
  - Add a "Plot Generation" section demonstrating both CLI and programmatic API usage:
    - Example import of renderPlot and calling it in code with options.
    - Provide code snippets and explain return types and error handling.
  - Ensure all new flags and API signatures are clearly documented.features/PLOT_SERVER.md
# features/PLOT_SERVER.md
# Overview
Add an HTTP API server mode for dynamic on-demand plot generation. Users can launch a local web service and send plot requests over REST to integrate with dashboards, automation pipelines, or other systems.

# CLI Interface
Introduce two new flags to the CLI:

--serve
  Start the HTTP server instead of executing a one-off plot or batch command.

--port <number>
  Specify the listening port. Default 3000. Can also be set via PORT environment variable.

Examples:
repository0-plot-code-lib --serve
PORT=4000 repository0-plot-code-lib --serve --port 5000

# API Endpoints

POST /plot
  Request Body (application/json):
    expression   A formula string such as y=sin(x) (mutually exclusive with dataFile)
    dataFile     Absolute path to a server-accessible JSON or CSV data file
    format       svg or png (default svg)
    width        Optional canvas width in pixels (default 600)
    height       Optional canvas height in pixels (default 400)
    title        Optional plot title
    xLabel       Optional X axis label
    yLabel       Optional Y axis label
  Response:
    200 OK
      Content-Type: image/svg+xml for svg or image/png for png
      Body: Raw image data (SVG text or binary PNG)
    400 Bad Request
      Content-Type: application/json
      Body: { error: string }
    500 Internal Server Error
      Content-Type: application/json
      Body: { error: string }

GET /health
  Response:
    200 OK
      Content-Type: application/json
      Body: { status: 'ok', uptime: number }

# Implementation

- Detect --serve flag in src/lib/main.js and initialize an Express application in place of CLI logic.
- Use express.json() to parse JSON bodies and reject other content types with 415.
- Define a Zod schema for plot requests matching existing plotTask definitions (expressionOrDataFile union, format, width, height, title, xLabel, yLabel).
- In the /plot handler:
  - Validate the request payload with Zod. On validation failure return 400 with error details.
  - Invoke the programmatic API renderPlot or generatePlot function imported from the same module, passing the validated inputs.
  - On success, set the appropriate Content-Type header and send the raw image data (string for SVG, Buffer for PNG).
  - On errors during rendering or file I/O, catch and return 500 with error message in JSON.
- In the /health handler, return JSON with status 'ok' and process.uptime().
- Ensure the server listens on the configured port and logs a startup message.

# Testing

- Add a test file tests/unit/server.test.js using supertest:
  - Verify GET /health returns status 200 with JSON containing status 'ok' and a numeric uptime.
  - Test POST /plot with a valid expression and default options returns an SVG response and Content-Type image/svg+xml.
  - Test POST /plot with format=png returns a binary response with PNG signature and Content-Type image/png.
  - Test POST /plot with a valid JSON or CSV dataFile path returns the expected image buffer.
  - Test invalid payloads (missing both expression and dataFile, unsupported format) return 400 with descriptive error JSON.
  - Simulate internal errors by mocking renderPlot or fs.promises and verify 500 responses.

# Documentation Updates

- Update README.md to add a new "HTTP API Server" section detailing --serve and --port flags and example invocations.
- Update USAGE.md to include the server mode under CLI usage and document the /plot and /health endpoints with sample curl commands.
- Where the source stands up an HTTP endpoint, document it in the README as part of the public API.