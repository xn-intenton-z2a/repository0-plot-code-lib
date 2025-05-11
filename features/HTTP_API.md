# Overview
Extend the CLI tool to provide an HTTP server mode built on Express, so users can invoke plot generation via RESTful endpoints instead of the command line. This enables integration in web services and programmatic workflows without shell invocation.

# HTTP Server Mode

Add a new flag `--serve <port>` to start an Express server on the specified port. When serve mode is active, ignore other CLI flags and listen for incoming HTTP requests to the `/plot` endpoint.

# API Endpoint

Define a GET endpoint `/plot` that accepts query parameters:
- expression: mathematical expression in terms of x (required)
- range: axis range string in the form axis=min:max (required)
- format: svg or png (optional, default svg)
- width, height, samples, xLog, yLog, grid, title, xLabel, yLabel (optional styling and programmatic options)

Validate parameters with the same Zod schema used in the programmatic API. On success, generate the plot data, convert to PNG if requested, and respond with appropriate Content-Type and image payload.

# Implementation

1. In `src/lib/main.js`, extend `cliSchema` to include an optional `serve` field matching digits and convert it to a number in `parseArgs`.
2. Modify `main()` to detect `parsed.serve`. When present, import and configure an Express app:
   - Create an Express instance and add `app.get('/plot', handler)`.
   - In the handler, parse `req.query` into an object of strings and booleans, then validate against the programmatic API schema imported from `generatePlot`.
   - Build the plot by calling `generatePlot` with parsed options.
   - Set `Content-Type` to `image/svg+xml` for svg or `image/png` for png, and send the data buffer or string.
   - Listen on the provided port and log a startup message.
3. Export the Express app from the module for testing, without automatically starting the server unless `main()` is invoked with `--serve`.
4. Move `express` from devDependencies to dependencies to allow runtime import.

# Testing

Add `tests/unit/http-api.test.js`:
- Import the exported Express app and use Supertest to issue requests without binding to a real port.
- Test GET `/plot?expression=y=x&range=x=0:1&format=svg` returns 200, Content-Type `image/svg+xml`, and an SVG payload containing `<svg`.
- Test GET `/plot?expression=y=x&range=x=0:1&format=png` returns 200, Content-Type `image/png`, and a Buffer matching the mocked PNG data.
- Test missing or invalid query parameters return 400 with descriptive error messages.

# Documentation

Update `USAGE.md` and `README.md`:
- Document the `--serve` flag to start the server: repository0-plot-code-lib --serve 3000
- Show example curl commands:
  curl "http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg"
  curl "http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png" --output plot.png
- Describe all supported query parameters and response content types.