# Overview
Extend the unified plot engine to fully implement and expose a dedicated statistics endpoint that computes summary metrics (min, max, mean, median, stddev) for a series generated from a mathematical expression or imported data.

# HTTP API Endpoints
- GET /stats  
  • Query parameters:  
    - expression (optional when dataFile is provided): string in the form y=…  
    - range (required when expression is provided): axis=min:max  
    - dataFile (optional when expression is provided): path to JSON, CSV, or YAML file  
    - samples (optional): integer number of sample points, default 100  
    - json (optional): true|false, default true  
  • Behavior:  
    - When expression and range are present, generate data points via generateData.  
    - When dataFile is provided, read and parse file (support JSON, YAML, CSV), convert to series.  
    - Compute summary statistics: min, max, mean, median, stddev.  
    - If json=false, respond text/plain with one metric per line (label: value).  
    - If json=true, respond application/json with an object { min, max, mean, median, stddev }.

# Implementation
- In src/lib/main.js during HTTP server setup alongside /plot:  
  • Add app.get('/stats', async (req, res) => { … }) handler.  
  • Parse and validate query params (use zod or manual checks).  
  • For expression mode: call parseRange, generateData.  
  • For dataFile mode: fs.readFileSync and convertDataToString or a new helper to parse raw file into points.  
  • Compute summary metrics (implement helper computeSummaryStats).  
  • Branch on req.query.json flag to send JSON or plain text.  
  • Return appropriate content-type and status codes on error.

# Testing
- Add unit tests in tests/unit/plot-generation.test.js for /stats endpoint:  
  • Valid expression and range returns JSON with correct metrics.  
  • Valid expression and range with json=false returns plain text.  
  • dataFile mode with sample JSON/CSV/YAML fixtures returns correct stats.  
  • Missing required params or invalid range returns 400 with error message.  
  • Ensure CORS and headers are consistent with /plot.

# Documentation
- Update USAGE.md and README.md:  
  • Describe GET /stats endpoint, supported query parameters, response formats.  
  • Provide curl examples for JSON and plain-text modes.  
  • Illustrate sample output blocks for both response types.