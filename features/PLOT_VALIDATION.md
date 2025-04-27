# Overview
This update refines the input validation and error handling for all plot generation workflows. The improvements include replacing manual regex validations with zod schemas and integrating RFC7807 compliant error responses when the client explicitly requests structured errors via the Accept header.

# ZOD SCHEMA INTEGRATION
- Implement zod schemas to validate the mathematical expression and range parameters. The expression must be a non-empty string and must include the variable x (with a normalization step to remove any leading 'y=' if present).
- Define a zod schema for the range that enforces the format: x=<min>:<max>,y=<min>:<max> with support for optional extra whitespace. The schema validates that min and max are numeric and that the minimum is less than the maximum for both x and y ranges.

# RFC7807 ERROR HANDLING
- Update error handling in both CLI and HTTP API endpoints. When an error occurs and the client sets Accept to application/problem+json, the system returns a structured JSON error object following RFC7807. The JSON object includes:
  - type (default: about:blank)
  - title (e.g. "Invalid Input")
  - status (HTTP status code)
  - detail (a message describing the issue)
  - instance (the request URL or identifier)
- If the Accept header does not request a problem detail response, errors continue to be returned as plain text.

# CLI AND HTTP ENDPOINT UPDATES
- For CLI usage, integrate zod schema based validation. Input flags --expression and --range must be checked by the schema. In case of validation failure, if the environment is set for verbose or structured error mode, the error message should be formatted as an RFC7807 compliant JSON.
- For the HTTP API (/plot endpoint), before processing, validate incoming query parameters with zod. Upon failure, check the Accept header: if application/problem+json is present, return the structured JSON error; otherwise, return the plain text error.

# TESTING AND DOCUMENTATION
- Update unit tests to include validations for both valid and invalid inputs. Add scenarios where the Accept header is application/problem+json and assert that the error response conforms to the RFC7807 specification.
- Revise the README and usage documentation to explain the new validation mechanism and error response formats. Provide examples illustrating how to set the Accept header to get a structured error response.
