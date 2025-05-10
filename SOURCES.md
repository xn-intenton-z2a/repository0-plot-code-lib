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

# JSON & NDJSON Specifications
## https://www.rfc-editor.org/rfc/rfc8259
## http://ndjson.org/
Combined authoritative specifications for JSON (syntax, data types, Unicode handling, parsing requirements) and NDJSON (MIME type application/x-ndjson, record separation rules, streaming payload guidelines). Essential for ensuring strict compliance, interoperability, and memory-efficient record streaming in CLI modes.
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

# CSV (RFC 4180) Specification
## https://datatracker.ietf.org/doc/html/rfc4180
The IETF standard defining the Common Format and MIME Type for Comma-Separated Values (CSV) files, including guidelines for header rows, record separators, field delimiters, quoting rules, and escaping mechanisms. Provides essential rules for implementing robust CSV output with proper quoting of special characters, newline handling, and interoperability across tools.
## License: IETF (public domain)

# Express Official Documentation
## https://expressjs.com/
Detailed guide to setting up middleware, routing, error handling, request/response streaming, content negotiation, and configuration of Express.js applications. Provides practical examples for building RESTful APIs, handling JSON and URL-encoded payloads, streaming large payloads with res.write(), and best practices for error handling and security middleware—critical for implementing the HTTP API serve mode.
## License: MIT

# Math.js Documentation
## https://mathjs.org/docs/
Comprehensive reference on the Math.js library’s expression parser, evaluator, and algebraic utilities. Covers creating and compiling expressions, symbolic computation, custom function definitions, unit handling, matrix operations, and performance best practices. Demonstrates AST manipulation and scope management for secure, high-performance evaluation of user-provided formulas—central to implementing formula-to-timeseries conversion.
## License: Apache-2.0

# dotenv & YAML Specification & js-yaml Parsing (merged)
## https://github.com/motdotla/dotenv#readme
## https://yaml.org/spec/1.2/spec.html
## https://github.com/nodeca/js-yaml#readme
Covers environment variable management with dotenv including safe mode enforcement and custom path loading. Augmented with the OASIS YAML 1.2 specification detailing syntax, data types, anchors, tags, and schema rules; and js-yaml documentation outlining API usage for parsing, dumping, custom schema definitions, and error handling. Vital for environment-based configuration and robust CLI config-loader implementation.
## License: MIT / OASIS (public domain)

# Node.js Concurrency and Parallelism
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/child_process.html
## https://nodejs.org/api/os.html
Covers Node.js concurrency APIs including worker_threads (Worker, MessageChannel, SharedArrayBuffer), child_process (spawn, fork, exec, IPC patterns), and the os module for CPU detection and resource management. Includes best practices for inter-process communication, error handling, and dynamic thread-pool sizing. Vital for orchestrating high-throughput batch plotting tasks in parallel or isolated processes.
## License: Node.js (MIT-like terms)

# EJS Templating Engine Documentation
## https://ejs.co/#docs
Official EJS documentation detailing template syntax, API usage, custom delimiters, partials/includes, caching strategies, and performance considerations. Provides actionable guidance for building and integrating EJS-based templates, including default and custom report layouts in the --report feature.
## License: MIT

# markdown-it Markdown Parser Documentation
## https://markdown-it.github.io/
Comprehensive guide to the markdown-it library API, parsing options, plugin ecosystem (including markdown-it-github), and performance tuning. Covers secure mode for HTML sanitization, custom renderer rules, and integrating Markdown-to-HTML conversion in Node.js pipelines—essential for implementing narrative sections in report generation.
## License: MIT