# CLI_ASSIST Feature

## Overview
This feature builds upon our existing command-line assistant to provide interactive help and wizard-based configuration with enhanced capabilities. It not only allows users to configure plots interactively but now also includes an ASCII preview mode and enhanced error correction with dynamic suggestions. This update reinforces our mission to offer accessible plot visualizations and real-time feedback while improving the robustness of input handling.

## Enhanced Interactive Wizard and ASCII Preview
- **Interactive Wizard:**
  - Extend the CLI wizard mode (triggered by the `--assist` flag) to provide step-by-step guidance for plot configuration.
  - Integrate advanced numeric validation using Zod-based parsing as well as contextual help to guide users through parameter specification.

- **ASCII Preview Mode:**
  - Introduce a new CLI flag (e.g., `--preview`) that renders a simplified ASCII art version of the plot if combined with a valid plot command.
  - Develop a lightweight module to translate plot parameters into terminal-friendly ASCII art for a rapid visual check before full plot generation.

## Enhanced Error Correction and Suggestions
- **Custom Error Handling:**
  - Leverage the optional error handler in the numeric parameter parsing function (`parseNumericParams`) to capture validation errors, especially for common near-miss tokens like "n/a".
  - Display clear, actionable error messages and suggestions that point out the accepted NaN aliases (e.g., "nan", "not a number", "notanumber", "na", and "not-a-number").

- **Dynamic Suggestions:**
  - When a user inputs an invalid token, the CLI will now provide suggestions for corrections based on the configured locale-specific or default NaN aliases.
  - Improve logging around error conditions (when environment variable `DEBUG_NUMERIC` is active), offering developers insights into input transformation and error occurrence.

## Integration and Backward Compatibility
- Update the main CLI module to seamlessly integrate ASCII preview mode and the new error correction flow.
- Ensure backward compatibility with existing CLI operations and configuration workflows.
- Extend unit tests to cover new error handling paths and suggestion outputs, ensuring robustness across interactive sessions.

## Benefits
- **Improved User Experience:** Provides clear, actionable suggestions for correcting input errors, reducing user frustration.
- **Real-time Visual Feedback:** The ASCII preview mode allows users to quickly verify plot layouts and configurations directly in the terminal.
- **Enhanced Debuggability:** With improved logging and custom error handling callbacks, both end-users and developers can diagnose issues more effectively.
- **Consistency:** Integrates with the existing numeric validation and plotting logic, ensuring a unified experience across the CLI tool.
