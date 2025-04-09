# JSON_API Feature Specification

## Overview
The JSON_API feature introduces a RESTful JSON interface to the plotting library. In addition to the existing CLI and HTML-based web interactions, this feature enables programmatic access for generating plots, evaluating formulas, retrieving diagnostics information, and managing user-oriented data (like configuration and history) via JSON payloads. This extension supports seamless integration with automated workflows, dashboards, and CI/CD pipelines, aligning with our mission to be the go-to plot library for formulae visualisations.

## Endpoints and Capabilities

### 1. Plot Command Endpoint
- **Endpoint:** POST `/api/plot`
- **Description:** Accepts a JSON payload defining the plotting command, its parameters, and optional formula expressions. Supports advanced plotting commands, diagnostics, and formula evaluations by delegating processing to the CORE_ENGINE.
- **Validation:** Utilizes existing regex-based numeric parameter validation to ensure robust error handling. Returns a standardized response with keys such as `success`, `data`, and `error` if applicable.

### 2. Configuration Management Endpoints
- **Endpoint:** GET `/api/config`
  - **Description:** Retrieves the current persistent user configuration (e.g., default plot type and parameters).
- **Endpoint:** POST `/api/config`
  - **Description:** Allows clients to update persistent user settings. The submitted configuration is merged with existing defaults, streamlining user interactions across subsequent plotting commands.

### 3. History Logging Endpoint
- **Endpoint:** GET `/api/history`
- **Description:** Returns a log of executed plotting commands along with associated parameters and timestamps. This endpoint supports external auditing and integration with other systems that may require plot execution data.

## Implementation Details
1. **Express Route Additions:**
   - Extend the current Express server setup (e.g., in `src/web/app.js`) to include the new endpoints for configuration retrieval/update and command history.
   - Ensure proper middleware for JSON parsing and request validation is in place.
2. **Unified Processing:**
   - Maintain a consistent processing model by forwarding plot commands to the CORE_ENGINE, which already integrates advanced plotting and configuration management.
   - Error responses and success confirmations follow a unified JSON structure.
3. **Testing and Documentation:**
   - Update unit and integration tests to cover new endpoints. Tests should validate both correct processing of valid JSON payloads and proper error handling for malformed requests.
   - Revise the README and CONTRIBUTING documents to include usage examples and API references for the new endpoints.

## Usage Examples

**Plot Command Example:**
```bash
curl -X POST http://localhost:3000/api/plot \
  -H "Content-Type: application/json" \
  -d '{
         "command": "advanced",
         "plotType": "spiral",
         "params": "1,NaN,5,-10,10,1"
      }'
```

**Get User Configuration:**
```bash
curl -X GET http://localhost:3000/api/config
```

**Update User Configuration:**
```bash
curl -X POST http://localhost:3000/api/config \
  -H "Content-Type: application/json" \
  -d '{
         "defaultPlotType": "spiral",
         "defaultOutputFormat": "SVG",
         "defaultParams": "1,NaN,5,-10,10,1"
      }'
```

**Retrieve Command History:**
```bash
curl -X GET http://localhost:3000/api/history
```

## Motivation and Value
- **Enhanced Accessibility:** Provides programmatic access to plotting functionality and user management, accommodating diverse integration scenarios.
- **Consistency Across Interfaces:** Aligns CLI, web, and API interactions under a unified processing model with consistent numeric validation and logging practices.
- **Developer Productivity:** Simplifies integration with external systems by exposing configuration and history data, fostering automated plot generation workflows.
