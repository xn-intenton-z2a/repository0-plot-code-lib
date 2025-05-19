# repository0-plot-code-lib

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

repository0-plot-code-lib is a JavaScript library and CLI tool designed to:
- Parse simple mathematical expressions.
- Generate time-series data.
- Render SVG and PNG plots.
- Expose both a CLI interface and an HTTP API.

**Current Status (v1.2.0-0)**

The CLI entry point is available and will echo any provided arguments. Core features for expression parsing, time-series generation, plotting, and the HTTP API are under active development.

## Installation

Install globally with npm:

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

## Quickstart

Run the CLI with any flags; it will print the provided arguments:

```bash
repository0-plot-code-lib --expression "sin(x)" --range "x=0:10:0.5"
# Output:
# Run with: ["--expression","sin(x)","--range","x=0:10:0.5"]
```

## Planned Features

- **CLI Flags**
  - `--expression <expr>`: mathematical expression, e.g. `sin(x)`.
  - `--range <start:end:step>`: defines x start, end, and increment.
  - `--output-format <json|jsonl|csv>`: time-series output format.
  - `--plot <svg|png>`: plot image format.
  - `--output <file>`: path to write plot image or data.
  - `--serve`: start HTTP server instead of CLI mode.
  - `--host`, `--port`: HTTP server binding (defaults: `127.0.0.1:3000`).

- **HTTP API** (coming soon)
  - **GET /plot**: generate and return a plot image (`image/svg+xml` or `image/png`).
  - **GET /series**: generate and return time-series data (`application/json` or `application/jsonl`).

## Contributing

For guidelines on reporting issues, submitting pull requests, coding standards, and documentation updates, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT