# Overview
Refine the existing HTTP server mode by enriching the public documentation with detailed usage examples. Ensure both USAGE.md and README.md illustrate how to start the server and invoke the `/plot` endpoint via HTTP with real-world curl commands.

# HTTP Server Mode Summary
Users can launch an HTTP server instead of using the CLI by passing the `--serve <port>` flag. The server exposes a GET `/plot` endpoint that accepts the same parameters as the programmatic API (expression, range, format, width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, derivative) via query string. On success, it returns an image payload with the appropriate `Content-Type` header.

# Documentation Updates
- USAGE.md:
  • Add a section titled **HTTP Server Mode** that shows how to start the server:
    `repository0-plot-code-lib --serve 3000`
  • Provide example curl commands invoking `/plot`. For example:
    curl "http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg"
    curl "http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png" --output plot.png
  • List and describe supported query parameters and show expected responses.

- README.md:
  • Under **Usage**, add an **HTTP Server Mode** subsection.
  • Briefly describe the `--serve` flag and `/plot` endpoint.
  • Include the same curl examples as USAGE.md to guide users.
  • Link to the detailed HTTP section in USAGE.md for full reference.