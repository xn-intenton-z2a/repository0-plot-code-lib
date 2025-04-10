# CLI_API Feature Specification (Unified with HELP_SYSTEM and TUTORIAL_MODE)

## Overview
This feature unifies command line interactions, an optional HTTP API, an integrated help system, and now an interactive tutorial mode. The addition of Tutorial Mode provides a guided, step-by-step walkthrough for new users, reducing the learning curve and aligning with our mission to be the go-to plot library for formula visualisations.

## Unified CLI and Help Integration
- **Interactive CLI:** Offers step-by-step prompts, auto-completion, and command previews for efficient operation. The CLI integrates a context-sensitive help mode dynamically displaying usage instructions for current subcommands.
- **Dynamic Help System:** Automatically extracts usage examples and documentation from source comments and related markdown files. Help is available via common flags (`--help` or `-h`), providing tailored output based on the user's context (e.g., plotting, configuration, scheduling).
- **JSON Filtering:** Incorporates a `--jq` flag to enable jq-like filtering of JSON outputs, streamlining data processing.

## Integrated HTTP API Mode
- **API Activation:** A dedicated CLI flag (`--api`) launches an Express-based HTTP server.
- **RESTful Endpoints:** Provides endpoints such as `/plot`, `/config`, `/logs`, `/help`, and now `/tutorial`, which mirrors the CLI tutorial functionality for remote users.
- **Shared Logic:** Both CLI and HTTP API modes share core processing logic, ensuring consistent behavior, robust error handling, and unified configuration management across platforms.

## Tutorial Mode
- **Guided Walkthrough:** Introduces a new CLI flag (`--tutorial`) that launches an interactive walkthrough. This guided mode leads new users through key functionalities such as configuration setup, plotting commands, automation tasks, and usage of the chat assistant.
- **Step-by-Step Instructions:** The tutorial provides concise explanations, inline code examples, and interactive prompts that encourage hands-on exploration of the tool's capabilities.
- **Multimodal Access:** Accessible both via the CLI and the HTTP API (through the `/tutorial` endpoint), ensuring that both local and remote users benefit from guided onboarding.
- **Seamless Integration:** Integrates with existing help and configuration systems to offer contextual guidance and real-time tips during the tutorial session.

## Implementation Details
- **CLI Enhancements:** Update the CLI parser to recognize the new `--tutorial` flag, triggering the tutorial workflow.
- **HTTP Endpoint:** Add a new endpoint `/tutorial` that serves structured tutorial steps along with sample responses.
- **Modular Design:** The tutorial mode is developed as a modular component, ensuring it can be maintained and updated independently while reusing common CLI and API logic.
- **Testing:** Develop unit and integration tests simulating tutorial sessions to validate flow, user input handling, and proper guidance through all major functionalities.

## Testing and Documentation
- **Unit and Integration Tests:** Ensure coverage for interactive tutorial sessions, verifying that prompts, responses, and transitions between tutorial steps work as expected in both CLI and HTTP modes.
- **Documentation Updates:** Update README.md and CONTRIBUTING.md to include comprehensive usage examples and troubleshooting guidelines for the Tutorial Mode, making it accessible for new users.

## Benefits
- **Onboarding Efficiency:** Reduces the learning curve for new users by offering a clear, interactive, and guided introduction to the tool.
- **Enhanced User Support:** Provides immediate, context-aware assistance, improving user confidence and reducing support requests.
- **Seamless User Experience:** Integrates with existing CLI and HTTP functionalities to maintain a unified interface across all modes of operation.

## Summary
The updated CLI_API feature now incorporates a robust Tutorial Mode alongside its unified CLI, HTTP API, and help functionalities. This enhancement aligns with our mission by offering an intuitive, guided onboarding process that simplifies tool adoption and enhances the overall user experience.