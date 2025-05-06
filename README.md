# repository0-plot-code-lib

[![npm version](https://img.shields.io/npm/v/@xn-intenton-z2a/repository0-plot-code-lib)](https://www.npmjs.com/package/@xn-intenton-z2a/repository0-plot-code-lib)

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

repository0-plot-code-lib is a JavaScript library and CLI tool that parses mathematical expressions, generates time series data, and exports it in JSON or NDJSON format. It provides a straightforward interface for both command-line and programmatic use.

## Features

- Parse and validate single-variable mathematical expressions.
- Generate time series data over numeric ranges with customizable step sizes.
- Output results as pretty-printed JSON or newline-delimited JSON (NDJSON) for streaming large datasets.
- CLI interface for quick data generation and file output.
- Programmatic API for integration into other JavaScript projects.
- Placeholder no-arguments behavior: running the CLI without any flags prints a placeholder message.
- Plot rendering (SVG/PNG) via `--plot-format` flag is stubbed and currently returns an error.

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

Invoking the CLI without any arguments prints a placeholder message:

```bash
repository0-plot-code-lib
```
Outputs:
```
Run with: []
```

See [USAGE.md](USAGE.md) for detailed examples.

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

// Parse an expression AST
const exprAst = parseExpression('x^2');

// Parse a range string
const { variableName, start, end, step } = parseRange('x=0:2:1');

// Generate the time series data
const data = generateTimeSeries(exprAst, variableName, start, end, step);
console.log(data);

// Render a plot (stubbed, will throw an error)
(async () => {
  try {
    const svg = await renderPlot(data, {
      format: 'svg',
      width: 800,
      height: 600,
      labels: { x: 'X Axis', y: 'Y Axis' },
    });
    console.log(svg);
  } catch (err) {
    console.error('Plot rendering not implemented:', err.message);
  }
})();

// Run the CLI programmatically (returns exit code)
const exitCode = cliMain(['--expression', 'x+1', '--range', 'x=0:5:1', '--format', 'ndjson']);
console.log(`CLI exited with code ${exitCode}`);
```

## Roadmap

- Full SVG/PNG plot rendering via `--plot-format` flag and `renderPlot` API (in progress).
- Support expression and range streaming for very large datasets (NDJSON output).
- Additional features and performance optimizations.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting issues, submitting pull requests, and running tests.

## License

MIT
