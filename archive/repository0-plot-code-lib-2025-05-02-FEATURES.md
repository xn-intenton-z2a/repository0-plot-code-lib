PLOT_GENERATION.md/PLOT_GENERATION.md
# PLOT_GENERATION.md/PLOT_GENERATION.md
# Overview
This update refines the core CLI functionality for generating plots from mathematical expressions. It enhances parameter validation using the zod library and improves error messaging, default handling, and usage guidance. The changes focus on enriching the repository's primary value of providing a robust plotting tool via the CLI.

# Functionality
1. Update the main source file (src/lib/main.js) to use the zod library for validating command-line options including --expression, --range, and --file. Introduce improved parsing logic that not only validates the inputs but also auto-appends the correct file extension if missing (e.g. defaulting to SVG when no extension is specified).
2. Enhance error handling so that detailed and user-friendly messages are generated when required parameters are absent or incorrectly formatted. This includes clear indications of the correct format for both the mathematical expression and the range parameters.
3. Integrate these changes so that the CLI simulation in the repository now parses the parameters, validates them, and confirms successful parsing with a summary output. This ensures that users receive immediate, actionable feedback on their provided inputs.

# Testing
1. Update tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js to simulate various scenarios including valid inputs, missing parameters, and invalid formats. Ensure tests cover both the new auto-extension functionality and error reporting.
2. Include tests that confirm the CLI behavior when the --file parameter is provided in an unexpected format, verifying that a default extension is added and that the output filename is adjusted as needed.

# Documentation
1. Revise the README.md file to update usage instructions and examples. Document the new behavior including default file extension handling and enhanced error messages.
2. Provide clear examples on how to invoke the CLI with properly formatted parameters. For instance: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.

These updates continue to align with the repository's mission by ensuring that the tool not only generates plots but does so in a user-friendly and reliable manner, handling edge cases and guiding users towards correct usage.