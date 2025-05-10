# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive reference for Express v4.x core features including routing, middleware, request/response handling, and error utilities. Describes how to parse JSON and text bodies, define RESTful GET/POST endpoints, validate query parameters, and implement robust error-handling middleware—crucial for the serve subcommand and HTTP POST body parsing in /plot and /stats endpoints. Last updated July 2023; Express.js is the de facto Node.js web framework with over 60k stars on GitHub.
## MIT

# Math.js Expression Evaluation
## https://mathjs.org/docs/expressions/parsing.html
Official guide to parsing and evaluating mathematical expressions using Math.js. Covers `evaluate()`, syntax rules, creating custom functions, and security best practices for sandboxing—enabling safe generation of data points from formulas within the plot, stats, and regression commands. Includes performance tips for large sample counts and detailed error-handling examples. Last published March 2024; Math.js is Apache-2.0 licensed and widely used in computation-intensive Node.js applications.
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library. Demonstrates defining and composing schemas for CLI flags, configuration objects, and JSON payloads, merging default values, and producing clear error messages—directly applicable to parsePlotOptions, parseStatsOptions, and config file loading with cosmiconfig. Last commit April 2024; MIT license, 27k+ GitHub stars.
## MIT

# js-yaml Usage Guide
## https://github.com/nodeca/js-yaml#readme
Comprehensive documentation for loading, parsing, and dumping YAML in JavaScript. Explains safe loading, custom schema definitions, and detailed error handling—critical for `.plotrc.yaml` support and YAML-based data or configuration file parsing. Last updated January 2024; js-yaml is MIT-licensed and widely adopted (12k+ stars).
## MIT

# cosmiconfig Configuration Loading
## https://github.com/davidtheclark/cosmiconfig
Patterns for discovering and loading configuration files (`.json`, `.yaml`, `.rc`) in project and home directories. Details search strategies, caching, custom loaders, and user-friendly error messages—directly informs the `--config` flag implementation and the merging of CLI flags with file defaults. Last update February 2024; MIT license, 5k+ stars.
## MIT

# SuperTest HTTP Assertions
## https://github.com/visionmedia/supertest
High-level abstraction for testing HTTP servers, illustrating how to write expressive tests for GET and POST endpoints, chain assertions on status codes, headers, and response bodies, and integrate seamlessly with Vitest. Directly supports tests for `/plot` and `/stats` endpoints. Last commit May 2024; MIT license, 15k+ stars.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official guide to Vitest, covering test declarations, spies/mocks, snapshot testing, parallel execution, and coverage reporting. Highlights best practices for asynchronous tests, mocking `fs` and `console`, and structuring unit versus integration tests—essential for reliable coverage of CLI commands and HTTP routes. Last updated April 2024; MIT license, 16k+ stars.
## MIT

# yargs: Command-Line Parsing
## https://github.com/yargs/yargs
Comprehensive CLI toolkit for declarative argument parsing, automatic help/version generation, nested commands, and middleware hooks. Demonstrates flag validation, usage output customization, and parsing strategies—relevant as an alternative to manual option parsing in `main()`. Last commit March 2024; MIT license, 26k+ stars.
## MIT

# Fastify Performance-Focused HTTP Framework
## https://www.fastify.io/docs/latest/
High-performance alternative to Express with built-in schema-based validation, plugin architecture, and detailed benchmarking. Includes route declaration patterns, JSON schema support, and logging strategies—informative for future optimization or replacement of the Express server in the `serve` command. Last updated March 2024; MIT license, 25k+ stars.
## MIT

# Chart.js CDN Installation and Usage
## https://www.chartjs.org/docs/latest/getting-started/installation.html#cdn
Official Chart.js documentation for embedding interactive charts in web pages via CDN. Covers chart types, data binding, layout configuration, responsive behaviors, and plugin integration—essential for the `--html` export feature generating standalone HTML pages. Last updated 2024; MIT license.
## MIT

# Node.js File System Promises API
## https://nodejs.org/api/fs.html#fs_fspromises_api
Official Node.js documentation for the File System Promises API (`fs.promises`). Details asynchronous methods like `readFile`, `writeFile`, `stat`, and `readdir`, with encoding options and error-handling patterns—core to config loading, CSV/YAML/JSON file parsing, and output writing in CLI commands. Last updated 2024; Node.js official reference.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive index of Node.js core modules, including `path`, `url`, `process`, `events`, `stream`, and more. Serves as the authoritative reference for language primitives and built-in APIs across the standard library. Last updated with every release; documentation is provided under CC-BY-SA and maintained by the Node.js Foundation.
## CC-BY-SA

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance image processing in Node.js, enabling conversion and manipulation of SVG, PNG, JPEG, and WebP formats. Covers APIs for creating, compositing, resizing, and converting image buffers—directly applicable to the `--png` export feature via SVG-to-PNG conversion. Last updated April 2024; MIT license, 16k+ GitHub stars.
## MIT

# Asciichart: Lightweight ASCII Charts
## https://github.com/kroitor/asciichart
Minimalistic library for rendering high-quality ASCII line charts in the terminal. Demonstrates API for scaling data, customizing axis labels, and styling characters—useful reference or alternative to the custom `renderAsciiChart` implementation for performance and feature comparisons. Last commit May 2024; MIT license, 4k+ GitHub stars.
## MIT

# Papa Parse: CSV Parsing Library
## https://www.papaparse.com/docs
Robust CSV parsing and stringifying library for JavaScript. Details configuration options for delimiter detection, header row management, large-stream processing, and error handling—informative for enhancing CSV support beyond the basic manual loader. Last updated March 2024; MIT license, 12k+ GitHub stars.
## MIT

# Simple Linear Regression (Algorithm Reference)
## https://en.wikipedia.org/wiki/Simple_linear_regression
Authoritative description of the simple linear regression model, including mathematical derivations for least-squares slope and intercept, coefficient of determination (`r²`), and statistical assumptions. Provides the essential formulas underpinning the `regression` command computations. Last modified January 2024; Wikipedia content licensed under CC-BY-SA.