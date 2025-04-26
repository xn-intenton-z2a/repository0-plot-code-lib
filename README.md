# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

**Status**: ⚙️ Under active development (v1.2.0-0)

A JavaScript library and CLI tool designed to:
- Take a mathematical expression and a range of values and eventually generate SVG/PNG plots.
- Provide a CLI interface for quick data-to-plot workflows.
- Expose a core API function to integrate in other Node.js applications.

Currently, the CLI entrypoint parses arguments and logs them for extensibility. Future releases will implement expression parsing, data serialization, and plotting.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Usage](#cli-usage)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install locally:
```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

Install globally for CLI access:
```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

Or with `npx`:
```bash
npx @xn-intenton-z2a/repository0-plot-code-lib [options]
```

## Quick Start

After installation, you can run the CLI:
```bash
repository0-plot-code-lib --help
```

Currently, the CLI will echo the parsed arguments:
```bash
repository0-plot-code-lib foo bar
# Output: Run with: ["foo","bar"]
```

For more detailed usage, see [USAGE Guide](docs/USAGE.md).

## CLI Usage

CLI syntax follows Unix conventions:
```
repository0-plot-code-lib [--expression <expr>] [--range <range>] [--file <output>]
```

Example:
```bash
repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:10" --file output.svg
# Output: Run with: ["--expression","y=sin(x)","--range","x=0:10","--file","output.svg"]
```

## API Reference

Import the `main` function:
```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

main(["--expression", "y=sin(x)"]);
// Logs: Run with: ["--expression","y=sin(x)"]
```

Signature:
```ts
function main(args?: string[]): void
```

- `args`: Array of strings representing CLI arguments (defaults to `process.argv.slice(2)`).

## Roadmap

- Parse mathematical expressions into time series data.
- Support standard data formats (e.g., CSV, JSON).
- Generate SVG and PNG plots.
- Advanced CLI options and configuration.
- HTTP server endpoint for programmatic access.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
