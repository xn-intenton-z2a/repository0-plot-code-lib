# CLI Parsing and Validation
## https://github.com/colinhacks/zod
## https://github.com/substack/minimist
## https://github.com/yargs/yargs
A consolidated reference for defining, parsing, and validating CLI flags. Zod provides a type-safe schema definition and runtime validation essential for the new `--format` and `--input` options, ensuring correct types and clear error messages. Minimist offers minimal tokenization for simple workflows, while Yargs supports nested commands, middleware hooks, automatic help/version generation, and advanced flag validation—key for building a robust CLI interface. Last updates: Zod (April 2024), Minimist (January 2024), Yargs (March 2024); all widely adopted and community-maintained.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official Vitest documentation covering unit and integration testing, spies, mocks, snapshot testing, parallel execution, coverage reporting, and setup/teardown hooks. Includes advanced patterns for isolating file system and network interactions—critical for validating CSV/JSON input parsing, `--format` handling, PNG buffer generation, and HTTP endpoint behaviors. Last updated April 2024; maintained by the Vitest team.
## MIT

# Chart.js Rendering and QuickChart API
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://quickchart.io/documentation
Comprehensive guidelines for server-side chart rendering. Chart.js docs explain core chart types, scales, plugins, and theming. ChartjsNodeCanvas and Node-canvas readmes detail headless canvas instantiation, SVG font embedding, PNG buffer output, and performance tuning. QuickChart docs describe remote JSON-based chart generation with URL-encoded configs, custom dimensions, and multi-format output. Enables both local and hosted pipelines for SVG and PNG export. Updated June 2024.
## MIT; QuickChart: Proprietary

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance native image processing for Node.js: resizing, compositing, format conversion, and streaming pipelines. Documentation covers buffer handling, metadata retention, concurrency controls, and performance benchmarks—vital for processing SVG-to-PNG conversions and optimizing final output files. Last updated April 2024; maintained by Pixelplumbing.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Authoritative reference for core modules (fs, path, stream, buffer, events, URL, ESM, HTTP), including method signatures, event diagrams, built-in Promise support, and security guidelines. Primary resource for file I/O, module resolution, environment handling, and HTTP server implementation across CLI and future REST endpoints. Continuously updated with each LTS release.
## CC-BY-SA

# MDN Scalable Vector Graphics Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
In-depth tutorial on SVG syntax, shapes, paths, transforms, styling, and accessibility. Provides practical examples for generating compliant, responsive SVG output in the `plot` command, ensuring cross-browser fidelity and integration with headless canvases. Updated May 2024; CC-BY-SA.
## CC-BY-SA

# dotenv Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Official dotenv guide for loading and managing `.env` variables. Discusses variable expansion, override precedence, security best practices, and programmatic API—essential for handling API keys (e.g., QuickChart) and customizing default CLI behavior. Last updated May 2024.
## BSD-2-Clause

# CSV Handling and Parsing
## https://datatracker.ietf.org/doc/html/rfc4180
## https://csv.js.org/parse/
Unified coverage of CSV format conventions (RFC 4180) and a production-grade Node.js parsing library. The spec defines delimiters, quoting, escaping, and header semantics. The csv-parse library offers sync/async APIs, streaming, custom delimiters, relaxation options, and transform hooks—critical for robust `--input` CSV ingestion. Published October 2005; csv-parse maintained under MIT.
## Public Domain; MIT

# Expr-Eval JavaScript Expression Parser
## https://github.com/silentmatt/expr-eval#readme
Lightweight expression parser and AST-based evaluator with support for custom functions and variable binding. Documentation details grammar extensions, performance options, AST inspection, and security considerations—key for safely evaluating user-provided formulas in `generateData` and derivative computations. Last commit June 2024.
## MIT

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Official Express 4.x docs covering routing, middleware patterns, request/response APIs, error handling, and built-in parsers. Guides structuring HTTP endpoints (`/stats`, `/plot`), CORS configuration, content negotiation, and best practices for scalable API design. Last updated October 2023.
## MIT

# OpenAPI Specification (OAS) 3.1
## https://spec.openapis.org/oas/v3.1.0.html
Formal REST API description language defining schema objects, parameter serialization, authentication schemes, and content negotiation. Enables machine-readable API definitions for generating interactive docs and client SDKs for the HTTP server’s `/stats` and `/plot` endpoints. Updated February 2023.
## Apache-2.0

# Math.js API Documentation
## https://mathjs.org/docs/
Comprehensive reference for symbolic computation, matrix operations, unit support, and statistical functions. Sections on `compile()`, `evaluate()`, `derivative()`, and custom extensions support building the expression evaluation core and derivative-based statistics features. Licensed Apache-2.0; maintained by the Math.js community.
## Apache-2.0

# Supertest HTTP Assertions
## https://github.com/visionmedia/supertest
High-level HTTP testing framework for Node.js servers. Covers chaining requests, streaming binary payloads, header and status assertions, and integration with assertion libraries like Vitest—essential for end-to-end testing of CLI-invoked HTTP endpoints and binary image responses. Last updated March 2024.
## MIT

# D3.js Data-Driven Documents
## https://github.com/d3/d3/blob/main/API.md
Detailed API docs for D3 modules including scales, axes, shapes, and SVG path generators. Offers performance tuning tips, responsive chart patterns, and data-binding examples that can inspire custom SVG enhancements and interactive visualizations. Last updated March 2024; BSD-3-Clause.
## BSD-3-Clause

# Plotly.js JavaScript Graphing Library
## https://plotly.com/javascript/
Official Plotly.js guide for a broad set of chart types, declarative JSON configurations, and export mechanisms for SVG, PNG, and interactive HTML. Highlights performance optimization, responsive design, and embedding strategies—serving as an alternative or reference implementation for advanced plot features. Continuously updated; MIT.
## MIT

# Node.js Streams API
## https://nodejs.org/docs/latest/api/stream.html
In-depth reference on Node.js stream abstractions: Readable, Writable, Transform, and Duplex streams. Covers piping, backpressure, `stream.pipeline`, and error handling—critical for efficient large-file CSV/JSON ingestion and binary image output without loading entire payloads into memory. Continuously updated.
## CC-BY-SA