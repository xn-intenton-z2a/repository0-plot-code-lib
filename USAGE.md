# Usage

## CLI Examples

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

_Planning support for rendering plots directly via CLI._

```bash
repository0-plot-code-lib \
  --expression "x^2" \
  --range "x=0:10:1" \
  --plot-format svg --output plot.svg
```

### Options

- `--expression <string>` (required): Mathematical expression to evaluate (single variable).
- `--range <var=start:end:step>` (required): Numeric range for the variable.
- `--output <path>`: Path to write output (defaults to stdout).
- `--format <json|ndjson>`: Output as pretty JSON array or NDJSON stream (default: json).
- `--plot-format <svg|png>`: Plot output format (optional, stubbed/not implemented yet).

## Programmatic Usage

Import and use the core functions directly:

```js
import { parseExpression, parseRange, generateTimeSeries } from '@xn-intenton-z2a/repository0-plot-code-lib';

const exprAst = parseExpression('x^3 + 2');
const { variableName, start, end, step } = parseRange('x=0:10:2');
const data = generateTimeSeries(exprAst, variableName, start, end, step);
console.log(data);
```

## Next Steps

- Plot rendering in SVG/PNG via `--plot-format` flag is on the roadmap.
- Large-data streaming support (NDJSON) is available via `--format ndjson`.