# CONFIG MANAGEMENT

## Overview
This feature merges configuration from multiple sources into a unified management system. The tool already loads environment variables from a .env file using dotenv and supports a CLI flag for JSON configuration. Now, these two mechanisms are consolidated to provide a seamless configuration experience. Users can set defaults via environment variables, supply overrides in a config JSON via the --config flag, and provide CLI flags that take the highest precedence.

## Implementation
- In src/lib/main.js, ensure the dotenv configuration is loaded at startup so that environment variables are available.
- Parse the --config flag when provided; validate its JSON content and merge its key-value pairs with CLI flags. Explicit CLI flags override values from the config JSON, and any missing critical parameters will fall back to the environment variables.
- Update error handling to include scenarios where the JSON provided in --config is invalid.
- Update documentation (README.md and docs/USAGE.md) with examples illustrating how to use environment variables and the --config flag together.
- Reflect changes in test files by adding or updating tests verifying that configuration merging happens in the following order: CLI flags > JSON config from --config flag > environment variables.

## Testing
- Update existing test cases in tests/unit/main.test.js and tests/unit/http.test.js to cover scenarios where configuration is supplied via environment variables and the --config flag.
- Ensure that errors in JSON parsing for the --config flag trigger a clear error message.
- Validate that the merged configuration correctly respects priority and enhances user experience in both CLI and HTTP API modes.