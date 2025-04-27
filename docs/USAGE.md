# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It supports both command line interactions and HTTP API access to generate plots dynamically. This version includes a new feature: dynamic axis labels for SVG plots, which enhances the interpretability of the resulting plots by displaying the numerical ranges used. Additionally, users can now override the default axis labels using custom query parameters, including custom styling options.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--version**: Displays the current version (read from package.json) and exits immediately without processing any other flags. Note that if --version is provided alongside other flags, it takes precedence and no other actions are performed.
- **--verbose**: Enables verbose mode, which outputs additional debugging information such as argument parsing details and execution steps.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be a non-empty string and **must include the variable 'x'**. For example, an expression like "y=5" is invalid and will result in an error: "Error: Expression must include the variable 'x'. Please refer to the usage guide for the correct format." 
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). **Validation Rules:**
  - The range value must not be empty.
  - It must match the pattern: `x=<min>:<max>,y=<min>:<max>` where `<min>` and `<max>` are numeric values. Both integers and floating point numbers are supported (e.g., "x=-1.5:2.5,y=-0.5:0.5"). Extra whitespace around numbers and delimiters is allowed.
  - **Numeric Order Enforcement:** The tool enforces that for both x and y ranges, the lower bound must be less than the upper bound. If this condition is not met, an error is returned. The error messages have been enhanced to include the provided invalid range. For example:
    - For x-range: "Error: Invalid range for x (provided: x=5:1). Ensure the minimum value is less than the maximum value."
    - For y-range: "Error: Invalid range for y (provided: y=10:0). Ensure the minimum value is less than the maximum value."
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot that includes a text annotation, a blue polyline representing the evaluated curve over 100 sample points, and dynamic axis labels. The x-axis label appears at the bottom center and the y-axis label appears along the left side with rotation.
  - **.png**: Generates a PNG plot using dummy placeholder base64 encoded image data.
- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for `image/svg+xml`, `image/png`, and `application/json`.

## Custom Axis Labels and Styling via Query Parameters

In addition to the default axis labeling which is based on the numeric ranges, the `/plot` endpoint now supports additional optional query parameters for customizing the appearance of the axis labels:

- **xlabel**: Overrides the default x-axis label text. For example, if you provide `xlabel=MyCustomX`, the label will display "MyCustomX".
- **ylabel**: Overrides the default y-axis label text. For example, if you provide `ylabel=MyCustomY`, the label will display "MyCustomY".
- **xlabelFontSize**: Sets the font size for the x-axis label. Default is `12` if not provided.
- **xlabelColor**: Sets the color (fill) for the x-axis label text. Default is `black` if not provided.
- **ylabelFontSize**: Sets the font size for the y-axis label. Default is `12` if not provided.
- **ylabelColor**: Sets the color (fill) for the y-axis label text. Default is `black` if not provided.

### Examples

1. **Dynamic SVG Generation with Default Axis Labels and Styling:**

   GET `/plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg`

2. **Dynamic SVG Generation with Custom Axis Labels:**

   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabel=MyCustomX&ylabel=MyCustomY`

3. **Dynamic SVG Generation with Custom Axis Label Styling:**

   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabelFontSize=16&xlabelColor=green&ylabelFontSize=18&ylabelColor=purple`

4. **Dynamic PNG Generation:**

   GET `/plot?expression=y=cos(x)&range=x=-2.0:3.5,y=-1.5:1.5&fileType=png`

5. **Dynamic JSON Response:**

   GET `/plot?expression=y=log(x)&range=x=0:10,y=0:5&format=application/json`

## Improved Error Messages

The tool now provides more detailed error messages to help diagnose input issues:

- **x-range Error:** If the x-range values are in the wrong order, the error will indicate the provided range. Example: "Error: Invalid range for x (provided: x=5:1). Ensure the minimum value is less than the maximum value."
- **y-range Error:** Similarly, if the y-range values are reversed, the error will read: "Error: Invalid range for y (provided: y=10:0). Ensure the minimum value is less than the maximum value."
- **Expression Error:** If the expression does not include the variable 'x', the error will prompt: "Error: Expression must include the variable 'x'. Please refer to the usage guide for the correct format."
- **Non-finite Evaluation Error:** If during the evaluation of the mathematical expression any y-value is not a finite number, the tool will throw an error such as: "Error: Expression evaluation resulted in an invalid number at x=<value>".

## HTTP API: Dynamic Plot Generation

In addition to content negotiation via the Accept header, the `/plot` endpoint has been enhanced to support dynamic plot generation using URL query parameters. When making a GET request with the following query parameters, the API will dynamically generate and return the plot by mathematically evaluating the expression:

- **expression**: The mathematical expression to plot (e.g., "y=sin(x)"). Must be provided and non-empty. The expression **must include the variable 'x'**.
- **range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). Must be provided and match the required format: `x=<min>:<max>,y=<min>:<max>`, supporting both integers and floating point numbers. Extra whitespace is allowed.
- **fileType**: (Deprecated) Specifies the output type using shorthand values (`svg` or `png`).
- **format**: (Optional) Overrides the default or legacy fileType parameter. Supported values are:
  - `image/svg+xml` (which produces an SVG plot with dynamic labels)
  - `image/png`
  - `application/json`
- **xlabel** and **ylabel**: Custom text for the axis labels (optional).
- **xlabelFontSize**, **xlabelColor**, **ylabelFontSize**, **ylabelColor**: Custom styling options for the axis labels (optional).

**Note:** When using dynamic query parameters, you must provide either `fileType` (with value `svg` or `png`) or `format` (with one of the allowed MIME types). If query parameters are provided, they take precedence over the Accept header used for content negotiation.

### Behavior

- If query parameters are provided:
  - The endpoint validates that **expression** and **range** are non-empty and that **range** matches the required format. It also checks that the numeric order is correct for both x and y ranges.
  - The output format is determined by the `format` parameter if provided; otherwise, by the legacy `fileType` parameter.
  - **image/svg+xml**: Returns an SVG plot with the dynamic axis labels (or custom labels and styling if provided) and other plot details, with the Content-Type set to `image/svg+xml; charset=utf-8`.
  - **image/png**: Returns a PNG image with dummy placeholder content and Content-Type set to `image/png`.
  - **application/json**: Returns a JSON payload with plot details such as the expression, range, and a message.
- If any required query parameter is missing or invalid, the API responds with a 400 Bad Request with a clear error message (now including helpful hints).
- If the mathematical evaluation results in any non-finite number, the API responds with a 400 Bad Request and an error message indicating the problematic x value.
- If no query parameters are provided, the endpoint falls back to content negotiation based on the Accept header.

## Server Mode

To run the HTTP server (which provides the `/plot` endpoint), use the following flag:

   node src/lib/main.js --serve

The `/plot` endpoint supports both content negotiation based on the Accept header and dynamic plot generation via query parameters.
