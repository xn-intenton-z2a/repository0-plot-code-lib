# Overview

Extend the HTTP server mode by adding a new `/stats` endpoint that computes and returns summary statistics for a data series defined by a mathematical expression over a range or by importing an external data file. This feature provides users quick analytics without generating a plot.

# HTTP Route

- **GET** `/stats`
  - Query parameters:
    • `expression` (string): A function in `x`, e.g., `y=sin(x)`. Mutually exclusive with `dataFile`.
    • `range` (string): Axis range in `axis=min:max` format when using `expression` mode.
    • `dataFile` (string): Path to a JSON, YAML, or CSV file containing x,y records when using data-file mode.
    • `samples` (number, optional): Number of intervals for expression mode (default 100).
    • `json` (true|false, optional): Whether to return a JSON object (default true). If false, returns plain text lines.

# Implementation

1. **CORS Configuration**
   - Import and apply the `cors` middleware in `src/lib/main.js` for HTTP server mode.
   - Respect a new `--cors-origins` CLI flag and `CORS_ORIGINS` environment variable for origin whitelisting.

2. **Stats Route Handler**
   - In the Express app initialization under the `--serve` branch, add:
     ```js
     app.get('/stats', async (req, res) => {
       try {
         const { expression, range, dataFile, samples = '100', json = 'true' } = req.query;
         let points;
         if (dataFile) {
           points = parseDataFile(dataFile);
         } else {
           const rangeObj = parseRange(range);
           points = generateData(expression, rangeObj, Number(samples));
         }
         const ys = points.map(p => p.y);
         const min = Math.min(...ys);
         const max = Math.max(...ys);
         const mean = ys.reduce((a, b) => a + b, 0) / ys.length;
         const sorted = [...ys].sort((a, b) => a - b);
         const mid = Math.floor(sorted.length / 2);
         const median = sorted.length % 2 === 0
           ? (sorted[mid - 1] + sorted[mid]) / 2
           : sorted[mid];
         const variance = ys.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (ys.length - 1 || 1);
         const stddev = Math.sqrt(variance);
         const isJson = json === 'true';
         const payload = { min, max, mean, median, stddev };
         if (isJson) {
           res.type('application/json').send(payload);
         } else {
           const lines = [
             `min: ${min.toFixed(2)}`,
             `max: ${max.toFixed(2)}`,
             `mean: ${mean.toFixed(2)}`,
             `median: ${median.toFixed(2)}`,
             `stddev: ${stddev.toFixed(2)}`
           ];
           res.type('text/plain').send(lines.join('\n'));
         }
       } catch (err) {
         res.status(400).json({ error: err.message });
       }
     });
     ```

# Testing

- Add unit tests in `tests/unit/http-api.test.js`:
  - **Expression mode**: GET `/stats?expression=y=x&range=x=0:5` returns JSON with correct keys.
  - **Data-file mode**: Mock `fs.readFileSync` for JSON/YAML/CSV; GET `/stats?dataFile=sample.csv&json=false` returns plain text lines.
  - **Samples override**: Confirm `samples` parameter alters the count of generated points but statistics format remains correct.
  - **Error cases**: Missing both `expression` and `dataFile`, invalid `range` syntax, unsupported file extension, invalid `json` flag yield HTTP 400 and descriptive error.

# Documentation

- **USAGE.md** and **README.md**:
  - Under **HTTP Server Mode**, add a **Stats Endpoint** section describing `/stats`, its parameters, and example `curl` commands for both JSON and plain-text output.
  - Provide sample outputs for clarity.
  - Document the new `--cors-origins` flag and `CORS_ORIGINS` variable.
