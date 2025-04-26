# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)").
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1").
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with an embedded comment indicating the expression.
  - **.png**: Generates a PNG plot using dummy base64 encoded image data.

### Examples

1. **Generate an SVG plot**:

   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg

   The generated SVG file will contain:
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg"><!-- Plot for expression: y=sin(x) --></svg>
   ```

2. **Generate a PNG plot**:

   node src/lib/main.js --expression "y=cos(x)" --range "x=-1:1,y=-1:1" --file output.png

   The generated PNG file will have a valid PNG header.

### Error Handling

- If any of the required flags (--expression, --range, or --file) are missing, the program will throw an error indicating that all are required.
- If an unsupported file extension is provided, an error is thrown indicating that only .svg and .png are supported.

## Server Mode

To run the HTTP server (which provides the /plot endpoint), use the following flag:

   node src/lib/main.js --serve

The /plot endpoint supports content negotiation for "image/svg+xml", "image/png", and "application/json".
