# Overview
Extend the library and CLI to deliver three robust output modes: streaming JSON arrays, newline-delimited JSON (NDJSON), and fully compliant CSV output with optional header rows. Ensure low-memory operation via backpressure support and provide a benchmarking option to measure throughput.

# Source File Updates
1. In src/lib/main.js import pipeline from stream/promises and create serializeDataStream(dataIterator, { format, bufferSize, csvHeader }) that returns a Readable stream.
   - For json-stream mode, write opening bracket, stream each record as JSON with comma separators, then write closing bracket.
   - For ndjson mode, write each record as a JSON string followed by newline.
   - For csv mode, implement proper quoting according to RFC4180, use CRLF line endings, and include a header row when csvHeader is true.
   - Honor bufferSize to control backpressure and highWaterMark behavior.
2. Update CLI argument parsing to support:
   - --format with choices json, json-stream, ndjson, csv (default json).
   - --csv-header boolean flag (default false).
   - --buffer-size number flag (default 16384).
3. Replace existing JSON and NDJSON loops in main with calls to serializeDataStream, piping into process.stdout or file streams.
4. Export serializeDataStream for programmatic usage.

# Tests
1. Unit tests for serializeDataStream:
   - Verify JSON-stream output begins with [ and ends with ], with comma separators.
   - Verify NDJSON output lines match expected JSON records.
   - Verify CSV output quotes fields containing special characters, uses CRLF, and includes header when requested.
   - Simulate backpressure using a PassThrough stream with small highWaterMark.
2. CLI integration tests:
   - Assert --format csv and --csv-header produce correct CSV file or stdout.
   - Assert --format json-stream produces array in streaming fashion.
   - Assert --benchmark flag runs warmup and measured phases and reports points per second.

# Documentation
1. Update USAGE.md to illustrate all four formats with example commands and describe bufferSize and csvHeader options.
2. Update README.md to document new formats, streaming behavior, and benchmarking capability.