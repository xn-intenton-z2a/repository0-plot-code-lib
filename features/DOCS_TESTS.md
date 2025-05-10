# Documentation Updates

Update the user-facing guides to include comprehensive coverage of the stats, serve, regression, and transform subcommands.

1. README.md
   - Under Available Commands, add entries for:
     • regression: Perform least-squares regression on data or expressions
     • transform: Apply series transforms (moving-avg, diff, cumsum, scale, offset)
     • serve: Start the HTTP API server for plot and stats endpoints
   - Under Plot Subcommand, add brief cross-links to regression and transform subcommands.
   - Add new sections for Regression and Transform usage:
     • List CLI flags, describe behavior, and show example invocations for table, JSON, CSV, and ASCII outputs
   - Add a Serve Subcommand section demonstrating:
     • repository0-plot-code-lib serve --port 3000
     • Explanation of HTTP GET /plot and /stats endpoints

2. USAGE.md
   - In Commands list, include regression and transform alongside plot, stats, reseed, serve.
   - Add new sections for regression and transform options, matching patterns in plot and stats:
     • --expression, --data, --xmin, --xmax, --samples, --format, --output, and method-specific flags (--plot-line for regression, --method/--window/--factor/--value for transform)
   - Provide usage Examples:
     • repository0-plot-code-lib regression --expression "2*x+1" --samples 10 --format json
     • repository0-plot-code-lib transform --data data.csv --method scale --factor 2 --output scaled.csv
   - Ensure Serve command example and HTTP endpoints section are present.

# Testing Additions

Add new Vitest unit tests to ensure regression and transform subcommands are fully covered.

1. tests/unit/regression.test.js
   - Expression mode: verify computed slope, intercept, r_squared for simple linear functions.
   - Data file mode: mock fs.readFileSync for JSON, CSV, YAML inputs and assert correct output for table, JSON, CSV formats.
   - --plot-line behavior: spy on console.log to capture ASCII chart and assert markers and line overlay.
   - --output file export: mock fs.writeFileSync and confirm written content and confirmation message.
   - Error conditions: missing source, samples<2, unsupported extension, unknown format flag.

2. tests/unit/transform.test.js
   - moving-avg: test window sizes and error on window<2.
   - diff and cumsum: verify lengths and values for simple series.
   - scale: apply a factor and assert updated y values.
   - offset: apply offsets (positive/negative) and assert shifts.
   - Data file modes: mock fs.readFileSync for each supported extension and verify transforms.
   - Format options: table, JSON, CSV outputs.
   - --output file export: mock fs.writeFileSync and confirm file writes and console confirmation.
   - Error conditions: missing --method, invalid method, missing factor/value for scale/offset, missing source, parse failures.

# Implementation Details

No changes to src/lib/main.js or dependencies are required. Documentation files (README.md, USAGE.md) and new test files will be created or updated. Ensure consistency with existing code style and Vitest testing patterns.
