# Overview
Extend the existing Stats engine feature to implement export-data and export-format flags in the CLI for raw x,y data export in CSV, JSON, and YAML formats while retaining summary, histogram, and regression capabilities. Additionally introduce a new data smoothing option to apply a moving average filter to the generated or loaded data before computing statistics.

# CLI Raw Data Export
Introduce two new flags:
- --export-data <path>    Path to write raw x,y data points. Use dash or omit path to write to stdout.
- --export-format <csv|json|yaml>    Serialization format for raw data export. Default inferred from file extension or json.

Behavior when --export-data is provided:
1. Parse input by expression and range or by dataFile as usual.
2. Generate or load raw points into an array of objects with keys x and y.
3. If --smooth <window> is provided (integer ≥ 1), apply a moving average smoothing over y values with the given window size, resulting in a new array of smoothed points.
4. Serialize points only, skipping summary, histogram, and regression blocks:
   - csv: emit header line x,y followed by comma separated rows
   - json: emit JSON array of point objects
   - yaml: emit YAML sequence of mappings using js-yaml dump
5. Write serialized output to the specified file or to stdout and exit with code 0.
6. If --export-data is provided without expression or dataFile, exit with code 1 and print an error message.

# CLI Data Smoothing Option
Introduce a new flag for smoothing raw data prior to any computation:
- --smooth <number>    Integer window size for moving average smoothing of y values. Default is no smoothing.

Behavior when --smooth is provided:
1. After generating or loading raw points, compute a moving average over y values using the specified window size. The smoothed y for point i is the average of y values from i - floor(window/2) to i + floor(window/2), clipped at boundaries.
2. Use the smoothed points array for all downstream operations: computeSummaryStats, computeHistogram, computeRegression, and any exports.

# HTTP /stats Smoothing Support
Extend the GET /stats endpoint to accept a new query parameter:
- smooth (optional): integer window size for moving average smoothing prior to statistics calculation.

Behavior:
1. Parse and validate the smooth parameter as a positive integer when present.
2. After generating or loading points, apply smoothing before computing summary statistics, histogram, or regression.
3. Preserve existing JSON and plain-text response behaviors, including histogram and trendline flags.

# Testing
Add unit and integration tests to cover the new smoothing behavior alongside existing functionality:

CLI Unit Tests:
- Smooth JSON stats: invoke runStatsCli with --expression y=x --range x=0:1 --samples 5 --smooth 3 and verify summary matches smoothed data.
- Smooth CSV export: invoke runStatsCli with --dataFile data.json --export-data - --export-format csv --smooth 5 and assert CSV lines correspond to smoothed values.
- Error case: --smooth zero or non-integer should exit with code 1 and an error message.

HTTP Integration Tests:
- GET /stats?expression=y=x&range=x=0:10&samples=11&smooth=3 expect status 200 and JSON stats computed on smoothed points.
- GET /stats?smooth=abc without valid integer expect status 400 with JSON error.

# Documentation
Update usage documentation and README under the Stats section:
- Document --smooth flag, its window parameter, and examples of smoothing in both CLI and HTTP modes.
- Clarify that smoothing is applied before all statistical computations and exports.
- Provide sample commands demonstrating smoothing combined with histogram, trendline, and raw export options.