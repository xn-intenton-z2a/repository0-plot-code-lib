# PLOTLY_JS

## Crawl Summary
The crawled content provides detailed navigation of Plotly.js features, including various chart types (e.g., contour, scatter, error bars, 3D charts) and configuration options. It displays code examples with precise trace and layout objects for building charts. Key technical points include the use of declarative JSON for chart configuration, options like colorscale customization, axis formatting (showline, ticks, grid settings), margin settings, annotations, and use of high-performance rendering techniques such as WebGL for 3D charts and scattergl for faster rendering of scatter plots.

## Normalised Extract
## Table of Contents
1. Chart Construction
   - Trace Object Specifications
   - Layout Configuration Options
2. Code Examples
   - Contour Plot Example
   - Scatter Plot Example with Error Bars
3. Performance Optimization
   - SVG vs. WebGL and scattergl usage

## 1. Chart Construction
### Trace Object Specifications
- Properties include:
  - x, y, (and optionally z): data arrays assigned directly from source data.
  - type: specifies chart type (e.g., 'contour', 'scatter').
  - autocolorscale: boolean flag to manage automatic colorscale.
  - colorscale: an array of tuples defining numerical intervals and corresponding RGB strings.
  - reversescale: boolean to invert the colorscale order.
  - zmin and zmax: numerical bounds for the z-axis in contour charts.

### Layout Configuration Options
- Title configuration: provided as a nested text property in title object.
- Axis configuration: each axis can include:
  - title: text attribute under a nested object.
  - showline: boolean
  - mirror: option such as 'allticks'
  - ticks: position such as 'inside'
- Margin settings: object with keys l, b, t, r to set left, bottom, top, and right margins.
- Annotations: array of objects including properties such as showarrow, text, and coordinate references (xref, yref).

## 2. Code Examples
### Contour Plot Example
Direct usage of d3.json to fetch data and construct a contour plot with explicit trace and layout configuration. Uses Plotly.newPlot with a configuration object disabling the showLink.

### Scatter Plot Example with Error Bars
Demonstrates use of d3.csv to load tabular data. The trace is built with x, y arrays and an error_y object. Layout settings include axis titles and custom date formats (tickformat). 

## 3. Performance Optimization
- Uses SVG rendering for most graphs ensuring browser compatibility and high-quality vector output.
- Implements WebGL rendering for all 3D charts to leverage GPU acceleration.
- Introduces scattergl for scatter plots to render significantly faster compared to SVG counterparts.

## Supplementary Details
### Detailed Technical Specifications and Implementation Steps
1. Trace Object Configuration:
   - For a contour plot:
     • x, y, z: Must be arrays of numbers retrieved from JSON.
     • type: 'contour' (string).
     • autocolorscale: false (boolean).
     • colorscale: Array of arrays, e.g., [[0, 'rgb(0,0,0)'], [0.3, 'rgb(230,0,0)'], [0.6, 'rgb(255,210,0)'], [1, 'rgb(255,255,255)']].
     • reversescale: true (boolean).
     • zmax and zmin: Numeric values (2.5 and -2.5).

2. Layout Configuration:
   - title: Object with text key (e.g., 'turbulence simulation').
   - xaxis and yaxis:
     • title: Object with text (e.g., 'radial direction', 'vertical direction').
     • showline: true.
     • mirror: 'allticks'.
     • ticks: 'inside'.
   - Margin: Object with numeric values (e.g., {l: 40, b: 40, t: 60}).
   - Annotations: Array containing objects with properties such as showarrow (false), text, and coordinate mappings (x, y, xref, yref set to 'paper').

3. Code Implementation Pattern:
   - Fetch data using d3.json or d3.csv.
   - Map data to arrays directly in the trace definition.
   - Define layout parameters explicitly with nested JSON objects.
   - Call Plotly.newPlot with: 
     • The target DOM element (obtained using document.getElementById).
     • Array of trace objects.
     • Layout object.
     • Configuration object with additional settings (e.g., {showLink: false}).

4. Configuration Options:
   - showLine, mirror, ticks: controls visual appearance of axes.
   - colorscale: Accepts a precise array structure for mapping data scale to colors.
   - Error bars configuration: Uses 'error_y' with parameters array, thickness and width.

5. Performance Best Practices:
   - Use scattergl for rendering scatter plots when dealing with large datasets.
   - Use WebGL for 3D charts to improve interactivity and speed.
   - Maintain declarative JSON structures to ensure quick updates and re-render in Plotly.react.

6. Troubleshooting Procedures:
   - Verify data array consistency (ensure equal length for x, y, and z).
   - Check DOM element existence before calling Plotly.newPlot to avoid null reference errors.
   - Use browser developer tools to inspect network calls for data fetching errors.
   - Inspect console for JavaScript errors detailing misconfigurations in trace or layout objects.

## Reference Details
### Complete API Specifications and SDK Method Signatures

#### Plotly.newPlot
Signature:
  Plotly.newPlot(
    graphDiv: HTMLElement, 
    data: Array<Object>, 
    layout?: Object, 
    config?: Object
  ) → Promise

Parameters:
- graphDiv: The HTML element or the id of the element where the plot will be rendered.
- data: An array of trace objects. Each trace object must include necessary keys (e.g., x, y for scatter; x, y, z for 3D and contour plots), and type as a string specifying chart type.
- layout (Optional): A JSON object containing layout configuration including title, margin, axis properties (e.g., xaxis, yaxis) and annotations.
- config (Optional): A JSON object for additional configuration such as static image export, display mode bar options (e.g., {showLink: false}).

Return Type:
- Returns a Promise that resolves when the chart is rendered.

#### Code Example with Detailed Comments
```javascript
// Example: Rendering a Contour Plot
// Step 1: Fetch JSON data with d3.json
// Input: URL to JSON file containing figure object with data

d3.json('https://plotly.com/~DanielCarrera/13.json', function(figure) {
  // Step 2: Define the trace using data from the fetched figure
  var trace = {
    x: figure.data[0].x,      // Array of x-coordinate data
    y: figure.data[0].y,      // Array of y-coordinate data
    z: figure.data[0].z,      // Array of z-coordinate data
    type: 'contour',         // Chart type
    autocolorscale: false,   // Disable automatic color scaling
    colorscale: [
      [0, 'rgb(0,0,0)'],
      [0.3, 'rgb(230,0,0)'],
      [0.6, 'rgb(255,210,0)'],
      [1, 'rgb(255,255,255)']
    ],
    reversescale: true,      // Reverse the colorscale
    zmax: 2.5,               // Maximum z value
    zmin: -2.5               // Minimum z value
  };

  // Step 3: Define layout settings for the plot
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
      x: 0, y: 0,
      xref: 'paper', yref: 'paper'
    }]
  };

  // Step 4: Render the plot by targeting a specific DOM element
  Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, { showLink: false })
    .then(function() {
      console.log('Contour plot rendered successfully.');
    })
    .catch(function(error) {
      console.error('Error rendering contour plot:', error);
    });
});
```

#### Additional Configuration Options and Best Practices
- Setting the margin object correctly ensures the chart is correctly spaced within the container: { l: 40, b: 40, t: 60 }.
- Always validate the existence of the targeted DOM node to avoid null errors.
- For high-performance rendering, especially with large datasets, consider using scattergl or WebGL based charts.

#### Troubleshooting Commands
- Command to check network responses (using Chrome DevTools Console):
  > Network tab → Inspect the request to JSON or CSV source
- Command to enable verbose logging in Plotly (if applicable):
  > Plotly.setPlotConfig({ logging: true });
- Expected outputs: Successful render message in console and properly formatted chart in the designated DOM element.


## Original Source
Plotly.js Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# Plotly.js Documentation
Retrieved Date: 2023-10-27

## Overview
Plotly.js is a high-level, declarative charting library built on top of d3.js and stack.gl. It supports over 40 chart types including 3D charts, statistical graphs, and SVG maps. The library is free, open source, and customizable in every detail via declarative JSON objects.

## Code Examples

### Contour Plot Example
```javascript
// Fetch data and construct a contour plot
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

### Scatter Plot with Error Bars
```javascript
// Load CSV data and create a scatter plot with error bars
d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows){
  var trace = {
    type: 'scatter',          // Chart type
    mode: 'lines',            // Connect data points with lines
    x: rows.map(function(row){ return row['Time']; }),
    y: rows.map(function(row){ return row['10 Min Sampled Avg']; }),
    line: { width: 1 },       // Line width
    error_y: {
      array: rows.map(function(row){ return row['10 Min Std Dev']; }),
      thickness: 0.5,         // Error bar thickness
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
```

## Attribution
Data Size during crawl: 4163742 bytes

---


## Attribution
- Source: Plotly.js Documentation
- URL: https://plotly.com/javascript/
- License: MIT
- Crawl Date: 2025-04-20T23:46:47.999Z
- Data Size: 4163742 bytes
- Links Found: 12951

## Retrieved
2025-04-20
