# Overview
This feature consolidates the existing CLI enhancements and HTTP API functionalities into a unified plot generation module. The new feature introduces a consistent, schema-based input validation using the zod library for both command-line arguments and HTTP query parameters. In addition to improving validation reliability, this integration simplifies configuration management by using both CLI flags and environment variable fallbacks, ensuring a smoother experience for both interactive and automated usage.

# Unified Input Validation
- Replace the current regex-based validations with zod schema validators to validate the expression, range, and output format inputs for both CLI and HTTP API endpoints.
- Enforce that the expression starts with y= and contains valid mathematical components.
- Use a zod schema to validate the range format (x=<min>:<max>,y=<min>:<max>) supporting both integer and floating point numbers and report clear errors on mismatches.
- Validate output format parameters (fileType and/or format) ensuring values are limited to image/svg+xml, image/png, or application/json.

# CLI and Environment Configuration
- Implement unified processing of CLI flags (--expression, --range, --file, --verbose, --help, --version, --serve) and fallback to environment variables using dotenv. Validation is consistent via the new zod schemas.
- Retain functionality for writing SVG and PNG files with clear success messages and error handling using unified validation logic.

# HTTP API Endpoint Improvements
- Update the /plot endpoint to use the same zod-based validators so that query parameters (expression, range, fileType/format) are validated in a consistent manner as is done for the CLI.
- Maintain the dynamic plot generation: if valid query parameters are provided, generate and return the plot in the requested output format (SVG, PNG, or JSON) using the same validation.
- Ensure that errors from invalid inputs are returned with proper 400 status codes and descriptive messages.

# Testing and Documentation
- Update existing unit tests for both CLI and HTTP API to account for the new unified validation workflow using zod.
- Document the new input validation mechanism in the README and USAGE guides so that users and developers understand how both CLI flags and HTTP query parameters are processed.
- Ensure all modifications are consistent with the guidelines in CONTRIBUTING.md and aligned with the mission to be a go-to plotting library.

# Impact and Alignment
By merging the CLI and HTTP API validation and plot generation logic into a single unified feature, this improvement reduces code redundancy and enhances overall reliability. The use of schema validation not only simplifies future maintenance and extension but also delivers a more robust user experience in both interactive command line usage and web-based API access.