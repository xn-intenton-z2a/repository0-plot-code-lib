# Overview
Provide an end-to-end plotting feature that supports both command-line and HTTP contexts. Users can render function expressions or import data files as SVG or PNG images and retrieve results via a CLI command or a REST endpoint.

# CLI Plot Subcommand
Invocation
 repository0-plot-code-lib plot [--flags]

Required flags
 - --expression expression to plot in form y equals math expression
 - --range axis equals min colon max numeric axis range for expression mode
 - --format svg or png output image format

Optional flags
 - --dataFile path to JSON CSV or YAML file containing data points
 - --output path to write image defaults to stdout
 - --width pixels image width default 800
 - --height pixels image height default 600
 - --samples number of sample points default 100
 - --xLog boolean use logarithmic scale for x axis
 - --yLog boolean use logarithmic scale for y axis
 - --grid boolean include grid lines
 - --title text chart title
 - --xLabel text label for x axis
 - --yLabel text label for y axis
 - --derivative boolean overlay first derivative curve
 - --overlayTrendline boolean overlay a regression trendline
 - --palette name color scheme from predefined palettes
 - --colors comma separated list of colors for series
 - --exportData path export raw data points to file
 - --exportFormat csv json or yaml format for export when extension is missing
 - --encoding base64 return JSON object with base64 encoded image

Behavior
 1 parse and validate flags on error print message and exit code 1
 2 load data points from expression via generateData or from dataFile via filesystem
 3 call generatePlot with data points and styling options to produce SVG output
 4 if format is png convert SVG to PNG via sharp
 5 if exportData is provided write raw data points to file in exportFormat
 6 if encoding is base64 wrap image output in JSON with data and type and write to stdout
 7 otherwise write image bytes to stdout or to output path and exit code 0

# HTTP Plot Endpoint
Expose GET slash plot when server is started with serve flag

Query parameters mirror CLI flags
 expression required unless dataFile provided
 range required with expression
 dataFile optional unless expression missing
 format required svg or png
 width height samples xLog yLog grid title xLabel yLabel derivative overlayTrendline palette colors exportData exportFormat encoding

Behavior
 1 validate query parameters using zod return 400 JSON error on validation failure
 2 load data points from expression or file
 3 generate plot via generatePlot then convert to PNG if needed
 4 set Access Control Allow Origin header on all responses
 5 if encoding is base64 respond with application json containing data and type
 6 otherwise respond with raw image bytes and correct content type image slash svg xml or image slash png
 7 return HTTP status 200 on success or 400 with JSON error on failure

# Implementation
Implement runPlotCli and extend main entrypoint in src slash lib slash main dot js to handle plot subcommand
In setupHttp add GET slash plot route with zod schema for parameter validation
Use existing utilities parseArgs parseRange generateData and integrate generatePlot and sharp for PNG conversion

# Testing
Add unit tests in tests slash unit slash plot cli dot test dot js and tests slash unit slash plot endpoint dot test dot js
Cover CLI flag validation success and error cases output SVG and PNG files encoding and exportData modes
Cover HTTP slash plot returning SVG and PNG content types JSON base64 encoding and CORS header presence and validation errors

# Documentation
Update USAGE dot md and README dot md to document plot subcommand flags and examples HTTP slash plot endpoint parameters response formats content types and CORS support