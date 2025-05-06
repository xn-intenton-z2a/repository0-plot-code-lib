# Usage

Generate time series data from a mathematical expression:

```bash
repository0-plot-code-lib --expression "x^2" --range "x=0:2:1"
```

This outputs:

```json
[
  { "x": 0, "y": 0 },
  { "x": 1, "y": 1 },
  { "x": 2, "y": 4 }
]
```

Write output to a file:

```bash
repository0-plot-code-lib --expression "sin(x)" --range "x=0:3.14:0.78" --output "data.json"
```

Options:
- `--expression <string>`: Mathematical expression to evaluate (required).
- `--range <var=start:end:step>`: Numeric range with variable (required).
- `--output <path>`: File path to write JSON output (optional).
- `--plot-format <svg|png>`: Plot output format (optional, not yet implemented).
