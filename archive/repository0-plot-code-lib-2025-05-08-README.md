# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Overview

A command-line tool and library for generating and exporting plots from mathematical formulae. It provides:

- Synchronized timestamped series generation for one or more formulae (`--flow-sync`).
- JSON output for easy piping and integration in data workflows.
- Programmatic API access to integrate into Node.js applications.

## Installation

Install globally:
```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

Or install as a project dependency:
```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

### Synchronizing Data Streams (flow-sync)

Generate timestamps and series values across a specified range:
```bash
node src/lib/main.js --flow-sync --start 0 --end 4 --step 2 x '2*x'
```

Output:
```json
{
  "timestamps": [0, 2, 4],
  "series": [
    { "expression": "x", "values": [0, 2, 4] },
    { "expression": "2*x", "values": [0, 4, 8] }
  ]
}
```

### Default Mode

Without `--flow-sync`, the CLI echoes the provided arguments:
```bash
node src/lib/main.js
```

Output:
```
Run with: []
```

### Programmatic API

Use within a Node.js script:
```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

// Generate series for sin(x) and cos(x)
main(["--flow-sync", "--start", "0", "--end", "10", "--step", "1", "sin(x)", "cos(x)"]);
```

---

## License

MIT
