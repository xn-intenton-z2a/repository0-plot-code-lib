# Overview
This update enhances the core CLI functionality for generating plots from mathematical expressions. The feature now implements robust parameter validation using the zod library. It improves error handling, provides clearer usage instructions, and simulates a more structured plot generation by parsing and validating the expression and range parameters.

# Functionality
1. Update the main source file (src/lib/main.js) to use zod for validating the command-line parameters such as --expression, --range, and --file. This ensures that only correctly formatted inputs are accepted.
2. Provide detailed error messages when parameters are missing or malformed, guiding the user to the correct usage.
3. Enhance the CLI to first parse the inputs using improved routines and then simulate the plot generation. The simulation now includes a validation step and a summary output that confirms the correct parsing of the mathematical expression and range data.
4. Update the README.md file to include improved usage instructions and examples reflecting the new validation requirements.

# Testing
1. Update the tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js to simulate various command-line arguments scenarios. These tests will verify that valid inputs are parsed correctly and that appropriate error messages are displayed for missing or invalid parameters.
2. Tests will cover both successful parameter parsing and error conditions, thereby ensuring reliability and robustness of the CLI.

# Documentation
1. Update the README.md with detailed explanations of the new CLI flags. Include examples such as:
   node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg
2. Document the use of the zod library for parameter validation and explain the expected formats for the mathematical expression and range inputs.

This update aligns with the repository mission by strengthening the reliability of the plot generation process and ensuring users receive clear, actionable feedback when inputs do not meet requirements. It focuses on core functionality improvements rather than cosmetic changes.