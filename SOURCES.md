# Node.js File System (fs) Documentation
## https://nodejs.org/api/fs.html
The official Node.js File System API reference provides detailed explanations of synchronous and asynchronous file operations, filesystem streaming interfaces, directory traversal, and error handling patterns. It covers buffer pooling, highWaterMark tuning, and advanced features like fs/promises and AbortSignal-enabled operations—crucial for reliably reading ranges, writing CSV/JSON outputs, and persisting SVG/PNG files in Node.js v20. Published 2023; core runtime documentation, authoritative.
## License: Node.js (MIT-like terms)

# Node.js Streams Documentation
## https://nodejs.org/api/stream.html
Comprehensive guide to Node.js stream abstractions—readable, writable, duplex, and transform streams—including object mode, backpressure management, and the pipeline() utility. It offers best practices for efficient large-file handling, error propagation, and memory optimization, underlining the NDJSON streaming output and file I/O used by the CLI and library. Updated for Node.js v20, 2023.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
Defines import/export syntax, conditional exports, dynamic imports, and loader hooks, plus interop with CommonJS modules. Emphasizes package.json configuration, top-level await, and tree-shaking considerations—key to maintaining a modern ESM codebase for both library and CLI. Node.js v20; updated 2023.
## License: Node.js (MIT-like terms)

# Zod Official Documentation
## https://zod.dev
In-depth reference on schema creation, parsing pipelines, type inference, and custom refinements in Zod. Demonstrates composing nested object schemas, coercion strategies, asynchronous validations, and custom error formatting—vital for robust CLI argument validation of expression, range, file, and format flags. Updated 2023; authoritative source.
## License: MIT

# Yargs Command-Line Parser Guide
## https://github.com/yargs/yargs#readme
The Yargs README outlines a powerful, declarative CLI parsing toolkit supporting command modules, positional arguments, type coercion, and middleware. It details localized help generation, custom error handling, and asynchronous command handlers—offering patterns to enhance user-friendly CLI designs. Updated 2024; MIT.
## License: MIT

# Minimist Quickstart and API
## https://github.com/substack/minimist#readme
Minimist’s README outlines a lightweight CLI parsing approach supporting flag notation, aliasing, default values, and boolean coercion. It details how to parse both short (-f) and long (--flag) options, handle unknown parameters, and produce argv objects suitable for further validation with Zod and downstream logic. Last updated 2021; MIT.
## License: MIT

# expr-eval Parser Library
## https://github.com/silentmatt/expr-eval#readme
Defines a JavaScript expression parser and evaluator, detailing supported grammar, AST manipulation, and performance characteristics. Covers numeric and logical operators, custom function injection, and secure environment contexts—directly informing how the repository parses and samples mathematical expressions. Last updated 2023; MIT.
## License: MIT

# Math.js Official Documentation
## https://mathjs.org/docs/
Math.js documentation describes expression parsing, symbolic computation (e.g., derivative), matrix operations, and unit support. Offers guidance on custom function definitions, precision management, and performance optimization—fueling the repository’s sampling logic and symbolic derivative features. Published 2023; maintained by Math.js contributors.
## License: Apache-2.0

# Newline Delimited JSON (NDJSON) Specification
## http://ndjson.org/
The NDJSON specification defines a line-delimited JSON format, covering record separation, MIME type application/x-ndjson, and streaming/payload guidelines. It offers practical rules for implementing CLI streaming output and HTTP streaming endpoints, ensuring interoperability with parsers and HTTP clients. Published 2020; CC0.
## License: CC0

# Vega-Lite Specification
## https://vega.github.io/vega-lite/
High-level grammar for interactive graphics, detailing concise JSON schemas for data transforms, encodings, and interactions. Sections on mark types, scales, axes, and layering provide a blueprint for a declarative plot specification engine—mapping sampled time series data to visual encodings. Updated 2023; broadly adopted and authoritative.
## License: BSD-3-Clause

# SVG Technical Documentation (MDN & W3C)
## https://developer.mozilla.org/en-US/docs/Web/SVG and https://www.w3.org/TR/SVG2/
Combines MDN’s practical SVG tutorials on shapes, paths, transforms, and styling with the authoritative W3C SVG2 specification. Covers <polyline>, <path> syntax, viewBox behavior, and XML serialization—essential for cross-browser SVG chart rendering and serialization. MDN reviewed 2024; W3C spec published 2021.
## License: CC-BY-SA / W3C Software and Document License

# Sharp Image Processing Library Documentation
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API docs describe image resizing, cropping, compositing, and format conversion. Includes performance guidelines, memory considerations, and streaming pipelines for converting SVG data into optimized PNGs. Demonstrates methods such as .png(), .toBuffer(), and .clone(). Last updated 2023; Apache-2.0.
## License: Apache-2.0

# Chart.js Node Canvas
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
Chart.js Node Canvas README demonstrates how to render Chart.js charts server-side using a Canvas implementation. It covers creating chart configuration, initializing the renderer with dimensions and device pixel ratio settings, exporting to PNG or SVG, and streaming outputs for high-performance pipelines. It also discusses caching strategies and memory management for bulk image generation. Updated 2024; MIT.
## License: MIT

# node-canvas Documentation
## https://github.com/Automattic/node-canvas#readme
The Automattic node-canvas README describes the Canvas API for Node.js, mirroring HTML5 Canvas context methods. It covers creating canvases, drawing primitives, paths, text, and images, and exporting to PNG or PDF buffers. It includes tips on text measurement, retina scaling, and performance considerations for rendering high-resolution plots server-side. Last updated 2024; MIT.
## License: MIT

# Vitest Documentation
## https://vitest.dev/
Vitest’s official documentation provides guidance on configuring unit tests, mocks, snapshot testing, and performance tuning. Covers lifecycle hooks, coverage analysis, and plugin integrations—enabling robust testing of CLI parsing, sampling logic, and file I/O. Latest release: 2023; maintained by the Vitest team.
## License: MIT

# js-yaml Official Documentation
## https://github.com/nodeca/js-yaml#readme
The js-yaml README details YAML parsing and dumping APIs, including safeLoad, load, dump, and schema customization. It explains options for indentation, line width, and JSON compatibility, as well as security considerations with custom types. Essential for implementing future YAML export for time series data. Updated 2023; MIT.
## License: MIT