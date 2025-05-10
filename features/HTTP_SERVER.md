# Summary

Enhance the existing serve subcommand to support POST requests to the /plot and /stats HTTP endpoints with JSON or CSV payloads in the request body. This allows clients to submit entire datasets in a single request while preserving backward compatibility with existing GET behavior.

# Behavior

POST /plot
- Content-Type application/json: body is an array of objects with numeric x and y properties
- Content-Type text/csv: body is CSV text with header row x,y or two columns of numbers
- Optional query parameters (type, width, height, outputFormat) override defaults or config values
- If outputFormat=ascii returns text/plain ASCII chart; otherwise returns application/json array of data points

POST /stats
- Same body parsing for JSON or CSV as /plot
- Compute descriptive statistics (min, max, mean, median, standard deviation) on provided data
- Respond with application/json containing keys x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev

GET /plot and GET /stats remain unchanged

# Implementation Details

In src/lib/main.js within createServer:
- Use express.json() middleware to parse JSON bodies and express.text({ type: 'text/csv' }) to capture CSV payloads
- In POST handlers for /plot and /stats:
  - Detect content type via req.is('application/json') or req.is('text/csv')
  - For JSON, assign dataPoints = req.body
  - For CSV, split req.body by lines, parse header or two-column rows into numeric x and y array
  - Validate dataPoints is non-empty and each record has numeric x and y
  - For /plot, if no body but expression query present, fall back to GET expression logic
  - Invoke renderAsciiChart or JSON response accordingly
  - For /stats, call computeStatistics on dataPoints and send JSON
- On parsing or validation errors, send res.status(400).json({ error: message })

# Testing

Add or update integration tests in tests/unit/http-api.test.js using supertest:
- POST /plot with JSON body: verify 200 and JSON array or ASCII chart when outputFormat=ascii
- POST /plot with CSV body: verify correct parsing and output
- POST /stats with JSON and CSV bodies: verify correct statistics in JSON
- Error conditions: malformed JSON or CSV, missing body or invalid records respond 400 with JSON error

# Documentation

Update README.md and USAGE.md:
- Add curl examples:
    curl -X POST -H "Content-Type: application/json" --data '[{"x":0,"y":0},{"x":1,"y":1}]' http://localhost:3000/plot
    curl -X POST -H "Content-Type: text/csv" --data 'x,y\n0,0\n1,1' http://localhost:3000/stats
- Include expected response snippets for both JSON and ASCII output
