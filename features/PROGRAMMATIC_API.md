# PROGRAMMATIC_API

## Purpose
Extend and consolidate the programmatic interface to cover data serialization in an industry-standard format in addition to existing SVG and PNG generation. Enable users to produce newline-delimited JSON (NDJSON) for large or streaming data workflows, while preserving all existing capabilities.

# Behavior

1. Expose getTimeSeries(expression, range, options) as before, returning Promise<array of { x, y }>.
2. Continue exporting generateSVG(data, width, height, title) for inline chart markup.
3. Continue exporting generatePNG(data, width, height, title) returning Promise<PNG Buffer>.
4. Introduce serializeNDJSON(data) that returns a string where each point is serialized as one JSON object per line, following the NDJSON specification.
5. Export serializeNDJSON alongside serializeCSV and serializeJSON for programmatic consumption.
6. Update CLI timeseries mode to accept a new format value ndjson. When --format ndjson is passed:
   • mainCLI will call serializeNDJSON(data) and return its output as a string.
   • --output-file behavior remains consistent, writing the NDJSON output to disk if specified.
7. Tests must verify:
   • serializeNDJSON outputs one JSON object per line matching data points.
   • mainCLI(['--expression', expr, '--range', range, '--points', pts, '--format', 'ndjson']) returns valid NDJSON and writes files correctly.
8. Document NDJSON support in README under CLI Usage (Formats) and in Programmatic API examples.

# Implementation

- In src/lib/main.js:
  • Implement function serializeNDJSON(data) that maps data to JSON.stringify(point) and joins with newline.
  • Add serializeNDJSON to the module exports.
  • In mainCLI, extend format validation to include ndjson, invoking serializeNDJSON.

- Tests (tests/unit/plot-generation.test.js and tests/unit/main.test.js):
  • Add unit tests for serializeNDJSON with sample data.
  • Add CLI tests covering --format ndjson with and without --output-file.

- Documentation:
  • README.md: under CLI Usage > Timeseries Options, list ndjson as supported format.
  • USAGE.md: show example usage for --format ndjson and import/usage of serializeNDJSON in Programmatic API section.
