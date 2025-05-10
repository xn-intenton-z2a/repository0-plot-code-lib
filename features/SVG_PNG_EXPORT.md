# Summary
Add support for exporting plots as SVG and PNG image files using ChartJS server-side rendering and the sharp library. Users can supply --svg or --png flags to generate vector and raster graphics directly from the CLI.

# Behavior
When users invoke the plot command with --svg <file.svg>:
- Parse expression or data file using existing logic.
- Render the chart using Chart.js on a headless canvas into an SVG buffer.
- Validate the file path ends with .svg, write the SVG buffer to the file, and print a confirmation message.

When users invoke the plot command with --png <file.png>:
- Parse expression or data file using existing logic.
- Render the chart into an SVG buffer using Chart.js.
- Validate the file path ends with .png, convert the SVG buffer to a PNG buffer with sharp, write the PNG file, and print a confirmation.

If both --svg and --png are provided, print an error and exit code 1. If neither is provided, fall back to existing ASCII rendering behavior.

# CLI Flags
--svg <file.svg>    Path to write the SVG chart file. Must end with .svg.
--png <file.png>    Path to write the PNG chart file. Must end with .png.

# Implementation Details
1. Add dependencies:
   - chart.js
   - chartjs-node-canvas
   - sharp
2. In parsePlotOptions in src/lib/main.js:
   - Recognize --svg and --png flags and store opts.svg and opts.png.
3. In runPlot in src/lib/main.js, before ASCII chart logic:
   - If opts.svg or opts.png is set:
     • If both are set, console.error and process.exit(1).
     • Generate dataPoints via generateExpressionData or loadDataFromFile.
     • Import ChartJSNodeCanvas from chartjs-node-canvas.
     • Create an instance: const canvas = new ChartJSNodeCanvas({ width: opts.width, height: opts.height, chartCallback: Chart => { } });
     • Build a Chart.js configuration object with labels from dataPoints x values and a single dataset for y values.
     • Render an SVG buffer: await canvas.renderToBuffer(config, 'image/svg+xml').
     • If opts.svg is set:
         - Validate file extension .svg.
         - Write the SVG buffer to opts.svg using fs.writeFileSync or fs.promises.writeFile.
         - console.log("Wrote SVG chart to " + opts.svg).
         - return from runPlot.
     • If opts.png is set:
         - Validate file extension .png.
         - Use sharp(svgBuffer).png().toFile(opts.png).
         - On success console.log("Wrote PNG chart to " + opts.png).
         - On error console.error and process.exit(1).
4. Update package.json to include new dependencies.

# Testing
- In tests/unit/plot-generation.test.js:
  • Mock or spy on ChartJSNodeCanvas.renderToBuffer, fs.writeFileSync, and sharp(...).toFile.
  • Test main(["plot","--expression","x*2","--samples","5","--svg","out.svg"]): verify writeFileSync called with the correct path and content, and console.log confirmation.
  • Test error when svg path does not end in .svg: expect process.exit and error message.
  • Test main with --png out.png: verify sharp is called with the SVG buffer and toFile is invoked correctly, and console.log prints confirmation.
  • Ensure fallback to ASCII rendering remains unaffected when neither flag is provided.

# Documentation
- Update README.md under Plot Subcommand examples:
  repository0-plot-code-lib plot --expression "x^2" --svg parabola.svg
  # Wrote SVG chart to parabola.svg

  repository0-plot-code-lib plot --data data.csv --png chart.png
  # Wrote PNG chart to chart.png
- Update USAGE.md to document the new --svg and --png flags with examples and note extension requirements.