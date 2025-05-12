# Overview
Enhance the existing unified summary statistics feature to include optional regression analysis. Users can compute standard summary statistics (min, max, mean, median, stddev) and, when requested, linear regression parameters (slope, intercept, R²) for a data series derived from a mathematical expression or input data file. Results are available in JSON or plain text formats via CLI or HTTP.

# CLI Stats Subcommand
Extend the stats subcommand to support a new flag:
- --trendline-stats <true|false>  Compute regression slope, intercept, and R² (default false)

Invocation:
 repository0-plot-code-lib stats [--flags]

Required flags:
- --expression <expression>  Function expression in the form y=…
- --range <axis=min:max>    Axis range for expression mode
or
- --dataFile <path>        Path to JSON, CSV, or YAML file containing data points

Optional flags:
- --samples <number>       Number of sample points (default 100)
- --json <true|false>      Output format JSON or plain text (default true)
- --trendline-stats <true|false>  Include regression stats (default false)
- --output <path>          Write output to file (defaults to stdout)

Behavior:
1. Parse and validate flags; on error print to stderr and exit code 1
2. Load data points from expression or dataFile
3. Compute summary statistics via computeSummaryStats
4. If trendline-stats is true, compute regression parameters with least-squares fitting
5. Build result object containing summary stats and optional regression fields
6. Serialize results in JSON or format as labeled plain text lines
7. Write to output or stdout and exit code 0

# HTTP Stats Endpoint
Extend GET /stats to accept:
- trendlineStats (string true|false)

Query parameters mirror CLI flags. Behavior:
1. Validate parameters with zod; return 400 JSON on error
2. Load data points from expression or file
3. Compute summary statistics
4. If trendlineStats is true, compute slope, intercept, and R²
5. If json=false, respond text/plain lines including regression stats when requested
6. Otherwise respond application/json including both summary and regression fields
7. Include Access-Control-Allow-Origin header and return 200 on success or 400 on failure

# Implementation
- Update runStatsCli in src/lib/main.js to parse trendline-stats flag
- Add utility computeRegressionStats(points) to return slope, intercept, r2
- Extend HTTP handler in createServer to parse trendlineStats and include regression logic
- Ensure existing computeSummaryStats remains unchanged

# Testing
- Add unit tests covering CLI with trendline-stats true and false, JSON and text modes
- Cover HTTP /stats with trendlineStats=true and false, verifying regression fields
- Test error handling for missing range when expression provided
- Verify regression calculations against known data sets

# Documentation
- Update USAGE.md and README.md to document new trendline-stats and trendlineStats parameters
- Include examples for computing regression via CLI and HTTP