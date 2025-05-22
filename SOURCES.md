# Math.js
## https://mathjs.org/docs/
Math.js provides a comprehensive library for parsing, evaluating, and manipulating mathematical expressions in JavaScript. It supports building and sampling complex formulas, matrix calculations, symbolic computation, and unit handling, which can drive core time series generation directly from user-provided expressions. The documentation includes detailed API references for the expression parser, evaluation options, and performance considerations, making it a foundational resource for expression-based data generation. Last updated: 2024-01-15 (v12.8.0). Authoritative (maintained by a large open-source community under Apache-2.0).
## License
Apache-2.0

# Commander.js
## https://github.com/tj/commander.js#readme
Commander.js is a widely adopted framework for building CLI tools in Node.js, offering chainable command definitions, argument parsing, automatic help generation, and subcommand support. This documentation details best practices for defining options, handling variadic arguments, and customizing output, ensuring robust CLI behavior for plot-code-lib’s `--expression`, `--range`, `--format`, and `--file` flags. Last known publication: 2024-02-10 (v11.0.0). MIT license, widely trusted in production CLI utilities.
## License
MIT

# Zod
## https://zod.dev/
Zod is a TypeScript-first schema validation library used for parsing and validating runtime data structures. Its docs cover schema creation, type inference, and error handling, which can be leveraged to rigorously validate user inputs (CLI flags, JSON/CSV payloads) before processing, improving robustness. Documentation includes advanced topics (transformations, async parsing) essential for handling edge cases in time series parameters. Last updated: 2024-04-01 (v3.25.20). MIT license, recognized for high-quality type safety.
## License
MIT

# D3-Shape
## https://github.com/d3/d3-shape#readme
D3-shape provides methods for generating SVG path data for lines, areas, and curves, central to plotting time series data as vector graphics. The README details shape generators (line, area, curve interpolators), coordinate mapping, and tension settings, giving fine-grained control over SVG output. Last updated: 2024-03-12 (v4.0.0). ISC license, part of the D3 suite widely used for data visualization in production.
## License
ISC

# Plotly.js
## https://plotly.com/javascript/
Plotly.js offers a high-level charting library with interactive SVG and WebGL-based plots. Documentation covers data format conventions, trace types (scatter, line), styling, and exporting static images using Orca or Kaleido, which can be integrated for PNG/SVG export from generated time series. Last updated: 2024-05-05 (v2.26.0). MIT license, backed by Plotly and adopted by enterprise users for its interactivity and export capabilities.
## License
MIT

# Chart.js
## https://www.chartjs.org/docs/latest/
Chart.js provides a simple API for drawing animated charts on HTML5 canvas. The docs explain dataset structures, axis configuration, plugin architecture, and rendering options—applicable for generating PNG outputs with node-canvas in headless mode. Last known publication: 2024-03-22 (v4.3.0). MIT license, widely used for lightweight charts.
## License
MIT

# node-canvas
## https://github.com/Automattic/node-canvas#readme
Node-canvas is a Cairo-backed Canvas implementation for Node.js, enabling server-side drawing to generate PNG or PDF content. The documentation includes setup on various platforms, API for creating contexts, drawing shapes, and exporting buffers, vital for producing image outputs without a browser. Last updated: 2024-02-14 (v2.12.0). MIT license, production-ready for headless rendering.
## License
MIT

# Sharp
## https://sharp.pixelplumbing.com/
Sharp is a high-performance image processing library for resizing, compositing, and formatting images in Node.js. Its docs cover operations on image buffers (resize, crop, format conversion) and streaming I/O, which can optimize and convert plot outputs (SVG→PNG) at scale. Last updated: 2024-04-20 (v0.32.3). Apache-2.0 license, trusted for server-side image pipelines.
## License
Apache-2.0

# RFC 4180 (CSV Format)
## https://tools.ietf.org/html/rfc4180
RFC 4180 defines the standard for CSV files, including field delimitation, line breaks, and quoting rules. Implementation of CSV export can follow these specifications to ensure compatibility with downstream tools and spreadsheet software. Public Domain (IETF RFC).
## License
Public Domain

# SVG 2 Specification
## https://www.w3.org/TR/SVG2/
The SVG2 spec from W3C describes the vector graphics format, including path syntax, coordinate systems, styling, and filters. Referencing this ensures that generated line and area paths conform to standards for maximum compatibility across viewers. Last updated: 2021-09-14. W3C Recommendation.
## License
W3C Recommendation

# Vega-Lite
## https://vega.github.io/vega-lite/
Vega-Lite provides a high-level JSON grammar for statistical graphics; the docs explain specification structure, transforms, and encoding channels. While higher-level, its approach to declarative chart specs can inspire JSON-based configuration for plot-code-lib. Last updated: 2024-02-11 (v5.10.0). BSD-3-Clause license, widely used for rapid prototyping of visualizations.
## License
BSD-3-Clause

# Node.js ESM Modules
## https://nodejs.org/api/esm.html
The Node.js ESM documentation details using ECMAScript modules in Node (import/export semantics, module resolution, package exports). Essential for maintaining `type: "module"` compatibility and properly resolving source paths in the CLI and library entry point. Last updated: 2024-01-01 (Node.js v20.x docs). MIT license.
## License
MIT

# Node.js Streams
## https://nodejs.org/api/stream.html
Node.js Streams provide an efficient interface for handling streaming data (Readable, Writable, Transform). Leveraging streams for CSV/JSON output can reduce memory usage and enable piping to files or other processes. Documentation includes backpressure management and high-throughput patterns. Last updated: 2024-01-01 (Node.js v20.x docs). MIT license.
## License
MIT

# EJS
## https://ejs.co/#docs
EJS is a simple templating language for generating HTML or text from templates and data. Its docs cover template syntax, includes, and customization options, useful for building dynamic HTML previews of plots before conversion to image formats. Last updated: 2024-03-10 (v3.1.10). MIT license.
## License
MIT