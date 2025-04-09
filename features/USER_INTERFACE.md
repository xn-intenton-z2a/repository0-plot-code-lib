# USER_INTERFACE Feature

## Overview
This feature consolidates the interactive CLI wizard and the web API endpoints into a unified user interface layer. The enhanced USER_INTERFACE will provide context-sensitive help, interactive plotting configuration, and real-time feedback across both command-line and web environments. This merge reinforces our mission to be the go-to tool for formula visualisations by ensuring consistency of user experience across all access points.

## Key Enhancements
- **Unified Interaction:**
  - Combine the existing CLI wizard with web API endpoints to offer a seamless, integrated experience.
  - Provide context-sensitive guidance regardless of whether the user is on the command line or accessing via HTTP.
- **Interactive CLI Improvements:**
  - Maintain step-by-step prompts, real-time input validation, and integrated help content.
  - Leverage existing numeric validation and formula parsing from the CORE_ENGINE.
- **Web API Integration:**
  - Expose HTTP endpoints that mirror CLI functionalities such as plot type selection, parameter configuration (numeric and JSON-based), and dynamic help responses.
  - Implement real-time control commands over HTTP (e.g., start, pause, resume animations) that integrate with PLOT_ANIMATIONS and CORE_ENGINE features.
- **Enhanced Documentation & Testing:**
  - Update the README and CONTRIBUTING guidelines to reflect unified interface usage examples for both CLI and web.
  - Extend unit and integration tests to cover the merged functionality across different environments.

## Implementation Roadmap
1. **Refactor CLI Wizard:**
   - Update the existing CLI module to support additional HTTP endpoint triggers and merge its help and configuration logic into a common interface module.
2. **Develop Web Endpoints:**
   - Create new endpoints (e.g., `/api/plot`, `/api/help`) in the express-based web server to handle interactive plotting commands and context-sensitive help.
3. **Integration & Synchronization:**
   - Ensure that both CLI and Web interactions use the same underlying CORE_ENGINE routines and configuration settings.
   - Provide a consistent fallback strategy (e.g., still images if animations are unsupported) for both modes.
4. **Testing & Documentation:**
   - Expand test coverage to validate both CLI and HTTP-based interactions.
   - Update the user documentation with detailed scenarios covering how to use the unified interface.

## Benefits
- **Consistency:** One unified interface means users have the same experience across CLI and web platforms.
- **Enhanced Accessibility:** Web API endpoints broaden access for remote and browser-based interactions.
- **Streamlined Maintenance:** Consolidating similar functionalities into one module reduces code duplication and improves maintainability.
