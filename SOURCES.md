# Node.js Core I/O, Streams, Stream Promises, and Performance Hooks Documentation
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/stream.html
## https://nodejs.org/api/stream.html#stream_promises
## https://nodejs.org/api/perf_hooks.html
Comprehensive reference covering filesystem operations (fs, fs/promises with AbortSignal support), low-level and high-level stream APIs (Readable, Writable, Transform, backpressure, object mode), the Promise-based stream utilities (pipeline, finished, async iteration), and the Performance Hooks API (PerformanceObserver, mark/measure, event loop timings). Enhanced with practical examples on backpressure-aware JSON handling, integrating JSONStream patterns directly into Node.js streams, and tuning pipeline concurrency. Essential for implementing serializeDataStream, NDJSON record streaming, file-backed caches, and precise benchmarking in the --benchmark feature.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Detailed coverage of import/export syntax, conditional exports, dynamic imports, loader hooks, interop with CommonJS, and top-level await. Explains package.json configuration, tree-shaking impacts, module resolution strategies, and custom loader development—vital for maintaining a modern ESM-based CLI and bundling libraries for distribution.
## License: Node.js (MIT-like terms)

# Zod Official Documentation
## https://zod.dev
In-depth reference on schema creation, parsing pipelines, type inference, asynchronous refinements, custom error formatting, and integration patterns with validation libraries. Demonstrates nested object schemas, coercion strategies, and runtime-to-compile-time type safety—critical for robust CLI flag validation, configuration file parsing, and error handling workflows.
## License: MIT

# Yargs Command-Line Parser Guide
## https://github.com/yargs/yargs#readme
Comprehensive CLI toolkit reference covering declarative command modules, positional arguments, type coercion, middleware hooks, localized help generation, and async command handlers. Provides best practices for orchestrating complex CLI workflows, subcommands, and extending argument parsing with plugins.
## License: MIT

# Data Serialization Formats (JSON, NDJSON, CSV)
## https://tools.ietf.org/html/rfc8259
## http://ndjson.org/
## https://datatracker.ietf.org/doc/html/rfc4180
Consolidated specifications for JSON (syntax, data types, Unicode handling), NDJSON (MIME type application/x-ndjson, record separation, streaming), and CSV (RFC 4180 rules for delimiters, quoting, and record structure). Provides authoritative guidelines for implementing strict parsing, streaming record handling, and generating interoperable data outputs—essential for import/export functions, configuration loading, and data-driven plotting.
## License: IETF (public domain) / CC0

# SVG Technical Documentation (MDN & W3C)
## https://developer.mozilla.org/docs/Web/SVG
## https://www.w3.org/TR/SVG2/
Combines MDN’s practical guide to SVG shapes, paths, transforms, styling, and XML serialization with the authoritative W3C SVG2 recommendation. Essential for cross-platform SVG chart rendering, viewBox handling, styling, animation, and serialization strategies in both client and server contexts.
## License: CC-BY-SA / W3C Software and Document License

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation covers image resizing, cropping, compositing, format conversion, and streaming pipelines for SVG-to-PNG conversion. Details performance and memory tips, lazy pipelines, and concurrency controls—key to high-throughput plot exports.
## License: Apache-2.0

# Server-Side Chart.js Rendering and Extension
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://www.chartjs.org/docs/latest/
## https://github.com/Automattic/node-canvas#readme
Unifies the ChartjsNodeCanvas module for generating chart buffers in Node.js with the official Chart.js configuration reference and the underlying node-canvas drawing API. Covers initializing CanvasRenderingContext2D, device pixel ratio handling, asynchronous rendering, and optimizing performance in headless environments. Details Chart.js plugin architecture lifecycle hooks and custom font registration for consistent text rendering.
## License: MIT

# Vitest Documentation
## https://vitest.dev/
Official Vitest docs covering configuration, test suites, mocking, snapshot testing, coverage analysis, and plugin extensions. Includes lifecycle hooks and performance tuning for rapid unit tests of CLI logic, parser functions, and file I/O.
## License: MIT

# Express Official Documentation
## https://expressjs.com/
Detailed guide to setting up middleware, routing, error handling, request/response streaming, content negotiation, and configuration of Express.js applications. Provides practical examples for building RESTful APIs, handling JSON and URL-encoded payloads, streaming large payloads with res.write(), and best practices for error handling and security middleware—critical for implementing the HTTP API serve mode.
## License: MIT

# Math.js Documentation
## https://mathjs.org/docs/
Comprehensive reference on the Math.js library’s expression parser, evaluator, and algebraic utilities. Covers creating and compiling expressions, symbolic computation, custom function definitions, unit handling, matrix operations, and performance best practices. Demonstrates AST manipulation and scope management for secure, high-performance evaluation of user-provided formulas—central to implementing formula-to-timeseries conversion.
## License: Apache-2.0

# dotenv & YAML Parsing (dotenv & js-yaml with OASIS YAML 1.2)
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
## https://yaml.org/spec/1.2/spec.html
Covers environment variable management with dotenv including safe mode enforcement and custom path loading. Augmented with the OASIS YAML 1.2 specification detailing syntax, data types, anchors, tags, and schema rules; and js-yaml documentation outlining API usage for parsing, dumping, custom schema definitions, and error handling. Vital for environment-based configuration and robust CLI config-loader implementation.
## License: MIT / OASIS (public domain)

# Node.js Concurrency and Parallelism
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/child_process.html
## https://nodejs.org/api/os.html
Covers Node.js concurrency APIs including worker_threads (Worker, MessageChannel, SharedArrayBuffer), child_process (spawn, fork, exec, IPC patterns), and the os module for CPU detection and resource management. Includes best practices for inter-process communication, error handling, and dynamic thread-pool sizing. Vital for orchestrating high-throughput batch plotting tasks in parallel or isolated processes.
## License: Node.js (MIT-like terms)

# Templating and Markdown Conversion
## https://ejs.co/#docs
## https://markdown-it.github.io/
Integrated guidance on building dynamic HTML via EJS templates and converting Markdown to HTML using markdown-it. Covers template syntax, custom delimiters, partials/includes, caching strategies, secure mode for HTML sanitization, custom renderer rules, and performance considerations. Essential for report generation workflows combining narrative sections and embedded plot images.
## License: MIT

# QuickChart HTTP API Documentation
## https://quickchart.io/documentation/
Official QuickChart HTTP API docs detailing how to construct Chart.js-compatible payloads for on-the-fly image generation. Includes endpoint definitions, supported chart types, configuration options, image format parameters, caching control, and rate limiting guidelines. Offers insights into scalable chart delivery and can serve as a reference for designing our own server mode performance optimizations.
## License: Public API (see website)

# Supertest API Documentation
## https://github.com/visionmedia/supertest#readme
Comprehensive guide to supertest’s API for end-to-end HTTP testing of Express applications. Describes methods for request chaining, assertion patterns, streaming responses, and error-handling hooks. Key resource for writing robust integration tests for the HTTP API serve mode and validating response payloads and status codes.
## License: MIT