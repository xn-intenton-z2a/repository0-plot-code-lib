# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--verbose**: Enables verbose mode, which outputs additional debugging information such as argument parsing details and execution steps.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be a non-empty string.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). **Validation Rules:**
  - The range value must not be empty.
  - It must match the pattern: `x=<min>:<max>,y=<min>:<max>` where `<min>` and `<max>` are numeric values. Both integer and floating point numbers are supported (e.g., "x=-1.5:2.5,y=-0.5:0.5").
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with a text annotation indicating the expression and range.
  - **.png**: Generates a PNG plot using dummy base64 encoded image data.
- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for image/svg+xml, image/png, and application/json.

**Help and Verbose Modes**

- When running with **--help**, the CLI displays a concise usage message describing all available flags and provides examples.
- When running with **--verbose** along with valid commands, the CLI outputs additional debug information for troubleshooting and clarity on internal operations.

### Examples

1. **Display Help Message:**

   node src/lib/main.js --help

   - This will output the usage guide along with flag descriptions and examples.

2. **Generate an SVG Plot with Verbose Output (Valid Input):**

   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --verbose

   - The generated SVG file will contain:
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg">
     <text x="10" y="20">Plot for: y=sin(x) in range x=-1:1,y=-1:1</text>
   </svg>
   ```
   - The CLI will output verbose logs detailing argument parsing and plot generation steps.

3. **Generate a PNG Plot (Valid Input):**

   node src/lib/main.js --expression "y=cos(x)" --range "x=-2.0:3.5,y=-1.5:1.5" --file output.png

   - The generated PNG file will have a valid PNG header.
   - And the CLI will log a success message: "PNG plot generated at output.png for expression: y=cos(x) in range: x=-2.0:3.5,y=-1.5:1.5"

4. **Run in Server Mode:**

   node src/lib/main.js --serve

   - This starts an HTTP server listening on port 3000 with a `/plot` endpoint.

5. **Invalid Input Examples:**

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
