# RUNTIME INTERFACE

## Overview
This feature consolidates the runtime aspects of the application by merging configuration management with an enhanced HTTP API endpoint. The system will support both CLI and HTTP modes, providing robust configuration loading (including environment variable interpolation, schema validation using Zod, and runtime reloading via signals) as well as a dynamic, content-negotiating HTTP interface at /plot. The HTTP API supports multiple output formats (SVG, PNG, JSON) based on Accept headers and query parameters, offering clear error reporting and adaptive behavior. This consolidation improves usability by ensuring that configuration settings and HTTP interactions share consistent behavior across all runtime scenarios.

## Implementation
- Update the configuration management module to continue using dotenv and zod schema validation to merge settings from CLI flags and configuration files.
- Integrate HTTP API functionality into the same module, ensuring that when the --serve flag is provided, the app listens on the designated port and exposes the /plot endpoint.
- Enhance the /plot endpoint to support:
  - Content negotiation for image/svg+xml, image/png, and application/json based on the Accept header and query parameters.
  - Dynamic query parameter processing, including required parameters such as expression, range, fileType/format, and optional parameters for resolution.
  - Robust error handling for missing parameters, malformed range values, unbalanced expressions, and invalid numeric ranges for x and y.
  - Logging of configuration loading, runtime reloading (triggered via SIGHUP), and API request processing in verbose mode if enabled.
- Ensure that both CLI and HTTP modes share the same validation routines and error messages to maintain consistency.

## Testing
- Update the unit tests in tests/unit/configManagement.test.js and tests/unit/http.test.js to cover both configuration loading and HTTP endpoint behaviors. Tests should verify:
  - Environment variable interpolation and fallback default behavior in combined configurations.
  - Correct HTTP responses for SVG, PNG, and JSON based on Accept headers and query parameters.
  - Runtime reload of configuration via SIGHUP handling.
  - Verbose logging when enabled, ensuring debugging information is printed during configuration and API request processing.

## Impact
- Provides a unified runtime interface for both CLI and HTTP server modes, enhancing user experience and reducing configuration discrepancies.
- Increases the robustness of the plot generation process by ensuring that configuration management and API request handling follow a single, consistent implementation.
- Streamlines maintenance by consolidating core runtime functionalities into one feature, reducing duplication and potential errors.
