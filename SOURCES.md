# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive reference for Express v4.x core features including routing, middleware, request/response handling, and error utilities. Details body parsing via `express.json()`, URL-encoded parsers, static file serving, and error-handling patterns—critical for implementing the serve subcommand and HTTP POST body parsing for `/plot` and `/stats`. Covers how to configure middleware order, custom error handlers, and query parameter validation. Last updated July 2023; Express.js is the de facto Node.js web framework with 60k+ stars and maintained by the Express Foundation.
## MIT

# Math.js Expression Evaluation
## https://mathjs.org/docs/expressions/parsing.html
Official guide to parsing and evaluating mathematical expressions with Math.js. Documents the `evaluate()` function, syntax rules, custom function creation, and sandboxing strategies to prevent arbitrary code execution. Includes performance tuning for large input sizes and detailed error-handling examples—directly applicable for safe formula-based data generation in `plot`, `stats`, and `regression` commands. Last published March 2024; Math.js is Apache-2.0 licensed and widely used in computational applications.
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library. Demonstrates defining and composing schemas for CLI flags, configuration objects, and JSON/YAML payloads, merging default values, and generating detailed validation errors. Essential for enforcing input correctness in `parsePlotOptions`, `parseStatsOptions`, and configuration file loading with cosmiconfig. Last commit April 2024; MIT license, 27k+ stars.
## MIT

# js-yaml Usage Guide
## https://github.com/nodeca/js-yaml#readme
Comprehensive documentation for loading, parsing, and dumping YAML in JavaScript. Covers safe loading, custom schema definitions, type casting, and error handling patterns—vital for supporting `.plotrc.yaml` config files and YAML-based data import. Includes security notes on schema extensions and preventing code injection. Last updated January 2024; js-yaml is MIT-licensed and used in 12k+ repositories.
## MIT

# cosmiconfig Configuration Loading
## https://github.com/davidtheclark/cosmiconfig
Patterns for discovering and loading config files (`.json`, `.yaml`, `.rc`) in working and home directories. Explains search strategies, caching, custom loaders, and user-friendly error messages—key to implementing the `--config` flag and merging file defaults with CLI overrides. Last update February 2024; MIT license, 5k+ stars.
## MIT

# SuperTest HTTP Assertions
## https://github.com/visionmedia/supertest
High-level abstraction for testing HTTP servers in Node.js. Shows how to write fluent tests for GET and POST endpoints, chain assertions on status codes, headers, and JSON or text responses, and integrate with Vitest or Jest. Crucial for robust testing of `/plot` and `/stats` endpoints under Express. Last commit May 2024; MIT license, 15k+ stars.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official guide to Vitest, covering test declarations, spies, mocks, snapshot testing, parallel execution, and coverage reporting. Highlights techniques for async tests, mocking `fs` and `console`, and structuring unit vs. integration tests—ensuring reliable coverage for CLI commands and HTTP routes. Last updated April 2024; MIT license, 16k+ stars.
## MIT

# yargs: Command-Line Parsing
## https://github.com/yargs/yargs
Declarative argument parsing library for Node.js that provides nested commands, automatic help/version output, middleware hooks, and validation. Demonstrates flag definitions, custom parsing logic, and usage generation—offering an alternative to manual Option parsing in `main()`. Last commit March 2024; MIT license, 26k+ stars.
## MIT

# Chart.js CDN Installation and Usage
## https://www.chartjs.org/docs/latest/getting-started/installation.html#cdn
Official Chart.js documentation on embedding interactive charts via CDN. Covers chart types (line, bar, scatter), data binding, configuration options, responsive layouts, and plugin integration—fundamental for building the HTML export feature using `<canvas>` and Chart.js scripting. Last updated 2024; MIT license.
## MIT

# Node.js File System Promises API
## https://nodejs.org/api/fs.html#fs_fspromises_api
Authoritative reference for the Node.js File System Promises API (`fs.promises`). Details asynchronous methods like `readFile`, `writeFile`, `stat`, and directory operations, including encoding and flag options—integral for implementing config loading, data file parsing, and file exports in CLI commands. Last updated 2024; official Node.js docs.
## CC-BY-SA

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive index of Node.js core modules (`path`, `url`, `process`, `events`, `stream`, etc.). Serves as the primary reference for built-in APIs and primitives used throughout the codebase. Updated with every Node.js release; maintained by the Node.js Foundation. Documentation licensed under CC-BY-SA.
## CC-BY-SA

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance image processing in Node.js, including SVG-to-PNG conversion, resizing, compositing, and format encoding. Demonstrates using `sharp()` pipelines and buffer handling—critical for the `--png` export feature in the plot command. Last updated April 2024; MIT license, 16k+ stars.
## MIT

# Asciichart: Lightweight ASCII Charts
## https://github.com/kroitor/asciichart
Minimalistic library for rendering high-quality ASCII line charts in the terminal. Details API for data scaling, axis label customization, and series styling—useful for benchmarking or replacing custom `renderAsciiChart` logic for performance and additional formatting options. Last commit May 2024; MIT license, 4k+ stars.
## MIT

# Papa Parse: CSV Parsing Library
## https://www.papaparse.com/docs
Robust CSV parsing and generation library for JavaScript. Covers delimiter autodetection, header row handling, streaming large files, and configuring error callbacks—informative for extending CSV support beyond the basic loader. Last updated March 2024; MIT license, 12k+ stars.
## MIT

# Simple Linear Regression (Algorithm Reference)
## https://en.wikipedia.org/wiki/Simple_linear_regression
Authoritative explanation of the least-squares linear regression model, including derivations for slope, intercept, and coefficient of determination (`r²`). Describes algorithmic considerations for numerical stability and rounding—underpins the `regression` command implementation. Last modified January 2024; content under CC-BY-SA.
## CC-BY-SA

# CLI-Chart: Terminal Plotting Library
## https://github.com/guylabs/cli-chart#readme
Node.js library for rendering line, bar, and scatter charts in the terminal using Unicode and ASCII characters. Illustrates grid scaling, axis tick placement, and color theming in the console—providing practical examples for enhancing or refactoring the existing ASCII chart renderer with richer features and improved readability. Last updated February 2024; MIT license, 2k+ stars.
## MIT