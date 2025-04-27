# Overview
This update refines the plot validation feature by enhancing the JSON export capability. In addition to validating mathematical expressions and plotting in SVG/PNG, when the client requests a JSON output and specifies exportData as a truthy parameter, the endpoint now computes the time series data points and returns these detailed points along with the original parameters. This provides a direct feed of computed chart data for further analysis.

# Implementation
- Update the /plot endpoint in the source file. When the requested output format is application/json and the exportData query parameter is present and truthy, compute an array of 100 evenly spaced data points using the existing logic in createSvgPlot.
- For each computed point, construct an object with x and y properties reflecting the computed value.
- Return a JSON response that includes the original expression, range, and the computed data array. If exportData is not provided, retain the default JSON response behavior.
- Ensure that the SVG and PNG responses remain unchanged and that this enhancement does not interfere with the dynamic query parameter validations.
- Update unit tests to include new scenarios where the JSON response includes an accurate array of computed data points when exportData is provided in the query string.

# Testing
- Extend tests for the /plot endpoint to simulate JSON export via adding exportData along with valid mathematical expression and range parameters. Verify that the returned JSON object now contains a "data" array of 100 objects with properties x and y.
- Maintain tests for default JSON responses when exportData is not specified.
- Ensure that new computed data follows the precise evaluation logic already implemented for SVG plots, while performing proper error handling for any evaluation issues.

# Impact
With the improved JSON export, users can retrieve fully computed time series data that corresponds exactly to the visual plot. This directly enhances the product's primary functionality, enabling downstream processing and analysis without the need to extract data from visual outputs.
