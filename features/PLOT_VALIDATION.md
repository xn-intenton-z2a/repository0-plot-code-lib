# Overview
This feature enhances the plot generation module by integrating zod for robust, schema-based input validation. The objective is to replace current regex validations with a unified, declarative validation approach for both the CLI and HTTP API endpoints, ensuring clearer error messages and easier future extensions.

# Zod Based Validation Integration
- Introduce the zod library to validate inputs for both command-line arguments and HTTP query parameters.
- Define clear schemas using zod for the following parameters:
  - expression: Ensure the string is non-empty and starts with (or can be trimmed of) a 'y=' prefix.
  - range: Validate that the string follows the pattern x=<min>:<max>,y=<min>:<max> with numeric values supporting both integers and floating points.
  - fileType/format: Limit to the allowed MIME types (image/svg+xml, image/png, application/json).
- Refactor the CLI and HTTP handlers to apply these schemas before further processing, providing descriptive error messages when validation fails.

# CLI and HTTP API Endpoint Updates
- Update the CLI parser to incorporate zod schema checks immediately after flag extraction, ensuring that missing or malformed parameters trigger consistent errors.
- Modify the /plot endpoint to use the same zod validation, enforcing that the query parameters meet the expected format. Respond with a 400 status code and detailed errors on any validation failure.
- Maintain the existing functionality for generating SVG, PNG, or JSON responses based on the validated inputs.

# Testing and Documentation
- Update unit tests to cover both successful validation scenarios and error cases when provided data is invalid.
- Enhance the README and USAGE guides with examples showing how validation errors are handled and guiding developers on the new schema structure.
- Ensure these changes align with the mission and contributor guidelines for a predictable, robust plotting library.

# Impact and Alignment
By implementing zod-based validation, this feature not only simplifies the codebase but also improves user feedback on input errors. It ensures a consistent validation model for both CLI and HTTP usage, reducing maintenance overhead and paving the way for future enhancements.