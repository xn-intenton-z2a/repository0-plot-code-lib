# Overview
Enhance and expand existing documentation in USAGE.md and README.md to clearly describe newly introduced CLI and HTTP API features related to CORS support, base64 encoding, and the /stats endpoint. Ensure examples, flag descriptions, and code snippets reflect current functionality, enabling users to discover and use new capabilities without referring to source code.

# USAGE.md Updates
- Add a **Stats Endpoint** section under **HTTP Server Mode** describing the `/stats` endpoint, including query parameters (`expression`, `range`, `dataFile`, `samples`, `json`) and sample curl commands.
- Document the new `encoding=base64` query parameter for the `/plot` endpoint, explaining its effect and JSON response format with example output.
- Introduce a note about CORS support, mentioning that CORS is enabled by default and how to restrict origins via the `--cors-origins` flag or environment variable.
- Update **CLI Examples** to include examples of the `stats` subcommand and base64 encoding use in HTTP requests.

# README.md Updates
- Under **HTTP Server Mode**, add subsections for:
  - **CORS Support**, explaining default behavior and configuration options.
  - **Stats Endpoint**, summarizing the HTTP `/stats` endpoint, its parameters, and response formats, with inline examples.
  - **Base64 Encoding**, describing how to use `encoding=base64` on `/plot` and how to interpret the JSON response.
- In the **Examples** section, include live snippets showing fetch or curl commands and their outputs for the new features.

# Documentation Style and Consistency
- Ensure flag names and endpoint paths are formatted in backticks.
- Use matching terminology and examples from CONTRIBUTING.md and features/HTTP_API.md.
- Verify links between USAGE.md and README.md point to correct sections.
