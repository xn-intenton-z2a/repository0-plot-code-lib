# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform simple mathematical expressions into time series data and generate visualizations. The tool supports expressions like `y=sin(x)`, `y=cos(x)`, `y=tan(x)`, `y=log(x)`, `y=exp(x)`, `y=x^2`, and now also supports `y=sqrt(x)` to compute corresponding function values over a specified numerical range.

This library adheres to the mission of becoming the go-to solution for formula-based visualizations, much like how jq operates for JSON data. It empowers users to either generate graphical plots (in SVG or PNG format) or output raw numerical data (in CSV format), allowing each to be processed further as needed.

## Library Mission

_As outlined in [MISSION.md](../MISSION.md)_: 

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

**repository0-plot-code-lib** is built to transform mathematical expressions into actionable time series data while providing an easy-to-use CLI for both development and production workflows.

## CLI Usage

The CLI tool is executed via Node.js and accepts the following parameters:

- `--expression`: Specifies the mathematical expression. Supported values include:
  - `y=sin(x)` for sine computations
  - `y=cos(x)` for cosine computations
  - `y=tan(x)` for tangent computations
  - `y=log(x)` for natural logarithm computations (only valid for x > 0; non-positive x returns 0)
  - `y=exp(x)` for exponential computations
  - `y=x^2` for squaring the x value
  - `y=sqrt(x)` for computing the square root of x (for x >= 0; non-negative x, otherwise 0)
  - Any unsupported expression will default to a constant value of 0.

- `--range`: Defines the range for the `x` values in the format `x=start:end`. For example, `x=0:6.28` sets the range from 0 to approximately 2π.

- `--points`: (Optional) Specifies the number of data points to generate. If omitted, the default value of 10 is used. For instance, `--points 20` will generate 20 data points for the time series.

- `--file`: Determines the type of output based on the file extension:
  - **CSV Output:** If the file name ends in `.csv`, the tool outputs CSV content directly to stdout.
  - **SVG Output:** If the file name ends in anything other than `.csv` or `.png`, it generates a dummy SVG file with embedded text displaying the input parameters.
  - **PNG Output:** If the file name ends in `.png`, the tool generates SVG content and then uses the Sharp library to convert it into a PNG image, writing the PNG data to the specified file.

## Examples

### Generating CSV Output

To produce a CSV output containing time series data with a custom point count:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 20 --file output.csv
```

Expected output (printed to stdout):
```
x,y
0,<value>
... (20 data rows in total)
```

### Generating SVG Output

To create a dummy SVG file that contains a visual representation of the input parameters:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

### Generating PNG Output

To generate a PNG image from your expression using Sharp, run:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png
```

### New Expression Examples

You can now also use the new expressions:

- **Square Root Function:**

  ```sh
  node src/lib/main.js --expression "y=sqrt(x)" --range "x=0:16" --file output.csv
  ```

- **Exponential Function:**

  ```sh
  node src/lib/main.js --expression "y=exp(x)" --range "x=0:5" --file output.csv
  ```

- **Square Function:**

  ```sh
  node src/lib/main.js --expression "y=x^2" --range "x=-3:3" --file output.svg
  ```

- **Logarithm Function:** (Note: For non-positive x values, the output will be 0)

  ```sh
  node src/lib/main.js --expression "y=log(x)" --range "x=1:10" --file output.csv
  ```

## Additional Information

- **Node Requirements:** Node.js version 20 or above with ECMAScript Module (ESM) support.
- **Testing:** The library is accompanied by a comprehensive test suite using Vitest. Run tests via `npm test` to ensure functionality.
- **Contribution:** For guidelines on contributing improvements or reporting issues, refer to [CONTRIBUTING.md](../CONTRIBUTING.md).

## Summary

**repository0-plot-code-lib** is designed to easily convert mathematical expressions into usable data and visuals, streamlining the creation of both graphical and numerical outputs. Whether you prefer to analyze raw data or view a quick graphical representation, this tool is built to adapt to your workflow needs.
