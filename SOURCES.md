# Node.js Core APIs, Streams, and Concurrency
## https://nodejs.org/api/fs.html
## https://nodejs.org/api/worker_threads.html
## https://nodejs.org/api/child_process.html
## https://nodejs.org/api/perf_hooks.html
Comprehensive reference covering filesystem operations, low-level and high-level stream APIs (Readable, Writable, Transform, backpressure, object mode), promise-based utilities (fs/promises, pipeline, finished, async iteration), the Performance Hooks API (PerformanceObserver, mark/measure, event loop timings), and concurrency primitives via Worker Threads and child processes. Includes best practices for thread-pool sizing, inter-process messaging, backpressure-aware streaming, and precise benchmarking—essential for high-throughput batch plotting, file-backed caches, and isolated report rendering. Last updated June 2024; official Node.js documentation under MIT-like terms.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Detailed coverage of ECMAScript module features including import/export syntax, conditional exports, dynamic imports, loader hooks, interop with CommonJS, and top-level await. Explains package.json configuration, tree-shaking impacts, module resolution strategies, and custom loader development—vital for a modern ESM-based CLI and bundling libraries. Last updated June 2024; official source under MIT-like terms.
## License: Node.js (MIT-like terms)

# CLI Tools & Configuration: Yargs, Zod, dotenv, and YAML Parsing
## https://github.com/yargs/yargs#readme
## https://zod.dev
## https://github.com/motdotla/dotenv#readme
## https://github.com/nodeca/js-yaml#readme
## https://yaml.org/spec/1.2/spec.html
Integrated guidance on robust CLI and configuration handling: declarative subcommand parsing and middleware via Yargs, schema-based validation and type inference with Zod, environment variable management in dotenv, and YAML 1.2 parsing/dumping using js-yaml following the OASIS spec. Covers positional arguments, type coercion, async refinements, safe-mode loading, custom schemas, and error handling patterns—critical for seeding processes, CLI flag validation, and secure config file parsing. Sources last updated 2024; MIT and OASIS (public domain).
## License: MIT / OASIS (public domain)

# Data Serialization Formats (JSON, NDJSON, CSV)
## https://tools.ietf.org/html/rfc8259
## http://ndjson.org/
## https://datatracker.ietf.org/doc/html/rfc4180
Authoritative IETF specifications for JSON, NDJSON, and CSV, detailing syntax rules, data types, Unicode handling, streaming record separation, delimiters, and quoting conventions. Provides guidelines for strict parsing, streaming record handling, and interoperable output generation—essential for import/export commands and data-driven chart inputs. Public domain / CC0.
## License: IETF (public domain) / CC0

# Chart Rendering & SVG Technical Documentation
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://quickchart.io/documentation/
## https://developer.mozilla.org/docs/Web/SVG
## https://www.w3.org/TR/SVG2/
Unified reference for client- and server-side charting, combining Chart.js v4 configuration and plugin APIs, headless rendering via ChartjsNodeCanvas and node-canvas, QuickChart HTTP API usage, and MDN/W3C SVG2 vector graphics specifications. Emphasizes performance tuning (DPI scaling, concurrency), SVG serialization, axis and scale configuration, caching strategies, and DOM-independent rendering—key to both CLI and HTTP serve modes. Sources last updated 2024.
## License: MIT / Public API terms / CC-BY-SA / W3C License

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation covers image resizing, cropping, compositing, format conversion, and streaming pipelines for SVG-to-PNG conversion. Includes performance and memory optimization tips, lazy pipelines, concurrency controls, and buffer management—crucial for high-throughput plot exports in batch, report, and server modes. Last updated March 2024.
## License: Apache-2.0

# Testing Frameworks: Vitest and Supertest
## https://vitest.dev/
## https://github.com/visionmedia/supertest#readme
Official Vitest docs cover configuration, test suites, mocking, snapshot testing, and performance tuning for rapid unit and integration testing of CLI logic, parsers, and file I/O. Supertest provides end-to-end HTTP testing patterns for Express apps, including request chaining, assertions, and streaming response validation—essential for unit and integration tests of CLI and HTTP endpoints. Last updated 2024.
## License: MIT

# Express Official Documentation
## https://expressjs.com/
Detailed guide to middleware, routing, error handling, JSON and URL-encoded payloads, streaming responses, and security best practices. Includes examples for setting up RESTful APIs, content negotiation, and custom error middleware—critical for implementing the HTTP API serve mode. Last updated May 2024.
## License: MIT

# Math.js Documentation
## https://mathjs.org/docs/
Comprehensive reference on Math.js expression parsing, evaluator APIs, symbolic computation, custom functions, unit handling, and matrix operations. Demonstrates AST manipulation and secure evaluation patterns—crucial for robust formula-to-timeseries conversions in plot tasks. Last updated April 2024.
## License: Apache-2.0

# Templating and Markdown Conversion
## https://ejs.co/#docs
## https://markdown-it.github.io/
Integrated guidance for EJS templating (partials, includes, caching, sanitization) and Markdown-to-HTML conversion with markdown-it (plugin ecosystem, custom renderer rules). Supports dynamic report generation with narrative sections and embedded plots. Last updated 2024.
## License: MIT

# Conventional Changelog CLI Reference
## https://github.com/conventional-changelog/conventional-changelog
## https://www.npmjs.com/package/conventional-changelog-cli
Official docs for the conventional-changelog CLI suite, covering presets (Angular, etc.), configuration, and plugin ecosystems. Details generating and updating CHANGELOG.md in standard formats, CI integration, and automation—central to the --release workflow. Last updated 2024.
## License: MIT

# OpenAI Node.js Library Documentation
## https://platform.openai.com/docs/libraries/node-js-overview
Official OpenAI Node.js client guide covering installation, environment setup, authentication, and API reference for completions, chat, embeddings, and streaming. Includes code examples for streaming GPT responses, token usage best practices, and error handling patterns—essential for integrating agent-driven workflows. Last updated January 2024; governed by OpenAI Terms of Use.
## License: OpenAI Terms of Use

# CI/CD and Release Automation Tools
## https://cli.github.com/manual/
## https://docs.npmjs.com/cli/v10/commands/npm-publish
Authoritative guides for GitHub CLI (authentication, PR and release management, workflow scripting) and npm-publish (publish workflows, tagging strategies, dry-run, registry config). Underpin reliable --release processes and continuous delivery pipelines. Last updated 2024.
## License: MIT / CC0

# Vega-Lite Technical Specification
## https://vega.github.io/vega-lite/docs/spec.html
Comprehensive schema reference for Vega-Lite’s declarative visualization grammar, detailing mark types, encoding channels, scales, axes, legends, and data transforms. Includes JSON schema examples and guidelines for consistent chart configuration and potential interoperability with JSON-based chart exports. Last updated May 2023; authoritative by the Vega-Lite community under BSD-3-Clause.
## License: BSD-3-Clause

# JSON Schema: Understanding and Best Practices
## https://json-schema.org/understanding-json-schema/
In-depth guide to JSON Schema vocabulary, validation keywords, metadata annotations, and best practices, covering definitions, references, conditional schemas, data types, and format keywords. Provides actionable examples for crafting and validating JSON payloads—vital for ensuring correctness of JSON-format output and configuration validation. Last revised 2023; maintained under CC0.
## License: CC0

# OpenAPI 3.1 Specification
## https://spec.openapis.org/oas/v3.1.0.html
The official OpenAPI 3.1.0 specification, defining the structure of RESTful API contracts including components, paths, schemas, parameters, and security schemes. Provides formal JSON and YAML schema for generating client/server code and validating API definitions—directly applicable to designing the HTTP API serve mode. Published February 2021; maintained by the OpenAPI Initiative under the OpenAPI Specification License.
## License: OpenAPI Specification License