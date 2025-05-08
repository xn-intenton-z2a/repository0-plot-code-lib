# AGENT_CONFIG_SYNC

Introduce a new sync-config subcommand to align the repository structure and settings with the agentic-lib workflow configuration.

# Behavior
- When the CLI is invoked with sync-config, it reads the agent configuration YAML file from a default location or from a path provided via --config.
- It parses the schedule value and the mapping of symbolic keys to file paths.
- It prints a clear summary of the configuration to the console.
- On success, it exits with code 0. On missing or invalid configuration it logs an error and exits with code 1.

# Implementation
- Modify src/lib/main.js to detect the sync-config command and optional --config argument.
- Use fs to read the YAML file and js-yaml to parse it.
- Validate required keys (schedule and paths) with basic checks.
- Add or update tests in tests/unit/main.test.js covering both successful sync and error conditions.
- Update README.md with usage examples for the new subcommand.
