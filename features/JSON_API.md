# JSON_API Feature Specification

## Overview
The JSON_API feature introduces a RESTful JSON interface to the plotting library. In addition to the existing CLI and HTML-based web interactions, this feature enables programmatic access for generating plots, evaluating formulas, and retrieving diagnostics information via JSON payloads. This extension supports seamless integration with automated workflows, dashboards, and CI/CD pipelines.

## Description
- **Endpoint Exposure:**
  - Adds a new HTTP API endpoint (e.g., POST `/api/plot`) on the existing Express server.
  - Accepts JSON payloads defining the plot command, parameters, and optional formula expressions.
- **Command Dispatching:**
  - Supports advanced plotting commands, diagnostics, and formula evaluations (the latter merged from the former FORMULA_ENGINE feature).
  - Delegates processing to the unified CORE_ENGINE logic which now includes all formula evaluation capabilities.
- **Input Validation and Error Handling:**
  - Validates incoming JSON requests to ensure proper command types and numeric parameters (using the robust, regex-based numeric parameter validation already in place).
  - Returns descriptive error responses as JSON when the input is malformed or unsupported.
- **Unified Response Structure:**
  - Provides a standardized response including a `success` flag, result data (such as plot details or evaluated data points), and metadata (timestamp, execution details).
- **Usage Examples:**
  - Detailed examples in the documentation (README.md) and CONTRIBUTING.md will guide developers on crafting proper JSON requests (using cURL or HTTP libraries) and interpreting responses.

## Implementation Details
1. **Express Route Addition:**
   - Implement a new route handler in the Express server (e.g., in `src/web/app.js`) for POST requests at `/api/plot`.
   - Utilize middleware to parse JSON and validate payload structures.
2. **Processing Logic:**
   - Extract the command type (e.g., `advanced`, `diagnostics`, `batch`, or `formula`) from the JSON body.
   - Forward the command and parameters to the CORE_ENGINE, which now incorporates the logic of the retired FORMULA_ENGINE, ensuring a consistent behavior.
3. **Response Format:**
   - Return results in a JSON format with keys such as `success`, `data`, and `error` (if any).
4. **Testing and Documentation:**
   - Extend unit and integration tests to validate JSON API functionality and error handling.
   - Update the README and CONTRIBUTING documentation to include API usage instructions and example requests/responses.

## Motivation and Value
- **Enhanced Accessibility:** Provides programmatic access to plotting functionality, catering to diverse integration scenarios.
- **Consistency Across Interfaces:** Aligns CLI, web, and API interactions under a unified processing model with consistent numeric validation and error reporting.
- **Developer Productivity:** Simplifies integration with external systems and supports automated plot generation workflows.

