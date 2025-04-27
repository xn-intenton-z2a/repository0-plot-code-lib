# Overview
This update enhances the plot validation feature by extending its JSON export functionality. In addition to validating mathematical expressions and generating SVG/PNG plots, the feature now supports a detailed JSON export mode. When the client requests a JSON output and includes an exportData parameter with a truthy value, the endpoint computes an array of 100 time series data points representing the evaluated mathematical expression over the specified range. This array of computed points (each with x and y numeric properties) is returned along with the original expression and range. The default JSON response remains unchanged when the exportData parameter is absent or falsy.

# Implementation
- Update the /plot endpoint in the source file to check for an exportData query parameter when the requested output format is application/json.
- If exportData is truthy:
  - Parse the provided expression and range parameters using the existing validation and numeric order enforcement logic.
  - Compute 100 evenly spaced x values based on the x-range and evaluate the expression at each x to compute the corresponding y values.
  - Build an array of objects where each object includes properties x and y; ensure that the numerical precision and potential error handling in evaluation is maintained.
  - Return a JSON response that includes the original expression, range, and a data property that holds the computed points array.
- If exportData is not provided, retain the existing behavior in the JSON response.
- Ensure that the new JSON export branch does not interfere with the SVG and PNG output logic and that error handling remains consistent with dynamic query parameter validations.

# Testing
- Extend the unit tests for the /plot endpoint to include a scenario where the exportData query parameter is provided along with valid expression and range parameters. Validate that the returned JSON object now contains a data array with 100 objects, each having valid numeric x and y properties that match the output computed by the expression evaluator.
- Retain tests for the default JSON response when exportData is absent. Verify that error handling (including aggregation of multiple input errors) remains functional.

# Impact
By introducing detailed JSON export capability, users can retrieve fully computed time series data that directly corresponds to the plotted curve. This enhancement eliminates the need to manually extract data from visual plots and enables downstream processing and analysis, thereby improving the core functionality of the product.