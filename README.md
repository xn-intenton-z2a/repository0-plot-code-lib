# repository0-plot-code-lib

[![npm version](https://img.shields.io/npm/v/@xn-intenton-z2a/repository0-plot-code-lib)](https://www.npmjs.com/package/@xn-intenton-z2a/repository0-plot-code-lib)

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

`repository0-plot-code-lib` is a JavaScript library and CLI tool that parses mathematical expressions, generates time series data, and exports it in JSON or NDJSON format. It provides a straightforward interface for both command-line and programmatic use.

## Features

- Parse and validate single-variable mathematical expressions.
- Generate time series data over numeric ranges with customizable step sizes.
- Output results as pretty-printed JSON or newline-delimited JSON (NDJSON) for streaming large datasets.
- Plot rendering (SVG/PNG) via `--plot-format` flag: generate charts in SVG or PNG format.
- CLI interface for quick data generation and file output.
- Programmatic API for integration into other JavaScript projects.
- Placeholder behavior: running the CLI without any flags prints a placeholder message.

## Installation

Install globally from npm:

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

Or add it to your project dependencies:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## CLI Usage

### No arguments

```bash
repository0-plot-code-lib
```
Outputs:
```
Run with: []
```

### Default JSON output (to stdout)

```bash
repository0-plot-code-lib --expression "x^2" --range "x=0:2:1"
```
Outputs:
```json
[
  { "x": 0, "y": 0 },
  { "x": 1, "y": 1 },
  { "x": 2, "y": 4 }
]
```

### NDJSON output (to stdout)

```bash
repository0-plot-code-lib --expression "x+1" --range "x=0:2:1" --format ndjson
```
Outputs:
```
{"x":0,"y":1}
{"x":1,"y":2}
{"x":2,"y":3}
```

### Write pretty JSON to a file

```bash
repository0-plot-code-lib \
  --expression "sin(x)" \
  --range "x=0:3.14:0.78" \
  --output "data.json"
```

### Write NDJSON to a file

```bash
repository0-plot-code-lib --expression "x+1" --range "x=0:2:1" --format ndjson --output data.ndjson
```

See [USAGE.md](USAGE.md) for more detailed examples and options.

## Programmatic API

You can use the library directly in your code:

```js
import {
  parseExpression,
  parseRange,
  generateTimeSeries,
  renderPlot,
  main as cliMain,
} from '@xn-intenton-z2a/repository0-plot-code-lib';

// 1. Parse an expression AST
const exprAst = parseExpression('x^3 + 2');

// 2. Parse a range string
const { variableName, start, end, step } = parseRange('x=0:10:2');

// 3. Generate the time series data
const data = generateTimeSeries(exprAst, variableName, start, end, step);
console.log('Time series data:', data);

// 4. Render a plot
(async () => {
  try {
    const pngBuffer = await renderPlot(data, { format: 'png', width: 800, height: 600, labels: { x: 'X', y: 'Y' } });
    console.log('Received PNG buffer with length', pngBuffer.length);
  } catch (err) {
    console.error('Plot rendering failed:', err.message);
  }
})();

// 5. Run the CLI programmatically
(async () => {
  const exitCode = await cliMain(['--expression', 'x+1', '--range', 'x=0:5:1', '--plot-format', 'svg']);
  console.log(`CLI exited with code ${exitCode}`);
})();
```

## Roadmap

- Add JSON-stream and CSV output formats with backpressure control and header options.
- Add benchmarking options to measure performance.
- Implement HTTP API mode for on-demand data and plot serving over HTTP.
- Performance improvements and additional features.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting issues, submitting pull requests, and running tests.

## License

MIT
