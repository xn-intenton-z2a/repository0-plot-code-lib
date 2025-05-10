# Summary

Add a new export subcommand that generates an interactive HTML file embedding a chart using Chart.js loaded from a CDN. Users can supply an expression or data file and export a fully self-contained web page showing the plotted result.

# Behavior

When the first argument is "export" is provided:
- Parse the same options as plot (expression, data, type, width, height, xmin, xmax, samples) plus a new --html flag for output path.
- Generate or load data points as in plot or stats.
- Create an HTML document string that:
  - Includes a canvas element sized according to width and height.
  - Loads Chart.js from a public CDN in a script tag.
  - Embeds a script that constructs a Chart instance using the chosen chart type and the data array of x and y values.
- Write the HTML string to the file path provided by --html and print a confirmation message with the output path.
- If the --html flag is missing or the path does not end in .html, print an error and exit with code 1.

# CLI Flags

--html <file>        Path to write the generated HTML file (required for export)
--expression <expr>   Mathematical expression in x to generate data
--data <filePath>     Path to JSON, YAML, or CSV data file
--type <chartType>    Chart style: line, bar, scatter (default line)
--width <number>      Width in pixels for the canvas (default 640)
--height <number>     Height in pixels for the canvas (default 480)
--xmin <number>       Minimum x value for sampling expressions (default -10)
--xmax <number>       Maximum x value for sampling expressions (default 10)
--samples <integer>   Number of sample points for expressions (default 100)
--help                Show help for export command and exit

# Implementation Details

In src/lib/main.js:
- Extend main() to dispatch when cmd === "export" and call a new runExport(rest) function.
- In runExport(optsArgs):
  - Call parsePlotOptions to extract expression, data, type, domain, samples, width, height.
  - Locate and remove the --html flag and its value. If missing or invalid, console.error and process.exit(1).
  - Determine dataPoints by evaluating expression or loading with loadDataFromFile.
  - Build an HTML string:
    - A DOCTYPE and HTML structure with head and body.
    - A canvas element with id "chart" and inline width and height attributes.
    - A script tag loading Chart.js from https://cdn.jsdelivr.net/npm/chart.js.
    - A script block that defines a labels array from dataPoints x and a dataset array from dataPoints y, then creates a new Chart(document.getElementById('chart'), { type, data, options }).
  - Use fs.promises.writeFile to write the HTML to the specified file and console.log a message "Exported HTML chart to <file>".

# Testing

In tests/unit/html-export.test.js:
- Mock fs.promises.writeFile and console.log.
- Provide a small sample data array or expression and call main(["export","--expression","x","--samples","3","--html","test.html"]).
- Verify writeFile was invoked with a string containing a canvas tag and a Chart constructor call.
- Test error conditions: missing --html flag or invalid file extension causes console.error and process.exit(1).

# Documentation

Update README.md and USAGE.md:
- Under Available Commands, add export with brief description.
- Show an example invocation:
    repository0-plot-code-lib export --expression "x^2" --xmin 0 --xmax 5 --samples 50 --html parabola.html
  and note that it writes an interactive HTML page using Chart.js.
- In USAGE.md, add a section for export with flag descriptions and example.
