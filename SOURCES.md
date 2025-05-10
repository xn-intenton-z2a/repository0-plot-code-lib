# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive reference for Express v4.x core features including routing, middleware, request/body parsing, static file serving, and error-handling utilities. Covers `express.json()` and `express.text()` for JSON and CSV payloads, CORS handling, and middleware order—essential for implementing the serve subcommand’s POST endpoints and error responses. Last updated July 2023; maintained by the Express Foundation with 60k+ stars.
## MIT

# Math.js Expression Evaluation
## https://mathjs.org/docs/expressions/parsing.html
Official guide to parsing and evaluating mathematical expressions with Math.js. Documents `evaluate()`, custom function creation, security sandboxing, and performance tuning for large input sets—directly applicable for safe, formula-based data generation in plot, stats, regression, and transform commands. Last published March 2024; Apache-2.0 license; used in computational tools worldwide.
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library. Demonstrates defining/composing schemas for CLI flags and config objects, default merging, and detailed error reports. Critical for enforcing input correctness in all command parsers and config file loading via cosmiconfig. Last commit April 2024; MIT license; 27k+ stars.
## MIT

# js-yaml Usage Guide
## https://github.com/nodeca/js-yaml#readme
Comprehensive documentation for loading, parsing, and dumping YAML in JavaScript. Covers safe loading, custom schema definitions, type casting, and injection prevention—vital for `.plotrc.yaml` support, HTTP YAML payload parsing, and file-based data ingestion. Last updated January 2024; MIT license; used in 12k+ repos.
## MIT

# cosmiconfig Configuration Loading
## https://github.com/davidtheclark/cosmiconfig
Patterns for discovering and loading configuration files (`.json`, `.yaml`, `.rc`) with caching and custom loaders. Explains search hierarchies, error messaging, and CLI overrides—key to the `--config` flag and merging defaults. Last update February 2024; MIT license; 5k+ stars.
## MIT

# SuperTest HTTP Assertions
## https://github.com/visionmedia/supertest
High-level HTTP server testing for Node.js. Demonstrates request chaining, assertion of status codes, headers, and bodies for JSON, text, or CSV responses. Crucial for robust testing of `/plot` and `/stats` endpoints using Vitest or Jest. Last commit May 2024; MIT license; 15k+ stars.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official Vitest documentation covering test declarations, spies, mocks, snapshot testing, parallel runs, and coverage reporting. Includes strategies for async tests, mocking `fs` and `console`, and organizing unit vs. integration tests—ensuring comprehensive coverage across all CLI commands and HTTP routes. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# yargs: Command-Line Parsing
## https://github.com/yargs/yargs
Declarative argument parsing library with nested commands, built-in help/version generation, middleware hooks, and validation. Exhibits flag definitions and custom parsing logic—offering a robust alternative for routing and option parsing in `main()`. Last commit March 2024; MIT license; 26k+ stars.
## MIT

# Chart.js CDN Installation and Usage
## https://www.chartjs.org/docs/latest/getting-started/installation.html#cdn
Official Chart.js guide for embedding interactive charts via CDN. Covers chart types, data binding, responsive layouts, and plugin integration—foundational for generating both interactive HTML output and server-side Chart.js configurations. Last updated 2024; MIT license.
## MIT

# Chart.js Node Canvas Server-Side Rendering
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Guide to using `chartjs-node-canvas` for headless server-side Chart.js rendering. Details instantiating `ChartJSNodeCanvas`, configuring dimensions, chartCallback hooks, and rendering to SVG or PNG buffers. Demonstrates converting SVG buffers to PNG via Sharp—directly powering the `--svg` and `--png` export features. Last updated May 2024; MIT license; 600+ stars.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive index of Node.js core modules (fs, path, stream, process, buffer, events, etc.), including detailed method references, built-in Promise support, and security considerations. Primary reference for all file I/O, HTTP server internals, and module resolution used throughout the CLI. Updated with each Node.js release; maintained by the Node.js Foundation.
## CC-BY-SA

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance image processing for Node.js, including SVG-to-PNG conversion, resizing, compositing, and streaming. Documents pipeline usage, buffer handling, and format encodings—critical for implementing high-fidelity `--png` exports in the plot command. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# Asciichart: Lightweight ASCII Charts
## https://github.com/kroitor/asciichart
Minimalistic library for rendering ASCII line charts in terminals. Covers data scaling, axis labeling, series styling, and performance optimizations—useful as a reference or alternative for custom `renderAsciiChart` logic. Last commit May 2024; MIT license; 4k+ stars.
## MIT

# Simple Linear Regression (Algorithm Reference)
## https://en.wikipedia.org/wiki/Simple_linear_regression
Authoritative explanation of least-squares linear regression, including mathematical derivations, algorithmic stability, and coefficient of determination. Underlies the CLI’s regression command implementation, informing numeric stability and rounding strategies. Last modified January 2024; CC-BY-SA.
## CC-BY-SA

# RFC 4180: The Common CSV Format
## https://datatracker.ietf.org/doc/html/rfc4180
IETF standard defining CSV syntax, quoting, header conventions, and edge-case handling. Essential for robust CSV parsing and validation in both CLI and HTTP endpoints. Published October 2005; Public Domain.
## Public Domain

# MDN Scalable Vector Graphics (SVG) Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
Comprehensive tutorial on SVG fundamentals—coordinate systems, shapes, paths, transforms, and styling. Crucial for generating accessible, standards-compliant SVG output in the plot subcommand. Last updated May 2024; maintained by Mozilla under CC-BY-SA.
## CC-BY-SA