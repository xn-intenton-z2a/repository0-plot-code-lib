# Overview
This update enhances the existing plot input validation feature by continuing to integrate zod for robust input checking and by extending error handling to format HTTP error responses in a standard RFC7807 compliant format (problem details). This ensures that, when errors occur, users receive informational and structured feedback via both CLI and HTTP endpoints.

# ZOD SCHEMA INTEGRATION
- Replace all manual regex validations for expression, range, and file type/format parameters with zod schemas.
- Validate that the expression is a non-empty string and that it includes the variable x (with an optional stripping of a 'y=' prefix).
- Validate the range parameter against the format x=<min>:<max>,y=<min>:<max> and ensure that numeric order is enforced for both x and y.
- Validate the fileType/format parameter against allowed MIME types (image/svg+xml, image/png, application/json).

# RFC7807 ERROR HANDLING
- Update HTTP GET /plot endpoint error responses so that when the client Accept header includes application/problem+json, errors are returned as a JSON object conforming to RFC7807. The JSON will include fields such as type, title, status, detail, and instance.
- Modify the error catch blocks within parameter validation and plot generation to check for the requested content type. If application/problem+json is accepted, format the error accordingly; otherwise, continue sending plain text error messages.
- Ensure that both invalid query parameters and unexpected exceptions produce clear and structured error messages.

# CLI AND HTTP API ENDPOINT UPDATES
- In the CLI workflow, maintain instant error output for missing or malformed flags and values with detailed messages.
- In the HTTP API workflow, integrate the new error formatting. When query parameters are provided and validation fails, check if the request prefers application/problem+json, and if so, respond with a structured RFC7807 JSON error payload.

# TESTING AND DOCUMENTATION
- Update unit and integration tests to verify that, when requested, error responses are returned using the RFC7807 problem details format.
- Revise the usage guide and README to include documentation of the new error response behavior. This documentation should explain how clients can trigger the structured error output by using the relevant Accept header.
- Confirm that valid requests still generate correct plot outputs (SVG, PNG, and JSON) and that errors now yield enhanced, structured responses as needed.

# Impact AND ALIGNMENT
This feature update improves overall reliability and usability by not only ensuring input validation across all endpoints with zod but also by enhancing error diagnostics. Users will benefit from clearer, standardized error messages that facilitate troubleshooting and integration, aligning closely with the mission of making a robust and user-friendly plotting library.