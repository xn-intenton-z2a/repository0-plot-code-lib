# VEGA_DOCS

## Crawl Summary
The crawled Vega documentation provides a complete technical specification including JSON-based visualization grammar, detailed configuration options for marks, scales, axes, signals, and projections. The JavaScript API includes a View constructor with parameters (renderer, container, hover) along with usage examples showing how to embed or render visualizations on web pages. It details command line utilities for generating PDF, PNG, and SVG outputs, with all available options (base directory, scale, seed, config file, etc.). Additional specifics cover integration with D3 and bundler usage, providing direct SDK method signatures and complete code examples.

## Normalised Extract
## Table of Contents
1. Specification Reference
2. API Reference
3. Web Deployment
4. Command Line Utilities
5. Vega-Lite API

---

### 1. Specification Reference
- Vega specifications are JSON objects with properties:
  - width, height
  - data: { url, format }
  - scales: mapping from data values to visual encoding
  - axes & legends: visual representation of scales
  - marks: definitions for graphical elements
  - signals: dynamic variables for interactivity
  - projections: geographical mapping

### 2. API Reference
- **View API Constructor:**

  Signature:
  `new vega.View(runtime: VegaRuntime, options: { renderer: string, container: string | HTMLElement, hover: boolean })`

- **Methods:**
  - `view.runAsync(): Promise<void>`
  - `vega.parse(spec: Object): VegaRuntime`

- **Example:**

```javascript
var view;
fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
  .then(res => res.json())
  .then(spec => {
    view = new vega.View(vega.parse(spec), {
      renderer: 'canvas',
      container: '#view',
      hover: true
    });
    return view.runAsync();
  });
```

### 3. Web Deployment
- **Importing via CDN:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

- **Using with D3:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```

- **Bundler Import:**

```javascript
import * as vega from "vega";
```

### 4. Command Line Utilities
- **Utilities:** vg2pdf, vg2png, vg2svg
- **Options:**
  - `-b, --base <String>`: Base directory (e.g., `http://host/data/`)
  - `-h, --header`: Include XML header in SVG
  - `-s, --scale <Number>`: Resolution scale, default is 1
  - `-seed <Number>`: Seed for random number generation
  - `-c, --config <String>`: Vega config file
  - `-f, --format <String>`: Number format locale file
  - `-t, --timeFormat <String>`: Data/time format locale file
  - `-l, --loglevel <String>`: Log level (error, warn, info, debug)

- **Example Command:**

```
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

### 5. Vega-Lite API
- **Usage Example:**

```javascript
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

- **Produced JSON:**

```json
{
  "mark": "bar",
  "data": { "url": "data/movies.json" },
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

## Supplementary Details
### Detailed Technical Specifications

1. **Vega Specification JSON Object:**
   - **Properties:**
     - `width`: Number (e.g., 500)
     - `height`: Number (e.g., 300)
     - `data`: Object with properties such as `url` (string), `format` (object specifying type, parse, etc.)
     - `scales`: Array of objects; each scale defines a mapping with keys like `name`, `type`, `domain`, and `range`.
     - `axes` and `legends`: Arrays defining visual configuration with properties like `orient`, `title`, `format`.
     - `marks`: Array where each object represents a graphical mark with type (e.g., `rect`, `line`, `symbol`) and associated encoding channels.
     - `signals`: Array with objects containing key `name` (string) and `init` (initial value), among others.
     - `projections`: Object mapping geographical coordinates using properties like `type` and `scale`.

2. **View API Implementation:**
   - **Method Details:**
     - `vega.parse(spec: object): VegaRuntime` converts a Vega spec into a runtime representation.
     - `new vega.View(runtime, options)`: Creates an interactive view; options include:
       - `renderer`: 'canvas' | 'svg'
       - `container`: CSS selector string or DOM element
       - `hover`: boolean for enabling hover effects.
   - **Return Values:** Promises from `view.runAsync()` resolve when rendering is complete.

3. **Command Line Utilities Options Detailed:**
   - `-b, --base`: Sets base directory; must be a valid URL or file path.
   - `-s, --scale`: Expects a numeric value; affects coordinate resolution (e.g., 2 for double resolution).
   - `-seed`: Expects an integer; replaces default Math.random.
   - `-c, --config`: String leading to a config file in JSON/JS format that overrides default config settings.
   - Logging: `-l, --loglevel` accepts 'error', 'warn', 'info', or 'debug'.

4. **Build and Test Process for Vega-Lite API:**
   - Clone repository via `git clone https://github.com/vega/vega-lite-api`.
   - Install dependencies: `yarn`
   - Build API: `yarn build`
   - Run test suite: `yarn test`

5. **Best Practices:**
   - Use CDN for production only if you have reliable caching or serve your own files.
   - Validate JSON specifications with provided schemas to prevent runtime errors.
   - When using command line tools, redirect stderr to log files to capture detailed error messages.

6. **Troubleshooting Procedures:**
   - **Rendering Issues:**
     - Command: `vg2png input.json output.png 2> error.log`
     - Expected Output: PNG file generated; check error.log for missing data or parsing errors.
   - **JavaScript API Failures:**
     - Use browser console to log errors when running `view.runAsync()`.
     - Verify that the container element exists and is empty prior to initialization.
   - **Module Import Errors:**
     - Ensure correct bundler configuration when using `import * as vega from "vega";`.

Refer to the examples above for complete implementation patterns.

## Reference Details
### Complete API Specifications and Examples

#### Vega View API

**Method Signature:**
```
new vega.View(runtime: VegaRuntime, options: {
  renderer: 'canvas' | 'svg',
  container: string | HTMLElement,
  hover: boolean
}): ViewInstance
```

**Key Methods:**
- `view.runAsync(): Promise<void>`: Renders the view asynchronously.
- `vega.parse(spec: object): VegaRuntime`: Parses the JSON specification into a runtime dataflow graph.

**Example Usage:**

```javascript
// Fetch specification and render view
fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
  .then(res => res.json())
  .then(spec => {
    const runtime = vega.parse(spec);
    const view = new vega.View(runtime, {
      renderer: 'canvas',
      container: '#view',
      hover: true
    });
    view.runAsync()
      .then(() => console.log('Rendered successfully'))
      .catch(err => console.error('Render failed:', err));
  });
```

#### Vega-Embed Module

**Function Signature:**
```
vegaEmbed(el: string | HTMLElement, specUrl: string, options?: object): Promise<{ spec: object, view: ViewInstance }>
```

**Usage Example:**

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
        // result.spec contains the Vega spec
        // result.view is the Vega view instance
        console.log('Embed successful');
      })
      .catch(console.error);
  </script>
</body>
```

#### Command Line Utilities (vg2pdf, vg2png, vg2svg)

**Usage:**
```
vg2png [options] input_vega_json_file output_png_file
```

**Available Options:**
- `-b, --base <String>`: Base directory (e.g., `http://host/data/` or a local path).
- `-h, --header`: Include XML header (SVG only).
- `-s, --scale <Number>`: Resolution scale factor. Default: 1.
- `-seed <Number>`: Seed for random number generation.
- `-c, --config <String>`: Path to configuration file (JSON or JS).
- `-f, --format <String>`: Path to number format locale file.
- `-t, --timeFormat <String>`: Path to time format locale file.
- `-l, --loglevel <String>`: Logging level (error, warn, info, debug).

**Example Command:**
```
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

#### Vega-Lite API

**JavaScript API Example:**

```javascript
// Import and use Vega-Lite API to create a bar chart specification
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

**Expected JSON Output:**

```json
{
  "mark": "bar",
  "data": { "url": "data/movies.json" },
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

---

These specifications, method signatures, code examples, configuration options, and troubleshooting steps are intended to provide developers with an immediately applicable guide for using Vega and Vega-Lite APIs.

## Original Source
Vega Documentation
https://vega.github.io/vega/docs/

## Digest of VEGA_DOCS

# Vega Documentation Digest

**Retrieved Date:** 2023-10-30

## Specification Reference

A Vega specification is a JSON object that defines an interactive visualization. It includes:

- **Basic Properties:** width, height, metadata.
- **Data:** Definitions for data loading, parsing, and transformations.
- **Scales:** Mapping of data values (numbers, strings) to visual properties (coordinates, colors, sizes).
- **Axes & Legends:** Configuration for visualizing scales.
- **Marks:** Graphical marks (rectangles, lines, symbols) to represent data.
- **Signals:** Dynamic variables for interactions.
- **Projections:** Mapping of geographic coordinates (longitude, latitude) to visual space.

## API Reference

Vega provides a JavaScript runtime API that parses JSON specifications and creates interactive views. Key components include:

### View API

**Constructor:**

```
new vega.View(runtime: VegaRuntime, options: {
  renderer: string,    // 'canvas' or 'svg'
  container: string | HTMLElement,  // DOM container selector or object
  hover: boolean       // enable hover processing
})
```

**Example Code:**

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    var view;
    fetch('https://vega.github.io/vega/examples/bar-chart.vg.json')
      .then(res => res.json())
      .then(spec => render(spec))
      .catch(err => console.error(err));

    function render(spec) {
      view = new vega.View(vega.parse(spec), {
        renderer: 'canvas',  // renderer can be 'canvas' or 'svg'
        container: '#view',   // DOM container for the view
        hover: true         // enable hover processing
      });
      return view.runAsync();
    }
  </script>
</body>
```

### Vega-Embed Module

**Usage Example:**

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

## Web Deployment

### Importing Vega JavaScript

Direct import via CDN:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
</head>
```

Or using a bundler:

```javascript
import * as vega from "vega";
```

### Using Vega with D3

If using d3 independently, load d3 first, then a smaller Vega bundle:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/topojson-client@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5/build/vega-core.min.js"></script>
</head>
```

## Command Line Utilities (vega-cli)

Vega offers command line utilities: vg2pdf, vg2png, vg2svg.

### Usage Syntax:

```
vg2pdf [options] [input_vega_json_file] [output_pdf_file]
vg2png [options] [input_vega_json_file] [output_png_file]
vg2svg [options] [input_vega_json_file] [output_svg_file]
```

### Options:

- `-b, --base [String]` : Base directory for data/image loading. Example: `-b http://host/data/`.
- `-h, --header` : (Flag) Include XML header and DOCTYPE in SVG output (vg2svg only).
- `-s, --scale [Number]` : Resolution scale factor. Default is 1.
- `-seed [Number]` : Seed for random number generation.
- `-c, --config [String]` : Provide a Vega config object file path (JSON or .js).
- `-f, --format [String]` : Set the number format locale, file path for JSON or .js.
- `-t, --timeFormat [String]` : Set data/time format locale, file path for JSON or .js.
- `-l, --loglevel [String]` : Logging level (error, warn, info, debug). Default is warn.
- `--help` : Show usage help.

### Example Command:

```
vg2png test/specs-valid/bar.vg.json bar.png 2> vg2png.log
```

## Vega-Lite API

Vega-Lite provides a high-level JSON syntax for visualizations. Example usage in JavaScript:

```javascript
// Creating a bar mark with Vega-Lite API
vl.markBar()
  .data('data/movies.json')
  .encode(
    vl.x().fieldQ('IMDB_Rating').bin(true),
    vl.y().count()
  );
```

Produces the JSON specification:

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

## Attribution

- Data Size: 13670356 bytes
- Links Found: 11295
- Source: Vega Documentation from https://vega.github.io/vega/docs/


## Attribution
- Source: Vega Documentation
- URL: https://vega.github.io/vega/docs/
- License: BSD-3-Clause
- Crawl Date: 2025-04-20T18:25:27.721Z
- Data Size: 13670356 bytes
- Links Found: 11295

## Retrieved
2025-04-20
