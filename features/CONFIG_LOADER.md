# Overview
Add a CLI option to load and display the agentic-lib configuration.

# CLI Interface
When run with --show-config, the tool reads the YAML configuration file at agent-config.yml or a path supplied via AGENT_CONFIG_PATH environment variable, parses it, and prints the resulting JSON object to standard output.

# Implementation
Use fs.promises to read the file, js-yaml to parse the content. Handle file not found and parse errors by printing descriptive messages and exiting with a non-zero code.

# Testing
Add unit tests that mock the file system to provide a sample YAML file. Verify that --show-config outputs valid JSON for a correct file and that missing or malformed files produce appropriate error messages and exit codes.