# Purpose
Enable newline-delimited JSON (NDJSON) serialization and streaming for time series data both in the CLI and over HTTP. Provide users with a compact, line-oriented JSON format ideal for pipelines, logs, and streaming consumers.

# Behavior

## Programmatic API
1. Export serializeNDJSON(data) that converts an array of {x,y} objects into an NDJSON string: one JSON object per line, no trailing newline.

## Command Line Interface
1. Extend the default `timeseries` mode to accept `--format ndjson`.
2. When `--format ndjson` is specified, call serializeNDJSON and write the result to stdout or `--output-file`.
3. Maintain existing flags (`--expression`, `--range`, `--points`, `--output-file`).
4. Update `--json-output` behavior to reflect parsed options as JSON without executing any generation.

## HTTP API Endpoints
1. Add GET `/ndjson` endpoint:
   • Query parameters: expression, range, points (optional).
   • Validate with Zod schemas as in other endpoints.
   • Set `Content-Type` to `application/x-ndjson`.
   • On success, stream each data point as a line of JSON, ending only on complete series.
2. Retain existing `/stream` SSE endpoint.

# Implementation

1. In `src/lib/main.js`:
   • Define `export function serializeNDJSON(data)` that maps each data point to `JSON.stringify(point)` and joins with `\n`.
   • Extend CLI path in `mainCLI` default branch: allow `format === 'ndjson'` and call serializeNDJSON.
   • Update commander configuration or simple parser to include ndjson as valid format.
   • Implement new `/ndjson` route in `startHTTPServer` after existing routes. Use `formSchema` Zod schema or a lighter query schema. Stream the response by writing each line and ending.

2. Update `USAGE.md` and `GET /` form or docs to mention the new ndjson option in Data Formats.

# Testing

1. Unit tests for serializeNDJSON:
   • Input: array of {x,y} objects; Output: string with one JSON object per line.
2. CLI tests:
   • `mainCLI(['--expression','x','--range','0:2','--points','3','--format','ndjson'])` returns correct NDJSON string.
   • Writing to file via `--output-file` writes valid NDJSON file.
3. HTTP tests for GET `/ndjson` using supertest:
   • Valid query returns status 200, content-type `application/x-ndjson`.
   • Response body lines parseable as JSON and match data points.
   • Invalid parameters return 400 with error message.
