# Node.js Core I/O, Streams, Stream Promises, and Performance Hooks Documentation
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/stream.html#stream_promises
## https://nodejs.org/api/perf_hooks.html
Comprehensive reference covering filesystem operations (fs, fs/promises with AbortSignal support), low-level and high-level stream APIs (Readable, Writable, Transform, backpressure, object mode), the Promise-based stream utilities (pipeline, finished, async iteration), and the Performance Hooks API (PerformanceObserver, mark/measure, event loop timings). Enhanced with practical examples on backpressure-aware JSON handling, integrating JSONStream patterns (parse, stringify, filter) directly into Node.js streams, and tuning pipeline concurrency. Essential for implementing serializeDataStream, NDJSON record streaming, file-backed caches, and precise benchmarking in the --benchmark feature. Published 2023; Core runtime docs, authoritative.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Detailed coverage of import/export syntax, conditional exports, dynamic imports, loader hooks, interop with CommonJS, and top-level await. Explains package.json configuration, tree-shaking impacts, module resolution strategies, and custom loader development—vital for maintaining a modern ESM-based CLI and bundling libraries for distribution. Updated 2023; Core runtime docs, authoritative.
## License: Node.js (MIT-like terms)

# Zod Official Documentation
## https://zod.dev
In-depth reference on schema creation, parsing pipelines, type inference, asynchronous refinements, custom error formatting, and integration patterns with validation libraries. Demonstrates nested object schemas, coercion strategies, and runtime-to-compile-time type safety—critical for robust CLI flag validation, configuration file parsing, and error handling workflows. Updated 2023; community-maintained, highly authoritative.
## License: MIT

# Yargs Command-Line Parser Guide
## https://github.com/yargs/yargs#readme
Comprehensive CLI toolkit reference covering declarative command modules, positional arguments, type coercion, middleware hooks, localized help generation, and async command handlers. Provides best practices for orchestrating complex CLI workflows, subcommands, and extending argument parsing with plugins. Updated 2024; MIT.
## License: MIT

# Newline Delimited JSON (NDJSON) Specification
## http://ndjson.org/
Defines the line-delimited JSON format (MIME type application/x-ndjson), record separation rules, streaming payload guidelines, and interoperability requirements. Provides actionable details for implementing CLI NDJSON output, streaming consumers, and memory-efficient pipelines handling large datasets. Published 2020; CC0.
## License: CC0

# Vega-Lite Specification
## https://vega.github.io/vega-lite/
High-level JSON grammar for interactive visualizations, covering data transformations, encoding channels, mark types, scales, axes, and layer compositions. Offers concrete schema examples for mapping time series data to declarative chart definitions, customizing aggregate functions, and embedding in web or server-rendered contexts. Updated 2023; BSD-3-Clause.
## License: BSD-3-Clause

# SVG Technical Documentation (MDN & W3C)
## https://developer.mozilla.org/en-US/docs/Web/SVG
## https://www.w3.org/TR/SVG2/
Combines MDN’s practical guide to SVG shapes, paths, transforms, styling, and XML serialization with the authoritative W3C SVG2 recommendation. Essential for cross-platform SVG chart rendering, viewBox handling, styling, animation, and serialization strategies in both client and server contexts. MDN reviewed 2024; W3C spec 2021.
## License: CC-BY-SA / W3C Software and Document License

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation covers image resizing, cropping, compositing, format conversion, and streaming pipelines for SVG-to-PNG conversion. Details performance and memory tips, lazy pipelines, and concurrency controls—key to high-throughput plot exports. Last updated 2023; Apache-2.0.
## License: Apache-2.0

# Server-Side Chart.js Rendering and Extension
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas#readme
Unifies the ChartjsNodeCanvas module for generating chart buffers in Node.js with the official Chart.js configuration reference and the underlying node-canvas drawing API. Covers initializing CanvasRenderingContext2D, device pixel ratio handling, asynchronous rendering, and optimizing performance in headless environments. Details Chart.js plugin architecture lifecycle hooks and custom font registration for consistent text rendering. Updated 2024; MIT.
## License: MIT

# Vitest Documentation
## https://vitest.dev/
Official Vitest docs covering configuration, test suites, mocking, snapshot testing, coverage analysis, and plugin extensions. Includes lifecycle hooks and performance tuning for rapid unit tests of CLI logic, parser functions, and file I/O. Latest release: 2023; MIT.
## License: MIT

# CSV (RFC 4180) Specification
## https://datatracker.ietf.org/doc/html/rfc4180
The IETF standard defining the Common Format and MIME Type for Comma-Separated Values (CSV) files, including guidelines for header rows, record separators, field delimiters, quoting rules, and escaping mechanisms. Provides essential rules for implementing robust CSV output with proper quoting of special characters, newline handling, and interoperability across tools. Published October 2005; IETF standard, public domain.
## License: IETF (public domain)

# Express Official Documentation
## https://expressjs.com/
Detailed guide to setting up middleware, routing, error handling, request/response streaming, content negotiation, and configuration of Express.js applications. Provides practical examples for building RESTful APIs, handling JSON and URL-encoded payloads, streaming large payloads with res.write(), and best practices for error handling and security middleware—critical for implementing the HTTP API serve mode. Updated 2024; MIT.
## License: MIT

# Stream-Transform Library
## https://github.com/adaltas/node-stream-transform#readme
Stream-Transform is a Node.js module for creating transform streams with configurable concurrency, parallel processing, and backpressure support. It details usage patterns for mapping, filtering, and reducing data chunks within streaming pipelines, including async callbacks, error propagation, and batch-size tuning. Critical for implementing chunked seriesData ingestion in --streaming mode with controlled memory footprint and throughput. Updated 2023; community-maintained.
## License: MIT

# Math.js Documentation
## https://mathjs.org/docs/
Comprehensive reference on the Math.js library’s expression parser, evaluator, and algebraic utilities. Covers creating and compiling expressions, symbolic computation, custom function definitions, unit handling, matrix operations, and performance best practices. Demonstrates AST manipulation and scope management for secure, high-performance evaluation of user-provided formulas—central to implementing formula-to-timeseries conversion. Updated 2024; Apache-2.0.
## License: Apache-2.0

# JSONStream Library
## https://github.com/dominictarr/JSONStream#readme
Provides streaming JSON parsing and stringifying capabilities with support for backpressure, filter-based pattern matching, and chunked data handling. Demonstrates practical examples of piping large JSON datasets through memory-efficient pipelines and integrating with Node.js streams. Updated 2021; community-maintained, widely used for scalable JSON stream processing.
## License: MIT

# dotenv Official Documentation
## https://github.com/motdotla/dotenv#readme
Covers loading environment variables from .env files into process.env, configuration options, safe mode enforcement, and best practices for secret management in Node.js applications. Provides usage patterns for environment-based configuration in CLI tools and server processes. Updated 2024; MIT.
## License: MIT