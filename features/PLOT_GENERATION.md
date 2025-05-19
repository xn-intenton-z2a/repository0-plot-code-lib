# Overview
Allow users to generate visual plots from mathematical expressions using the CLI or programmatic API. This feature parses a simple expression syntax and numeric range specification, samples data points, and outputs charts in SVG or PNG format.

# CLI Usage
Provide flags to specify the expression, range, output file, and format. For example:

node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --format svg --output plot.svg

The parser must validate flags, display help on invalid input, and write the resulting plot file.

# API Usage
Export a function plotExpression that accepts an options object:

plotExpression({ expression: 'y=sin(x)', range: { x: [0, 6.28] }, format: 'png', output: 'plot.png' })

The function returns a Promise that resolves when the file is written or rejects on errors.

# Specification
Sampling interval defaults to 100 points unless overridden. Supported image formats are svg and png. Range syntax supports multiple variables in separate dimensions. Error messages must be descriptive for parse failures or invalid ranges.

# Testing
Unit tests must cover expression parsing, range parsing, CLI flag handling, output file generation for both SVG and PNG, and error conditions such as missing flags or invalid syntax.