# Overview

Introduce support for configuration files to define CLI options in JSON or YAML format. Users can place common settings such as expression, range, points, format, and output in a config file and reduce repetitive flag usage.

# CLI Integration

- Add a new optional flag --config <path> (alias -c) to minimist options.
- Detect flag order: load config file first, then apply any explicit CLI flags to override values.
- Support JSON (extension .json) and YAML (extensions .yml, .yaml) via built-in JSON.parse and js-yaml’s safeLoad.
- Maintain existing flags: expression, range, points, format, output remain valid and take precedence over config values.

# Implementation

1. In src/lib/main.js, update minimist configuration to include string: ['config'] and alias: {c: 'config'}.
2. After parsing args, if args.config is present:
   1. Verify file exists and is readable; on failure, print error and set exit code.
   2. Read file contents synchronously.
   3. Determine parser based on file extension: JSON.parse for .json, js-yaml safeLoad for .yml/.yaml. On parse error, display clear message and exit with code 1.
   4. Validate loaded object contains allowed keys: expression, range, points, format, output.
   5. Merge config options with CLI args: for each allowed key use CLI if provided, else use config.
3. Validate merged options as before with parseRange and Zod schema.

# Tests

- Unit tests for main():
  - Loading a valid JSON config file produces expected options.
  - Loading a valid YAML config file produces expected options.
  - CLI flags override values in config file.
  - Missing config file or unreadable path yields error and exitCode 1.
  - Invalid config content yields parse error and exitCode 1.
- Integration tests:
  - main(['--config', 'test/fixtures/sample.json']) returns merged options.
  - main(['--config', 'sample.yml','--format','csv']) uses csv despite config specifying json.

# Documentation

- Update USAGE.md to include --config examples and syntax for JSON and YAML.
- Update README.md features list to mention Config File Support.
