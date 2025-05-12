# Overview
Extend the existing statistics engine to support both distribution analysis and histogram generation alongside summary and regression metrics. Users can compute standard summary statistics, optional linear regression parameters, and a configurable histogram of data series derived from a mathematical expression or an input data file. Results are available in JSON or plain text formats via CLI and HTTP.

# CLI Stats Subcommand
Extend the stats subcommand to support existing flags and add histogram behavior:
- --trendline-stats <true|false>    Compute regression slope, intercept, and R² (default false)
- --histogram <true|false>          Generate histogram counts over the data (default false)
- --bins <number>                   Number of bins for histogram (default 10)

Invocation:
 repository0-plot-code-lib stats [--flags]

Behavior:
1. Parse and validate flags; on error print to stderr and exit code 1
2. Load data points from expression or dataFile
3. Compute summary statistics via computeSummaryStats
4. If trendline-stats is true, compute regression parameters with least-squares fitting
5. If histogram is true, compute histogram bins using computeHistogram(points, bins)
6. Build result object containing summary stats, optional regression fields, and optional histogram array of {binStart, binEnd, count}
7. Serialize results in JSON or plain text lines
8. Write to output or stdout and exit code 0

# HTTP Stats Endpoint
Extend GET /stats to accept:
- trendlineStats (string true|false)
- histogram (string true|false)
- bins (string number)

Query parameters mirror CLI flags. Behavior:
1. Validate parameters with zod; return 400 JSON on error
2. Load data points from expression or file
3. Compute summary statistics
4. If trendlineStats is true, compute slope, intercept, R²
5. If histogram is true, compute histogram array
6. Respond in text/plain or application/json including histogram when requested
7. Include Access-Control-Allow-Origin header and return 200 on success or 400 on failure

# Implementation
- Add utility computeHistogram(points, binCount) that divides the y-value range into binCount equal intervals and counts points per bin
- In src/lib/main.js implement runStatsCli handling new flags histogram and bins
- Extend createServer to register GET /stats with zod schema including histogram and bins, and to include histogram logic
- Ensure backwards compatibility: when histogram=false and trendlineStats=false behave as before

# Testing
- Add unit tests for CLI stats with histogram true and false, verifying JSON and text outputs
- Add tests for HTTP GET /stats with histogram and bins parameters
- Verify correct bin boundaries and counts against known data sets
- Ensure summary and regression tests remain passing

# Documentation
- Update USAGE.md and README.md to document new histogram and bins options in CLI and HTTP examples