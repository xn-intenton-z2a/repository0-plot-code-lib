# VEGA_LITE

## Crawl Summary
Vega-Lite provides a high-level JSON grammar for interactive graphics. It defines exact specifications for view properties (title, dimensions), data sources formats, a rich set of transforms (aggregate, bin, calculate, etc.), mark definitions and configurations, detailed encoding channels, projection settings, view composition rules, parameter binding for interactivity, global configuration, and specific property types. The documentation includes complete API method signatures and configuration options for immediate implementation.

## Normalised Extract
TABLE OF CONTENTS:
1. Vega-Lite Overview
2. View Specification
   - Title Properties: text, align, anchor, font, fontSize
   - Dimensions: width, height with responsive options
3. Data / Datasets
   - Data sources: inline, URL, generator; format options: json, csv, tsv
4. Transform Operations
   - Aggregate: fields, ops (sum, avg, count, min, max, median), groupby
   - Bin: parameters (maxbins, anchor, base, extent)
   - Calculate: expression and output field
   - Additional: Density, Extent, Filter, Flatten, Fold, Impute, Join Aggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, Time Unit (with UTC & parameters), Window
5. Mark Definitions
   - Supported Marks: Arc, Area, Bar, Box Plot, Circle, Error Band, Error Bar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail
   - Mark Config: color, size, opacity, style
6. Encoding
   - Channels: positioning, aggregate, conditional, datum, header, legend, scale, stack, sort, time unit
7. Projection
   - Geographic projections with type, scale, center, rotation
8. View Composition
   - Facet, Layer, Concat, Repeat with configuration and resolution
9. Parameter
   - Definitions: value, expr, bind, select
10. Global Config
    - Options for Format, Guide, Mark, Style, Scale, Projection, Selection, Title, Locale
11. Tooltip & Invalid Data
    - Tooltip channel configuration, disable options, invalid data handling

Detailed Items:
- View Specification: Use JSON objects to define properties. Example Title object: { text: 'My Chart', align: 'center', anchor: 'start', font: 'Helvetica', fontSize: 16 }
- Aggregate Transform: { "aggregate": [{ "op": "sum", "field": "value", "as": "total_value" }], "groupby": ["category"] }
- Bin Transform: { "bin": { "maxbins": 10, "anchor": 0, "base": 10 }, "field": "amount", "as": "binned_amount" }
- Vega-Embed API (used to render specs): Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: object) => Promise<{view: object, spec: object}>.
- Configuration Options: Global config objects allow setting default mark colors, fonts, axis styles, and locale settings.
- Best Practices: Validate JSON schema, use pre-calculated aggregates for performance, and bind parameters for interactive charts.
- Troubleshooting: Check compiler errors from Vega’s compiler output, use console logs to view spec conversion errors, and verify data parsing by inspecting network responses.

## Supplementary Details
Exact Parameter Values & Configuration:
- Title Object: { text: 'Chart Title', align: 'center', anchor: 'start', font: 'Arial', fontSize: 18, offset: 10 }
- Data Source: For JSON data, specify { url: 'data.json', format: { type: 'json', property: 'values' } }.
- Aggregate Transform: Parameters: op must be one of [sum, average, count, min, max, median]; groupby is an array of field names; example: { aggregate: [{ op: 'mean', field: 'score', as: 'mean_score' }], groupby: ['group'] }.
- Bin Transform Defaults: maxbins = 10, anchor = 0, base = 10; can be overridden in the spec.
- Vega-Embed Options: { actions: false, mode: 'vega-lite', renderer: 'svg' } with default renderer 'canvas'.
- SDK Method Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: { actions?: boolean, renderer?: 'canvas'|'svg', defaultStyle?: boolean, width?: number, height?: number }) returns Promise with view and spec objects.
- Implementation Steps: 1. Create a valid Vega-Lite JSON spec. 2. Embed with vegaEmbed. 3. Validate rendered output in browser console.
- Troubleshooting: Use command line tool: npm run build; inspect output. For API errors, run: console.error('Vega-Lite error:', error) to capture details from the promise rejection.

## Reference Details
API Specifications & Code Examples:
1. Vega-Embed Function:
   Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: { actions?: boolean, renderer?: 'canvas'|'svg', defaultStyle?: boolean, width?: number, height?: number }) : Promise<{ view: any, spec: any }>
   Example:
   // Initialize chart
   const container = '#vis';
   const spec = {
     width: 400,
     height: 300,
     mark: 'bar',
     data: { url: 'data.json' },
     encoding: {
       x: { field: 'category', type: 'ordinal' },
       y: { field: 'value', type: 'quantitative' }
     }
   };
   vegaEmbed(container, spec, { actions: false, renderer: 'svg' }).then(result => {
     // Chart rendered successfully
   }).catch(error => {
     console.error('Vega-Embed error:', error);
   });

2. Transform Operations:
   Aggregate Transform:
   {
     aggregate: [{ op: 'sum', field: 'sales', as: 'total_sales' }],
     groupby: ['region']
   }
   Bin Transform:
   {
     bin: { maxbins: 10, anchor: 0, base: 10 },
     field: 'price',
     as: 'binned_price'
   }

3. Mark Configuration:
   Bar Mark Example:
   {
     mark: 'bar',
     encoding: {
       x: { field: 'category', type: 'ordinal' },
       y: { field: 'amount', type: 'quantitative' }
     },
     config: {
       mark: { color: 'steelblue', opacity: 0.8 }
     }
   }

4. Configuration Options:
   Global Config Example:
   {
     config: {
       axis: { labelFont: 'Helvetica', labelFontSize: 12, titleFont: 'Helvetica-Bold', titleFontSize: 14 },
       title: { font: 'Arial', fontSize: 16, anchor: 'middle' },
       legend: { labelFont: 'Arial', labelFontSize: 12 }
     }
   }

5. Troubleshooting Procedures:
   - Command: npm run build
     Expected Output: Successful compilation with no errors related to schema validation.
   - Debug: Check the browser console for errors during vegaEmbed execution. Example error: 'Invalid specification: missing data property'.
   - Verification: Use JSON schema validators to compare the spec with Vega-Lite schema at https://vega.github.io/schema/vega-lite/v5.json

6. Best Practices:
   - Always validate data types in encoding fields.
   - Use pre-aggregated data for large datasets where possible.
   - Bind parameters for interactive charts with clear defaults in the specification.

Refer to official documentation examples for complete end-to-end implementation patterns.

## Information Dense Extract
VEGA-LITE; JSON grammar for interactive graphics; View Spec: { title: { text, align, anchor, font, fontSize }, width, height }; Data: inline, URL with format:{ type, property }; Transforms: Aggregate (op: sum, avg, count, groupby), Bin (maxbins, anchor, base), Calculate (expression -> output), plus Density, Extent, Filter, Flatten, Fold, Impute, JoinAggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, TimeUnit (UTC), Window; Mark types: Arc, Area, Bar, BoxPlot, Circle, ErrorBand, ErrorBar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail; Encoding: x, y, color, size, shape, opacity, tooltip; Projection: type, scale, center, rotation; Composition: Facet, Layer, Concat, Repeat; Parameter: value, expr, bind, select; Global Config: axis, title, legend fonts and sizes; API: vegaEmbed(container, spec, opt) => Promise<{view,spec}>; Code examples and troubleshooting via npm run build and JSON schema validation.

## Sanitised Extract
TABLE OF CONTENTS:
1. Vega-Lite Overview
2. View Specification
   - Title Properties: text, align, anchor, font, fontSize
   - Dimensions: width, height with responsive options
3. Data / Datasets
   - Data sources: inline, URL, generator; format options: json, csv, tsv
4. Transform Operations
   - Aggregate: fields, ops (sum, avg, count, min, max, median), groupby
   - Bin: parameters (maxbins, anchor, base, extent)
   - Calculate: expression and output field
   - Additional: Density, Extent, Filter, Flatten, Fold, Impute, Join Aggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, Time Unit (with UTC & parameters), Window
5. Mark Definitions
   - Supported Marks: Arc, Area, Bar, Box Plot, Circle, Error Band, Error Bar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail
   - Mark Config: color, size, opacity, style
6. Encoding
   - Channels: positioning, aggregate, conditional, datum, header, legend, scale, stack, sort, time unit
7. Projection
   - Geographic projections with type, scale, center, rotation
8. View Composition
   - Facet, Layer, Concat, Repeat with configuration and resolution
9. Parameter
   - Definitions: value, expr, bind, select
10. Global Config
    - Options for Format, Guide, Mark, Style, Scale, Projection, Selection, Title, Locale
11. Tooltip & Invalid Data
    - Tooltip channel configuration, disable options, invalid data handling

Detailed Items:
- View Specification: Use JSON objects to define properties. Example Title object: { text: 'My Chart', align: 'center', anchor: 'start', font: 'Helvetica', fontSize: 16 }
- Aggregate Transform: { 'aggregate': [{ 'op': 'sum', 'field': 'value', 'as': 'total_value' }], 'groupby': ['category'] }
- Bin Transform: { 'bin': { 'maxbins': 10, 'anchor': 0, 'base': 10 }, 'field': 'amount', 'as': 'binned_amount' }
- Vega-Embed API (used to render specs): Signature: vegaEmbed(container: string|HTMLElement, spec: object, opt?: object) => Promise<{view: object, spec: object}>.
- Configuration Options: Global config objects allow setting default mark colors, fonts, axis styles, and locale settings.
- Best Practices: Validate JSON schema, use pre-calculated aggregates for performance, and bind parameters for interactive charts.
- Troubleshooting: Check compiler errors from Vegas compiler output, use console logs to view spec conversion errors, and verify data parsing by inspecting network responses.

## Original Source
Vega-Lite Documentation
https://vega.github.io/vega-lite/docs/

## Digest of VEGA_LITE

# Overview
Retrieved on: 2023-10-06

Vega-Lite is a high-level declarative grammar for interactive graphics that uses a concise JSON syntax to specify multi-view visualizations. It compiles Vega-Lite specifications into lower-level Vega specifications for rendering.

# View Specification
- Title: The specification supports a Title Properties Object with parameters such as text, align, anchor, font, fontSize.
- Width/Height: Supports both fixed values and responsive sizing for single-view, layered, and multi-view displays.

# Data / Datasets
- Supports various data sources including inline arrays, URLs, and data generators.
- Data format definitions include type (json, csv, tsv) and parsing options.

# Transform
Provides various transformation operations:
- Aggregate: Parameters include fields, ops (sum, average, count, min, max, median), groupby arrays.
- Bin: Parameters include maxbins (default 10), anchor, base, and extent for binning numeric data.
- Calculate: Expression-based transformation with an output field.
- Additional transforms: Density, Extent, Filter, Flatten, Fold, Impute, Join Aggregate, Loess, Lookup, Pivot, Quantile, Regression, Sample, Stack, Time Unit (with UTC option and specific parameters), and Window with operation references.

# Mark
Defines the graphical representation of data. Supported mark types include:
- Arc, Area, Bar, Box Plot, Circle, Error Band, Error Bar, Geoshape, Image, Line, Point, Rect, Rule, Square, Text, Tick, Trail

Each mark type supports a Mark Definition Object with properties such as color, size, opacity, and styling configuration using a dedicated Mark Config object.

# Encoding
Specifies how data fields are mapped to visual properties. Key elements:
- Channels: Position (x, y), Color, Size, Shape, Opacity, Tooltip, and Text.
- Detailed encoding definitions for aggregate fields, conditional encodings, datum, header configurations, legend formats, scales (with continuous/discrete options), stacking, sorting, and time unit transformations.

# Projection
Supports geographic projection configuration where properties like type, projection scale, center, and rotation can be specified for mapping geo-data.

# View Composition
Provides layouts for Facet, Layer, Concat, and Repeat visualizations along with resolution strategies and configuration objects for consistent styling.

# Parameter
Defines interactive parameters with properties:
- Value (default), Expr (expression-based), Bind (for interactive controls), and Select mechanisms for user inputs.

# Config
Global configuration options to customize:
- Format, Guide, Mark, Style, Scale, Projection, Selection, Title, and Locale configuration.

# Property Types
Includes specialized property types like DateTime, Gradient (linear and radial with stops) and Predicate compositions for complex filtering.

# Tooltip
Configurable tooltip options that enable showing data information on hover. Includes options to disable tooltips or use specialized plugins.

# Invalid Data
Handling of invalid data with options such as mark invalid mode and scale output adjustments.

# Attribution & Data Size
Data Size obtained during crawling: 13752109 bytes


## Attribution
- Source: Vega-Lite Documentation
- URL: https://vega.github.io/vega-lite/docs/
- License: BSD License
- Crawl Date: 2025-04-28T13:55:18.616Z
- Data Size: 13752109 bytes
- Links Found: 15027

## Retrieved
2025-04-28
