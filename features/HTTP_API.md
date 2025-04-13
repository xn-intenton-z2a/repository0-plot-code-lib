# HTTP API

## Overview
This feature introduces an HTTP API to our plotting library, enabling users to generate plots dynamically over a web request. The API leverages our existing plotting functions (for both static and interactive SVG plots) and provides a lightweight endpoint using Express. This allows users to integrate visualisation generation into web applications or as part of an automated workflow.

## Endpoints
- **GET /plot**
  - Accepts query parameters such as `expression` (or a comma-separated list for multi-plot), `xmin`, `xmax`, `points`, and optional parameters like `fallback`, `darkmode`, `logscale_x`, and `logscale_y`.
  - Returns the generated static SVG plot.

- **GET /interactive**
  - Similar to `/plot` but returns an interactive SVG, which may include tooltips and animated transitions if enabled via an `animate` flag.

- **POST /plot**
  - Accepts a JSON body with the plotting parameters. This provides a flexible interface for clients to integrate and customise plot requests.

## Error Handling & Validation
- Validate all required parameters (such as `expression`, `xmin`, `xmax`, `points`) and return meaningful error messages if any required field is missing or invalid.
- Handle exceptions during plot generation and return a fallback SVG with an error message if needed.

## Implementation
- Use Express (already included as a dependency) to create a small server running on a configurable port.
- Map incoming request parameters to the existing API functions such as `generateSVGPlot`, `generateInteractivePlot`, and their multi-plot counterparts.
- The HTTP API will serve responses with the appropriate `Content-Type` (e.g., `image/svg+xml` for SVG outputs or `application/json` for error messages).
- Keep the implementation contained within a single source file to adhere to the repository guidelines.

## Future Considerations
- Expand the API with additional endpoints for file conversion (PNG, PDF, JPEG) and CSV export if demand increases.
- Add testing endpoints and middleware for logging and diagnostics to further improve production readiness.
