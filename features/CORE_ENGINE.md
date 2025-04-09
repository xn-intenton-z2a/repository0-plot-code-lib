# CORE_ENGINE Feature

## Overview
The CORE_ENGINE is the backbone of our plotting library and handles multiple critical functionalities including advanced plotting routines, interactive CLI wizard, configuration file support, robust numeric parameter validation, dynamic formula parsing, and a unified logging system for diagnostics. This enhancement further refines the engine to include a dedicated Formula Parsing module that leverages the power of Math.js for dynamic expression evaluation and error handling.

## Formula Parsing Engine
- **Objective:** Provide users with the ability to input mathematical formulae as strings, which are then parsed, validated, and transformed into plot data or intermediate representations. This supports our mission to be the jq of formulae visualisations.
- **Implementation:**
  - Integrate Math.js to parse and evaluate mathematical expressions reliably.
  - Support standard mathematical operations and functions as well as custom variables.
  - Validate expressions and provide clear error messages in cases of malformed or unsupported expressions.
  - Allow the parsed formulae to interact seamlessly with the advanced plotting functions, ensuring that user inputs can be visualized accurately.
- **Usage Examples:**
  - Users can input a formula like `sin(x) + log(x)` which the engine parses and converts into a corresponding data series for plotting.
  - Error handling will catch syntax errors and advise on correct formatting.

## Configuration File Support
- Enable users to provide plot configurations using JSON or YAML files.
- The configuration loader module properly merges CLI arguments and configuration file settings, with CLI parameters taking precedence.
- Provides descriptive error messages for missing or malformed configuration files.

## Enhanced Numeric Parameter Validation and Logging
- **Numeric Validation:** Utilizes Zod schema validation to ensure numeric parameters are parsed accurately (supporting integers, decimals, scientific notation, and multiple NaN aliases).
- **Debug Logging:** Employs a unified logging module replacing ad hoc console logs. Logging is standardized, with dynamic verbosity controlled by environment variables.
- **Diagnostics:** The engine logs parameter conversion and formula parsing events, aiding in easier maintenance and troubleshooting.

## Integration and Testing
- The CORE_ENGINE is integrated with all advanced plotting functionalities, including CLI wizard and Web API interfaces.
- Comprehensive unit and integration tests verify numeric conversion, formula parsing, logging, and configuration handling.
- Documentation in the README and CONTRIBUTING files is updated to detail the usage of formula parsing and enhanced validation features.

## Benefits
- **Enhanced Functionality:** Direct formula parsing enables users to input complex expressions which are immediately converted for visualization.
- **Robust Error Handling:** Improved validations and clear error messages ensure a smooth user experience even when inputs are malformed.
- **Unified Experience:** The changes maintain backward compatibility while integrating new features seamlessly with existing plotting and configuration logic.