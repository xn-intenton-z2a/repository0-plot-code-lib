# Node.js Core APIs, Streams, and Concurrency
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/child_process.html
## https://nodejs.org/api/perf_hooks.html
Comprehensive reference covering filesystem operations, low-level and high-level stream APIs (Readable, Writable, Transform), backpressure management, object mode streams, promise-based utilities (`fs/promises`, `pipeline`, `finished`, async iteration), Performance Hooks API (`PerformanceObserver`, mark/measure), and concurrency primitives via Worker Threads and child processes. Essential for implementing non-blocking CLI commands, high-throughput batch plotting, file-backed caching, precision benchmarking, and isolating CPU-intensive tasks. Last updated June 2024; authoritative as official Node.js documentation.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Detailed coverage of ECMAScript module semantics including import/export syntax, conditional exports, dynamic imports, interop with CommonJS, loader hooks, and top-level await. Explains module resolution, tree-shaking considerations, `package.json` configuration, and custom loader development—crucial for consistent ESM-based CLI tooling and library bundling workflows. Last updated June 2024; authoritative as official Node.js documentation.
## License: Node.js (MIT-like terms)

# CLI Tools & Configuration: Yargs, Zod, dotenv, and YAML Parsing
## https://github.com/yargs/yargs#readme
## https://zod.dev
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
This collection offers best practices for declarative command and subcommand parsing with Yargs (middleware, positional args, custom commands), schema-based validation and type inference with Zod (error messages, coercion), environment variable management via dotenv, and YAML 1.2 parsing/dumping with js-yaml. Includes examples for secure loading, environment overrides, and merge strategies—foundational for CLI flags, configuration files, and seed workflows. Last updated 2024.
## License: MIT / OASIS (public domain)

# Data Formats & Date-Time Handling
## https://tools.ietf.org/html/rfc8259
## http://ndjson.org/
## https://datatracker.ietf.org/doc/html/rfc4180
## https://tools.ietf.org/html/rfc3339
Authoritative IETF specifications for JSON, NDJSON, CSV, and RFC3339 date-time formatting detailing syntax, data types, Unicode handling, streaming record separation, delimiters, quoting conventions, timestamp formats, offsets, and fractional seconds. Highlights rules for incremental parsing, streaming output generation, and consistent time-series timestamp handling across CLI and HTTP API modes. Published RFC8259 (January 2018), RFC4180 (October 2005), RFC3339 (July 2002); public domain.
## License: IETF (public domain) / CC0

# Chart Rendering & SVG Technical Documentation
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://quickchart.io/documentation/
## https://developer.mozilla.org/docs/Web/SVG
This curated set synthesizes Chart.js v4 configuration and plugin APIs, headless rendering via ChartjsNodeCanvas and node-canvas, QuickChart HTTP API usage, and the W3C SVG2 vector graphics standard. Emphasizes DPI scaling, polyline and axis configuration, SVG serialization, and off-DOM rendering optimizations—essential for high-fidelity chart exports in CLI, batch, and server contexts. Last updated 2024.
## License: MIT / Public API terms / CC-BY-SA / W3C License

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s documentation covers image resizing, cropping, compositing, format conversion, and streaming pipelines, including SVG-to-PNG conversion. Includes performance and memory optimization tips, lazy evaluation, concurrency controls, and buffer management—crucial for efficient batch plot exports and report generation. Last updated March 2024.
## License: Apache-2.0

# Testing Frameworks: Vitest and Supertest
## https://vitest.dev/
## https://github.com/visionmedia/supertest#readme
Vitest provides configuration for fast unit and integration testing, including suite structure, mocking, snapshot testing, and performance tuning for CLI logic and parsing. Supertest offers end-to-end HTTP testing patterns for Express servers, supporting request chaining, assertions, and streaming response validation—vital for verifying CLI and HTTP API endpoints. Last updated 2024.
## License: MIT

# Express Official Documentation
## https://expressjs.com/
Comprehensive guide to middleware, routing, error handling, body parsing (JSON, URL-encoded), streaming responses, and security best practices. Includes examples for RESTful API setup, content negotiation, and custom error middleware—foundational for implementing and hardening the HTTP API serve mode. Last updated May 2024.
## License: MIT

# Math.js Documentation
## https://mathjs.org/docs/
In-depth reference on expression parsing, evaluator APIs, symbolic computation, custom function definitions, unit handling, and matrix operations. Demonstrates AST manipulation, safe evaluation patterns, and performance considerations—essential for transforming formulas into time-series data for plotting tasks. Last updated April 2024.
## License: Apache-2.0

# Release Management & CI/CD Tools
## https://github.com/conventional-changelog/conventional-changelog
## https://cli.github.com/manual/
## https://docs.npmjs.com/cli/v10/commands/npm-publish
This combined resource covers conventional-changelog configuration for automated `CHANGELOG.md` generation, GitHub CLI for PR and release workflows, and npm-publish strategies (tagging, dry-run, registry configuration). Provides actionable examples for integrating release automation into CI/CD pipelines and ensuring consistent versioning. Last updated 2024.
## License: MIT / CC0

# OpenAI Node.js Library Documentation
## https://platform.openai.com/docs/libraries/node-js-overview
Official documentation for the OpenAI Node.js client covering installation, authentication, environment configuration, and API reference for completions, chat, embeddings, and streaming. Includes best practices for token management, chunked response handling, and error recovery—critical for building agent-driven plotting workflows. Last updated January 2024.
## License: OpenAI Terms of Use

# OpenAPI 3.1 Specification
## https://spec.openapis.org/oas/v3.1.0.html
The official OpenAPI 3.1.0 specification defining RESTful API contract structure, including paths, components, schemas, parameters, and security schemes. Supplies formal JSON/YAML schemas for validation and code generation—directly applicable to designing and documenting the `/plot` HTTP endpoint. Published February 2021; authoritative as the OpenAPI Specification.
## License: OpenAPI Specification License

# Asciichart & D3.js Advanced Charting Libraries
## https://github.com/kroitor/asciichart
## https://d3js.org/
Asciichart offers a lightweight API for rendering high-resolution ASCII line charts in terminals with customizable offsets, padding, smoothing, color support, and multi-series plotting. D3.js provides a modular API for data-driven SVG generation, including scales, axes, shape generators, and data binding patterns. Together they illustrate efficient terminal-based and DOM-less chart algorithms, advanced coordinate transformations, and dynamic update techniques. Last updated D3.js 2023; Asciichart 2021.
## License: MIT / BSD-3-Clause

# Vega-Lite JSON Grammar Specification
## https://vega.github.io/vega-lite/docs/specification.html
Comprehensive JSON grammar for declarative statistical graphics, covering encoding channels, mark types, scales, axes, legends, projections, and composition patterns. Provides actionable schema definitions and examples for programmatic chart generation and customization, enabling advanced visualization pipelines. Last updated 4.17.0 (January 2024); authoritative as the Vega-Lite project.
## License: BSD-3-Clause

# Plotly.js Official Documentation
## https://plotly.com/javascript/
Official Plotly.js documentation covering chart types, configuration options, and advanced features such as animations, subplots, and dynamic interactions. Includes examples for static image export via Node.js using Kaleido and client-side integrations—providing a robust alternative for high-quality, interactive chart generation in headless environments. Last updated 2024.
## License: MIT

# Apache ECharts Official API Documentation
## https://echarts.apache.org/en/api.html
The official API reference for Apache ECharts, detailing chart option schemas, series types, data transformations, and rendering configurations. Covers tips for performance optimization, multi-axis layouts, and theme customization—essential for building scalable, interactive charting CLI tools. Last updated 2024; authoritative as the Apache project.
## License: Apache-2.0