# Overview
Enhance the existing HTTP server mode by adding Cross-Origin Resource Sharing (CORS) support, a configurable origin whitelist, and a new `/stats` endpoint to expose summary statistics via HTTP alongside the existing `/plot` endpoint.  Ensure the `/plot` endpoint also supports an `encoding=base64` query parameter.

# Endpoints

## GET /plot
- Accept same query parameters as programmatic API: expression, range, format, width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, derivative, palette, colors, trendlineStats, overlayTrendline.
- Support new query parameter `encoding=base64`. When present, respond with `application/json` containing `{ data: string, type: string }` where `data` is the base64 encoding of the image or SVG.

## GET /stats
- Compute and return summary statistics (min, max, mean, median, stddev) for a data series defined by either:
  - Query parameters `expression` and `range` (in axis=min:max format)
  - Query parameter `dataFile` pointing to a JSON, YAML, or CSV file on disk.
- Optional `samples` parameter (default 100) and `json=true|false` to control output format.
- When `json=false`, return `text/plain` with each statistic on its own line formatted to two decimal places.
- When `json=true`, return `application/json` with the statistics object.

# CORS Support
- Enable CORS globally on the Express app by default, allowing all origins.
- Introduce a new CLI flag `--cors-origins <list>` and environment variable `CORS_ORIGINS` to restrict allowed origins to a comma-separated whitelist.
- When specified, configure the CORS middleware to accept only those origins.

# Implementation
1. **Dependencies**
   - Ensure `cors` is imported in `src/lib/main.js` and added to `package.json` dependencies if missing.
2. **Configure CORS**
   - In HTTP server mode, before defining routes, call:
     ```js
     import cors from 'cors';
     const corsOptions = {}; 
     if (parsedArgs['cors-origins']) {
       const allowed = parsedArgs['cors-origins'].split(',');
       corsOptions.origin = (origin, cb) => {
         cb(null, allowed.includes(origin));
       };
     } else if (process.env.CORS_ORIGINS) {
       const allowed = process.env.CORS_ORIGINS.split(',');
       corsOptions.origin = (origin, cb) => {
         cb(null, allowed.includes(origin));
       };
     }
     app.use(cors(corsOptions));
     ```
3. **/plot Handler Updates**
   - After calling `generatePlot(opts)`, detect `req.query.encoding==='base64'`. If set, encode the returned SVG string or PNG buffer to base64 and respond with `application/json`:
     ```js
     const rawData = result.data;
     const payload = Buffer.isBuffer(rawData)
       ? rawData.toString('base64')
       : Buffer.from(rawData).toString('base64');
     return res.json({ data: payload, type: result.type });
     ```
4. **/stats Handler**
   - Add:
     ```js
     app.get('/stats', async (req, res) => {
       try {
         // Parse and validate query with a Zod schema mirroring CLI statsSchema
         const { expression, range, dataFile, samples, json } = /* parse and coerce */;
         let points;
         if (dataFile) {
           points = parseDataFile(dataFile);
         } else {
           const rangeObj = parseRange(range);
           points = generateData(expression, rangeObj, Number(samples) || 100);
         }
         // Extract y-values and compute min, max, mean, median, stddev
         const ys = points.map(p => p.y);
         // Compute statistics...
         if (json === false) {
           return res.type('text/plain').send(...);
         }
         return res.json({ min, max, mean, median, stddev });
       } catch (err) {
         res.status(400).json({ error: err.message });
       }
     });
     ```
5. **Testing**
   - In `tests/unit/http-api.test.js`, verify:
     - CORS headers `Access-Control-Allow-Origin` reflect default and whitelist behavior.
     - `/plot` responds with JSON when `encoding=base64` for both SVG and PNG.
     - `/stats` returns correct formats and error codes.

# Documentation
- Update `README.md` and `USAGE.md` under **HTTP Server Mode**:
  - Document `--cors-origins` flag and `CORS_ORIGINS` environment variable.
  - Illustrate `/plot?encoding=base64` usage and sample JSON response.
  - Add a **Stats Endpoint** section showing `GET /stats` examples for plain-text and JSON output.
