# CLI Parsing and Validation
## https://github.com/colinhacks/zod
## https://github.com/substack/minimist
## https://github.com/yargs/yargs
Provides a consolidated guide for defining, parsing, and validating command-line arguments in Node.js. Zod offers a type-safe schema definition with runtime checks and clear error messages—critical for new flags like `--format`, `--width`, and `--input`. Minimist delivers lightweight tokenization for basic workflows, while Yargs supports nested commands, middleware hooks, automatic help/version generation, and advanced flag validation—essential for a robust CLI interface. Last updates: Zod (April 2024), Minimist (January 2024), Yargs (March 2024); all are widely adopted, community-maintained, and battle-tested.
## License
Zod: MIT; Minimist: MIT; Yargs: BSD-3-Clause

# Vitest Testing Guide
## https://vitest.dev/guide/
The official Vitest documentation covers everything needed for unit, integration, and end-to-end testing in modern ES modules. Topics include parallel test execution, spies, mocks, snapshot testing, coverage reporting, and setup/teardown hooks. Advanced patterns demonstrate how to isolate file-system and network interactions—vital for validating CSV/JSON ingestion, `--format` behavior, SVG/PNG buffer outputs, and future HTTP endpoints. Last updated April 2024; maintained by the Vitest core team.
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

# Node.js Official API Reference
## https://nodejs.org/docs/latest/api/
The authoritative source for Node.js core modules—including fs, path, stream, buffer, URL, events, and HTTP. Details method signatures, event diagrams, Promise support, ESM considerations, and security best practices. Foundational for file I/O (`--input`), directory resolution, environment variable loading, and any future HTTP server or streaming pipelines. Continuously updated with each LTS release.
## License
CC-BY-SA

# MDN Scalable Vector Graphics Reference
## https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
In-depth tutorial on SVG syntax, shapes, paths, transforms, styling, and accessibility. Provides practical code examples for generating compliant, responsive SVG output in your `plot` command—ensuring cross-platform fidelity and seamless integration with headless canvases. Updated May 2024; maintained by Mozilla.
## License
CC-BY-SA

# dotenv Environment Variable Loader
## https://github.com/motdotla/dotenv#readme
Official guide for loading and managing `.env` variables in Node.js. Discusses variable expansion, override precedence, security best practices, and programmatic APIs—crucial for safely handling API keys (e.g., QuickChart) and customizing CLI defaults. Last updated May 2024; widely adopted in the Node ecosystem.
## License
BSD-2-Clause

# CSV Handling and Parsing
## https://datatracker.ietf.org/doc/html/rfc4180
## https://csv.js.org/parse/
Combines the formal CSV format specification (RFC 4180) with a high-performance Node.js parsing library. The spec defines delimiters, quoting rules, and header semantics; csv-parse offers sync/async APIs, streaming, custom delimiters, and transform hooks—critical for robust `--input` CSV ingestion and error-resilient parsing. RFC published October 2005; csv-parse maintained under MIT.
## License
Public Domain (RFC 4180); csv-parse: MIT

# Math.js API Documentation
## https://mathjs.org/docs/
Comprehensive reference for mathematical expression evaluation, symbolic computation, matrix operations, unit handling, and statistical functions. Key sections on `compile()`, `evaluate()`, `derivative()`, and custom plugin extensions support building a powerful expression engine and derivative-based statistics features. Updated March 2024; maintained by the Math.js community.
## License
Apache-2.0

# Node.js Streams and Data Pipelines
## https://nodejs.org/docs/latest/api/stream.html
An in-depth look at Node.js stream abstractions: Readable, Writable, Transform, and Duplex. Covers piping, backpressure, `stream.pipeline`, and robust error handling—essential for processing large CSV/JSON inputs, streaming chart buffers, and efficient memory usage without full data loading. Continuously updated in sync with Node.js LTS.
## License
CC-BY-SA