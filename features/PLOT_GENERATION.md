# Overview
This feature enhances the CLI plot generation capabilities and adds an HTTP API for on-demand plot and time series generation.

# CLI Arguments
- Add or extend flag --plot with values svg or png to specify the output image format
- Add or extend flag --output with a file path for CLI image generation
- Add new flag --serve to start an HTTP server instead of executing a CLI task
- Add flags --port and --host to configure the server binding, defaulting to port 3000 and host 127.0.0.1
- Validate that when --serve is provided, CLI output flags (--plot and --output) are ignored

# Plot Generation
- For CLI mode, invoke chartjs-node-canvas as before to generate line charts from time series data
- Support svg and png render modes based on --plot value
- Write image buffer to the specified --output file

# HTTP API
- Implement an Express HTTP server that listens on the configured host and port
- HTTP GET /plot endpoint:
  - Query parameters: expression, range, format(svg or png)
  - Generate time series data (reuse existing expression parsing logic)
  - Render the plot and respond with image buffer and Content-Type image/svg+xml or image/png
  - Return status 400 with JSON {error: message} for missing or invalid parameters
- HTTP GET /series endpoint:
  - Query parameters: expression, range, format(json or jsonl)
  - Generate time series data and respond with JSON or JSON Lines
  - Set Content-Type application/json or application/jsonl
  - Return status 400 with JSON {error: message} for missing or invalid parameters

# Testing
- Unit tests for the Express server routes to verify correct status codes, headers, and payloads
- Integration tests using supertest to start the server, perform GET requests to /plot and /series, and assert responses

# Documentation
- Update README.md to include HTTP API usage examples with curl commands for /plot and /series
- Add HTTP API reference section in USAGE.md with parameter descriptions and sample responses

# Dependencies
- Add supertest to devDependencies for HTTP endpoint integration tests
- Ensure express is declared as a dependency for HTTP server
