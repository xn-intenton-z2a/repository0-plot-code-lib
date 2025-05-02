# Overview
This update refines the CLI argument parsing for generating plots from mathematical expressions. It adds robust handling for the help option, organizes parameter validation for --expression, --range, and --file flags, and provides clear and concise error messages. The enhancement is designed to make the command line tool self-documenting and more user-friendly, while ensuring smooth operation on Node 20 and compatibility with the ESM standards.

# Implementation Details
1. Modify the main source file to implement a full CLI parser. When the flag --help is provided or no arguments are passed, display a usage guide outlining required parameters (--expression, --range) and the optional --file parameter.
2. Utilize a simple argument checker to validate that --expression and --range are present when not in help mode. Ensure that --range input is parsed correctly, checking for valid numeric bounds for both x and y axes.
3. Implement concise error messages for missing or malformed parameters. Integrate existing libraries (for example, using zod for schema validation) to streamline input validation and improve error handling.
4. Ensure that when --file is provided, the output is generated in the requested SVG or PNG format. If the flag is absent, output a text preview on the console.
5. Update the help output to provide clear examples based on the mission to serve as a go-to tool for visualizing mathematical expressions.

# Testing and Documentation
1. Update existing unit tests to cover the new help functionality and error conditions. Add cases simulating correct and incorrect CLI usage to confirm that errors are reported appropriately.
2. Enhance the README and USAGE documents with new usage examples that include the help flag, proper ordering of arguments, and expected behaviour for missing flags.
3. Make sure that dependency versions continue to support Node 20 and remain consistent with the ESM module standards.

# Impact
This enhancement significantly improves the usability and reliability of the CLI tool. It directly enhances the product's primary purpose by ensuring that users can quickly access usage information, effectively validate their inputs, and understand error messages. These changes align with the mission of being the go-to plot library and empower users in visualizing mathematical expressions with a clear and self-guiding interface.