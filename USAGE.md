# repository0-plot-code-lib

> "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Prerequisites

- Node.js >= 20.0.0

## Installation

### Global Install

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

### Local Development

```bash
git clone https://github.com/xn-intenton-z2a/repository0-plot-code-lib.git
cd repository0-plot-code-lib
npm install
npm link
```

## CLI Usage

The CLI provides two modes: default (timeseries) and `plot`.

### Common Flags

- `--expression <expr>` (required): Mathematical expression in terms of `x`
- `--range <start:end>` or `<start:end:step>` (required): Numeric range of `x` values
- `--points <number>` (optional, default 100): Number of points (ignored when step syntax is used)
- `--output-file <path>` (optional): Write output to a file (stdout by default)

### Timeseries (Default)

Generating a time series (CSV or JSON) without a subcommand:

```bash
repository0-plot-code-lib --expression "sin(x)" --range "0:6.283" [options]
```

#### Timeseries Options

- `--format <csv|json>` (optional, default csv): Output format for the data

### Plot

Generate image plots (SVG or PNG) using the `plot` subcommand:

```bash
repository0-plot-code-lib plot --expression "x*2" --range "0:10" [options]
```

#### Plot Options

- `--plot-format <svg|png>` (optional, default svg): Image format
- `--width <number>` (optional, default 800): Width in pixels
- `--height <number>` (optional, default 600): Height in pixels
- `--title <string>` (optional): Title for SVG plots

**PNG Output Implementation**

When `--plot-format png` is specified, the tool first renders the chart as SVG and then converts it to a full-featured PNG image using the `sharp` library. This produces a proper PNG file with a valid signature and image data.

## Quick Start Examples

### Generate CSV Time Series to stdout

```bash
repository0-plot-code-lib --expression "x*2" --range "0:10" --points 5
```

**Output:**

```
x,y
0,0
2.5,5
5,10
7.5,15
10,20
```

### Generate JSON and Save to File

```bash
repository0-plot-code-lib --expression "sin(x)" --range "-1:1:0.5" --format json --output-file data.json
```

**data.json content:**

```json
[
  { "x": -1, "y": -0.84 },
  { "x": -0.5, "y": -0.48 },
  { "x": 0, "y": 0 },
  { "x": 0.5, "y": 0.48 },
  { "x": 1, "y": 0.84 }
]
```

### Generate SVG Plot to stdout

```bash
repository0-plot-code-lib plot --expression "x^2" --range "0:5" --plot-format svg --width 800 --height 600 --title "Square Function"
```

### Generate PNG Plot and Save to File

```bash
repository0-plot-code-lib plot --expression "x^2" --range "0:5" --plot-format png --output-file plot.png
```

## CLI Parsing with Commander

The CLI also supports returning a structured JSON object representing the parsed options:

```bash
$ repository0-plot-code-lib --expression "y=sin(x)" --range "0:10" --file out.svg --points 50 --format svg
```

**Output:**

```json
{
  "expression": "y=sin(x)",
  "range": "0:10",
  "file": "out.svg",
  "points": 50,
  "format": "svg"
}
```

This helps in integrating the CLI into automation pipelines.

## Feature Overview

- **Subcommands:**
  - `timeseries` (default): Generate time series data
  - `plot`: Generate image plots
- **Output Formats:**
  - Data: CSV, JSON
  - Plots: SVG, PNG
- **Output Destinations:**
  - stdout (default) or file via `--output-file`

For full CLI specification, see [features/CLI_TOOL.md](features/CLI_TOOL.md).

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT © Your Name or Organization