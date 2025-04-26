# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be a non-empty string.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). **Validation Rules:**
  - The range value must not be empty.
  - It must match the pattern: `x=<min>:<max>,y=<min>:<max>` where `<min>` and `<max>` are numeric values. Both integer and floating point numbers are supported (e.g., "x=-1.5:2.5,y=-0.5:0.5").
- **--file**: The output file path. The value must not be empty. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with a text annotation indicating the expression and range.
  - **.png**: Generates a PNG plot using dummy base64 encoded image data.

When executed with the correct flags, the CLI will generate the plot and log a success message including details about the plot type, expression, range, and output file location.

### Examples

1. **Generate an SVG plot (Valid Input):**

   node src/lib/main.js --expression "y=sin(x)" --range "x=-1.5:2.5,y=-0.5:0.5" --file output.svg

   - The generated SVG file will contain:
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg">
     <text x="10" y="20">Plot for: y=sin(x) in range x=-1.5:2.5,y=-0.5:0.5</text>
   </svg>
   ```
   - And the CLI will log a message: "SVG plot generated at output.svg for expression: y=sin(x) in range: x=-1.5:2.5,y=-0.5:0.5"

2. **Generate a PNG plot (Valid Input):**

   node src/lib/main.js --expression "y=cos(x)" --range "x=-2.0:3.5,y=-1.5:1.5" --file output.png

   - The generated PNG file will have a valid PNG header.
   - And the CLI will log a message: "PNG plot generated at output.png for expression: y=cos(x) in range: x=-2.0:3.5,y=-1.5:1.5"

3. **Invalid Input Examples:**

   - Missing a required flag or providing an empty value will result in an error. For example:
     - Missing or empty **--expression**: 
       > Error: --expression flag must have a non-empty value.
     - Missing or empty **--range**: 
       > Error: --range flag must have a non-empty value.
     - Missing or empty **--file**: 
       > Error: --file flag must have a non-empty value.

   - Malformed **--range** value:
     - For example, using "x=-1.5:abc,y=-0.5:0.5" will result in:
       > Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.

## Server Mode

To run the HTTP server (which provides the /plot endpoint), use the following flag:

   node src/lib/main.js --serve

The /plot endpoint supports content negotiation for "image/svg+xml", "image/png", and "application/json".
