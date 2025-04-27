# Overview
This feature enhances the current JSON response behavior of the /plot endpoint by introducing an optional exportData parameter. When the parameter is truthy and the request format is application/json, the endpoint will compute and return an array of 100 time series data points. Each data point includes numeric x and y values calculated based on the provided mathematical expression and x-range.

# Implementation
- Update the /plot endpoint's JSON branch to check for the exportData query parameter when the requested format is application/json.
- If exportData is truthy:
  - Parse the expression and range parameters using the existing validation and computation logic in the createSvgPlot function.
  - Compute an array of 100 data points by evaluating the expression for x values evenly distributed across the x-range.
  - Return a JSON object that includes the original expression, range, and a data property containing the computed array of objects with x and y numeric properties.
- If exportData is not provided or falsy, maintain the existing JSON response behavior.
- Ensure error handling is consistent with aggregated error reporting when input validation fails.

# Testing
- Extend unit tests for the /plot endpoint to include scenarios with exportData provided along with valid expression and range parameters, verifying that the response contains a data array with 100 objects each having numeric x and y values.
- Retain tests for default JSON behavior when exportData is absent.

# Impact
This update provides users the ability to retrieve fully computed time series data directly from the JSON response. It eliminates the need to manually extract data from visual plots, enabling downstream processing and analysis, and closely aligns with the mission of providing core plotting capabilities through both CLI and API interfaces.