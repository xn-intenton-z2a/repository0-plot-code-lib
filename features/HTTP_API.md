# HTTP_API Feature Specification

## Overview
This feature enhances the /plot endpoint by adding support for dynamic query parameters. In addition to using Accept headers for content negotiation, users can now provide an expression and a range directly via URL query parameters. This allows on-the-fly generation of plots without relying solely on CLI flags or file outputs.

## Request Handling
When a GET request is made to /plot, the endpoint will first check for the presence of query parameters named expression and range. If these parameters are provided:
1. Validate that both parameters are present and non-empty.
2. Validate the range parameter using a similar regular expression as in the CLI mode: it must match x=<min>:<max>,y=<min>:<max> with numeric values (including decimals).
3. Determine the desired output format. If the Accept header is provided, it will override the default; however, a query parameter "format" can be optionally provided to explicitly choose between image/svg+xml, image/png, or application/json.

If the query parameters are not provided, the endpoint will fall back to its original behavior of returning static plot data via content negotiation.

## Dynamic Plot Generation and Response
Instead of writing files to disk, when expression and range are provided as query parameters the endpoint will:
- Dynamically generate the plot content. For SVG, the plot will include a text annotation showing the expression and range. For PNG, a dummy base64 encoded image buffer is returned.
- In case of application/json, the response will include a JSON object with details of the expression and range processed.
- If the validation fails for any query parameter, the endpoint responds with a 400 Bad Request along with an error message.

## Testing and Documentation
- Unit tests in tests/unit/http.test.js will be updated to cover scenarios with query parameters, including valid and invalid inputs.
- The README and usage guide (docs/USAGE.md) will be updated to document the use of query parameters for dynamic plot generation.
- This feature maintains consistency with error handling, logging, and overall design principles described in CONTRIBUTING.md and MISSION.md.

## Impact and Alignment
By adding dynamic HTTP API support through query parameters, the repository gains flexible on-demand plot generation via HTTP requests, aligning with our mission to be the go-to plot library for formula visualisations. This makes the tool more versatile for integration in web applications and other real-time use cases.