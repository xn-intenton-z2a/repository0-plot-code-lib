# CONFIG_LOADER Feature Enhancement

This feature adds the ability to load configuration options from a YAML file via a new CLI flag (--config). When provided, the CLI will read the specified configuration file and merge its settings with other command-line arguments. This simplifies repeated invocation by allowing users to store their frequently used parameters in a configuration file. This enhancement adheres to the repository guidelines by modifying only the source, test, README, and dependencies file content.

## Overview

- Introduce a new optional flag `--config` that accepts a file path to a YAML configuration file.
- If the `--config` flag is provided, use the `js-yaml` library (already included as a dependency) to load the configuration.
- Merge the settings from the configuration file with direct CLI arguments, where CLI arguments override file settings.
- Provide clear error messages in case the YAML file cannot be read or parsed.

## Implementation Details

### Source Code Changes (src/lib/main.js)

- Update the main function to parse an additional `--config` flag from `process.argv`.
- If the flag is present, use `js-yaml` and Node's `fs` module to read and parse the YAML file.
- Merge the configuration object with the existing CLI arguments. For example, if the config file provides default values for `--expression`, `--range`, or `--file`, they should automatically be applied unless overridden by CLI.
- Ensure that error handling is in place: if the file does not exist or there is a YAML syntax error, print a clear error message and exit gracefully.

### Test Enhancements (tests/unit/main.test.js)

- Add test cases to simulate passing the `--config` flag with a sample YAML string. Stub the file reading process or provide a temporary file to validate that configuration values are correctly merged.
- Validate that when both a configuration file and direct CLI arguments are provided, the CLI arguments take precedence.
- Ensure tests cover scenarios where the configuration file is missing or contains invalid YAML.

### Documentation Updates (README.md)

- Update the README with a new section documenting the `--config` flag usage.
- Provide an example command such as:

```sh
node src/lib/main.js --config config.yaml
```

- Include a sample `config.yaml` snippet in the documentation:

```yaml
# config.yaml
expression: "y=sin(x)"
range: "x=-10:10, y=-1:1"
file: "output.svg"
```

### Dependency and Build Consistency

- No new dependencies are required since `js-yaml` is already a dependency.
- Ensure that file reading respects Node’s ESM standards.

## Conformance with Mission and Guidelines

- This enhancement supports the mission of making the CLI more user-friendly by reducing the need to repeatedly specify common parameters.
- All changes are confined to the source file, tests, and documentation, in compliance with repository guidelines.
