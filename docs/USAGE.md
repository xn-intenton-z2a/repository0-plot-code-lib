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
- `--title`: (Optional) Specifies a custom plot title. If omitted, defaults to `Plot: <expression>`.
- `--xlabel` (or `--xLabel`): (Optional) Specifies a custom label for the X axis. Defaults to "X Axis" if not provided.
- `--ylabel` (or `--yLabel`): (Optional) Specifies a custom label for the Y axis. Defaults to "Y Axis" if not provided.
- `--marker-size`: (Optional) Specifies the radius of the marker circles. Defaults to 3 if not provided.
- `--marker-color`: (Optional) Specifies the fill color for the marker circles. Defaults to "red" if not provided.
- `--bgColor`: (Optional) Specifies a background color for the plot. When provided, a background rectangle will cover the canvas in the SVG/PNG output.
- `--gridColor`: (Optional) Specifies a grid line color to overlay on the plot. Requires `--grid-dasharray` to specify the dash pattern.
- `--grid-dasharray`: (Optional) Specifies a custom dash pattern for the grid lines. Defaults to "4" if not provided.
- `--font-family`: (Optional) Specifies a custom font family for text elements in the plot (title, x-axis label, y-axis label). Defaults to "sans-serif" if not provided.

### Generation Message Behavior

When all required options (`--expression`, `--range`, and `--file`) are provided:

- For SVG or PNG outputs, the CLI logs the following message to stdout:

  `Generating plot for expression <expression> with range <range> to file <file>.`
  
- For CSV outputs, the CLI logs the generation message to stderr so that stdout contains only the CSV data starting with the header "x,y".

### Example Usages

#### 1. Generating CSV Output

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv
```

Expected Output:
- A generation message is logged to stderr.
- The terminal prints a CSV string beginning with a header `x,y` followed by data rows (default 10 or as specified by `--points`).

#### 2. Generating an Enhanced SVG Plot

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --title "Custom Plot" --xlabel "Custom X" --ylabel "Custom Y" --marker-size 5 --marker-color green --font-family Courier
```

Expected Output:
- A generation message is logged to stdout:

  `Generating plot for expression y=sin(x) with range x=-1:1 to file output.svg.`

- An SVG file named `output.svg` is generated with:
  - Custom title "Custom Plot" in the specified font.
  - X and Y axis labels "Custom X" and "Custom Y" in the specified font.
  - Axis lines, a polyline connecting data points, and markers with radius 5 and fill color green.

#### 3. Generating a PNG Image

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png
```

Expected Output:
- A generation message is logged to stdout:

  `Generating plot for expression y=sin(x) with range x=0:6.28 to file output.png.`

- The generated SVG is converted to a PNG image using `sharp` and saved as `output.png`.

#### 4. Specifying a Custom Point Count

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 15 --file output.csv
```

Expected Output:
- A generation message is logged to stderr.
- The CSV output contains a header and exactly 15 data rows.

#### 5. Background and Grid Customization

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --bgColor "#f0f0f0" --gridColor "#cccccc" --grid-dasharray "2,2"
```

Expected Output:
- A generation message is logged to stdout.
- The SVG (or PNG) output includes a background rectangle filled with "#f0f0f0", and grid lines with stroke "#cccccc" using the dash pattern "2,2".

#### 6. Fallback Behavior

If required options are missing, the CLI outputs the provided options in JSON format. For example:

Command:
```
node src/lib/main.js --expression "y=sin(x)"
```

Might output:
```
{"expression":"y=sin(x)","range":undefined,"outputFile":undefined,"points":10}
```

## Conclusion

This guide details how to use **repository0-plot-code-lib** via its CLI to generate time series data and visual plots in CSV, SVG, or PNG formats. The tool offers flexible customization options for titles, axis labels, markers, backgrounds, grids, and font families, ensuring it meets a variety of plotting needs.
