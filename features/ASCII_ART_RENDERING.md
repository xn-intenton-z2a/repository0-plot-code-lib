# Summary

Enhance the existing plot subcommand to render generated or imported data as ASCII art charts directly in the console or write the ASCII output to a file. This feature enables users who supply an --expression flag or --data file to see visual representations in plain text without requiring external GUI tools.

# Behavior

When users invoke the plot command with expression or data options:

- After parsing and generating the array of data points:
  - Scale x and y values into a character grid of specified width and height.
  - Map each point to the nearest grid cell and use characters (e.g., ‘*’ or ‘#’) to represent plotted points.
  - Surround the chart with axes labels and optional grid lines for readability.
- If the --output flag is omitted:
  - Print the ASCII chart to standard output followed by a summary of plotted range and sample count.
- If the --output flag is provided with a file path:
  - Write the ASCII chart text into the specified file and print a confirmation message with the file path.

# CLI Flags

--type <chartType>    Chart style: line, bar, scatter (default line) affects ASCII connection or marker style
--width <number>      Number of characters horizontally in the grid (default 80)
--height <number>     Number of characters vertically (default 24)
--expression <expr>   JavaScript expression in x to generate points
--data <filePath>     Path to JSON, YAML, or CSV data file
--output <file>       Path to write ASCII chart; omit to render to console

# Implementation Details

- In runPlot handler inside src/lib/main.js:
  - After dataPoints are available, invoke a new function renderAsciiChart(dataPoints, opts) to produce a string.
  - Implement renderAsciiChart to:
    - Determine data bounds (xmin, xmax, ymin, ymax).
    - Compute grid cell size based on width and height.
    - Initialize a 2D array of spaces and place markers according to scaled indices.
    - Join rows into lines prefixed by y-axis labels, add an x-axis line at the bottom with ticks.
  - If opts.output is set, use fs.promises.writeFile to create or overwrite the file with the chart text; otherwise console.log the chart.
- Reuse existing flag parsing and expression/data loading logic.

# Testing

- In tests/unit/plot-generation.test.js:
  - Mock console.log or fs.writeFile to capture the ASCII output string.
  - Provide a simple expression (e.g., x or x^2) over a small sample count and assert that rendered lines contain expected markers at known rows and columns.
  - Test --output flag writes a file by mocking fs.writeFile and verifying correct content.
  - Ensure error paths (zero samples or empty data array) throw or print descriptive messages.

# Documentation

- Update README.md under Plot Command Examples:
  - Show a small 10x5 ASCII chart for expression "x" with width 10, height 5.
  - Show writing to parabola.txt and include a snippet of the ASCII file content.
- Add a note in USAGE.md describing ASCII rendering behavior and default console output dimensions.
