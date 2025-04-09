# WEB_API

## Overview
This feature introduces a dedicated HTTP API built on Express to provide on-demand plotting, analytical processing, and text output formats. It expands the repository by enabling clients to generate plots and compute numerical analyses over HTTP requests. The API integrates seamlessly with the consolidated plotting engine (which now includes the capabilities previously defined in CALC_ENGINE) and the TEXT_OUTPUT module.

## Key Objectives
- **Centralized HTTP Endpoints:** Create RESTful endpoints (e.g., `/plot`) that accept query parameters or POST payloads describing the plot specification, transformation options, and output format.
- **Unified Plot and Analysis Pipeline:** Leverage the merged PLOT_ENGINE (integrating CALC_ENGINE functionality) to process plot specifications, perform numerical analyses (derivatives, area estimation, statistics), and produce visual outputs.
- **Support for Multiple Formats:** Allow clients to specify output format (SVG, JSON, CSV, Markdown, ASCII, HTML) via the API, reusing the TEXT_OUTPUT module for consistent rendering.
- **Robust Error Handling & Logging:** Integrate detailed error messages and optional debug logging (triggered via a query flag) to aid both developers and end-users in troubleshooting.
- **Scalable and Lightweight:** Build the API to be self-contained within a single source file, ensuring ease of deployment and minimal dependencies.

## Design & Implementation
### API Endpoints
- **GET /plot:** Accepts query parameters such as `spec`, `output`, and optional flags (e.g., `debug`). Processes the plot specification to generate the desired output.
- **POST /plot:** Accepts a JSON payload with keys for plot specification, transformation options, and output format, returning the computed plot or analysis in the requested format.

### Integration Details
- **Merged Plot Engine:** The new WEB_API leverages the consolidated PLOT_ENGINE, which now includes the numerical and transformation features from CALC_ENGINE. This merger streamlines processing and reduces redundancy.
- **Express Middleware:** Implement lightweight middleware for input validation, error handling, and debug logging. Use standard Express patterns to ensure maintainability.
- **Documentation & Testing:** Document the API endpoints with examples and integrate test cases using vitest to verify endpoint responses for both valid and erroneous input.

## Usage Examples
- **Generating a Plot via GET Request:**
  Example: `GET /plot?spec=quad:1,0,0,-10,10,1&output=svg`

- **Submitting a Plot Request via POST:**
  Example Payload:
  ```json
  {
    "spec": "expr:Math.sin(x)*x:-10,10,0.5",
    "output": "json",
    "debug": true
  }
  ```

This feature aligns with the repository's mission of being the "jq of formulae visualisations" by providing a flexible and accessible web interface for generating and consuming plot data in diverse formats.