# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library offering a concise API for defining, composing, and refining schemas. This documentation covers default merging, union types, transformations, custom error formatting, and performance considerations—essential for enforcing input correctness across CLI flags, HTTP query parameters, and programmatic API options. Last commit April 2024; MIT license; 27k+ stars on GitHub.
## MIT

# Command-Line Argument Parsing
## https://github.com/substack/minimist
## https://github.com/yargs/yargs
Comparison of two leading Node.js CLI parsers. Minimist provides minimal tokenization for simple flags, while Yargs enables declarative nested commands, middleware, and automatic help/version support. Both docs cover boolean/string flags, alias mapping, default values, validation hooks, and middleware strategies—critical for robust CLI entrypoint design and consistent flag parsing in main(). Last commits: Minimist January 2024; Yargs March 2024; both MIT license.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official Vitest documentation detailing test declarations, spies, mocks, snapshot testing, parallel runs, and coverage reporting. Includes advanced strategies for async tests, mocking file system and console, isolating unit vs. integration tests, and configuration for watch mode—ensuring comprehensive and maintainable test coverage for plot generation, derivative logic, and HTTP endpoints. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# Chart.js Headless Rendering with Node Canvas
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
Combined guide for Chart.js configuration and headless server-side rendering using ChartJSNodeCanvas and Automattic’s Node-canvas. Core Chart.js docs cover chart types, scales, plugins, and theming. ChartJSNodeCanvas readme demonstrates instantiating the renderer, setting dimensions, and hooking callbacks. Node-canvas API docs detail canvas creation, context drawing methods, font registration, and SVG support—forming a complete pipeline for SVG/PNG exports. Docs last updated May–June 2024; MIT license.
## MIT

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance image processing for Node.js, including SVG-to-PNG conversion, resizing, compositing, and streaming pipelines. Documentation covers buffer handling, format encodings, metadata preservation, and performance tuning—crucial for implementing reliable and efficient PNG exports in the plot command. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive index of Node.js core modules (fs, path, stream, process, buffer, events, URL, and ESM via /api/esm.html), including method signatures, built-in Promise support, and security best practices. Primary reference for file I/O, module resolution, stream handling, and ES module interoperability throughout CLI, HTTP server, and programmatic functions. Updated with each Node.js release; maintained by the Node.js Foundation.
## CC-BY-SA

# MDN Scalable Vector Graphics Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
Authoritative tutorial on SVG fundamentals—coordinate systems, elements (paths, shapes, text), transforms, styling, and accessibility. Essential for crafting standards-compliant SVG output in plot subcommands, ensuring cross-browser compatibility and export fidelity. Last updated May 2024; maintained by Mozilla under CC-BY-SA.
## CC-BY-SA

# Minimatch Pattern Matching
## https://github.com/isaacs/minimatch#minimatch
Guide to using Minimatch for glob pattern matching in file paths. Covers wildcards, extglobs, negation, and options for case sensitivity—critical for implementing batch data-file imports and pattern-based configuration file loading within the CLI. Last updated March 2024; MIT license.
## MIT

# dotenv Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Official README for dotenv, a zero-dependency module that loads environment variables from a .env file into process.env. Covers variable expansion, override behavior, and security best practices—useful for managing secrets and customizing default CLI behavior. Last updated May 2024; BSD-2-Clause license.
## BSD-2-Clause

# CSV Format Specification (RFC 4180)
## https://datatracker.ietf.org/doc/html/rfc4180
IETF RFC specifying CSV conventions, including delimiters, quoting rules, escape sequences, header row usage, and newline handling. Critical for ensuring that CLI-generated CSV exports and CSV data-file inputs interoperate cleanly with downstream data-processing tools. Published October 2005; Public Domain.
## Public Domain

# Expr-Eval JavaScript Expression Parser
## https://github.com/silentmatt/expr-eval#readme
Lightweight JavaScript expression parser and evaluator with AST generation, custom functions, variables, and performance tuning. Documentation details compiler options, AST internals, and extension points—ideal for embedding user-provided formulas into generateSeries implementations with safe evaluation. Last commit June 2024; MIT license.
## MIT

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Official Express 4.x API docs covering routing, middleware, request/response objects, error handling patterns, and configuration of built-in parsers (bodyParser, static). Essential for implementing robust HTTP endpoints (/plot, /series, /health) and structuring JSON error responses. Last updated October 2023; MIT license.
## MIT

# js-yaml YAML Parser & Dumper
## https://github.com/nodeca/js-yaml#readme
Comprehensive README for js-yaml, the de-facto YAML parser and dumper in JavaScript. Covers safeLoad/safeDump, schema customization, custom type definitions, and performance considerations—vital for supporting YAML-based data-file inputs and config files. Last commit May 2024; MIT license.
## MIT

# OpenAPI Specification (OAS) 3.1
## https://spec.openapis.org/oas/v3.1.0.html
Formal specification for defining RESTful APIs, including schema objects, parameter serialization, authentication schemes, and content negotiation. Guides creation of machine-readable API definitions for the CLI’s HTTP server (/plot) and enables client code generation and interactive docs. Last updated February 2023; Apache-2.0 license; maintained by the OpenAPI Initiative.
## Apache-2.0

# Math.js API Documentation
## https://mathjs.org/docs/
Extensive documentation covering core and math-specific modules, expression parsing and compilation, units, complex numbers, matrices, and symbolic operations. Sections on compile(), evaluate(), derivative(), and custom function definitions are directly applicable to implementing expression parsing, evaluation, and automatic derivative calculation. Licensed under Apache-2.0; maintained by the Math.js community.
## Apache-2.0

# QuickChart Chart API
## https://quickchart.io/documentation
REST API documentation for QuickChart’s hosted Chart.js rendering service. Describes JSON-based chart configuration, URL encoding of options, custom dimensions, output formats (SVG/PNG/PDF), and performance considerations. Provides a no-setup alternative for generating plots remotely, useful for benchmarking and headless deployments. Public service; proprietary API license.## Pro