# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)").
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1").
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with a text annotation indicating the expression and range.
  - **.png**: Generates a PNG plot using dummy base64 encoded image data.

When executed with the correct flags, the CLI will generate the plot and log a success message including details about the plot type, expression, range, and output file location.

### Examples

1. **Generate an SVG plot**:

   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg

   - The generated SVG file will contain:
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg">
     <text x="10" y="20">Plot for: y=sin(x) in range x=-1:1,y=-1:1</text>
   </svg>
   ```
   - And the CLI will log a message: "SVG plot generated at output.svg for expression: y=sin(x) in range: x=-1:1,y=-1:1"

2. **Generate a PNG plot**:

   node src/lib/main.js --expression "y=cos(x)" --range "x=-1:1,y=-1:1" --file output.png

   - The generated PNG file will have a valid PNG header.
   - And the CLI will log a message: "PNG plot generated at output.png for expression: y=cos(x) in range: x=-1:1,y=-1:1"

### Error Handling

- If any of the required flags (--expression, --range, or --file) are missing, the program will throw an error stating:

  > Error: --expression, --range, and --file flags are required together.

- If an unsupported file extension is provided (anything other than .svg or .png), an error is thrown stating that only .svg and .png are supported.

## Server Mode

To run the HTTP server (which provides the /plot endpoint), use the following flag:

   node src/lib/main.js --serve

The /plot endpoint supports content negotiation for "image/svg+xml", "image/png", and "application/json".
