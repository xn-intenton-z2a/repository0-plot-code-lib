# CLI_API Feature Specification (Unified with HELP_SYSTEM, TUTORIAL_MODE, and QUICK_TIPS)

## Overview
The CLI_API feature bridges command line interactions with an optional HTTP API, while also integrating a dynamic help system and interactive tutorial mode. In this update, we enhance the help and tutorial components by incorporating context-aware quick tips and an offline fallback for guidance. This ensures that both novice and experienced users have immediate access to relevant information, reinforcing our mission to be the go-to plot library for formula visualisations.

## Unified CLI and Help Integration
- **Interactive CLI:** Provides intelligent, step-by-step prompts, auto-completion, and preview suggestions that streamline user workflows. The CLI now also features inline quick tips triggered by context-sensitive hints to aid users in real-time.
- **Dynamic Help System:** Automatically extracts and displays usage examples and documentation from source comments and markdown files. Enhanced with a fallback offline help mode that offers precompiled guidance when online documentation or API lookups are unavailable.
- **JSON Filtering:** Retains the `--jq` flag functionality for jq-like JSON output filtering, ensuring integration with various data processing pipelines.

## Integrated HTTP API Mode
- **API Activation:** A dedicated CLI flag (`--api`) now launches an Express-based HTTP server that provides RESTful endpoints including `/plot`, `/config`, `/logs`, `/help`, and `/tutorial`.
- **Consistency Across Platforms:** All endpoints share core processing logic, making sure that CLI and HTTP API interactions offer the same level of robustness and error handling.

## Tutorial Mode and Quick Tips
- **Interactive Tutorial:** The `--tutorial` flag launches a guided walkthrough that explains key functionalities—configuration setup, plotting commands, automation tasks, and AI-powered assistance. This mode now features inline quick tips that highlight common pitfalls and best practices.
- **Quick Tips Integration:** Context-aware hints are integrated into both the CLI and HTTP API. These quick tips help users understand complex commands and provide troubleshooting advice in real-time.
- **Offline Fallback:** In scenarios where dynamic online assistance is unavailable, a precompiled set of help instructions ensures uninterrupted user support.

## Implementation Details
- **CLI Enhancements:** The CLI parser is updated to recognize new commands and flags. Quick tips are rendered based on the current context using a lightweight decision engine.
- **HTTP Endpoint Extensions:** The `/help` and `/tutorial` endpoints now return structured JSON content that includes both detailed instructions and quick tip summaries.
- **Modular Design:** The feature is designed modularly, allowing independent updates to the help system and tutorial mode without impacting the core CLI/API logic.
- **Testing:** New unit and integration tests have been developed to simulate tutorial sessions, verify quick tip accuracy, and validate offline fallback behavior.

## Testing and Documentation
- **Unit and Integration Tests:** Comprehensive tests cover interactive tutorials, context-sensitive quick tips, and API endpoint behaviors. Tests ensure that both online and offline guidance systems operate seamlessly.
- **Documentation Updates:** README.md and CONTRIBUTING.md are updated with extensive usage examples, including CLI commands, HTTP API invocations, and troubleshooting guidelines.

## Benefits
- **Enhanced Onboarding:** The interactive tutorial and quick tips significantly reduce the learning curve for new users, providing a smoother start-to-finish experience.
- **Robust User Support:** Immediate, context-aware guidance and offline help ensure that users always have access to essential information and troubleshooting tips.
- **Unified Experience:** By merging CLI and HTTP API help functionalities into a cohesive unit, the feature simplifies user interaction and maintains consistency across different modes of operation.

## Summary
This enhanced CLI_API feature not only streamlines command line and HTTP API interactions but also elevates user support through integrated, context-aware quick tips and an offline fallback help system. These improvements align with our mission of being the go-to plot library, delivering both powerful functionality and a superior user experience.