# Overview
This update refines the plot input validation by fully integrating the zod library to replace all manual regex checks. Both the CLI and HTTP endpoints will use structured zod schemas to ensure consistency, clearer error messages, and easier future extensions.

# ZOD SCHEMA INTEGRATION
- Replace manual regex validations for expression and range parameters with zod schemas.
- Define a schema for the expression that ensures a non-empty string, allowing optional stripping of a 'y=' prefix.
- Define a schema for the range parameter to enforce the correct format (x=<min>:<max>,y=<min>:<max>) and to validate that the numeric order is maintained for x and y ranges.
- Add a schema for validating the fileType/format parameter against allowed MIME types (image/svg+xml, image/png, application/json).

# CLI AND HTTP API ENDPOINT UPDATES
- Update the CLI flag processing to parse arguments and immediately validate them using the zod schemas. When validation fails, the error messages provided by zod will be sent to the user.
- Refactor the HTTP GET /plot endpoint so that if query parameters (expression, range, fileType/format) are provided, they are validated using the new zod schemas. This ensures descriptive errors and a consistent validation flow.
- Maintain compatibility with content negotiation when no query parameters are supplied.

# TESTING AND DOCUMENTATION
- Update unit tests to trigger both valid and error cases through the new zod-based validations. Tests should confirm that error messages are more informative.
- Revise the usage guide and README to document the new validation process, explaining that input errors now result in clear, schema-derived messages.
- Ensure changes align with contributor guidelines and the mission of creating a reliable plotting library.

# Impact AND ALIGNMENT
This feature update improves reliability by enforcing strong, centralized input validation using zod. With clearer error responses and consistent validation across CLI and HTTP endpoints, users will have a better experience generating plots, and future enhancements can build on a robust validation framework.