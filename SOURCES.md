# Node.js File System (fs) Documentation
## https://nodejs.org/api/fs.html
The official Node.js File System API reference details synchronous and asynchronous file operations, streaming interfaces, and error handling strategies. It explains directory traversal, file descriptor management, and performance tuning techniques—such as buffer pooling and highWaterMark configuration—crucial for reading ranges, writing CSV/JSON, and persisting SVG/PNG outputs. Covers the latest Node.js v20 features including `fs/promises` and `AbortSignal` for cancellable I/O operations. Published 2023; authoritative as the core runtime documentation.
## License: Node.js (MIT-like terms)

# Node.js Streams Documentation
## https://nodejs.org/api/stream.html
Comprehensive guide to Node.js stream interfaces—readable, writable, duplex, and transform streams—object mode, backpressure control, and the `pipeline()` utility. Provides best practices for efficient data streaming, error propagation, and memory management, underpinning NDJSON output and large-file handling in both CLI and library contexts. Includes examples of custom Transform implementations and low-level event hooks. Node.js v20; updated 2023.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Defines the import/export syntax, module resolution algorithm, loader hooks, and interop with CommonJS. Highlights `package.json` configuration, conditional exports, dynamic imports, and top-level await—all essential for organizing the codebase as a modern ESM package and enabling efficient tree-shaking and loader customization. Node.js v20; updated 2023.
## License: Node.js (MIT-like terms)

# expr-eval Parser Library
## https://github.com/silentmatt/expr-eval#readme
The expr-eval library README documents the expression parser and evaluator for JavaScript, detailing supported grammar, AST manipulation, and performance characteristics. It covers numeric and logical operators, custom function definitions, and environment injection patterns, directly informing how the repository parses and samples mathematical expressions safely. Last updated 2023; maintained under MIT license.
## License: MIT

# Zod Official Documentation
## https://zod.dev
Zod’s official site offers in-depth guidance on schema creation, type inference, custom refinements, and parsing pipelines. It explains how to compose nested objects, coerce types, and format validation errors—key to robust CLI argument validation in the repository. Features code examples for asynchronous schemas, custom error messaging, and integration with TypeScript. Updated 2023; authoritative source.
## License: MIT

# Newline Delimited JSON (NDJSON) Specification
## http://ndjson.org/
The NDJSON specification defines the line-delimited JSON format, covering record separation with newlines, MIME type `application/x-ndjson`, and guidelines for streaming and parsing NDJSON payloads. It provides practical rules for implementing both CLI streaming output and HTTP streaming endpoints, ensuring interoperability and consistent parsing behavior. Published 2020; CC0.
## License: CC0

# Math.js Official Documentation
## https://mathjs.org/docs/
Math.js docs cover the expression parser API, symbolic computations (e.g., `derivative`), matrix operations, and unit support. Includes examples on building custom functions, managing floating-point precision, and performance optimization. These insights directly support the repository’s sampling logic, symbolic derivative feature, and safe expression evaluation strategies. Published 2023; maintained by Math.js contributors.
## License: Apache-2.0

# D3 Shape and Scale Documentation
## https://github.com/d3/d3-shape/blob/main/README.md
D3 Shape and Scale modules documentation outlines methods for generating SVG path data—lines, areas, curves—and creating linear/time scales with domain and range mapping. It covers interpolation options, curve factories, and axis generation utilities, serving as a competitor reference to the repository’s custom polyline-based renderer and aiding in precision coordinate transformations. Last updated 2024; BSD-3-Clause.
## License: BSD-3-Clause

# SVG Technical Documentation (MDN & W3C)
## https://developer.mozilla.org/en-US/docs/Web/SVG and https://www.w3.org/TR/SVG2/
This combined reference merges MDN’s practical SVG tutorials (shapes, paths, transforms, styling) with the authoritative W3C SVG2 specification. It covers `<polyline>`, `<path>` data syntax, coordinate systems, viewBox behavior, and XML serialization. Essential for understanding SVG chart rendering, element attributes, and interoperability across browsers and rendering engines. Reviewed 2024 (MDN) and 2021 (W3C); CC-BY-SA and W3C Software and Document License.
## License: CC-BY-SA / W3C Software and Document License

# Sharp Image Processing Library Documentation
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API docs describe image resizing, cropping, compositing, and format conversion techniques. Includes performance guidelines, memory usage considerations, and stream-based pipelines crucial for converting SVG outputs into optimized PNG files. Demonstrates usage of `.png()`, `.toBuffer()` and `.clone()` for efficient image generation. Last updated 2023; Apache-2.0.
## License: Apache-2.0

# Commander.js Guide
## https://github.com/tj/commander.js#readme
Commander.js README details building sophisticated CLI applications in Node.js, covering command/subcommand definitions, option parsing, help/version generation, and argument validation patterns. Includes advanced examples for nested commands and custom error handling, offering an alternative CLI framework to Zod-based parsing. Last updated 2024; maintained under MIT.
## License: MIT

# Vitest Documentation
## https://vitest.dev/
Vitest’s official documentation provides actionable guidance on setting up unit tests, mocking, snapshot testing, and performance tuning for modern JavaScript projects. It covers configuration options, test lifecycle hooks, and code coverage analysis, enabling comprehensive testing of CLI parsing, sampling logic, and file I/O. Latest release: 2023; maintained by Vitest team.
## License: MIT