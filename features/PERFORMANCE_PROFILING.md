# PERFORMANCE_PROFILING

## Overview
Extend the existing profile subcommand to support batch processing of multiple configuration files, customizable performance thresholds for alerts, and CSV export of metrics. This enhancement focuses on profiling large YAML or JSON configuration files in bulk, providing structured outputs, and enabling users to enforce performance SLOs in automation and CI workflows.

## CLI Usage

- Profile a single file (default behavior):
  repository0-plot-code-lib profile --config <path> [--format text|json|csv] [--max-duration <ms>] [--max-memory <bytes>] [--output <path>]
- Profile multiple files in batch mode:
  repository0-plot-code-lib profile --config <file1> --config <file2> [--batch] [--format csv] [--output metrics.csv]
- Directory batch profiling:
  repository0-plot-code-lib profile --batch-dir <directory> [--format csv] [--max-duration <ms>] [--output <path>]

Options:
- `--config`, `-c`: Path(s) to one or more YAML or JSON configuration files.
- `--batch`, `-b`: Enable batch processing; requires multiple `--config` or `--batch-dir`.
- `--batch-dir`: Directory containing configuration files to profile.
- `--format`, `-f`: Output format: `text` (default), `json`, or `csv`.
- `--max-duration`: Threshold in milliseconds; exit with code 2 and report if parse or read time exceeds.
- `--max-memory`: Threshold in bytes; exit with code 2 and report if memory delta exceeds.
- `--output`, `-o`: File path to write the report; defaults to stdout.

## Implementation Details
1. CLI Parsing:
   - Extend argument parser to accept multiple `--config` flags, `--batch-dir`, and threshold flags.
   - Validate that either a single config or batch mode (multiple configs or `--batch-dir`) is provided.
2. File Discovery:
   - If `--batch-dir` is set, read directory entries and filter `*.yaml`, `*.yml`, or `*.json`.
   - Aggregate file paths into a list for processing.
3. Profiling Logic:
   - For each file:
     - Capture start time (process.hrtime.bigint()), memoryUsage before load.
     - Async read file; record read completion time.
     - Detect format by extension and parse with `yaml.load` or `JSON.parse`; record parse completion time.
     - Capture memoryUsage after parse.
     - Compute durations and memory deltas.
     - Check against thresholds; if exceeded, mark entry as alert.
4. Reporting:
   - For `text`: print per-file summary with durations, memory usage, and alerts.
   - For `json`: output an array of metric objects with fields: file, readDurationMs, parseDurationMs, memoryDelta, alert (boolean).
   - For `csv`: generate header line and one row per file with columns: file, readDurationMs, parseDurationMs, memoryDelta, alert.
   - Write output to `--output` or stdout.
5. Exit Codes:
   - `0` on success with no threshold violations.
   - `2` if any file exceeded thresholds.
   - `1` on missing file, parse error, or invalid arguments.

## Testing
1. Unit Tests:
   - Mock `fs.promises.readFile`, `yaml.load`, and `JSON.parse` to simulate various file types and sizes.
   - Fake `process.hrtime.bigint()` and `process.memoryUsage()` to control timing and memory values.
   - Verify single-file and batch profiling produce correct metrics and formats.
   - Test threshold flags trigger exit code 2 when limits are exceeded.
   - Test CSV output format and header correctness.
   - Simulate missing files and parse errors to ensure `stderr` messages and exit code 1.
2. Integration Tests:
   - Create temporary files of various sizes and run the CLI end-to-end.
   - Ensure `--batch-dir` processes all valid files.
   - Validate output written to files via `--output` flag.
