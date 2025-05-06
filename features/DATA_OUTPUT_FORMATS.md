# Overview
Extend data output formats to include JSON streaming for large datasets alongside existing JSON array, NDJSON, and CSV streaming, and enhance performance benchmarking.

# Source File Updates
1. Use stream/promises pipeline from stream/promises to implement serializeDataStream for all formats. Accept format, bufferSize, encoding, and streamJson options.
2. Add CLI flag stream-json (boolean, default false) to enable streaming JSON arrays. When enabled, write opening bracket, then use Transform to serialize each point comma separated, then write closing bracket.
3. Refactor JSON array output in main to delegate to serializeDataStream when stream-json is enabled, ensuring backpressure and low memory usage.
4. Retain --buffer-size option (default 16384) and --benchmark flag. When benchmarking, run warmup and measured phases via process.hrtime and report throughput in points per second.
5. Export serializeDataStream(data, options) that returns a Readable stream producing serialized data in json, ndjson, csv, or json-array modes.

# Tests
1. Add unit tests for serializeDataStream with format=json-array and streamJson=true. Use PassThrough with small highWaterMark to simulate backpressure and verify output: opening bracket, comma-separated JSON objects, closing bracket.
2. Add tests for --stream-json flag in CLI integration. Mock process.stdout.write to capture streamed chunks and assert correct sequence and formatting.
3. Ensure existing tests for JSON array output without streaming continue to pass and JSON output matches pretty-printed array when stream-json is false.

# Documentation
Update README.md and USAGE.md to document --stream-json option with example commands for large datasets. Show sample usage of serializeDataStream in code for streaming JSON integration into other applications.
