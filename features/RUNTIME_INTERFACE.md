# Overview
This feature consolidates CLI help, version information, runtime configuration, and HTTP API access into one unified interface. In this update, the core runtime interface now includes robust configuration management, content negotiation for SVG, PNG, and JSON outputs, and an added rate limiting middleware for enhanced stability and security of the HTTP endpoint.

# Implementation
- Merge CLI help and version flag processing along with HTTP serving. The runtime interface now recognizes "--help" and "--version" flags, in addition to enabling HTTP mode via the "--serve" flag.
- Enhance the CLI parsing logic to display detailed help text (with usage examples including HTTP interface). The version command prints the version from dependencies and then exits.
- Update the HTTP /plot endpoint to support content negotiation (SVG, PNG, JSON) and share the same configuration and validation routines used in CLI operations. Both operating modes use enhanced environment variable interpolation, error handling, and dynamic parameter validation.
- Introduce a rate limiting middleware using the express-rate-limit library to control incoming requests to the /plot endpoint. This middleware limits the number of requests per minute (for example, 60 requests per minute) and returns a HTTP 429 (Too Many Requests) error when the limit is exceeded. The middleware is applied before processing plot generation requests.
- Adjust configuration merging logic so that CLI flags can override internal defaults from configuration files and environment variables. Configuration reload on SIGHUP now also preserves the new rate limitation settings.
- Update unit tests in tests/unit/http.test.js to verify that the HTTP endpoint enforces rate limiting in addition to validating proper help/version responses and dynamic plot generation in both CLI and HTTP modes.

# Impact
- Simplifies maintenance by unifying CLI and HTTP runtime behaviors and adding a protective layer against abusive usage via rate limiting.
- Enhances user experience by providing clear and consistent interactions across CLI and HTTP interfaces while protecting server resources.
- Improves production stability and security by mitigating potential DoS attacks on the HTTP /plot endpoint.
- Meets the mission goal of being the go-to plot library with robust and secure interface designs.
