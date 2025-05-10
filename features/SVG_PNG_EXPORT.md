# Summary

Add support for exporting plots as SVG and PNG image files from the CLI plot command. This feature enables users to generate vector and raster graphics directly, fulfilling the mission goal of producing SVG and PNG outputs.

# Behavior

When users invoke the plot command with the --svg flag:
- Parse expression or data file as usual.
- Generate an SVG document representing the chart with axes, lines or markers for data points.
- Write the SVG content to the specified file path and print a confirmation message.

When users invoke the plot command with the --png flag:
- Parse expression or data file as usual.
- Generate the same SVG document in memory.
- Use an image processing library to convert the SVG to a PNG buffer.
- Write the PNG buffer to the specified file path and print a confirmation message.

If both --svg and --png are provided, print an error and exit with code 1. If neither is provided, fall back to existing ASCII, HTML, or default behavior.

# CLI Flags

--svg <file.svg>    Path to write the SVG chart file. Must end with .svg.
--png <file.png>    Path to write the PNG chart file. Must end with .png.

# Implementation Details

- Extend parsePlotOptions in src/lib/main.js to detect --svg and --png flags and store opts.svg and opts.png values.
- In runPlot, after dataPoints generation and before ASCII or HTML output:
  • If opts.svg is set:
    - Validate file extension ends in .svg; on invalid extension print an error and exit.
    - Assemble an SVG string: include xml header, svg element with width and height, compute margins and scale factors, draw axes lines, and add a polyline or circle elements for each data point.
    - Write the SVG string to opts.svg using fs.writeFileSync.
    - Print confirmation "Wrote SVG chart to <file>" and return.
  • Else if opts.png is set:
    - Validate file extension ends in .png; on invalid extension print an error and exit.
    - Generate the same SVG string in memory.
    - Use the sharp library to convert svgBuffer to a PNG file: call sharp(svgBuffer).png().toFile(opts.png).
    - Await or handle the promise; on success print "Wrote PNG chart to <file>".
    - Handle errors by printing message and exiting with code 1.
- Add sharp to dependencies in package.json.

# Testing

- In tests/unit/plot-generation.test.js, mock fs.writeFileSync and the sharp conversion method:
  • Test that invoking main with --expression and --svg out.svg calls writeFileSync with correct path and that console.log prints confirmation.
  • Test error when svg path does not end in .svg.
  • Test that invoking main with --data and --png out.png calls sharp with the SVG buffer and calls toFile with correct path, and that console.log prints confirmation.
  • Test error when png path does not end in .png.
- Ensure existing ASCII and HTML tests continue to pass unchanged.

# Documentation

- Update README.md under Plot Subcommand examples to include:
  repository0-plot-code-lib plot --expression "x^2" --svg parabola.svg
  # Wrote SVG chart to parabola.svg

  repository0-plot-code-lib plot --data data.csv --png chart.png
  # Wrote PNG chart to chart.png

- Document the new --svg and --png flags in USAGE.md and note extension requirements.