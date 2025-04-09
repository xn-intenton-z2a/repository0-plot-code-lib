# CLI_WIZARD Feature

## Overview
This feature introduces an interactive CLI wizard to guide users through the process of selecting plot types, setting numeric parameters, and configuring advanced options in an intuitive manner. The wizard leverages existing numeric parsing and formula validation from the CORE_ENGINE, ensuring a consistent user experience with robust input validation.

## Key Features
- **Interactive Prompts:**
  - Step-by-step guidance to select a plot type from available advanced plotting options (e.g., spiral, polarHeatmap, dualAxis, etc.).
  - Interactive input for numeric parameters with real-time validation and suggestions.
- **Configuration Assistance:**
  - Ability to switch between basic and JSON-based configuration modes dynamically.
  - Clear instructions and live feedback on input errors, referencing the accepted numeric formats and NaN aliases.
- **Seamless Integration:**
  - Re-utilizes the existing CORE_ENGINE parsing and validation logic, reducing redundancy and ensuring consistency in parameter handling.
  - Optional integration hooks for both CLI and HTTP API interfaces, aligning with the mission of being a go-to plotting tool.

## Integration
- **With CORE_ENGINE:**
  - Uses the numeric parameter validation and formula parsing routines from CORE_ENGINE.
  - Provides a friendly UI layer to simplify complex plot configurations.
- **With USER_INTERFACE Components:**
  - Enhances the merged CLI and web API by providing an alternative interactive mode to complement current flag-based operations.
  - Modular design to allow future enhancements like saving user preferences or profiles.

## Implementation Roadmap
1. **Library Module:**
   - Create a dedicated source file (e.g., `src/lib/cliWizard.js`) to encapsulate the interactive CLI logic.
   - Utilize Node's native `readline` module (or a lightweight alternative) to manage user input interactively.
2. **CLI Integration:**
   - Update the main execution file (`src/lib/main.js`) to invoke the CLI wizard when the user passes a specific flag (e.g., `--wizard`).
   - Ensure backward compatibility with existing CLI flag usage.
3. **Testing and Documentation:**
   - Develop unit and integration tests covering interactive flows and error handling.
   - Update `README.md` and `CONTRIBUTING.md` to reflect usage examples and development guidelines for the interactive wizard.

## Benefits
- **Enhanced User Experience:** Provides a user-friendly way to configure plots without needing to memorize command syntax or parameter order.
- **Reduced User Errors:** Interactive prompts with immediate feedback help mitigate common mistakes in numeric parameter entry.
- **Increased Adoption:** Lowers the barrier for new users experimenting with the tool, aligning with the mission to be a go-to plotting library.
