# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform simple mathematical expressions into time series data and generate visualizations. The tool supports expressions like `y=sin(x)` and `y=cos(x)` to compute corresponding function values over a specified numerical range. 

This library adheres to the mission of becoming the go-to solution for formula-based visualizations, much like how jq operates for JSON data. It empowers users to either generate graphical plots (in SVG format) or output raw numerical data (in CSV format), allowing each to be processed further as needed.

## Library Mission

_As outlined in [MISSION.md](../MISSION.md)_: 

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

**repository0-plot-code-lib** is built to transform mathematical expressions into actionable time series data while providing an easy-to-use CLI for both development and production workflows.

## CLI Usage

The CLI tool is executed via Node.js and accepts the following parameters:

- `--expression`: Specifies the mathematical expression. Supported values include:
  - `y=sin(x)` for sine computations
  - `y=cos(x)` for cosine computations
  - Any unsupported expression will default to a constant value of 0.

- `--range`: Defines the range for the `x` values in the format `x=start:end`. For example, `x=0:6.28` sets the range from 0 to approximately 2π.

- `--file`: Determines the type of output. If the file name ends in `.csv`, the tool outputs CSV content directly to stdout. Otherwise, it generates a dummy SVG file with embedded text displaying the input parameters.

## Examples

### Generating CSV Output

To produce a CSV output containing time series data:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv
```

Expected output (printed to stdout):
```
x,y
0,<value>
... (at least 10 data rows)
```

### Generating SVG Output

To create a dummy SVG file that contains a visual representation of the input parameters:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

This command writes an SVG file (`output.svg`) with embedded text showing the chosen expression and range.

## Additional Information

- **Node Requirements:** Node.js version 20 or above with ECMAScript Module (ESM) support.
- **Testing:** The library is accompanied by a comprehensive test suite using Vitest. Run tests via `npm test` to ensure functionality.
- **Contribution:** For guidelines on contributing improvements or reporting issues, refer to [CONTRIBUTING.md](../CONTRIBUTING.md).

## Summary

**repository0-plot-code-lib** is designed to easily convert mathematical expressions into usable data and visuals, streamlining the creation of both graphical and numerical outputs. Whether you prefer to analyze raw data or view a quick graphical representation, this tool is built to adapt to your workflow needs.
