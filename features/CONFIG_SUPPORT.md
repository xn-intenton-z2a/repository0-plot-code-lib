# CONFIG_SUPPORT Feature

## Overview
This feature introduces support for loading default CLI options from a configuration file. Users can now supply a configuration file using the `--config` flag. The file, expected to be in JSON format, may contain default values for options such as `--expression`, `--range`, and `--file`. When provided, these options are loaded and then overridden by any explicit CLI arguments, offering a flexible mechanism for predefining common settings.

## Implementation Details
- **Source File Updates (src/lib/main.js):**
  - Extend the `parseArgs` function to detect the `--config` flag.
  - If `--config` is provided, use `fs.readFileSync` to load and parse the JSON configuration file.
  - Merge the configuration defaults with the parsed CLI options, ensuring CLI arguments take precedence.

- **Test File Enhancements (tests/unit/main.test.js):**
  - Add test cases to simulate the presence of a configuration file using mocks for `fs.readFileSync`.
  - Validate that default options from the configuration file are correctly loaded and are overridden by any provided CLI flags.

- **README Updates (README.md):**
  - Update the usage section to document the new `--config` flag along with examples:

    ```sh
    node src/lib/main.js --config ./default-config.json
    ```

  - Explain the format and precedence of configuration options.

- **Dependencies File (package.json):**
  - No additional dependencies are required; the feature leverages the existing `fs` module for file operations.

## Rationale
This feature aligns with the mission to be the go-to plot library by enhancing usability of the CLI tool. It allows users to set up easy-to-reuse configurations, reducing the need to repeatedly specify common parameters and streamlining the workflow for generating plots.
