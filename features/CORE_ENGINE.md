# CORE_ENGINE Feature (Updated)

## Overview
The CORE_ENGINE remains the backbone of our plotting library, managing advanced plotting routines, interactive CLI support, configuration parsing, robust numeric validation, dynamic formula interpretation, and unified logging. In this update, we extend the engine with two significant enhancements: a Dynamic Theme Manager and an Export Manager. The Export Manager enables users to export plots in multiple formats, aligning with our mission to be the go-to tool for formula visualisations.

## Formula Parsing Engine
- **Objective:** Parse and validate mathematical formulae using Math.js to enable dynamic expression evaluation and conversion into plot data.
- **Implementation:**
  - Integrate Math.js for reliable parsing.
  - Validate expressions with clear error messaging.
  - Seamlessly interface parsed expressions with advanced plotting routines.

## Configuration File Support
- **Features:**
  - Support configuration via JSON and YAML.
  - Merge CLI args with configuration file settings (CLI parameters take precedence).
  - Provide descriptive error messages for configuration issues.

## Enhanced Numeric Validation & Logging
- **Numeric Validation:**
  - Utilize Zod schema validation to accurately convert numeric tokens, including accepted international NaN aliases.
- **Logging & Diagnostics:**
  - Unified logging to track numeric conversions, formula parsing, and configuration merging.
  - Detailed error reporting and optional debug logging via environment variables.

## Dynamic Theme Manager
- **Objective:** Empower users to customize the visual style of their plots.
- **Features:**
  - Configure plot elements such as colors, fonts, and grid styles via CLI or web API.
  - Load theme settings from configuration files or command-line arguments.
  - Provide live preview in diagnostic or interactive modes for real-time theme selection.

## Export Manager
- **Objective:** Enable users to export their plots in a variety of formats including SVG, JSON, CSV, Markdown, ASCII, and HTML.
- **Features:**
  - Introduce a dedicated module (`src/lib/plotExport.js`) to encapsulate exporting logic.
  - Support integration with both CLI and web API interfaces.
  - Allow users to specify export format via command-line flags (e.g., `--export format=SVG`) or within JSON-based configuration.
  - Ensure output consistency and format-specific customization through configuration.

## Integration and Testing
- **Integration:**
  - Seamlessly merge export routines with existing plotting functionalities.
  - Ensure that export settings can override default display formats without impacting core plotting logic.
  - Maintain backward compatibility with existing CLI and web API integrations.
- **Testing:**
  - Update unit and integration tests to cover export functionality across supported formats.
  - Enhance documentation in README and CONTRIBUTING guides with usage examples and configuration details.

## Benefits
- **Comprehensive Functionality:** Combines core plotting, theming, and export capabilities in a single, unified engine.
- **User Flexibility:** Supports a wide range of output formats to facilitate different presentation or data processing needs.
- **Mission Alignment:** Directly contributes to our goal of being a versatile and user-friendly formula visualisation tool.
