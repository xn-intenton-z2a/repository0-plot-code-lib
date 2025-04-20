# VEGA_DOC

## Crawl Summary
The crawled content details the Vega visualization grammar including its JSON specification structure, interactive API, web deployment practices, command line utilities with specific flags and options, and tutorials. Key sections cover the Specification Reference (detailed JSON properties), API Reference (parser, view, and embed modules with method signatures and code examples), Web Deployment (including CDN, bundler, and integration with D3), Command Line Utilities (vg2pdf, vg2png, vg2svg with options and usage examples), and Vega-Lite API (JavaScript API for generating Vega-Lite JSON with full code examples).

## Normalised Extract
## Table of Contents
1. Specification Reference
2. API Reference
3. Web Deployment
4. Command Line Utilities
5. Vega-Lite API
6. Tutorials

---

### 1. Specification Reference
- Vega JSON spec structure:
  - Basic properties: width, height
  - Data definitions
  - Scales: mapping data (numbers/strings) to visual properties
  - Axes & Legends: Visualization of scales
  - Marks: Graphical elements (rectangles, lines, symbols)
  - Projections: Cartographic mapping (longitude, latitude)
  - Transforms: Data filtering, aggregation, sorting, layout transformations
  - Signals: Interactive reactive variables
  - Event Streams: Input event definitions
  - Expressions: Custom calculations
  - Layout: Grid layouts
  - Types: Parameter type definitions

### 2. API Reference
- **Parser**: `vega.parse(spec: Object): DataflowDescription`
- **View**:
  - Constructor: `new vega.View(vega.parse(spec), { renderer: 'canvas' | 'svg', container: '#view', hover: true })`
  - Method: `runAsync(): Promise<View>`
- **Vega-Embed**: Function `vegaEmbed(selector: string, specUrl: string)` for embedding visualizations

### 3. Web Deployment
- Importing via CDN:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```
- Using D3 and topojson with smaller bundle:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```
- Module import via bundler:

```javascript
import * as vega from "vega";
```

### 4. Command Line Utilities
- Commands: `vg2pdf`, `vg2png`, `vg2svg`
- Usage:

```bash
vg2png [options] [input_vega_json_file] [output_png_file]
```

- Options with exact flags:
  - `-b, --base`: Base directory (e.g., `-b http://host/data/`)
  - `-s, --scale`: Numeric value (default: 1)
  - `-c, --config`: Path to config file
  - `-f, --format`: Number format locale file
  - `-t, --timeFormat`: Time format locale file
  - `-l, --loglevel`: Log level (error, warn, info, debug)
  - `--header`: Flag for SVG header inclusion (vg2svg only)
  - `-seed`: Seed for random number generation

Example Command:

```bash
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

### 5. Vega-Lite API
- Example Code:

```javascript
vl.markBar().data('data/movies.json').encode(
  vl.x().fieldQ('IMDB_Rating').bin(true),
  vl.y().count()
);
```

- Resulting Vega-Lite JSON:

```json
{
  "mark": "bar",
  "data": {"url": "data/movies.json"},
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

### 6. Tutorials
- Tutorials provided cover:
  - Beginner: "Let’s Make a Bar Chart"
  - Intermediate: "Axes & Legends", "Mapping Airport Connections"
  - Advanced: "How Vega Works"


## Supplementary Details
### Technical Specifications & Implementation Details

1. **Vega JSON Specification**:
   - Structure: {
       "width": <Number>,
       "height": <Number>,
       "data": [{ "name": "<dataName>", "url": "<dataURL>", "format": {...} }],
       "scales": [{ "name": "<scaleName>", "type": "linear|ordinal|...", "domain": <Array>, "range": <Array> }],
       "axes": [{ "scale": "<scaleName>", "orient": "bottom|left|..." }],
       "marks": [ { "type": "rect|line|symbol|...", "encode": {...} } ],
       "signals": [{ "name": "<signalName>", "value": <initialValue> }]
     }

2. **Vega View API**:
   - Constructor Options:
     - renderer: 'canvas' (default) or 'svg'
     - container: CSS selector string (e.g., '#view') or DOM element
     - hover: boolean to enable interactive hover
   - Example:

   ```javascript
   var view = new vega.View(vega.parse(spec), {
     renderer: 'canvas',
     container: '#view',
     hover: true
   });
   view.runAsync();
   ```

3. **CLI Configuration Options**:
   - `-s, --scale`: Default 1; scales output resolution
   - `-b, --base`: Specifies base directory path, effecting data and image loading
   - `-c, --config`: Absolute/relative path to a JSON/JS config file
   - `-f, --format`: Specifies number formatting locale file
   - `-t, --timeFormat`: Specifies data/time formatting locale file
   - `-l, --loglevel`: Set log output level; valid values: error, warn, info, debug
   - `--header` (for vg2svg): Includes XML header and DOCTYPE
   - `-seed`: Seed value for reproducible randomness

4. **Recommended Implementation Pattern**:
   - Parse specification with `vega.parse(spec)`
   - Instantiate the view with required options
   - Use asynchronous methods (e.g., `runAsync()`) to render
   - For interactive usage, use `vega-embed` to simplify loading and embedding visualizations.

5. **Best Practices**:
   - Serve local copies or use a stable CDN for production deployment
   - When using bundlers, import only necessary modules to reduce bundle size
   - For high-resolution outputs, adjust the `-s` scale factor accordingly
   - Use CLI flags to ensure logs and errors are captured for troubleshooting

6. **Troubleshooting Procedures**:
   - If rendering fails, verify the validity of the JSON spec with a linter or by running a minimal example
   - Use `console.error` and check stderr logs when using CLI utilities:
   ```bash
   vg2png spec.vg.json output.png 2> error.log
   ```
   - For CSP issues, switch to alternative expression evaluators that are CSP-compliant as documented.


## Reference Details
### Complete API Specifications & SDK Method Signatures

#### Vega Parser
- Method: `vega.parse(spec: Object): DataflowDescription`
  - Input: A complete Vega JSON specification object
  - Output: An internal dataflow description object
  - Exceptions: Throws error if spec is invalid JSON structure

#### Vega View
- Constructor: `new vega.View(runtime: DataflowDescription, options: { renderer: 'canvas' | 'svg', container: string | HTMLElement, hover: boolean })`
  - Parameters:
    - runtime: The parsed dataflow from `vega.parse(spec)`
    - options:
      - renderer (String): 'canvas' or 'svg' (default 'canvas')
      - container (String/HTMLElement): CSS selector or DOM element where the view is rendered
      - hover (Boolean): Enable or disable hover interactions (default false)
  - Methods:
    - `runAsync(): Promise<View>`: Renders the view asynchronously.
    - Additional methods (not fully listed here) include `signal()`, `width()`, `height()`, and export functions such as `toCanvas()`.

#### Vega-Embed Module
- Function: `vegaEmbed(element: string, specUrl: string, opt?: Object): Promise<EmbedResult>`
  - Parameters:
    - element (String): CSS selector for target container
    - specUrl (String): URL to the Vega or Vega-Lite JSON specification
    - opt (Object): Optional configuration object for embedding (e.g., default actions, renderer, theme)
  - Returns: A Promise that resolves to an object containing the view and embed options

##### Example Code:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    vegaEmbed('#view', 'https://vega.github.io/vega/examples/bar-chart.vg.json')
      .then(result => {
        console.log('View successfully rendered.');
      })
      .catch(error => console.error(error));
  </script>
</body>
```

#### Vega-Lite API
- SDK Method Chaining:

```javascript
// Creating a bar chart specification using Vega-Lite API
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

- Resulting JSON Structure:

```json
{
  "mark": "bar",
  "data": {"url": "data/movies.json"},
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

#### Command Line Interface (CLI) Tools
- Utilities: `vg2pdf`, `vg2png`, `vg2svg`
- Typical Syntax:
  - `vg2png [options] input_spec.json output.png`
  - Options include:
    - `-b, --base <String>`: Base directory path
    - `-s, --scale <Number>`: Scale factor (default: 1)
    - `-c, --config <String>`: Path to config file
    - `-f, --format <String>`: Number format locale file
    - `-t, --timeFormat <String>`: Time format locale file
    - `-l, --loglevel <String>`: Log level ('error', 'warn', 'info', 'debug')
    - `--header`: Include XML header in SVG output (vg2svg only)
    - `-seed <Number>`: Seed for random number generation

##### Example CLI Command:

```bash
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

This command renders a Vega specification to PNG, with error logs redirected to vg2png.log.

### Detailed Troubleshooting Procedures
- Validate JSON spec using online validators or built-in Vega error messages.
- Verify CDN availability if using remote script imports.
- For CLI tools, run with increased loglevel to debug:

```bash
vg2png -l debug test/specs-valid/bar.vg.json bar.png
```

- If encountering CSP issues, consult the alternative expression evaluator documentation to switch from the Function constructor.

---
All specifications, method signatures, configurations, and examples provided here are direct extracts from the Vega documentation as crawled on 2023-10-04. Developers can use these complete details directly without further modification.

## Original Source
Vega Documentation
https://vega.github.io/vega/docs/

## Digest of VEGA_DOC

# SPECIFICATION REFERENCE

A Vega specification is a JSON object defining an interactive visualization. It includes basic properties (e.g., width, height) and detailed definitions for:
- Data: Load, parse and define data sources.
- Scales: Mapping numeric or string data to visual properties such as coordinates, colors, sizes.
- Axes & Legends: Visualization components for the defined scales.
- Marks: Graphical elements like rectangles, lines, symbols, etc.
- Projections: Cartographic projections for geospatial data.
- Transforms: Data transformations including filter, sort, aggregate, and layout.
- Signals: Dynamic reactive variables for interaction and updates.
- Event Streams: Definitions for interactive input events.
- Expressions: Custom calculations over data and signals.
- Layout: Grid layout for grouped marks.
- Types: Reusable parameter type definitions.

Retrieval Date: 2023-10-04

# API REFERENCE

Vega provides a JavaScript runtime API to parse JSON specs into a reactive dataflow graph. Key components include:

## Parser
- Exact Method: `vega.parse(spec: Object): DataflowDescription`
- Transforms a Vega JSON specification into an internal dataflow representation.

## View
- Constructor: `new vega.View(runtime: DataflowDescription, options: {
    renderer: 'canvas' | 'svg',
    container: string | HTMLElement,
    hover: boolean
  })`
- Methods:
  - `runAsync(): Promise<View>`: Renders the view asynchronously.
  - Supports data streaming, exporting images, and debugging access.

## Vega-Embed Module
- Usage Example:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    vegaEmbed('#view', 'https://vega.github.io/vega/examples/bar-chart.vg.json');
  </script>
</body>
```

## Vega-Lite API
- Provides a concise JavaScript API wrapper for creating Vega-Lite JSON specs:

```javascript
vl.markBar().data('data/movies.json').encode(
  vl.x().fieldQ('IMDB_Rating').bin(true),
  vl.y().count()
);
```

Produces a Vega-Lite JSON specification:

```json
{
  "mark": "bar",
  "data": {"url": "data/movies.json"},
  "encoding": {
    "x": {
      "bin": true,
      "field": "IMDB_Rating",
      "type": "quantitative"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

# WEB DEPLOYMENT

## Importing Vega

Include Vega via CDN:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

For production, serve your own files or use jsDelivr:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

## Using Vega with D3 (Optimized Bundle)

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```

## Using with a Bundler

```javascript
import * as vega from "vega";
```

# COMMAND LINE UTILITIES

Vega CLI includes:
- `vg2pdf [options] [input_vega_json_file] [output_pdf_file]`
- `vg2png [options] [input_vega_json_file] [output_png_file]`
- `vg2svg [options] [input_vega_json_file] [output_svg_file]`

Optional parameters:
- `-b, --base [String]`: Set base directory (e.g., `-b http://host/data/`).
- `-s, --scale [Number]`: Resolution scale factor (default: 1).
- `-c, --config [String]`: Path to a Vega config JSON or JS file.
- `-f, --format [String]`: Number format locale file path.
- `-t, --timeFormat [String]`: Data/time format locale file path.
- `-l, --loglevel [String]`: Log level (`error`, `warn`, `info`, or `debug`).
- Additional flags: `--header` (SVG only), `-seed` for RNG, and `--help`.

Example:

```bash
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

# TUTORIALS

Tutorials include:
- "Let’s Make a Bar Chart": A beginner tutorial with interactive tooltips.
- "A Guide to Guides: Axes & Legends": Intermediate tutorial on customizing axes and legends.
- "Mapping Airport Connections": Advanced tutorial on mapping and data transformation.
- "How Vega Works": Advanced tutorial detailing the rendering pipeline.


## Attribution
- Source: Vega Documentation
- URL: https://vega.github.io/vega/docs/
- License: BSD-3-Clause
- Crawl Date: 2025-04-20T21:46:32.621Z
- Data Size: 2404416 bytes
- Links Found: 3940

## Retrieved
2025-04-20
