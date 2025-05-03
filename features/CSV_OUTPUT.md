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
