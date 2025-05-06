# Overview
Extend data output formats to support streaming optimization for large datasets and performance benchmarks. It enhances existing JSON, NDJSON, and CSV outputs with Node js stream based implementations and adds a CLI flag for benchmarking.

# Source File Updates
1. In main js update NDJSON and CSV branches to use the stream pipeline from stream/promises. Replace manual loops with a Transform stream that serializes each data point on the fly. Support backpressure automatically and allow a new option bufferSize defined by --buffer-size which defaults to 16384 bytes.
2. Introduce a new CLI flag benchmark (boolean) defined by --benchmark. When enabled the tool runs a warmup phase followed by a measured phase, uses process hrtime to record elapsed time, and computes throughput in points per second.
3. Expose a new function serializeDataStream(data, options) that returns a Readable stream for programmatic use. Options include format, bufferSize, and encoding. Update exports accordingly and update programmatic API documentation.

# Tests
1. Add unit tests for serializeDataStream to verify correct streaming output in json, ndjson, and csv formats. Use PassThrough streams to simulate slow consumers with small highWaterMark buffers and verify data flows without memory accumulation.
2. Add tests for the --benchmark flag. Mock timers to simulate generation delays and spy on console table output to assert that metrics for elapsed time and points per second are logged.
3. Ensure existing tests for JSON, NDJSON, and CSV output continue to pass under the new pipeline implementations.

# Documentation
Update README md and USAGE md to document the new streaming implementations. Describe the --benchmark and --buffer-size options with example commands showing large data throughput. Include an example of using serializeDataStream in code for integration into other applications.