# Math.js
## https://mathjs.org/docs/index.html
Math.js is a comprehensive math library for JavaScript and Node.js that supports expression parsing, symbolic computations, unit conversions, and matrix operations. The documentation provides detailed API references for math.evaluate, math.parse, and compile features, including performance considerations and error handling strategies. It shows integration in Node.js environments, extending with custom functions, asynchronous evaluation, and tree-walking for transformations.
Last known publication: April 2024. Authoritative source maintained by the Math.js team; version 11.8.
## Apache-2.0

# Yargs
## https://yargs.js.org/docs/
Yargs is a robust CLI argument parser for Node.js. The docs cover advanced parsing patterns, command modules, middleware hooks, and examples for flags, commands, and positional arguments. It guides on validation, failure message customization, and automatic type coercion, essential for building intuitive CLI tools and enforcing parameter schemas.
Last known publication: March 2024. Widely adopted in the Node.js ecosystem.
## MIT

# D3.js
## https://d3js.org/
D3.js offers low-level APIs to manipulate HTML, SVG, and CSS for data-driven visualizations. The documentation explains data joins, scales, axes, and transitions, allowing fine-grained control of SVG plot generation and dynamic styling. Useful for custom interactive time series visualizations with performance tuning tips.
Last known publication: February 2024. Maintained by Mike Bostock and community contributors.
## BSD-3-Clause

# Plotly.js
## https://plotly.com/javascript/getting-started/
Plotly.js provides high-level charting APIs with rich interactivity and static export capabilities. The docs detail chart types, layout options, Node.js integration via CommonJS/ESM, and Node-canvas workflows for image export. It emphasizes programmatic plot configuration, custom styling, and embedding in server-side scripts.
Last known publication: January 2024. Maintained by Plotly.
## MIT

# Vega-Lite
## https://vega.github.io/vega-lite/
Vega-Lite is a concise grammar for declarative interactive graphics. The documentation outlines the JSON schema for chart specs, data transformations, and encoding channels, and covers compilation to Vega for rendering in Node.js. Ideal for rapid prototyping of standardized time series visuals.
Last known publication: March 2024. Backed by the University of Washington and contributors.
## BSD-3-Clause

# Node-canvas
## https://github.com/Automattic/node-canvas#readme
Node-canvas is a Cairo-backed Canvas API implementation for Node.js. Its README covers installation, platform requirements, Canvas API compatibility, and examples for generating PNG/SVG streams. It includes benchmarks and performance tuning advice for large canvases, essential for server-side plot rendering.
Last known publication: February 2024. Maintained by Automattic.
## MIT

# Gnuplot
## http://www.gnuplot.info/documentation.html
Gnuplot is a mature command-line graphing utility with extensive scripting capabilities. The official docs cover function plotting, data file handling, and styling options via scripts, offering a benchmark for CLI-driven plot pipelines and insights into conventional plot scripting paradigms.
Last known publication: April 2023. Longstanding tool with community support.
## Unknown

# Data Format Standards: JSON Lines & CSV
## https://jsonlines.org/
## https://datatracker.ietf.org/doc/html/rfc4180
This combined source covers two essential data interchange formats. JSON Lines specifies streaming read/write patterns, error recovery, and UNIX tool compatibility. RFC 4180 defines CSV syntax, quoting, delimiters, and edge case handling for interoperability with spreadsheets and data pipelines. Together, they inform robust output routines for JSON, JSONL, and CSV persistence.
Last known publication: JSON Lines (2020), RFC 4180 (October 2005). Authoritative specifications by JSON Lines community and IETF.
## CC0 & IETF Trust

# Vitest
## https://vitest.dev/guide/
Vitest is a fast, Vite-native unit testing framework with built-in coverage reporting. The guide details test syntax, mocking, snapshot testing, and performance optimizations for ESM contexts. It covers CLI flags, reporters, and integration strategies, essential for both unit and integration tests in Node.js projects.
Last known publication: March 2024. Widely used in the ESM testing ecosystem.
## MIT

# Chart.js & Chartjs-node-canvas
## https://www.chartjs.org/docs/latest/
## https://github.com/SeanSobey/ChartjsNodeCanvas#readme
This combined source documents client-side and server-side chart rendering. Chart.js docs describe chart configuration, dataset options, scales, plugins, and exportable canvas draw calls. Chartjs-node-canvas README adds server-side integration examples for PNG/SVG output, buffer handling, and canvas configuration, enabling seamless CLI plot generation.
Last known publication: Chart.js (April 2024), Chartjs-node-canvas (March 2024). Maintained by Chart.js project and automattic contributors.
## MIT & Apache-2.0

# Express.js
## https://expressjs.com/en/4x/api.html
Express is a minimal and flexible Node.js web application framework. The API docs explain application and router setup, middleware chaining, request and response objects, and error handling patterns. Detailed guides cover serving binary data, content negotiation, and security best practices, underpinning the implementation of HTTP /plot and /series endpoints.
Last known publication: April 2024. Authoritative docs by the Express.js team.
## MIT

# Supertest
## https://github.com/visionmedia/supertest#readme
Supertest provides a high-level abstraction for testing HTTP servers. The README shows how to issue requests against Express apps, chain assertions on status, headers, and body, and handle setup/teardown. It supports Promise-based tests and integration with Vitest, streamlining end-to-end testing of /plot and /series endpoints.
Last known publication: March 2024. Maintained by the Visionmedia community.
## MIT

# Zod
## https://github.com/colinhacks/zod
Zod is a TypeScript-first schema validation library. The documentation details creating schemas, parsing and safe parsing APIs, custom error messages, and data transforms. It is ideal for validating and parsing HTTP query parameters, body payloads, and ensuring robust runtime checks in the Express server.
Last known publication: March 2024. Maintained by the Zod project.
## MIT

# SVG 2.0
## https://www.w3.org/TR/SVG2/
The W3C SVG 2.0 specification defines core SVG elements, attributes, and CSS integration. It covers path commands, shapes, text layout, coordinate systems, and styling inheritance, ensuring compliant and interoperable SVG output for chart libraries.
Last known publication: January 2024. World Wide Web Consortium.
## W3C License

# Node.js File System (fs)
## https://nodejs.org/api/fs.html
The Node.js fs module documentation details synchronous and asynchronous file I/O, streams, and directory operations. It covers methods like fs.writeFile, fs.createWriteStream, file permission handling, and error codes. This is critical for writing JSON, JSONL, CSV, SVG, and PNG buffers reliably in CLI workflows.
Last known publication: March 2024. Official Node.js documentation.
## Node.js License