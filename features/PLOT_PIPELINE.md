# Overview

Enhance plot rendering to support multiple series in a single chart and deliver full SVG and PNG output via CLI and programmatic API. Users can supply multiple expressions and matching ranges to compare functions on one line chart with distinct colors and labels.

# Source File Updates

In src/lib/main.js
1 Extend yargs options:
   • allow repeatable --expression and --range flags (type array) so users can pass multiple sets. expressions and ranges arrays must be same length.
   • keep existing --plot-format, --width, --height, --label-x, --label-y options.
2 In main(), when argv['plot-format'] is set:
   • read expressions and ranges arrays. for each pair:
     – parseExpression(expr)
     – parseRange(range)
     – generateTimeSeries(exprAst, variableName, start, end, step)
     – collect series objects with name equal to expr string or label override from argv.
   • call renderPlot(seriesList, options)
   • for svg output write utf8 text to file or console.log; for png write Buffer to file or process.stdout.write.
   • catch errors, print to stderr, return exit code 1.
3 Update renderPlot signature to accept an array of {label:string,data:Array<{x:number,y:number}>} and options:
   • instantiate ChartJSNodeCanvas with width, height, transparent background.
   • build config with type line, labels from union of all x values sorted, datasets array for each series with data(pointMapping), borderColor chosen from a predefined palette, label from series.label, fill false.
   • set axis titles if options.labels provided.
   • select mimeType from options.format svg or png; error for unsupported.
   • call renderToBuffer and return string for svg or Buffer for png.

# Tests

In tests/unit/plot-generation.test.js
• add unit test for renderPlot with two series: stub ChartJSNodeCanvas.renderToBuffer, call renderPlot([{label,a,data},{label b,data}]), verify config passed to stub includes two datasets with correct labels and color properties. assert SVG string or Buffer returned based on format.
• add CLI integration test for multi-series flags: mock renderPlot, run main() with --expression twice and --range twice and --plot-format svg and verify console.log or file write called correctly.

# Documentation

Update README.md and USAGE.md
• document repeatable --expression and --range options and requirement of matching counts.
• provide CLI example comparing x^2 and sin x in one chart to file and stdout in both svg and png.
• extend Programmatic API section to show how to construct series list and call renderPlot with multiple series.