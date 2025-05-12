# Overview
Extend the existing plot engine to support both mathematical expressions and imported data series in the CLI `plot` subcommand, with consistent flags and full test coverage. Retain parity between CLI and HTTP modes and add data-file input support.

# CLI Plot Subcommand
Add or update the `plot` subcommand with these flags:
- --expression <expression>    Required when plotting a computed function in the form y=…
- --range <axis>=<min>:<max>   Required with --expression to define numeric range
- --data-file <path>           Path to a JSON, CSV, or YAML file containing an array of {x,y} points
- --format <svg|png>           Required output image format
- --output <path>              Required file path to write the image
- --width <number>             Optional width of the plot in pixels (default 500)
- --height <number>            Optional height of the plot in pixels (default 300)
- --samples <number>           Number of sample points when using --expression (default 100)
- --derivative <true|false>    Overlay the first derivative curve when using --expression
- --overlay-trendline <true|false>    Overlay regression trendline on the plotted curve
- --palette <CSV>              Optional list of CSS color strings for series

Behavior:
1. Dispatch to a new `runPlotCli` when argv[0] is "plot".
2. Parse and validate flags; error and exit code 1 on invalid combinations or missing required flags.
3. Load or generate data points:
   - Computed mode: parse expression and range, generate points via mathjs and sample count
   - File mode: detect extension (.json, .csv, .yaml/.yml), parse file into points array
4. Build ChartJS configuration including series, axes, labels, overlays (derivative, trendline), and palette
5. Render the chart to SVG or PNG using embedded ChartJS and sharp or an external API fallback
6. Write the binary or UTF-8 output to the specified file and exit code 0 on success

# HTTP Plot Endpoint
Retain the existing HTTP `/plot` endpoint, ensure it accepts the same parameters plus:
- `dataFile` query option in place of `expression` and `range`
- `samples`, `width`, `height`, `derivative`, `overlayTrendline`, `palette`, `encoding`
Validate via zod, generate ChartJS config, render image or base64 JSON, include CORS header, return 400 on errors.

# Implementation
- In `src/lib/main.js`, implement `runPlotCli(argv)` parallel to `runStatsCli`, handling parsing, data loading, chart config, rendering, and file writing.
- Extend the main entry in `main()` to dispatch on `argv[0] === 'plot'` to `runPlotCli(argv.slice(1))`.
- Reuse existing helpers: `parseArgs`, `parseRange`, `generateData`, `computeRegression`, and integrate ChartJS and sharp.
- Add or reuse dependencies: `chart.js` or QuickChart API wrapper, `sharp` for PNG rasterization.

# Testing
- Add unit tests in `tests/unit/plot-cli.test.js` and enhance `tests/unit/plot-generation.test.js`:
  - CLI invocation tests: verify SVG and PNG files are created with expected dimensions and content signature
  - Test expression mode: correct number of data points in output (via metadata or explicit data-file export flag)
  - Test file mode: CSV, JSON, YAML data input yields a valid plot without errors
  - Error cases: missing flags, invalid file, unsupported format
  - HTTP `/plot` tests: valid responses for SVG, PNG, base64 JSON; CORS header; validation errors

# Documentation
- Update `USAGE.md` and `README.md` to document the CLI `plot` subcommand flags, examples for both expression and data-file modes, and note the HTTP `/plot` endpoint.
