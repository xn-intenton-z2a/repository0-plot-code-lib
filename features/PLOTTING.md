# Overview
Enhance the CLI plotting workflow with core capabilities for expression parsing range parsing time series generation data export and plot rendering.

# Dotenv Integration
On startup load environment variables via dotenv.config
Recognize and validate the following with zod
- PLOT_WIDTH number
- PLOT_HEIGHT number
- PLOT_BACKGROUND string
- PLOT_COLOR string
Merge env defaults with CLI flags flags override env values

# CLI Parameter Parsing and Validation
Define flags in src/lib/main.js with zod
- --expression required unless --input-file is provided
- --range required unless --input-file is provided syntax x=min:max[:step]
- --input-file optional path to CSV or JSON input data
- --input-format csv or json default csv
- --export-data-format optional csv or json enables data export
- --export-file optional path for data export default stdout
- --format svg or png default svg
- --output-file optional path for plot output default stdout
- --width height background color optional style overrides
Emit clear error messages exit nonzero on invalid inputs or flag combinations

# Expression Parsing and Time Series Generation
Import mathjs parse and compile expression into f(x)
Parse range into numeric start end step validate start <= end step > 0
Generate x values compute y filter non finite results
Represent series as array of objects { x number y number }

# Data Sourcing and I O
If --input-file present read asynchronously
For CSV use csv parser with header detection
For JSON parse array of objects with numeric x and y
Validate records with zod schema

# Data Export
When --export-data-format specified serialize series
CSV header x y comma separated records
JSON array of objects
Write to --export-file or stdout skip plot generation

# Plot Rendering
Generate SVG via EJS template with axes data path
If PNG requested convert SVG via sharp
Apply width height background color from env or flags
Write image to --output-file or stdout

# HTTP API
Define POST /plot endpoint in Express server
Accept JSON payload matching CLI flags
Validate payload with zod
For export respond with text csv or application json body
For plot respond with image svg+xml or image png
Handle errors with JSON error messages and status codes

# Testing Enhancements
Update tests unit main.test.js cover dotenv loading new flags
Add tests unit export.test.js for data serialization output
Extend tests unit server.test.js cover env defaults and style overrides

# Documentation Updates
Update README CLI Usage document dotenv support style flags
Enhance docs USAGE.md with examples of using env variables and flags together