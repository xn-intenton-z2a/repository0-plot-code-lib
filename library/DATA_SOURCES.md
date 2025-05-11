# DATA_SOURCES

## Crawl Summary
data property accepts url, values, format, transform. format.type: json|csv|tsv|topojson (default json). format.parse: auto|string|number|boolean|date|{field:type} (default auto). format.property for nested JSON, format.feature for topojson. Sequence generator via transform.sequence with start, stop, step.

## Normalised Extract
Table of Contents
1 Data Source Definition
2 Inline Data Values
3 URL Data Source
4 Data Format Parsing
5 Data Generators

Data Source Definition
name: string, optional identifies dataset
url: string, HTTP(S) or file path, required if values absent
values: object array for inline data
format:
  type: json|csv|tsv|topojson, default json
  parse: auto|string|number|boolean|date or {field:type}, default auto
  property: nested JSON key, no default
  feature: topojson feature key, default features
transform:
  sequence: {start:number; stop:number; step?:number}

Inline Data Values
values: array of objects, define data inline in spec

URL Data Source
url: path or remote URL string; supports caching per browser

Data Format Parsing
parse: auto infers types; explicit mapping overrides; use parse for dates/numbers
property: dot-separated path to nested arrays
feature: key for topojson features array

data.example: {url:'data.csv',format:{type:'csv',parse:{date:'date',value:'number'}}}

Data Generators
sequence: {start:1,stop:100,step:10} produces values 1,11,...,91

## Supplementary Details
Default parse for csv/tsv is auto, infers numeric and date fields; explicit parse mapping improves performance. Use format.property to extract nested arrays: specify 'property':'records.items'. For topojson, set type:'topojson' and feature:'<featureName>'. Implementation steps: 1) Define spec.data with url or values. 2) (Optional) Add spec.data.format with type, parse, property, feature. 3) Add spec.transform.sequence if synthetic data required. 4) Call vegaEmbed(container, spec, {renderer:'canvas'|'svg'}).

Example:
format: {type:'csv', parse:{timestamp:'date', score:'number'}}

Best Practices:
- Predefine parse mapping for large datasets to avoid type-guess overhead.
- Use sequence transform for testing and prototyping without external files.
- Reference datasets by name for reuse in multi-view specs.

Performance Tips:
- Leverage browser HTTP caching for remote data via proper headers.
- Filter or aggregate data in transform to minimize payload.


## Reference Details
TypeScript Interfaces:
interface Data {
  name?: string;
  url?: string;
  values?: any[];
  format?: DataFormat;
  transform?: Transform[];
}
interface DataFormat {
  type?: 'json' | 'csv' | 'tsv' | 'topojson';
  parse?: 'auto' | 'string' | 'number' | 'boolean' | 'date' | { [field: string]: 'string' | 'number' | 'boolean' | 'date' };
  property?: string;
  feature?: string;
}
interface SequenceParams {
  start: number;
  stop: number;
  step?: number;
}

Full SDK Example:
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<body>
  <div id="view"></div>
  <script>
    const spec = {
      data: {
        url: 'data/data.csv',
        format: {
          type: 'csv',
          parse: { date: 'date', value: 'number' }
        }
      },
      mark: 'line',
      encoding: {
        x: { field: 'date', type: 'temporal' },
        y: { field: 'value', type: 'quantitative' }
      }
    };
    vegaEmbed('#view', spec, { renderer: 'svg', logLevel: 1 })
      .then(result => {
        console.log('Vega View:', result.view);
      })
      .catch(error => {
        console.error('Embedding error:', error);
      });
  </script>
</body>
</html>

Implementation Pattern:
1. Import Vega, Vega-Lite, Vega-Embed scripts.
2. Create HTML container.
3. Define Vega-Lite spec with data, mark, encoding.
4. Optionally define spec.data.format and spec.transform.
5. Call vegaEmbed(container, spec, options).
6. Handle promise for runtime view or errors.

Configuration Options:
renderer: 'canvas' | 'svg' (default 'canvas')
logLevel: 0 (silent) to 4 (debug) (default 0)

Troubleshooting:
Command: npx vega-lite --validate spec.json
Expected: Outputs compiled Vega spec or no errors
Error: "Invalid field type" -> Add or correct format.parse mapping for the field
Browser Console: "TypeError: spec.data.values is undefined" -> Ensure values is an array

Concrete Best Practices:
- Always specify format.parse for date fields to avoid string parsing errors.
- For nested JSON, use format.property to point to the array.
- Name datasets when reusing them with multiple views.
- Use sequence transform for quick prototyping without external dependencies.

## Information Dense Extract
Data{name?,url?,values?,format?,transform?}; format{type? json|csv|tsv|topojson;parse?auto|string|number|boolean|date|{[f]:type};property?string;feature?string}; sequence{start,stop,step?}. Default parse auto infers types; explicit parse overrides. Use vegaEmbed(target,spec,{renderer,logLevel})→Promise<{view,runtime}>. Validate via CLI: npx vega-lite --validate spec.json. Common fixes: type mismatches→specify parse, undefined values→provide array in values. Optimize: predefine parse mapping, filter in transform, reuse named datasets.

## Sanitised Extract
Table of Contents
1 Data Source Definition
2 Inline Data Values
3 URL Data Source
4 Data Format Parsing
5 Data Generators

Data Source Definition
name: string, optional identifies dataset
url: string, HTTP(S) or file path, required if values absent
values: object array for inline data
format:
  type: json|csv|tsv|topojson, default json
  parse: auto|string|number|boolean|date or {field:type}, default auto
  property: nested JSON key, no default
  feature: topojson feature key, default features
transform:
  sequence: {start:number; stop:number; step?:number}

Inline Data Values
values: array of objects, define data inline in spec

URL Data Source
url: path or remote URL string; supports caching per browser

Data Format Parsing
parse: auto infers types; explicit mapping overrides; use parse for dates/numbers
property: dot-separated path to nested arrays
feature: key for topojson features array

data.example: {url:'data.csv',format:{type:'csv',parse:{date:'date',value:'number'}}}

Data Generators
sequence: {start:1,stop:100,step:10} produces values 1,11,...,91

## Original Source
Vega-Lite Documentation
https://vega.github.io/vega-lite/docs/

## Digest of DATA_SOURCES

# Data Source Definition

Interface Data {
  name?: string;
  url?: string;
  values?: any[];
  format?: DataFormat;
  transform?: Transform[];
}

# Inline Data Values

Use "values": array of objects for inline data. Example:

  "data": {
    "values": [
      {"category": "A", "value": 28},
      {"category": "B", "value": 55}
    ]
  }

# URL Data Source

Use "url": string to load external files. Supported protocols: HTTP(S), file://. Example:

  "data": {
    "url": "data.csv"
  }

# Data Format Parsing

Interface DataFormat {
  type?: 'json' | 'csv' | 'tsv' | 'topojson';        // default 'json'
  parse?: 'auto' | 'string' | 'number' | 'boolean' | 'date' | { [field: string]: 'string' | 'number' | 'boolean' | 'date' }; // default 'auto'
  property?: string;    // nested JSON key, e.g. 'data.records'
  feature?: string;     // topojson feature key, default 'features'
}

Use:

  "data": {
    "url": "data.geojson",
    "format": {"type": "topojson", "feature": "countries"}
  }

# Data Generators

Sequence generator for synthetic data:

  "transform": [
    {"sequence": {"start": 1, "stop": 10, "step": 1}}
  ]

Produces array of objects with 'data' fields from start to stop inclusive.

Retrieved on: 2024-06-10
Attribution: Vega-Lite Documentation; Data Size: 13752109 bytes; Links Found: 15027

## Attribution
- Source: Vega-Lite Documentation
- URL: https://vega.github.io/vega-lite/docs/
- License: BSD-3-Clause
- Crawl Date: 2025-05-11T01:30:10.982Z
- Data Size: 13752109 bytes
- Links Found: 15027

## Retrieved
2025-05-11
