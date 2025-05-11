# Overview
Add support to compute and render the first derivative of a mathematical expression alongside the original curve in a single plot.

# CLI Flags
- --derivative <true or false>: Boolean flag to enable overlay of the first derivative curve; when true, display both the original series and its derivative.

# Implementation
1. Schema and Argument Parsing
   * In cliSchema in src/lib/main.js add an optional field derivative as a string matching true or false.
   * After schema validation convert parsedArgs.derivative to a boolean value showDerivative.
2. Derivative Calculation
   * Use mathjs.derivative to compute the symbolic derivative of the provided expression.
   * Implement a helper generateDerivativeData(expression, rangeObj, samples) that compiles the derivative expression and produces an array of {x,y} points as generateData does.
3. Multi-Series Rendering
   * In main() and in generatePlot(), detect the showDerivative flag or options.derivative.
   * If derivative is requested, compute originalPoints with generateData and derivativePoints with generateDerivativeData.
   * Build a series array containing two objects with labels and their point arrays.
   * Pass this series array into generateSVG so it renders two polyline elements with distinct colors and includes a legend identifying each series.
4. Programmatic API
   * Extend the generatePlot options schema to include an optional boolean derivative field.
   * In generatePlot(), when options.derivative is true compute the derivative series and invoke generateSVG with an array of series objects.

# Testing
- Add tests in tests/unit/derivative-plotting.test.js
   * Verify that main() called with parameters including --derivative true invokes generateSVG with two series.
   * Verify that generatePlot called with derivative true returns an svg string containing two polyline elements and a legend group.
   * Test error cases when derivative flag is used without required expression or range fields.

# Documentation
- Update USAGE.md and README.md to describe the --derivative flag and its behavior.
- Provide an example command:
  repository0-plot-code-lib --expression y=x^2 --range x=0:5 --format svg --output plot.svg --derivative true
- Include a sample svg snippet showing the original curve in one color and its derivative in another with a legend.