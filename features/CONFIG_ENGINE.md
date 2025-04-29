# OVERVIEW
This feature enhances the configuration management of the library by optimizing environment variable interpolation, configuration file parsing, and merging CLI options with file-based settings using strict validation. The updated configuration engine leverages Zod schemas for precise validation and supports fallback defaults through interpolation syntax, ensuring that users can reliably provide dynamic settings through configuration files (JSON/YAML) and CLI flags.

# IMPLEMENTATION
- Refactor and update the existing loadConfig and interpolateEnv functions in the source file to handle deeply nested configuration objects with environment variable placeholders and fallback defaults.
- Improve error messaging with detailed validation errors from Zod, especially for numeric values required for plot resolution and dimensions. Log and output full error details if a configuration value fails substitution.
- Merge CLI options with configuration file settings. CLI parameters override file options. Use adjustments in the Zod schema to capture not only top-level keys but nested keys (e.g. display dimensions) as well.
- Update documentation and tests to reflect the enhanced configuration handling. Ensure tests cover interpolation, fallback default usage, and error generation for invalid numeric or incorrectly formatted configuration entries without adding new files.

# IMPACT
- Users gain greater control over plot generation configuration, easing deployment in varied environments. 
- Reduced configuration-related runtime errors by enforcing robust validation.
- Streamlined process for dynamically adjusting plot parameters via environment variables, configuration files, or CLI overrides, directly supporting the mission to be the go-to plot library.
- Enhanced developer feedback reduces troubleshooting time, boosting overall library reliability.