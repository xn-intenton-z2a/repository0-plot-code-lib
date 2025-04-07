# CONFIG_SUPPORT Feature Specification

## Description
This feature introduces support for user-defined configuration files to customize default plotting parameters. Users can now provide a configuration file (in JSON format) to specify default values for plot settings, such as colors, grid styles, axes labels, and output formats. This addition aims to reduce repeated command-line argument specifications and enhance the overall user experience.

## Motivation
- **Customization:** Enable users to personalize their plotting outputs without modifying the CLI usage each time.
- **Consistency:** Use a configuration file to ensure consistent plot styling and behavior across different invocations.
- **Flexibility:** Allow configuration settings to be overridden via CLI flags, integrating default configurations with ad-hoc customizations.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI option `--config <path>` to allow users to pass the path to a JSON configuration file.
   - Update the main script (src/lib/main.js) to detect the presence of this flag and load the configuration file.

2. **Configuration Parsing:**
   - Use a reliable JSON parser (or optionally include YAML support in the future) to read and validate user-supplied configuration files.
   - Validate configuration parameters against a schema to ensure correct values and types before applying defaults.

3. **Plotting Parameter Defaults:**
   - Integrate the configuration settings with existing plotting functions so that defaults such as color schemes, grid visibility, axes labels, and sizes are applied automatically.
   - Allow command-line arguments to override configuration file settings when necessary.

4. **Documentation and Tests:**
   - Update the README with usage examples that include configuration file usage.
   - Write unit tests to verify configuration file parsing, validation, and proper integration with the plotting components.

## Usage
- **Via CLI:**
  ```bash
  node src/lib/main.js --config path/to/config.json output.svg "quad:1,0,0,-10,10,1"
  ```
- **Configuration File Example (`config.json`):**
  ```json
  {
    "defaultColor": "#3498db",
    "showGrid": true,
    "axisLabelFontSize": 12
  }
  ```

This feature aligns with our mission to be the go-to plotting library by providing enhanced flexibility and user-tailored visualizations.