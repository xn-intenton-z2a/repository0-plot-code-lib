# CLI Parsing and Validation
## https://github.com/colinhacks/zod
## https://github.com/substack/minimist
## https://github.com/yargs/yargs
Provides a consolidated guide for defining, parsing, and validating command-line arguments in Node.js. Zod offers a type-safe schema definition with runtime checks and clear error messages—critical for flags like `--format`, `--serve`, and `--port`. Minimist delivers lightweight tokenization for basic workflows, while Yargs supports nested commands, middleware hooks, automatic help/version generation, and advanced flag validation—essential for a robust CLI interface and seamless deprecation handling of `--png`. Last updates: Zod (April 2024), Minimist (January 2024), Yargs (March 2024); all are widely adopted, community-maintained, and battle-tested.
## License
Zod: MIT; Minimist: MIT; Yargs: BSD-3-Clause

# Vitest Testing Guide
## https://vitest.dev/guide/
The official Vitest documentation covers unit, integration, and end-to-end testing in modern ES modules. Topics include parallel test execution, spies, mocks, snapshot testing, coverage reporting, and setup/teardown hooks. Advanced patterns demonstrate how to isolate file-system and network interactions—vital for testing CSV/JSON ingestion, CLI flag behaviors, HTTP API endpoints, and buffer-based PNG outputs. Last updated April 2024; maintained by the Vitest core team.
## License
MIT

# Chart.js Rendering Ecosystem
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
## https://github.com/Automattic/node-canvas#readme
## https://quickchart.io/documentation
Comprehensive resources for server-side chart generation in Node.js. The Chart.js docs detail chart types, scales, plugin architecture, and theming. ChartjsNodeCanvas and node-canvas readmes explain headless Canvas instantiation, custom font embedding, PNG buffer output, and performance tuning. QuickChart’s API reference describes remote JSON-based chart rendering with URL-encoded configs, dimension controls, and multi-format exports—enabling both local and hosted pipelines for SVG/PNG. Updated June 2024; widely used in production.
## License
Chart.js, ChartjsNodeCanvas, node-canvas: MIT; QuickChart: Proprietary Terms

# Sharp Image Processing Library
## https://sharp.pixelplumbing.com/
High-performance native image processing for Node.js. Covers resizing, compositing, format conversion, streaming pipelines, buffer handling, metadata retention, concurrency controls, and performance benchmarks. Essential for converting headless SVG outputs into optimized PNGs and handling image pipelines without external dependencies. Last updated April 2024; maintained by Pixelplumbing.
## License
MIT

# Node.js Core API & Streams
## https://nodejs.org/docs/latest/api/
Authoritative source for Node.js core modules, including fs, path, http, stream, buffer, events, and URL. Covers method signatures, readable/writable/transform streams, backpressure management, event-driven patterns, Promises, and ESM integration. Foundational for file I/O (`--input`/`--output`), streaming CSV/JSON ingestion, SVG/PNG pipelines, and HTTP server creation with Express. Continuously updated with each LTS release (last revised June 2024).
## License
CC-BY-SA

# MDN Scalable Vector Graphics Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
In-depth tutorial on SVG syntax, shapes, paths, transforms, styling, and accessibility. Provides practical code examples for generating compliant, responsive SVG output in the `plot` command—ensuring cross-platform fidelity and seamless integration with headless canvases. Updated May 2024; maintained by Mozilla.
## License
CC-BY-SA

# dotenv Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Official guide for loading and managing `.env` variables in Node.js. Discusses variable expansion, override precedence, security best practices, and programmatic APIs—crucial for safely handling API keys (e.g., QuickChart) and customizing CLI defaults such as default port or file paths. Last updated May 2024; widely adopted in the Node ecosystem.
## License
BSD-2-Clause

# CSV Handling and Parsing
## https://datatracker.ietf.org/doc/html/rfc4180
## https://csv.js.org/parse/
Combines the formal CSV format specification (RFC 4180) with the csv-parse library guide for Node.js. The spec defines delimiters, quoting rules, and header semantics; csv-parse covers sync/async APIs, streams, custom delimiters, and transform hooks—critical for robust `--input` CSV ingestion, header validation, and error-resilient parsing. Last updated October 2005 (RFC), csv-parse updated May 2024; both are authoritative community resources.
## License
Public Domain (RFC 4180); MIT (csv-parse)

# Math.js API Documentation
## https://mathjs.org/docs/
Comprehensive reference for mathematical expression evaluation, symbolic computation, matrix operations, unit handling, and statistical functions. Key sections on `compile()`, `evaluate()`, `derivative()`, and custom plugin extensions support building a powerful expression engine and derivative-based statistics features. Updated March 2024; maintained by the Math.js community.
## License
Apache-2.0

# Express.js Web Framework
## https://expressjs.com/en/4x/api.html
Comprehensive official reference for Express 4.x covering application setup, routing methods (`app.get`, `app.post`, etc.), middleware architecture, query and body parsing, error handlers, response methods, and integration with Node.js HTTP server. Essential for implementing the HTTP API mode (`--serve`), parameter validation, status codes, content negotiation, and middleware patterns in a production-grade server. Last updated April 2024; maintained by the Express.js team with community contributions (over 55K stars on GitHub).
## License
MIT

# Supertest HTTP Assertions
## https://github.com/visionmedia/supertest#readme
Official Supertest library documentation for end-to-end testing of HTTP servers in Node.js. Demonstrates request chaining, assertions on status codes, headers, and response bodies, and integration patterns with frameworks like Express. Provides actionable examples for testing the `/plot` endpoint, parameter validation errors, and content-type assertions. Last updated March 2024; widely used in production test suites.
## License
MIT

# MDN SVG Text Element Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
Comprehensive reference on the SVG `<text>` element, covering attributes like `x`, `y`, `dx`, `dy`, `text-anchor`, `font-size`, and transformations. Provides examples for positioning and styling text in an SVG canvas—directly applicable for rendering chart titles, axis labels, and annotations. Updated June 2024; maintained by Mozilla, authoritative MDN content.
## License
CC-BY-SA

# W3C SVG 1.1 Text and Font Specification
## https://www.w3.org/TR/SVG11/text.html
The formal W3C specification for SVG text rendering, detailing coordinate systems, text layout, font inheritance, and placement rules. Offers in-depth technical guidance on baseline alignment, text transformations, and multiline text support—critical for implementing consistent and standards-compliant chart annotations. Last revised September 2011; maintained by W3C Working Group.
## License
W3C Public License

# Plotly.js Annotation Guide
## https://plotly.com/javascript/annotations/
Official Plotly.js documentation on adding annotations including text boxes, arrows, and shapes to charts. Covers configuration options such as `xref`, `yref`, annotation positioning, styling, and interactivity—offering actionable patterns for advanced annotation features. Updated May 2024; maintained by Plotly, widely used in interactive charting applications.
## License
MIT

# Node.js URL and Query Parameter Handling
## https://nodejs.org/api/url.html#url_class_urlsearchparams
Authoritative Node.js API reference for the `URLSearchParams` class and the URL API. Details methods for parsing, appending, and serializing query parameters—relevant for processing `title`, `xLabel`, and `yLabel` parameters in HTTP mode. Continuously updated with each Node LTS release (last revised June 2024).
## License
CC-BY-SA