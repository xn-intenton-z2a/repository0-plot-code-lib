# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Comprehensive reference for Express v4.x core features including routing, middleware, request/response handling, and error utilities. This documentation describes how to parse JSON and text bodies, define RESTful GET/POST endpoints, handle query parameters, and implement error-handling middleware—crucial for the serve subcommand and HTTP POST body parsing in /plot and /stats endpoints. Last updated July 2023; Express.js is the de facto Node.js web framework with over 60k stars on GitHub.
## MIT

# Math.js Expression Evaluation
## https://mathjs.org/docs/expressions/parsing.html
Official guide to parsing and evaluating mathematical expressions using Math.js. Covers `evaluate()`, syntax rules, custom functions, and security considerations, enabling generation of data points from formulas within the plot and stats commands. Includes performance tips for large sample counts and error-handling examples. Last published March 2024; Math.js is Apache-2.0 licensed and widely used in computation-intensive Node.js applications.
## Apache-2.0

# Zod Schema Validation
## https://github.com/colinhacks/zod
TypeScript-friendly runtime schema validation library. Demonstrates defining schemas for CLI flags and configuration objects, merging defaults, and producing clear error messages—directly applicable to future refactoring of parsePlotOptions, parseStatsOptions, and config file loading with cosmiconfig. Last commit April 2024; MIT license, 27k+ GitHub stars.
## MIT

# js-yaml Usage Guide
## https://github.com/nodeca/js-yaml#readme
Comprehensive documentation for loading, parsing, and dumping YAML in JavaScript. Explains safe loading, custom schema definitions, and detailed error handling—critical for `.plotrc.yaml` support and loading data or configuration files. Last updated January 2024; js-yaml is MIT-licensed and widely adopted (12k+ stars).
## MIT

# cosmiconfig Configuration Loading
## https://github.com/davidtheclark/cosmiconfig
Patterns for discovering and loading configuration files (`.json`, `.yaml`, `.rc`) in project and home directories. Details caching, search stops, custom loaders, and error messaging—directly informs the `--config` flag implementation and merging of CLI flags with file defaults. Last update February 2024; MIT license, 5k+ stars.
## MIT

# SuperTest HTTP Assertions
## https://github.com/visionmedia/supertest
High-level abstraction for testing HTTP servers, illustrating how to write expressive tests for GET and POST endpoints, chain assertions on status codes, headers, and response bodies, and integrate with Vitest. Directly supports tests for `/plot` and `/stats` endpoints. Last commit May 2024; MIT license, 15k+ stars.
## MIT

# Vitest Testing Guide
## https://vitest.dev/guide/
Official guide to Vitest, covering test declarations, spies/mocks, snapshot testing, and coverage reporting. Highlights best practices for asynchronous tests and mocking `fs` and `console`, essential for unit tests of CLI commands and HTTP routes. Last updated April 2024; MIT license, 16k+ stars.
## MIT

# yargs: Command-Line Parsing
## https://github.com/yargs/yargs
Comprehensive CLI toolkit for declarative argument parsing, automatic help generation, nested commands, and middleware. Demonstrates patterns for flag validation and usage output—relevant as an alternative to manual `parsePlotOptions` and `parseStatsOptions`. Last commit March 2024; MIT license, 26k+ stars.
## MIT

# commander.js CLI Framework
## https://github.com/tj/commander.js
Popular library for building command-line interfaces with subcommands, option parsing, and built-in help/version flags. Covers command chaining, variadic arguments, and custom output formatting—useful reference for structuring CLI routing and help text in `main()`. Last updated June 2023; MIT license, 27k+ stars.
## MIT

# minimatch Glob Matching
## https://github.com/isaacs/minimatch
Reference for filename pattern matching using glob syntax in Node.js. Explains wildcard patterns, negation, and case-sensitivity options—applicable for file selection in potential reseed or batch operations. Last published February 2024; ISC license.
## ISC

# Fastify Performance-Focused HTTP Framework
## https://www.fastify.io/docs/latest/
High-performance alternative to Express with built-in schema-based validation and plugin architecture. Includes benchmarks, route declaration patterns, and JSON schema support—informative for future optimization or replacement of the Express server in the `serve` command. Last updated March 2024; MIT license, 25k+ stars.
## MIT

# Chart.js CDN Installation and Usage
## https://www.chartjs.org/docs/latest/getting-started/installation.html#cdn
Official Chart.js documentation for embedding interactive charts in web pages via CDN. Covers chart types, data binding, layout configuration, and responsive behaviors—essential for the `--html` export feature generating standalone HTML charts. Last updated 2024; MIT license.
## MIT

# Node.js File System Promises API
## https://nodejs.org/api/fs.html#fs_fspromises_api
Official Node.js documentation for the File System Promises API (`fs.promises`). Details methods like `readFile`, `writeFile`, `stat`, and `readdir`, with encoding and error-handling patterns—core to asynchronous config loading, CSV/YAML/JSON file parsing, and output writing in CLI commands. Last updated 2024; Node.js official reference.
## MIT

# Node.js Path Module
## https://nodejs.org/api/path.html
Authoritative reference for the Path module in Node.js, describing methods such as `path.extname`, `path.join`, and `path.basename`. Explains handling of POSIX and Windows paths, normalization, and resolution—used in `loadDataFromFile` to detect file extensions and construct file paths. Last updated 2024; Node.js official reference.
## CC-BY-SA

# Node.js URL Module
## https://nodejs.org/api/url.html
Documentation for the URL module in Node.js, including `fileURLToPath` and `URL` constructors. Covers parsing and formatting of URL strings, which is used for resolving the CLI entrypoint path and canonicalizing file URLs. Last updated 2024; Node.js official reference.
## CC-BY-SA

# Node.js Process Object
## https://nodejs.org/api/process.html
Reference for the Node.js Process object, detailing properties and methods such as `process.argv`, `process.exit()`, environment variables, and standard I/O streams. Provides guidelines on exit codes and signal handling—crucial for consistent CLI error reporting and termination. Last updated 2024; Node.js official reference.
## CC-BY-SA