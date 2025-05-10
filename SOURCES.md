# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive reference for Express v4.x core features including routing, middleware, request/response handling, and error utilities. Details body parsing via `express.json()`, `express.text()`, URL-encoded parsers, static file serving, and error-handling patterns—crucial for implementing the serve subcommand, POST body parsing for /plot and /stats, and CSV payload handling in HTTP endpoints. Last updated July 2023; Express.js is the de facto Node.js web framework with 60k+ stars and maintained by the Express Foundation.
## MIT

# Math.js Expression Evaluation
## https://mathjs.org/docs/expressions/parsing.html
Official guide to parsing and evaluating mathematical expressions with Math.js. Documents the `evaluate()` function, syntax rules, custom function creation, and sandboxing strategies to prevent arbitrary code execution. Includes performance tuning for large input sizes and detailed error-handling examples—directly applicable for safe formula-based data generation in plot, stats, regression, and transform commands. Last published March 2024; Math.js is Apache-2.0 licensed and widely used in computational applications.
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library. Demonstrates defining and composing schemas for CLI flags, configuration objects, and JSON/YAML payloads, merging default values, and generating detailed validation errors. Essential for enforcing input correctness in `parsePlotOptions`, `parseStatsOptions`, `parseRegressionOptions`, `parseTransformOptions`, and configuration file loading with cosmiconfig. Last commit April 2024; MIT license, 27k+ stars.
## MIT

# js-yaml Usage Guide
## https://github.com/nodeca/js-yaml#readme
Comprehensive documentation for loading, parsing, and dumping YAML in JavaScript. Covers safe loading, custom schema definitions, type casting, and error handling patterns—vital for supporting `.plotrc.yaml` config files, file-based data loading, and HTTP YAML payload parsing. Includes security notes on schema extensions and preventing code injection. Last updated January 2024; js-yaml is MIT-licensed and used in 12k+ repositories.
## MIT

# cosmiconfig Configuration Loading
## https://github.com/davidtheclark/cosmiconfig
Patterns for discovering and loading config files (.json, .yaml, .rc) in working and home directories. Explains search strategies, caching, custom loaders, and user-friendly error messages—key to implementing the `--config` flag and merging file defaults with CLI overrides. Last update February 2024; MIT license, 5k+ stars.
## MIT

# SuperTest HTTP Assertions
## https://github.com/visionmedia/supertest
High-level abstraction for testing HTTP servers in Node.js. Shows how to write fluent tests for GET and POST endpoints, chain assertions on status codes, headers, and JSON or text responses, and integrate with Vitest or Jest. Crucial for robust testing of HTTP endpoints in the serve subcommand. Last commit May 2024; MIT license, 15k+ stars.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official guide to Vitest, covering test declarations, spies, mocks, snapshot testing, parallel execution, and coverage reporting. Highlights techniques for async tests, mocking `fs` and `console`, and structuring unit vs. integration tests—ensuring reliable coverage for all CLI commands and HTTP routes. Last updated April 2024; MIT license, 16k+ stars.
## MIT

# yargs: Command-Line Parsing
## https://github.com/yargs/yargs
Declarative argument parsing library for Node.js that provides nested commands, automatic help/version output, middleware hooks, and validation. Demonstrates flag definitions, custom parsing logic, and usage generation—offering an alternative to manual option parsing in `main()`. Last commit March 2024; MIT license, 26k+ stars.
## MIT

# Chart.js CDN Installation and Usage
## https://www.chartjs.org/docs/latest/getting-started/installation.html#cdn
Official Chart.js documentation on embedding interactive charts via CDN. Covers chart types, data binding, configuration options, responsive layouts, and plugin integration—fundamental for generating HTML output with dynamic Chart.js visualizations. Last updated 2024; MIT license.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive index of Node.js core modules (path, stream, process, buffer, events, etc.), including built-in promises. Serves as the primary reference for standard APIs used across CLI commands, file I/O, module resolution, and HTTP server implementation. Updated with every Node.js release; maintained by the Node.js Foundation.
## CC-BY-SA

# Node.js File System Promises API
## https://nodejs.org/api/fs.html#fs_fspromises_api
Authoritative reference for the Node.js File System Promises API (`fs.promises`). Details asynchronous methods like `readFile`, `writeFile`, `stat`, and directory operations—integral for implementing configuration loading, data file parsing, HTTP file exports, and CLI output writing. Last updated 2024; official Node.js docs.
## CC-BY-SA

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance image processing in Node.js, including SVG-to-PNG conversion, resizing, compositing, and format encoding. Demonstrates using `sharp()` pipelines and buffer handling—critical for the `--png` export feature in the plot command. Last updated April 2024; MIT license, 16k+ stars.
## MIT

# Asciichart: Lightweight ASCII Charts
## https://github.com/kroitor/asciichart
Minimalistic library for rendering high-quality ASCII line charts in the terminal. Details API for data scaling, axis label customization, and series styling—useful for benchmarking or replacing custom `renderAsciiChart` logic for additional formatting and performance. Last commit May 2024; MIT license, 4k+ stars.
## MIT

# Simple Linear Regression (Algorithm Reference)
## https://en.wikipedia.org/wiki/Simple_linear_regression
Authoritative explanation of the least-squares linear regression model, including derivations for slope, intercept, and coefficient of determination (r²). Describes algorithmic considerations for numerical stability and rounding—underpins the regression command implementation. Last modified January 2024; content under CC-BY-SA.
## CC-BY-SA

# RFC 4180: The Common CSV Format
## https://datatracker.ietf.org/doc/html/rfc4180
Official IETF specification defining the common format for CSV files, covering field delimiting, header row conventions, escape sequences for quotes, handling of embedded line breaks, and edge-case semantics. Essential for robust CSV parsing and validation in CLI data loading and HTTP CSV payload handling. Published October 2005; authoritative IETF standard.
## Public Domain

# MDN Scalable Vector Graphics (SVG) Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
Comprehensive tutorial on Scalable Vector Graphics (SVG), covering document structure, coordinate systems, basic shapes (path, circle, rect), text elements, transforms, and styling. Critical for generating valid and accessible SVG output in the plot command, ensuring proper rendering of axes and data series. Last updated May 2024; maintained by Mozilla under CC-BY-SA.
## CC-BY-SA