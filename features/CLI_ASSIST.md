# CLI_ASSIST Feature

## Overview
This feature builds upon our existing command-line assistant to not only provide interactive help and wizard-based configuration, but also incorporate an ASCII preview mode for rapid, text-based visualisation of plots. The addition of ASCII preview allows users to quickly see a rudimentary, terminal-friendly representation of their plot before committing to full generation or export. This enhancement supports our mission to provide accessible, real-time visual feedback and make plotting both intuitive and engaging.

## Implementation Details
- **Enhanced Interactive Wizard:**
  - Extend the existing CLI wizard mode triggered by the `--assist` flag to include context-sensitive guidance on plot configuration.
  - Integrate advanced numeric validation and real-time error corrections as per our current Zod-based parsing logic.

- **ASCII Preview Mode:**
  - Introduce a new CLI flag (e.g., `--preview`) that, when combined with a valid plot command, renders a simplified ASCII art version of the plot in the terminal.
  - Develop a lightweight module that translates plot parameters into an ASCII art representation, suitable for quick visual feedback.
  - Ensure consistency with supported plot types and reuse the core plotting logic where applicable.

- **Integration:**
  - Modify the main CLI module (`src/lib/main.js`) to conditionally trigger ASCII preview when the preview flag is present.
  - Maintain backward compatibility with current help and configuration workflows.
  - Update configuration and logging to support both interactive and preview modes.

- **Testing:**
  - Extend unit tests to simulate interactive CLI sessions, including tests for the new ASCII preview mode.
  - Verify that the ASCII preview accurately reflects plot parameters and that error handling remains robust in preview scenarios.

## Benefits
- **Rapid Feedback:** Users can quickly inspect a textual representation of their plot without waiting for a full graphical output.
- **Improved Usability:** The interactive wizard now offers both detailed guidance and immediate visual cues, enhancing overall user engagement.
- **Consistency:** By merging interactive help and ASCII preview in a single CLI feature, users benefit from a unified and efficient command-line interface.
- **Enhanced Accessibility:** Terminal-based previews provide an additional layer of accessibility for environments where full graphical outputs are not available.
