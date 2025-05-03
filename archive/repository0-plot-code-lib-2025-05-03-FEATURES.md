features/CSV_OUTPUT.md
# features/CSV_OUTPUT.md
# CSV_OUTPUT Feature Specification

## Overview
This feature introduces an option to output computed plot points in CSV format. In addition to the existing outputs (text preview, SVG, PNG, and JSON), users can now use the --csv flag to export the x and y coordinates as comma-separated values. This makes it easy to analyze the raw time series data using other tools. 

## Implementation Details
1. CLI Schema Update:
   - Add an optional boolean flag --csv with a default value of false in the CLI arguments schema using Zod.

2. Main Function Logic:
   - After parsing and validating arguments, check if the csv flag is enabled.
   - If the --csv flag is set and no file output or JSON flag is provided, format the computed points as CSV text. The output should include a header (x,y) and each subsequent line with the respective coordinate values.
   - Ensure the CSV output does not conflict with existing output modes.

3. Testing Updates:
   - Update unit tests to include a new test case for the CSV output functionality when the --csv flag is provided.
   - Verify that the first line of the output contains the header "x,y" and that subsequent lines match the expected formatted coordinates.

4. Documentation Updates:
   - Update the README.md and USAGE documentation files to include the description and usage examples of the --csv flag.
   - Explain the purpose of CSV output, highlighting its use as a standard format for time series data extraction.

## Expected Impact
- Provides users with a simple way to access raw plotting data in a widely accepted CSV format.
- Enhances the tool's utility by enabling data interchange with other analysis software.
- Aligns with the mission of facilitating time series data handling in a standard open format.
features/VERBOSE_MODE.md
# features/VERBOSE_MODE.md
# VERBOSE_MODE Feature Specification

## Overview
This feature adds a verbose mode to the CLI tool. When the --verbose flag is provided, the tool logs additional internal state details and debugging information. This enhances user understanding of the processing steps and aids in troubleshooting and validation of inputs and outputs.

## Implementation Details
1. Update CLI Parsing:
   - Extend the argument parsing to include an optional boolean flag --verbose (default to false) using Zod schema. This flag should be added alongside other optional flags like --json.

2. Verbose Logging:
   - After the arguments are validated and main processing is performed, check for the verbose flag. When enabled, log detailed information including:
     - The validated command-line arguments object.
     - The computed xRange and yRange values from the provided range string.
     - The full list of generated (x,y) points before final output.
   - Ensure that verbose logs are displayed only in text output mode (i.e., when file output is not provided) to avoid interference with file generation.

3. Integration in Main Function:
   - Add conditional statements to log additional details if --verbose is set. These logs should be clear and structured.

4. Testing and Documentation:
   - Update the test files to include cases where the --verbose flag is provided. Tests should capture and verify that additional log messages appear.
   - Update the README and USAGE documentation to inform users about the new --verbose flag and its benefits for debugging and demonstration purposes.

## Expected Impact
- Provides enhanced transparency of internal operations.
- Aids users in debugging issues with input parameters and understanding the plot generation process.
- Increases user trust by offering a clear insight into how inputs are processed.
