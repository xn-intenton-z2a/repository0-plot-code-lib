# Usage

## CLI Examples

### No arguments (placeholder behavior)

```bash
repository0-plot-code-lib
```
Outputs:
```
Run with: []
```

### Display help

```bash
repository0-plot-code-lib --help
```
Outputs the CLI usage information with available options.

### Generate time series data to stdout (JSON)

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

### Generate time series data as NDJSON to stdout

```bash
repository0-plot-code-lib --expression "x+1" --range "x=0:2:1" --format ndjson
```

Outputs:
```
{"x":0,"y":1}
{"x":1,"y":2}
{"x":2,"y":3}
```

### Write NDJSON output to a file

```bash
repository0-plot-code-lib --expression "x+1" --range "x=0:2:1" --format ndjson --output data.ndjson
```

### Write JSON output to a file

```bash
repository0-plot-code-lib \
  --expression "sin(x)" \
  --range "x=0:3.14:0.78" \
  --output "data.json"
```

### Plot rendering (SVG/PNG) (stub implementation)

```bash
repository0-plot-code-lib \
  --expression "x^2" \
  --range "x=0:10:1" \
  --plot-format svg --output plot.svg
```
Outputs:
```
Plot rendering not yet implemented
```

## Options

- `--expression <string>` (required): Mathematical expression to evaluate (single variable).
- `--range <var=start:end:step>` (required): Numeric range for the variable.
- `--output <path>`: Path to write output (defaults to stdout).
- `--format <json|ndjson>`: Output as pretty JSON array or NDJSON stream (default: json).
- `--plot-format <svg|png>`: Plot output format; currently stubbed and not implemented.
- `--help`: Show this help message.

## Programmatic Usage

You can also use the library directly in your own Node.js project:

```js
import {
  parseExpression,
  parseRange,
  generateTimeSeries,
  renderPlot,
  main as cliMain,
} from '@xn-intenton-z2a/repository0-plot-code-lib';

// 1. Parse a mathematical expression into an AST
const exprAst = parseExpression('x^3 + 2');

// 2. Parse a range string into numeric parameters
const { variableName, start, end, step } = parseRange('x=0:10:2');

// 3. Generate the time series data
const data = generateTimeSeries(exprAst, variableName, start, end, step);
console.log('Time series data:', data);

// 4. (Optional) Render a plot (stubbed, will throw)
(async () => {
  try {
    const pngBuffer = await renderPlot(data, { format: 'png', width: 800, height: 600 });
    console.log('Received PNG buffer with length', pngBuffer.length);
  } catch (err) {
    console.error('Plot rendering not implemented:', err.message);
  }
})();

// 5. Run the CLI programmatically
const exitCode = cliMain(['--expression', 'x+1', '--range', 'x=0:5:1']);
console.log(`CLI exited with code ${exitCode}`);
```

## Next Steps

- Plot rendering in SVG/PNG via `--plot-format` flag is on the roadmap.
- Large-data streaming support (NDJSON) is available via `--format ndjson`.
