# Node.js File System (fs) Documentation
## https://nodejs.org/api/fs.html
The Node.js File System API reference details methods for synchronous and asynchronous file operations, streaming interfaces, and error handling strategies. It outlines performance tuning techniques and best practices for reliable I/O, directly informing the repository’s logic for reading ranges, writing CSV/JSON outputs, and persisting SVG/PNG files. Applicable for Node.js v20; published 2023.
## License: Node.js (MIT-like terms)

# Node.js Streams Documentation
## https://nodejs.org/api/stream.html
This guide covers the Node.js stream interfaces, including readable, writable, duplex, and transform streams, as well as object mode, backpressure control, and pipeline utilities. It provides essential patterns for implementing efficient data streaming and piping, which underpin the repository’s SSE endpoint and large-file handling. Node.js v20; last updated 2023.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
The Node.js ESM guide outlines import/export syntax, module resolution algorithms, loader hooks, and interoperability with CommonJS. It provides clarity on package.json configuration, file extensions, and dynamic import patterns, essential for structuring the repository as a modern ESM package. Node.js v20; updated 2023.
## License: Node.js (MIT-like terms)

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Express 4.x API reference for building HTTP servers, route handlers, middleware, and request/response lifecycle. Practical examples for defining endpoints, error handling, middleware ordering, and streaming responses directly inform the implementation of the HTTP API and SSE /stream, /timeseries, and /plot endpoints. Last updated 2023; authoritative official documentation.
## License: MIT

# CORS Middleware for Express
## https://github.com/expressjs/cors#readme
The cors package documentation details configuring Cross-Origin Resource Sharing in Express apps, including origin patterns, preflight handling, and credentials support. It provides essential middleware patterns and configuration options to enforce security and flexibility of CORS headers for SSE, REST API, and plot endpoints. Last committed 2024; MIT license.
## License: MIT

# Zod Official Documentation
## https://zod.dev
This documentation provides comprehensive technical guidance for the Zod schema validation library, used extensively in the repository for parsing and validating CLI and HTTP query parameters, refining schemas, and managing error handling. It offers practical code examples for common validation patterns, custom refinements, and error messages, directly addressing the core implementation needs of robust input validation. Last updated 2023; highly authoritative as the official source.
## License: MIT

# MDN SVG Documentation
## https://developer.mozilla.org/en-US/docs/Web/SVG
MDN’s SVG documentation delivers in-depth technical insights into Scalable Vector Graphics, covering element types, path definitions, transforms, styling, and animation attributes. It provides practical examples for programmatically generating and manipulating SVG elements, which underpin the repository’s custom SVG chart renderer. Reviewed 2024; authoritative community resource under CC-BY-SA.
## License: CC-BY-SA

# Math.js Official Documentation
## https://mathjs.org/docs/
Math.js documentation covers the expression parser API, custom function definitions, symbolic computations, matrix operations, and unit conversions. It delivers code examples for securely evaluating mathematical expressions, managing floating-point precision, and performance considerations, supporting the repository’s core time series generation functionality. Published 2023; maintained by Math.js contributors.
## License: Apache-2.0

# Sharp Image Processing Library Documentation
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation outlines image resizing, cropping, compositing, and format conversion methods. It discusses performance considerations, memory usage, and stream-based pipelines crucial for converting SVG buffers to optimized PNG files, directly enhancing the repository’s image persistence layer. Last updated 2023; Apache-2.0.
## License: Apache-2.0

# Commander.js Guide
## https://github.com/tj/commander.js#readme
Commander.js provides a flexible interface for building CLI applications in Node.js, including command and subcommand definitions, option parsing, help/version generation, and custom argument processing. The guide includes code examples for nested commands, variadic arguments, and programmatic invocation, directly informing the repository’s planned migration to a commander-based CLI. Last updated 2024; official GitHub repository by maintainers.
## License: MIT

# Vitest Documentation
## https://vitest.dev/
Vitest documentation offers actionable guidance on setting up and writing unit tests for modern JavaScript projects. It includes configuration options, mocking patterns, snapshot testing, and performance optimizations, enabling comprehensive test coverage of CLI and HTTP endpoints, range parsing, and rendering logic. Latest release coverage: 2023; official docs by Vitest maintainers.
## License: MIT

# Supertest Documentation
## https://github.com/visionmedia/supertest#readme
Supertest documentation outlines methods to test HTTP servers with a chaining API, assertions, request builders, and agent reuse. It covers setup for in-memory Express server testing, support for streams, header checks, status code assertions, and error reporting, enabling robust unit tests for all API endpoints including SSE and OPTIONS handlers. Last updated 2023; MIT license.
## License: MIT

# Server-Sent Events (SSE) Specification and Examples
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN’s SSE guide explains the EventSource API, streaming text/event-stream payloads, reconnection, event types, and error handling. It provides real-world code examples for client-server SSE interactions, guiding both server payload formatting and client consumption patterns for real-time time-series streaming. Reviewed 2024; CC-BY-SA.
## License: CC-BY-SA

# Vega-Lite Documentation
## https://vega.github.io/vega-lite/docs/
Vega-Lite provides a high-level grammar for interactive graphics, defining JSON schemas for marks, encodings, scales, and axes. The documentation covers building line charts, customizing themes, and exporting to SVG/PNG via the vega-cli or view API. It offers insights into declarative visualization pipelines and performance tuning, serving as a competitor reference for advanced chart generation. Reviewed 2024; maintained by University of Washington Interactive Data Lab.
## License: BSD-3-Clause