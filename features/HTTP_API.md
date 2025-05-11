# Overview
Add an HTTP server mode to the CLI that exposes a RESTful endpoint for generating plots programmatically. This mode enables clients to request SVG or PNG images of mathematical expressions over numeric ranges via HTTP without invoking the CLI directly.

# API Endpoints
GET /plot
  Query parameters:
    expression  the mathematical expression to plot, using JavaScript syntax in x, for example y=sin(x)
    range       the numeric axis range in the form x=min:max
    format      the output format, either svg or png
  Response:
    Content-Type image/svg+xml for svg
                  image/png for png
    Body contains the generated plot payload

# Implementation
1. Extend cliSchema in src/lib/main.js to include an optional serve field as a port number string matching digits.
2. In parseArgs, detect the --serve flag and convert its value to a numeric port.
3. In main(), if parsed.serve is set:
   - Import Express and initialize an app instance.
   - Define GET /plot route:
     - Validate query parameters with zod using the existing expression, range, and format schemas.
     - Call parseRange, generateData, and generateSVG as per CLI logic.
     - For png format, pipe the SVG through sharp to produce a PNG buffer.
     - Send response with appropriate Content-Type header and image data.
   - Start listening on the provided port and log a startup message.
4. Reuse core parsing and generation functions to avoid duplication.

# Testing
Add tests in tests/unit/http-api.test.js using Vitest and Supertest:
  - Initialize the Express app without binding to a real port by exporting it from src/lib/main.js.
  - Test GET /plot with valid query parameters for both svg and png:
    - Expect 200 status, correct Content-Type header, and valid SVG string or PNG buffer.
  - Test missing or invalid parameters return 400 with descriptive error messages.
  - Mock generateData or sharp as needed to isolate routing logic.

# Documentation
Update USAGE.md and README.md:
  - Document how to start the server: repository0-plot-code-lib --serve 3000
  - Provide example HTTP requests:
    curl http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg
    curl http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png --output plot.png
  - Describe query parameters and response content types.