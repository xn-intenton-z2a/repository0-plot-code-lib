# CORE_ENGINE Feature

## Overview
The CORE_ENGINE remains the backbone of our plotting library, offering advanced plotting routines, interactive CLI wizard support, configuration file parsing, robust numeric parameter validation, dynamic formula parsing, and a unified logging system. In this update, we extend the engine with a new Dynamic Theme Manager to provide users greater control over plot aesthetics, making the library even more adaptable and user-friendly.

## Formula Parsing Engine
- **Objective:** Parse and validate mathematical formulae from user input using Math.js, enabling dynamic expression evaluation and conversion into plot data.
- **Implementation:**
  - Integrate Math.js for reliable parsing.
  - Validate mathematical expressions and provide clear error messages for malformed inputs.
  - Enable parsed expressions to seamlessly interface with advanced plotting routines.

## Configuration File Support
- Support for plot configuration through JSON and YAML files.
- Merge CLI arguments with configuration file settings with CLI parameters having precedence.
- Provide descriptive error messages for missing or malformed configuration files.

## Enhanced Numeric Validation & Logging
- **Numeric Validation:** Use Zod schema validation to ensure accuracy in converting numeric tokens, including support for various NaN aliases (configurable via environment variables).
- **Logging & Diagnostics:** Implement a unified logging mechanism to track numeric conversions, formula parsing, and configuration merging alongside detailed error reporting.

## Dynamic Theme Manager
- **Objective:** Empower users to customize the visual style of their plots through dynamic theming options.
- **Features:**
  - Allow configuration of plot elements including colors, fonts, backgrounds, grid styles, and other styling parameters.
  - Provide both CLI and Web API integrations for theme selection and customization.
  - Expose a dedicated module (e.g., `src/lib/themeManager.js`) that loads theme settings from configuration files or command-line arguments.
  - Enable live preview of themes in diagnostics or interactive modes to assist users in real-time theme selection.

## Integration and Testing
- **Integration:**
  - Seamlessly combine the Theme Manager with existing plotting functionalities in both CLI and Web API contexts.
  - Ensure that theme settings can override default styles without interfering with core plotting logic.
  - Maintain support for dynamic plugin integration wherein plugins can provide additional theming options if desired.
- **Testing:**
  - Update unit tests to cover theme configuration parsing and integration with plotting routines.
  - Enhance integration tests to verify that theme settings correctly modify plot outputs.

## Benefits
- **Customization:** Offers users the ability to tailor plot aesthetics to suit diverse presentation needs.
- **Enhanced User Experience:** Improves visual appeal and accessibility of plots through customizable themes.
- **Seamless Integration:** Integrates with the existing architecture, leveraging configuration file support and diagnostics for real-time theme adjustments.

## Documentation & Future Opportunities
- Update the README and CONTRIBUTING guidelines to include instructions on developing and applying custom themes.
- Future enhancements may include a theme marketplace or user-contributed theme repository, further extending the modularity of the CORE_ENGINE.
