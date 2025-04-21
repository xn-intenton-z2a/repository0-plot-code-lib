# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform mathematical expressions into time series data and generate visualizations. The tool supports a variety of expressions, enabling both data generation and visual plotting in multiple formats.

## Supported Mathematical Expressions

- **y=sin(x)**
- **y=cos(x)**
- **y=tan(x)**
- **y=log(x)**   (Note: Only computes log for x > 0; for x <= 0, returns 0)
- **y=exp(x)**
- **y=x^2**
- **y=sqrt(x)**  (Note: For x < 0, returns 0)
- **y=x^3**

## CLI Overview

The CLI functionality is provided by the `src/lib/main.js` script. It accepts several command-line options:

- `--expression`: Specifies the mathematical expression.
- `--range`: Defines the data range in the format `x=start:end` (e.g., "x=0:6.28").
- `--file`: Specifies the output file name and type, determining the output mode:
  - If the file ends with **.csv**, the CLI outputs CSV content to stdout.
  - If it ends with **.svg**, the CLI generates an enhanced SVG file containing axes, a polyline, and data markers.
  - If it ends with **.png**, the tool converts the SVG content to a PNG file using `sharp`.
- `--points`: (Optional) Specifies the number of data points to generate. Defaults to 10 if omitted.

## Detailed CLI Usage Examples

### 1. Generating CSV Output

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv
```

Expected Output:
- The terminal prints a CSV string beginning with a header `x,y` followed by data rows. This output is verified by tests which check for the correct header and the appropriate number of data rows (default 10 or as specified with `--points`).

### 2. Generating an Enhanced SVG Plot

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

Expected Output:
- An SVG file named `output.svg` is generated.
- The SVG includes:
  - Axis lines (`<line>` elements) for both X and Y axes.
  - A polyline (`<polyline>`) connecting data points.
  - Individual data point markers (`<circle>` elements).
- Additionally, the plot features a title and axis labels for easier interpretation.

### 3. Generating a PNG Image

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png
```

Expected Output:
- The tool converts the generated SVG content to a PNG image using `sharp`.
- The resulting PNG file, `output.png`, will have a valid PNG signature (first 8 bytes: 89 50 4E 47 0D 0A 1A 0A), ensuring its integrity.

### 4. Specifying a Custom Point Count

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 15 --file output.csv
```

Expected Output:
- The CLI prints CSV content with exactly 15 data rows (plus the header), as verified by the corresponding unit tests.

## Rendering Behavior Based on File Extension

- **CSV (`.csv`)**: Outputs data as CSV content directly to stdout, complete with a header row followed by data points.
- **SVG (`.svg`)**: Creates an enhanced scalable vector graphic that includes visual enhancements such as axes, a connecting polyline, and individual data markers.
- **PNG (`.png`)**: Converts the generated SVG content into a PNG image using `sharp`. The PNG file can be verified by checking its signature.

## Conclusion

This guide provides detailed CLI usage examples and describes the key features of repository0-plot-code-lib. The documented commands are validated by comprehensive tests, ensuring that the tool behaves as expected in generating CSV, SVG, and PNG outputs. Happy plotting!
