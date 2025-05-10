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