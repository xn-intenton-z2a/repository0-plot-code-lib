# Overview

Fully implement the plot engine by completing the CLI plot subcommand and HTTP plot endpoint supporting SVG and PNG output with optional derivative and regression overlays, custom dimensions and color palettes, and base64 encoding.

# CLI Plot Subcommand

Add flags validated by zod
- expression <function>  Mathematical expression in y=... form
- range <axis>=min:max  Axis range for expression mode
- dataFile <path>       JSON CSV or YAML data file
- format <svg|png>      Output image format
- output <path>         File path to write image
- width <number>        Image width in pixels default 500
- height <number>       Image height in pixels default 300
- samples <number>      Sample count default 100
- derivative <true|false>  Overlay first derivative curve
- overlayTrendline <true|false> Overlay regression trendline
- palette <colors>      Comma separated list of CSS colors
- encoding <base64>     Return base64 JSON response

Behavior
1 Parse and validate flags on invalid input print error and exit 1
2 Generate points via generateData or read from dataFile
3 Compute derivative if requested
4 Compute regression and trendline if requested
5 Build Chart configuration for QuickChart API
6 POST to QuickChart create or chart endpoint using fetch
7 Receive SVG string or PNG buffer write to output path
8 Exit 0 on success

# HTTP /plot Endpoint

Extend express server GET /plot with query parameters validated by zod
- expression range dataFile samples format width height derivative overlayTrendline palette encoding

Behavior
1 Validate parameters return 400 on error
2 Generate or load data series apply derivative and trendline overlays
3 Construct Chart configuration and POST to QuickChart API
4 If encoding is base64 respond application JSON with data string and type field
5 Otherwise respond with image/svg+xml or image/png raw bytes
6 Include CORS header and return 200 on success

# Testing

Add unit tests for CLI
- Verify SVG and PNG files are generated for computed mode and dataFile mode with derivative and trendline overlays
- Use temporary output paths and inspect file existence and magic bytes prefix SVG or PNG header
Add HTTP tests using supertest
- GET /plot produces correct content type and body for binary responses default
- GET /plot with encoding base64 returns JSON object with data and type fields
- Invalid parameters return 400

# Documentation

Update USAGE.md and README.md to document plot subcommand flags and /plot endpoint examples
Include sample curl commands and expected responses

# Implementation

In src lib main js implement runPlotCli function and extend createServer to handle /plot route using global fetch and QuickChart API
Use zod for parameter validation and node native fetch for HTTP requests