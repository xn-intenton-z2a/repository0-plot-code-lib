# repository0-plot-code-lib

> "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Installation

### Prerequisites

- Node.js >= 20.0.0

### Global Install

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

### Local Install (Development)

```bash
git clone https://github.com/xn-intenton-z2a/repository0-plot-code-lib.git
cd repository0-plot-code-lib
npm install
npm link
```

## Quick Start

Generate a time series in CSV format and print to stdout:

```bash
repository0-plot-code-lib --expression "sin(x)" --range "0:6.283" --points 100 --format csv
```

Generate an SVG plot and print to stdout:

```bash
repository0-plot-code-lib plot --expression "x*2" --range "0:10" --plot-format svg --width 800 --height 600 --title "Linear Chart"
```

## Examples

**Generate 5 CSV points (y = 2x) from 0 to 10:**

```bash
repository0-plot-code-lib --expression "x*2" --range "0:10" --points 5
```

**Output Preview:**
```
x,y
0,0
2.5,5
5,10
7.5,15
10,20
```

**Generate JSON data with a 0.5 step from -1 to 1 and save to `data.json`:**

```bash
repository0-plot-code-lib --expression "sin(x)" --range "-1:1:0.5" --format json --output-file data.json
```

**Verify File Content:**

```bash
cat data.json
[
  { "x": -1, "y": -0.84 },
  { "x": -0.5, "y": -0.48 },
  { "x": 0, "y": 0 },
  { "x": 0.5, "y": 0.48 },
  { "x": 1, "y": 0.84 }
]
```

## Feature Overview

- **Subcommands**  
  - `timeseries` (default): Generate CSV or JSON time series.  
  - `plot`: Generate SVG or PNG plots.
- **Output Formats**: CSV, JSON for data; SVG, PNG for plots.
- **Output Mode**: With no `--output-file`, writes to stdout. With `--output-file`, writes to the specified file.

## Full Documentation

- CLI specifications: [features/CLI_TOOL.md](features/CLI_TOOL.md)
- HTTP server API: [features/HTTP_SERVER.md](features/HTTP_SERVER.md)
- Usage details (this file): [USAGE.md](USAGE.md)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting issues, proposing features, and submitting pull requests.

## License

MIT © [Your Name or Organization]
