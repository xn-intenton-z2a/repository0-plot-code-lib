# INTERFACES

## Purpose
Provide a unified user interface layer that combines a robust CLI powered by commander with an HTTP server, sharing core logic for time series data and plot generation. Enhance the HTTP server with a real time series streaming endpoint using Server Sent Events (SSE).

## Behavior

### CLI via Commander
1. Replace the existing simple argument parser in mainCLI with commander.  
2. Define two subcommands: timeseries (alias default) and plot, each with options:  
   • --expression <expr> (required)  
   • --range <start:end[:step]> (required)  
   • --points <number> default 100  
   • --format csv or json for timeseries default csv  
   • --plot-format svg or png for plot default svg  
   • --width <number> default 800  
   • --height <number> default 600  
   • --title <string> optional  
   • --output-file <path> optional  
3. Add a global --json-output flag to print the parsed options object as JSON and exit.  
4. Ensure invocation without subcommand runs timeseries by default.  

### HTTP Server
1. Triggered by a serve command or --serve global flag, with optional --port <number>.  
2. Existing routes:  
   • GET / serves the HTML input form.  
   • POST /plot accepts JSON or form data and returns inline SVG or base64 PNG.  
3. Add GET /stream to provide a SSE endpoint of x y events:  
   • Stream one event per data point from getTimeSeries with default or specified points.  
   • Set response header content type text/event-stream and send events of the form data: { x, y } followed by two newlines.  
   • Support query parameters expression range points to configure the stream.  
4. Reuse zod schemas from formSchema for validation and share error handling with POST /plot.  

## Implementation
- In src/lib/main.js import commander and define program with subcommands timeseries and plot, each calling existing getTimeSeries generateSVG generatePNG serializeCSV serializeJSON.  
- Implement --json-output at the program level to print options and exit.  
- In startHTTPServer add a new route app.get /stream that:  
   1. Parses query parameters using formSchema safeParse.  
   2. Sets response header content type to text/event-stream and disables default timeouts.  
   3. For each point from getTimeSeries, writes event: data: JSON string of the point and two newlines.  
   4. Ends the response when all points have been sent.  
- Retain CORS middleware and body parsers.  
- Update package.json bin entry remains pointing to main.  

## Testing
- Extend existing vitest tests to spawn the CLI with --help and --version to verify commander integration.  
- Add tests for --json-output printing valid JSON.  
- Add HTTP tests for GET /stream using supertest:  
   • Request GET /stream?expression=x range=0:2 points=3 and assert response status 200 content type text event stream.  
   • Parse the streamed events and assert three events with correct x y values.  
- Ensure existing CLI tests for CSV JSON SVG PNG continue to pass unmodified.
