# PERFORMANCE_PROFILING

## Overview
Extend the existing profile command to support profiling of large dataset files (CSV or JSON), measuring read, parse, and optional render times, with memory usage deltas, sampling, streaming, and concurrency. Provide single-file, batch, and directory profiling, export metrics in text, JSON, or CSV formats, and enable threshold-based alerts for automated performance validation in CI pipelines.

## CLI Usage

- Profile a single data file (JSON, CSV, YAML):
  repository0-plot-code-lib profile --input <file> [--format text|json|csv] [--max-duration <ms>] [--max-memory <bytes>] [--max-records <n>] [--stream] [--output <path>]

- Profile multiple files in batch mode:
  repository0-plot-code-lib profile --input <file1> --input <file2> [--batch] [--concurrency <n>] [--format csv] [--output metrics.csv]

- Directory batch profiling:
  repository0-plot-code-lib profile --batch-dir <directory> [--format csv] [--max-duration <ms>] [--output <path>]

Options:
- `--input`, `-i`: Path to a JSON, YAML, or CSV dataset file (multiple allowed).
- `--batch`, `-b`: Enable batch processing; requires multiple `--input` or `--batch-dir`.
- `--batch-dir`: Directory containing data files with extensions .json, .yaml, .yml, or .csv.
- `--format`, `-f`: Output format: text (default), json, or csv.
- `--max-duration`: Threshold in milliseconds for combined read and parse time; exit code 2 if exceeded.
- `--max-memory`: Threshold in bytes for memory usage delta; exit code 2 if exceeded.
- `--max-records`: Maximum number of records to parse per CSV file for sampling (default: parse all).
- `--stream`: For CSV files, stream lines instead of full-file read.
- `--concurrency`: Number of files to process in parallel (default: 1).
- `--output`, `-o`: File path to write report; defaults to stdout.

## Implementation Details

1. CLI Parsing:
   - Extend argument parser to accept `--input` alias `-i`, `--batch`, `--batch-dir`, `--max-records`, `--stream`, and `--concurrency`.
   - Deprecate `--config` alias for backward compatibility.
   - Enforce that either a single input or batch mode (`--batch` with multiple inputs or `--batch-dir`) is provided.

2. File Discovery and Reading:
   - If `--batch-dir` is set, read directory entries and filter supported extensions.
   - For each file:
     - Detect extension: JSON, YAML, or CSV.
     - For records profiling on CSV:
       - If `--stream` is set, use fs.createReadStream and readline to process up to `--max-records` lines.
       - Otherwise, read full file via fs.promises.readFile.
     - For JSON/YAML, read full file and parse with `JSON.parse` or `yaml.load`.

3. Profiling Logic:
   - For each file:
     - Capture start time (process.hrtime.bigint()) and initial memoryUsage().
     - Perform read or stream logic; record read completion time.
     - Parse content and count records (for CSV); record parse completion time.
     - Capture final memoryUsage(); compute durations and memory delta.
     - Compare metrics against thresholds; mark `alert` if any threshold is exceeded.

4. Reporting:
   - **Text**: Print per-file summary including durations, record count, memory usage, and alerts.
   - **JSON**: Output an array of objects: file, readDurationMs, parseDurationMs, recordCount, memoryDelta, alert.
   - **CSV**: First line header, then one row per file with same columns.
   - Write to `--output` file or stdout.

5. Exit Codes:
   - `0` when all files processed successfully with no threshold violations.
   - `2` when any file exceeded `--max-duration` or `--max-memory`.
   - `1` on file read errors, parse errors, invalid arguments, or unsupported formats.

## Testing

1. Unit Tests:
   - Mock fs.promises.readFile, fs.createReadStream, yaml.load, and JSON.parse to simulate small and large files.
   - Fake process.hrtime.bigint() and process.memoryUsage() for deterministic timing and memory values.
   - Verify single-file and batch profiling produce correct metrics for each format.
   - Test CSV streaming with `--stream` and sampling via `--max-records`.
   - Validate threshold flags trigger exit code 2 when limits are exceeded.
   - Simulate missing files, unsupported extensions, and parse errors; confirm stderr messages and exit code 1.

2. Integration Tests:
   - Create temporary JSON, YAML, and CSV files of varying sizes; run CLI end-to-end.
   - Test `--batch-dir` processing and `--concurrency` parallel execution.
   - Validate output written to files via `--output` flag in all formats.
   - Confirm exit codes and alert flags behave as specified.