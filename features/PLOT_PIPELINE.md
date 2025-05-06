# Overview

Enhance the existing plot pipeline to fully implement rendering of time series data as SVG and PNG images and expose this via the CLI using the plot format flag. Ensure seamless integration of rendering into the data generation flow and robust error handling.

# Dependencies

Add the following to the dependencies in the project manifest

• chartjs-node-canvas for headless chart rendering
• canvas peer dependency required by chartjs-node-canvas

# Source File Updates

In src/lib/main js

1. Import ChartJSNodeCanvas from chartjs-node-canvas
2. Implement renderPlot function that accepts data array and options object with width height axis labels and format
   • Instantiate ChartJSNodeCanvas with provided dimensions
   • Configure a line chart with x and y axes grid lines and labels and single dataset mapping x to y
   • For svg format use renderToBuffer with mimeType image svg xml and convert buffer to string
   • For png format use renderToBuffer with mimeType image png and return buffer
3. In main function handle plot format flag
   • After generating time series data invoke renderPlot with data output format and dimensions defaulting to 800x600
   • Write svg string or png buffer to output path or stdout in binary mode
   • Use exit code zero on success and nonzero on errors

# Tests

Update tests in tests/unit

• Rendering should produce valid svg output containing svg element and xmlns attribute
• Rendering should produce a png buffer starting with PNG file signature bytes
• CLI integration tests for plot mode stub fs and ChartJSNodeCanvas to simulate render and file write
• Validate exit codes and error messages when rendering fails or unsupported format is specified

# Documentation

Update README md and USAGE md

• Document installation of chartjs-node-canvas and canvas
• Provide examples for generating plots in svg and png formats using plot format flag
• Show CLI invocation writing output file or piping to stdout
