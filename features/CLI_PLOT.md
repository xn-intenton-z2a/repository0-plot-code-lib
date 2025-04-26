# Overview
This update enhances the command line interface to fully support plotting directly from mathematical expressions. In addition to the existing HTTP endpoint, users can now invoke the program with flags such as --expression, --range, and --file from the CLI. This allows users to generate plots (SVG, PNG, or JSON fallback) directly, fulfilling the mission by showcasing both the HTTP and CLI capabilities in generating formula visualisations.

# Implementation Details
1. Update the main function in src/lib/main.js to detect the presence of --expression and --range flags on the command line. When these flags are provided:
   - Validate that both --expression and --range options are passed; if not, output a descriptive error message and exit.
   - Determine the intended output format by examining the optional --file flag. If the file extension is .svg, generate and output an SVG structure; if .png, output a PNG buffer generated from a dummy Base64 string; otherwise, fall back to outputting JSON data.
2. If --file is provided, the program should attempt to write the generated plot to the specified file. Otherwise, the plot is printed to the standard output.
3. Enhance the CLI help message (both in the console output and within the README) to include examples of how to use the new flags. For instance: 
   node src/lib/main.js --expression "y=sin(x)" --range "x=-2:2,y=-1:1" --file output.svg
4. Update unit tests in tests/unit/main.test.js to simulate CLI invocations with these new parameters ensuring that the correct output is generated, similar to the current HTTP tests.

# Testing and Documentation
1. Unit tests will be added/updated in tests/unit/main.test.js to cover CLI scenarios. The tests should launch the CLI with parameters and verify that:
   - An SVG is generated when -file extension is .svg
   - A PNG is generated when -file extension is .png
   - A proper error and fallback is provided when parameters are missing or the file extension is not supported.
2. The README.md will be updated with enhanced documentation and a CLI usage example showing the new functionality, ensuring consistency with the mission of being a go-to plot library.
3. Code quality and proper error handling are maintained according to CONTRIBUTING.md guidelines.
