# Summary

Expand the existing serve subcommand to fully support POST requests for both /plot and /stats endpoints, enabling clients to submit JSON or CSV data directly in the request body and receive chart or statistics responses. Preserve backward compatibility with existing GET behavior.

# Behavior

POST /plot
- Accept request bodies with Content-Type application/json (array of { x, y } objects) or text/csv (header row optional, two columns x,y).
- Optional query parameters type, width, height, and outputFormat override defaults.
- When outputFormat=ascii, respond with an ASCII art chart (text/plain). Otherwise default to JSON response of the underlying data points (application/json).
- On invalid content type, malformed JSON or CSV parsing errors, or missing/invalid records, respond with 400 and a JSON error message { error: "..." }.

POST /stats
- Accept JSON or CSV payloads as above.
- Compute descriptive statistics (min, max, mean, median, stddev) for x and y values. Respond with application/json containing keys x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev.
- On parsing or validation errors, respond with 400 and a JSON error message.

GET /plot and GET /stats
- Retain existing GET behavior unchanged (plot with expression and optional ASCII, stats with expression).

# Implementation Details

- In createServer inside src/lib/main.js:
  1. Use express.json() to parse JSON bodies and express.text({ type: 'text/csv' }) to capture CSV bodies.
  2. Add app.post('/plot', handler) and app.post('/stats', handler).
  3. In POST handlers:
     - Determine content type via req.is('application/json') or req.is('text/csv').
     - For JSON, assign dataPoints = req.body.
     - For CSV, split req.body into lines, skip header if includes x and y, parse each row to numbers.
     - Validate dataPoints is a non-empty array of objects with numeric x and y; on failure return res.status(400).json({ error: message }).
     - For /plot:
       • If req.query.expression present and no body, fallback to expression sampling logic.
       • Otherwise use parsed dataPoints.
       • If req.query.outputFormat === 'ascii', generate ASCII chart via renderAsciiChart; return text/plain chart.
       • Otherwise return application/json dataPoints.
     - For /stats:
       • Call computeStatistics(dataPoints) and return application/json stats object.

# Testing

- Extend tests/unit/http-api.test.js with Supertest:
  • POST /plot with JSON body: expect 200 JSON array or ASCII chart when outputFormat=ascii.
  • POST /plot with CSV text: verify correct parsing and response.
  • POST /stats with JSON and CSV bodies: expect 200 JSON stats.
  • Error cases: malformed JSON, invalid CSV rows, missing body or unsupported content-type => 400 and JSON error.

# Documentation

- Update README.md and USAGE.md:
  • Under HTTP API endpoints, add POST examples:
    curl -X POST -H "Content-Type: application/json" --data '[{"x":0,"y":0},{"x":1,"y":1}]' http://localhost:3000/plot
    curl -X POST -H "Content-Type: text/csv" --data 'x,y
0,0
1,1' http://localhost:3000/stats
  • Include expected response snippets.