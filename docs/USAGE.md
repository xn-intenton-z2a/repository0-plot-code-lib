# Usage Guide

This guide provides detailed instructions for using the CLI and API.

## CLI

### Installation

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

or use with `npx`:

```bash
npx @xn-intenton-z2a/repository0-plot-code-lib <options>
```

### Commands

- `--help`: Show basic help (currently lists nothing implemented).
- `--expression <expr>`: (Future) Mathematical expression to plot.
- `--range <range>`: (Future) Value range, e.g., `x=0:10,y=-1:1`.
- `--file <path>`: (Future) Output file path.

### Example

```bash
repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:10" --file output.svg
```

Expected output:

```
Run with: ["--expression","y=sin(x)","--range","x=0:10","--file","output.svg"]
```

## API

Import and invoke the `main` function directly:

```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

// Using default arguments from process.argv
main();

// Passing custom arguments
main(["--expression", "y=cos(x)", "--file", "plot.png"]);
```

The function logs the provided arguments. Future versions will perform expression parsing and plot generation.

## Environment Variables

Load `.env` with `dotenv`:

- `.env` file at project root.
- Future configuration options (`PLOT_COLOR`, `PLOT_WIDTH`, etc.) will be supported.

## Development

Run tests:

```bash
npm test
```

Lint and format:

```bash
npm run linting
npm run formatting
```

---

## HTTP Server

Start the HTTP server on port 3000 by using the `--serve` flag:

```bash
repository0-plot-code-lib --serve
# Output: Server listening on :3000
```

### `/plot` Endpoint

The `/plot` endpoint supports content negotiation via the `Accept` header.

- SVG representation:
  ```bash
  curl -H "Accept: image/svg+xml" http://localhost:3000/plot
  ```
  Response:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg"></svg>
  ```

- PNG representation:
  ```bash
  curl -H "Accept: image/png" http://localhost:3000/plot --output plot.png
  ```

- JSON representation:
  ```bash
  curl -H "Accept: application/json" http://localhost:3000/plot
  # { "data": [] }
  ```

- Unsupported media type:
  ```bash
  curl -H "Accept: text/plain" http://localhost:3000/plot -i
  # HTTP/1.1 406 Not Acceptable
  # Vary: Accept
  ```
