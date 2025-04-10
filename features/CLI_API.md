# CLI_API Feature Specification (Unified with HELP_SYSTEM)

## Overview
This feature unifies command line interactions, an optional HTTP API, and an integrated help system into a single, cohesive interface. With this consolidation, users can interact with the plotting library via a traditional CLI with context-aware help, JSON filtering, and interactive prompts, or through remote HTTP endpoints. This unified approach reduces redundancy and simplifies the overall architecture, in line with our mission to be the go-to plot library for formula visualisations.

## Unified CLI and Help Integration
- **Interactive CLI:** Offers step-by-step prompts, auto-completion, and command previews. The CLI now integrates a context-sensitive help mode that dynamically displays usage instructions based on the current subcommand.
- **Dynamic Help System:** Automatically extracts usage examples and documentation from source comments and associated markdown files. Users can invoke help via common flags (`--help` or `-h`), receiving tailored output depending on their context (e.g., plotting, configuration, scheduling).
- **JSON Filtering:** Incorporates jq-like filtering directly within the CLI using a `--jq` flag to streamline the viewing and processing of JSON outputs.

## Integrated HTTP API Mode
- **API Activation:** A dedicated CLI flag (`--api`) launches an Express-based HTTP server.
- **RESTful Endpoints:** Provides endpoints such as `/plot`, `/config`, `/logs`, and `/help`, mirroring CLI functionalities. The `/help` endpoint returns structured documentation and usage guidelines for API consumers.
- **Shared Logic:** Both CLI and HTTP API modes utilize common processing logic, ensuring consistent behavior, error handling, and configuration management across platforms.

## Developer and User Benefits
- **Dual-Mode Access:** Users benefit from both a powerful, interactive CLI and a remote API for automation and integration with other systems.
- **Enhanced Documentation:** With the unified help system, users receive immediate, context-aware guidance, improving onboarding and overall user experience.
- **Streamlined Maintenance:** Consolidating two previously separate features into one reduces code duplication and simplifies future enhancements.

## Testing and Documentation
- **Testing:** Comprehensive unit and integration tests cover interactive CLI sessions, HTTP endpoint responses, JSON filtering, and help system outputs. Emphasis is placed on both standard operations and edge-case scenarios.
- **Documentation Updates:** README.md and CONTRIBUTING.md are updated to reflect the merged feature’s capabilities. Usage examples include both CLI invocations and sample HTTP requests, ensuring clarity for new and existing users.

## Summary
The unified CLI_API feature now incorporates comprehensive help system functionality alongside traditional CLI and HTTP API interactions. This merger offers an intuitive, context-aware interface while consolidating redundant documentation and intervention layers, fully aligning with our goal to be the go-to plot library for formula visualisations.