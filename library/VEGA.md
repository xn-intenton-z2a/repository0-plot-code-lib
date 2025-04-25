# VEGA

## Crawl Summary
Vega version 5.31.0 provides a JSON-based visualization specification that defines interactive visualizations with data, scales, axes, legends, marks, and signals. Vega-Lite (version 6.1.0) compiles higher-level concise visualizations to full Vega specs. Web deployment uses CDN-hosted scripts with options to import Vega, Vega-Lite, and Vega-Embed. The View API constructs visualizations with options for renderer, container, and hover enablement. Command line utilities vg2pdf, vg2png, and vg2svg support options -b, -h, -s, -seed, -c, -f, -t, -l for asset management, output scaling, and logging. Detailed CLI command examples and troubleshooting (redirecting stderr) are provided.

## Normalised Extract
TABLE OF CONTENTS:
1. Vega Core Concepts
2. Vega Specification Structure
3. Vega-Lite API Usage
4. Web Deployment & View API
5. Command Line Utilities
6. Configuration and Troubleshooting

1. Vega Core Concepts:
- Visualization grammar using JSON.
- Supports interactive behavior via reactive signals.
- Provides building blocks: data, scales, axes, legends, marks, signals.

2. Vega Specification Structure:
- JSON object with fields: width (Number), height (Number), data (object with url or values), scales (array), axes (array), legends (array), marks (array), signals (array).
- Example: { "width":400, "height":200, "data": { "url":"data/movies.json" }, "marks": [...] }

3. Vega-Lite API Usage:
- JavaScript API for creating Vega-Lite JSON.
- Method chaining pattern: vl.markBar().data(url).encode( vl.x().fieldQ('IMDB_Rating').bin(true), vl.y().count() )
- Generates JSON spec with keys: mark, data, encoding (x: {bin, field, type}, y: {aggregate, type}).

4. Web Deployment & View API:
- Import Vega using script tags from CDN.
- View API: new vega.View(vega.parse(spec), { renderer:'canvas', container:'#view', hover:true })
- runAsync() returns a promise.

5. Command Line Utilities:
- Tools: vg2pdf, vg2png, vg2svg.
- Parameters:
  -b/--base: String, base directory or URL.
  -h/--header: Flag for XML header in SVG output.
  -s/--scale: Number (default 1) for resolution scaling.
  -seed: Number for random seed.
  -c/--config: String for config file path.
  -f/--format: String for locale format file.
  -t/--timeFormat: String for time format locale file.
  -l/--loglevel: String (error, warn, info, debug).

6. Configuration and Troubleshooting:
- Renderer option: 'canvas' vs 'svg'.
- Use -b flag to set asset base paths.
- For CSP issues, use alternative evaluators.
- Troubleshooting: Redirect stderr to log file (e.g., vg2pdf ... 2> vg2pdf.log).


## Supplementary Details
Technical Specifications:
- Vega Spec JSON Example:
  {
    "width": 400,
    "height": 200,
    "data": { "url": "data/movies.json" },
    "scales": [{ "name": "xscale", "type": "linear", "domain": { "data": "table", "field": "value" }, "range": "width" }],
    "axes": [{ "orient": "bottom", "scale": "xscale" }],
    "marks": [{ "type": "rect", "encode": { "enter": { "x": { "scale": "xscale", "field": "category" }, "y": { "value": 0 } } } }]
  }
- Vega-Lite API: Methods such as vl.markBar(), vl.x(), vl.y(), with exact chainable methods returning objects with field setting and encoding options. 
- Web Deployment: CDN URLs:
  https://cdn.jsdelivr.net/npm/vega@5
  https://cdn.jsdelivr.net/npm/vega-lite@5
  https://cdn.jsdelivr.net/npm/vega-embed@6
- View API Constructor Signature:
  new vega.View(parsedSpec, { renderer: string, container: string, hover: boolean })
- CLI Options (exact values):
  -b: base directory string (e.g., "data/" or "http://host/data/")
  -h: header flag for vg2svg
  -s: scale factor (default 1)
  -seed: number
  -c: config file path (JSON or JS exporting an object)
  -f: number format locale file
  -t: time format locale file
  -l: log level string [error, warn, info, debug]
- Troubleshooting Command Example:
  vg2svg -b data/ -s 2 input_spec.json output.svg 2> error.log


## Reference Details
Vega API Specifications:
1. Vega Specification Object:
   - Properties: width (Number), height (Number), data (Object), scales (Array), axes (Array), legends (Array), marks (Array), signals (Array).
   - Example:
     { "width": 400, "height": 200, "data": { "url": "data/movies.json" }, "scales": [...], "axes": [...], "marks": [...], "signals": [...] }

2. Vega-Lite API:
   - Method: vl.markBar()
     Return Type: MarkBuilder
   - Method: vl.x()
     Return Type: FieldBuilder, supports .fieldQ(String) which accepts field name and method bin(Boolean).
   - Method: vl.y()
     Return Type: AggregateBuilder, supports .count()
   - Complete chain returns a JSON object:
     {
       "mark": "bar",
       "data": { "url": "data/movies.json" },
       "encoding": {
         "x": { "bin": true, "field": "IMDB_Rating", "type": "quantitative" },
         "y": { "aggregate": "count", "type": "quantitative" }
       }
     }

3. Vega View API:
   - Constructor: new vega.View(parsedSpec, options)
       Parameters:
         parsedSpec: Output of vega.parse(spec), Object
         options: Object with keys:
            renderer: string (either 'canvas' or 'svg')
            container: string (DOM selector or element)
            hover: boolean
       Returns: View instance with methods runAsync(), signal(), insert(), remove(), update(), etc.
   - Example Code:
     var view = new vega.View(vega.parse(spec), { renderer: 'canvas', container: '#view', hover: true });
     view.runAsync().then(function() { /* view is rendered */ });

4. CLI Utilities (vg2pdf, vg2png, vg2svg):
   - Syntax: vg2<format> [options] [input_vega_json_file] [output_file]
   - Options:
     -b, --base: String; base path (e.g., "data/" or "http://host/data/")
     -h, --header: Flag (SVG only) to include XML header
     -s, --scale: Number; default 1
     -seed: Number; sets RNG seed
     -c, --config: String; path to config file
     -f, --format: String; path to number format file
     -t, --timeFormat: String; path to time format file
     -l, --loglevel: String; one of error, warn, info, debug
     --help: Flag to display usage instructions
   - Return: Writes static file to stdout or file, logs errors to stderr.

5. Best Practices & Troubleshooting:
   - Always verify the JSON spec structure against documented schemas.
   - Use CDN for production with fallback to self-hostable files.
   - For CSP issues, replace Function constructors by using provided alternative evaluators.
   - Troubleshooting command: vg2png spec.json chart.png 2>vg2png.log, check log file for error details.

6. Full Code Example (Embedding a Vega Chart):
   HTML:
   <head>
     <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
   </head>
   <body>
     <div id="view"></div>
     <script>
       fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
         .then(function(response) { return response.json(); })
         .then(function(spec) {
           var view = new vega.View(vega.parse(spec), {
             renderer: 'canvas',
             container: '#view',
             hover: true
           });
           view.runAsync();
         })
         .catch(function(error) { console.error('Error loading Vega spec:', error); });
     </script>
   </body>

Return Types, Exceptions:
   - Methods throw exceptions if spec parsing fails. Always use .catch() for promises.


## Information Dense Extract
Vega ver. 5.31.0; Vega-Lite ver. 6.1.0; JSON spec: {width:Number, height:Number, data:{url:String}, scales:Array, axes:Array, legends:Array, marks:Array, signals:Array}; Vega-Lite API: vl.markBar(), vl.x().fieldQ(String).bin(Boolean), vl.y().count(); Output JSON: {mark:'bar', data:{url:'data/movies.json'}, encoding:{x:{bin:true, field:'IMDB_Rating', type:'quantitative'}, y:{aggregate:'count', type:'quantitative'}}}; View API: new vega.View(vega.parse(spec), {renderer:'canvas'|'svg', container:'#view', hover:Boolean}).runAsync(); CLI: vg2pdf/vg2png/vg2svg with options -b (base:String), -h (header flag), -s (scale:Number default 1), -seed(Number), -c (config file), -f (format locale), -t (timeFormat locale), -l (loglevel: error|warn|info|debug); Troubleshooting: redirect stderr (e.g., 2> log.txt); CDN URLs: https://cdn.jsdelivr.net/npm/vega@5, https://cdn.jsdelivr.net/npm/vega-lite@5, https://cdn.jsdelivr.net/npm/vega-embed@6.

## Sanitised Extract
TABLE OF CONTENTS:
1. Vega Core Concepts
2. Vega Specification Structure
3. Vega-Lite API Usage
4. Web Deployment & View API
5. Command Line Utilities
6. Configuration and Troubleshooting

1. Vega Core Concepts:
- Visualization grammar using JSON.
- Supports interactive behavior via reactive signals.
- Provides building blocks: data, scales, axes, legends, marks, signals.

2. Vega Specification Structure:
- JSON object with fields: width (Number), height (Number), data (object with url or values), scales (array), axes (array), legends (array), marks (array), signals (array).
- Example: { 'width':400, 'height':200, 'data': { 'url':'data/movies.json' }, 'marks': [...] }

3. Vega-Lite API Usage:
- JavaScript API for creating Vega-Lite JSON.
- Method chaining pattern: vl.markBar().data(url).encode( vl.x().fieldQ('IMDB_Rating').bin(true), vl.y().count() )
- Generates JSON spec with keys: mark, data, encoding (x: {bin, field, type}, y: {aggregate, type}).

4. Web Deployment & View API:
- Import Vega using script tags from CDN.
- View API: new vega.View(vega.parse(spec), { renderer:'canvas', container:'#view', hover:true })
- runAsync() returns a promise.

5. Command Line Utilities:
- Tools: vg2pdf, vg2png, vg2svg.
- Parameters:
  -b/--base: String, base directory or URL.
  -h/--header: Flag for XML header in SVG output.
  -s/--scale: Number (default 1) for resolution scaling.
  -seed: Number for random seed.
  -c/--config: String for config file path.
  -f/--format: String for locale format file.
  -t/--timeFormat: String for time format locale file.
  -l/--loglevel: String (error, warn, info, debug).

6. Configuration and Troubleshooting:
- Renderer option: 'canvas' vs 'svg'.
- Use -b flag to set asset base paths.
- For CSP issues, use alternative evaluators.
- Troubleshooting: Redirect stderr to log file (e.g., vg2pdf ... 2> vg2pdf.log).

## Original Source
Vega Documentation
https://vega.github.io/vega/

## Digest of VEGA

# Vega Documentation Digest

# Date Retrieved: 2023-10-07

## Overview
Vega is a visualization grammar that uses JSON specifications to create interactive visualizations. It supports data loading, transformation, scales, mapping, axes, legends, graphical marks and reactive signals for interaction. The specifications can produce static images or interactive web views using Canvas or SVG.

## Specification
A Vega specification is a JSON object with properties including:
- width, height
- data definitions (with url, values, format)
- scales for mapping data to visual attributes
- axes for coordinate mapping
- legends for encoding data aesthetics
- marks (e.g., rectangles, lines, symbols) with properties (x, y, color, etc.)
- signals for reactive state updates

Example JSON specification snippet:

{
  "width": 400,
  "height": 200,
  "data": { "url": "data/movies.json" },
  "scales": [...],
  "axes": [...],
  "marks": [...],
  "signals": [...] 
}

## Vega-Lite and Vega-Lite API
Vega-Lite provides a higher-level declarative language to author visualizations. It compiles into Vega specifications.

### Vega-Lite API Example
Using the Vega-Lite API in JavaScript:

vl.markBar().data('data/movies.json').encode(
  vl.x().fieldQ('IMDB_Rating').bin(true),
  vl.y().count()
)

This produces the following JSON:

{
  "mark": "bar",
  "data": { "url": "data/movies.json" },
  "encoding": {
    "x": { "bin": true, "field": "IMDB_Rating", "type": "quantitative" },
    "y": { "aggregate": "count", "type": "quantitative" }
  }
}

## Web Deployment & View API

To deploy Vega on the web, include the Vega JavaScript library. Example using CDN:

<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>

### Using the Vega View API
Example code to load and render a Vega spec:

<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
<body>
  <div id="view"></div>
  <script type="text/javascript">
    var view;
    fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
      .then(res => res.json())
      .then(spec => render(spec))
      .catch(err => console.error(err));

    function render(spec) {
      view = new vega.View(vega.parse(spec), {
        renderer: 'canvas', // options: 'canvas' or 'svg'
        container: '#view',  // DOM container
        hover: true
      });
      return view.runAsync();
    }
  </script>
</body>

## Command Line Utilities

The Vega CLI provides vg2pdf, vg2png, and vg2svg for rendering visualizations into static files.

Usage examples:

vg2png input_spec.json output.png

CLI Options:
- -b or --base: Specify base directory or URL for assets
- -h or --header: Include XML header in SVG output
- -s or --scale: Resolution scale factor (default 1)
- -seed: Set seed for random number generation
- -c or --config: Path to a Vega config JSON or JS file
- -f or --format: Set number format locale
- -t or --timeFormat: Set data/time format locale
- -l or --loglevel: Set log level (error, warn, info, debug)
- --help: Show usage help

## Configuration and Troubleshooting

- Rendering: Configure renderer as 'canvas' or 'svg' in the View API
- Asset Loading: Use the -b flag with the appropriate path or URL
- Content Security Policy: For CSP compliance, use alternative expression evaluators as documented
- Troubleshooting: Log errors to stderr and use --loglevel debug for detailed logs. Example command:

vg2svg -b data/ -s 2 input_spec.json output.svg 2> log.txt


## Attribution
- Source: Vega Documentation
- URL: https://vega.github.io/vega/
- License: BSD-3-Clause
- Crawl Date: 2025-04-25T19:43:12.811Z
- Data Size: 9269851 bytes
- Links Found: 10042

## Retrieved
2025-04-25
