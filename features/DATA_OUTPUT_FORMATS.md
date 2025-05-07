# Overview
Extend the library and CLI to deliver three robust output modes—streaming JSON arrays, newline-delimited JSON (NDJSON), and fully compliant CSV output with optional header rows—and add a benchmarking mode to measure throughput.

# Source File Updates
1. In src/lib/main.js import performance from perf_hooks (or use process.hrtime.bigint) and implement a new function benchmarkSerialize:
   - Accepts data iterable and serialize options plus warmup count and iteration count.
   - Runs warmup phase by piping the first warmupRecords through serializeDataStream without timing.
   - Runs measured phase by piping the full stream through serializeDataStream, timing start and end, counting records.
   - Calculates duration in milliseconds and throughput in records per second.
   - Returns or logs a summary object.
2. In serializeDataStream add optional onRecord callback in options to be called per record for accurate counting.
3. Update main(args) to parse new CLI flags:
   - --benchmark boolean flag (default false).
   - --warmup number flag (default 100).
   - --iterations number flag (default 1).
   When --benchmark is true, invoke benchmarkSerialize with parsed parameters and output summary instead of regular data output.

# CLI Options
- --format <json|json-stream|ndjson|csv>: output format (unchanged).
- --buffer-size <number>: highWaterMark for stream (unchanged).
- --csv-header: include header row (unchanged).
- --benchmark: enable benchmarking mode to measure streaming throughput.
- --warmup <number>: number of records to process before measured phase (default 100).
- --iterations <number>: how many times to repeat the measured phase to average throughput (default 1).

# Tests
1. Unit tests for benchmarkSerialize:
   - Mock a small data iterable of known length, time short sleeps or stubs, verify returned summary has correct records, positive duration, and throughput > 0.
   - Test behavior when warmup exceeds total records (falls back gracefully).
2. Integration tests for CLI:
   - Spy on console.log or console.error to verify that invoking CLI with --benchmark outputs a summary line containing records processed, total time in ms, and throughput in records/sec.
   - Combine --format json-stream with --benchmark and assert data still streams correctly before summary.

# Documentation
1. Update USAGE.md to add a Benchmarking section with example commands:
   repository0-plot-code-lib --expression "x+1" --range "x=0:1000:1" --format ndjson --benchmark --warmup 50 --iterations 3
   and sample output summary.
2. Update README.md under Features to describe the new benchmarking flags and purpose.