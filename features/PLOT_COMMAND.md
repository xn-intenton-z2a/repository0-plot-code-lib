# Summary

Enhance the existing plot subcommand to support exporting interactive HTML charts in addition to ASCII art and image files. Users can supply an --html flag to generate a standalone web page embedding Chart.js for dynamic visualization of expression-generated or external data.

# Behavior

When users invoke the plot command:

- If the --html flag is provided with a path ending in .html:
  - Parse expression or load data from JSON, YAML, or CSV as before.
  - Build an HTML document string:
    • Include a DOCTYPE, html, head, and body structure.
    • Add a canvas element with width and height attributes matching options.
    • Load Chart.js from a public CDN via a script tag.
    • Embed a script that constructs a Chart instance on the canvas using the selected chart type and the data points.
  - Write the HTML string to the specified file path and print a confirmation message "Wrote HTML chart to <file>".
  - Exit successfully.

- Otherwise, fall back to existing behavior:
  - Generate data from an expression or file.
  - Render ASCII art charts via renderAsciiChart and output to console or file when --output is set.

# CLI Flags

--expression <expr>    JavaScript expression in x to generate y values (expression mode overrides data mode)
--data <filePath>      Path to JSON, YAML, or CSV data file
--type <chartType>     Chart style: line, bar, scatter (default: line)
--xmin <number>        Minimum x value for sampling expressions (default: -10)
--xmax <number>        Maximum x value for sampling expressions (default: 10)
--samples <integer>    Number of sample points (default: 100)
--width <number>       Width in pixels for HTML canvas or columns for ASCII (default: 640)
--height <number>      Height in pixels for HTML canvas or rows for ASCII (default: 480)
--output <file>        Path to write rendered ASCII chart; omit to render to console
--html <file.html>     Path to write interactive HTML chart (takes precedence over --output)
--help                 Show help for plot command and exit

# Implementation Details

1. Update parsePlotOptions in src/lib/main.js to recognize an --html flag and store its value if provided.
2. In runPlot handler:
   - After parsing opts, if opts.html is set:
     • Validate that the path ends in .html; if not, console.error and process.exit(1).
     • Generate or load dataPoints via generateExpressionData or loadDataFromFile.
     • Construct a string htmlContent:
         - A DOCTYPE and html structure with head and body.
         - A canvas element with id "chartCanvas" and inline width and height.
         - A script tag loading Chart.js from https://cdn.jsdelivr.net/npm/chart.js.
         - A script block that:
             ▶ Collects labels from dataPoints x values.
             ▶ Collects data array from dataPoints y values.
             ▶ Creates new Chart(document.getElementById('chartCanvas'), { type, data: { labels, datasets: [{ label: 'Series', data }] }, options: {} });
     • Use fs.writeFileSync(opts.html, htmlContent, 'utf8') to write the file.
     • console.log("Wrote HTML chart to " + opts.html).
     • return.
   - Existing ASCII path remains unchanged.

3. Reuse loadDataFromFile and generateExpressionData helpers without modification.

# Testing

- In tests/unit/plot-generation.test.js:
  • Mock fs.readFileSync to provide sample data for --data tests.
  • Spy on fs.writeFileSync and console.log for HTML export tests.
  • Add a test: invoke main(["plot","--expression","x*2","--samples","5","--html","out.html"]), assert writeFileSync was called with "out.html" and content contains '<canvas', 'new Chart'.
  • Test error when path does not end with .html: expect process.exit and error message.

# Documentation

- Update README.md under Plot Subcommand:
  • Document --html flag and note that it generates an HTML file using Chart.js.
  • Provide an example:
      repository0-plot-code-lib plot --expression "x^2" --xmin 0 --xmax 5 --samples 50 --html parabola.html
      # Wrote HTML chart to parabola.html

- Update USAGE.md under Options for plot:
  • Add --html <file.html> description.
  • Show example invocation and note interactive capabilities in browser.