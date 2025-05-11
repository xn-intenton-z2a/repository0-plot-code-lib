# Math.js Expression Evaluation
## https://mathjs.org/docs/expressions/parsing.html
Official guide to parsing and evaluating mathematical expressions with Math.js. Documents `evaluate()`, custom function creation, security sandboxing, and performance tuning for large input sets—directly applicable for safe, formula-based data generation in `plot`, `stats`, `regression`, and `transform` commands. Last published March 2024; Apache-2.0 license; used in computational tools worldwide.
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-first runtime schema validation library. Demonstrates defining and composing schemas for CLI flags and config objects, default merging, and detailed error reporting. Critical for enforcing input correctness across all command parsers and config loading via Cosmiconfig. Last commit April 2024; MIT license; 27k+ stars on GitHub.
## MIT

# js-yaml Usage Guide
## https://github.com/nodeca/js-yaml#readme
Comprehensive documentation for loading, parsing, and dumping YAML in JavaScript. Covers safe loading, custom schema definitions, type casting, and injection prevention—vital for `.plotrc.yaml` support, HTTP YAML payload parsing, and file-based data ingestion. Last updated January 2024; MIT license; used in 12k+ repositories.
## MIT

# Cosmiconfig Configuration Loading
## https://github.com/davidtheclark/cosmiconfig
Patterns for discovering and loading configuration files (`.json`, `.yaml`, `.rc`) with caching and custom loaders. Explains search hierarchies, error messaging, and CLI overrides—key to the `--config` flag and merging defaults. Last update February 2024; MIT license; 5k+ stars.
## MIT

# Command-Line Argument Parsing
## https://github.com/substack/minimist
## https://github.com/yargs/yargs
Unified overview of two leading Node.js CLI parsers: Minimist for minimalist and fast argument tokenization and Yargs for declarative nested commands, middleware, and built-in help/version support. Covers string/boolean flag handling, alias mapping, default values, validation hooks, and middleware strategies—essential for robust routing and option parsing in `main()`. Minimist last commit January 2024; Yargs last commit March 2024; both MIT license; foundational in many CLI tools.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official Vitest documentation covering test declarations, spies, mocks, snapshot testing, parallel runs, and coverage reporting. Includes strategies for async tests, mocking `fs` and `console`, and organizing unit vs. integration tests—ensuring comprehensive coverage across all CLI commands and data processing routines. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# Chart.js
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Authoritative source for Chart.js configuration and headless server-side rendering via ChartJSNodeCanvas. Core documentation details chart types, plugin architecture, scales, animations, theme customization, and performance tuning. The Node Canvas guide covers instantiating `ChartJSNodeCanvas`, configuring dimensions, `chartCallback` hooks, and rendering to SVG or PNG buffers, demonstrating conversion to PNG via Sharp—directly powering the `--svg` and `--png` export features. Core docs last updated May 2024; Node Canvas last updated May 2024; both MIT license; widely adopted with 75k+ and 600+ stars respectively.
## MIT

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance image processing for Node.js, including SVG-to-PNG conversion, resizing, compositing, and streaming. Documents pipeline usage, buffer handling, and format encodings—critical for implementing high-fidelity `--png` exports in the `plot` command. Last updated April 2024; MIT license; 16k+ stars.
## MIT

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
Comprehensive index of Node.js core modules (`fs`, `path`, `stream`, `process`, `buffer`, `events`, and ESM via `/api/esm.html`), including detailed method references, built-in Promise support, and security considerations. Primary reference for all file I/O, module resolution, and ECMAScript Module usage used throughout the CLI. Updated with each Node.js release; maintained by the Node.js Foundation; CC-BY-SA.
## CC-BY-SA

# MDN Scalable Vector Graphics Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
Comprehensive tutorial on SVG fundamentals—coordinate systems, shapes, paths, transforms, and styling. Crucial for generating accessible, standards-compliant SVG output in the `plot` subcommand. Last updated May 2024; maintained by Mozilla under CC-BY-SA.
## CC-BY-SA

# Vega-Lite Declarative Grammar
## https://vega.github.io/vega-lite/docs/
Concise specification for Vega-Lite, a high-level grammar enabling declarative JSON-based chart definitions. Covers transforms, encoding channels, mark types, scales, axes, layering, and data schemas. Offers extensive examples and integration guides—beneficial for advanced or alternative rendering strategies. Last updated April 2024; BSD-3-Clause; 15k+ stars.
## BSD-3-Clause

# Minimatch Pattern Matching
## https://github.com/isaacs/minimatch#minimatch
Guide to using Minimatch for glob pattern matching in file paths. Covers wildcards, extglobs, negation, and options for case sensitivity—essential for implementing batch processing of multiple data files or pattern-based config loading in CLI workflows. Last update March 2024; MIT license; foundational in many Node.js tooling.
## MIT

# dotenv Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Official README for dotenv, a zero-dependency module that loads environment variables from a `.env` file into `process.env`. Covers variable expansion, override behavior, and best practices for managing configuration outside of code—handy for customizing CLI defaults or secret keys in automation scripts. Last updated May 2024; BSD-2-Clause license.
## BSD-2-Clause

# Plotly.js Graphing Library
## https://plotly.com/javascript/
Comprehensive official documentation for Plotly.js, covering interactive and static chart creation, layout configuration, and Node.js image export via Orca or Kaleido. Provides code samples for scatter, line, bar, and area charts, as well as advanced features like subplots, annotations, and animations—facilitating exploration of alternative or advanced rendering strategies for CLI-generated plots. Last updated July 2024; MIT license; widely adopted in data visualization projects.
## MIT

# CSV Format Specification (RFC 4180)
## https://datatracker.ietf.org/doc/html/rfc4180
IETF RFC specifying CSV file format conventions including field delimiters, quoting rules, escape sequences, header row usage, and line breaks. Critical for ensuring compliance and interoperability of the CLI's CSV output with downstream tools and data pipelines. Published October 2005; IETF Trust; authoritative reference; Public Domain.
## Public Domain

# Expr-Eval JavaScript Expression Parser
## https://github.com/silentmatt/expr-eval#readme
Lightweight JavaScript expression parser and evaluator supporting AST generation, custom functions, variables, and performance tuning. Ideal for compile user-provided formulas into callable JS functions for `generateSeries` implementations, with support for unary and multi-variable expressions. Last commit June 2024; MIT license; ~1.5k stars.
## MIT