# Node.js Core APIs, Streams, and Concurrency
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/child_process.html
## https://nodejs.org/api/perf_hooks.html
Comprehensive reference covering filesystem operations, low-level and high-level stream APIs (Readable, Writable, Transform), backpressure, object mode, promise-based utilities (fs/promises, pipeline, finished, async iteration), Performance Hooks API (PerformanceObserver, mark/measure), and concurrency primitives via Worker Threads and child processes. Crucial for building non-blocking CLI commands, high-throughput batch plotting, file-backed caching, precision benchmarking, and isolating CPU-intensive tasks. Last updated June 2024; authoritative as official Node.js documentation.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Detailed coverage of ECMAScript module semantics including import/export syntax, conditional exports, dynamic imports, interop with CommonJS, loader hooks, and top-level await. Explains module resolution, tree-shaking impacts, package.json configuration, and custom loader development—essential for consistent ESM-based CLI tooling and library bundling. Last updated June 2024.
## License: Node.js (MIT-like terms)

# CLI Tools & Configuration: Yargs, Zod, dotenv, and YAML Parsing
## https://github.com/yargs/yargs#readme
## https://zod.dev
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
This set of sources offers best practices for building robust CLI interfaces and configuration pipelines: declarative command and subcommand parsing with yargs (middleware, positional arguments, custom commands), schema-based validation and type inference with Zod (error messages, coercion), environment variable management via dotenv, and YAML 1.2 parsing/dumping with js-yaml. Provides examples for secure loading, environment overrides, and merge strategies—foundational for CLI flags, config files, and seed workflows. Last updated 2024.
## License: MIT / OASIS (public domain)

# Data Serialization Formats (JSON, NDJSON, CSV)
## https://tools.ietf.org/html/rfc8259
## http://ndjson.org/
## https://datatracker.ietf.org/doc/html/rfc4180
Authoritative IETF specifications for JSON, NDJSON, and CSV detailing syntax, data types, Unicode handling, streaming record separation, delimiters, and quoting conventions. Highlights rules for incremental parsing and streaming output generation—critical for import/export commands, data-driven chart inputs, and interoperability. Public domain / CC0.
## License: IETF (public domain) / CC0

# Chart Rendering & SVG Technical Documentation
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://quickchart.io/documentation/
## https://developer.mozilla.org/docs/Web/SVG
This collection synthesizes Chart.js v4 configuration and plugin APIs, headless rendering via ChartjsNodeCanvas and node-canvas, QuickChart HTTP API usage, and MDN/SVG2 vector graphics standards. Emphasizes DPI scaling, polyline and axis configuration, SVG serialization, and off-DOM rendering optimizations—essential for high-fidelity chart exports in CLI, batch, and server contexts. Last updated 2024.
## License: MIT / Public API terms / CC-BY-SA / W3C License

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation covers image resizing, cropping, compositing, format conversion, and streaming pipelines, including SVG-to-PNG conversion. Includes performance and memory optimization tips, lazy evaluation, concurrency controls, and buffer management—crucial for efficient batch plot exports and report generation. Last updated March 2024.
## License: Apache-2.0

# Testing Frameworks: Vitest and Supertest
## https://vitest.dev/
## https://github.com/visionmedia/supertest#readme
Official Vitest docs cover test configuration, suite structure, mocking, snapshot testing, and performance tuning for fast unit and integration testing of CLI logic and parsing. Supertest provides end-to-end HTTP testing patterns for Express servers, including request chaining, assertions, and streaming response validation—vital for verifying CLI and HTTP API endpoints. Last updated 2024.
## License: MIT

# Express Official Documentation
## https://expressjs.com/
In-depth guide to middleware, routing, error handling, JSON and URL-encoded parsing, streaming responses, and security best practices. Includes examples for RESTful API setup, content negotiation, and custom error middleware—foundational for implementing and hardening the HTTP API serve mode. Last updated May 2024.
## License: MIT

# Math.js Documentation
## https://mathjs.org/docs/
Comprehensive reference on expression parsing, evaluator APIs, symbolic computation, custom function definitions, unit handling, and matrix operations. Demonstrates AST manipulation and safe evaluation patterns—essential for transforming formulas into time-series data for plotting tasks. Last updated April 2024.
## License: Apache-2.0

# Templating and Markdown Conversion
## https://ejs.co/#docs
## https://markdown-it.github.io/
Guidance for server-side templating with EJS (partials, includes, caching, sanitization) and Markdown-to-HTML conversion using markdown-it (plugin ecosystem, custom renderer rules). Supports dynamic report and documentation generation with embedded charts and narrative sections. Last updated 2024.
## License: MIT

# Release Management & CI/CD Tools
## https://github.com/conventional-changelog/conventional-changelog
## https://cli.github.com/manual/
## https://docs.npmjs.com/cli/v10/commands/npm-publish
This combined resource covers conventional-changelog presets and configuration for automated CHANGELOG.md generation, GitHub CLI for PR and release workflows, and npm-publish strategies (tagging, dry-run, registry configuration). Provides actionable examples for integrating release automation into CI/CD pipelines and ensuring consistent versioning. Last updated 2024.
## License: MIT / CC0

# OpenAI Node.js Library Documentation
## https://platform.openai.com/docs/libraries/node-js-overview
Official guide for the OpenAI Node.js client covering installation, authentication, environment setup, and API reference for completions, chat, embeddings, and streaming. Includes best practices for token usage, chunked responses, and error handling—critical for building agent-driven plot workflows. Last updated January 2024.
## License: OpenAI Terms of Use

# OpenAPI 3.1 Specification
## https://spec.openapis.org/oas/v3.1.0.html
The official OpenAPI 3.1.0 specification defining RESTful API contract structure including paths, components, schemas, parameters, and security schemes. Supplies formal JSON/YAML schemas suitable for validation and code generation—directly applicable to designing and documenting the /plot HTTP endpoint. Published February 2021.
## License: OpenAPI Specification License

# Asciichart & D3.js Advanced Charting Libraries
## https://github.com/kroitor/asciichart
## https://d3js.org/
Asciichart provides a lightweight API for rendering high-resolution ASCII line charts in terminals, featuring customizable offsets, padding, smoothing options, color support, and multiple series plotting. D3.js offers a modular API for data-driven SVG generation including scales, axes, shape generators, path utilities, and data binding patterns. Together, they illustrate efficient terminal-based and DOM-less chart algorithms, advanced coordinate transforms, and dynamic update techniques. Last updated D3.js 2023; Asciichart 2021.
## License: MIT / BSD-3-Clause

# RFC 3339 Date-Time Format Specification
## https://tools.ietf.org/html/rfc3339
Authoritative IETF specification for Internet date and time format including date, time, time offsets, and fractional seconds (a profile of ISO8601). Critical for consistent parsing of ISO8601 ranges and timestamp handling in time-series mode across CLI and HTTP API. Published July 2002; IETF public domain.
## License: IETF (public domain)

# Vega-Lite JSON Grammar Specification
## https://vega.github.io/vega-lite/docs/specification.html
Comprehensive JSON grammar for declarative statistical graphics including encoding channels, mark types, scales, axes, legends, projections, and layered/faceted composition. Provides actionable schema definitions and examples for generating and customizing charts programmatically, enabling advanced visualization pipelines. Last updated 4.17.0 (January 2024); authoritative from the Vega-Lite project.
## License: BSD-3-Clause