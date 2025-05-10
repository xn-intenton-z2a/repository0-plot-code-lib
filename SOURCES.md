# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive reference for Express v4.x core features including routing, middleware, request/response handling, and error utilities. This documentation details how to set up JSON and text parsers, define RESTful endpoints, handle query and body parameters, and structure middleware pipelines—essential for implementing the serve subcommand and parsing incoming requests. Last updated July 2023; Express.js is the de facto Node.js web framework with over 60k stars on GitHub.
## MIT

# Math.js Expression Evaluation
## https://mathjs.org/docs/expressions/parsing.html
Official guide to parsing and evaluating mathematical expressions using Math.js. Covers `evaluate()`, syntax rules, custom functions, and security considerations, enabling robust generation of data points from formulas. Includes examples for sampling, error handling, and performance optimization. Last published March 2024; Math.js is Apache-licensed and widely used in computation-intensive Node.js applications.
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
Zod is a TypeScript-friendly schema validation library enabling runtime validation, parsing, and transformation of user inputs. This source demonstrates defining schemas for CLI options and config files, merging defaults with flags, and generating human-readable error messages. Last commit April 2024; 27k GitHub stars attest to its popularity.
## MIT

# js-yaml Usage Guide
## https://github.com/nodeca/js-yaml#readme
Comprehensive documentation for loading, parsing, and dumping YAML in JavaScript. Explains supported YAML features, safe loading, custom schema definitions, and error handling—critical for `.plotrc.yaml` support. Last updated January 2024; js-yaml is widely adopted (12k stars).
## MIT

# cosmiconfig Configuration Loading
## https://github.com/davidtheclark/cosmiconfig
Provides patterns for discovering and loading configuration files (`.json`, `.yaml`, `.rc`) from project and home directories. Details caching, search stops, custom loaders, and error reporting—directly applicable to the `--config` flag implementation. Last update February 2024; over 5k GitHub stars.
## MIT

# csv-parse Documentation
## https://csv.js.org/parse/
Authoritative guide to streaming and synchronous CSV parsing in Node.js, supporting custom delimiters, header handling, and transformation hooks. Demonstrates error handling for malformed CSV, integration with async/await, and performance tips for large data files—key for implementing robust CSV support. Last release December 2023; CSV.js is MIT-licensed.
## MIT

# asciichart: ASCII Charts in JavaScript
## https://github.com/kroitor/asciichart
Lightweight library for plotting data in the terminal using ASCII. Covers chart configuration (height, offset, colors), custom line styles, and data normalization. Offers examples for time-series and scatter plots, which can be referenced or extended in the `renderAsciiChart` implementation. Last updated November 2023; MIT license and 1.8k stars.
## MIT

# SuperTest HTTP Assertions
## https://github.com/visionmedia/supertest
Documentation for SuperTest, a high-level abstraction for testing HTTP servers. Illustrates how to write expressive tests for GET and POST endpoints, chain assertions on status, headers, and bodies, and integrate with Vitest or Jest. Directly informs tests for `/plot` and `/stats`. Last commit May 2024; 15k stars.  
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official guide to Vitest, covering test declarations, mocking, spies, snapshot testing, and coverage reporting. Highlights best practices for asynchronous tests, CLI integration, and configuration—useful for unit testing CLI commands and handlers. Last updated April 2024; 16k GitHub stars.
## MIT

# yargs: Command-Line Parsing
## https://github.com/yargs/yargs
Comprehensive CLI toolkit for parsing arguments, generating usage documentation, and handling commands with nested options. Demonstrates declarative command definitions, middleware, and automatic help generation—relevant for replacing or extending manual `parsePlotOptions` logic. Last commit March 2024; over 26k stars.
## MIT

# commander.js CLI Framework
## https://github.com/tj/commander.js
Popular library for building command-line interfaces with subcommands, option parsing, and built-in help/version flags. Details command chaining, variadic arguments, and custom option processing—helpful reference for structuring CLI routing and consistent help output. Last updated June 2023; 27k stars.
## MIT

# Plotly.js JavaScript Graphing Library
## https://plotly.com/javascript/getting-started/
Tutorial for Plotly.js, an advanced open-source library for interactive web-based charts. Covers chart types, data binding, layout configuration, and exporting to static images—valuable for understanding feature sets and capabilities for potential future GUI or file-based renderers. Continuously maintained; documentation current as of 2024.
## MIT

# minimatch Glob Matching
## https://github.com/isaacs/minimatch
Reference for filename pattern matching using glob syntax in Node.js, often used for file discovery and filtering. Explains wildcard patterns, negation, and options for case sensitivity—useful if reseed or other features need to select files dynamically. Last published February 2024; ISC license.
## ISC

# Fastify Performance-Focused HTTP Framework
## https://www.fastify.io/docs/latest/
High-performance alternative to Express with built-in schema support and JSON validation. Shows plugin architecture, route definitions, and high-throughput benchmarks—informative for future optimizations or replacement of the Express-based server. Last updated March 2024; MIT license and 25k stars.