# Summary
Add support for external configuration files to define default CLI options. Users can create a .plotrc.json or .plotrc.yaml file in the working directory or in their home directory to customize chart type, dimensions, data source, expression settings, and output preferences.

# Behavior
When the CLI is invoked:
1. If the --config flag is provided, attempt to load the specified file.
2. Otherwise, look for .plotrc.json, .plotrc.yaml, or .plotrc.yml in the current working directory.
3. If none is found, search for .plotrc.json or .plotrc.yaml in the user’s home directory.

Upon finding a config file, parse its contents and merge the values with the default flag settings. CLI flags always override config file values. If parsing fails or the config violates schema, print a descriptive error and exit with code 1.

# CLI Flags
--config <filePath>    Path to a configuration file (JSON or YAML) to load default CLI options. CLI flags override values defined in the config file.

# Implementation Details
- Use fs.promises to check for file existence and read file contents.
- Detect file format by extension: .json for JSON.parse, .yaml/.yml for js-yaml.
- Define a zod schema that matches existing plot command flags: type, width, height, data, expression, xmin, xmax, samples, output.
- Merge config object with default settings, then override with parsed CLI flags before invoking handlers.
- Update src/lib/main.js to integrate config loading logic before flag parsing.

# Testing
- Mock fs.readFile and fs.stat to simulate presence of JSON and YAML config files. Verify that main() correctly merges config values and invokes plot or reseed handlers with expected options.
- Test invalid config content: mock malformed JSON or YAML and assert main() logs an error message and exits with code 1.
- Test precedence: config sets type and width; CLI flag sets type only. Verify that width comes from config and type from CLI.

# Documentation
- In README.md, add a "Configuration File" section with an example .plotrc.json:
{
  "type": "scatter",
  "width": 300,
  "height": 200,
  "data": "measurements.csv"
}
- Show example invocations:
repository0-plot-code-lib plot --config .plotrc.json
repository0-plot-code-lib plot --config user-settings.yml --type bar