# CLI_INTERFACE Feature Specification (Enhanced with Localization)

## Overview
The CLI_INTERFACE feature provides an interactive and user-friendly command line experience for plotting, including guided wizards, dynamic auto-completion, command previews, and robust configuration validation. In this update, we have merged dedicated localization support to ensure that users receive prompts, error messages, and help text in their preferred language. This enhancement aids in reducing configuration errors and improves usability, aligning with our mission of being the go-to plot library for formula visualisations.

## Interactive Guidance and Command Preview
- **Step-by-Step Prompts:** Detailed guidance for entering formulas, intervals, steps, and output options, with inline help and references to documentation.
- **Command Preview:** Allows users to review, edit, or cancel their input before execution, reducing configuration mistakes.

## Auto-Completion and Assistance
- **Dynamic Suggestions:** Auto-completion for command options and flags using Node.js readline interface with contextual suggestions based on past command history.
- **Formula Assistance Integration:** Supports flags such as `--trace` for evaluation logs, `--autocorrect` for error corrections, and `--chat` to launch an interactive help session via the OpenAI API.

## Offline Assistance
- **Heuristic Analysis:** Automatically falls back to a local heuristic engine using pattern matching and regular expressions when the network is unavailable or the OpenAI API is unresponsive.
- **Actionable Suggestions:** Provides clear suggestions and corrections for common mathematical errors.

## Demo Mode and Configuration Validation
- **Demo Mode:** The `--demo` flag initiates a guided demonstration of key plotting commands and configuration steps.
- **Pre-Execution Checks:** Validates configuration inputs from environment variables, JSON configuration files, and CLI arguments before command execution, reverting to secure defaults when needed.

## Localization Support
- **Language Detection:** Automatically detects the system locale or accepts a language flag (e.g., `--lang`) to set the preferred language for all CLI interactions.
- **External Language Packs:** Loads language-specific JSON files (e.g., `locales/en.json`, `locales/es.json`) to provide translated prompts, error messages, and help text.
- **Fallback Mechanism:** If a language pack is missing or incomplete, defaults to English to ensure continuity in user experience.
- **Integration:** Embeds localized content into command previews, error messages, and interactive prompts to support non-English speaking users.

## Testing and Documentation
- **Unit and Integration Tests:** Comprehensive testing covering interactive sessions, both online and offline assistance, command preview functionality, localization, and configuration validation scenarios.
- **Documentation Updates:** README.md and CONTRIBUTING.md are updated with examples showing localized command outputs, usage instructions, and troubleshooting guidelines.

## Benefits
- **Enhanced Usability:** Combining interactive prompts, auto-completion, and localized help messages creates an inclusive and user-friendly CLI.
- **Error Reduction:** Proactive validations and localized guidance reduce misconfigurations and user errors.
- **Global Accessibility:** Localization support broadens the tool's appeal and usability to non-English speaking users worldwide.

## Summary
The updated CLI_INTERFACE feature now not only integrates guided interactions, dynamic auto-completion, and robust configuration validations, but also includes comprehensive localization support. By merging the dedicated localization functionality into CLI_INTERFACE, we ensure a seamless and globally accessible command line experience that aligns with our mission to be the definitive tool for formula visualisations.