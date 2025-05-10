# Purpose

This feature adds command-line functionality to parse mathematical formulas and generate data points for plot visualizations in ASCII, JSON, or SVG formats.

# Behavior

When invoked as repository0-plot-code-lib plot "<formula>" [--output <file>] [--format ascii|json|svg] [--width <n>] [--height <n>] [--range "<min>,<max>"] the CLI will parse the formula, sample default 50 points over the specified range, and output the plotted data or ASCII chart. If --output is provided, write the result to the specified file, otherwise print to stdout.

# Implementation

In src/lib/main.js import mathjs to parse formulas and compute sample values. Use zod or similar to validate CLI options. Define default range of [-10,10], default width and height of 80x20, and default format of ascii. Generate N equidistant x values, evaluate y for each. Format output according to format: ascii chart with axis and data points, JSON array of objects {x,y}, or basic SVG polyline with optional axes and labels. Handle invalid formulas by printing an error and exiting non-zero.

# Testing

Extend tests in tests/unit/plot-generation.test.js to cover commands with different formats and options. Mock mathjs evaluate function to return predictable values. Verify JSON output structure, check that ASCII output includes axis markers and data points, and that SVG output contains polyline elements. Test error handling for invalid formula syntax and invalid option values.

# Documentation

Update README.md to include a section for the plot command with inline usage examples for each format. Show sample invocation and output for ascii, json, and svg formats.