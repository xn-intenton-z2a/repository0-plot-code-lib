# Overview

Implement a unified plot pipeline that handles expression parsing, time series generation, exporting data in JSON or NDJSON, and rendering visual plots in SVG or PNG formats, all accessible via the CLI.

# Expression and Range Parsing

Define parseExpression(expressionString) and parseRange(rangeString) in src/lib/main.js. Use zod to validate syntax and enforce that expressions use a single variable and ranges follow the format x=start:end:step. Ensure numeric start, end, nonzero step, and clear error messages on invalid input.

# Time Series Generation

Implement generateTimeSeries(expressionAst, variableName, start, end, step) that safely iterates from start to end according to step rules, computes y for each x, and yields objects with properties x and y. Handle floating-point accumulation to avoid drift.

# Data Export Formats

Support two output modes:

1. JSON: Collect all data points into an array and serialize as a single JSON document.
2. NDJSON: Stream each data point as an individual JSON record separated by newline, with no empty lines, following the NDJSON specification.

Expose a CLI flag --format with values json (default) or ndjson. Use fs.createWriteStream for ndjson with backpressure handling.

# Plot Rendering

Implement renderPlot(data, options) that accepts an array of {x,y}, dimensions (width, height), axis labels, and an output format svg or png. Use chartjs-node-canvas or a D3-based canvas renderer to draw axes, grid lines, and the data line. Return SVG as a string or PNG as a Buffer.

# CLI Integration

Extend main(args) to accept flags:

--expression   the formula to evaluate
--range        the numeric range in x=start:end:step
--output       optional file path (default stdout or default image filename)
--format       json or ndjson (default json)
--plot-format  svg or png (optional)

In data-only mode (--format), write data to stdout or file. When --plot-format is provided, generate the time series first, then call renderPlot and write the result to --output, using process.exit codes: 0 on success, nonzero on validation or I/O errors.

# Tests

Add or update unit tests in tests/unit:

- Parsing: valid and invalid expressions and ranges
- Generation: correct point arrays for known expressions
- JSON output: full array serialization
- NDJSON streaming: newline-delimited records, no trailing newline
- Rendering: SVG output contains an svg element, PNG output is a Buffer starting with PNG signature
- CLI integration: stub process.argv and mock fs and chart renderer, cover both data- and render-only modes, exit codes, and file creation