# Node.js Core I/O, Streams, Stream Promises, and Performance Hooks Documentation
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/stream.html#stream_promises
## https://nodejs.org/api/perf_hooks.html
Comprehensive reference covering filesystem operations (fs, fs/promises with AbortSignal support), low-level and high-level stream APIs (Readable, Writable, Transform, backpressure, object mode), the Promise-based stream utilities (pipeline, finished, async iteration), and the Performance Hooks API (PerformanceObserver, mark/measure, event loop timings). Essential for implementing backpressure-aware serializeDataStream, --buffer-size tuning, and precise benchmarking in the --benchmark feature. Published 2023; Core runtime docs, authoritative.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Detailed coverage of import/export syntax, conditional exports, dynamic imports, loader hooks, interop with CommonJS, and top-level await. Explains package.json configuration, tree-shaking impacts, and module resolution strategies—vital for maintaining a modern ESM-based CLI and library bundle. Updated 2023; Core runtime docs, authoritative.
## License: Node.js (MIT-like terms)

# Zod Official Documentation
## https://zod.dev
In-depth reference on schema creation, parsing pipelines, type inference, asynchronous refinements, and custom error formatting. Demonstrates nested object schemas, coercion strategies, and integration with yargs—critical for robust CLI flag validation and error handling. Updated 2023; community-maintained, highly authoritative.
## License: MIT

# Yargs Command-Line Parser Guide
## https://github.com/yargs/yargs#readme
Comprehensive CLI toolkit reference covering declarative command modules, positional arguments, type coercion, middleware hooks, localized help generation, and async command handlers. Provides best practices for orchestrating complex CLI workflows and extending argument parsing. Updated 2024; MIT.
## License: MIT

# expr-eval Parser Library
## https://github.com/silentmatt/expr-eval#readme
Defines a lightweight JavaScript expression parser and evaluator, detailing supported grammar (operators, functions), AST manipulation, custom function injection, and secure evaluation contexts. Directly informs expression parsing, variable binding, and performance considerations in time series generation. Last updated 2023; MIT.
## License: MIT

# Newline Delimited JSON (NDJSON) Specification
## http://ndjson.org/
Defines the line-delimited JSON format (MIME type application/x-ndjson), record separation rules, streaming payload guidelines, and interoperability requirements. Provides actionable details for implementing CLI NDJSON output, streaming consumers, and memory-efficient pipelines. Published 2020; CC0.
## License: CC0

# Vega-Lite Specification
## https://vega.github.io/vega-lite/
High-level JSON grammar for interactive visualizations, covering data transformations, encoding channels, mark types, scales, axes, and layer compositions. Offers concrete schema examples for mapping time series data to declarative chart definitions. Updated 2023; BSD-3-Clause.
## License: BSD-3-Clause

# SVG Technical Documentation (MDN & W3C)
## https://developer.mozilla.org/en-US/docs/Web/SVG
## https://www.w3.org/TR/SVG2/
Combines MDN’s practical guide to SVG shapes, paths, transforms, styling, and XML serialization with the authoritative W3C SVG2 recommendation. Essential for cross-platform SVG chart rendering, viewBox handling, styling, and serialization strategies. MDN reviewed 2024; W3C spec 2021.
## License: CC-BY-SA / W3C Software and Document License

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation covers image resizing, cropping, compositing, format conversion, and streaming pipelines for SVG-to-PNG conversion. Details performance and memory tips, lazy pipelines, and concurrency controls—key to high-throughput plot exports. Last updated 2023; Apache-2.0.
## License: Apache-2.0

# Server-Side Chart.js Rendering and Extension
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas#readme
Unifies the ChartjsNodeCanvas module for generating chart buffers in Node.js with the official Chart.js configuration reference and the underlying node-canvas drawing API. Covers initializing CanvasRenderingContext2D, handling device pixel ratios, asynchronous rendering, and optimizing performance in headless environments. Details Chart.js plugin architecture lifecycle hooks and custom font registration for consistent text rendering. Updated 2024; MIT.
## License: MIT

# Vitest Documentation
## https://vitest.dev/
Official Vitest docs covering configuration, test suites, mocking, snapshot testing, coverage analysis, and plugin extensions. Includes lifecycle hooks and performance tuning for rapid unit tests of CLI logic, parser functions, and file I/O. Latest release: 2023; MIT.
## License: MIT

# CSV (RFC 4180) Specification
## https://datatracker.ietf.org/doc/html/rfc4180
The IETF standard defining the Common Format and MIME Type for Comma-Separated Values (CSV) files, including guidelines for header rows, record separators, field delimiters, quoting rules, and escaping mechanisms. Provides essential rules for implementing robust CSV output with proper quoting of special characters, newline handling, and interoperability across tools. Published October 2005; IETF standard, public domain.
## License: IETF (public domain)

# JSON Lines Specification
## https://jsonlines.org/
Describes the JSON Lines format for streaming JSON objects separated by newlines, providing guidelines on record delimitation, line handling, and interoperability. Offers examples and best practices for implementing streaming JSON arrays or objects with minimal memory overhead. Maintained as a community convention with broad tooling support. Viewed 2024; CC0.
## License: CC0

# RFC 7464: JSON Text Sequences
## https://datatracker.ietf.org/doc/html/rfc7464
Specifies the application/json-seq media type for JSON text sequences, using record separators (RS) for streaming JSON records. Defines framing, content-type handling, and error cases—valuable for implementing alternative JSON streaming strategies and inter-process protocols. Published March 2015; IETF standard, public domain.
## License: IETF (public domain)

# JSONStream Library
## https://github.com/dominictarr/JSONStream#readme
Streaming JSON parser and stringifier for Node.js, covering JSONStream.parse, JSONStream.stringify, and filter/query patterns. Demonstrates efficient backpressure-aware JSON generation and parsing pipelines, as well as integration examples with fs.createReadStream and Transform streams. Last updated 2023; MIT.
## License: MIT

# Fast-CSV Library
## https://c2fo.github.io/fast-csv/docs/introduction
Fast, feature-rich CSV parser and formatter for Node.js that supports streaming, custom delimiters, quoting, header handling, and transforming rows. Provides performance benchmarks and best practices for high-throughput CSV generation and parsing with backpressure support. Updated 2024; MIT.
## License: MIT