# Overview
This feature adds core CLI functionality for generating plots from mathematical expressions. The CLI will accept parameters for expression, range boundaries, and output file type. The functionality is integrated into the existing main.js file and is accessible via command-line flags.

# Functionality
1. Update main.js to parse command-line flags such as --expression, --range, and --file.
2. When the CLI is invoked with the correct flags, the program will simulate the generation of a plot by printing out a summary of the parsed parameters and a placeholder message confirming the plot generation.
3. Basic parameter validation is included. If flags are missing, the program will display usage instructions.

# Testing
1. Update tests in plot-generation.test.js by adding tests that set process.argv with the new flags and verify that the expected output is logged.
2. Ensure that the tests cover missing or invalid parameters to provide friendly feedback.

# Documentation
1. Update README.md to include usage examples:
   node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg
2. Provide a description of the accepted flags and their expected formats.

This feature adheres to the repository mission by enhancing the CLI tool to be a go-to solution for generating formula visualizations and plots in standard formats as described.