# PERFORMANCE_PROFILING

## Overview

Add a `profile` subcommand to the CLI that measures and reports performance metrics when reading and parsing large YAML configuration files. This feature helps users identify bottlenecks in configuration loading by reporting duration and memory usage, with options to output results as human-readable text or structured JSON for automation and monitoring.

## CLI Usage

- `repository0-plot-code-lib profile --config <path> --format text|json --output <path>`
- `repository0-plot-code-lib profile -c <path> -f json -o metrics.json`

When invoked, the tool reads the specified YAML configuration file (default: `agent-config.yaml`), measures the time taken to read and parse it, captures memory usage before and after parsing, and outputs a report. If `--output` is provided, writes the report to the given file; otherwise prints to stdout.

## Implementation Details

1. Extend `main` in `src/lib/main.js` to detect the `profile` command alongside existing commands.
2. Parse options:
   - `--config` or `-c` for file path (default: `agent-config.yaml`).
   - `--format` or `-f` to choose output format: `text` or `json` (default: `text`).
   - `--output` or `-o` for optional output file path.
3. Instrumentation:
   - Record start high-resolution time using `performance.now()` or `process.hrtime.bigint()`.
   - Read file asynchronously via `fs.promises.readFile`.
   - Record time after read, parse content with `yaml.load`, record time after parse.
   - Capture `process.memoryUsage()` snapshots before and after parse.
   - Compute durations for read and parse and memory usage deltas.
4. Reporting:
   - For `text` format produce a human-readable summary:
     - Total read time, parse time, peak RSS delta, heap delta.
   - For `json` format output an object with fields:
     - `readDurationMs`, `parseDurationMs`, `memoryUsageBefore`, `memoryUsageAfter`, `memoryDelta`, `timestamp`.
   - If `--output` is set, write the string or JSON to the file via `fs.promises.writeFile`; otherwise console.log the report.
5. Error Handling:
   - On missing file or parse error, print error to stderr and exit with code 1.

## Testing

- Mock `fs.promises.readFile` and `yaml.load` to simulate file operations. Use fake timers or spies for performance measurements.
- Verify that invoking `main(["profile", "--config", "large.yaml", "--format", "text"])` logs a string containing read and parse durations.
- Verify JSON output structure when `--format json` is used, including numeric fields and keys.
- Test that `--output` flag writes the report to the specified file.
- Simulate errors in file read and parsing to ensure proper stderr messages and non-zero exit codes.
