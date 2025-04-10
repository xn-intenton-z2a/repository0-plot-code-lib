# CLI_API Feature Specification

## Overview
The CLI_API feature unifies command line interactions with an optional HTTP API mode, merging the functionalities previously provided by CLI_INTERFACE and JQ_FILTER. This integrated interface allows users to interact with the plotting library either via a traditional CLI, complete with interactive prompts, auto-completion, and JSON filtering, or through a lightweight HTTP API for remote operations. This design is in line with our mission to be the go-to plot library for formula visualisations, providing flexibility and accessibility for both local and network-based workflows.

## Implementation Details
### Unified CLI and JSON Filtering
- **Interactive CLI:** Enhance the command line experience with step-by-step prompts, detailed command previews, and robust validation of user input.
- **Alias and Localization Support:** Continue to support custom command aliases and multi-language localizations as in the original CLI_INTERFACE feature.
- **JSON Filtering Capability:** Incorporate jq-like filtering directly into the CLI, allowing users to apply filter expressions (e.g., via a `--jq` flag) to JSON outputs from various commands.

### Integrated HTTP API Mode
- **API Activation:** Introduce a new CLI flag (e.g., `--api`) that launches an Express-based HTTP server.
- **RESTful Endpoints:** Provide endpoints such as `/plot`, `/config`, and `/logs` which mirror the functionalities of the CLI. These endpoints can be used to:
  - Generate plots using the underlying PLOT_ENGINE.
  - Retrieve and update configurations from the CONFIG_MANAGER.
  - Access activity logs and diagnostics from the ACTIVITY_MANAGER.
- **Seamless Operation:** Ensure that both CLI and HTTP modes share common logic for command processing, error handling, and configuration management, thereby reducing code duplication and ensuring consistent behavior.

### Testing and Documentation
- **Comprehensive Testing:** Develop unit and integration tests covering both CLI interactions (including JSON filtering) and HTTP API endpoints. Ensure that edge cases and error scenarios are well-handled in both modes.
- **Documentation Updates:** Update README.md and CONTRIBUTING.md to reflect the new unified interface. Provide clear usage examples demonstrating both CLI operations and HTTP API invocations, including sample curl commands for the API mode.
- **Developer Guidelines:** Outline the integration points between CLI and HTTP functionalities and provide guidance on maintaining this unified interface in future updates.

## Benefits
- **Dual-Mode Access:** Users can choose their preferred interaction mode, whether it’s the intuitive CLI or a programmatically accessible HTTP API.
- **Streamlined Workflow:** By merging CLI functionalities with HTTP capabilities, the feature reduces redundancy in the codebase and simplifies maintenance.
- **Enhanced Data Interrogation:** The built-in JSON filtering tool offers flexibility in processing and viewing output data, making it easier to integrate with external tools.
- **Mission Alignment:** Supports our mission by delivering a versatile tool that caters to both command line enthusiasts and users needing remote, API-driven access.

## Summary
The CLI_API feature consolidates and extends our command line interface by integrating advanced interactive features with a RESTful HTTP API mode. This merger not only simplifies the repository by replacing the CLI_INTERFACE and JQ_FILTER features, but also enhances the overall usability and accessibility of the plotting tool. By providing a consistent and powerful interface for both local and remote operations, CLI_API reinforces our commitment to making repository0-plot-code-lib the go-to plot library for formula visualisations.