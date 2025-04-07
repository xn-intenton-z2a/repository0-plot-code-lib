# CONFIG_SUPPORT Feature Specification

## Description
This feature provides support for user-defined configuration files to customize default plotting parameters for the library. In addition to the existing JSON configuration support, this update introduces optional YAML support to widen the range of configuration file formats accepted by the CLI. Users can now provide either a JSON or a YAML configuration file to specify default plot settings such as colors, grid styles, axes labels, and output formats. This enhancement reduces the need for repeated command-line arguments and improves the overall user experience while remaining faithful to our mission of offering versatile visualisations.

## Motivation
- **Customizability:** Users can personalize and streamline their plotting outputs by predefining configuration parameters in a file.
- **Flexibility:** Support for both JSON and YAML formats allows users to choose their preferred configuration structure.
- **Consistency:** Ensure consistent plot styling across commands while allowing ad-hoc overrides through CLI flags.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI option `--config <path>` to specify the configuration file path.
   - The application will detect the configuration file type based on its extension (e.g., `.json`, `.yaml`, or `.yml`).
   - Update the main script (src/lib/main.js) to load and parse the configuration file accordingly.

2. **Configuration Parsing:**
   - For JSON files, continue to use a standard JSON parser as previously implemented.
   - For YAML files, integrate a YAML parser, such as `js-yaml`. If the library is not installed, instruct the user on how to add it as an optional dependency.
   - Validate configuration parameters using a schema (e.g., via `zod`) to ensure values and types are correct.
   - Allow configuration values to be overridden by CLI flags when specified.

3. **Plotting Parameter Defaults:**
   - Merge configuration options with existing CLI arguments. For example, default color schemes, grid visibility, and axes parameters should be applied based on the provided configuration file.
   - Document edge cases and fallback behavior when configuration file values are invalid or missing.

4. **Documentation and Tests:**
   - Update the README with examples illustrating how to use both JSON and YAML configuration files. For instance:
     ```bash
     node src/lib/main.js --config config.yaml output.svg "quad:1,0,0,-10,10,1"
     ```
   - Update the configuration file example documents in `features/CONFIG_SUPPORT.md` and README.
   - Extend unit tests to check that configuration files in both JSON and YAML formats are parsed and merged correctly.

## Usage
- **Via CLI:**
  ```bash
  node src/lib/main.js --config path/to/config.json output.svg "quad:1,0,0,-10,10,1"
  node src/lib/main.js --config path/to/config.yaml output.svg "quad:1,0,0,-10,10,1"
  ```

- **Configuration File Examples:**
   **JSON (`config.json`):**
   ```json
   {
     "defaultColor": "#3498db",
     "showGrid": true,
     "axisLabelFontSize": 12
   }
   ```
   **YAML (`config.yaml`):**
   ```yaml
   defaultColor: "#3498db"
   showGrid: true
   axisLabelFontSize: 12
   ```

This feature update aligns with our mission by enhancing the flexibility and usability of the plotting tool, making it a more robust and user-friendly solution for mathematical visualisations.