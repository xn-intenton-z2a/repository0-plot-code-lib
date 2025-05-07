# CHARTJS_RENDERING

# Overview
Integrate ChartJSNodeCanvas into the existing renderPlot pipeline to offer advanced, themeable line chart rendering using Chart.js. This feature adds a simple switch to opt into ChartJS-based generation, supports custom configuration overrides, and cleanly falls back to the manual SVG path approach when not enabled.

# CLI Interface
Add two new optional flags to the CLI:

--chartjs          Enable Chart.js rendering via ChartJSNodeCanvas. Defaults to false.
--chart-config     Path to a JSON file with Chart.js config overrides (data and options sections).

# Implementation Details
1. Extend parseArgs in src/lib/main.js to recognize --chartjs and --chart-config flags and store them on opts.chartjs (boolean) and opts.chartConfig (string).
2. In main(), after data generation, branch on opts.chartjs:
   • Import ChartJSNodeCanvas from chartjs-node-canvas.
   • Instantiate ChartJSNodeCanvas with width and height from options or defaults.
   • If opts.chartConfig is provided, read and parse the JSON config file.
   • Construct a default Chart.js configuration object:
     - type set to line
     - data.labels as the array of x values
     - data.datasets with a single series containing y values, borderColor black, no fill
     - options.scales.x and options.scales.y with axis titles and grid display
     - options.plugins.legend enabled
   • Deep merge the parsed override config into the default config using a utility such as lodash.merge.
   • For SVG output: call renderToBuffer with type svg and the merged config, convert the buffer to string, and write or return it.
   • For PNG output: call renderToBuffer with type png, then write the returned buffer to file or stdout.
3. When opts.chartjs is false, continue to call the original renderPlot function.
4. Ensure error handling for invalid chart-config path or parse errors: print a clear error message to stderr and exit code 1.

# Behavior
- Default CLI operation remains unchanged unless --chartjs is specified.
- With --chartjs, users receive a Chart.js–styled chart that honors theme and advanced options.
- Custom overrides allow users to adjust dataset labels, colors, line tension, plugins, and other Chart.js options without changing code.
- Robust error handling ensures users receive feedback on malformed configs.

# Tests
1. Unit tests for renderPlotChartjs:
   • Simulate a small data set with opts.chartjs true and verify the returned string begins with <svg or buffer has PNG signature.
   • Test deep merge behavior by supplying a minimal override that changes line color and confirming its effect.
2. CLI integration tests:
   • Invoke CLI with --expression "y=x" --range 0:1 --points 2 --format svg --chartjs and assert stdout starts with <svg.
   • Invoke CLI with same parameters and --format png --chartjs and assert the first eight bytes match PNG signature.
   • Provide an invalid --chart-config path and verify exit code 1 and error message.

# Documentation Updates
- In USAGE.md, under Generating Plots, add a subsection Chart.js Rendering describing the --chartjs and --chart-config flags with example commands.
- In README.md under Examples, add an entry showing SVG via Chart.js and PNG via Chart.js with a custom config file.
- Mention that Chart.js rendering supports themes, legends, axis labels, and deep configuration overrides.