# CONFIG_SAVE Feature Enhancement

This feature introduces a new CLI flag, `--save-config`, which enables users to persist all the current CLI options (including those provided via YAML configuration and command-line arguments) into a YAML file (default name: `plot-config.yaml`). This enhancement helps users save a snapshot of their desired plot configuration for future runs and reuse it by passing the saved file with the existing `--config-yaml` flag. 

## Overview

- **Objective:** Allow users to export the current CLI configuration to a YAML file for reuse and versioning of their plot settings.
- **Benefit:** Simplifies repetitive command invocations by persisting frequently used parameters and reduces the chance of errors by enabling a configuration file workflow.
- **Usage Example:** 
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --save-config
  ```
  This command will generate the plot as usual and, in addition, save the used parameters in a file called `plot-config.yaml`.

## Implementation Details

- **Source Code Changes (src/lib/main.js):**
  - Parse the new flag `--save-config` among the CLI arguments.
  - When the flag is present, collect all effective configurations (combining both CLI parameters and any YAML configurations already loaded) into a single object.
  - Use the `js-yaml` library to serialize the configuration object and write it to a file named `plot-config.yaml` (or a name specified by an optional additional flag, e.g. `--config-out <filename>`).
  - Print a confirmation message in the console indicating that the configuration was saved successfully.
  - The generation of the plot should proceed as normal; the config saving is an additional side effect.

- **Test Enhancements (tests/unit/main.test.js):**
  - Add tests to simulate invoking the CLI with the `--save-config` flag.
  - Verify that when this flag is active, a YAML file is created containing the expected configuration parameters.
  - This test should mock file system writes (using spies on `fs.writeFileSync`) and check that the content is valid YAML and includes keys such as `expression`, `range`, `file`, etc.

- **Documentation Updates (README.md):**
  - Update the README to include a section documenting the new `--save-config` flag with usage examples. Explain that the flag outputs a configuration file which can be reused by the existing `--config-yaml` flag.

## Conformance with Mission and Guidelines

- **Repository Impact:**
  - Changes are restricted to updating the source file (`src/lib/main.js`), the appropriate test file (`tests/unit/main.test.js`), and the README file. No new files are added or deleted.
- **Mission Alignment:**
  - This feature reinforces the mission by lowering the barrier to repeated use and helping users achieve a seamless workflow for plotting by persisting their custom settings.
