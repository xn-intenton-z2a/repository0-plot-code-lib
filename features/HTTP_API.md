# Overview
Add an express based HTTP server to accept plot requests via JSON payloads and return generated SVG or PNG plots over HTTP. This feature complements the existing CLI interface by exposing plot generation via a REST endpoint.

# Server Setup
Use express to create a new HTTP server in src/lib/main.js. Configure JSON body parsing and load environment variables with dotenv before server start. Respect a PORT environment variable or default to 3000.

# Plot Endpoint
Define a POST endpoint at /plot. Expect a JSON body containing expression, range, inputFile, inputFormat, format, and outputFile fields. Validate the request schema with zod matching the CLI flag definitions. On validation failure return status 400 with a JSON error object.

# Plot Generation
On successful validation invoke the existing plot generation logic in memory. Generate an SVG string or PNG buffer. Set the response Content-Type to image/svg+xml for SVG and image/png for PNG. Send the plot data directly in the HTTP response body.

# Error Handling
Catch internal errors during expression parsing or rendering. Return status 500 with a JSON error object containing a descriptive message. Ensure the server does not crash on bad payloads.

# Testing
Add tests in tests/unit/server.test.js. Start the server on a random port. Send valid POST requests and verify response status 200, correct content type, and non empty body. Send invalid payloads and verify status 400 and descriptive error messages.

# Documentation
Update README.md and docs/USAGE.md to document the HTTP API. Include examples for sending a POST request with curl and interpreting the response. Document the PORT environment variable and any other configuration.