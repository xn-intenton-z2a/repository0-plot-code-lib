# Overview
Provide a unified summary statistics feature that supports both command-line and HTTP contexts. Users can compute min, max, mean, median, and standard deviation for a data series derived from a mathematical expression or input data file and receive results as JSON or plain text.

# CLI Stats Subcommand
Add a new stats subcommand to the CLI entrypoint. Invocation:
 repository0-plot-code-lib stats [--flags]

Required flags:
- --expression <expression>  Function expression in the form y=…
- --dataFile <path>        Path to JSON CSV or YAML file containing data points
Optional flags:
- --range <axis=min:max>    Axis range for expression mode
- --samples <number>        Number of sample points default 100
- --json <true|false>       Output format JSON or plain text default true
- --output <path>           Write output to file defaults to stdout

Behavior:
1. Parse and validate flags on error print to stderr and exit code 1
2. Load data points from expression via generateData or from dataFile via filesystem
3. Call computeSummaryStats to calculate min max mean median and stddev
4. Serialize results as JSON when json flag is true otherwise format as plain text lines
5. Write results to output path or stdout and exit with code 0

# HTTP Stats Endpoint
Expose GET /stats when server is started with --serve <port>

Query parameters mirror CLI flags:
- expression required unless dataFile provided
- dataFile
- range
- samples
- json

Behavior:
1. Validate query parameters using zod return 400 JSON on error
2. Load data points from expression or file
3. Compute summary statistics
4. If json is false respond with text plain lines otherwise respond with application JSON object
5. Include Access Control Allow Origin header on all responses
6. Return HTTP status 200 on success or 400 with JSON error message on failure

# Implementation
Implement runStatsCli and HTTP /stats route in src/lib/main.js Use existing parseArgs parseRange generateData computeSummaryStats functions Extend main entrypoint to dispatch on stats subcommand Add zod schema for HTTP parameter validation

# Testing
Add unit tests in tests unit plot generation test js or a new tests file Cover CLI stats invocation success and error cases Cover HTTP /stats JSON and plain text modes file input mode missing parameters and CORS header presence

# Documentation
Update USAGE md and README md to document stats subcommand flags examples HTTP /stats endpoint response formats and CORS support