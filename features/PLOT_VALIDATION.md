# Overview
This update extends the existing PLOT_VALIDATION feature. In addition to validating mathematical expressions and plotting in SVG/PNG, the feature now supports exporting computed time series data in JSON format. When clients specify the exportData query parameter alongside a JSON request, the endpoint computes an array of data points over the specified x-range and returns these points along with the original request details.

# Implementation
- Update the /plot HTTP endpoint in the source file to check for the query parameter exportData when the requested output format is application/json.
- When exportData is present and truthy, the system uses the existing logic (as in createSvgPlot) to evaluate the expression over 100 evenly spaced points within the x-range.
- If the computation is successful, build an array of objects where each object has properties x and y, representing the computed value at that point.
- Return a JSON response that includes the original expression, range, and the computed data points array.
- Maintain the current SVG and PNG response behavior, ensuring no interference with the typical plot generation flow.

# Testing
- Modify the unit tests for the /plot endpoint to include scenarios where a JSON response is requested with the exportData parameter. Verify that the returned JSON object includes a data array of 100 computed points with valid numeric values.
- Update documentation in the usage guide and README to detail the new exportData functionality and provide example usage with the JSON output.

# Impact
This update provides additional value by enabling clients to directly retrieve the underlying computed time series data. This supports further analysis and integration into downstream processing pipelines without the need to reverse-engineer the SVG or PNG outputs.