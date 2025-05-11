# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library. Demonstrates defining, composing, and refining schemas for CLI flags, HTTP request bodies, and config objects. Covers default merging, union types, transformations, and detailed custom error reporting—essential for enforcing input correctness across all CLI commands, HTTP endpoints, and config loading. Last commit April 2024; MIT license; 27k+ stars on GitHub.
## MIT

# Command-Line Argument Parsing
## https://github.com/substack/minimist
## https://github.com/yargs/yargs
Unified overview of two leading Node.js CLI parsers: Minimist for minimalist tokenization, and Yargs for declarative nested commands, middleware, and automatic help/version support. Covers boolean/string flags, alias mapping, default values, validation hooks, and middleware strategies—critical for routing and option parsing in main(). Minimist last commit January 2024; Yargs last commit March 2024; both MIT license.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official Vitest documentation covering test declarations, spies, mocks, snapshot testing, parallel runs, and coverage reporting. Includes strategies for async tests, mocking fs and console, and organizing unit vs. integration tests—ensuring comprehensive coverage across all CLI commands and data processing routines. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# Chart.js & Node Canvas Rendering
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Authoritative Chart.js configuration guide and headless server-side rendering via ChartJSNodeCanvas. Core docs detail chart types, plugin architecture, scales, and theme customization. Node Canvas guide demonstrates instantiating ChartJSNodeCanvas, configuring dimensions, chartCallback hooks, and rendering to SVG or PNG buffers via Sharp—driving svg and png exports. Docs last updated May 2024; MIT license; widely adopted with 75k+ and 600+ stars.
## MIT

# Node-canvas (Automattic Canvas)
## https://github.com/Automattic/node-canvas#readme
Detailed API for Node Canvas providing createCanvas, context methods, image encoding, font registration, and SVG support. Crucial for headless rendering with Chart.js in both PNG and SVG modes, demonstrating performance considerations, buffer handling, and streaming output patterns. Last updated June 2024; MIT license; 21k+ stars.
## MIT

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance image processing for Node.js, including SVG-to-PNG conversion, resizing, compositing, and streaming. Documents pipeline usage, buffer handling, and format encodings—critical for implementing high-fidelity png exports in the plot command. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive index of Node.js core modules (fs, path, stream, process, buffer, events, and ESM via /api/esm.html), including detailed method references, built-in Promise support, and security considerations. Primary reference for all file I/O, module resolution, and ECMAScript Module usage throughout the CLI and HTTP server. Updated with each Node.js release; maintained by the Node.js Foundation.
## CC-BY-SA

# MDN Scalable Vector Graphics Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
Comprehensive tutorial on SVG fundamentals—coordinate systems, shapes, paths, transforms, styling, and text. Crucial for generating standards-compliant SVG output in plot subcommands, ensuring broad compatibility with consumers. Last updated May 2024; maintained by Mozilla under CC-BY-SA.
## CC-BY-SA

# Minimatch Pattern Matching
## https://github.com/isaacs/minimatch#minimatch
Guide to using Minimatch for glob pattern matching in file paths. Covers wildcards, extglobs, negation, and options for case sensitivity—essential for implementing batch processing of multiple data files or pattern-based config loading in CLI workflows. Last update March 2024; MIT license; foundational in many Node.js tools.
## MIT

# dotenv Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Official README for dotenv, a zero-dependency module that loads environment variables from a .env file into process.env. Covers variable expansion, override behavior, and best practices for managing configuration outside of code—handy for customizing CLI defaults or secret keys in automation scripts and HTTP server. Last updated May 2024; BSD-2-Clause license.
## BSD-2-Clause

# CSV Format Specification (RFC 4180)
## https://datatracker.ietf.org/doc/html/rfc4180
IETF RFC specifying CSV conventions including field delimiters, quoting rules, escape sequences, header row usage, and line breaks. Critical for ensuring compliance and interoperability of the CLI's CSV output with downstream tools and data pipelines. Published October 2005; IETF Trust; Public Domain.
## Public Domain

# Expr-Eval JavaScript Expression Parser
## https://github.com/silentmatt/expr-eval#readme
Lightweight JavaScript expression parser and evaluator supporting AST generation, custom functions, variables, and performance tuning. Ideal for compiling user-provided formulas into callable JS functions for generateSeries implementations, with support for unary and multi-variable expressions. Last commit June 2024; MIT license; ~1.5k stars.
## MIT

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Official Express 4.x API documentation detailing routing, middleware, request/response objects, error handling, and configuration of built-in parsers (bodyParser, static). Essential for implementing HTTP API endpoints (series, plot, health), request validation, and structured error responses. Last updated October 2023; MIT license; authoritative for Node.js web servers.
## MIT

# js-yaml YAML Parser & Dumper
## https://github.com/nodeca/js-yaml#readme
Official repository for js-yaml, the de-facto YAML parser and dumper for JavaScript. Documents safeLoad, safeDump, loadAll, dump, schema customization, and custom type handling—valuable for supporting YAML-based configuration files and advanced CLI or HTTP API configurations. Last commit May 2024; MIT license; 7k+ stars.
## MIT

# OpenAPI Specification (OAS) 3.1
## https://spec.openapis.org/oas/v3.1.0.html
Comprehensive specification for defining RESTful APIs, including data models, parameter types, request/response schemas, authentication mechanisms, and content negotiation. Essential for formally documenting the /api/series, /api/plot, and /api/health endpoints and enabling client generation tools and interactive API explorers. Last updated February 2023; Apache-2.0 license; maintained by the OpenAPI Initiative.
## Apache-2.0
