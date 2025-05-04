# Zod Official Documentation
## https://zod.dev
This documentation provides comprehensive technical guidance for the Zod schema validation library, used extensively in the repository for parsing and validating CLI and HTTP query parameters, refining schemas, and managing error handling. It offers practical code examples for common validation patterns, custom refinements, and error messages, directly addressing the core implementation needs of robust input validation in both CLI and Express-based APIs. Last updated 2023; highly authoritative as the official source.
## License: MIT

# MDN SVG Documentation
## https://developer.mozilla.org/en-US/docs/Web/SVG
MDN’s SVG documentation delivers in-depth technical insights into Scalable Vector Graphics, covering element types, path definitions, transforms, styling, and animation attributes. It provides practical examples for programmatically generating and manipulating SVG elements, which underpin the repository’s custom SVG chart renderer. Reviewed 2024; authoritative community resource under CC-BY-SA.
## License: CC-BY-SA

# Vitest Documentation
## https://vitest.dev/
Vitest documentation offers actionable guidance on setting up and writing unit tests for modern JavaScript projects. It includes configuration options, mocking patterns, snapshot testing, and performance optimizations, enabling comprehensive test coverage of CLI and HTTP endpoints, range parsing, and rendering logic. Latest release coverage: 2023; official docs by Vitest maintainers.
## License: MIT

# Node.js File System (fs) Documentation
## https://nodejs.org/api/fs.html
The Node.js File System API reference details methods for synchronous and asynchronous file operations, streaming interfaces, and error handling strategies. It outlines performance tuning techniques and best practices for reliable I/O, directly informing the repository’s logic for reading ranges, writing CSV/JSON outputs, and persisting SVG/PNG files. Applicable for Node.js v20; published 2023.
## License: Node.js (MIT-like terms)

# Math.js Official Documentation
## https://mathjs.org/docs/
Math.js documentation covers the expression parser API, custom function definitions, symbolic computations, matrix operations, and unit conversions. It delivers code examples for securely evaluating mathematical expressions, managing floating-point precision, and performance considerations, supporting the repository’s core time series generation functionality. Published 2023; maintained by Math.js contributors.
## License: Apache-2.0

# Sharp Image Processing Library Documentation
## https://sharp.pixelplumbing.com/api-constructor
Sharp’s API documentation outlines image resizing, cropping, compositing, and format conversion methods. It discusses performance considerations, memory usage, and stream-based pipelines crucial for converting SVG buffers to optimized PNG files, directly enhancing the repository’s image persistence layer. Last updated 2023; Apache-2.0.
## License: Apache-2.0

# Puppeteer API Reference
## https://pptr.dev/
Puppeteer documentation details controlling headless Chrome for scripted rendering of web content to image and PDF formats. It includes guidance on viewport configuration, resource loading, timing heuristics, and error diagnostics, critical for robust SVG-to-PNG conversion workflows in headless environments. Version 23+; authoritative source under Apache-2.0.
## License: Apache-2.0

# csv-parse Official Documentation
## https://csv.js.org/parse/
The csv-parse documentation details parsing and stringifying CSV data with advanced options for delimiter customization, streaming support, and error handling, ensuring strict compliance with RFC 4180 standards for escaping and line breaks. It covers high-throughput streaming scenarios, backpressure management, and detailed error recovery strategies for reliable CLI and HTTP data workflows. Published 2024; maintained by the Node.js community.
## License: MIT

# js-yaml Official Documentation
## https://github.com/nodeca/js-yaml#readme
js-yaml documentation covers parsing, serializing, and schema customization for YAML in JavaScript. It includes security best practices for handling untrusted input, support for custom types, and performance considerations, directly informing any YAML-based configuration or data exchange in the repository. Last updated 2024.
## License: MIT

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

# Supertest Documentation
## https://github.com/visionmedia/supertest#readme
Supertest documentation outlines methods to test HTTP servers with a chaining API, assertions, request builders, and agent reuse. It covers setup for in-memory Express server testing, support for streams, header checks, status code assertions, and error reporting, enabling robust unit tests for all API endpoints including SSE and OPTIONS handlers. Last updated 2023; MIT license.
## License: MIT

# Server-Sent Events (SSE) Specification and Examples
## https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
MDN’s SSE guide explains the EventSource API, streaming text/event-stream payloads, reconnection, event types, and error handling. It provides real-world code examples for client-server SSE interactions, guiding both server payload formatting and client consumption patterns for real-time time-series streaming. Reviewed 2024; CC-BY-SA.
## License: CC-BY-SA

# Node.js HTTP Module Documentation
## https://nodejs.org/api/http.html
Node.js HTTP module reference describes creating servers, handling requests and responses, streaming data, managing headers, and implementing event-driven workflows. Offers lower-level insights into response streams and performance considerations that underlie Express abstractions, valuable for fine-tuning SSE and content streaming endpoints. Applicable v20; MIT-like license.
## License: Node.js (MIT-like terms)