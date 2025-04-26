# Zod (Type-Safe Validation for JavaScript and TypeScript)
## https://github.com/colinhacks/zod#readme
Zod is a schema-based validation library enabling runtime data parsing and type-safe checks in JavaScript and TypeScript. Its concise API offers declarative schema definitions, custom validation, coercion, and detailed error reporting. This documentation delivers essential specifications for defining and composing complex CLI argument schemas, integrating environment-based defaults, and ensuring robust validation for both CLI and HTTP payloads. Last updated 2024-02; authoritative as a peer-reviewed library used in frameworks like Next.js.
## License
MIT

# dotenv (Environment Variable Loader for Node.js)
## https://github.com/motdotla/dotenv#readme
dotenv loads and manages environment variables from `.env` files into `process.env`. Its README covers custom file paths, variable expansion, override strategies, and secure defaults. These features are critical for centralizing default plot parameters (color, dimensions, DPI) and enabling environment-driven configuration across CLI and HTTP contexts. Last updated 2024-03; widely adopted and battle-tested.
## License
MIT

# Express.js (HTTP Server Framework)
## https://expressjs.com/en/4x/api.html
Express provides middleware-based routing, request/response handling, error management, and built-in body parsing. This documentation guides building the `/plot` endpoint, validation flows with Zod, content negotiation using `res.format`, and robust error patterns for a production-quality HTTP API. Last updated 2023-12; MIT.
## License
MIT

# Node.js File System API
## https://nodejs.org/api/fs.html
The official Node.js File System API docs detail synchronous and asynchronous file operations, directory manipulation, file streams, and atomic writes. This source covers backpressure control, buffer management, and error handling, informing efficient I/O for reading/writing large CSV, JSON, and image output. Last updated Node.js v20.x; provided by the OpenJS Foundation.
## License
OpenJS Foundation

# Node.js Streams API
## https://nodejs.org/api/stream.html
The Node.js Streams API docs illustrate readable, writable, transform, and duplex streams, including `highWaterMark` tuning, `objectMode`, piping, and backpressure. These patterns are critical for building non-blocking, memory-efficient pipelines for CSV/JSON import/export and large-scale data processing. Last updated Node.js v20.x; OpenJS Foundation.
## License
OpenJS Foundation

# HTTP/1.1: Semantics and Content Negotiation (RFC 7231 §5.3.2)
## https://tools.ietf.org/html/rfc7231#section-5.3.2
This IETF RFC section defines the Accept header syntax, media range matching, and q-value weighting rules for HTTP content negotiation. It provides the formal algorithm for selecting the best representation based on client preferences—a core requirement for implementing manual or library-assisted q-value parsing in the `/plot` endpoint. Published 2014-06; public domain.
## License
Public Domain

# Negotiator (Content Negotiation for Node.js)
## https://github.com/jshttp/negotiator
Negotiator is the library underpinning Express’s `req.accepts` and `res.format` methods, handling parsing of Accept headers, quality values, and media type matching. The README explains the API for negotiating media types, charsets, encodings, and languages, providing actionable functions to streamline content negotiation logic. Last updated 2024-02; MIT.
## License
MIT

# mime-types (MIME Type Utility for Node.js)
## https://github.com/jshttp/mime-types
The `mime-types` library offers a straightforward API for looking up MIME types based on file extensions and vice versa. It ensures correct Content-Type headers when serving files or streaming output based on file extension in CLI mode. The documentation covers `.lookup()` and `.contentType()` methods and updating the internal database. Last updated 2024-02; MIT.
## License
MIT

# content-type (HTTP Content-Type Parser and Formatter)
## https://github.com/jshttp/content-type
This utility parses and formats HTTP Content-Type headers, handling media type parameters like charset. The guide describes `parse()` for extracting type, subtype, and parameters, and `format()` for serializing objects back to header strings—essential for robust header management in both manual and framework-based responses. Last updated 2024-01; MIT.
## License
MIT