# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It allows both command line interactions and HTTP API access to generate plots dynamically. The latest update enhances SVG plot generation by mathematically evaluating the provided expression using mathjs over 100 sample points, resulting in a real curve drawn with a <polyline> element on the plot.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--version**: Displays the current version (read from package.json) and exits immediately without processing any other flags. Note that if --version is provided alongside other flags, it takes precedence and no other actions are performed.
- **--verbose**: Enables verbose mode, which outputs additional debugging information such as argument parsing details and execution steps.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be a non-empty string. The expression should typically be prefixed with "y=" to denote the function.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). **Validation Rules:**
  - The range value must not be empty.
  - It must match the pattern: `x=<min>:<max>,y=<min>:<max>` where `<min>` and `<max>` are numeric values. Both integers and floating point numbers are supported (e.g., "x=-1.5:2.5,y=-0.5:0.5").
  - **Numeric Order Enforcement:** The tool enforces that for both x and y ranges, the lower bound must be less than the upper bound (e.g. for x, `x-min < x-max`; for y, `y-min < y-max`).
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot that now includes both a text annotation and a dynamically generated <polyline> element representing the evaluated curve over 100 sample points.
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
   This command produces an SVG file that contains the annotation text and a blue polyline representing the mathematically evaluated curve over 100 sample points. Note that the numeric ranges are validated; for example, passing a range like "x=5:1,y=0:10" will result in an error.

4. **Generate a PNG Plot via CLI:**

   ```bash
   node src/lib/main.js --expression "y=cos(x)" --range "x=-2.0:3.5,y=-1.5:1.5" --file output.png
   ```

5. **Run in Server Mode:**

   ```bash
   node src/lib/main.js --serve
   ```

## HTTP API: Dynamic Plot Generation

In addition to content negotiation via the Accept header, the `/plot` endpoint has been enhanced to support dynamic plot generation using URL query parameters. When making a GET request with the following query parameters, the API will dynamically generate and return the plot by mathematically evaluating the expression:

- **expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be provided and non-empty.
- **range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). Must be provided and match the required format: `x=<min>:<max>,y=<min>:<max>`, supporting both integers and floating point numbers. **Important:** The lower bounds must be less than the upper bounds for both x and y ranges.
- **fileType**: (Deprecated) Specifies the output type using shorthand values (`svg` or `png`).
- **format**: (Optional) Overrides the default or legacy fileType parameter. Supported values are:
  - `image/svg+xml` (which now produces an SVG plot with a dynamically generated polyline)
  - `image/png`
  - `application/json`

**Note:** When using dynamic query parameters, you must provide either `fileType` (with value `svg` or `png`) or `format` (with one of the allowed MIME types). If query parameters are provided, they take precedence over the Accept header used for content negotiation.

### Behavior

- If query parameters are provided:
  - The endpoint validates that **expression** and **range** are non-empty and that **range** matches the required format. It also checks that the numeric order is correct for both x and y ranges.
  - The output format is determined by the `format` parameter if provided; otherwise, by the legacy `fileType` parameter.
  - **image/svg+xml**: Returns an SVG plot with a text annotation and a blue polyline representing the evaluated curve, with the Content-Type set to `image/svg+xml; charset=utf-8`.
  - **image/png**: Returns a PNG image with dummy placeholder content and Content-Type set to `image/png`.
  - **application/json**: Returns a JSON payload with plot details such as the expression, range, and a message.

- If any required query parameter is missing or invalid, the API responds with a 400 Bad Request with an appropriate error message.
- If no query parameters are provided, the endpoint falls back to content negotiation based on the Accept header.

### Examples

1. **Dynamic SVG Generation:**

   GET `/plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg`

2. **Dynamic PNG Generation:**

   GET `/plot?expression=y=cos(x)&range=x=-2.0:3.5,y=-1.5:1.5&fileType=png`

3. **Dynamic JSON Response:**

   GET `/plot?expression=y=log(x)&range=x=0:10,y=0:5&format=application/json`

4. **Error Cases:**

   - Missing or empty parameters (e.g., missing `expression`, `range`, or the required `fileType`/`format`) will result in a 400 Bad Request with an appropriate error message.
   - A malformed `range` (e.g., "x=-1:1,y=abc") or one with invalid numeric order (e.g., "x=5:1,y=0:10" or "x=-1:1,y=10:0") will also return a 400 Bad Request.

## Server Mode

To run the HTTP server (which provides the `/plot` endpoint), use the following flag:

   node src/lib/main.js --serve

The `/plot` endpoint supports both content negotiation based on the Accept header and dynamic plot generation via query parameters.
