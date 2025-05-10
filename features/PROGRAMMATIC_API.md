# Overview
Provide a programmatic JavaScript API for generating plots directly from code without invoking the CLI or HTTP server. This API enables users to import core plot functionality and integrate plot creation into their own scripts and applications.

# API
Exported functions from src/lib/main.js:

generatePlot(expressionOrData, options)
  expressionOrData  A string containing a mathematical formula or a path to a JSON or CSV data file
  options           An object with optional properties
    format          svg or png, default svg
    title           Plot title string
    xLabel          Label for the X axis
    yLabel          Label for the Y axis
  Returns a Promise resolving to a Buffer for PNG or a string for SVG output

# Implementation
Refactor src/lib/main.js to modularize the existing plot rendering logic into named exports. Add a function generatePlot that accepts input and options, validates parameters with Zod, loads data files with fs.promises, and invokes chartjs-node-canvas to render SVG or PNG. Maintain error handling through rejected Promises with descriptive messages.

# Testing
Add a new test file tests/unit/api.test.js:
  Import generatePlot from src/lib/main.js
  Test generating a simple plot from a formula and verify the returned output type and format header
  Test loading a sample JSON data file and verify plotted output
  Test error conditions such as invalid formula strings or missing data files and expect Promise rejections with error messages
  Use vitest mock for fs.promises and chartjs-node-canvas to control outputs

# Documentation Updates
Update README.md to include a "Programmatic API" section:
  Show example import usage
  Demonstrate generatePlot usage with code snippets and options
  Describe return types and error handling
Update USAGE.md to reference the API functions and link to examples in README.md