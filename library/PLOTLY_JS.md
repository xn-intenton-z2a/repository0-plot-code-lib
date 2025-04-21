# PLOTLY_JS

## Crawl Summary
Plotly.js uses d3.js and stack.gl for high-performance, declarative charting with a JSON configuration. The technical examples include a contour plot with explicit trace parameters (x, y, z, colorscale, zmin, zmax) and layout settings (title, axis properties, margins, annotations) as well as a scatter plot example reading CSV data with custom error bars and axis formatting. The main API function, Plotly.newPlot, accepts an HTML element, a data array, a layout object, and a configuration object.

## Normalised Extract
TABLE OF CONTENTS:
1. Overview
   - High-level charting library built on d3.js and stack.gl.
2. Code Examples
   - Contour Plot Example:
     * Data retrieval using d3.json
     * Trace configuration: x, y, z arrays; type 'contour'; fixed colorscale and reversescale settings; zmin and zmax values.
     * Layout configuration: title, xaxis and yaxis with showline, mirror, ticks inside; margin settings; annotation for credit.
   - Scatter Plot Example:
     * Data retrieval using d3.csv
     * Trace configuration: type 'scatter', mode 'lines', mapping CSV columns to x and y, line width, error_y setup with array, thickness, and width.
     * Layout configuration: yaxis title, xaxis settings (no grid, tickformat), margin adjustments.
3. Configuration Options
   - API method `Plotly.newPlot` signature and parameters: container element, data, layout, config with values like { showLink: false }.

DETAILED INFORMATION:
1. Contour Plot Example (Direct Usage):
   • d3.json callback fetches a JSON structure and uses figure.data[0] for data arrays.
   • Colorscale defined as an array of pairs: [0, "rgb(0, 0, 0)"], [0.3, "rgb(230, 0, 0)"], etc.
   • Layout includes detailed axis definitions and margin: {l:40, b:40, t:60}.

2. Scatter Plot Example (CSV-based):
   • Uses d3.csv to load data, mapping CSV keys to chart data arrays.
   • Sets line properties and error bars with exact numeric values (line width 1, error_thickness 0.5, width 0).
   • Xaxis formatted with tickformat '%B, %Y' and no grid in xaxis.

3. API & Configuration Options:
   • Plotly.newPlot element signature: container (HTMLElement), data (array of trace objects), layout (object with axis and margin configurations), and config (standard config options like showLink).


## Supplementary Details
SUPPLEMENTARY TECHNICAL SPECIFICATIONS:
- Contour Plot Technical Details:
  • Trace Object:
    - x: Array (obtained from figure.data[0].x)
    - y: Array (obtained from figure.data[0].y)
    - z: Array (obtained from figure.data[0].z)
    - type: 'contour'
    - autocolorscale: false
    - colorscale: [[0, "rgb(0, 0, 0)"], [0.3, "rgb(230, 0, 0)"], [0.6, "rgb(255,210, 0)"], [1, "rgb(255,255,255)"]]
    - reversescale: true
    - zmin: -2.5
    - zmax: 2.5
  • Layout Object:
    - title: { text: 'turbulence simulation' }
    - xaxis: { title: { text: 'radial direction' }, showline: true, mirror: 'allticks', ticks: 'inside' }
    - yaxis: { title: { text: 'vertical direction' }, showline: true, mirror: 'allticks', ticks: 'inside' }
    - margin: { l: 40, b: 40, t: 60 }
    - annotations: [{ showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper' }]
- Scatter Plot Technical Details:
  • Trace Object:
    - type: 'scatter'
    - mode: 'lines'
    - x: Mapped from CSV column 'Time'
    - y: Mapped from CSV column '10 Min Sampled Avg'
    - line: { width: 1 }
    - error_y: { array: Mapped from '10 Min Std Dev', thickness: 0.5, width: 0 }
  • Layout Object:
    - yaxis: { title: { text: 'Wind Speed' } }
    - xaxis: { showgrid: false, tickformat: '%B, %Y' }
    - margin: { l: 40, b: 10, r: 10, t: 20 }
- API Configuration Option for Interactivity:
  • Config Object passed to Plotly.newPlot: { showLink: false } to disable additional Plotly link rendering.
- Data Retrieval Methods:
  • Using d3.json for JSON data and d3.csv for CSV data, with callbacks processing the returned data directly into trace objects.


## Reference Details
API SPECIFICATIONS AND IMPLEMENTATION DETAILS:

1. Plotly.newPlot
   - Signature:
     Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config?: Object): Promise
   - Parameters:
     • container: The HTML element (e.g., document.getElementById('chart-container')) where the chart is rendered.
     • data: An array of trace objects. Each trace object must specify at least the 'type' and data arrays (e.g., x, y, z for contour charts).
     • layout: An object representing chart layout. Common attributes include:
         - title: { text: string }
         - xaxis and yaxis: {
             title: { text: string },
             showline: boolean,
             mirror: string (e.g., 'allticks'),
             ticks: string (e.g., 'inside'),
             showgrid: boolean (optional)
           }
         - margin: { l: number, b: number, t: number, r?: number }
         - annotations: Array<Object> with properties such as showarrow, text, x, y, xref, yref
     • config: Optional configuration object. Example configuration: { showLink: false } disables the display of a Plotly logo/link.
   - Return: A Promise that resolves when the plot is rendered.

2. d3.json and d3.csv Usage Example with Plotly:

// Contour Plot Example
 d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure) {
   // Define trace using data from the JSON figure
   var trace = {
     x: figure.data[0].x,
     y: figure.data[0].y,
     z: figure.data[0].z,
     type: 'contour',
     autocolorscale: false,
     colorscale: [
       [0, "rgb(0, 0, 0)"],
       [0.3, "rgb(230, 0, 0)"],
       [0.6, "rgb(255,210, 0)"],
       [1, "rgb(255,255,255)"]
     ],
     reversescale: true,
     zmin: -2.5,
     zmax: 2.5
   };
   var layout = {
     title: { text: 'turbulence simulation' },
     xaxis: {
       title: { text: 'radial direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     yaxis: {
       title: { text: 'vertical direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     margin: { l: 40, b: 40, t: 60 },
     annotations: [{
       showarrow: false,
       text: 'Credit: Daniel Carrera',
       x: 0, y: 0, xref: 'paper', yref: 'paper'
     }]
   };
   Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false });
 });

// Scatter Plot Example
 d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows) {
   var trace = {
     type: 'scatter',
     mode: 'lines',
     x: rows.map(function(row) { return row['Time']; }),
     y: rows.map(function(row) { return row['10 Min Sampled Avg']; }),
     line: { width: 1 },
     error_y: {
       array: rows.map(function(row) { return row['10 Min Std Dev']; }),
       thickness: 0.5,
       width: 0
     }
   };
   var layout = {
     yaxis: { title: { text: 'Wind Speed' } },
     xaxis: {
       showgrid: false,
       tickformat: '%B, %Y'
     },
     margin: { l: 40, b: 10, r: 10, t: 20 }
   };
   Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, { showLink: false });
 });

3. Best Practices & Troubleshooting:
   - Always validate the JSON/CSV input data structure before rendering.
   - Ensure that the HTML container exists and is correctly referenced by using document.getElementById or similar queries.
   - Check the browser console for errors related to configuration options or data types; mismatches in expected trace properties can cause rendering failures.
   - For performance optimization, consider using WebGL-based plots (e.g., scattergl) when dealing with large datasets.
   - Example command to check Plotly.js version:
       console.log(Plotly.version);
   - If encountering issues with rendering, try isolating the layout configuration in a separate JSON object and validate each property incrementally.


## Original Source
Plotly.js Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# PLOTLY.JS DOCUMENTATION DIGEST (Retrieved: 2023-10-25)

## Overview
Plotly.js is a high-level, declarative charting library built on top of d3.js and stack.gl. It supports over 40 chart types including 3D charts, statistical graphs, and SVG maps. It is free and open source with a complete set of JSON-based configuration options.

## Code Examples
### Contour Plot Example
```javascript
// Fetch JSON data and render a contour plot
 d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure){
   var trace = {
     x: figure.data[0].x,
     y: figure.data[0].y,
     z: figure.data[0].z,
     type: 'contour',
     autocolorscale: false,
     colorscale: [
       [0, "rgb(  0,  0,  0)"],
       [0.3, "rgb(230,  0,  0)"],
       [0.6, "rgb(255,210,  0)"],
       [1, "rgb(255,255,255)"]
     ],
     reversescale: true,
     zmax: 2.5,
     zmin: -2.5
   };
   var layout = {
     title: { text: 'turbulence simulation' },
     xaxis: {
       title: { text: 'radial direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     yaxis: {
       title: { text: 'vertical direction' },
       showline: true,
       mirror: 'allticks',
       ticks: 'inside'
     },
     margin: { l: 40, b: 40, t: 60 },
     annotations: [{
       showarrow: false,
       text: 'Credit: Daniel Carrera',
       x: 0, y: 0, xref: 'paper', yref: 'paper'
     }]
   };
   Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false });
 });
```

### Scatter Plot Example
```javascript
// Load CSV data to render a scatter plot with error bars
 d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows){
   var trace = {
     type: 'scatter',           // Chart type
     mode: 'lines',             // Connect data points with lines
     x: rows.map(function(row){ return row['Time']; }),
     y: rows.map(function(row){ return row['10 Min Sampled Avg']; }),
     line: { width: 1 },        // Line width setting
     error_y: {
       array: rows.map(function(row){ return row['10 Min Std Dev']; }),
       thickness: 0.5,          // Error bar thickness
       width: 0                 // Error bar cross width
     }
   };
   var layout = {
     yaxis: { title: { text: 'Wind Speed' } },
     xaxis: {
       showgrid: false,         // Disable grid lines
       tickformat: '%B, %Y'      // Date format e.g., "Month, Year"
     },
     margin: { l: 40, b: 10, r: 10, t: 20 }
   };
   Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, { showLink: false });
 });
```

## Configuration Options
- Chart rendering function: `Plotly.newPlot`
  - Signature: `Plotly.newPlot(container: HTMLElement, data: Array, layout: Object, config: Object): Promise`
  - Parameters include configurations such as margin settings (`{l: 40, b: 40, t: 60}`), axis configurations (titles, gridlines, tick formatting), and interactivity options (e.g. `{ showLink: false }`).

## Attribution
© 2025 Plotly. All rights reserved.

## Attribution
- Source: Plotly.js Documentation
- URL: https://plotly.com/javascript/
- License: MIT
- Crawl Date: 2025-04-21T09:47:48.248Z
- Data Size: 4254550 bytes
- Links Found: 13521

## Retrieved
2025-04-21
