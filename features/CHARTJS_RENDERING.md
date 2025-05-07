# Overview

Integrate ChartJSNodeCanvas into renderPlot to produce high-quality, styled line charts using Chart.js under the hood. This enables advanced chart features such as axes labels, legends, gridlines, and theming while preserving existing renderPlot API compatibility.

# CLI Interface

Add new optional flags:

--chartjs            Enable ChartJS-based rendering instead of manual path generation.  Defaults to false.
--chart-config       Optional path to a JSON file containing Chart.js configuration overrides (data and options sections).

# Behavior

1. Extend parseArgs to support --chartjs and --chart-config flags.
2. When --chartjs is provided:
   • Import and instantiate ChartJSNodeCanvas with width and height from existing options.
   • Load config overrides if --chart-config is given by reading and parsing the specified JSON file.
   • Construct a default Chart.js configuration:
     - type: 'line'
     - data: { labels: data.map(p => p.x), datasets: [{ label: 'Series', data: data.map(p => p.y), borderColor: 'black', fill: false }] }
     - options: { scales: { x: { type: 'linear', title: { display: true, text: 'x' } }, y: { title: { display: true, text: 'y' } } }, plugins: { legend: { display: true } } }
   • Merge overrides into default config deeply.
   • For SVG format: call chartJSNodeCanvas.renderToBuffer({ chartCallback: undefined, type: 'svg', data: config.data, options: config.options }). Convert buffer to string and return or write.
   • For PNG format: call chartJSNodeCanvas.renderToBuffer({ chartCallback: undefined, type: 'png', data: config.data, options: config.options }). Write the buffer to file or stdout.
3. When --chartjs is absent, preserve existing manual renderPlot behavior.

# Tests

Create tests/unit/render-plot-chartjs.test.js:

• Call renderPlot with a simple data set and options { width: 200, height: 100, margin: 20, chartjs: true }.  Assert returned string or buffer begins with <svg for SVG or has PNG signature bytes for PNG conversion.
• Invoke CLI with --expression "y=x" --range 0:1 --points 2 --format svg --chartjs and capture stdout.  Assert output starts with <svg.
• Invoke CLI with same parameters plus --format png --chartjs and assert the first eight bytes match the PNG signature.
• Test that providing an invalid --chart-config path prints an error and exits with code 1.

# Documentation Updates

- In USAGE.md under Generating Plots, add a subsection "Chart.js Rendering" describing the --chartjs and --chart-config flags with example commands.
- In README.md under Examples, add invocations:

  # SVG via Chart.js
  repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --chartjs

  # PNG via Chart.js with custom config
  repository0-plot-code-lib --expression "y=x^2" --range -5:5 --points 50 --format png --chartjs --chart-config custom-chart-config.json

Include a brief note that Chart.js-based rendering supports advanced styling and theming.