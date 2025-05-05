# Node.js File System (fs) Documentation
## https://nodejs.org/api/fs.html
The Node.js File System API reference details methods for synchronous and asynchronous file operations, streaming interfaces, and error handling strategies. It outlines performance tuning techniques—such as buffer pooling and highWaterMark tuning—and best practices for reliable I/O under heavy load. This source directly informs the repository’s logic for reading ranges, writing CSV/JSON outputs, and persisting SVG/PNG files, and covers Node.js v20 features like `fs/promises`. Published 2023; highly authoritative as the official Node.js documentation.
## License: Node.js (MIT-like terms)

# Node.js Streams Documentation
## https://nodejs.org/api/stream.html
This guide covers the Node.js stream interfaces—readable, writable, duplex, and transform streams—along with object mode, backpressure control, and pipeline utilities. It provides essential patterns for implementing efficient data streaming and piping, underpinning the repository’s SSE endpoint and large-file handling strategies. Includes practical examples of `pipeline()`, custom Transform classes, and low-level event hooks. Node.js v20; last updated 2023.
## License: Node.js (MIT-like terms)

# Node.js ECMAScript Modules (ESM) Guide
## https://nodejs.org/api/esm.html
The Node.js ESM guide outlines import/export syntax, module resolution algorithms, loader hooks, and interoperability with CommonJS. It clarifies `package.json` configuration, file extensions, and dynamic import patterns essential for structuring the repository as a modern ESM package. Covers top-level await, conditional exports, and experimental loader flags. Node.js v20; updated 2023.
## License: Node.js (MIT-like terms)

# Node.js HTTP Module Documentation
## https://nodejs.org/api/http.html
This documentation details the core Node.js HTTP server and client implementations, including request/response lifecycle, status codes, headers, chunked encoding, and socket events. It provides granular control over server timeouts, agent reuse, and backpressure management, informing the implementation of SSE and custom HTTP endpoints. Includes examples of manual header manipulation and stream handling. Node.js v20; published 2023.
## License: Node.js (MIT-like terms)

# Express.js API Reference
## https://expressjs.com/en/4x/api.html
Express 4.x API reference for building HTTP servers, route handlers, middleware, and the request/response lifecycle. Contains practical code samples for defining endpoints, error handling, middleware ordering, and streaming responses, directly informing the implementation of the HTTP API’s `/stream`, `/json`, `/csv`, and `/plot` routes. Last updated 2023; official authoritative documentation.
## License: MIT

# Zod Official Documentation
## https://zod.dev
Comprehensive technical guidance for the Zod schema validation library. Describes schema composition, custom refinements, parsing pipelines, and detailed error formatting. Provides code examples for transforming CLI and HTTP inputs, ensuring robust input validation patterns in the repository. Last updated 2023; authoritative as the official source.
## License: MIT

# Newline Delimited JSON (NDJSON) Specification
## http://ndjson.org/
The NDJSON specification defines a line-delimited JSON format detailing object separation with newline characters, MIME type `application/x-ndjson`, and handling of trailing newlines. It supplies essential guidelines for streaming and parsing NDJSON payloads in both CLI and HTTP contexts (`/ndjson` endpoint). Published 2020; community-maintained.
## License: CC0

# MDN SVG Documentation
## https://developer.mozilla.org/en-US/docs/Web/SVG
MDN’s SVG guide delivers in-depth technical insights into Scalable Vector Graphics, covering element types, path definitions, transforms, styling, and text elements. It provides examples for programmatically generating and manipulating SVG structures, which underpin the repository’s custom SVG chart renderer. Reviewed 2024; authoritative community resource under CC-BY-SA.
## License: CC-BY-SA

# Math.js Official Documentation
## https://mathjs.org/docs/
Math.js documentation covers the expression parser API, symbolic computations (including the `derivative` function), custom function definitions, matrix operations, and unit conversions. It delivers code examples for safely evaluating mathematical expressions, computing symbolic derivatives, managing floating-point precision, and optimizing performance—directly supporting the new derivative calculation feature. Published 2023; maintained by Math.js contributors.
## License: Apache-2.0

# Sharp Image Processing Library Documentation
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation outlines image resizing, cropping, compositing, and format conversion methods. It discusses performance considerations, memory usage, and stream-based pipelines crucial for converting SVG buffers to optimized PNG files, directly enhancing the repository’s image persistence layer. Last updated 2023; Apache-2.0.
## License: Apache-2.0

# Commander.js Guide
## https://github.com/tj/commander.js#readme
Commander.js provides a flexible interface for building CLI applications in Node.js, including command and subcommand definitions, option parsing, help/version generation, and custom argument processing. The guide includes examples for nested commands, variadic arguments, and programmatic invocation—informing the planned migration to a commander-based CLI. Last updated 2024; official repository by maintainers.
## License: MIT

# Vitest Documentation
## https://vitest.dev/
Vitest documentation offers actionable guidance on setting up and writing unit tests for modern JavaScript projects. It includes configuration options, mocking patterns, snapshot testing, and performance optimizations, enabling comprehensive coverage of CLI and HTTP endpoints, range parsing, and rendering logic. Latest release coverage: 2023; official docs by Vitest maintainers.
## License: MIT

# Supertest Documentation
## https://github.com/visionmedia/supertest#readme
Supertest documentation outlines methods to test HTTP servers with a chaining API, assertions, request builders, and agent reuse. It covers setup for in-memory Express server testing, stream support, header checks, and status code assertions, enabling robust unit tests for all API endpoints including SSE and OPTIONS handlers. Last updated 2023; MIT license.
## License: MIT

# Server-Sent Events (SSE) Specification and Examples
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN’s SSE guide explains the EventSource API, streaming `text/event-stream` payloads, reconnection strategies, event types, and error handling. It provides real-world code examples for client-server SSE interactions, guiding both server payload formatting and client consumption patterns for real-time time-series streaming. Reviewed 2024; CC-BY-SA.
## License: CC-BY-SA

# D3 Shape and Scale Documentation
## https://github.com/d3/d3-shape/blob/main/README.md
The D3 Shape and Scale modules documentation describes functions for generating SVG path data for lines, areas, and curves, and creating linear and time scales. It covers interpolation methods, domain/range mapping, and axis generation—offering advanced patterns for custom chart rendering and precise coordinate transformations, serving as a competitor reference to the repository’s polyline approach. Last updated 2024; BSD-3-Clause.
## License: BSD-3-Clause

# W3C SVG 2 Specification
## https://www.w3.org/TR/SVG2/
The W3C SVG 2 specification defines the core language for two-dimensional vector graphics, including elements, attributes, coordinate systems, shape geometry, and styling properties. It provides authoritative technical details on `<polyline>`, viewBox behavior, and XML serialization, enabling a deep understanding of SVG fundamentals crucial to the repository’s renderer. Published 2021; W3C Software and Document License.
## License: W3C Software and Document License