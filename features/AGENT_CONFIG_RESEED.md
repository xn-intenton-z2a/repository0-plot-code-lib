# AGENT_CONFIG_RESEED

## Overview

Add a reseed subcommand to the CLI that reads an agentic lib YAML configuration file, parses it, and outputs the configuration as JSON. This facilitates seeding and reseeding the repository with updated agentic lib driven settings.

## CLI Usage

- repository0-plot-code-lib reseed
- repository0-plot-code-lib reseed --config <path>
- repository0-plot-code-lib reseed -c <path>

When invoked, the tool reads the specified configuration file or defaults to agent config yaml in the project root, parses it using js yaml, and prints the JSON representation of the configuration.

## Implementation Details

1. Extend main js to detect the first CLI argument reseed and shift processing into reseed mode.
2. Accept a --config or -c option to specify the path to the YAML file.
3. Use fs promises readFile to load the YAML file asynchronously.
4. Parse the file content with js yaml load or safeLoad.
5. Log the parsed object via console log with JSON stringified output.
6. If the file cannot be read or parsed, exit with a non zero code and print an error to stderr.

## Testing

- Mock fs promises readFile to return a sample YAML string.
- Test that calling main with reseed and config path results in console log being called with the expected JSON string.
- Verify that errors in file read or YAML parsing are reported and cause process exit with non zero code.
