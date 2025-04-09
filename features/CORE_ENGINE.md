# CORE_ENGINE Feature (Updated)

## Overview
The CORE_ENGINE remains the backbone of our plotting library, managing advanced plotting routines, interactive CLI support, configuration parsing, robust numeric validation, dynamic formula interpretation, and unified logging. In this update, we integrate existing functionalities with new capabilities for enhanced JSON-based configuration and batch plotting commands, reinforcing our mission to be the go-to tool for formula visualisations.

## Formula Parsing Engine
- **Objective:** Parse and validate mathematical formulae using Math.js to enable dynamic expression evaluation and conversion into plot data.
- **Implementation Details:**
  - Integrate Math.js for robust and reliable parsing.
  - Validate and transform expressions with clear error messaging.
  - Seamlessly integrate parsed expressions with advanced plotting routines.

## Configuration File Support
- **Capabilities:**
  - Support for both JSON and YAML configuration files.
  - Merge CLI arguments with configuration file settings, where CLI parameters take precedence.
  - Provide descriptive error messages for misconfigurations.

## Enhanced Numeric Validation & Logging
- **Numeric Validation:**
  - Employ Zod schema validation to accurately convert numeric tokens and manage international NaN aliases.
- **Logging & Diagnostics:**
  - Provide unified logging for numeric conversions, formula parsing, and configuration merging.
  - Offer detailed error reporting and optional debug logging via environment variables.

## Dynamic Theme Manager
- **Objective:** Allow users to customize the visual style of their plots.
- **Features:**
  - Configure visual elements (colors, fonts, grid styles) through CLI or API.
  - Load theme settings from configuration files or command-line arguments.
  - Provide live previews in diagnostic or interactive modes for real-time customization.

## Export Manager
- **Objective:** Enable users to export plots in multiple formats including SVG, JSON, CSV, Markdown, ASCII, and HTML.
- **Features:**
  - Implement a dedicated module to manage exporting logic.
  - Support both CLI and web API integrations for exporting plots.
  - Allow export format specification via command-line flags or JSON configuration with format-specific customization options.

## JSON Configuration Support
- **Objective:** Enhance parameter configuration by allowing users to pass detailed JSON objects for advanced plot settings.
- **Features:**
  - Accept JSON strings (starting with `{` and ending with `}`) in both advanced and standard modes to configure plot details such as data arrays, labels, colors, and titles.
  - Parse JSON configurations with robust error handling to ensure smooth integration with existing numeric and plotting routines.
  - Update documentation and tests to include examples of JSON-based configuration usage.

## Batch Plotting Commands
- **Objective:** Allow multiple plotting commands in one CLI invocation to enhance productivity and scriptability.
- **Features:**
  - Sequentially process a mix of advanced (`--advanced`) and non-advanced commands in a single run.
  - Ensure independent validation and error handling for each plotting command.
  - Maintain clarity in output logging for batch execution, improving diagnostics and debugging.

## Integration and Testing
- **Seamless Integration:**
  - Merge new JSON configuration and batch command processing with existing plotting functionalities.
  - Ensure backward compatibility with legacy CLI and API integrations.

- **Testing:
  - Update unit and integration tests to cover JSON-based parameter configuration and batch command processing.
  - Ensure API references and usage examples in the documentation are up to date.

## Benefits
- **Comprehensive Functionality:** Combines core plotting, dynamic theming, export capabilities, JSON configuration, and batch command support in a unified engine.
- **User Flexibility:** Enhances customization through detailed JSON configurations and efficient batch processing, catering to varied presentation and data processing needs.
- **Mission Alignment:** Directly supports our goal of providing a versatile, user-friendly, and go-to formula visualisation tool.
