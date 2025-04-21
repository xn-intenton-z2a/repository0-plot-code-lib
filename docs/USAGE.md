# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform mathematical expressions into time series data and generate visualizations. The tool supports expressions such as `y=sin(x)`, `y=cos(x)`, `y=tan(x)`, `y=log(x)`, `y=exp(x)`, `y=x^2`, `y=sqrt(x)`, and `y=x^3`. It allows users to either print data in CSV format or create enhanced SVG/PNG plots that include axes, data markers, and connecting lines.

## CLI Overview

The CLI functionality is provided by the `src/lib/main.js` script. It accepts several command-line options to define the mathematical expression, data range, output file type, and the number of data points. The tool is designed to help you quickly generate time series data from mathematical expressions and visualize them with improved graphical output including:

1. X and Y axes drawn as `<line>` elements, automatically scaled based on the provided data range.
2. Data points represented as `<circle>` markers, positioned after applying a coordinate transformation.
3. A connecting `<polyline>` that links the data points, forming a continuous line plot.
4. A plot title and axis labels for easy interpretation.

### Available CLI Options

- `--expression`: Specifies the mathematical expression. Examples include:
  - `y=sin(x)`
  - `y=cos(x)`
  - `y=tan(x)`
  - `y=log(x)` (Note: Only valid for x > 0; otherwise returns 0)
  - `y=exp(x)`
  - `y=x^2`
  - `y=sqrt(x)` (Note: For x < 0, returns 0)
  - `y=x^3`
  - Unsupported expressions default to a constant 0.

- `--range`: Defines the range for x in the format `x=start:end` (e.g., "x=0:6.28").

- `--file`: Specifies the output file type based on the extension:
  - **CSV:** If the file ends with `.csv`, CSV content is printed to stdout.
  - **PNG:** If the file ends with `.png`, the tool converts generated SVG content to a PNG file using sharp.
  - **SVG:** For any other extension (or `.svg`), an enhanced SVG file is generated with graphical elements.

- `--points`: (Optional) Indicates the number of data points to generate. Defaults to 10 if not provided.

## Quick Start

1. Ensure you have Node.js version 20 or above installed.
2. Install the dependencies with `npm install`.
3. Run the CLI command using one of the examples below.

## CLI Usage Examples

### Example 1: Generating CSV Output

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 20 --file output.csv
```

Expected Outcome:
- CSV content is printed to stdout with a header `x,y` followed by 20 rows of data.

### Example 2: Generating an Enhanced SVG Plot

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

Expected Outcome:
- An SVG file named `output.svg` is created. The SVG includes:
  - X and Y axes drawn using `<line>` elements.
  - Data points marked as `<circle>` elements and connected with a `<polyline>`.
  - A plot title (e.g., "Plot: y=sin(x)") and axis labels for both X and Y axes.

### Example 3: Generating a PNG Image

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png
```

Expected Outcome:
- The tool converts the enhanced SVG content to a PNG image and writes it to `output.png`. The PNG file will have a valid PNG signature.

## Troubleshooting Tips

- **Invalid Range Format:**
  - If you see an error regarding the range format, ensure you are using the format `x=start:end` (e.g., `x=0:6.28`).

- **Unsupported Expression or Domain Issues:**
  - Verify that the expression is one of the supported types and that the x values fall within a valid domain (for instance, `y=log(x)` requires x > 0).

- **File Output Verification:**
  - Check that the output file extension matches the desired output (CSV, SVG, or PNG) and inspect the file content if the output is not as expected.

- **Reference Tests:**
  - Consult the test cases in `tests/unit/main.test.js` to understand the expected behavior and validate your installation.

## Common Use Cases

- **Data Analysis:** Generate time series data for plotting or further computation.
- **Visualization:** Quickly create visual references or diagnostic plots in enhanced SVG or PNG formats.
- **Automation:** Integrate the CLI tool into scripts for automated data processing and visualization tasks.

Happy plotting!
