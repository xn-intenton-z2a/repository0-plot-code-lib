features/RESEED_COMMAND.md
# features/RESEED_COMMAND.md
# Reseed Command

Introduce a reseed subcommand in the CLI to plan or perform a reset of core repository files to their initial seed state. This iteration supports a dry run mode to list which files would be overwritten, without modifying any files.

# Behaviour

When the first argument is "reseed" is provided:
- If the --dry-run flag is present, the tool lists each target file that would be reset.
- Future iterations will honor a --force flag to actually overwrite files with embedded seed content.
- If neither flag is provided, the tool prints a summary hinting at available modes.

# Command Line Interface

repository0-plot-code-lib reseed --dry-run

Flags:
  --dry-run    Show the list of files that would be reset without performing writes.
  --force      (Planned) Overwrite each target file with its initial seed version.

# Examples

Calling the tool in dry-run mode should output lines such as:
  Would reset README.md
  Would reset MISSION.md
  Would reset src/lib/main.js
  Would reset tests/unit/main.test.js
  Would reset tests/unit/plot-generation.test.js
  Would reset package.json

# Testing

Add or update a unit test to invoke main with arguments ["reseed","--dry-run"] and assert that console output contains the list of target file names. Ensure tests mock console.log to capture messages and verify each expected line appears.
features/REGRESSION_COMMAND.md
# features/REGRESSION_COMMAND.md
# Summary

Merge the regression subcommand branch into the main CLI to perform least-squares linear regression on data points derived from expressions or files, and add comprehensive tests and documentation updates.

# Behavior

When the user runs repository0-plot-code-lib regression [flags]:
• If both --expression and --data are provided, log a warning and only use the expression source.
• If --expression is given, sample y values by evaluating the JavaScript expression over [xmin, xmax] with the specified number of samples.
• Otherwise if --data is given, load an array of x,y points from JSON, YAML or CSV file.
• On missing source or invalid input values, print a descriptive error and exit code 1.
• Compute slope, intercept and coefficient of determination (r_squared) using a least-squares algorithm.
• Round numeric results to the configured precision.
• Format output according to --format: table (aligned text), json or csv.
• If --plot-line is set, render an ASCII chart with the regression line overlaid using the existing chart renderer.
• If --output <file> is provided, write the formatted results or chart to a file, otherwise print to console.

# CLI Flags

--expression <string>    JavaScript expression in x to generate y values
--data <filePath>        Path to JSON, YAML, or CSV data file
--xmin <number>          Minimum x value when sampling expressions (default: -10)
--xmax <number>          Maximum x value when sampling expressions (default: 10)
--samples <integer>      Number of sample points (default: 100, must be >=2)
--precision <integer>    Decimal places for numeric output (default: 4)
--format <table|json|csv>  Output format for regression parameters (default: table)
--plot-line              Overlay the regression line on an ASCII chart
--output <file>          File path to write output or chart; omit to print to console
--help                   Show help for regression command and exit

# Implementation Details

1. In src/lib/main.js update main() to route cmd === "regression" to a new function runRegression.
2. Add parseRegressionOptions(args) mirroring other parsers to extract and validate flags, ensuring samples>=2 and required options.
3. Implement runRegression(opts) in src/lib/main.js:
   • Determine data points via generateExpressionData or loadDataFromFile.
   • Validate inputs and on errors use console.error and process.exit(1).
   • Compute means, variances and covariance to derive slope, intercept and r_squared.
   • Round results to opts.precision.
   • If opts.plotLine is true, call renderAsciiChart on data points and on computed line points, merging outputs.
   • Select formatter based on opts.format: use formatTable, JSON.stringify or formatCsv helper.
   • If opts.output is set, write output via fs.writeFileSync and console.log confirmation; otherwise console.log output.
4. Reuse existing helpers: generateExpressionData, loadDataFromFile, renderAsciiChart, formatTable, formatCsv.
5. No additional dependencies required.

# Testing

Add a new file tests/unit/regression.test.js with Vitest covering:
• Expression mode: verify slope, intercept and r_squared for known linear expressions.
• File mode: mock fs.readFileSync for JSON, YAML and CSV and assert formatted output in table, json and csv modes.
• --plot-line: spy on console.log to capture ASCII chart and verify both data markers and regression line.
• --output file export: mock fs.writeFileSync and confirm file content and confirmation log.
• Invalid conditions: missing expression and data, samples<2, unsupported extension, unknown format flag, and assert descriptive error messages and exit code 1.

# Documentation

Update README.md and USAGE.md:
• Under Available Commands add regression with a brief summary.
• In Plot and Stats sections cross-link regression feature.
• Add a Regression section listing flags and sample invocations for table, json, csv and ASCII chart modes.
• Provide example commands such as:
  repository0-plot-code-lib regression --expression "2*x+1" --samples 10 --format json
  repository0-plot-code-lib regression --data data.csv --plot-line --output trend.txtfeatures/HISTOGRAM_COMMAND.md
# features/HISTOGRAM_COMMAND.md
# Summary

Introduce a histogram subcommand to compute frequency distributions of sampled or file-based data sets and render results in ASCII histograms, tables, JSON, or CSV formats. This feature helps users quickly visualize and analyze the distribution of y values (or x values) without external tools.

# Behavior

When the user runs repository0-plot-code-lib histogram [flags]:
• If both --expression and --data are provided, log a warning and use only the expression source.
• If --expression is given, sample y values over the configured domain and number of samples.
• Otherwise if --data is given, load an array of x,y points from JSON, YAML, or CSV file, then extract the y values (or x if --axis x is set).
• Require a --bins flag specifying the number of histogram bins (integer >=1).
• Compute bin boundaries between min and max of the selected values, group values into bins, and count frequencies.
• Format the output according to --format flag: ascii (text-based bar chart), table (aligned text), json or csv.
• If --output <file> is provided, write the formatted results to the file and print confirmation; otherwise print to console.

# CLI Flags

--expression <expr>      Generate series by evaluating a JavaScript expression in x
--data <filePath>        Load points from a JSON, YAML, or CSV file
--axis <x|y>             Select axis for histogram (default y)
--xmin <number>          Minimum x value for sampling (default -10)
--xmax <number>          Maximum x value for sampling (default 10)
--samples <integer>      Number of sample points (default 100)
--bins <integer>         Number of histogram bins (required, must be >=1)
--format <ascii|table|json|csv>  Output format (default ascii)
--output <file>          File path to write histogram; omit to print to console
--help                   Show help for histogram command and exit

# Implementation Details

1. Extend main command router to handle cmd equal to histogram and invoke runHistogram(rest).
2. Create parseHistogramOptions(args) to extract flags, validate required bins and source flags, and enforce samples >=1.
3. Implement runHistogram(opts):
   • Load or generate dataPoints via generateExpressionData or loadDataFromFile.
   • Extract the array of values: y values by default or x values if opts.axis is x.
   • Compute min and max of values and determine bin width = (max - min) / bins.
   • Initialize an array of bin counts of length bins, iterate values to increment the appropriate bin index (edge values fall into first or last bin).
   • Build a result array of { binStart, binEnd, count } objects.
   • Based on opts.format:
     – ascii: render each bin as a line with a range label and a bar of '*' scaled to the maximum count.
     – table: use formatTable helper to display binStart-binEnd and count columns.
     – json: JSON.stringify(result, null, 2).
     – csv: header range,count and rows with values.
   • Write to opts.output via fs.writeFileSync if set, otherwise console.log.
   • On file errors console.error and exit with code 1.

# Testing

- Add tests in tests/unit/histogram.test.js using Vitest:
  • Expression mode: sample a known linear series, compute histogram for a small bins value and assert bin counts.
  • Data file mode: mock fs.readFileSync for JSON, YAML, and CSV, run histogram with various axis options and verify output in ascii, table, json, and csv formats.
  • Edge cases: all values identical, bins equal to one, noisy values on bin boundaries.
  • Error conditions: missing --bins, bins less than 1, missing both --expression and --data, unknown format flag, assert descriptive error messages and process.exit(1).

# Documentation

- Update README.md and USAGE.md under Available Commands to list histogram with brief summary.
- Add a Histogram section showing flags and example invocations:
  repository0-plot-code-lib histogram --expression "x" --bins 5 --format ascii
  repository0-plot-code-lib histogram --data data.csv --axis x --bins 10 --output hist.csv
- Provide sample ASCII histogram and table outputs in documentation.features/TRANSFORM_COMMAND.md
# features/TRANSFORM_COMMAND.md
# Summary

Enhance the transform subcommand to include additional time series operations: scaling and offset along with existing moving average, difference, and cumulative sum transforms. Users can apply these transforms to expression-generated or file-based data sets directly via CLI flags.

# Behavior

When users invoke the CLI with the first argument "transform":
- Parse flags to determine input source:
  • If --expression is provided, sample a mathematical expression over a numeric domain.
  • Else if --data is provided, load an array of { x, y } points from JSON, YAML, or CSV.
- Require a --method flag indicating the transform type: moving-avg, diff, cumsum, scale, or offset.
- For moving-avg, use an integer --window flag (>=2) for window size.
- For scale, require --factor <number> to multiply y values.
- For offset, require --value <number> to add to y values.
- Validate required options and input ranges; on missing or invalid input, print an error and exit code 1.
- Compute a new array of transformed data points maintaining x coordinates:
  • moving-avg: sliding window average over y values, x at center of window.
  • diff: successive difference of y values, x at original points after the first.
  • cumsum: cumulative sum of y values, x unchanged.
  • scale: multiply each y value by the factor, x unchanged.
  • offset: add the value to each y, x unchanged.
- Format the transformed series according to the --format flag: table, json, or csv.
- If --output <file> is provided, write the formatted output to that file and confirm; otherwise print to console.

# CLI Flags

--expression <expr>       Generate points by sampling a JavaScript expression in x
--data <filePath>         Load points from a JSON, YAML, or CSV file
--xmin <number>           Minimum x value for sampling (default -10)
--xmax <number>           Maximum x value for sampling (default 10)
--samples <integer>       Number of sample points (default 100)
--method <transform>      Transform type: moving-avg, diff, cumsum, scale, offset (required)
--window <integer>        Window size for moving-avg (default 5, must be >=2)
--factor <number>         Scaling factor for scale method (required for scale)
--value <number>          Offset value for offset method (required for offset)
--format <table|json|csv> Output format of transformed series (default table)
--output <file>           File path to write results; omit to print to console
--help                    Show help for transform command and exit

# Implementation Details

1. Extend the command router in src/lib/main.js to handle cmd === "transform" and invoke runTransform(rest).
2. Add a parseTransformOptions(args) function to extract and validate flags, ensuring method-specific parameters are present.
3. Implement runTransform(opts):
   - Load or generate dataPoints via generateExpressionData or loadDataFromFile.
   - On load or evaluation errors, console.error and exit with code 1.
   - Compute the transformedPoints array according to opts.method:
     • moving-avg: for i from window-1 to n-1, average y values from i-window+1 to i, set x to center index value.
     • diff: for i from 1 to n-1, compute y[i] - y[i-1], x at original x[i].
     • cumsum: for each index i, y = sum of y[0..i], x unchanged.
     • scale: for each point, y = original y * opts.factor, x unchanged.
     • offset: for each point, y = original y + opts.value, x unchanged.
   - Select formatter based on opts.format:
     • table: use existing formatTable to display series statistics or values.
     • json: JSON.stringify(transformedPoints, null, 2).
     • csv: use existing formatCsvSeries helper.
   - If opts.output is set, write using fs.writeFileSync and console.log confirmation; otherwise console.log output.

# Testing

- Add tests in tests/unit/transform.test.js using Vitest:
  • moving-avg: test various window sizes and error on window <2.
  • diff and cumsum: verify length and values for simple series.
  • scale: use an expression or static data, apply factor and assert y values multiplied.
  • offset: apply positive and negative offsets and check y values shifted correctly.
  • Data file mode for JSON, YAML, and CSV inputs: mock fs.readFileSync and verify transformation.
  • Format options: table header and rows, valid JSON array, CSV header and rows.
  • --output writes file: mock fs.writeFileSync and confirm content and confirmation log.
  • Error conditions: missing method, invalid method, missing factor or value for scale/offset, missing source, parse failures.

# Documentation

- Update README.md and USAGE.md under Available Commands to include transform with new scale and offset examples:
  repository0-plot-code-lib transform --expression "x" --method scale --factor 2 --format json
  repository0-plot-code-lib transform --data data.csv --method offset --value -5 --output adjusted.csv
- Provide sample outputs for scale and offset transforms in table, JSON, and CSV modes.features/README_USAGE_EXAMPLES.md
# features/README_USAGE_EXAMPLES.md
# README Usage Examples

Add clear, runnable examples in README.md illustrating common CLI workflows for the plot and reseed commands.

# Plot Command Examples

Show how to invoke the plot subcommand with flags for chart type, dimensions, and output file:

repository0-plot-code-lib plot --type bar --width 400 --height 300
Generates a bar chart 400x300 and prints a data summary to the console.

repository0-plot-code-lib plot --type scatter --output scatter.png
Generates a scatter plot 640x480 and writes it to scatter.png.

# Reseed Command Examples

Demonstrate dry-run mode to preview files that would be reset:

repository0-plot-code-lib reseed --dry-run
Would reset README.md
Would reset MISSION.md
Would reset src/lib/main.js
Would reset tests/unit/main.test.js
Would reset tests/unit/plot-generation.test.js
Would reset package.json

# Verification

Manually confirm README.md includes each example and matches actual CLI output. Optionally, add a simple test to assert README contains key usage lines.features/ASCII_ART_RENDERING.md
# features/ASCII_ART_RENDERING.md
# Summary

Enhance the existing plot subcommand to render generated or imported data as ASCII art charts directly in the console or write the ASCII output to a file. This feature enables users who supply an --expression flag or --data file to see visual representations in plain text without requiring external GUI tools.

# Behavior

When users invoke the plot command with expression or data options:

- After parsing and generating the array of data points:
  - Scale x and y values into a character grid of specified width and height.
  - Map each point to the nearest grid cell and use characters (e.g., ‘*’ or ‘#’) to represent plotted points.
  - Surround the chart with axes labels and optional grid lines for readability.
- If the --output flag is omitted:
  - Print the ASCII chart to standard output followed by a summary of plotted range and sample count.
- If the --output flag is provided with a file path:
  - Write the ASCII chart text into the specified file and print a confirmation message with the file path.

# CLI Flags

--type <chartType>    Chart style: line, bar, scatter (default line) affects ASCII connection or marker style
--width <number>      Number of characters horizontally in the grid (default 80)
--height <number>     Number of characters vertically (default 24)
--expression <expr>   JavaScript expression in x to generate points
--data <filePath>     Path to JSON, YAML, or CSV data file
--output <file>       Path to write ASCII chart; omit to render to console

# Implementation Details

- In runPlot handler inside src/lib/main.js:
  - After dataPoints are available, invoke a new function renderAsciiChart(dataPoints, opts) to produce a string.
  - Implement renderAsciiChart to:
    - Determine data bounds (xmin, xmax, ymin, ymax).
    - Compute grid cell size based on width and height.
    - Initialize a 2D array of spaces and place markers according to scaled indices.
    - Join rows into lines prefixed by y-axis labels, add an x-axis line at the bottom with ticks.
  - If opts.output is set, use fs.promises.writeFile to create or overwrite the file with the chart text; otherwise console.log the chart.
- Reuse existing flag parsing and expression/data loading logic.

# Testing

- In tests/unit/plot-generation.test.js:
  - Mock console.log or fs.writeFile to capture the ASCII output string.
  - Provide a simple expression (e.g., x or x^2) over a small sample count and assert that rendered lines contain expected markers at known rows and columns.
  - Test --output flag writes a file by mocking fs.writeFile and verifying correct content.
  - Ensure error paths (zero samples or empty data array) throw or print descriptive messages.

# Documentation

- Update README.md under Plot Command Examples:
  - Show a small 10x5 ASCII chart for expression "x" with width 10, height 5.
  - Show writing to parabola.txt and include a snippet of the ASCII file content.
- Add a note in USAGE.md describing ASCII rendering behavior and default console output dimensions.
features/CONFIG_FILE_SUPPORT.md
# features/CONFIG_FILE_SUPPORT.md
# Summary
Add support for external configuration files to define default CLI options. Users can create a .plotrc.json or .plotrc.yaml file in the working directory or in their home directory to customize chart type, dimensions, data source, expression settings, and output preferences.

# Behavior
When the CLI is invoked:
1. If the --config flag is provided, attempt to load the specified file.
2. Otherwise, look for .plotrc.json, .plotrc.yaml, or .plotrc.yml in the current working directory.
3. If none is found, search for .plotrc.json or .plotrc.yaml in the user’s home directory.

Upon finding a config file, parse its contents and merge the values with the default flag settings. CLI flags always override config file values. If parsing fails or the config violates schema, print a descriptive error and exit with code 1.

# CLI Flags
--config <filePath>    Path to a configuration file (JSON or YAML) to load default CLI options. CLI flags override values defined in the config file.

# Implementation Details
- Use fs.promises to check for file existence and read file contents.
- Detect file format by extension: .json for JSON.parse, .yaml/.yml for js-yaml.
- Define a zod schema that matches existing plot command flags: type, width, height, data, expression, xmin, xmax, samples, output.
- Merge config object with default settings, then override with parsed CLI flags before invoking handlers.
- Update src/lib/main.js to integrate config loading logic before flag parsing.

# Testing
- Mock fs.readFile and fs.stat to simulate presence of JSON and YAML config files. Verify that main() correctly merges config values and invokes plot or reseed handlers with expected options.
- Test invalid config content: mock malformed JSON or YAML and assert main() logs an error message and exits with code 1.
- Test precedence: config sets type and width; CLI flag sets type only. Verify that width comes from config and type from CLI.

# Documentation
- In README.md, add a "Configuration File" section with an example .plotrc.json:
{
  "type": "scatter",
  "width": 300,
  "height": 200,
  "data": "measurements.csv"
}
- Show example invocations:
repository0-plot-code-lib plot --config .plotrc.json
repository0-plot-code-lib plot --config user-settings.yml --type barfeatures/DOCS_TESTS.md
# features/DOCS_TESTS.md
# Documentation Updates

Update the user-facing guides to include comprehensive coverage of the stats, serve, regression, and transform subcommands.

1. README.md
   - Under Available Commands, add entries for:
     • regression: Perform least-squares regression on data or expressions
     • transform: Apply series transforms (moving-avg, diff, cumsum, scale, offset)
     • serve: Start the HTTP API server for plot and stats endpoints
   - Under Plot Subcommand, add brief cross-links to regression and transform subcommands.
   - Add new sections for Regression and Transform usage:
     • List CLI flags, describe behavior, and show example invocations for table, JSON, CSV, and ASCII outputs
   - Add a Serve Subcommand section demonstrating:
     • repository0-plot-code-lib serve --port 3000
     • Explanation of HTTP GET /plot and /stats endpoints

2. USAGE.md
   - In Commands list, include regression and transform alongside plot, stats, reseed, serve.
   - Add new sections for regression and transform options, matching patterns in plot and stats:
     • --expression, --data, --xmin, --xmax, --samples, --format, --output, and method-specific flags (--plot-line for regression, --method/--window/--factor/--value for transform)
   - Provide usage Examples:
     • repository0-plot-code-lib regression --expression "2*x+1" --samples 10 --format json
     • repository0-plot-code-lib transform --data data.csv --method scale --factor 2 --output scaled.csv
   - Ensure Serve command example and HTTP endpoints section are present.

# Testing Additions

Add new Vitest unit tests to ensure regression and transform subcommands are fully covered.

1. tests/unit/regression.test.js
   - Expression mode: verify computed slope, intercept, r_squared for simple linear functions.
   - Data file mode: mock fs.readFileSync for JSON, CSV, YAML inputs and assert correct output for table, JSON, CSV formats.
   - --plot-line behavior: spy on console.log to capture ASCII chart and assert markers and line overlay.
   - --output file export: mock fs.writeFileSync and confirm written content and confirmation message.
   - Error conditions: missing source, samples<2, unsupported extension, unknown format flag.

2. tests/unit/transform.test.js
   - moving-avg: test window sizes and error on window<2.
   - diff and cumsum: verify lengths and values for simple series.
   - scale: apply a factor and assert updated y values.
   - offset: apply offsets (positive/negative) and assert shifts.
   - Data file modes: mock fs.readFileSync for each supported extension and verify transforms.
   - Format options: table, JSON, CSV outputs.
   - --output file export: mock fs.writeFileSync and confirm file writes and console confirmation.
   - Error conditions: missing --method, invalid method, missing factor/value for scale/offset, missing source, parse failures.

# Implementation Details

No changes to src/lib/main.js or dependencies are required. Documentation files (README.md, USAGE.md) and new test files will be created or updated. Ensure consistency with existing code style and Vitest testing patterns.
features/SVG_PNG_EXPORT.md
# features/SVG_PNG_EXPORT.md
# Summary
Add support for exporting plots as SVG and PNG image files using ChartJS server-side rendering and the sharp library. Users can supply --svg or --png flags to generate vector and raster graphics directly from the CLI.

# Behavior
When users invoke the plot command with --svg <file.svg>:
- Parse expression or data file using existing logic.
- Render the chart using Chart.js on a headless canvas into an SVG buffer.
- Validate the file path ends with .svg, write the SVG buffer to the file, and print a confirmation message.

When users invoke the plot command with --png <file.png>:
- Parse expression or data file using existing logic.
- Render the chart into an SVG buffer using Chart.js.
- Validate the file path ends with .png, convert the SVG buffer to a PNG buffer with sharp, write the PNG file, and print a confirmation.

If both --svg and --png are provided, print an error and exit code 1. If neither is provided, fall back to existing ASCII rendering behavior.

# CLI Flags
--svg <file.svg>    Path to write the SVG chart file. Must end with .svg.
--png <file.png>    Path to write the PNG chart file. Must end with .png.

# Implementation Details
1. Add dependencies:
   - chart.js
   - chartjs-node-canvas
   - sharp
2. In parsePlotOptions in src/lib/main.js:
   - Recognize --svg and --png flags and store opts.svg and opts.png.
3. In runPlot in src/lib/main.js, before ASCII chart logic:
   - If opts.svg or opts.png is set:
     • If both are set, console.error and process.exit(1).
     • Generate dataPoints via generateExpressionData or loadDataFromFile.
     • Import ChartJSNodeCanvas from chartjs-node-canvas.
     • Create an instance: const canvas = new ChartJSNodeCanvas({ width: opts.width, height: opts.height, chartCallback: Chart => { } });
     • Build a Chart.js configuration object with labels from dataPoints x values and a single dataset for y values.
     • Render an SVG buffer: await canvas.renderToBuffer(config, 'image/svg+xml').
     • If opts.svg is set:
         - Validate file extension .svg.
         - Write the SVG buffer to opts.svg using fs.writeFileSync or fs.promises.writeFile.
         - console.log("Wrote SVG chart to " + opts.svg).
         - return from runPlot.
     • If opts.png is set:
         - Validate file extension .png.
         - Use sharp(svgBuffer).png().toFile(opts.png).
         - On success console.log("Wrote PNG chart to " + opts.png).
         - On error console.error and process.exit(1).
4. Update package.json to include new dependencies.

# Testing
- In tests/unit/plot-generation.test.js:
  • Mock or spy on ChartJSNodeCanvas.renderToBuffer, fs.writeFileSync, and sharp(...).toFile.
  • Test main(["plot","--expression","x*2","--samples","5","--svg","out.svg"]): verify writeFileSync called with the correct path and content, and console.log confirmation.
  • Test error when svg path does not end in .svg: expect process.exit and error message.
  • Test main with --png out.png: verify sharp is called with the SVG buffer and toFile is invoked correctly, and console.log prints confirmation.
  • Ensure fallback to ASCII rendering remains unaffected when neither flag is provided.

# Documentation
- Update README.md under Plot Subcommand examples:
  repository0-plot-code-lib plot --expression "x^2" --svg parabola.svg
  # Wrote SVG chart to parabola.svg

  repository0-plot-code-lib plot --data data.csv --png chart.png
  # Wrote PNG chart to chart.png
- Update USAGE.md to document the new --svg and --png flags with examples and note extension requirements.features/STATS_COMMAND.md
# features/STATS_COMMAND.md
# Summary

Add a new "stats" subcommand to the CLI that computes descriptive statistics over expression-generated or file-based data sets and outputs results in table, JSON, or CSV formats. Support writing output to a file or printing to the console.

# Behavior

When users invoke the CLI with the first argument "stats":

- Parse flags to determine data source:
  - If --expression is provided, sample a mathematical expression over a numeric domain.
  - Otherwise if --data is provided, load an array of { x, y } points from JSON, YAML, or CSV.
- Validate that at least one source is present; on missing or invalid input, print a descriptive error and exit with code 1.
- Compute statistics (min, max, mean, median, standard deviation) separately for x and y values using the existing computeStatistics helper.
- Format the resulting statistics object according to the --format flag:
  • table: aligned columns printed to console
  • json: structured JSON string
  • csv: header row and comma-separated values
- If --output <file> is provided, write the formatted output to that file and print a confirmation message.
- If --output is omitted, print results to standard output.

# CLI Flags

--data <filePath>        Load points from a JSON, YAML, or CSV file
--expression <expr>       Generate points by sampling a JavaScript expression in x
--xmin <number>          Minimum x value for sampling (default -10)
--xmax <number>          Maximum x value for sampling (default 10)
--samples <integer>      Number of sample points (default 100)
--precision <integer>    Number of decimal places for numeric output (default 4)
--format <table|json|csv> Output format (default table)
--output <file>          File path to write results; omit to print to console
--help                   Show help for stats command and exit

# Implementation Details

1. Update src/lib/main.js:
   - Extend the command router in main() to handle cmd === "stats" and invoke runStats(rest).
   - Add a parseStatsOptions(args) function mirroring parsePlotOptions that extracts flags above and handles validation of mutually exclusive or required flags.
   - Implement runStats(opts):
     • Load or generate dataPoints: call generateExpressionData when opts.expression is set, otherwise call loadDataFromFile(opts.data).
     • On load or evaluation errors, console.error the message and exit with process.exit(1).
     • Call computeStatistics(dataPoints) to obtain a stats object.
     • Select a formatter based on opts.format:
         - formatTable(stats, opts.precision)
         - JSON.stringify(stats, null, 2)
         - formatCsv(stats)
     • If opts.output is set, use fs.promises.writeFile to write the formatted string, then console.log a confirmation. Otherwise console.log the formatted output.
     • Ensure exit codes and error messages follow existing conventions.

2. Add helper formatters in src/lib/main.js or a new helper module:
   - formatTable(stats, precision): produce an aligned text table with headers and values.
   - formatCsv(stats): output a header row of statistic names and a single data row.

# Testing

- Create tests/unit/stats.test.js using Vitest:
  • Test default table output for expression mode: invoke main(["stats","--expression","x^2","--samples","5"]) and assert console.log prints a table with correct numeric values.
  • Test JSON and CSV formats: run main with --format json and --format csv and parse the output or split lines to assert expected fields and precision.
  • Test file export: mock fs.promises.writeFile, invoke main with --output stats.txt, and confirm writeFile receives correct content and console.log confirms path.
  • Test error conditions: missing both --data and --expression, invalid format value, file load failures; assert console.error is called with descriptive message and process.exit(1) occurs.

# Documentation

- Update README.md under Available Commands to list stats with a brief summary.
- In README.md and USAGE.md, add a new section for the stats subcommand:
    repository0-plot-code-lib stats --expression "x^2" --samples 5 --format json
    repository0-plot-code-lib stats --data data.csv --format csv --output summary.csv
  Include sample output for table, JSON, and CSV modes.
- Document each flag in the Usage section and note default values and precedence.
features/HTTP_SERVER.md
# features/HTTP_SERVER.md
# Summary

Expand the existing serve subcommand to fully support POST requests for both /plot and /stats endpoints, enabling clients to submit JSON or CSV data directly in the request body and receive chart or statistics responses. Preserve backward compatibility with existing GET behavior.

# Behavior

POST /plot
- Accept request bodies with Content-Type application/json (array of { x, y } objects) or text/csv (header row optional, two columns x,y).
- Optional query parameters type, width, height, and outputFormat override defaults.
- When outputFormat=ascii, respond with an ASCII art chart (text/plain). Otherwise default to JSON response of the underlying data points (application/json).
- On invalid content type, malformed JSON or CSV parsing errors, or missing/invalid records, respond with 400 and a JSON error message { error: "..." }.

POST /stats
- Accept JSON or CSV payloads as above.
- Compute descriptive statistics (min, max, mean, median, stddev) for x and y values. Respond with application/json containing keys x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev.
- On parsing or validation errors, respond with 400 and a JSON error message.

GET /plot and GET /stats
- Retain existing GET behavior unchanged (plot with expression and optional ASCII, stats with expression).

# Implementation Details

- In createServer inside src/lib/main.js:
  1. Use express.json() to parse JSON bodies and express.text({ type: 'text/csv' }) to capture CSV bodies.
  2. Add app.post('/plot', handler) and app.post('/stats', handler).
  3. In POST handlers:
     - Determine content type via req.is('application/json') or req.is('text/csv').
     - For JSON, assign dataPoints = req.body.
     - For CSV, split req.body into lines, skip header if includes x and y, parse each row to numbers.
     - Validate dataPoints is a non-empty array of objects with numeric x and y; on failure return res.status(400).json({ error: message }).
     - For /plot:
       • If req.query.expression present and no body, fallback to expression sampling logic.
       • Otherwise use parsed dataPoints.
       • If req.query.outputFormat === 'ascii', generate ASCII chart via renderAsciiChart; return text/plain chart.
       • Otherwise return application/json dataPoints.
     - For /stats:
       • Call computeStatistics(dataPoints) and return application/json stats object.

# Testing

- Extend tests/unit/http-api.test.js with Supertest:
  • POST /plot with JSON body: expect 200 JSON array or ASCII chart when outputFormat=ascii.
  • POST /plot with CSV text: verify correct parsing and response.
  • POST /stats with JSON and CSV bodies: expect 200 JSON stats.
  • Error cases: malformed JSON, invalid CSV rows, missing body or unsupported content-type => 400 and JSON error.

# Documentation

- Update README.md and USAGE.md:
  • Under HTTP API endpoints, add POST examples:
    curl -X POST -H "Content-Type: application/json" --data '[{"x":0,"y":0},{"x":1,"y":1}]' http://localhost:3000/plot
    curl -X POST -H "Content-Type: text/csv" --data 'x,y
0,0
1,1' http://localhost:3000/stats
  • Include expected response snippets.features/PLOT_COMMAND.md
# features/PLOT_COMMAND.md
# Summary

Enhance the existing plot subcommand to support exporting interactive HTML charts in addition to ASCII art and image files. Users can supply an --html flag to generate a standalone web page embedding Chart.js for dynamic visualization of expression-generated or external data.

# Behavior

When users invoke the plot command:

- If the --html flag is provided with a path ending in .html:
  - Parse expression or load data from JSON, YAML, or CSV as before.
  - Build an HTML document string:
    • Include a DOCTYPE, html, head, and body structure.
    • Add a canvas element with width and height attributes matching options.
    • Load Chart.js from a public CDN via a script tag.
    • Embed a script that constructs a Chart instance on the canvas using the selected chart type and the data points.
  - Write the HTML string to the specified file path and print a confirmation message "Wrote HTML chart to <file>".
  - Exit successfully.

- Otherwise, fall back to existing behavior:
  - Generate data from an expression or file.
  - Render ASCII art charts via renderAsciiChart and output to console or file when --output is set.

# CLI Flags

--expression <expr>    JavaScript expression in x to generate y values (expression mode overrides data mode)
--data <filePath>      Path to JSON, YAML, or CSV data file
--type <chartType>     Chart style: line, bar, scatter (default: line)
--xmin <number>        Minimum x value for sampling expressions (default: -10)
--xmax <number>        Maximum x value for sampling expressions (default: 10)
--samples <integer>    Number of sample points (default: 100)
--width <number>       Width in pixels for HTML canvas or columns for ASCII (default: 640)
--height <number>      Height in pixels for HTML canvas or rows for ASCII (default: 480)
--output <file>        Path to write rendered ASCII chart; omit to render to console
--html <file.html>     Path to write interactive HTML chart (takes precedence over --output)
--help                 Show help for plot command and exit

# Implementation Details

1. Update parsePlotOptions in src/lib/main.js to recognize an --html flag and store its value if provided.
2. In runPlot handler:
   - After parsing opts, if opts.html is set:
     • Validate that the path ends in .html; if not, console.error and process.exit(1).
     • Generate or load dataPoints via generateExpressionData or loadDataFromFile.
     • Construct a string htmlContent:
         - A DOCTYPE and html structure with head and body.
         - A canvas element with id "chartCanvas" and inline width and height.
         - A script tag loading Chart.js from https://cdn.jsdelivr.net/npm/chart.js.
         - A script block that:
             ▶ Collects labels from dataPoints x values.
             ▶ Collects data array from dataPoints y values.
             ▶ Creates new Chart(document.getElementById('chartCanvas'), { type, data: { labels, datasets: [{ label: 'Series', data }] }, options: {} });
     • Use fs.writeFileSync(opts.html, htmlContent, 'utf8') to write the file.
     • console.log("Wrote HTML chart to " + opts.html).
     • return.
   - Existing ASCII path remains unchanged.

3. Reuse loadDataFromFile and generateExpressionData helpers without modification.

# Testing

- In tests/unit/plot-generation.test.js:
  • Mock fs.readFileSync to provide sample data for --data tests.
  • Spy on fs.writeFileSync and console.log for HTML export tests.
  • Add a test: invoke main(["plot","--expression","x*2","--samples","5","--html","out.html"]), assert writeFileSync was called with "out.html" and content contains '<canvas', 'new Chart'.
  • Test error when path does not end with .html: expect process.exit and error message.

# Documentation

- Update README.md under Plot Subcommand:
  • Document --html flag and note that it generates an HTML file using Chart.js.
  • Provide an example:
      repository0-plot-code-lib plot --expression "x^2" --xmin 0 --xmax 5 --samples 50 --html parabola.html
      # Wrote HTML chart to parabola.html

- Update USAGE.md under Options for plot:
  • Add --html <file.html> description.
  • Show example invocation and note interactive capabilities in browser.features/CLI_COMMAND_ROUTER.md
# features/CLI_COMMAND_ROUTER.md
# CLI Command Router

Implement a command router in the main CLI entrypoint to inspect the first argument and dispatch to the corresponding subcommand handler, unifying plot and reseed workflows under a single consistent interface.

# Behavior

When invoked with no arguments:
- Print a help summary listing available commands (plot, reseed) and brief descriptions.
- Exit with code 0.

When the first argument is "plot":
- Parse flags using existing PLOT_COMMAND definitions (--type, --width, --height, --data, --output).
- Invoke the internal plot handler in src/lib/main.js to generate an ASCII chart or write to file.
- On success, print summary of output or written file path and exit with code 0.
- On errors (flag validation, file read/write), print descriptive error and exit with non-zero code.

When the first argument is "reseed":
- Forward remaining flags to the reseed implementation (--dry-run, --force planned).
- In dry-run mode, list target files that would be reset and exit with code 0.
- In future force mode, overwrite files and report each write operation.

# Implementation Details

- Enhance src/lib/main.js to inspect args[0] and route to handlers rather than unconditionally logging inputs.
- Use zod schema definitions to validate subcommand names and accepted flags, falling back to help output on unknown commands.
- Maintain ESM compatibility and preserve existing shebang invocation.
- Ensure correct exit codes and consistent console output formatting for downstream scripts.

# Testing

- Update tests/unit/plot-generation.test.js to call main(["plot","--type","bar","--data","data.json"]), mock fs.readFile, and assert that console.log is invoked with an ASCII bar chart representation.
- Add tests in tests/unit/plot-generation.test.js for help output when no args and for error handling on invalid JSON/YAML input.
- Extend tests/unit/main.test.js to include a test for reseed dry-run: main(["reseed","--dry-run"]) and assert listing of target files.

# Documentation

- Update README.md to include top-level CLI usage examples invoking both plot and reseed subcommands, matching actual console output.
- Ensure USAGE.md reflects the new routing behavior and provides example snippets for help, plot, and reseed commands.features/STDIN_SUPPORT.md
# features/STDIN_SUPPORT.md
# Summary
Add support for reading data from standard input (stdin) for file-based CLI commands, enabling users to pipe JSON, YAML, or CSV data directly into plot, stats, transform, and regression subcommands.

# Behavior
- Recognize --data '-' as an instruction to read data from stdin instead of a filesystem path.
- Require a new --data-format flag when --data '-' is used to specify the data format: json, yaml, or csv.
- When --data '-' is present:
  • Read all incoming data synchronously via fs.readFileSync(0, 'utf8').
  • Parse the raw input based on --data-format: use JSON.parse for json, yaml.load for yaml/yml, or CSV parsing logic from loadDataFromFile for csv.
  • Validate that the parsed result is an array of { x: number, y: number } objects; on failure print a descriptive error and exit code 1.
- After parsing, proceed with existing command logic (ASCII rendering, statistics computation, transformations, regression) using the stdin-supplied data.

# CLI Flags
--data <filePath|->        Path to JSON, YAML, or CSV data file, or '-' to read from stdin.
--data-format <json|yaml|csv>  Required when --data '-' is specified to indicate the format of piped data.

# Implementation Details
1. Extend parsePlotOptions, parseStatsOptions, parseTransformOptions, and parseRegressionOptions to accept opts.data === '-' and capture opts.dataFormat.
2. In runPlot, runStats, runTransform, and runRegression, before calling loadDataFromFile:
   - If opts.data is '-', call fs.readFileSync(0, 'utf8') to obtain the raw input string.
   - Based on opts.dataFormat, parse the string:
     • json: JSON.parse(raw)
     • yaml: yaml.load(raw)
     • csv: reuse the CSV parsing logic (split lines, detect header, parse numbers)
   - Validate the resulting array and map to { x, y } objects.
3. On missing --data-format with --data '-', print an error and exit code 1.
4. No new dependencies are required; reuse fs, js-yaml, and existing CSV parsing logic.

# Testing
- Use Vitest to mock fs.readFileSync with file descriptor 0 and simulate JSON, YAML, and CSV inputs.
- Write tests for each subcommand (plot, stats, transform, regression) with --data '-' and the appropriate --data-format, asserting correct behavior (charts, stats, transforms, regression results).
- Test error conditions: missing --data-format, unsupported data-format values, malformed input, validation failures, and verify console.error messages and process.exit(1).