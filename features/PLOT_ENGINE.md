# Overview

Enhance the plot subcommand and HTTP /plot endpoint with advanced analytical overlays and data export capabilities. Users can generate plots with optional derivative curves and regression trendlines overlaid on the chart, alongside exporting raw point data in multiple formats to support downstream analysis.

# CLI Plot Subcommand

Add the following flags to the existing plot command:

- --derivative <true|false>       Compute and overlay the first derivative curve on the plot (default false)
- --overlay-trendline <true|false> Compute regression parameters and draw the trendline on the plot (default false)
- --export-data <path>            File path to write raw x,y points (optional)
- --export-format <csv|json|yaml> Format for exported data; inferred from extension if omitted

Behavior:
1. Parse and validate flags; on error print to stderr and exit code 1.
2. Generate or load data points via generateData or data-file parsing.
3. If derivative=true, compute derivative y′ values at each sample and include the derivative curve in the plot data.
4. If overlay-trendline=true, perform least-squares regression on points and overlay the computed trendline on the chart.
5. If export-data is provided:
   a. Serialize raw points (and derivative if computed) in requested format.
   b. Write serialized output to the specified file and, if no image flags, exit with code 0.
6. If image output flags (--format and --output) are present, render the enhanced plot (including derivative and/or trendline) to SVG or PNG using existing generatePlot utility and write to output.
7. Exit with code 0 on success or 1 on any error.

# HTTP /plot Endpoint

Extend GET /plot to support analytical overlays and data export:

Query parameters:
- derivative (true|false)           Overlay derivative curve
- overlayTrendline (true|false)     Overlay regression trendline
- exportData (true|false)           Return raw point data instead of image
- exportFormat (csv|json|yaml)      Format for data export

Behavior:
1. Validate new parameters with Zod alongside existing ones; return 400 JSON on error.
2. Generate or load points as before.
3. If derivative=true, compute and attach derivative values.
4. If overlayTrendline=true, compute regression and attach trendline segments.
5. If exportData=true:
   a. Serialize point data (including derivative if computed) to specified format.
   b. Respond with content-type: application/json, text/csv, or application/x-yaml.
   c. Send serialized body and status 200, skipping image generation.
6. Otherwise render image with derivative and trendline overlays as requested.
7. Include Access-Control-Allow-Origin header and return 200 on success.
