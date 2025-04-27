# Overview
This update enhances the plot input validation function by integrating zod for robust input checking and by extending error handling to use RFC7807 compliant responses when appropriate. In particular, if the client indicates support for application/problem+json via the Accept header, error responses are returned as structured JSON containing fields such as type, title, status, detail, and instance.

# ZOD SCHEMA INTEGRATION
- Replace manual regex validations for expression, range, and file type/format parameters with zod schemas for a cleaner and more maintainable validation layer.
- Ensure the expression is non-empty and contains the variable x (stripping a leading 'y=' if present).
- Validate the range parameter against the format x=<min>:<max>,y=<min>:<max> and enforce that the minimum is less than the maximum for both x and y.
- Validate the fileType/format parameter against allowed MIME types (image/svg+xml, image/png, application/json).

# RFC7807 ERROR HANDLING
- Update error catch blocks across both the CLI and HTTP API endpoints. When an error occurs and the request’s Accept header includes application/problem+json, respond with a structured JSON error conforming to RFC7807.
- The structured error response should include the following keys:
   - type: Defaults to about:blank
   - title: A short summary of the error (e.g., "Invalid Input")
   - status: The HTTP status code
   - detail: A detailed error message describing the issue
   - instance: The request URL or identifier for troubleshooting
- In cases where the Accept header does not include application/problem+json, continue providing plain text error responses.

# CLI AND HTTP API ENDPOINT UPDATES
- In the CLI workflow, maintain instantaneous error output and include structured details when the environment or a flag indicates verbose or problem-oriented error handling.
- In the HTTP API workflow (/plot endpoint), enhance error processing so that when query parameters are provided, and validation fails, the server checks the Accept header. If application/problem+json is accepted, the error is returned as a JSON object structured per RFC7807. Otherwise, a plain text error message is sent.

# TESTING AND DOCUMENTATION
- Update unit tests to include scenarios where the Accept header is set to application/problem+json and validate that error responses conform to the RFC7807 structure.
- Revise the README and usage guide to document the new error response format. Include examples showing how clients can request structured error messages by setting the proper Accept header.
- Ensure that legitimate plot generation (SVG, PNG, JSON) remains unchanged and that errors now yield enhanced, structured responses when appropriate.

# Impact AND ALIGNMENT
This update improves both reliability and developer experience by offering precise and structured error feedback. Standardizing error responses helps client applications to better interpret issues and align with modern REST API practices. It further reinforces the mission of providing a robust, user-friendly plotting library.