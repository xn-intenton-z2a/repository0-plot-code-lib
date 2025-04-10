# CLI_INTERFACE Feature Specification (Enhanced with Localization and Alias Management)

## Overview
The CLI_INTERFACE feature provides an interactive and user-friendly command line experience for plotting, including guided wizards, dynamic auto-completion, command previews, and robust configuration validation. In this update, we have merged dedicated localization support and a new alias management system to ensure users can define, store, and use custom command aliases to accelerate frequent operations. This extension further aligns with our mission of being the go-to plot library for formula visualisations.

## Interactive Guidance and Command Preview
- **Step-by-Step Prompts:** Detailed guidance for entering formulas, intervals, steps, and output options, complete with inline help and references to documentation.
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
- **Fallback Mechanism:** Defaults to English if a language pack is missing or incomplete to ensure continuity in user experience.
- **Integration:** Embeds localized content into command previews, error messages, and interactive prompts to support non-English speaking users.

## Alias Management
- **Custom Command Aliases:** Enables users to define shortcuts for frequently used command combinations to streamline repetitive tasks.
- **CLI Commands:** Introduces new CLI flags such as `--add-alias <alias>=<command>`, `--list-aliases`, and `--remove-alias <alias>` to manage custom aliases directly from the command line.
- **Persistent Storage:** Saves alias definitions to a dedicated JSON file (e.g., `aliases.json`) ensuring that user preferences persist across sessions.
- **Auto-Expansion:** When an alias is detected in the input, it is automatically expanded to its full command before execution, reducing typing and potential errors.

## Testing and Documentation
- **Unit and Integration Tests:** Comprehensive testing covering interactive sessions, both online and offline assistance, command preview functionality, localization, alias management, and configuration validation scenarios.
- **Documentation Updates:** README.md and CONTRIBUTING.md are updated with examples showing localized command outputs, alias management usage instructions, and troubleshooting guidelines.

## Benefits
- **Enhanced Usability:** Combining interactive prompts, auto-completion, and localized help messages with alias support creates an inclusive and efficient command line experience.
- **Productivity Boost:** Custom aliases reduce repetitive typing and speed up command execution, lowering the barrier for complex plotting workflows.
- **Global Accessibility:** Localization support broadens the tool's appeal and usability to non-English speaking users worldwide.

## Summary
The updated CLI_INTERFACE feature now not only integrates guided interactions, dynamic auto-completion, and robust configuration validations but also incorporates comprehensive localization and alias management support. By including alias management, users gain additional flexibility to tailor the tool to their workflow needs, making repository0-plot-code-lib even more efficient and user-friendly.