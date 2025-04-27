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

## HTTP API: Dynamic Plot Generation and Aggregated Error Reporting

The `/plot` endpoint supports dynamic plot generation using URL query parameters. When making a GET request with query parameters, the API will:

- Validate that **expression** and **range** are provided and non-empty.
- Ensure that **range** matches the required format and that numeric orders are valid.
- Check that either the `fileType` (deprecated) or `format` parameter is provided. 

If multiple input errors occur (for example, missing parameters and malformed values), the endpoint aggregates all the error messages and returns them together in a single 400 Bad Request response. This aggregated error message provides comprehensive feedback on all input issues, helping the user correct them in one go.

### Supported Output Formats

- **image/svg+xml**: Returns an SVG plot with dynamic axis labels (or custom labels if provided via query parameters).
- **image/png**: Returns a PNG image with placeholder content.
- **application/json**: Returns a JSON object with details about the plot generation request.

### Custom Axis Labels, Precision, and Styling via Query Parameters

In addition to the default axis labeling which is based on the numeric ranges, the `/plot` endpoint now supports additional optional query parameters for customizing the appearance of the axis labels:

- **xlabel**: Overrides the default x-axis label text. For example, if you provide `xlabel=MyCustomX`, the label will display "MyCustomX".
- **ylabel**: Overrides the default y-axis label text. For example, if you provide `ylabel=MyCustomY`, the label will display "MyCustomY".
- **xlabelFontSize**: Sets the font size for the x-axis label. Default is `12` if not provided.
- **xlabelColor**: Sets the color (fill) for the x-axis label text. Default is `black` if not provided.
- **ylabelFontSize**: Sets the font size for the y-axis label. Default is `12` if not provided.
- **ylabelColor**: Sets the color (fill) for the y-axis label text. Default is `black` if not provided.
- **xlabelPrecision**: Specifies the number of decimal places to display for the numeric values in the x-axis label. For example, setting `xlabelPrecision=2` formats the numbers to two decimal places.
- **ylabelPrecision**: Specifies the number of decimal places to display for the numeric values in the y-axis label. For example, setting `ylabelPrecision=3` formats the numbers to three decimal places.

### Aggregated Error Reporting (CLI and HTTP)

Both the CLI and HTTP API now aggregate multiple input errors and report them in a single response. For example:

- In CLI mode, if both the `--expression` and `--range` flags are missing or empty, the tool will output a combined error message such as:

  "Error: --expression flag must have a non-empty value. Error: --range flag must have a non-empty value."

- In HTTP mode, if the query parameters are missing or malformed, the response might include:

  "Missing or empty 'expression' query parameter. Malformed 'range' query parameter."

## Examples

1. **Dynamic SVG Generation with Default Axis Labels and Styling:**

   GET `/plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg`

2. **Dynamic SVG Generation with Custom Axis Labels:**

   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabel=MyCustomX&ylabel=MyCustomY`

3. **Dynamic SVG Generation with Custom Axis Label Styling:**

   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabelFontSize=16&xlabelColor=green&ylabelFontSize=18&ylabelColor=purple`

4. **Dynamic SVG Generation with Numeric Precision Control:**

   GET `/plot?expression=y=sin(x)&range=x=0.1234:10.5678,y=-1.2345:5.6789&fileType=svg&xlabelPrecision=2&ylabelPrecision=3`

5. **Dynamic PNG Generation:**

   GET `/plot?expression=y=cos(x)&range=x=-2.0:3.5,y=-1.5:1.5&fileType=png`

6. **Dynamic JSON Response:**

   GET `/plot?expression=y=log(x)&range=x=0:10,y=0:5&format=application/json`
