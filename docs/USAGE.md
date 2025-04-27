# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It supports both command line interactions and HTTP API access to generate plots dynamically. This version includes enhanced expression validation and dynamic axis labels for SVG plots. The new expression validation layer detects common syntax errors before evaluation, providing clearer feedback to users.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--version**: Displays the current version (read from package.json) and exits immediately without processing any other flags. Note that if --version is provided alongside other flags, it takes precedence and no other actions are performed.
- **--verbose**: Enables verbose mode, which outputs additional debugging information such as argument parsing details and execution steps.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). **Note:** The expression must include the variable 'x'. Expressions like "y=5" or those with syntax errors will trigger an error.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). **Validation Rules:**
  - The range value must not be empty.
  - It must match the pattern: `x=<min>:<max>,y=<min>:<max>` where `<min>` and `<max>` are numeric values. Both integers and floating point numbers are supported (e.g., "x=-1.5:2.5,y=-0.5:0.5"). Extra whitespace is allowed.
  - **Numeric Order Enforcement:** The lower bound must be less than the upper bound for both x and y ranges.
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot including a text annotation, a blue polyline representing the evaluated curve, and dynamic axis labels that can be customized.
  - **.png**: Generates a PNG plot using dummy placeholder image data.
- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for `image/svg+xml`, `image/png`, and `application/json`.

## Enhanced Expression Validation

The tool now performs advanced pre-compilation validation of mathematical expressions. This validation detects common errors such as:

- **Missing Operators:** For example, an expression like "y=2 3+x" will trigger an error: "Error: Detected missing operator between numeric tokens. Please verify your expression format.". The suggested correction is to explicitly include an operator (e.g., "y=2*3+x").
- **Unbalanced Parentheses:** For example, an expression like "y=(x+2" will trigger an error: "Error: Unbalanced parentheses in expression. Please check your expression.". Ensure that all opening parentheses have matching closing parentheses.

This additional validation provides immediate and descriptive feedback, allowing users to correct common mistakes before evaluation.

## HTTP API: Dynamic Plot Generation and Aggregated Error Reporting

The `/plot` endpoint supports dynamic plot generation using URL query parameters. When making a GET request with query parameters, the API will:

- Validate that **expression** and **range** are provided and non-empty.
- Ensure that **range** matches the required format and that numeric orders are valid.
- Check that either the `fileType` (deprecated) or `format` parameter is provided.

If multiple input errors occur (for example, missing parameters and malformed values), the response aggregates all error messages and returns them together in a single 400 Bad Request response.

### Supported Output Formats

- **image/svg+xml**: Returns an SVG plot with dynamic axis labels and ARIA accessibility attributes.
- **image/png**: Returns a PNG image with placeholder content.
- **application/json**: Returns a JSON object with details about the plot generation request.

### Custom Axis Labels, Precision, Styling, Locale, Positioning, Rotation, and Accessibility

Advanced query parameters allow further customization of the generated SVG:

- **xlabel** and **ylabel**: Override default axis label texts.
- **xlabelFontSize**, **xlabelColor**, **ylabelFontSize**, **ylabelColor**: Directly set inline attributes on the axis labels for styles such as font size and fill color.
- **xlabelPrecision** and **ylabelPrecision**: Control the number of decimal places displayed in the axis labels.
- **locale**: Applies locale-aware number formatting (e.g., "de-DE").
- **xlabelX**, **xlabelY**, **ylabelX**, **ylabelY**: Custom positioning for the axis labels.
- **xlabelRotation** and **ylabelRotation**: Specify custom rotation angles for the labels.
- **xlabelOffsetX**, **xlabelOffsetY**, **ylabelOffsetX**, **ylabelOffsetY**: Precisely control label positioning with offsets.
- **xlabelAriaLabel** and **ylabelAriaLabel**: Override the default `aria-label` attributes for the x-axis and y-axis labels, respectively, to provide custom accessible descriptions.
- **xlabelAnchor** and **ylabelAnchor**: Override the default `text-anchor` attribute (default is "middle") for the x-axis and y-axis labels. Acceptable values include "start", "middle", and "end".

## Examples

1. **Dynamic SVG Generation with Default Axis Labels and Styling:**
   GET `/plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg`

2. **Dynamic SVG Generation with Custom Axis Labels:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabel=MyCustomX&ylabel=MyCustomY`

3. **Dynamic SVG Generation with Custom Axis Label Styling:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabelFontSize=16&xlabelColor=green&ylabelFontSize=18&ylabelColor=purple`

4. **Dynamic SVG with Numeric Precision Control:**
   GET `/plot?expression=y=sin(x)&range=x=0.1234:10.5678,y=-1.2345:5.6789&fileType=svg&xlabelPrecision=2&ylabelPrecision=3`

5. **Dynamic SVG with Locale-Aware Formatting:**
   GET `/plot?expression=y=sin(x)&range=x=0.1234:10.5678,y=-1.2345:5.6789&fileType=svg&locale=de-DE&xlabelPrecision=2&ylabelPrecision=3`

6. **Dynamic SVG with Custom Label Positioning, Rotation:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabelX=50&xlabelY=100&xlabelRotation=15&ylabelX=10&ylabelY=150&ylabelRotation=45`

7. **Dynamic SVG with Custom Axis Label Offsets:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabelOffsetX=100&xlabelOffsetY=120&ylabelOffsetX=15&ylabelOffsetY=80`

8. **Dynamic SVG with Custom ARIA Labels:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabelAriaLabel=CustomXDescription&ylabelAriaLabel=CustomYDescription`

9. **Dynamic SVG with Custom Text Anchoring:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabelAnchor=start&ylabelAnchor=end`

10. **Dynamic PNG Generation:**
    GET `/plot?expression=y=cos(x)&range=x=-2.0:3.5,y=-1.5:1.5&fileType=png`

11. **Dynamic JSON Response:**
    GET `/plot?expression=y=log(x)&range=x=1:10,y=0:5&format=application/json`
