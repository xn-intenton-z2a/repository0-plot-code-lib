# CORE_ENGINE

## Overview
The CORE_ENGINE remains the backbone of our plotting library, responsible for advanced plotting functions, robust numeric parameter validation, an interactive CLI wizard, formula parsing, and diagnostics mode. In this update, we are enhancing the CORE_ENGINE to include configuration file support, allowing users to load plot settings from an external file (JSON or YAML), thus providing more flexibility and ease-of-use for complex visualization scenarios.

## Configuration File Support
- **Purpose:** Introduce a mechanism that lets users define plot configurations and defaults in a configuration file. This allows for pre-setting parameters and preferences without always relying on command-line arguments.
- **Supported Formats:** The feature will support JSON and YAML formats using built-in Node capabilities or simple libraries (if needed from dependencies).
- **Command-line Flag:** A new flag `--config` will be introduced. When provided, the CORE_ENGINE will read and parse the configuration file before processing any CLI arguments.

## Implementation Details
- **Configuration Loader Module:** Implement a lightweight module (in the same repository) that reads a file path provided via the `--config` flag, determines the file format (e.g., by extension), and loads the configuration data.
- **Integration:** Integrate the loaded configuration into the existing parameter processing logic in the CORE_ENGINE. The configuration file settings will override or supplement command-line parameters, but explicit CLI arguments will take priority.
- **Validation:** Use the existing numeric parameter validation and formula parsing routines to validate any configuration-driven plot parameters.
- **Fallbacks:** If the configuration file is missing or formatted incorrectly, a clear warning message will be logged and defaults will be used.

## Usage Examples
- **CLI Usage:**
  ```bash
  node src/lib/main.js --config config.json "quad: 1, 2, not a number, -3.5E+2"
  ```
- **Configuration File Example (JSON):**
  ```json
  {
    "defaultPlot": "spiral",
    "params": "1,NaN,5,-10,10,1",
    "advanced": true
  }
  ```

## Benefits
- **Flexibility:** Users can define and reuse configuration files, streamlining repetitive plotting tasks.
- **Usability:** Makes it easier for non-technical users to set defaults without memorizing complex CLI parameters.
- **Integration:** Harmonizes with the existing plugin system and diagnostics mode to provide a unified experience.

## Testing and Documentation
- Update unit tests and integration tests (in tests/unit and tests/web) to cover configuration file loading, format validation, and seamless merging with CLI arguments.
- Update README and CONTRIBUTING guidelines with usage examples and troubleshooting tips for configuration file support.

