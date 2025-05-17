# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library offering a concise API for defining, composing, and refining schemas. Documentation covers default merging, union types, transformations, custom error formatting, schema inference, and performance considerations1 critical for validating CLI flags, HTTP query parameters, and programmatic API inputs. Last commit April 2024; widely adopted with 27k+ stars, maintained by the author and community.
## MIT

# Node.js CLI Parsing Libraries
## https://github.com/substack/minimist
## https://github.com/yargs/yargs
Compares two leading Node.js CLI parsers: Minimist provides minimal tokenization suitable for simple flag-based CLIs, while Yargs offers declarative nested commands, middleware support, automatic help/version generation, and advanced validation hooks. Both document boolean/string flags, alias mapping, default values, and middleware patterns1 essential for designing robust CLI subcommands like `stats` and `plot` with consistent argument parsing and error handling. Last commits: Minimist January 2024; Yargs March 2024.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official Vitest documentation detailing test declarations, spies, mocks, snapshot testing, parallel execution, and coverage reporting. Includes advanced strategies for isolating unit vs. integration tests, mocking file system and network calls, configuring watch mode, and using setup/teardown hooks1 ensuring comprehensive test coverage for statistics computations (`computeSummaryStats`, `computeHistogram`, `computeRegression`), CLI behaviors, and HTTP endpoints. Last updated April 2024; maintained by the Vitest team.
## MIT

# Chart.js Rendering and QuickChart API
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://quickchart.io/documentation
Comprehensive guide and examples for server-side rendering of Chart.js charts. Chart.js docs cover core chart types, scales, plugins, and theming. ChartJSNodeCanvas and Node-canvas readmes describe headless instantiation, context creation, font registration, SVG/PNG output, and performance tuning. QuickChart REST API docs demonstrate remote rendering via JSON chart configs, URL encoding, custom dimensions, and output formats (SVG/PNG/PDF)1 providing both local and hosted rendering pipelines. Docs last updated MayJune 2024.
## MIT; QuickChart: Proprietary

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance, native image processing for Node.js: resizing, compositing, format conversion (including SVG-to-PNG), and streaming pipelines. Documentation details buffer handling, metadata preservation, performance benchmarking, and multi-threaded optimizations1 crucial for efficient final image exports in the `plot` command. Last updated April 2024; maintained by Pixelplumbing.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive reference of Node.js core modules (fs, path, stream, buffer, events, URL, ESM, HTTP/HTTPS), complete with method signatures, event diagrams, built-in Promise support, and security best practices. Primary resource for implementing file I/O, module resolution, HTTP servers, and global APIs (e.g., fetch) used throughout CLI and HTTP routes. Continuously updated by the Node.js Foundation with each LTS release.
## CC-BY-SA

# MDN Scalable Vector Graphics Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
Authoritative tutorial on SVG fundamentals: shapes, paths, text, transforms, styling, and accessibility features. Provides practical examples for generating compliant SVG output in `plot` subcommands, ensuring cross-platform rendering and export fidelity. Updated May 2024; maintained under CC-BY-SA by Mozilla.
## CC-BY-SA

# dotenv Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Official README for dotenv, enabling loading of `.env` files into `process.env`. Documents variable expansion, override behaviors, and security best practices1 used for managing secrets and customizing default CLI behavior (e.g., API keys for QuickChart). Last updated May 2024.
## BSD-2-Clause

# CSV Format Specification (RFC 4180)
## https://datatracker.ietf.org/doc/html/rfc4180
IETF standard defining CSV conventions: delimiter rules, quoting, escaping, header usage, and newline handling. Essential for ensuring that CLI-generated CSV exports and CLI- or HTTP-imported CSV inputs interoperate with downstream tooling. Published October 2005.
## Public Domain

# Expr-Eval JavaScript Expression Parser
## https://github.com/silentmatt/expr-eval#readme
Lightweight JavaScript expression parser and evaluator with AST generation, custom functions, variable support, and performance options. Documentation explains grammar, compiler settings, AST inspection, and extension hooks1 critical for safely embedding and evaluating user-provided formulas in `generateData` and derivative computations. Last commit June 2024.
## MIT

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Official Express 4.x documentation covering routing, middleware architecture, request/response objects, error handling, and configuration of built-in parsers. Guide for structuring HTTP endpoints (`/stats`, `/plot`), CORS header management, and content negotiation best practices. Last updated October 2023.
## MIT

# OpenAPI Specification (OAS) 3.1
## https://spec.openapis.org/oas/v3.1.0.html
Formal specification for defining RESTful APIs: schema objects, parameter serialization, authentication schemes, and content negotiation. Guides creation of machine-readable API definitions for the HTTP server’s `/stats` and `/plot` endpoints, facilitating client code generation and interactive documentation. Updated February 2023.
## Apache-2.0

# Math.js API Documentation
## https://mathjs.org/docs/
Extensive documentation for the Math.js library’s core modules, expression parsing, symbolic computation, units, matrices, and statistical functions. Sections on `compile()`, `evaluate()`, `derivative()`, and custom function definitions support implementing both expression evaluation and derivative calculations. Licensed Apache-2.0; maintained by the Math.js community.
## Apache-2.0

# Supertest HTTP Assertions
## https://github.com/visionmedia/supertest
Supertest provides a high-level abstraction for testing HTTP servers in Node.js. Documentation covers request chaining, response assertions, streaming binary responses, header testing, and integration with assertion frameworks like Vitest1 useful for verifying `/stats` and future `/plot` endpoints, including raw byte and base64-encoded responses. Last updated March 2024.
## MIT

# D3.js Data-Driven Documents
## https://github.com/d3/d3/blob/main/API.md
Comprehensive API documentation for D3.js modules including scales, shapes, axes, and path generators. Provides detailed examples for using `scaleLinear`, `axisBottom`, and `line` generators to produce optimized SVG paths, with guidance on responsive charts and performance best practices. Last updated March 2024; maintained under BSD-3-Clause by the D3 community.
## BSD-3-Clause

# Plotly.js JavaScript Graphing Library
## https://plotly.com/javascript/
Official Plotly.js documentation covering a wide range of chart types (line, scatter, histogram, 3D plots), declarative JSON configuration, and export options for SVG, PNG, and interactive HTML. Highlights customization, responsiveness, performance optimization, and embedding strategies1 offering an alternative rendering pipeline and rich interactivity features. Continuously updated; licensed under MIT by Plotly.
## MIT