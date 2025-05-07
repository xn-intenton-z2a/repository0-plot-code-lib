# repository0-plot-code-lib

[![npm version](https://img.shields.io/npm/v/@xn-intenton-z2a/repository0-plot-code-lib)](https://www.npmjs.com/package/@xn-intenton-z2a/repository0-plot-code-lib)

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

`repository0-plot-code-lib` is a JavaScript library and CLI tool that parses mathematical expressions, generates time series data, and exports it in various formats with streaming support and plot rendering.

## Features

- Parse and validate single-variable mathematical expressions.
- Generate time series data over numeric ranges with customizable step sizes.
- Serialize and export data in multiple formats:
  - Pretty JSON array (`--format json`)
  - Streaming JSON array (`--format json-stream`, supports large datasets)
  - Newline-delimited JSON (NDJSON) stream (`--format ndjson`)
  - CSV output with optional header row (`--format csv`, `--csv-header`) and custom buffer size (`--buffer-size`)
- Plot rendering (SVG/PNG) via the `--plot-format` flag, with configurable dimensions and axis labels.
- CLI interface for quick data generation to stdout or file.
- Programmatic API for integration into other JavaScript projects.
- Placeholder behavior: running the CLI without any flags prints the invocation summary.

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

Refer to [USAGE.md](USAGE.md) for detailed examples and options.

## Programmatic API

You can use the library directly in your code:

```js
import {
  parseExpression,
  parseRange,
  generateTimeSeries,
  serializeDataStream,
  renderPlot,
  main as cliMain,
} from '@xn-intenton-z2a/repository0-plot-code-lib';

(async () => {
  // Parse expression and range
  const exprAst = parseExpression('x^3 + 2');
  const { variableName, start, end, step } = parseRange('x=0:10:2');

  // Generate data
  const data = generateTimeSeries(exprAst, variableName, start, end, step);

  // Stream JSON data
  const jsonStream = serializeDataStream(data, { format: 'json-stream', bufferSize: 1024 });
  for await (const chunk of jsonStream) {
    process.stdout.write(chunk);
  }

  // Render and save a plot
  const pngBuffer = await renderPlot(data, {
    format: 'png',
    width: 800,
    height: 600,
    labels: { x: 'Time', y: 'Value' },
  });
  console.log('Received PNG buffer of length', pngBuffer.length);

  // Run the CLI programmatically
  const exitCode = await cliMain(['--expression', 'x+1', '--range', 'x=0:5:1', '--plot-format', 'svg']);
  console.log(`CLI exited with code ${exitCode}`);
})();
```

## Roadmap

- Add benchmarking mode to measure performance with `--benchmark`, `--warmup`, and `--iterations` (planned).
- Implement HTTP API mode for on-demand data and plot serving over HTTP endpoints (planned).
- Continued performance improvements and new features based on user feedback.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting issues, submitting pull requests, and running tests.

## License

MIT
