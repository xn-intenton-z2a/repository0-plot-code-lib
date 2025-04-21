# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform mathematical expressions into time series data and generate visualizations. The tool supports a variety of expressions, enabling both data generation and visual plotting in multiple formats.

## Supported Mathematical Expressions

- **y=sin(x)**
- **y=cos(x)**
- **y=tan(x)**
- **y=log(x)**   (Note: Only computes log for x > 0; for x <= 0, returns 0)
- **y=exp(x)**
- **y=x^2**
- **y=sqrt(x)**  (Note: For x < 0, returns 0)
- **y=x^3**

## CLI Overview

The CLI functionality is provided by the `src/lib/main.js` script. It accepts several command-line options:

- `--expression`: Specifies the mathematical expression.
- `--range`: Defines the data range in the format `x=start:end` (e.g., "x=0:6.28").
- `--file`: Specifies the output file name and type, determining the output mode:
  - If the file ends with **.csv**, the CLI outputs CSV content to stdout. In this case, the generation message is logged to stderr so that the CSV output remains clean.
  - If it ends with **.svg**, the CLI generates an enhanced SVG file containing axes, a polyline, and data markers.
  - If it ends with **.png**, the tool converts the generated SVG content to a PNG image using `sharp`.
- `--points`: (Optional) Specifies the number of data points to generate. Defaults to 10 if omitted.
- `--title`: (Optional) Specifies a custom plot title to be displayed at the top center of the plot. If omitted, defaults to `Plot: <expression>`.
- `--xlabel` (or `--xLabel`): (Optional) Specifies a custom label for the X axis. Defaults to "X Axis" if not provided.
- `--ylabel` (or `--yLabel`): (Optional) Specifies a custom label for the Y axis. Defaults to "Y Axis" if not provided.
- `--marker-size`: (Optional) Specifies the radius of the marker circles in the plot. Defaults to 3 if not provided.
- `--marker-color`: (Optional) Specifies the fill color for the marker circles. Defaults to "red" if not provided.
- `--bgColor`: (Optional) Specifies a background color for the plot. When provided, a background rectangle will be added to the SVG/PNG output covering the entire canvas.
- `--gridColor`: (Optional) Specifies a grid line color. When provided, grid lines will be overlaid on the plot to enhance readability.
- `--grid-dasharray`: (Optional) Specifies a custom dash pattern for the grid lines. Defaults to "4" if not provided.
- `--font-family`: (Optional) Specifies a custom font family for all text elements in the plot (plot title, x-axis label, and y-axis label). Defaults to "sans-serif" if not provided.

### Generation Message Behavior

When all required options (`--expression`, `--range`, and `--file`) are provided:

- For SVG or PNG outputs, the CLI logs the message to stdout in the exact format:

  `Generating plot for expression <expression> with range <range> to file <file>.`
  
- For CSV outputs, the CLI logs the generation message to stderr so that stdout contains only the CSV data starting with the header "x,y".

## Detailed CLI Usage Examples

### 1. Generating CSV Output

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv
```

Expected Output:
- A generation message is logged to stderr.
- The terminal prints a CSV string beginning with a header `x,y` followed by data rows. The number of data rows will be default (10) or as specified with `--points`.

### 2. Generating an Enhanced SVG Plot with Custom Title, Axis Labels, Marker Options, and Font Family

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --title "Custom Plot" --xlabel "Custom X" --ylabel "Custom Y" --marker-size 5 --marker-color green --font-family Courier
```

Expected Output:
- A generation message is logged to stdout:

  `Generating plot for expression y=sin(x) with range x=-1:1 to file output.svg.`
  
- An SVG file named `output.svg` is generated. The SVG includes:
  - A custom title at the top center: "Custom Plot" with the font-family set to Courier.
  - X axis and Y axis labels with the provided texts: "Custom X" and "Custom Y" respectively, also using Courier font.
  - Axis lines (`<line>` elements), a polyline (`<polyline>`) connecting data points, and individual data point markers (`<circle>` elements) with a marker radius of 5 and fill color green.

### 3. Generating a PNG Image

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png
```

Expected Output:
- A generation message is logged to stdout:

  `Generating plot for expression y=sin(x) with range x=0:6.28 to file output.png.`
  
- The tool converts the generated SVG content into a PNG image using `sharp` and saves it as `output.png`.

### 4. Specifying a Custom Point Count

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 15 --file output.csv
```

Expected Output:
- A generation message is logged to stderr.
- The CLI prints CSV content with exactly 15 data rows (plus the header), as validated by tests.

### 5. Using Background, Grid, and Custom Grid Dash Pattern Options

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --bgColor "#f0f0f0" --gridColor "#cccccc" --grid-dasharray "2,2"
```

Expected Output:
- A generation message is logged to stdout.
- The SVG (or converted PNG) file will include a background rectangle filled with "#f0f0f0", grid lines drawn with the stroke "#cccccc", and the grid lines will use a dash pattern of "2,2".

### 6. Fallback Behavior

If not all required options are provided, the CLI outputs the provided options in JSON format. For example:
```
node src/lib/main.js --expression "y=sin(x)"
```

Might output:
```
{"expression":"y=sin(x)","range":undefined,"outputFile":undefined,"points":10}
```

## Conclusion

This guide provides detailed CLI usage examples and describes the key features of repository0-plot-code-lib. The documented commands are validated by comprehensive tests, ensuring that the tool behaves as expected in generating CSV, SVG, and PNG outputs, along with support for custom marker, background/grid, grid dash pattern, and font family options. Happy plotting!
