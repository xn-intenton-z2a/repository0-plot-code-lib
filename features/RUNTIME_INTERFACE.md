# Overview
This feature unifies CLI and HTTP interactions while reinforcing robust configuration management. It consolidates help, version information, runtime configuration loading, environment variable interpolation, and HTTP API access into a single interface. Recent enhancements include more thorough configuration validation with Zod, improved parsing of environment variable placeholders with fallback values, and dynamic configuration reloading via SIGHUP signal. This ensures a consistent user experience across command-line operations and web API requests.

# Implementation
- Merge CLI help and version flag handling with HTTP serving and configuration management. The runtime interface now processes both command-line arguments and configuration files (JSON or YAML), recursively interpolating environment variables with fallback support (e.g. ${VAR:defaultValue}).
- Enhance the configuration loading function using Zod to validate not only simple flags but complex nested objects. Detailed error messages are produced when numeric types or required fields are malformed. All configuration parameters (including resolution, dimensions, marker customizations, and stroke styling) are merged with CLI flags, where CLI options override file-based configuration.
- Support dynamic configuration reload triggered by the SIGHUP signal. Upon reload, configuration is revalidated, ensuring any changes in environment variables or external config files are applied seamlessly.
- Update the HTTP /plot endpoint and CLI processing to incorporate the robust configuration and interpolation routines. The endpoint now supports enhanced error reporting when configuration misparses occur and provides clear diagnostic messages.
- Comprehensive unit tests are added to cover configuration file interpolation, fallback defaults, and validation errors. This ensures that each configuration parameter is correctly interpreted and any misconfigurations are reported with actionable feedback.

# Impact
- Simplifies maintenance and improves resilience by unifying runtime interfaces and configuration management into a robust system.
- Enhances user experience by providing consistent behavior across CLI and HTTP modes, along with clear messaging on configuration errors.
- Reduces operational risks by ensuring invalid configurations are caught early, ultimately contributing to production stability and ease-of-use.
- Aligns with the mission to be the go-to plot library, by supporting flexible configuration and secure, reliable runtime behavior.