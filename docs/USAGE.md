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

For feature requests and issues, please visit the project repository on GitHub.
