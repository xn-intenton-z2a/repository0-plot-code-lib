features/PLOT_RENDERING.md
# features/PLOT_RENDERING.md
# PLOT RENDERING

Generate SVG and PNG plots from generated time series data.

# CLI USAGE

The command-line interface will support the following options:

- --expression <expr>    Defines the formula for y in terms of x, e.g. "sin(x) + 2*x".
- --range <start>:<step>:<end>    Specifies the x values from start to end, inclusive, with the given step. Step defaults to 1 if omitted.
- --plot [format]    Optional. Defines plot format: svg or png.
- --file <path>    Required when --plot is set. Defines the output file path for the rendered plot.
- --data-output [format]    Optional. Outputs the raw time series data in json or csv before plotting.

# IMPLEMENTATION DETAILS

1. Add chartjs-node-canvas as a dependency to render charts in Node environment.
2. Update main.js to parse --plot, --file, and --data-output options and adjust behavior accordingly.
3. Reuse the existing time series generation logic to produce x and y arrays.
4. Construct a Chart.js configuration object with x values as labels and y values as data points.
5. Initialize ChartJSNodeCanvas with defined width and height settings.
6. Render the chart to a buffer in the requested svg or png format.
7. Write the buffer to the specified file path.
8. If --data-output is provided, write the raw data to stdout or to a file before rendering the plot.
9. Validate that --file is provided when --plot is used and that --plot format is either svg or png.

# TESTING

- Add unit tests in tests/unit/plot-rendering.test.js to verify:
  - Correct parsing of --plot, --file, and --data-output options.
  - Rendering an SVG buffer and detecting the <svg> tag within the output.
  - Rendering a PNG buffer and detecting the PNG signature bytes at the start.
  - Error thrown when --file is missing while --plot is specified.

Ensure that existing tests remain passing and that new tests cover all core plot rendering paths.features/TIME_SERIES_GENERATION.md
# features/TIME_SERIES_GENERATION.md
# TIME SERIES GENERATION

Generate numerical time series data from a mathematical expression over a specified range of values.

# CLI USAGE

The command-line interface will support the following options:

- --expression <expr>  Defines the formula for y in terms of x, e.g. "sin(x) + 2*x".
- --range <start>:<step>:<end>  Specifies the x values from start to end, inclusive, with the given step. Step defaults to 1 if omitted.
- --output [format]  Optional. Defines output format: json (default) or csv.

# IMPLEMENTATION DETAILS

1. Add mathjs as a dependency to parse and evaluate mathematical expressions safely.
2. In main.js, parse process.argv for expression, range, and output options.
3. Parse the range string into numeric start, step, and end values.
4. Generate an array of x values and compute y for each x using mathjs.
5. Format the results as JSON or CSV and print to stdout.
6. Validate inputs and report clear error messages for invalid expressions or ranges.

# TESTING

- Add unit tests in tests/unit/plot-generation.test.js to verify:
  - Correct parsing of various range strings, including omitted step.
  - Accurate computation of y values for known expressions and ranges.
  - Proper formatting in JSON and CSV formats.

Ensure that existing import and execution tests remain passing and that new tests cover the core time series generation logic.