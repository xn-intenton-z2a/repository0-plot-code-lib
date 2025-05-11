# Overview
Adds an HTTP API to run a web server for remote plot and data generation, enabling integration with other applications.

# API Endpoints
- GET /plot?expression=x^2&range=0:10&format=svg|png
- GET /data?expression=x^2&range=0:10&format=json|csv

# Implementation
- Extend src/lib/main.js to accept --serve <port> flag. When provided, start an express server on the specified port.
- Use express to define routes /plot and /data.
- Validate query parameters with zod to ensure expression, range, and format are correct.
- For /plot, generate SVG or PNG using existing rendering logic and respond with proper content type.
- For /data, generate time series and respond with JSON or CSV using existing serialization routines.

# Testing
- Add supertest based tests in tests/unit/http-api.test.js to verify endpoint responses, status codes, headers, and payload formats.
- Mock internal generation functions to simulate error and success cases.

# Documentation
- Update README.md and USAGE.md with HTTP API examples and instructions.
