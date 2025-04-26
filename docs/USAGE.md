# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It allows both command line interactions and HTTP API access to generate plots dynamically.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--version**: Displays the current version (read from package.json) and exits immediately without processing any other flags. Note that if --version is provided alongside other flags, it takes precedence and no other actions are performed.
- **--verbose**: Enables verbose mode, which outputs additional debugging information such as argument parsing details and execution steps.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be a non-empty string.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). **Validation Rules:**
  - The range value must not be empty.
  - It must match the pattern: `x=<min>:<max>,y=<min>:<max>` where `<min>` and `<max>` are numeric values. Both integers and floating point numbers are supported (e.g., "x=-1.5:2.5,y=-0.5:0.5").
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with a text annotation indicating the expression and range.
  - **.png**: Generates a PNG plot using dummy base64 encoded image data.
- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for image/svg+xml, image/png, and application/json.

### Examples

1. **Display Help Information:**

   ```bash
   node src/lib/main.js --help
   ```

2. **Display Version:**

   ```bash
   node src/lib/main.js --version
   ```

3. **Generate an SVG Plot via CLI:**

   ```bash
   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg [--verbose]
   ```

4. **Generate a PNG Plot via CLI:**

   ```bash
   node src/lib/main.js --expression "y=cos(x)" --range "x=-2.0:3.5,y=-1.5:1.5" --file output.png
   ```

5. **Run in Server Mode:**

   ```bash
   node src/lib/main.js --serve
   ```

## HTTP API: Dynamic Plot Generation

In addition to content negotiation via the Accept header, the `/plot` endpoint has been enhanced to support dynamic plot generation using URL query parameters. When making a GET request with the following query parameters, the API will dynamically generate and return the plot:

- **expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be provided and non-empty.
- **range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). Must be provided and match the required format: `x=<min>:<max>,y=<min>:<max>`, supporting both integers and floating point numbers.
- **fileType**: (Deprecated) Specifies the output type. Supported values are `svg` or `png`. 
- **format**: (Optional) Overrides the default or legacy fileType parameter. Supported values are:
  - `image/svg+xml` (default if neither parameter is provided)
  - `image/png`
  - `application/json`

### Behavior

- If query parameters are provided:
  - The endpoint validates that **expression** and **range** are non-empty and that **range** matches the required format.
  - The output format is determined by the `format` parameter if provided; otherwise, by the legacy `fileType` parameter; if neither is provided, the default is `image/svg+xml`.
  - **image/svg+xml**: Returns an SVG plot with a text annotation showing the expression and range, with the Content-Type set to `image/svg+xml; charset=utf-8`.
  - **image/png**: Returns a PNG image with dummy base64 encoded image data and Content-Type set to `image/png`.
  - **application/json**: Returns a JSON payload with plot details such as the expression, range, and a message.

- If any required query parameter is missing or invalid, the API responds with a 400 Bad Request and an appropriate error message.
- If no query parameters are provided, the endpoint falls back to the original behavior which relies on the Accept header for content negotiation.

### Examples

1. **Dynamic SVG Generation:**

   GET `/plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg`

2. **Dynamic PNG Generation:**

   GET `/plot?expression=y=cos(x)&range=x=-2.0:3.5,y=-1.5:1.5&fileType=png`

3. **Dynamic JSON Response:**

   GET `/plot?expression=y=log(x)&range=x=0:10,y=0:5&format=application/json`

4. **Error Cases:**

   - A missing or empty parameter (e.g., missing `expression` or `range`) will result in a 400 Bad Request with an appropriate error message.
   - A malformed `range` (e.g., "x=-1:1,y=abc") will also return a 400 Bad Request.

## Server Mode

To run the HTTP server (which provides the `/plot` endpoint), use the following flag:

   node src/lib/main.js --serve

The `/plot` endpoint supports both content negotiation based on the Accept header and dynamic plot generation via query parameters.
