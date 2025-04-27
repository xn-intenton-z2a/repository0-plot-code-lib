# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It supports both command line interactions and HTTP API access to generate plots dynamically. This version includes enhanced expression validation, dynamic axis labels for SVG plots, and a detailed JSON export option for plot data.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--version**: Displays the current version (read from package.json) and exits immediately without processing any other flags. Note that if --version is provided alongside other flags, it takes precedence.
- **--verbose**: Enables verbose mode, which outputs additional debugging information.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). **Note:** The expression must include the variable 'x'.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). 
  - Must follow the pattern: `x=<min>:<max>,y=<min>:<max>` with numeric values. Extra whitespace is allowed.
  - **Numeric Order Enforcement:** The lower bound must be less than the upper bound for both x and y ranges.
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with annotations and a blue polyline representing the curve.
  - **.png**: Generates a PNG plot using dummy placeholder image data.
- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for `image/svg+xml`, `image/png`, and `application/json`.
- **--jsonExport**: When provided with the value `true` alongside `--expression` and `--range` (and optionally `--file`), the tool outputs a detailed JSON export of the plot data instead of an image. This JSON includes:
  - `expression`: The original mathematical expression.
  - `range`: The input range string.
  - `points`: An array of 100 objects, each with numeric `x` and `y` properties representing computed plot points.
  - `computedXRange`: An object with keys `{ min, max }` reflecting the x-range limits from the input.
  - `computedYRange`: An object with keys `{ min, max }` representing the computed y-range based on evaluated points.
  - `axisLabels`: An object with keys `{ x, y }` containing descriptive strings for the x-axis and y-axis labels.

## Environment Variables and DOTENV Support

The application automatically loads environment variables from a `.env` file in the project root using the [dotenv](https://www.npmjs.com/package/dotenv) package. This allows you to configure settings like the server port without modifying the source code.

## Enhanced Expression Validation

The tool now validates mathematical expressions before evaluation to catch common errors such as:

- **Missing Operators:** e.g., "y=2 3+x" triggers an error recommending the use of an operator.
- **Unbalanced Parentheses:** e.g., "y=(x+2" will indicate mismatched parentheses.

## HTTP API: Dynamic Plot Generation and Aggregated Error Reporting

The `/plot` endpoint supports dynamic plot generation using URL query parameters. It performs the following validations:

- Ensures that **expression** and **range** are provided and non-empty.
- Validates that **range** follows the required format with correct numeric order.
- Checks for either the `fileType` (or `format`) parameter or, when detailed data is needed, the `jsonExport=true` flag.

### Supported Output Formats

- **image/svg+xml**: Returns an SVG plot with dynamic axis labels and ARIA accessibility attributes.
- **image/png**: Returns a PNG image with placeholder content.
- **application/json**: Returns a minimal JSON response with basic plot details (unless the detailed export is requested).

### Detailed JSON Export

When the query parameter `jsonExport=true` is provided (or the CLI flag `--jsonExport true` is used), the endpoint and CLI output a detailed JSON object containing:

- `expression`: The mathematical expression provided by the user.
- `range`: The input range string.
- `points`: An array of 100 computed plot point objects with numeric `x` and `y` values.
- `computedXRange`: The x-range limits extracted from the input.
- `computedYRange`: The computed minimum and maximum y values based on evaluation.
- `axisLabels`: Descriptive labels for the axes, e.g., "x-axis: 0 to 10".

#### Examples:

- **HTTP Detailed JSON Export:**

  GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&jsonExport=true`

- **CLI Detailed JSON Export:**

  `node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=0:10" --file output.json --jsonExport true`

## Customization Options for SVG Output

Advanced query parameters allow customization of the generated SVG plots, including:

- **Custom Axis Labels:** Set via `xlabel` and `ylabel`.
- **Styling:** Directly set attributes like `xlabelFontSize`, `xlabelColor`, `ylabelFontSize`, and `ylabelColor`.
- **Precision and Locale:** Control number formatting using `xlabelPrecision`, `ylabelPrecision`, and `locale`.
- **Label Positioning and Rotation:** Customize positions with `xlabelX`, `xlabelY`, `ylabelX`, `ylabelY`, and rotations with `xlabelRotation`, `ylabelRotation`.
- **ARIA Attributes and Text Anchoring:** Override default accessibility attributes using `xlabelAriaLabel`, `ylabelAriaLabel` and specify text anchor alignment using `xlabelAnchor` and `ylabelAnchor` (allowed values: start, middle, end). 

## Examples

1. **Dynamic SVG Generation with Default Axis Labels:**
   GET `/plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg`

2. **Dynamic SVG with Custom Axis Labels and Styling:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabel=MyCustomX&ylabel=MyCustomY&xlabelFontSize=16&xlabelColor=green&ylabelFontSize=18&ylabelColor=purple`

3. **Dynamic SVG with Numeric Precision, Locale Formatting, and Custom Text Anchor Alignment:**
   GET `/plot?expression=y=sin(x)&range=x=0.1234:10.5678,y=-1.2345:5.6789&fileType=svg&locale=de-DE&xlabelPrecision=2&ylabelPrecision=3&xlabelAnchor=start&ylabelAnchor=end`

4. **Detailed JSON Export via HTTP:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&jsonExport=true`

5. **Detailed JSON Export via CLI:**
   `node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=0:10" --file output.json --jsonExport true`
