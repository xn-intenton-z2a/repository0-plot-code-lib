## Usage Guide for repository0-plot-code-lib

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It supports both command line interactions and HTTP API access to generate plots dynamically. This version includes enhanced expression validation, dynamic axis labels for SVG plots, adaptive resolution, curve smoothing, detailed JSON export for plot data, environment variable interpolation for configuration files (with support for default fallback values), dynamic color gradient support for SVG outputs, custom SVG dimensions, optional marker support with accessibility improvements, and new SVG styling options for stroke width, dash patterns, and line cap styles.

### CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--version**: Displays the current version and exits immediately without processing any other flags.
- **--verbose**: Enables verbose mode, which outputs additional debugging information.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). **Note:** The expression must include the variable 'x'.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1").
  - Must follow the pattern: `x=<min>:<max>,y=<min>:<max>` with numeric values. Extra whitespace is allowed.
  - **Numeric Order Enforcement:** The lower bound must be less than the upper bound for both x and y ranges.
  - **Enhanced Error Feedback:** 
    - If the range format is malformed, an error message is provided.
    - If the numeric order is invalid, a specific error message is shown.
- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with annotations and a plot element.
  - **.png**: Generates a PNG plot using dummy placeholder image data.

Other important flags include:

- **--width** and **--height**: Specify custom dimensions for the generated SVG plot. Defaults are 300 (width) and 150 (height).
- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for SVG, PNG, and JSON.
- **--jsonExport**: Outputs a detailed JSON export of the plot data instead of an image when set to true.
- **--config**: Specifies a path to an external configuration file (JSON or YAML) with support for environment variable interpolation and CLI overrides.
- **--env**: Specifies a custom path to a .env file from which environment variables are loaded.

### Advanced Plot Customizations

#### Curve Smoothing

- **--smooth**: When enabled with "true", renders the plot as a smooth curve using quadratic Bezier interpolation.
- **--smoothingFactor**: A value between 0 and 1 (default 0.5) that fine-tunes the smoothness of the curve.

#### Stroke Styling

- **--strokeWidth**: Specifies the stroke width for the plot curve (must be a positive number).
- **--strokeDashArray**: Specifies a dash pattern (e.g., "5,5") for the stroke.
- **--strokeLinecap**: Specifies the style for stroke end caps. Allowed values are `butt`, `round`, or `square`.

#### Marker Customization

You can customize marker appearance on the plot curve using the following parameters:

- **--markerStart** and **--markerEnd**: When set to "true", adds marker arrowheads at the start and/or end of the curve.
- **--markerShape**: Specifies the SVG element to use for the marker (default is `path`).
- **--markerWidth** and **--markerHeight**: Specify the dimensions of the marker. Defaults are 10 if not provided.
- **--markerFill**: Specifies the fill color for the marker. Defaults to "black".

*Example:*
```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=0:10" --file plot.svg --markerStart true --markerEnd true --markerShape path --markerWidth 12 --markerHeight 12 --markerFill orange
```

#### Extended Gradient Configuration

The library supports dynamic color gradients for the plot stroke. Use the following parameters to customize the gradient:

- **--colorGradient**: When set to "true", enables gradient coloring.
- **--gradientStartColor** and **--gradientEndColor**: Define a simple two-stop gradient if no extended configuration is provided.
- **--gradientStops**: Provide a JSON array string to define multiple gradient stops. Each stop should be an object with at least `offset` and `stopColor`, and optionally `stopOpacity`.

*Example:*
```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=0:10" --file plot.svg --colorGradient true \
  --gradientStops '[{"offset": "0%", "stopColor": "green"}, {"offset": "50%", "stopColor": "purple", "stopOpacity": "0.5"}, {"offset": "100%", "stopColor": "yellow"}]'
```

### Marker and Accessibility Enhancements

- **--svgRole**: Sets a custom role attribute on the SVG element (e.g., `img`).
- **--xlabelAriaLabel** and **--ylabelAriaLabel**: Customize ARIA labels for the axis texts.
- **--xlabelAnchor** and **--ylabelAnchor**: Specify the text anchor alignment (`start`, `middle`, or `end`) for the axis labels.

### Examples

1. **Generate a Basic SVG Plot with Default Settings:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg
   ```

2. **Generate an SVG Plot with Custom Dimensions and 150 Points Resolution:**
   ```sh
   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --resolution 150 --width 500 --height 400
   ```

3. **Generate a Smooth SVG Plot with Custom Smoothing Factor:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&smooth=true&smoothingFactor=0.7&fileType=svg
   ```

4. **Detailed JSON Export with Custom Resolution:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&resolution=200&jsonExport=true
   ```

5. **Generate an SVG with a Dynamic Color Gradient:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&colorGradient=true&gradientStartColor=blue&gradientEndColor=red
   ```

6. **Generate an SVG with Extended Gradient Stops:**
   ```sh
   node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=0:10" --file output.svg --colorGradient true \
     --gradientStops '[{"offset": "0%", "stopColor": "green"}, {"offset": "50%", "stopColor": "purple", "stopOpacity": "0.5"}, {"offset": "100%", "stopColor": "yellow"}]'
   ```

7. **Generate an SVG with Markers, Custom Stroke Styles, and Stroke Line Cap:**
   ```sh
   node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=0:10" --file output.svg --markerStart true --markerEnd true --svgRole img --strokeWidth 2 --strokeDashArray "5,5" --strokeLinecap round
   ```

8. **Using an External Configuration File with CLI Overrides:**
   ```sh
   node src/lib/main.js --config config.json --expression "y=sin(x)" --file output.svg --width 600 --height 400 --ylabel "CLI_YAxis"
   ```
