# Overview
Add an HTTP server mode to the CLI that listens on a specified port and exposes a RESTful endpoint for generating PNG or SVG plots programmatically without invoking the CLI directly.

# CLI Flags
- --serve <port>  Start the HTTP server on the given port.  All other CLI flags are ignored in serve mode.

# Implementation
1. Extend cliSchema in src/lib/main.js to include an optional field serve as a string matching only digits and convert it to a number.
2. Update parseArgs to recognize the --serve flag and set parsed.serve to the numeric port value.
3. Export an Express application instance from src/lib/main.js so it can be imported in tests.
4. In main(), detect if parsed.serve is provided:
   - Import express and create an app.
   - Define GET /plot route that accepts query parameters expression, range, format.  Validate these parameters using a Zod schema derived from cliSchema.
   - Inside the handler, parse range, generate data, and invoke generateSVG.  If format is png, pipe the SVG through sharp to obtain a PNG buffer.
   - Respond with Content-Type image/svg+xml for svg or image/png for png and send the image data.
   - Start listening on the provided port and log a startup message.
5. Ensure HTTP mode reuses existing parsing, data generation, and rendering functions and does not duplicate logic.
6. Update package.json to move express from devDependencies to dependencies to enable runtime import.

# Testing
- Create tests/unit/http-api.test.js using Vitest and Supertest.
  • Import the exported Express app without binding to a real port.
  • Test GET /plot?expression=y=x&range=x=0:1&format=svg returns 200 and a valid SVG payload with correct Content-Type.
  • Test GET /plot with format=png returns 200 and a PNG buffer with Content-Type image/png.
  • Test missing or invalid parameters return 400 with descriptive error messages.

# Documentation
- Update USAGE.md and README.md:
  • Document the --serve flag and how to start the server: repository0-plot-code-lib --serve 3000
  • Provide example curl commands:
    curl http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg
    curl http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png --output plot.png
  • Describe query parameters and the expected response content types.