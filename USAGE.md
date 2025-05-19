# Usage

## Command-Line Interface

After installing, invoke the CLI with any combination of flags. The current implementation echoes all provided arguments.

```bash
# Example invocation
encryptor0-plot-code-lib --expression "x^2" --range "0:5:1"
# Example output:
# Run with: ["--expression","x^2","--range","0:5:1"]
```

> Note: All flags are currently placeholders. Full expression parsing, time-series generation, and plotting will be available in upcoming releases.

## HTTP API (Coming Soon)

A lightweight Express server will be provided to serve endpoints:

- **GET /plot**: Generate and return a plot image. Query parameters: `expression`, `range`, `format` (`svg` or `png`).
- **GET /series**: Generate and return time-series data. Query parameters: `expression`, `range`, `format` (`json` or `jsonl`).

Responses:
- **/plot**: `Content-Type: image/svg+xml` or `image/png`
- **/series**: `Content-Type: application/json` or `application/jsonl`

Validation errors will return `400 Bad Request` with a JSON payload:
```json
{ "error": "<message>" }
```
